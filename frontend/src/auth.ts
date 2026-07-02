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
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuthInstance, getDb } from './firebase';
import { UserProfile, createCustomProfile, stripServerOwnedFields } from './profiles';

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
