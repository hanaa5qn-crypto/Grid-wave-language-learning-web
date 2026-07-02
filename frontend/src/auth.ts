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
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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
  try {
    await updateDoc(profileRef(user.uid), stripped);
  } catch (err) {
    // updateDoc fails when the document doesn't exist yet (e.g. the signup
    // profile write was skipped) — fall back to a merge write so the doc is
    // created and progress is never lost.
    if ((err as { code?: string }).code === 'not-found') {
      await setDoc(profileRef(user.uid), stripped, { merge: true });
    } else {
      throw err;
    }
  }
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

// Single source of truth for "who is logged in". Fires on page load (restoring a
// saved session), on login, and on logout. Returns an unsubscribe function.
export function subscribeToAuthedProfile(
  onProfile: (profile: UserProfile | null) => void,
): Unsubscribe {
  return onAuthStateChanged(getAuthInstance(), async (user) => {
    if (!user) {
      onProfile(null);
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
      onProfile(profile);
      return;
    }

    try {
      const snap = await getDoc(profileRef(user.uid));
      if (snap.exists()) {
        onProfile(snap.data() as UserProfile);
      } else {
        // Account exists but has no profile doc yet (e.g. created elsewhere) —
        // create a sensible default so the user isn't stuck.
        const fallback = createCustomProfile(
          user.email ?? '',
          (user.email ?? 'Суралцагч').split('@')[0],
          'A1',
          'Ерөнхий сургалт',
        );
        await setDoc(profileRef(user.uid), stripServerOwnedFields(fallback));
        onProfile(fallback);
      }
    } catch (err) {
      console.warn('Could not load Firestore profile; using an in-memory fallback:', err);
      const fallback = createCustomProfile(
        user.email ?? '',
        (user.email ?? 'Суралцагч').split('@')[0],
        'A1',
        'Ерөнхий сургалт',
      );
      onProfile(fallback);
    }
  });
}
