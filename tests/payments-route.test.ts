import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import express, { type Express } from 'express';
import request from 'supertest';
import { createHmac } from 'node:crypto';

// =============================================================================
// Route-level coverage for backend/routes/payments.ts (modeled on
// tests/promo-route.test.ts):
//
//  - Byl webhook: fail-closed 503 in prod without BYL_WEBHOOK_SECRET, 401 on a
//    bad signature, real HMAC-SHA256 verification over the raw body, one-shot
//    activation, event-id replay guard, and transaction-level idempotency when
//    two deliveries race on the same invoice.
//  - Dummy provider: 404 unless ALLOW_DUMMY_PAYMENTS=1, full checkout → pay
//    flow with revenue:false, placement one-off purchase (placementUnlock +
//    legacy placement.unlocked, billing.plan untouched).
//  - addMonths month-end clamp: Jan 31 + 1 month ends Feb 28, not Mar 2/3.
//
// The db mock replicates Firestore's all-reads-before-writes transaction rule
// (tx.get throws once any tx.set has run) and merge:true deep-merge semantics,
// because activation relies on both.
// =============================================================================

const h = vi.hoisted(() => ({
  DELETE: Symbol('field-value-delete'),
  state: {
    db: null as any,
    user: null as any,
    // Per-test stub for the Byl "source of truth" API call.
    getBylCheckout: (async (_id: string) => ({} as Record<string, unknown>)),
  },
}));

vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    delete: () => h.DELETE,
    increment: (n: number) => ({ __increment: n }),
    arrayUnion: (...values: unknown[]) => ({ __arrayUnion: values }),
    serverTimestamp: () => ({ __serverTimestamp: true }),
  },
}));

vi.mock('../backend/lib/firebaseAdmin', () => ({
  getFirebaseAdmin: () => (h.state.db ? { db: h.state.db } : null),
  verifyFirebaseBearer: async () => h.state.user,
  verifyFirebaseAdmin: async () => null,
  firebaseAdminMissingMessage: () => 'Firebase admin тохируулаагүй.',
}));

// Keep the real HMAC verification (it reads BYL_WEBHOOK_SECRET from env) and
// the real paid-status helpers; only the network call to Byl is stubbed so
// tests control what "Byl says" about a checkout.
vi.mock('../backend/lib/payments/byl', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../backend/lib/payments/byl')>();
  return {
    ...actual,
    getBylCheckout: (id: string) => h.state.getBylCheckout(id),
  };
});

import { registerPaymentsRoute } from '../backend/routes/payments';

// In-memory Firestore stand-in. `seed` keys are `${collection}/${id}`. Unlike
// the promo suite's mock this one supports merge:true deep merges, snapshot
// .get(field) (the activation tx reads invoice status that way), plain
// ref.set() outside transactions, and a where(==).limit(n).get() query.
function makeDb(seed: Record<string, Record<string, unknown>>) {
  const store = new Map<string, Record<string, unknown>>(
    Object.entries(seed).map(([k, v]) => [k, { ...v }]),
  );

  const isPlainObject = (v: unknown): v is Record<string, unknown> =>
    Boolean(v) && typeof v === 'object' && !Array.isArray(v);

  // Resolve one written value against the current stored value, honouring the
  // FieldValue sentinels and recursing into nested maps (Firestore merge:true
  // merges maps field-by-field rather than replacing them).
  const materialize = (cur: unknown, value: unknown): unknown => {
    if (isPlainObject(value)) {
      if ('__increment' in value) return Number(cur ?? 0) + Number(value.__increment);
      if ('__arrayUnion' in value) {
        const arr = Array.isArray(cur) ? [...cur] : [];
        for (const el of value.__arrayUnion as unknown[]) if (!arr.includes(el)) arr.push(el);
        return arr;
      }
      if ('__serverTimestamp' in value) return new Date().toISOString();
      const base = isPlainObject(cur) ? { ...cur } : {};
      return mergeFields(base, value);
    }
    return value;
  };
  const mergeFields = (target: Record<string, unknown>, data: Record<string, unknown>) => {
    for (const [field, value] of Object.entries(data)) {
      if (value === h.DELETE) delete target[field];
      else target[field] = materialize(target[field], value);
    }
    return target;
  };
  const applyWrite = (key: string, data: Record<string, unknown>, merge: boolean) => {
    const base = merge ? { ...(store.get(key) ?? {}) } : {};
    store.set(key, mergeFields(base, data));
  };

  const snap = (key: string) => ({
    exists: store.has(key),
    data: () => store.get(key),
    get: (field: string) => store.get(key)?.[field],
    ref: refForKey(key),
  });
  const refForKey = (key: string): any => ({
    __key: key,
    get: async () => snap(key),
    set: async (data: Record<string, unknown>, opts?: { merge?: boolean }) => {
      applyWrite(key, data, opts?.merge === true);
    },
  });

  return {
    store,
    collection: (col: string) => ({
      doc: (id: string) => refForKey(`${col}/${id}`),
      where: (field: string, _op: string, value: unknown) => ({
        limit: (n: number) => ({
          get: async () => ({
            docs: [...store.keys()]
              .filter((k) => k.startsWith(`${col}/`) && store.get(k)?.[field] === value)
              .slice(0, n)
              .map((k) => snap(k)),
          }),
        }),
      }),
    }),
    async runTransaction(fn: (tx: any) => Promise<any>) {
      let wrote = false;
      const tx = {
        async get(r: { __key: string }) {
          if (wrote) {
            // Exactly what real Firestore throws on a read after a write.
            throw new Error(
              'Firestore transactions require all reads to be executed before all writes.',
            );
          }
          return snap(r.__key);
        },
        set(r: { __key: string }, data: Record<string, unknown>, opts?: { merge?: boolean }) {
          wrote = true;
          applyWrite(r.__key, data, opts?.merge === true);
        },
      };
      return fn(tx);
    },
  };
}

function buildApp(): Express {
  const app = express();
  // Mirror backend/server.ts: keep the raw body so the webhook can verify the
  // HMAC signature over the exact bytes Byl sent, not a re-serialisation.
  app.use(express.json({
    verify: (req, _res, buf) => {
      (req as express.Request & { rawBody?: Buffer }).rawBody = buf;
    },
  }));
  registerPaymentsRoute(app);
  return app;
}

const WEBHOOK_SECRET = 'test-webhook-secret';
const sign = (raw: string, secret = WEBHOOK_SECRET) =>
  createHmac('sha256', secret).update(raw).digest('hex');

function postWebhook(app: Express, raw: string, signature?: string) {
  let req = request(app).post('/api/payments/byl/webhook').set('Content-Type', 'application/json');
  if (signature) req = req.set('Byl-Signature', signature);
  return req.send(raw);
}

// A pending Byl subscription invoice (pro monthly, 19 900₮) + the checkout
// payload Byl's API reports once it has really been paid.
const pendingBylInvoice = () => ({
  provider: 'byl',
  providerInvoiceId: 'chk_1',
  senderInvoiceNo: 'inv_1',
  userId: 'u1',
  customerEmail: 'buyer@example.com',
  plan: 'pro',
  product: 'subscription',
  interval: 'month',
  amountMnt: 19900,
  amountCents: 1990000,
  currency: 'MNT',
  status: 'pending',
});
const paidCheckout = { id: 'chk_1', status: 'complete', amount_total: 19900 };
const webhookEvent = (eventId: string) => JSON.stringify({
  id: eventId,
  type: 'invoice.paid',
  data: { object: { id: 'chk_1', client_reference_id: 'inv_1' } },
});

const ENV_KEYS = ['BYL_WEBHOOK_SECRET', 'ALLOW_DUMMY_PAYMENTS', 'NODE_ENV'] as const;
let savedEnv: Record<string, string | undefined>;

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  delete process.env.BYL_WEBHOOK_SECRET;
  delete process.env.ALLOW_DUMMY_PAYMENTS;
  h.state.user = { uid: 'u1', email: 'buyer@example.com' };
  h.state.getBylCheckout = vi.fn(async () => ({}));
});

afterEach(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
  vi.useRealTimers();
});

describe('POST /api/payments/byl/webhook — signature verification', () => {
  it('503s (fails closed) in production when BYL_WEBHOOK_SECRET is unset, but proceeds in dev', async () => {
    h.state.db = makeDb({});
    const app = buildApp();
    const raw = JSON.stringify({ type: 'invoice.paid', data: { object: { client_reference_id: 'nope' } } });

    process.env.NODE_ENV = 'production';
    const prod = await postWebhook(app, raw);
    expect(prod.status).toBe(503);

    // Outside production the unsigned payload is still processed (activation
    // re-checks Byl's API anyway) — here it just finds no matching invoice.
    process.env.NODE_ENV = 'test';
    const dev = await postWebhook(app, raw);
    expect(dev.status).toBe(404);
  });

  it('401s when the Byl-Signature does not match the raw body', async () => {
    process.env.BYL_WEBHOOK_SECRET = WEBHOOK_SECRET;
    h.state.db = makeDb({ 'paymentInvoices/inv_1': pendingBylInvoice() });
    const raw = webhookEvent('evt_1');

    const res = await postWebhook(buildApp(), raw, sign(raw, 'some-other-secret'));

    expect(res.status).toBe(401);
    expect(h.state.getBylCheckout).not.toHaveBeenCalled();
    expect(h.state.db.store.get('paymentInvoices/inv_1')).toMatchObject({ status: 'pending' });
  });

  it('activates a pending invoice on a correctly signed event whose checkout Byl reports paid', async () => {
    process.env.BYL_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const db = makeDb({
      'paymentInvoices/inv_1': pendingBylInvoice(),
      'users/u1': {},
    });
    h.state.db = db;
    h.state.getBylCheckout = vi.fn(async () => paidCheckout);
    const raw = webhookEvent('evt_1');

    const res = await postWebhook(buildApp(), raw, sign(raw));

    expect(res.status).toBe(200);
    // Exact match: the webhook caller is Byl's server, never echo invoice data.
    expect(res.body).toEqual({ received: true });

    expect(db.store.get('paymentInvoices/inv_1')).toMatchObject({ status: 'paid', paymentId: 'byl_chk_1' });
    const user = db.store.get('users/u1') as any;
    expect(user.billing).toMatchObject({
      plan: 'pro',
      status: 'active',
      interval: 'month',
      monthlyAmountCents: 1990000,
      lifetimeValueCents: 1990000,
      currency: 'MNT',
      provider: 'byl',
    });
    expect(typeof user.billing.currentPeriodEnd).toBe('string');
    expect(user.placementCredits).toBe(1); // one free placement reveal per subscription
    expect(db.store.get('payments/byl_byl_chk_1')).toMatchObject({
      provider: 'byl',
      status: 'paid',
      userId: 'u1',
      amountCents: 1990000,
      revenue: true, // real Byl money counts toward revenue
    });
    expect(db.store.get('webhookEvents/byl_evt_1')).toMatchObject({ senderInvoiceNo: 'inv_1' });
  });

  it('acknowledges a replayed event id as duplicate without re-activating', async () => {
    process.env.BYL_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const db = makeDb({
      'paymentInvoices/inv_1': pendingBylInvoice(),
      'users/u1': {},
    });
    h.state.db = db;
    h.state.getBylCheckout = vi.fn(async () => paidCheckout);
    const app = buildApp();
    const raw = webhookEvent('evt_1');

    const first = await postWebhook(app, raw, sign(raw));
    expect(first.body).toEqual({ received: true });

    const second = await postWebhook(app, raw, sign(raw));
    expect(second.status).toBe(200);
    expect(second.body).toEqual({ received: true, duplicate: true });

    // The replay never reached Byl's API again nor re-granted anything.
    expect(h.state.getBylCheckout).toHaveBeenCalledTimes(1);
    const user = db.store.get('users/u1') as any;
    expect(user.billing.lifetimeValueCents).toBe(1990000);
    expect(user.placementCredits).toBe(1);
  });

  it('grants billing only once when two deliveries race on the same invoice (tx idempotency)', async () => {
    process.env.BYL_WEBHOOK_SECRET = WEBHOOK_SECRET;
    const db = makeDb({
      'paymentInvoices/inv_1': pendingBylInvoice(),
      'users/u1': {},
    });
    h.state.db = db;

    // Hold both requests inside the Byl API call until each has read the
    // invoice as 'pending' — the transaction's re-read of the invoice status
    // is then the ONLY thing standing between the user and a double grant.
    let release!: () => void;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    let inFlight = 0;
    h.state.getBylCheckout = vi.fn(async () => {
      inFlight += 1;
      if (inFlight === 2) release();
      await gate;
      return paidCheckout;
    });

    const app = buildApp();
    const rawA = webhookEvent('evt_A');
    const rawB = webhookEvent('evt_B');
    const [resA, resB] = await Promise.all([
      postWebhook(app, rawA, sign(rawA)),
      postWebhook(app, rawB, sign(rawB)),
    ]);

    expect(resA.status).toBe(200);
    expect(resB.status).toBe(200);
    const user = db.store.get('users/u1') as any;
    expect(user.billing.lifetimeValueCents).toBe(1990000); // once, not 2×
    expect(user.placementCredits).toBe(1);
    expect(db.store.get('paymentInvoices/inv_1')).toMatchObject({ status: 'paid' });
  });
});

describe('dummy provider — gated simulation of the real flow', () => {
  it('404s both dummy endpoints when ALLOW_DUMMY_PAYMENTS is unset', async () => {
    h.state.db = makeDb({ 'users/u1': {} });
    const app = buildApp();

    const checkout = await request(app).post('/api/payments/dummy/checkout').send({ plan: 'pro' });
    expect(checkout.status).toBe(404);

    const pay = await request(app).post('/api/payments/dummy/invoices/x/pay');
    expect(pay.status).toBe(404);
  });

  it('401s an unauthenticated dummy checkout even when enabled', async () => {
    process.env.ALLOW_DUMMY_PAYMENTS = '1';
    h.state.db = makeDb({});
    h.state.user = null;

    const res = await request(buildApp()).post('/api/payments/dummy/checkout').send({ plan: 'pro' });

    expect(res.status).toBe(401);
  });

  it('runs the full checkout → pay flow, activating billing with revenue:false', async () => {
    process.env.ALLOW_DUMMY_PAYMENTS = '1';
    const db = makeDb({ 'users/u1': {} });
    h.state.db = db;
    const app = buildApp();

    const checkout = await request(app).post('/api/payments/dummy/checkout').send({ plan: 'pro' });
    expect(checkout.status).toBe(201);
    expect(checkout.body).toMatchObject({ provider: 'dummy', plan: 'pro', product: 'subscription', interval: 'month' });
    const invoiceNo = checkout.body.senderInvoiceNo as string;
    expect(db.store.get(`paymentInvoices/${invoiceNo}`)).toMatchObject({
      provider: 'dummy',
      status: 'pending',
      plan: 'pro',
      userId: 'u1',
    });

    const pay = await request(app).post(`/api/payments/dummy/invoices/${invoiceNo}/pay`);
    expect(pay.status).toBe(200);
    expect(pay.body.paid).toBe(true);
    expect(pay.body.billing).toMatchObject({ plan: 'pro', status: 'active' });

    expect(db.store.get(`paymentInvoices/${invoiceNo}`)).toMatchObject({ status: 'paid' });
    const user = db.store.get('users/u1') as any;
    expect(user.billing).toMatchObject({ plan: 'pro', status: 'active', provider: 'dummy' });
    // Dummy = no real money: revenue-bearing fields stay at 0 so dev/preview
    // test payments never inflate the prod revenue dashboard.
    expect(user.billing.monthlyAmountCents).toBe(0);
    expect(user.billing.lifetimeValueCents).toBe(0);
    expect(user.placementCredits).toBe(1);

    const paymentKey = [...db.store.keys()].find((k) => k.startsWith('payments/'));
    expect(paymentKey).toBeDefined();
    expect(db.store.get(paymentKey!)).toMatchObject({ provider: 'dummy', status: 'paid', revenue: false });

    // Paying the same invoice again is a no-op acknowledgement.
    const again = await request(app).post(`/api/payments/dummy/invoices/${invoiceNo}/pay`);
    expect(again.status).toBe(200);
    expect(again.body.billing).toBeNull();
    expect((db.store.get('users/u1') as any).placementCredits).toBe(1);
  });

  it('placement purchase writes placementUnlock + legacy placement.unlocked without touching billing.plan', async () => {
    process.env.ALLOW_DUMMY_PAYMENTS = '1';
    const db = makeDb({
      'users/u1': { billing: { plan: 'pro', status: 'active', lifetimeValueCents: 500 } },
    });
    h.state.db = db;
    const app = buildApp();

    const checkout = await request(app).post('/api/payments/dummy/checkout').send({ product: 'placement' });
    expect(checkout.status).toBe(201);
    expect(checkout.body).toMatchObject({ provider: 'dummy', product: 'placement', plan: 'Placement result', amountMnt: 5000 });

    const pay = await request(app).post(`/api/payments/dummy/invoices/${checkout.body.senderInvoiceNo}/pay`);
    expect(pay.status).toBe(200);

    const user = db.store.get('users/u1') as any;
    // Both the server-owned entitlement AND the legacy display flag.
    expect(user.placementUnlock).toMatchObject({ unlocked: true, by: 'dummy' });
    expect(typeof user.placementUnlock.at).toBe('string');
    expect(user.placement).toEqual({ unlocked: true, unlockedBy: 'dummy' });
    // Subscription state is untouched: same plan/status, no credit grant.
    expect(user.billing.plan).toBe('pro');
    expect(user.billing.status).toBe('active');
    expect(user.billing.lifetimeValueCents).toBe(500); // dummy adds 0 revenue
    expect(user.placementCredits).toBeUndefined();
  });

  it('clamps currentPeriodEnd to the last day of a shorter month (Jan 31 → Feb 28)', async () => {
    // Only Date is faked (timers stay real so supertest's sockets work).
    vi.useFakeTimers({ now: new Date(2026, 0, 31, 12, 0, 0), toFake: ['Date'] });
    process.env.ALLOW_DUMMY_PAYMENTS = '1';
    const db = makeDb({ 'users/u1': {} });
    h.state.db = db;
    const app = buildApp();

    const checkout = await request(app).post('/api/payments/dummy/checkout').send({ plan: 'pro', interval: 'month' });
    expect(checkout.status).toBe(201);
    const pay = await request(app).post(`/api/payments/dummy/invoices/${checkout.body.senderInvoiceNo}/pay`);
    expect(pay.status).toBe(200);

    const user = db.store.get('users/u1') as any;
    const end = new Date(user.billing.currentPeriodEnd);
    // Feb 2026 has 28 days: a Jan 31 purchase must end Feb 28, not Mar 2/3.
    expect([end.getFullYear(), end.getMonth() + 1, end.getDate()]).toEqual([2026, 2, 28]);
    // The invoice records the same period end the user doc got.
    const invoice = db.store.get(`paymentInvoices/${checkout.body.senderInvoiceNo}`) as any;
    expect(invoice.currentPeriodEnd).toBe(user.billing.currentPeriodEnd);
  });
});
