import { describe, it, expect, beforeEach, vi } from 'vitest';
import express, { type Express } from 'express';
import request from 'supertest';

// =============================================================================
// GET /api/teacher/students — class-sandbox: a teacher may only see students
// redeemed against THEIR OWN teacherCodes (matched by verified token email),
// never a code param supplied by the client, and never server-owned fields.
// =============================================================================

const h = vi.hoisted(() => ({ state: { user: null as any, db: null as any } }));

vi.mock('../backend/lib/firebaseAdmin', () => ({
  getFirebaseAdmin: () => (h.state.db ? { db: h.state.db } : null),
  verifyFirebaseBearer: async () => h.state.user,
  firebaseAdminMissingMessage: () => 'Firebase admin тохируулаагүй.',
}));

import { registerTeacherRoute } from '../backend/routes/teacher';

// In-memory Firestore stand-in with a `.where(field, op, value)` that reads
// dotted-path fields (e.g. "promo.code") out of nested docs, mirroring real
// Firestore's map-field query support (see backend/routes/social.ts's
// `.where('challenger.uid', ...)` for the same dotted-path pattern on the
// live SDK).
function makeDb(seed: Record<string, Record<string, unknown>>) {
  const store = new Map<string, Record<string, unknown>>(
    Object.entries(seed).map(([k, v]) => [k, { ...v }]),
  );
  const getByPath = (doc: Record<string, unknown>, path: string) =>
    path.split('.').reduce<unknown>((v, k) => (v && typeof v === 'object' ? (v as Record<string, unknown>)[k] : undefined), doc);
  const snap = (key: string) => ({ id: key.split('/')[1], exists: store.has(key), data: () => store.get(key) });
  return {
    store,
    collection: (col: string) => ({
      doc: (id: string) => ({ get: async () => snap(`${col}/${id}`) }),
      where: (field: string, _op: string, value: unknown) => ({
        get: async () => {
          const docs = [...store.keys()]
            .filter((k) => k.startsWith(`${col}/`) && getByPath(store.get(k)!, field) === value)
            .map((k) => snap(k));
          return { docs, empty: docs.length === 0 };
        },
      }),
    }),
  };
}

function buildApp(db: ReturnType<typeof makeDb>): Express {
  h.state.db = db;
  const app = express();
  app.use(express.json());
  registerTeacherRoute(app);
  return app;
}

describe('GET /api/teacher/students', () => {
  beforeEach(() => {
    h.state.user = { uid: 'teacher1', email: 'Teacher@Example.com' };
  });

  it('returns only students redeemed against the caller teacher email codes', async () => {
    const db = makeDb({
      'teacherCodes/ABC': { teacherEmail: 'teacher@example.com', teacherName: 'Bat' },
      'teacherCodes/XYZ': { teacherEmail: 'other@example.com', teacherName: 'Sara' },
      'users/u1': { name: 'Student One', email: 's1@x.com', promo: { code: 'ABC' }, streak: 5 },
      'users/u2': { name: 'Student Two', email: 's2@x.com', promo: { code: 'XYZ' } }, // other teacher's — must NOT appear
    });
    const app = buildApp(db);

    const res = await request(app).get('/api/teacher/students');

    expect(res.status).toBe(200);
    expect(res.body.codes).toEqual(['ABC']);
    expect(res.body.students).toHaveLength(1);
    expect(res.body.students[0]).toMatchObject({ uid: 'u1', code: 'ABC', name: 'Student One', streak: 5 });
  });

  it('403s when the signed-in email owns no teacherCodes', async () => {
    const db = makeDb({
      'teacherCodes/ABC': { teacherEmail: 'someoneelse@example.com', teacherName: 'Bat' },
    });
    const app = buildApp(db);

    const res = await request(app).get('/api/teacher/students');

    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: 'not_a_teacher' });
  });

  it('excludes billing/aiUsage/redeemedCodes/promo-internals from the sanitized projection', async () => {
    const db = makeDb({
      'teacherCodes/ABC': { teacherEmail: 'teacher@example.com', teacherName: 'Bat' },
      'users/u1': {
        name: 'Student One',
        email: 's1@x.com',
        promo: { code: 'ABC', commissionPercent: 10, firstPaymentDone: true },
        billing: { plan: 'max', status: 'active' },
        aiUsage: { count: 999 },
        redeemedCodes: ['ABC'],
        placementCredits: 3,
      },
    });
    const app = buildApp(db);

    const res = await request(app).get('/api/teacher/students');

    expect(res.status).toBe(200);
    const student = res.body.students[0];
    expect(student).not.toHaveProperty('billing');
    expect(student).not.toHaveProperty('aiUsage');
    expect(student).not.toHaveProperty('redeemedCodes');
    expect(student).not.toHaveProperty('placementCredits');
    expect(student).not.toHaveProperty('commissionPercent');
    expect(student).not.toHaveProperty('firstPaymentDone');
  });

  it('401s when the request is unauthenticated', async () => {
    h.state.user = null;
    const app = buildApp(makeDb({}));

    const res = await request(app).get('/api/teacher/students');

    expect(res.status).toBe(401);
  });
});

describe('GET /api/teacher/students/:uid', () => {
  beforeEach(() => {
    h.state.user = { uid: 'teacher1', email: 'Teacher@Example.com' };
  });

  it('returns detail for own student, including study time and full test history', async () => {
    const db = makeDb({
      'teacherCodes/ABC': { teacherEmail: 'teacher@example.com', teacherName: 'Bat' },
      'users/u1': {
        name: 'Student One',
        email: 's1@x.com',
        promo: { code: 'ABC' },
        streak: 5,
        dailyGoalMinutes: 20,
        studySecondsByDate: { '2026-01-01': 100 },
        studySecondsByDateEn: { '2026-01-01': 50, '2026-01-02': 200 },
        testHistoryEn: Array.from({ length: 25 }, (_, i) => ({ testId: `t${i}`, label: `Test ${i}` })),
        placementEn: { level: 'B2', skillScores: { reading: { correct: 8, total: 10 } } },
      },
    });
    const app = buildApp(db);

    const res = await request(app).get('/api/teacher/students/u1');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      uid: 'u1',
      totalStudySeconds: 350,
      dailyGoalMinutes: 20,
      placementSkillScores: { reading: { correct: 8, total: 10 } },
    });
    // Full history, not the list projection's 20-item cap.
    expect(res.body.testHistoryEn).toHaveLength(25);
  });

  it('404s for another teacher\'s student (sandbox — no existence leak)', async () => {
    const db = makeDb({
      'teacherCodes/ABC': { teacherEmail: 'teacher@example.com', teacherName: 'Bat' },
      'teacherCodes/XYZ': { teacherEmail: 'other@example.com', teacherName: 'Sara' },
      'users/u2': { name: 'Student Two', email: 's2@x.com', promo: { code: 'XYZ' } },
    });
    const app = buildApp(db);

    const res = await request(app).get('/api/teacher/students/u2');

    expect(res.status).toBe(404);
  });

  it('404s for a non-existent uid', async () => {
    const db = makeDb({
      'teacherCodes/ABC': { teacherEmail: 'teacher@example.com', teacherName: 'Bat' },
    });
    const app = buildApp(db);

    const res = await request(app).get('/api/teacher/students/ghost');

    expect(res.status).toBe(404);
  });

  it('excludes billing/aiUsage/redeemedCodes/placementCredits from the detail projection', async () => {
    const db = makeDb({
      'teacherCodes/ABC': { teacherEmail: 'teacher@example.com', teacherName: 'Bat' },
      'users/u1': {
        name: 'Student One',
        email: 's1@x.com',
        promo: { code: 'ABC' },
        billing: { plan: 'max', status: 'active' },
        aiUsage: { count: 999 },
        redeemedCodes: ['ABC'],
        placementCredits: 3,
      },
    });
    const app = buildApp(db);

    const res = await request(app).get('/api/teacher/students/u1');

    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty('billing');
    expect(res.body).not.toHaveProperty('aiUsage');
    expect(res.body).not.toHaveProperty('redeemedCodes');
    expect(res.body).not.toHaveProperty('placementCredits');
  });
});
