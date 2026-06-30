import { describe, it, expect, beforeEach, vi } from 'vitest';
import express, { type Express } from 'express';
import request from 'supertest';

// =============================================================================
// Route-level regression coverage for DELETE /api/promo/me ("кодоо салгах").
//
// The real bug: the route's Firestore transaction issued a read (tx.get on the
// teacherCode doc) AFTER a write (tx.set deleting the user's promo). Firestore
// forbids reads-after-writes inside a transaction and throws, so the handler
// 502'd and users could never detach an unused promo code.
//
// The db mock below faithfully replicates that rule — tx.get throws once any
// tx.set has run — so this suite FAILS against the buggy ordering and PASSES
// once all reads precede all writes.
// =============================================================================

const h = vi.hoisted(() => ({
  // Sentinel returned by the mocked FieldValue.delete(); the db mock recognises
  // it to drop a field, mirroring Firestore's delete marker.
  DELETE: Symbol('field-value-delete'),
  state: { db: null as any, user: null as any },
}));

vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    delete: () => h.DELETE,
    increment: (n: number) => ({ __increment: n }),
  },
}));

vi.mock('../backend/lib/firebaseAdmin', () => ({
  getFirebaseAdmin: () => (h.state.db ? { db: h.state.db } : null),
  verifyFirebaseBearer: async () => h.state.user,
  verifyFirebaseAdmin: async () => null,
  firebaseAdminMissingMessage: () => 'Firebase admin тохируулаагүй.',
}));

import { registerPromoRoute } from '../backend/routes/promo';

// In-memory Firestore stand-in. `seed` keys are `${collection}/${id}`.
function makeDb(seed: Record<string, Record<string, unknown>>) {
  const store = new Map<string, Record<string, unknown>>(
    Object.entries(seed).map(([k, v]) => [k, { ...v }]),
  );
  const snap = (key: string) => ({
    exists: store.has(key),
    data: () => store.get(key),
  });
  // Doc refs carry their store key plus a non-transactional .get() (the redeem
  // route reads the teacherCode doc outside the transaction to validate it).
  const ref = (col: string, id: string) => ({
    __key: `${col}/${id}`,
    get: async () => snap(`${col}/${id}`),
  });
  // Apply a write payload onto a stored doc, honouring the DELETE sentinel and
  // the FieldValue.increment({__increment}) marker the route uses for counters.
  const applyWrite = (key: string, data: Record<string, unknown>) => {
    const cur = { ...(store.get(key) ?? {}) };
    for (const [field, value] of Object.entries(data)) {
      if (value === h.DELETE) delete cur[field];
      else if (value && typeof value === 'object' && '__increment' in (value as Record<string, unknown>)) {
        cur[field] = Number(cur[field] ?? 0) + Number((value as { __increment: number }).__increment);
      } else cur[field] = value;
    }
    store.set(key, cur);
  };
  return {
    store,
    collection: (col: string) => ({ doc: (id: string) => ref(col, id) }),
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
        set(r: { __key: string }, data: Record<string, unknown>, _opts?: unknown) {
          wrote = true;
          applyWrite(r.__key, data);
        },
      };
      return fn(tx);
    },
  };
}

function buildApp(): Express {
  const app = express();
  app.use(express.json());
  registerPromoRoute(app);
  return app;
}

describe('DELETE /api/promo/me — detach unused promo code', () => {
  beforeEach(() => {
    h.state.user = { uid: 'u1', email: 'learner@example.com' };
  });

  it('removes an unused promo and decrements the teacher redeemCount', async () => {
    const db = makeDb({
      'users/u1': {
        promo: { code: 'ABC', teacherName: 'Bat', discountPercent: 20, firstPaymentDone: false },
      },
      'teacherCodes/ABC': { redeemCount: 3 },
    });
    h.state.db = db;

    const res = await request(buildApp()).delete('/api/promo/me');

    // Regression guard: the buggy read-after-write ordering 502'd here.
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ removed: true });
    expect(db.store.get('users/u1')).toEqual({}); // promo field deleted
    expect(db.store.get('teacherCodes/ABC')).toEqual({ redeemCount: 2 });
  });

  it('keeps redeemCount from going negative', async () => {
    const db = makeDb({
      'users/u1': {
        promo: { code: 'ABC', teacherName: 'Bat', discountPercent: 20, firstPaymentDone: false },
      },
      'teacherCodes/ABC': { redeemCount: 0 },
    });
    h.state.db = db;

    const res = await request(buildApp()).delete('/api/promo/me');

    expect(res.status).toBe(200);
    expect(db.store.get('teacherCodes/ABC')).toEqual({ redeemCount: 0 });
  });

  it('clears a USED promo cosmetically — keeps redeemCount and the used-code ledger', async () => {
    const db = makeDb({
      'users/u1': {
        promo: { code: 'ABC', teacherName: 'Bat', discountPercent: 20, firstPaymentDone: true },
        redeemedCodes: ['ABC'],
      },
      'teacherCodes/ABC': { redeemCount: 1 },
    });
    h.state.db = db;

    const res = await request(buildApp()).delete('/api/promo/me');

    // A spent code can be dismissed from view, but stays "used": redeemCount and
    // redeemedCodes are untouched, so it can never be re-applied for a discount.
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ removed: true });
    expect((db.store.get('users/u1') as any).promo).toBeUndefined();
    expect((db.store.get('users/u1') as any).redeemedCodes).toEqual(['ABC']);
    expect(db.store.get('teacherCodes/ABC')).toEqual({ redeemCount: 1 });
  });

  it('is idempotent when there is no promo to remove', async () => {
    const db = makeDb({ 'users/u1': {} });
    h.state.db = db;

    const res = await request(buildApp()).delete('/api/promo/me');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ removed: false, already: true });
  });

  it('401s when the request is unauthenticated', async () => {
    h.state.db = makeDb({});
    h.state.user = null;

    const res = await request(buildApp()).delete('/api/promo/me');

    expect(res.status).toBe(401);
  });
});

// =============================================================================
// POST /api/promo/redeem — the new model: a person may use many DIFFERENT codes
// (each discounts the next order), but the SAME code only once (blocked after it
// has reached a paid conversion, tracked in users/{uid}.redeemedCodes).
// =============================================================================
describe('POST /api/promo/redeem — apply a teacher code', () => {
  beforeEach(() => {
    h.state.user = { uid: 'u1', email: 'learner@example.com' };
  });

  const activeCode = (extra: Record<string, unknown> = {}) => ({
    teacherName: 'Bat', discountPercent: 20, commissionPercent: 10, active: true, redeemCount: 0, ...extra,
  });

  it('attaches a fresh code when the user has no promo', async () => {
    const db = makeDb({
      'users/u1': {},
      'teacherCodes/ABC': activeCode({ redeemCount: 4 }),
    });
    h.state.db = db;

    const res = await request(buildApp()).post('/api/promo/redeem').send({ code: 'ABC' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ redeemed: true, discountPercent: 20, teacherName: 'Bat' });
    expect((db.store.get('users/u1') as any).promo).toMatchObject({ code: 'ABC', firstPaymentDone: false });
    expect(db.store.get('teacherCodes/ABC')).toMatchObject({ redeemCount: 5 });
  });

  it('swaps an UNUSED active code for a different one (old redeemCount restored)', async () => {
    const db = makeDb({
      'users/u1': { promo: { code: 'ABC', teacherName: 'Bat', discountPercent: 20, commissionPercent: 10, firstPaymentDone: false } },
      'teacherCodes/ABC': { redeemCount: 3 },
      'teacherCodes/XYZ': activeCode({ teacherName: 'Sara', discountPercent: 30, commissionPercent: 15, redeemCount: 1 }),
    });
    h.state.db = db;

    const res = await request(buildApp()).post('/api/promo/redeem').send({ code: 'XYZ' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ redeemed: true, discountPercent: 30 });
    expect((db.store.get('users/u1') as any).promo).toMatchObject({ code: 'XYZ', firstPaymentDone: false });
    expect(db.store.get('teacherCodes/XYZ')).toMatchObject({ redeemCount: 2 }); // +1
    expect(db.store.get('teacherCodes/ABC')).toMatchObject({ redeemCount: 2 }); // -1, swapped out
  });

  it('does NOT decrement an already-USED code when applying a different one', async () => {
    const db = makeDb({
      'users/u1': {
        promo: { code: 'ABC', teacherName: 'Bat', discountPercent: 20, commissionPercent: 10, firstPaymentDone: true },
        redeemedCodes: ['ABC'],
      },
      'teacherCodes/ABC': { redeemCount: 5 },
      'teacherCodes/XYZ': activeCode({ teacherName: 'Sara', discountPercent: 30, commissionPercent: 15, redeemCount: 0 }),
    });
    h.state.db = db;

    const res = await request(buildApp()).post('/api/promo/redeem').send({ code: 'XYZ' });

    expect(res.status).toBe(200);
    expect((db.store.get('users/u1') as any).promo).toMatchObject({ code: 'XYZ', firstPaymentDone: false });
    expect(db.store.get('teacherCodes/XYZ')).toMatchObject({ redeemCount: 1 });
    expect(db.store.get('teacherCodes/ABC')).toMatchObject({ redeemCount: 5 }); // untouched (real conversion)
  });

  it('blocks re-applying a code already used on a paid order (409)', async () => {
    const db = makeDb({
      'users/u1': {
        promo: { code: 'XYZ', teacherName: 'Sara', discountPercent: 30, commissionPercent: 15, firstPaymentDone: false },
        redeemedCodes: ['ABC'],
      },
      'teacherCodes/ABC': activeCode({ redeemCount: 5 }),
    });
    h.state.db = db;

    const res = await request(buildApp()).post('/api/promo/redeem').send({ code: 'ABC' });

    expect(res.status).toBe(409);
    expect((db.store.get('users/u1') as any).promo).toMatchObject({ code: 'XYZ' }); // unchanged
    expect(db.store.get('teacherCodes/ABC')).toMatchObject({ redeemCount: 5 });
  });

  it('is idempotent when re-entering the currently active code', async () => {
    const db = makeDb({
      'users/u1': { promo: { code: 'ABC', teacherName: 'Bat', discountPercent: 20, commissionPercent: 10, firstPaymentDone: false } },
      'teacherCodes/ABC': activeCode({ redeemCount: 3 }),
    });
    h.state.db = db;

    const res = await request(buildApp()).post('/api/promo/redeem').send({ code: 'ABC' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ redeemed: false, already: true });
    expect(db.store.get('teacherCodes/ABC')).toMatchObject({ redeemCount: 3 }); // no double-count
  });

  it('blocks a friend-referred user from applying a teacher promo (409)', async () => {
    const db = makeDb({
      'users/u1': { referredBy: 'friendUid' },
      'teacherCodes/ABC': activeCode(),
    });
    h.state.db = db;

    const res = await request(buildApp()).post('/api/promo/redeem').send({ code: 'ABC' });

    expect(res.status).toBe(409);
    expect((db.store.get('users/u1') as any).promo).toBeUndefined();
  });

  it('404s for an unknown code and 400s for an inactive one', async () => {
    const db = makeDb({
      'users/u1': {},
      'teacherCodes/OFF': activeCode({ active: false }),
    });
    h.state.db = db;

    const unknown = await request(buildApp()).post('/api/promo/redeem').send({ code: 'NOPE' });
    expect(unknown.status).toBe(404);

    const inactive = await request(buildApp()).post('/api/promo/redeem').send({ code: 'OFF' });
    expect(inactive.status).toBe(400);
  });
});
