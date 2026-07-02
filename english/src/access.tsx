// =============================================================================
// English track — entitlements + paywall.
// -----------------------------------------------------------------------------
// The English app reuses the German track's plan model (Free / Pro / Max /
// founder) and the SAME Byl payment backend, so a learner has ONE subscription
// across both tracks. This module is the single source of truth for "what can
// this account see/use" in the English app:
//
//   • Free  — first IELTS test + first SAT test, first 10 vocab cards/deck.
//   • Pro   — all tests + all vocab (canAccessAllContent).
//   • Max   — Pro + unlimited AI review (canUseAi); Free/Pro get the server
//             monthly AI teaser quota, enforced in backend/routes/english-review.
//
// The gate functions (effectivePlan / canAccessAllContent / canUseAi) live in
// the German track's plans.ts; we import them so both tracks stay in lockstep.
// =============================================================================
import { useEffect, useState } from 'react';
import { subscribeToProfileUpdates } from '../../frontend/src/auth';
import type { UserProfile } from '../../frontend/src/profiles';
import { getAuthInstance, isFirebaseConfigured } from '../../frontend/src/firebase';
import {
  canAccessAllContent,
  canUseAi,
  effectivePlan,
  type EffectivePlan,
} from '../../frontend/src/plans';

// Free-tier limits for the English track.
export const FREE_TESTS = 1; // first IELTS + first SAT practice test
export const FREE_VOCAB_WORDS = 10; // first N cards per vocab deck

export interface EnglishAccess {
  profile: UserProfile | null;
  plan: EffectivePlan;
  allContent: boolean; // pro / max / founder → every test + vocab card unlocked
  unlimitedAi: boolean; // max / founder → no AI teaser cap
  loading: boolean;
}

// Subscribe to the signed-in user's profile and derive their effective plan.
// Mirrors what the German App does, but read-only here. Guests / signed-out
// users resolve to a null profile → free tier. No-op (free) when Firebase is
// not configured so the app still boots.
export function useEnglishAccess(): EnglishAccess {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    // Updates channel (not just auth events): entitlements must reflect the
    // freshest profile — e.g. the signup-trial grant published by the stats
    // provider — or a fresh trial user stays paywalled until a full reload.
    const unsub = subscribeToProfileUpdates((p) => {
      setProfile(p);
      setLoading(false);
    });
    return unsub;
  }, []);

  return {
    profile,
    plan: effectivePlan(profile),
    allContent: canAccessAllContent(profile),
    unlimitedAi: canUseAi(profile),
    loading,
  };
}

// Firebase ID token for authenticating AI + payment calls. null for guests /
// unconfigured Firebase (the backend then treats the caller as unauthenticated).
export async function getIdToken(): Promise<string | null> {
  if (!isFirebaseConfigured) return null;
  const user = getAuthInstance().currentUser;
  return user ? user.getIdToken() : null;
}
