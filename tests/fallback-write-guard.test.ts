// Guards from audit §4.2 fixes #1/#2/#4 (docs/backend-audit.md):
//   • the profile read path is a live onSnapshot: the FIRST snapshot per auth
//     event goes out on the auth channel (German tab-state reset), every
//     SUBSEQUENT snapshot on the updates channel only; our own pending-write
//     echoes are skipped; remote snapshots union the append-only ledgers;
//   • a fallback profile (snapshot error) must never let ledger fields reach
//     updateDoc/setDoc — that write would wipe real progress;
//   • append-only ledgers go to Firestore as arrayUnion, never whole-array
//     replaces; map ledgers go as dotted per-key paths.
// Drives the real auth.ts through its public API with the Firebase SDK mocked.
import { describe, it, expect, vi, beforeEach } from 'vitest';

type Sub = { onNext: (snap: unknown) => void; onError: (err: unknown) => void };

const fb = vi.hoisted(() => ({
  setDoc: vi.fn<(...args: unknown[]) => Promise<void>>(async () => {}),
  updateDoc: vi.fn<(...args: unknown[]) => Promise<void>>(async () => {}),
  subs: [] as Sub[],
  authCallback: null as null | ((user: unknown) => Promise<void> | void),
}));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: (_auth: unknown, cb: (user: unknown) => void) => {
    fb.authCallback = cb;
    return () => {};
  },
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({ path: 'users/u1' })),
  onSnapshot: (_ref: unknown, onNext: Sub['onNext'], onError: Sub['onError']) => {
    const sub: Sub = { onNext, onError };
    fb.subs.push(sub);
    return () => { /* unsubscribe: the loadSeq guard makes late fires inert */ };
  },
  setDoc: (...args: unknown[]) => fb.setDoc(...args),
  updateDoc: (...args: unknown[]) => fb.updateDoc(...args),
  arrayUnion: (...values: unknown[]) => ({ __op: 'arrayUnion', values }),
}));

vi.mock('../frontend/src/firebase', () => ({
  getAuthInstance: () => ({ currentUser: { uid: 'u1', email: 'student@example.mn' } }),
  getDb: () => ({}),
  isFirebaseConfigured: true,
}));

const LEDGER_FIELDS = [
  'completedActivityIds', 'completedActivityIdsEn', 'studyDays', 'studyDaysEn',
  'studySecondsByDate', 'studySecondsByDateEn', 'mistakeIds', 'mistakeIdsEn',
  'srsByWord', 'vocabLearnedEn', 'testHistoryEn',
];

type AuthModule = typeof import('../frontend/src/auth');
type Profile = import('../frontend/src/profiles').UserProfile;

// Fresh module state (sharedProfile, watcherStarted) per test.
async function loadAuth(): Promise<AuthModule> {
  vi.resetModules();
  return await import('../frontend/src/auth');
}

const USER = { uid: 'u1', email: 'student@example.mn' };

function latestSub(): Sub {
  return fb.subs[fb.subs.length - 1];
}

// Fire a snapshot at a subscription (default: the most recent one).
function pushSnap(
  data: Record<string, unknown> | undefined,
  opts: { pending?: boolean; exists?: boolean; sub?: Sub } = {},
) {
  const { pending = false, exists = true, sub = latestSub() } = opts;
  sub.onNext({ exists: () => exists, data: () => data, metadata: { hasPendingWrites: pending } });
}

function pushError(err: unknown = new Error('network flicker'), sub: Sub = latestSub()) {
  sub.onError(err);
}

// Start the watcher and fire the auth event — this creates the snapshot sub.
async function signIn(auth: AuthModule) {
  auth.subscribeToAuthedProfile(() => {});
  await fb.authCallback!(USER);
}

// Every field name written across all updateDoc + setDoc calls so far.
function writtenFieldRoots(): string[] {
  const calls = [...fb.updateDoc.mock.calls, ...fb.setDoc.mock.calls];
  return calls.flatMap((call) => {
    const payload = call[1] as Record<string, unknown>;
    return payload && typeof payload === 'object' ? Object.keys(payload).map((k) => k.split('.')[0]) : [];
  });
}

beforeEach(() => {
  fb.setDoc.mockReset().mockResolvedValue(undefined);
  fb.updateDoc.mockReset().mockResolvedValue(undefined);
  fb.subs = [];
  fb.authCallback = null;
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('snapshot channel routing (audit §4.2 #4)', () => {
  it('routes the first snapshot to the auth channel and later remote snapshots to updates only', async () => {
    const auth = await loadAuth();
    let authHits = 0;
    let updateHits = 0;
    auth.subscribeToAuthedProfile(() => { authHits++; });
    auth.subscribeToProfileUpdates(() => { updateHits++; });
    await fb.authCallback!(USER);

    pushSnap({ name: 'Real', completedActivityIds: ['a'] });
    expect(authHits).toBe(1);
    expect(updateHits).toBe(1);

    // A later REMOTE snapshot must not re-fire the auth channel (no tab reset).
    pushSnap({ name: 'Real', completedActivityIds: ['a', 'b'] });
    expect(authHits).toBe(1);
    expect(updateHits).toBe(2);
  });

  it('skips an echo (our own pending write) — no re-publish, no second write', async () => {
    const auth = await loadAuth();
    await signIn(auth);
    pushSnap({ completedActivityIds: ['a'] });

    let updateHits = 0;
    auth.subscribeToProfileUpdates(() => { updateHits++; }); // replays current → 1
    await auth.updateProfileFields({ completedActivityIds: ['a', 'b'], streak: 2 }); // optimistic publish → 2
    expect(fb.updateDoc).toHaveBeenCalledTimes(1);
    const hitsBeforeEcho = updateHits;

    // The echo of our own write comes back with pending writes set.
    pushSnap({ completedActivityIds: ['a', 'b'], streak: 2 }, { pending: true });
    expect(fb.updateDoc).toHaveBeenCalledTimes(1); // no second write
    expect(updateHits).toBe(hitsBeforeEcho);       // no re-publish
  });

  it('unions the append-only ledgers on a remote snapshot (local optimistic append survives)', async () => {
    const auth = await loadAuth();
    await signIn(auth);
    pushSnap({ completedActivityIds: ['a'] });
    await auth.updateProfileFields({ completedActivityIds: ['a', 'b'] }); // b not yet on server

    let received: Profile | null = null;
    auth.subscribeToProfileUpdates((p) => { received = p; });
    // Remote server snapshot has 'a' + a NEW 'c', but not the in-flight 'b'.
    pushSnap({ completedActivityIds: ['a', 'c'] });

    const ledger = received!.completedActivityIds!;
    expect(ledger).toEqual(expect.arrayContaining(['a', 'b', 'c']));
    expect(ledger).toHaveLength(3); // b (local) not hidden, c (remote) added
  });

  it('the doc-missing first snapshot writes the default profile with merge:true', async () => {
    const auth = await loadAuth();
    await signIn(auth);
    pushSnap(undefined, { exists: false });
    expect(fb.setDoc).toHaveBeenCalledTimes(1);
    expect(fb.setDoc.mock.calls[0][2]).toEqual({ merge: true });
  });
});

describe('fallback-profile write guard (audit §4.2 #1)', () => {
  it('a snapshot error before any data yields an isFallback profile and blocks every ledger field', async () => {
    const auth = await loadAuth();
    let received: Profile | null = null;
    auth.subscribeToProfileUpdates((p) => { received = p; });
    await fb.authCallback!(USER);
    pushError();

    expect(received!.isFallback).toBe(true);
    expect(received!.completedActivityIds ?? []).toHaveLength(0);
    // The error branch must not write anything by itself.
    expect(fb.setDoc).not.toHaveBeenCalled();

    // A completion recorded against the blank fallback must not persist any
    // ledger; non-ledger fields may still go through.
    await auth.updateProfileFields({
      completedActivityIds: ['library:read:1'],
      studyDays: ['2026-07-12'],
      studySecondsByDate: { '2026-07-12': 60 },
      srsByWord: { '12': { ease: 2.5, intervalDays: 1, reps: 1, due: '2026-07-13', lastReviewed: '2026-07-12' } },
      mistakeIds: ['library:read:2'],
      name: 'Сурагч',
    });

    const roots = writtenFieldRoots();
    for (const field of LEDGER_FIELDS) expect(roots).not.toContain(field);
    expect(fb.updateDoc).toHaveBeenCalledTimes(1);
    expect(fb.updateDoc.mock.calls[0][1]).toEqual({ name: 'Сурагч' });
  });

  it('a ledger-only patch under fallback writes nothing at all', async () => {
    const auth = await loadAuth();
    await signIn(auth);
    pushError(new Error('offline'));
    await auth.updateProfileFields({ completedActivityIdsEn: ['en:read:12'], vocabLearnedEn: ['ielts:abate'] });
    expect(fb.updateDoc).not.toHaveBeenCalled();
    expect(fb.setDoc).not.toHaveBeenCalled();
  });

  it('a snapshot error AFTER data keeps the data but marks fallback; a good retry restores writes', async () => {
    const auth = await loadAuth();
    let received: Profile | null = null;
    auth.subscribeToProfileUpdates((p) => { received = p; });
    await fb.authCallback!(USER);
    pushSnap({ name: 'Real', completedActivityIds: ['a'] });
    expect(received!.isFallback).toBeFalsy();

    // Terminal error on the live listener → keep data, lock ledgers, show banner.
    pushError(new Error('terminal'));
    expect(received!.isFallback).toBe(true);
    expect(received!.completedActivityIds).toEqual(['a']); // data NOT wiped
    await auth.updateProfileFields({ completedActivityIds: ['a', 'b'] });
    expect(fb.updateDoc).not.toHaveBeenCalled();

    // Retry attaches a fresh subscription; its first good snapshot recovers.
    const retry = auth.retryProfileLoad();
    pushSnap({ name: 'Real', completedActivityIds: ['a', 'b', 'c'] });
    await expect(retry).resolves.toBe(true);
    expect(received!.isFallback).toBeFalsy();

    await auth.updateProfileFields({ completedActivityIds: ['a', 'b', 'c', 'd'] });
    expect(fb.updateDoc).toHaveBeenCalledWith(expect.anything(), {
      completedActivityIds: { __op: 'arrayUnion', values: ['a', 'b', 'c', 'd'] },
    });
  });

  it('saveProfileProgress under fallback drops ledger fields and the isFallback flag', async () => {
    const auth = await loadAuth();
    await signIn(auth);
    pushError(new Error('offline'));
    const profile = {
      ...(await import('../frontend/src/profiles')).createCustomProfile('s@e.mn', 'S', 'A1', 'x'),
      isFallback: true,
      completedActivityIds: ['library:read:1'],
      mistakeIds: ['library:read:2'],
    };
    await auth.saveProfileProgress(profile);
    expect(fb.setDoc).toHaveBeenCalledTimes(1);
    const payload = fb.setDoc.mock.calls[0][1] as Record<string, unknown>;
    expect(payload.isFallback).toBeUndefined();
    for (const field of LEDGER_FIELDS) expect(payload[field]).toBeUndefined();
    expect(payload.name).toBe('S');
  });

  it('a retry that loses the race to a newer failing auth event reports the live (fallback) state', async () => {
    const auth = await loadAuth();
    await signIn(auth);
    pushError(new Error('offline')); // initial fallback

    // Start the retry — it attaches a fresh (slow) subscription.
    const retry = auth.retryProfileLoad();
    const retrySub = latestSub();

    // Before the retry's snapshot arrives, the watcher re-fires (token refresh)
    // and fails again — its fallback result wins the race.
    await fb.authCallback!(USER);
    pushError(new Error('still offline')); // fires the NEW sub

    // The retry's slow snapshot finally delivers good data, but it's stale.
    pushSnap({ name: 'Real', completedActivityIds: ['a'] }, { sub: retrySub });

    // The stale success must NOT report true — sharedProfile is still the
    // blocked fallback, so the banner must stay up and ledger writes locked.
    await expect(retry).resolves.toBe(false);
    await auth.updateProfileFields({ completedActivityIds: ['library:read:9'] });
    expect(fb.updateDoc).not.toHaveBeenCalled();
  });

  it('retryProfileLoad resolves false while the read keeps failing', async () => {
    const auth = await loadAuth();
    await signIn(auth);
    pushError(new Error('offline'));
    const retry = auth.retryProfileLoad();
    pushError(new Error('still offline'));
    await expect(retry).resolves.toBe(false);
  });
});

describe('merge-safe ledger writes (audit §4.2 #2)', () => {
  async function signInWith(data: Record<string, unknown>): Promise<AuthModule> {
    const auth = await loadAuth();
    await signIn(auth);
    pushSnap(data);
    return auth;
  }

  it('append-only ledgers are written with arrayUnion, never a plain array', async () => {
    const auth = await signInWith({ completedActivityIds: ['a'], studyDays: ['2026-07-11'] });
    await auth.updateProfileFields({
      completedActivityIds: ['a', 'b'],
      studyDays: ['2026-07-11', '2026-07-12'],
      streak: 2,
    });
    expect(fb.updateDoc).toHaveBeenCalledWith(expect.anything(), {
      completedActivityIds: { __op: 'arrayUnion', values: ['a', 'b'] },
      studyDays: { __op: 'arrayUnion', values: ['2026-07-11', '2026-07-12'] },
      streak: 2,
    });
  });

  it('a diff that would remove ledger entries never writes a plain array (removal dropped, appends kept)', async () => {
    const auth = await signInWith({ completedActivityIdsEn: ['en:read:1', 'en:read:2'] });
    // Stale copy missing en:read:2 — the write must not be able to erase it.
    await auth.updateProfileFields({ completedActivityIdsEn: ['en:read:1', 'en:read:3'] });
    expect(fb.updateDoc).toHaveBeenCalledWith(expect.anything(), {
      completedActivityIdsEn: { __op: 'arrayUnion', values: ['en:read:1', 'en:read:3'] },
    });
  });

  it('an empty append-only array is skipped entirely (cannot clear the server ledger)', async () => {
    const auth = await signInWith({ vocabLearnedEn: ['ielts:abate'] });
    await auth.updateProfileFields({ vocabLearnedEn: [], streak: 1 });
    expect(fb.updateDoc).toHaveBeenCalledWith(expect.anything(), { streak: 1 });
  });

  it('srsByWord is written as dotted per-word paths, only for changed entries', async () => {
    const kept = { ease: 2.5, intervalDays: 1, reps: 1, due: '2026-07-13', lastReviewed: '2026-07-12' };
    const auth = await signInWith({ srsByWord: { '12': kept } });
    const updated = { ease: 2.6, intervalDays: 3, reps: 2, due: '2026-07-15', lastReviewed: '2026-07-12' };
    await auth.updateProfileFields({ srsByWord: { '12': kept, '34': updated } });
    expect(fb.updateDoc).toHaveBeenCalledWith(expect.anything(), { 'srsByWord.34': updated });
  });

  it('a whole studySecondsByDate map becomes dotted per-date writes for changed dates only', async () => {
    const auth = await signInWith({ studySecondsByDate: { '2026-07-11': 300 } });
    await auth.updateProfileFields({ studySecondsByDate: { '2026-07-11': 300, '2026-07-12': 90 } });
    expect(fb.updateDoc).toHaveBeenCalledWith(expect.anything(), { 'studySecondsByDate.2026-07-12': 90 });
  });

  it('isFallback in a patch is never persisted', async () => {
    const auth = await signInWith({ name: 'Real' });
    await auth.updateProfileFields({ isFallback: true, name: 'Шинэ' } as Record<string, unknown>);
    expect(fb.updateDoc).toHaveBeenCalledWith(expect.anything(), { name: 'Шинэ' });
  });
});
