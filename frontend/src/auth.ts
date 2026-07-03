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
import { doc, getDoc, setDoc, updateDoc, type UpdateData } from 'firebase/firestore';
import { getAuthInstance, getDb } from './firebase';
import { UserProfile, createCustomProfile, stripServerOwnedFields, SERVER_OWNED_PROFILE_FIELDS } from './profiles';

function profileRef(uid: string) {
  return doc(getDb(), 'users', uid);
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
  await setDoc(profileRef(user.uid), stripServerOwnedFields(profile), { merge: true });
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
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue; // Firestore rejects undefined values
    const root = key.split('.')[0];
    if ((SERVER_OWNED_PROFILE_FIELDS as readonly string[]).includes(root)) continue;
    stripped[key] = value;
  }
  if (Object.keys(stripped).length === 0) return;
  // Keep the shared cache + update-channel subscribers (paywall, language gate)
  // in sync, same as saveProfileProgress — otherwise they render a stale
  // login-time snapshot until the next full reload.
  if (sharedProfile) {
    publishAuthedProfile(mergePatch(sharedProfile as unknown as Record<string, unknown>, expandDottedPaths(stripped)) as unknown as UserProfile);
  }
  try {
    await updateDoc(profileRef(user.uid), stripped as UpdateData<UserProfile>);
  } catch (err) {
    // updateDoc fails when the document doesn't exist yet (e.g. the signup
    // profile write was skipped) — fall back to a merge write so the doc is
    // created and progress is never lost. setDoc does NOT interpret dotted
    // keys as nested field paths (only updateDoc does), so expand them first
    // or `studySecondsByDate.2026-07-02` becomes a literal top-level field.
    if ((err as { code?: string }).code === 'not-found') {
      await setDoc(profileRef(user.uid), expandDottedPaths(stripped), { merge: true });
    } else {
      throw err;
    }
  }
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
export async function saveTrackChoice(track: 'en' | 'de'): Promise<void> {
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

async function loadProfileFor(user: { uid: string; email: string | null }): Promise<UserProfile> {
  try {
    const snap = await getDoc(profileRef(user.uid));
    if (snap.exists()) return snap.data() as UserProfile;
    // Account exists but has no profile doc yet (e.g. created elsewhere) —
    // create a sensible default so the user isn't stuck.
    const fallback = createCustomProfile(
      user.email ?? '',
      (user.email ?? 'Суралцагч').split('@')[0],
      'A1',
      'Ерөнхий сургалт',
    );
    await setDoc(profileRef(user.uid), stripServerOwnedFields(fallback));
    return fallback;
  } catch (err) {
    console.warn('Could not load Firestore profile; using an in-memory fallback:', err);
    return createCustomProfile(
      user.email ?? '',
      (user.email ?? 'Суралцагч').split('@')[0],
      'A1',
      'Ерөнхий сургалт',
    );
  }
}

function startProfileWatcher(): void {
  if (watcherStarted) return;
  watcherStarted = true;
  // Lives for the whole page — intentionally never unsubscribed.
  onAuthStateChanged(getAuthInstance(), async (user) => {
    const seq = ++loadSeq;
    if (!user) {
      emitAuthEvent(null);
      return;
    }

    // Fresh sign-up: use the profile we just built (avoids the write/read race).
    if (pendingSignupProfile) {
      const profile = pendingSignupProfile;
      pendingSignupProfile = null;
      try {
        await setDoc(profileRef(user.uid), stripServerOwnedFields(profile), { merge: true });
      } catch {
        // already written by signUpWithProfile; ignore
      }
      if (seq === loadSeq) emitAuthEvent(profile);
      return;
    }

    const profile = await loadProfileFor(user);
    if (seq === loadSeq) emitAuthEvent(profile);
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
