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
  const ref = (col: string, id: string) => ({ __key: `${col}/${id}` });
  const snap = (key: string) => ({
    exists: store.has(key),
    data: () => store.get(key),
  });
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
          const cur = { ...(store.get(r.__key) ?? {}) };
          for (const [field, value] of Object.entries(data)) {
            if (value === h.DELETE) delete cur[field];
            else cur[field] = value;
          }
          store.set(r.__key, cur);
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

  it('refuses to detach a promo whose first payment is already done (409)', async () => {
    const db = makeDb({
      'users/u1': {
        promo: { code: 'ABC', teacherName: 'Bat', discountPercent: 20, firstPaymentDone: true },
      },
      'teacherCodes/ABC': { redeemCount: 1 },
    });
    h.state.db = db;

    const res = await request(buildApp()).delete('/api/promo/me');

    expect(res.status).toBe(409);
    // Promo stays attached; redeemCount untouched.
    expect((db.store.get('users/u1') as any).promo).toBeTruthy();
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
