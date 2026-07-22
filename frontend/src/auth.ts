// Firebase Authentication + Firestore profile storage.
//
// This is the whole "real accounts + cloud-saved progress" layer:
//   • Auth        → who the user is (email + password).
//   • Firestore   → their profile + progress, stored under users/{uid}.
//
// Because progress lives in Firestore (not the browser), it follows a user to
// any device and survives every redeploy.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  type Unsubscribe,
} from 'firebase/auth';
import { arrayUnion, doc, onSnapshot, setDoc, updateDoc, type DocumentSnapshot, type UpdateData } from 'firebase/firestore';
import { getAuthInstance, getDb } from './firebase';
import { UserProfile, createCustomProfile, stripServerOwnedFields, SERVER_OWNED_PROFILE_FIELDS } from './profiles';
import { getDeviceId, notifyDeviceKicked } from './deviceSession';

function profileRef(uid: string) {
  return doc(getDb(), 'users', uid);
}

// Progress-ledger fields (audit §4.2). The append-only sets only ever grow, so
// they are written with arrayUnion (merge-safe across tabs/devices); the map
// ledgers are written one dotted path per changed key. While a fallback
// profile is active NONE of these may be written — a blank in-memory copy
// would wipe the real server-side progress.
const APPEND_ONLY_LEDGER_FIELDS = [
  'completedActivityIds', 'completedActivityIdsEn', 'vocabLearnedEn', 'studyDays', 'studyDaysEn',
  // Gate names for one-time key migrations (audit §5.2 #6, keyMigrations.ts) —
  // append-only so a slow tab can never un-set a migration another tab ran.
  'keyMigrations',
] as const;
const MAP_LEDGER_FIELDS = ['studySecondsByDate', 'studySecondsByDateEn', 'srsByWord'] as const;
const LEDGER_FIELDS = [
  ...APPEND_ONLY_LEDGER_FIELDS, ...MAP_LEDGER_FIELDS, 'mistakeIds', 'mistakeIdsEn', 'testHistoryEn',
] as const;

// Fired when progress could not be loaded (fallback profile active) or a
// ledger write failed. ProgressSyncBanner listens and offers a retry.
export const PROGRESS_SYNC_ISSUE_EVENT = 'vl-progress-sync-issue';
export function notifyProgressSyncIssue(): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(PROGRESS_SYNC_ISSUE_EVENT));
}

// When a brand-new user signs up, Firebase fires the auth-state listener the
// instant the account is created — which can race ahead of us writing their
// profile document. We stash the freshly-built profile here so the listener
// uses it instead of reading a not-yet-written document.
let pendingSignupProfile: UserProfile | null = null;

export async function signUpWithProfile(
  email: string,
  password: string,
  name: string,
  targetLevel: string,
  learningGoal: string,
): Promise<UserProfile> {
  const profile = createCustomProfile(email.trim(), name.trim(), targetLevel, learningGoal);
  pendingSignupProfile = profile;
  let cred;
  try {
    cred = await createUserWithEmailAndPassword(getAuthInstance(), email.trim(), password);
  } catch (err) {
    // Sign-up failed before Firebase created the account (e.g. email already in
    // use) — don't leave a stale profile around for the next login attempt.
    pendingSignupProfile = null;
    throw err;
  }

  try {
    await setDoc(profileRef(cred.user.uid), stripServerOwnedFields(profile), { merge: true });
  } catch (err) {
    // The Auth account now exists, so do not report signup failure just because
    // the deployment's Firestore setup is missing rules/database access. The
    // auth listener below will still let the user in with the pending profile.
    console.warn('Could not create Firestore profile after signup:', err);
  }

  return profile;
}

export async function logInWithEmail(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(getAuthInstance(), email.trim(), password);
}

export async function logOutUser(): Promise<void> {
  pendingSignupProfile = null;
  await signOut(getAuthInstance());
}

// "Forgot password" recovery. Firebase emails the user a secure, single-use
// reset link (handled entirely by Firebase — no backend or email service to set
// up). Clicking it lets them choose a new password.
export async function sendResetEmail(email: string): Promise<void> {
  await sendPasswordResetEmail(getAuthInstance(), email.trim());
}

// Persist the latest streak/progress for the signed-in user. `merge: true` so we
// only touch the fields we pass and never clobber the rest of the profile.
export async function saveProfileProgress(profile: UserProfile): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) return;
  // Keep the shared cache + update-channel subscribers (paywall, language gate)
  // in sync with what was just saved, so late subscribers never read a stale
  // login-time snapshot.
  publishAuthedProfile(profile);
  // Never echo back entitlement/usage fields — they are server-owned and
  // rejected by Firestore rules. Stripping them also avoids a stale local
  // value (e.g. aiUsage updated server-side meanwhile) failing the whole save.
  const payload = stripServerOwnedFields(profile) as unknown as Record<string, unknown>;
  delete payload.isFallback; // in-memory flag, never persisted (audit §4.2 #1)
  // Written only by the per-auth-event claim — echoing a snapshot's (possibly
  // stale) value here could kick the device that legitimately claimed since.
  delete payload.activeDeviceId;
  // A whole-profile setDoc replaces arrays wholesale. The append-only ledgers
  // are persisted solely through updateProfileFields' arrayUnion path, so drop
  // them here — merge:true keeps the server copy intact. (audit §4.2 #2)
  for (const field of APPEND_ONLY_LEDGER_FIELDS) delete payload[field];
  if (profile.isFallback || sharedProfile?.isFallback) {
    // audit §4.2 #1: never write ledgers computed from a blank fallback profile.
    for (const field of LEDGER_FIELDS) delete payload[field];
    notifyProgressSyncIssue();
  }
  await setDoc(profileRef(user.uid), payload, { merge: true });
}

// Field-level profile patch. Unlike saveProfileProgress (which writes the whole
// profile), this writes ONLY the given fields, so concurrent writers on the same
// document — the German track vs the English track — can never clobber each
// other's fields. Keys may be FieldPath-style dotted paths (e.g.
// `studySecondsByDate.2026-07-02`) to update one nested map entry without
// replacing its sibling date keys.
export async function updateProfileFields(
  patch: Partial<UserProfile> & Record<string, unknown>,
): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) return;
  // Never write entitlement/usage fields — they are server-owned and rejected
  // by Firestore rules. A dotted path counts by its first segment.
  const stripped: Record<string, unknown> = {};
  const fallbackActive = !!sharedProfile?.isFallback;
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue; // Firestore rejects undefined values
    const root = key.split('.')[0];
    if ((SERVER_OWNED_PROFILE_FIELDS as readonly string[]).includes(root)) continue;
    if (root === 'isFallback') continue; // in-memory flag, never persisted
    // audit §4.2 #1: the fallback profile is a blank stand-in for progress that
    // failed to load — persisting any ledger computed from it would wipe the
    // real progress. Refuse those fields and surface the retry banner instead.
    if (fallbackActive && (LEDGER_FIELDS as readonly string[]).includes(root)) {
      console.warn(`Blocked ledger write "${key}" while the fallback profile is active`);
      notifyProgressSyncIssue();
      continue;
    }
    stripped[key] = value;
  }
  if (Object.keys(stripped).length === 0) return;
  // Snapshot BEFORE publishing: toMergeSafePatch diffs against what the shared
  // cache held prior to this patch.
  const prevShared = sharedProfile as unknown as Record<string, unknown> | null;
  // Keep the shared cache + update-channel subscribers (paywall, language gate)
  // in sync, same as saveProfileProgress — otherwise they render a stale
  // login-time snapshot until the next full reload.
  if (sharedProfile) {
    publishAuthedProfile(mergePatch(sharedProfile as unknown as Record<string, unknown>, expandDottedPaths(stripped)) as unknown as UserProfile);
  }
  const write = toMergeSafePatch(stripped, prevShared);
  if (Object.keys(write).length === 0) return;
  try {
    await updateDoc(profileRef(user.uid), write as UpdateData<UserProfile>);
  } catch (err) {
    // updateDoc fails when the document doesn't exist yet (e.g. the signup
    // profile write was skipped) — fall back to a merge write so the doc is
    // created and progress is never lost. setDoc does NOT interpret dotted
    // keys as nested field paths (only updateDoc does), so expand them first
    // or `studySecondsByDate.2026-07-02` becomes a literal top-level field.
    // (arrayUnion sentinels pass through expandDottedPaths untouched and are
    // honored by setDoc.)
    if ((err as { code?: string }).code === 'not-found') {
      await setDoc(profileRef(user.uid), expandDottedPaths(write), { merge: true });
    } else {
      throw err;
    }
  }
}

// audit §4.2 #2 — translate whole-container ledger values into merge-safe ops:
//   • append-only sets → arrayUnion(...items): a concurrent writer (second tab,
//     other device) can only ADD, so a stale in-memory copy can never erase
//     completions recorded elsewhere. A diff that would REMOVE entries is
//     logged and not written.
//   • map ledgers (study seconds, SRS) → one dotted path per changed key, so
//     sibling dates/words already on the server are never replaced.
// In-memory state (the published profile above) keeps the caller's plain
// values; only the Firestore patch changes shape.
function toMergeSafePatch(
  stripped: Record<string, unknown>,
  prevShared: Record<string, unknown> | null,
): Record<string, unknown> {
  const write: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(stripped)) {
    if ((APPEND_ONLY_LEDGER_FIELDS as readonly string[]).includes(key) && Array.isArray(value)) {
      const prev = Array.isArray(prevShared?.[key]) ? (prevShared![key] as unknown[]) : [];
      const removed = prev.filter((item) => !value.includes(item));
      if (removed.length > 0) {
        console.warn(`Not persisting removal of ${removed.length} "${key}" entries (append-only ledger):`, removed);
      }
      if (value.length > 0) write[key] = arrayUnion(...value);
      continue;
    }
    if ((MAP_LEDGER_FIELDS as readonly string[]).includes(key) && isPlainObject(value)) {
      // Firestore dotted paths cannot address keys containing '.' — fall back
      // to the whole-map write for such maps (no key format today has one).
      if (Object.keys(value).some((k) => k.includes('.'))) {
        console.warn(`Map ledger "${key}" has a dotted key; writing the whole map`);
        write[key] = value;
        continue;
      }
      const prev = isPlainObject(prevShared?.[key]) ? (prevShared![key] as Record<string, unknown>) : {};
      for (const [mapKey, mapValue] of Object.entries(value)) {
        if (JSON.stringify(prev[mapKey]) !== JSON.stringify(mapValue)) {
          write[`${key}.${mapKey}`] = mapValue;
        }
      }
      continue;
    }
    write[key] = value;
  }
  return write;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// `{'a.b': 1}` → `{a: {b: 1}}`. Sibling dotted keys sharing a prefix merge into
// one nested object.
function expandDottedPaths(patch: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(patch)) {
    const segments = key.split('.');
    let node = out;
    for (let i = 0; i < segments.length - 1; i++) {
      const existing = node[segments[i]];
      if (typeof existing === 'object' && existing !== null && !Array.isArray(existing)) {
        node = existing as Record<string, unknown>;
      } else {
        const fresh: Record<string, unknown> = {};
        node[segments[i]] = fresh;
        node = fresh;
      }
    }
    node[segments[segments.length - 1]] = value;
  }
  return out;
}

// Non-mutating deep merge of an expanded patch into a profile copy — mirrors
// Firestore's merge semantics: plain objects merge per-key, everything else
// (arrays, scalars) is replaced.
function mergePatch(base: Record<string, unknown>, patch: Record<string, unknown>): Record<string, unknown> {
  const out = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    const existing = out[key];
    if (
      typeof value === 'object' && value !== null && !Array.isArray(value) &&
      typeof existing === 'object' && existing !== null && !Array.isArray(existing)
    ) {
      out[key] = mergePatch(existing as Record<string, unknown>, value as Record<string, unknown>);
    } else {
      out[key] = value;
    }
  }
  return out;
}

// Persist which learning track the signed-in user picked ('de' German / 'en'
// English). The choice already lives in localStorage for routing; this mirrors
// it onto the profile so the admin English/German dashboards can split customers
// by track. No-op for guests (no session) and best-effort — a failed write must
// never block entering the track. `track` isn't a server-owned field, so the
// owner-write Firestore rule allows it.
export async function saveTrackChoice(track: 'en' | 'de' | 'edu'): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) return;
  try {
    await setDoc(profileRef(user.uid), { track }, { merge: true });
  } catch (err) {
    console.warn('Could not save track choice to profile:', err);
  }
}

// =============================================================================
// Shared profile store.
// -----------------------------------------------------------------------------
// Historically every consumer (German App, LanguageGate, English stats provider,
// English paywall) attached its own onAuthStateChanged listener and did its own
// one-shot getDoc, so four diverging copies of the profile existed at once — a
// server-side trial grant merged into one copy left the paywall's copy stale
// until a full reload. Now ONE watcher loads the profile and fans it out:
//
//   • subscribeToAuthedProfile   — fires on AUTH EVENTS only (page-load session
//     restore, login, logout). Same semantics the German App was built around
//     (its callback resets tab state, so it must not re-fire on every save).
//   • subscribeToProfileUpdates  — auth events PLUS explicit publishes
//     (saveProfileProgress, trial grants). For consumers that must track the
//     freshest profile, e.g. the English paywall.
//   • publishAuthedProfile       — pushes a fresher profile into the cache and
//     notifies update-channel subscribers.
// =============================================================================
type ProfileListener = (profile: UserProfile | null) => void;

const authEventListeners = new Set<ProfileListener>();
const updateListeners = new Set<ProfileListener>();
// undefined = not resolved yet this session; null = signed out.
let sharedProfile: UserProfile | null | undefined;
let watcherStarted = false;
// Ignore a slow profile load that resolves after a newer auth event.
let loadSeq = 0;
// The live users/{uid} onSnapshot subscription (audit §4.2 #4). One per auth
// event; torn down on the next auth event / logout / retry.
let currentSnapUnsub: (() => void) | null = null;
// Bound the retry's wait on a first snapshot so the banner button can never
// spin forever (offline with no cache never errors AND never delivers).
const RETRY_TIMEOUT_MS = 8000;

// Update the shared cache and notify update-channel subscribers. Call with the
// full profile (including server-owned fields) — stripping happens only at the
// Firestore write, never in the local cache.
export function publishAuthedProfile(profile: UserProfile | null): void {
  sharedProfile = profile;
  for (const listener of [...updateListeners]) listener(profile);
}

function emitAuthEvent(profile: UserProfile | null): void {
  sharedProfile = profile;
  for (const listener of [...authEventListeners]) listener(profile);
  for (const listener of [...updateListeners]) listener(profile);
}

function defaultProfileFor(user: { email: string | null }): UserProfile {
  return createCustomProfile(
    user.email ?? '',
    (user.email ?? 'Суралцагч').split('@')[0],
    'A1',
    'Ерөнхий сургалт',
  );
}

function teardownSnapshot(): void {
  if (currentSnapUnsub) {
    currentSnapUnsub();
    currentSnapUnsub = null;
  }
}

// audit §4.2 #4: a subsequent remote snapshot may race a local optimistic
// append that hasn't landed on the server yet — union the append-only ledgers
// with the current cache so an in-flight completion is never hidden; take the
// incoming server value for everything else (scalars, maps, mistakeIds,
// testHistoryEn). In-memory only — this NEVER triggers a Firestore write.
function reconcileRemote(incoming: UserProfile, current: UserProfile | null): UserProfile {
  if (!current) return incoming;
  const merged = { ...(incoming as unknown as Record<string, unknown>) };
  const cur = current as unknown as Record<string, unknown>;
  for (const field of APPEND_ONLY_LEDGER_FIELDS) {
    const inc = merged[field];
    const old = cur[field];
    if (Array.isArray(inc) || Array.isArray(old)) {
      merged[field] = [...new Set([
        ...(Array.isArray(inc) ? inc : []),
        ...(Array.isArray(old) ? old : []),
      ])];
    }
  }
  return merged as unknown as UserProfile;
}

// Subscribe to users/{uid} for the given auth event (`seq`). The FIRST snapshot
// (or, for a fresh signup, the pre-emitted pending profile) goes out on the
// auth channel — the German App resets tab state ONLY there — every subsequent
// snapshot publishes on the updates channel only. Returns a promise the retry
// path awaits: true once a good first snapshot emitted, false on error/timeout.
// The `loadSeq` guard makes a late snapshot from a torn-down subscription inert
// and forces a stale load to report the LIVE state, not its own outcome.
function attachProfileSnapshot(
  user: { uid: string; email: string | null },
  seq: number,
  opts: { alreadyEmitted?: boolean; timeoutMs?: number } = {},
): Promise<boolean> {
  let hasEmitted = !!opts.alreadyEmitted;
  return new Promise<boolean>((resolve) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const settle = (ok: boolean) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      // A load that lost the race to a newer auth event must report the live
      // state, never its own — a stale "success" that never reached
      // sharedProfile must not dismiss the retry banner.
      resolve(seq === loadSeq ? ok : (!!sharedProfile && !sharedProfile.isFallback));
    };
    if (hasEmitted) settle(true); // signup fast-path already emitted a profile

    const onNext = (snap: DocumentSnapshot) => {
      if (seq !== loadSeq) { settle(true); return; } // torn-down / superseded
      // Single-active-device: a snapshot WITHOUT pending writes carrying some
      // other device's claim means another device logged in — sign out here.
      // (Our own claim write is queued before this listener attaches, so every
      // snapshot that includes it has hasPendingWrites and shows our own id.)
      if (!snap.metadata.hasPendingWrites && snap.exists()) {
        const claimed = (snap.data() as UserProfile).activeDeviceId;
        if (claimed && claimed !== getDeviceId()) {
          notifyDeviceKicked();
          settle(true);
          void logOutUser(); // fires an auth event → teardown + emit(null)
          return;
        }
      }
      if (!hasEmitted) {
        // FIRST snapshot this auth event → auth-channel emit (tab-state reset
        // happens ONLY here). Accepted even with pending writes so a queued
        // offline profile still boots the app.
        hasEmitted = true;
        if (!snap.exists()) {
          // Doc-missing on first load: create a default and emit it. merge:true
          // so a spurious "missing" read can never erase a doc that does exist.
          const profile = defaultProfileFor(user);
          setDoc(profileRef(user.uid), stripServerOwnedFields(profile), { merge: true })
            .catch((err) => console.warn('Could not create default profile:', err));
          emitAuthEvent(profile);
        } else {
          emitAuthEvent(snap.data() as UserProfile);
        }
        settle(true);
        return;
      }
      // SUBSEQUENT snapshot → updates channel only (never resets tab state).
      // Echo guard: a pending-write snapshot is our own local write coming back;
      // sharedProfile is already optimistically ahead, so re-publishing it can
      // only regress and risks a write loop — skip entirely.
      if (snap.metadata.hasPendingWrites) return;
      // A doc-missing snapshot AFTER we had data is a deletion — ignore it
      // rather than publishing a blank over real progress.
      if (!snap.exists()) { console.warn('Profile doc disappeared; ignoring snapshot'); return; }
      publishAuthedProfile(reconcileRemote(snap.data() as UserProfile, sharedProfile ?? null));
    };

    const onError = (err: unknown) => {
      // Firestore snapshot errors are TERMINAL — the listener stops. Recovery is
      // a fresh subscription via retryProfileLoad().
      if (seq !== loadSeq) { settle(false); return; }
      console.warn('Profile snapshot error:', err);
      notifyProgressSyncIssue();
      if (!hasEmitted) {
        // No profile yet this auth event → blank fallback (audit §4.2 #1): mark
        // it so ledger writes are refused until a retry succeeds.
        hasEmitted = true;
        emitAuthEvent({ ...defaultProfileFor(user), isFallback: true });
      } else if (sharedProfile) {
        // Already had a real profile → keep its data but mark fallback so ledger
        // writes lock and the banner shows; never publish a blank over progress.
        publishAuthedProfile({ ...sharedProfile, isFallback: true });
      }
      settle(false);
    };

    currentSnapUnsub = onSnapshot(profileRef(user.uid), onNext, onError);
    if (opts.timeoutMs) timer = setTimeout(() => settle(false), opts.timeoutMs);
  });
}

// Re-subscribe after a terminal snapshot error (ProgressSyncBanner's retry
// action). The dead subscription is torn down and a fresh one attached; on its
// first good snapshot the server profile replaces the fallback via an
// auth-event emit — same effect as a reload — which clears isFallback for every
// subscriber. Resolves false while the read keeps failing or times out. The
// loadSeq guard keeps the staleness guarantee (see attachProfileSnapshot).
export async function retryProfileLoad(): Promise<boolean> {
  const user = getAuthInstance().currentUser;
  if (!user) return false;
  const seq = ++loadSeq;
  teardownSnapshot();
  return attachProfileSnapshot(user, seq, { timeoutMs: RETRY_TIMEOUT_MS });
}

function startProfileWatcher(): void {
  if (watcherStarted) return;
  watcherStarted = true;
  // The auth listener lives for the whole page; the per-user profile SNAPSHOT
  // subscription it creates is torn down and recreated on every auth event, so
  // a late snapshot from a previous user can never emit (loadSeq guard).
  onAuthStateChanged(getAuthInstance(), (user) => {
    const seq = ++loadSeq;
    teardownSnapshot();
    if (!user) {
      emitAuthEvent(null);
      return;
    }

    // Single-active-device claim, queued BEFORE the snapshot attaches so every
    // snapshot this device sees already reflects its own id (no self-kick).
    // Session restore counts as a login: the device that most recently opened
    // the app holds the slot; everyone else gets kicked by their snapshot.
    setDoc(profileRef(user.uid), { activeDeviceId: getDeviceId() }, { merge: true })
      .catch((err) => console.warn('Could not claim active device:', err));

    // Fresh sign-up: emit the profile we just built (avoids the write/read
    // race), then STILL attach the snapshot so the account gets live updates.
    if (pendingSignupProfile) {
      const profile = pendingSignupProfile;
      pendingSignupProfile = null;
      // Best-effort ensure the doc exists (signUpWithProfile already wrote it).
      setDoc(profileRef(user.uid), stripServerOwnedFields(profile), { merge: true })
        .catch(() => { /* already written by signUpWithProfile */ });
      emitAuthEvent(profile);
      void attachProfileSnapshot(user, seq, { alreadyEmitted: true });
      return;
    }

    void attachProfileSnapshot(user, seq);
  });
}

function subscribe(listeners: Set<ProfileListener>, onProfile: ProfileListener): Unsubscribe {
  startProfileWatcher();
  listeners.add(onProfile);
  // Late subscriber (e.g. a lazily-loaded track): replay the cached state so it
  // doesn't wait for the next auth event that may never come.
  if (sharedProfile !== undefined) onProfile(sharedProfile);
  return () => { listeners.delete(onProfile); };
}

// Single source of truth for "who is logged in". Fires on page load (restoring a
// saved session), on login, and on logout. Returns an unsubscribe function.
export function subscribeToAuthedProfile(onProfile: ProfileListener): Unsubscribe {
  return subscribe(authEventListeners, onProfile);
}

// Auth events + every publishAuthedProfile (profile saves, trial/billing
// grants). Use when stale entitlements are a bug, not just a cosmetic lag.
export function subscribeToProfileUpdates(onProfile: ProfileListener): Unsubscribe {
  return subscribe(updateListeners, onProfile);
}
