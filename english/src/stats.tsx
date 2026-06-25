// =============================================================================
// English track — learner stats (streak + study time), INDEPENDENT from German.
// -----------------------------------------------------------------------------
// The English IELTS/SAT track and the German track sign into the SAME Firebase
// account and share one `users/{uid}` profile document, but their streaks and
// weekly leaderboards are COMPLETELY SEPARATE:
//   • German owns the top-level fields: `studyDays`, `studySecondsByDate`, and
//     the scalar `streak` (managed in App.tsx).
//   • English owns its OWN fields: `studyDaysEn` + `studySecondsByDateEn`.
// This provider reuses the German recording + streak logic (App.tsx's tracker
// and learning.ts's calculateStreakWithGrace) but applies it ONLY to the
// English fields, so studying English advances only the English streak/board
// and never touches the German ones (and vice versa).
// =============================================================================
import React, {
  createContext, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { subscribeToAuthedProfile, saveProfileProgress } from '../../frontend/src/auth';
import { calculateStreakWithGrace, localDateKey } from '../../frontend/src/learning';
import type { UserProfile } from '../../frontend/src/profiles';

// Mirrors the German app's tracker tuning (App.tsx).
const ACTIVE_IDLE_LIMIT_MS = 2 * 60 * 1000; // stop counting after 2 min idle
const STUDY_SAVE_THRESHOLD_SECONDS = 120;   // flush to Firestore every ~2 min
const TICK_MS = 30_000;

export interface EnglishStats {
  /** The shared account profile, or null for guests / signed-out. */
  profile: UserProfile | null;
  /** English consecutive study-day streak (1-day grace), derived from studyDaysEn. */
  streak: number;
  /** True until the first auth callback resolves. */
  loading: boolean;
  /** Whether stats can be tracked (a real, non-guest account is signed in). */
  enabled: boolean;
  /** Mark today as studied after an English activity (adds today to studyDaysEn). */
  recordStudy: () => void;
}

const StatsContext = createContext<EnglishStats>({
  profile: null,
  streak: 0,
  loading: true,
  enabled: false,
  recordStudy: () => {},
});

export function useEnglishStats(): EnglishStats {
  return useContext(StatsContext);
}

export function EnglishStatsProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const profileRef = useRef<UserProfile | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const pendingSaveSecondsRef = useRef<number>(0);

  // Keep a ref in sync so the interval/event handlers always see the latest
  // profile without re-subscribing.
  useEffect(() => { profileRef.current = profile; }, [profile]);

  // Single source of truth for "who is signed in" — shared with the German app.
  useEffect(() => {
    const unsub = subscribeToAuthedProfile((p) => {
      profileRef.current = p;
      setProfile(p);
      setLoading(false);
    });
    return unsub;
  }, []);

  const canTrack = (p: UserProfile | null): p is UserProfile => !!p && !p.isGuest;

  // Add today to the ENGLISH study days (studyDaysEn). Called when a learner
  // completes a discrete English activity (quiz, test, review). Writes ONLY the
  // English-track fields — never the German studyDays/streak — so the two tracks
  // keep fully independent streaks.
  const recordStudy = useCallback(() => {
    const p = profileRef.current;
    if (!canTrack(p)) return;
    const today = localDateKey();
    if ((p.studyDaysEn ?? []).includes(today)) return; // already counted today
    const studyDaysEn = Array.from(new Set([...(p.studyDaysEn ?? []), today])).sort();
    const next: UserProfile = {
      ...p,
      studyDaysEn,
      lastActiveAt: new Date().toISOString(),
    };
    profileRef.current = next;
    setProfile(next);
    saveProfileProgress(next).catch((err) => {
      console.warn('Could not save English study day to Firestore:', err);
    });
  }, []);

  // Accumulate real time-on-task into the ENGLISH seconds map
  // (studySecondsByDateEn), which drives the English weekly leaderboard. Time
  // alone does NOT advance the streak — only completing an activity
  // (recordStudy) adds a study day. Flushes to Firestore on a threshold to
  // limit writes. Never touches the German studySecondsByDate.
  const recordStudySeconds = useCallback((seconds: number) => {
    const p = profileRef.current;
    if (!canTrack(p) || seconds <= 0) return;
    const today = localDateKey();
    const studySecondsByDateEn = {
      ...(p.studySecondsByDateEn ?? {}),
      [today]: Math.round((p.studySecondsByDateEn?.[today] ?? 0) + seconds),
    };
    const next: UserProfile = {
      ...p,
      studySecondsByDateEn,
      lastActiveAt: new Date().toISOString(),
    };
    profileRef.current = next;
    setProfile(next);

    pendingSaveSecondsRef.current += seconds;
    if (pendingSaveSecondsRef.current >= STUDY_SAVE_THRESHOLD_SECONDS) {
      pendingSaveSecondsRef.current = 0;
      saveProfileProgress(next).catch((err) => {
        console.warn('Could not save English study time to Firestore:', err);
      });
    }
  }, []);

  // Active study-time tracker — counts only while the tab is visible and the
  // learner interacted recently, so an idle open tab stops adding minutes.
  // Mirrors the German App.tsx tracker (whole English app is a "study tab").
  useEffect(() => {
    const markInteraction = () => { lastInteractionRef.current = Date.now(); };
    const savePending = () => {
      const p = profileRef.current;
      if (!canTrack(p) || pendingSaveSecondsRef.current <= 0) return;
      pendingSaveSecondsRef.current = 0;
      saveProfileProgress(p).catch((err) => {
        console.warn('Could not save English study time to Firestore:', err);
      });
    };

    const events = ['click', 'keydown', 'pointerdown', 'touchstart', 'scroll'];
    events.forEach((e) => window.addEventListener(e, markInteraction, { passive: true }));

    let lastTick = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const elapsed = Math.min(30, Math.max(0, (now - lastTick) / 1000));
      lastTick = now;
      const visible = document.visibilityState === 'visible';
      const recentlyActive = now - lastInteractionRef.current <= ACTIVE_IDLE_LIMIT_MS;
      if (!visible || !recentlyActive || !canTrack(profileRef.current)) return;
      recordStudySeconds(elapsed);
    }, TICK_MS);

    const onVisibility = () => {
      markInteraction();
      if (document.visibilityState === 'hidden') savePending();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('beforeunload', savePending);

    return () => {
      window.clearInterval(interval);
      events.forEach((e) => window.removeEventListener(e, markInteraction));
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('beforeunload', savePending);
      savePending();
    };
  }, [recordStudySeconds]);

  // English streak derives from the English-only study days, independent of the
  // German streak (profile.studyDays / profile.streak).
  const streak = calculateStreakWithGrace(profile?.studyDaysEn ?? []).streak;

  const value: EnglishStats = {
    profile,
    streak,
    loading,
    enabled: canTrack(profile),
    recordStudy,
  };

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
}
