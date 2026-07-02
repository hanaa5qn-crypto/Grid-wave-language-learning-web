import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Volume2, Play, Pause, CheckCircle, X, XCircle, AlertCircle,
  BookOpen, Headphones, Mic, Edit3, Languages, Settings, LogOut,
  Check, RotateCcw, Lightbulb, Flame, Award, ArrowRight, ArrowLeft,
  Sparkles, GraduationCap, ExternalLink,
  Square, AudioLines, Gauge, SpellCheck, MessageSquareText, ThumbsUp, Target,
  Lock, Loader2, QrCode, CreditCard, Shield, Calendar, Clock, Zap,
  ListChecks, BarChart3, Crown, Swords
} from 'lucide-react';
import {
  TabType,
  SpeakingEvaluation, WritingFeedback, WritingCorrection,
} from './types';
import { useBylCheckout } from './useBylCheckout';
import { DICTIONARY } from './data';
import {
  READING_LIBRARY, LISTENING_LIBRARY, WRITING_LIBRARY, SPEAKING_LIBRARY,
  Level,
} from './library';
import { resourcesFor, SkillTab } from './externalResources';
import TestDafExam from './TestDafExam';
import AdminDashboard from './AdminDashboard';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import { UserProfile, DEFAULT_PROFILES, createGuestProfile } from './profiles';
import { getMyPromo, redeemPromoCode, removeMyPromo, ensureSignupTrial, type MyPromo } from './promo';
import LoginScreen from './LoginScreen';
import LandingPage from './LandingPage';
import { track, trackVisitOncePerDay } from './analytics';
import {
  subscribeToAuthedProfile, logOutUser, updateProfileFields,
} from './auth';
import { isFirebaseConfigured, getStorageInstance, getAuthInstance } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  countDueWords,
  compareWordsByLevel, suggestedWordLevel,
  buildUnitsForLevel, unitProgress, isUnitPassed, isUnitUnlocked, lockedItemIds, Unit, UnitActivity, UNIT_PASS_RATIO,
  addMistake, clearMistake, resolveMistakes, MistakeRef,
  buildTodaySession, TodaySession,
  localDateKey as learningLocalDateKey,
} from './learning';
import { buildInflectedLookup } from './inflect';
import {
  PLANS, PLAN_ORDER, PlanId, effectivePlan, isFounder as isFounderProfile,
  canUseAi, canAccessAllContent, canInteract, isLessonLocked,
  isFreeUnitLocked, applyPromoDiscount, type BillingInterval,
} from './plans';
import OnboardingWizard from './OnboardingWizard';
import PlacementTest from './PlacementTest';
import { isFounderEmail, placementProfilePatch } from './placement';
import GrammarTipCard from './GrammarTipCard';
import DuelScreen from './DuelScreen';
import SocialSection from './SocialSection';
import { fetchDuel, fetchMyDuels, redeemReferralCode, DuelView } from './social';
import type { InviteContext } from './LoginScreen';
import MCQBlock from './components/MCQBlock';
import ExternalResourcesPanel from './components/ExternalResourcesPanel';
import QuizNav from './components/QuizNav';
import { BillingCard } from './components/BillingCard';
import { BrandLogo } from './components/BrandLogo';
import { ProfileTab } from './tabs/ProfileTab';
import { TranslateTab } from './tabs/TranslateTab';
import { ExamTab } from './tabs/ExamTab';
import { ReadTab } from './tabs/ReadTab';
import { ListenTab } from './tabs/ListenTab';
import { SpeakTab } from './tabs/SpeakTab';
import { WriteTab } from './tabs/WriteTab';
import { VocabTab } from './tabs/VocabTab';
import { SettingsTab } from './tabs/SettingsTab';
import { AppSidebar, MobileNav } from './components/AppNav';
import {
  localDateKey, activityKey, normalizeProfileMetrics, TRACKABLE_ACTIVITY_TOTAL,
} from './utils/profileMetrics';
import { audioBlobToWavBase64, audioBlobToWavBlob } from './utils/audioUtils';
import { playTts, stopTts } from './utils/tts';
import { formatMnt } from './utils/paymentUtils';

const STUDY_TABS: TabType[] = ['read', 'listen', 'speak', 'write', 'vocab', 'translate', 'exam'];
const ACTIVE_IDLE_LIMIT_MS = 2 * 60 * 1000;
const STUDY_SAVE_THRESHOLD_SECONDS = 120;

// Trainer deck, easiest first (A1 → C2) so beginners meet beginner words.
const TRAINER_WORDS = DICTIONARY.filter((w) => w.mongolian.trim().length > 0).sort(compareWordsByLevel);

// Short Mongolian part-of-speech labels shown inside the library vocabulary
// tooltips (the dictionary-backed hover popups on each German passage).
const WORD_CLASS_MN: Record<string, string> = {
  noun: 'Нэр үг', verb: 'Үйл үг', adjective: 'Тэмдэг нэр', adverb: 'Дайвар үг',
  preposition: 'Угтвар үг', pronoun: 'Төлөөний үг', numeral: 'Тооны нэр',
  conjunction: 'Холбоос үг', interjection: 'Аялга үг', article: 'Артикль', phrase: 'Хэллэг',
};

export default function App() {
  const path = window.location.pathname;
  if (path.startsWith('/admin')) {
    // /admin/english and /admin/german open the same dashboard scoped to one
    // track; bare /admin shows everyone.
    const track = path.startsWith('/admin/english') ? 'en'
      : path.startsWith('/admin/german') ? 'de'
      : undefined;
    return <AdminDashboard track={track} />;
  }
  if (path.startsWith('/terms')) return <TermsPage />;
  if (path.startsWith('/privacy')) return <PrivacyPage />;
  if (path.startsWith('/contact')) return <ContactPage />;
  return <LearnerApp />;
}

function LearnerApp() {
  // Whether the user is logged in is now driven by Firebase Authentication.
  // The signed-in user's profile + progress lives in Firestore (users/{uid}),
  // so it follows them across devices and survives every redeploy.
  const isTest = process.env.NODE_ENV === 'test';

  // User Profile State — populated by the Firebase auth listener below.
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(
    isTest ? DEFAULT_PROFILES[0] : null
  );
  // True until Firebase reports whether a saved session exists, so we can show a
  // loading screen instead of briefly flashing the login page on refresh.
  const [authLoading, setAuthLoading] = useState<boolean>(!isTest);
  // Logged-out routing: false → marketing landing page; true → login/signup
  // screen. Visitors can also enter a no-account "guest" session from either.
  const [showAuth, setShowAuth] = useState<boolean>(false);
  // Teacher-promo for the signed-in student (null = none). When present and the
  // first paid subscription hasn't happened yet, the paywall shows discounted
  // prices; a 100%-off code unlocks for free on checkout. Display only — the
  // server stays authoritative on the actual charge.
  const [myPromo, setMyPromo] = useState<MyPromo | null>(null);
  const [manualPromoCode, setManualPromoCode] = useState('');
  const [manualPromoLoading, setManualPromoLoading] = useState(false);
  const [manualPromoError, setManualPromoError] = useState<string | null>(null);
  // Monthly vs annual pricing toggle on the plan cards.
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  // Monthly AI teaser quota reported by /api/ai/quota (null until loaded; limit
  // null = unlimited). Free 2/month, Pro 5/month, Max/founder unlimited.
  const [aiQuota, setAiQuota] = useState<{ plan: string; limit: number | null; used: number; remaining: number | null } | null>(null);

  // Subscription entitlements — what the signed-in account may open right now.
  // Free: A1 lessons + first FREE_QUESTIONS_PER_SECTION questions of each A1
  // exam section. Pro: all content. Max/founder: everything + unlimited AI.
  const userPlan = effectivePlan(currentUser);
  const founderAccess = isFounderProfile(currentUser);
  const aiAllowed = canUseAi(currentUser);
  const fullContent = canAccessAllContent(currentUser);
  // AI buttons stay live while teaser uses remain; until the quota has loaded
  // we let the server be the judge rather than blocking optimistically.
  const aiUsable = aiAllowed || (aiQuota ? (aiQuota.remaining ?? 1) > 0 : true);

  // Session & UI States
  const [activeTab, setActiveTab] = useState<TabType>('read');
  const [streak, setStreak] = useState<number>(isTest ? DEFAULT_PROFILES[0].streak : 0);
  const [lessonProgress, setLessonProgress] = useState<number>(isTest ? DEFAULT_PROFILES[0].progress : 0);
  const [completedActivityIds, setCompletedActivityIds] = useState<string[]>([]);
  const [studyDays, setStudyDays] = useState<string[]>([]);
  const [studySecondsByDate, setStudySecondsByDate] = useState<Record<string, number>>({});
  // Set when a saved streak is found broken on login (holds the lost streak
  // length); shows a dismissible notice on the profile tab.
  const [brokenStreakNotice, setBrokenStreakNotice] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUserRef = useRef<UserProfile | null>(currentUser);
  const activeTabRef = useRef<TabType>(activeTab);
  const studySecondsRef = useRef<Record<string, number>>(studySecondsByDate);
  const lastInteractionRef = useRef(Date.now());
  const pendingStudySaveSecondsRef = useRef(0);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  // The profile editor (draft, avatar picker/upload, password reset) lives in
  // tabs/SettingsTab.tsx.

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    studySecondsRef.current = studySecondsByDate;
  }, [studySecondsByDate]);

  // Listen for login / logout / restored sessions. Skipped in tests (no Firebase)
  // and before the config is filled in (so the app still boots and shows the
  // "set up Firebase" notice on the login screen).
  useEffect(() => {
    if (isTest) return;
    if (!isFirebaseConfigured) { setAuthLoading(false); return; }
    const unsubscribe = subscribeToAuthedProfile((profile) => {
      if (profile) {
        const normalizedProfile = normalizeProfileMetrics(profile);
        // The saved streak is a snapshot from the last study session; the
        // recomputed one reflects the days actually missed since. When it has
        // collapsed to 0, tell the learner and persist the reset so Firestore
        // (and the leaderboard) stop showing the stale number.
        if ((profile.streak ?? 0) > 0 && normalizedProfile.streak === 0) {
          setBrokenStreakNotice(profile.streak);
          updateProfileFields({ streak: normalizedProfile.streak }).catch((err) => {
            console.warn('Could not persist streak reset to Firestore:', err);
          });
        }
        setCurrentUser(normalizedProfile);
        setStreak(normalizedProfile.streak);
        setLessonProgress(normalizedProfile.progress);
        setCompletedActivityIds(normalizedProfile.completedActivityIds ?? []);
        setStudyDays(normalizedProfile.studyDays ?? []);
        setStudySecondsByDate(normalizedProfile.studySecondsByDate ?? {});
        setActiveTab('profile');
      } else {
        // No Firebase session. If the visitor chose "try without account" at the
        // language gate (AuthGate), enter guest mode here instead of bouncing
        // them to this track's own landing page.
        let wantGuest = false;
        try { wantGuest = localStorage.getItem('vivid-lingua-guest') === '1'; } catch { /* ignore */ }
        if (wantGuest) {
          const guest = createGuestProfile();
          currentUserRef.current = guest;
          setCurrentUser(guest);
        } else {
          setCurrentUser(null);
        }
        setCompletedActivityIds([]);
        setStudyDays([]);
        setStudySecondsByDate({});
        setBrokenStreakNotice(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Active Lesson Mode / Standard mode toggler (Screen 1 quick core lesson overlay)
  const [coreLessonActive, setCoreLessonActive] = useState(false);
  const [coreLessonStep, setCoreLessonStep] = useState(1); // 1: "Guten Tag" screen, 2: "Ich bin Student" quick, 3: completed
  const [coreLessonAnswer, setCoreLessonAnswer] = useState<number | null>(null);
  const [coreLessonFeedback, setCoreLessonFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Text Selection / Accent toggles for Reading (Screen 3)
  const [readTranslateEnabled, setReadTranslateEnabled] = useState(false);
  const [readingQuizAnswer, setReadingQuizAnswer] = useState<number | null>(null);
  const [readingQuizFeedback, setReadingQuizFeedback] = useState<string | null>(null);

  // Resource Library (50+ items per skill) — cross-tab selection state. Which
  // item/level filter is open per skill stays here so startActivity (home tab,
  // curriculum path, mistake review) can deep-link into a tab; the per-attempt
  // sub-state (question index, answers, reveals, draft text) lives inside each
  // tab component in tabs/ReadTab.tsx, ListenTab.tsx, SpeakTab.tsx, WriteTab.tsx.
  const [libReadId, setLibReadId] = useState<number>(READING_LIBRARY[0].id);
  const [libReadLevel, setLibReadLevel] = useState<Level | 'all'>('all');

  const [libListenId, setLibListenId] = useState<number>(LISTENING_LIBRARY[0].id);
  const [libListenLevel, setLibListenLevel] = useState<Level | 'all'>('all');

  const [libSpeakId, setLibSpeakId] = useState<number>(SPEAKING_LIBRARY[0].id);
  const [libSpeakLevel, setLibSpeakLevel] = useState<Level | 'all'>('all');

  const [libWriteId, setLibWriteId] = useState<number>(WRITING_LIBRARY[0].id);
  const [libWriteLevel, setLibWriteLevel] = useState<Level | 'all'>('all');

  const lockedActivityIds = useMemo(() => {
    if (!currentUser) return { read: new Set<number>(), listen: new Set<number>(), speak: new Set<number>(), write: new Set<number>() };
    const levelUnits = buildUnitsForLevel(currentUser.targetLevel as Level);
    return lockedItemIds(levelUnits, new Set(completedActivityIds));
  }, [currentUser?.targetLevel, completedActivityIds]);

  // Plan lock for the "small taste" free tier: only A1 unit 1 is open, so every
  // A1 activity in a later unit is paywalled (A2–C2 is covered by isLessonLocked).
  // Empty for Pro/Max/founder. Independent of targetLevel/progression — this is
  // the plan gate, layered on top of the progression lock above.
  const freeLockedActivityIds = useMemo(() => {
    const empty = { read: new Set<number>(), listen: new Set<number>(), speak: new Set<number>(), write: new Set<number>() };
    if (canAccessAllContent(currentUser)) return empty;
    const a1Units = buildUnitsForLevel('A1' as Level);
    const locked = { read: new Set<number>(), listen: new Set<number>(), speak: new Set<number>(), write: new Set<number>() };
    a1Units.forEach((unit, idx) => {
      if (!isFreeUnitLocked(currentUser, 'A1', idx)) return;
      unit.activities.forEach((a) => locked[a.tab].add(a.itemId));
    });
    return locked;
    // Key on the derived access state too: a trial/paid period lapses by the
    // wall clock (currentPeriodEnd < now) with no billing-field change, so this
    // ensures the A1 lock recomputes on the next render after the trial ends.
  }, [canAccessAllContent(currentUser), currentUser?.billing?.plan, currentUser?.billing?.status, currentUser?.billing?.currentPeriodEnd, currentUser?.email]);

  // Authoritative lesson lock: paywalled by level (A2+) OR by the free unit-1
  // taste (later A1 units). Distinct from the progression lock (complete the
  // previous unit), which only applies at the learner's target level.
  const lessonPlanLocked = (level: string, itemId: number, tab: 'read' | 'listen' | 'speak' | 'write'): boolean =>
    isLessonLocked(currentUser, level) || freeLockedActivityIds[tab].has(itemId);

  const dueCount = useMemo(() => {
    return countDueWords(TRAINER_WORDS, currentUser?.srsByWord ?? {});
  }, [currentUser?.srsByWord, TRAINER_WORDS]);

  // Audio player variables for Listening (Screen 2). The idle/playing/paused
  // player state itself lives inside tabs/ListenTab.tsx.
  const [audioSpeed, setAudioSpeed] = useState<'0.8' | '1.0'>('1.0');

  // Draggable-type Word Chips for Listening (Screen 2)
  const [listeningPool, setListeningPool] = useState<string[]>([]);
  const [listeningDropZone, setListeningDropZone] = useState<string[]>([]);
  const [listeningFeedback, setListeningFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);

  // Microphone recording variables for Speaking (Screen 4)
  const [isRecording, setIsRecording] = useState(false);
  const [speakingTextEntered, setSpeakingTextEntered] = useState('');
  const [speakingEvaluation, setSpeakingEvaluation] = useState<SpeakingEvaluation | null>(null);
  const [speakingLoading, setSpeakingLoading] = useState(false);
  const [voiceSupportMessage, setVoiceSupportMessage] = useState('');
  const recognitionRef = useRef<any>(null);
  // The German sentence the AI judge currently grades against. Library items and
  // the detailed lesson share one judge, so this ref carries whichever target is
  // active into the async record/evaluate callbacks (which can't see render scope).
  const speakTargetRef = useRef<string>(SPEAKING_LIBRARY[0]?.modelAnswer ?? '');

  // Real-audio recording (the "voice AI" path): capture the actual mic audio,
  // re-encode to WAV in the browser, and send the bytes to Gemini to listen to.
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Translation writing exercise variables for Writing (Screen 6)
  const [writingInput, setWritingInput] = useState('');
  const [writingLoading, setWritingLoading] = useState(false);
  const [writingEvaluation, setWritingEvaluation] = useState<{
    isCorrect: boolean;
    corrected: string;
    explanation: string;
    feedbackMessage: string;
  } | null>(null);

  // Rich AI writing check shared by the writing library AND every exam writing
  // task. `writeFeedbackText` holds the exact text that was graded so the report
  // can show it regardless of which textarea (library vs exam) submitted it.
  const [writeFeedback, setWriteFeedback] = useState<WritingFeedback | null>(null);
  const [writeFeedbackLoading, setWriteFeedbackLoading] = useState(false);
  const [writeFeedbackText, setWriteFeedbackText] = useState('');

  // The vocabulary trainer/dictionary state (flashcards, SRS queue, browse
  // search) lives in tabs/VocabTab.tsx.
  // Placement-based suggestion — only once the result is unlocked, so the
  // trainer never leaks a level the learner hasn't paid to reveal. Trust only
  // the SERVER-owned placementUnlock flag (or founder), never the
  // client-writable placement.unlocked display field.
  const placementSuggestedLevel = useMemo(() => {
    const placement = currentUser?.placement;
    const unlocked = currentUser?.placementUnlock?.unlocked || founderAccess;
    if (!placement || !unlocked) return null;
    return suggestedWordLevel(placement.level);
  }, [currentUser?.placement?.level, currentUser?.placementUnlock?.unlocked, founderAccess]);

  const applyMetricProfile = (profile: UserProfile, save = true) => {
    const prev = currentUserRef.current;
    const normalizedProfile = normalizeProfileMetrics(profile);
    currentUserRef.current = normalizedProfile;
    studySecondsRef.current = normalizedProfile.studySecondsByDate ?? {};
    setCurrentUser(normalizedProfile);
    setStreak(normalizedProfile.streak);
    if (normalizedProfile.streak > 0) setBrokenStreakNotice(null);
    setLessonProgress(normalizedProfile.progress);
    setCompletedActivityIds(normalizedProfile.completedActivityIds ?? []);
    setStudyDays(normalizedProfile.studyDays ?? []);
    setStudySecondsByDate(normalizedProfile.studySecondsByDate ?? {});
    if (save && !isTest) {
      // Patch only the fields this action actually changed (vs the previous
      // in-memory profile) so a German-track write can never clobber the
      // English-track (`*En`) fields on the shared document.
      const patch: Partial<UserProfile> & Record<string, unknown> = {};
      const prevRecord = prev as unknown as Record<string, unknown> | null;
      for (const [key, value] of Object.entries(normalizedProfile as unknown as Record<string, unknown>)) {
        if (value === undefined) continue;
        if (prevRecord && JSON.stringify(prevRecord[key]) === JSON.stringify(value)) continue;
        patch[key] = value;
      }
      if (Object.keys(patch).length > 0) {
        updateProfileFields(patch).catch((err) => {
          console.warn('Could not save progress to Firestore:', err);
        });
      }
    }
  };

  const recordStudyActivity = (activityId: string) => {
    const profile = currentUserRef.current;
    if (!profile) return;

    const today = localDateKey();
    const nextCompleted = Array.from(new Set([...(profile.completedActivityIds ?? []), activityId]));
    const nextStudyDays = Array.from(new Set([...(profile.studyDays ?? []), today])).sort();
    const alreadyCompleted = (profile.completedActivityIds ?? []).includes(activityId);
    const alreadyStudiedToday = (profile.studyDays ?? []).includes(today);

    if (alreadyCompleted && alreadyStudiedToday) return;

    applyMetricProfile({
      ...profile,
      completedActivityIds: nextCompleted,
      studyDays: nextStudyDays,
      studySecondsByDate: studySecondsRef.current,
      lastActiveAt: new Date().toISOString(),
    });
  };

  const recordStudySeconds = (seconds: number) => {
    const profile = currentUserRef.current;
    if (!profile || seconds <= 0) return;

    const today = localDateKey();
    const nextSeconds = {
      ...studySecondsRef.current,
      [today]: Math.round((studySecondsRef.current[today] ?? 0) + seconds),
    };
    const nextProfile = normalizeProfileMetrics({
      ...profile,
      studySecondsByDate: nextSeconds,
      lastActiveAt: new Date().toISOString(),
    });

    currentUserRef.current = nextProfile;
    studySecondsRef.current = nextSeconds;
    setCurrentUser(nextProfile);
    setStudySecondsByDate(nextSeconds);

    pendingStudySaveSecondsRef.current += seconds;
    if (pendingStudySaveSecondsRef.current >= STUDY_SAVE_THRESHOLD_SECONDS && !isTest) {
      pendingStudySaveSecondsRef.current = 0;
      // Dotted path patches only today's seconds, never sibling date keys.
      updateProfileFields({
        [`studySecondsByDate.${today}`]: nextSeconds[today],
        learningCurve: nextProfile.learningCurve,
        lastActiveAt: nextProfile.lastActiveAt,
      }).catch((err) => {
        console.warn('Could not save study time to Firestore:', err);
      });
    }
  };

  // Track real active study time. Time counts only while the page is visible, a
  // study tab is open, and the learner interacted recently; idle open tabs stop
  // adding hours.
  useEffect(() => {
    if (isTest) return;

    const markInteraction = () => {
      lastInteractionRef.current = Date.now();
    };
    const savePendingStudyTime = () => {
      const profile = currentUserRef.current;
      if (!profile || pendingStudySaveSecondsRef.current <= 0) return;
      pendingStudySaveSecondsRef.current = 0;
      // Whole map (not a dotted path): pending seconds may straddle midnight,
      // and only the German track writes studySecondsByDate anyway.
      updateProfileFields({
        studySecondsByDate: profile.studySecondsByDate ?? {},
        learningCurve: profile.learningCurve,
        lastActiveAt: profile.lastActiveAt,
      }).catch((err) => {
        console.warn('Could not save study time to Firestore:', err);
      });
    };

    const interactionEvents = ['click', 'keydown', 'pointerdown', 'touchstart', 'scroll'];
    interactionEvents.forEach((eventName) => window.addEventListener(eventName, markInteraction, { passive: true }));

    let lastTick = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.min(30, Math.max(0, (now - lastTick) / 1000));
      lastTick = now;

      const isVisible = document.visibilityState === 'visible';
      const isRecentlyActive = now - lastInteractionRef.current <= ACTIVE_IDLE_LIMIT_MS;
      const isStudyTab = STUDY_TABS.includes(activeTabRef.current);
      if (!isVisible || !isRecentlyActive || !isStudyTab || !currentUserRef.current) return;

      recordStudySeconds(elapsedSeconds);
    }, 30000);

    const handleVisibilityChange = () => {
      markInteraction();
      if (document.visibilityState === 'hidden') savePendingStudyTime();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', savePendingStudyTime);

    return () => {
      window.clearInterval(interval);
      interactionEvents.forEach((eventName) => window.removeEventListener(eventName, markInteraction));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', savePendingStudyTime);
      savePendingStudyTime();
    };
  }, [isTest]);

  // Guest interaction prompt: visitors may browse the free-tier surface but any
  // action (answering, audio, placement, drills) opens this sign-up nudge.
  const [guestPromptOpen, setGuestPromptOpen] = useState(false);

  // Бүрэн TestDaF загвар шалгалтын симуляци (бүрэн дэлгэц overlay).
  const [testdafOpen, setTestdafOpen] = useState(false);
  // Түвшин тогтоох тест: шинэ хэрэглэгчид onboarding-ийн дараа автоматаар,
  // бусад нь Шалгалт табын картаар нээнэ.
  const [placementOpen, setPlacementOpen] = useState(false);

  // --- Нийгмийн боломжууд: тулаан, урилга --------------------------------------
  // Одоо тоглож/харж буй тулаан (бүтэн дэлгэцийн overlay).
  const [activeDuel, setActiveDuel] = useState<DuelView | null>(null);
  // activeDuel-ийн хамгийн сүүлийн утгыг interval доторх closure-аас уншихад.
  const activeDuelRef = useRef<DuelView | null>(null);
  useEffect(() => { activeDuelRef.current = activeDuel; }, [activeDuel]);
  // Player ID-аар над руу ирсэн, хараахан тоглоогүй тулааны урилга (pop-up).
  const [incomingDuel, setIncomingDuel] = useState<DuelView | null>(null);
  // Тулаан дуусахад профайлын нийгмийн хэсгийг дахин ачаалуулах тоолуур.
  const [socialRefreshKey, setSocialRefreshKey] = useState(0);
  // Login дэлгэцэд харуулах урилгын контекст (?duel= / ?ref= линкээр ирсэн зочин).
  const [inviteContext, setInviteContext] = useState<InviteContext | null>(null);

  // Аль тулааны урилгыг аль хэдийн үзүүлснийг localStorage-д хадгална (дахин
  // дахин гарч ирэхгүйн тулд). Тоглосон тулаан submitted болж байгалиар нь
  // алга болно.
  const incomingDuelSeenRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    try { incomingDuelSeenRef.current = new Set(JSON.parse(localStorage.getItem('duelChallengeSeen') || '[]')); }
    catch { incomingDuelSeenRef.current = new Set(); }
  }, []);
  const markDuelChallengeSeen = (code: string) => {
    const set = incomingDuelSeenRef.current;
    set.add(code);
    try { localStorage.setItem('duelChallengeSeen', JSON.stringify([...set].slice(-100))); } catch { /* үл тоомсорлоно */ }
  };

  // Над руу чиглэсэн (opponent = би), хараахан тоглоогүй нээлттэй тулааныг хайж
  // pop-up болгож үзүүлнэ. Тоглож буй/нээлттэй pop-up байвал давхарлахгүй.
  const checkIncomingDuels = useCallback(async () => {
    if (activeDuelRef.current) return;
    try {
      const { duels } = await fetchMyDuels();
      const seen = incomingDuelSeenRef.current;
      const incoming = duels.find((d) =>
        d.status !== 'finished' &&
        d.opponent?.isMe === true && d.opponent.submitted === false &&
        !!d.challenger && d.challenger.isMe === false &&
        !seen.has(d.code));
      if (incoming) setIncomingDuel((prev) => prev ?? incoming);
    } catch { /* нийгмийн API байхгүй (503) — үл тоомсорлоно */ }
  }, []);

  // ?duel=/?ref=/?promo= параметрүүдийг localStorage-д хадгалаад URL-ийг цэвэрлэнэ:
  // нэвтрэлт/бүртгэлийн дараа ашиглагдана (refresh даваад үлдэнэ).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const duelCode = params.get('duel');
    const refCode = params.get('ref');
    const promoCode = params.get('promo');
    if (!duelCode && !refCode && !promoCode) return;
    try {
      if (duelCode) localStorage.setItem('pendingDuelCode', duelCode);
      if (refCode) localStorage.setItem('pendingRefCode', refCode);
      if (promoCode) localStorage.setItem('pendingPromoCode', promoCode);
    } catch { /* private mode — урилгагүйгээр үргэлжилнэ */ }
    params.delete('duel');
    params.delete('ref');
    params.delete('promo');
    const qs = params.toString();
    window.history.replaceState({}, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, []);

  // Нэвтрээгүй зочинд урилгын баннер харуулахын тулд нийтийн duel preview-г татна.
  useEffect(() => {
    if (isTest) return;
    let duelCode: string | null = null;
    let refCode: string | null = null;
    try {
      duelCode = localStorage.getItem('pendingDuelCode');
      refCode = localStorage.getItem('pendingRefCode');
    } catch { return; }
    if (duelCode) {
      fetchDuel(duelCode)
        .then((duel) => setInviteContext({ kind: 'duel', challengerName: duel.challenger?.name }))
        .catch(() => setInviteContext(null));
    } else if (refCode) {
      setInviteContext({ kind: 'ref' });
    }
  }, []);

  // Нэвтэрсний дараа хүлээгдэж буй урилга болон багшийн кодыг холбож,
  // шинэ хэрэглэгчид 3 өдрийн туршилтын эрх олгоно.
  const socialBootstrapDoneRef = useRef(false);
  useEffect(() => {
    // Guests have no Firebase token, so trial/promo/duel bootstrap calls would
    // only 401 — skip them entirely for the no-account session.
    if (!currentUser || currentUser.isGuest || isTest || socialBootstrapDoneRef.current) return;
    socialBootstrapDoneRef.current = true;
    void (async () => {
      let duelCode: string | null = null;
      let refCode: string | null = null;
      let promoCode: string | null = null;
      try {
        duelCode = localStorage.getItem('pendingDuelCode');
        refCode = localStorage.getItem('pendingRefCode');
        promoCode = localStorage.getItem('pendingPromoCode');
        localStorage.removeItem('pendingDuelCode');
        localStorage.removeItem('pendingRefCode');
        localStorage.removeItem('pendingPromoCode');
      } catch { return; }

      // 1. Шинэ бүртгэлд 3 өдрийн Pro туршилтын эрх олгох (idempotent). Profile
      // нэг удаагийн getDoc-оор уншигддаг тул олгосон billing-ийг шууд merge
      // хийж, туршилтыг reload-гүйгээр идэвхжүүлнэ.
      try {
        const trial = await ensureSignupTrial();
        if (trial?.granted && trial.billing) applyBillingUpdate(trial.billing);
      } catch (err) {
        console.error('ensureSignupTrial error:', err);
      }

      // 2. Багшийн promo холбох
      if (promoCode) {
        try {
          await redeemPromoCode(promoCode);
          await loadMyPromo();
        } catch (err) {
          console.error('redeemPromoCode error:', err);
        }
      }

      // 3. Урилгын кредит: энгийн ref код, эсвэл тулааны challenger урьсанд тооцно.
      // Хуучин данс серверээс зөөлөн татгалзана (400) — алдааг үл тоомсорлоно.
      if (refCode) {
        try { await redeemReferralCode({ code: refCode }); } catch { /* үл тоомсорлоно */ }
      } else if (duelCode) {
        try { await redeemReferralCode({ duelCode }); } catch { /* үл тоомсорлоно */ }
      }
      if (duelCode) {
        try {
          const duel = await fetchDuel(duelCode);
          setActiveDuel(duel);
        } catch { /* тулаан устсан/олдоогүй — юу ч нээхгүй */ }
      }
      setInviteContext(null);

      // Линкээр тулаан нээгээгүй бол над руу ирсэн challenge байгаа эсэхийг шалгана.
      if (!duelCode) void checkIncomingDuels();
    })();
  }, [currentUser]);

  // Над руу чиглэсэн тулааны урилгыг тогтмол шалгаж (60 сек), нөгөө хүн над руу
  // challenge илгээмэгц "X таныг дуэлд уриалаа" pop-up гарч ирнэ.
  useEffect(() => {
    if (!currentUser || isTest) return;
    const id = setInterval(() => { void checkIncomingDuels(); }, 60000);
    return () => clearInterval(id);
  }, [currentUser, checkIncomingDuels]);
  // Bearer token for the AI endpoints — the server only serves AI features to
  // Max/founder accounts, so every AI call has to prove who is asking.
  const aiAuthHeaders = async (): Promise<Record<string, string>> => {
    try {
      if (!isFirebaseConfigured) return {};
      const user = getAuthInstance().currentUser;
      if (!user) return {};
      return { Authorization: `Bearer ${await user.getIdToken()}` };
    } catch {
      return {};
    }
  };

  // Refresh the monthly AI teaser counter (cheap read; never consumes a use).
  const refreshAiQuota = async () => {
    try {
      const headers = await aiAuthHeaders();
      if (!headers.Authorization) return;
      const response = await fetch('/api/ai/quota', { headers });
      if (!response.ok) return;
      const data = await response.json();
      if (typeof data?.used === 'number') setAiQuota(data);
    } catch {
      // Non-fatal: the counter just stays stale until the next AI call.
    }
  };

  // Speech Recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'de-DE';
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsRecording(true);
        setVoiceSupportMessage('Микрофон сонсож байна... Германоор хэлнэ үү.');
      };

      rec.onresult = (e: any) => {
        const spoken = e.results[0][0].transcript;
        setSpeakingTextEntered(spoken);
        evaluateSpeechText(spoken, speakTargetRef.current);
      };

      rec.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
        setIsRecording(false);
        setVoiceSupportMessage('Микрофон алдаа заалаа. Та доорх талбарт шууд шивж шалгуулах боломжтой.');
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    } else {
      setVoiceSupportMessage('Таны хөтөч дуу хоолой танихыг дэмждэггүй тул доорх хайрцагт шивж шалгуулна уу.');
    }
  }, []);

  // Clean up any active recording resources when leaving the page.
  useEffect(() => {
    return () => {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    };
  }, [recordedAudioUrl]);

  // Text-To-Speech Play helper (German neural voice, robotic-fallback inside).
  // One-shot: used for word glosses and the exam listening/speaking "play"
  // buttons. Routes through the shared neural player so it sounds human.
  const speakGerman = (text: string, speedMultiplier = 1.0) => {
    playTts(text, { lang: 'de-DE', rate: speedMultiplier });
  };

  // Fast lookup built once: lowercased German headword -> dictionary entry.
  // Powers the library vocabulary tooltips so every passage gets the same kind
  // of detailed word help the old "Дэлгэрэнгүй хичээл" lesson had — automatically.
  const dictLookup = useMemo(() => buildInflectedLookup(DICTIONARY), []);

  // Render a German passage with dictionary-backed vocabulary tooltips, matching
  // the detailed-lesson look: content words get a dashed underline, hover reveals
  // the Mongolian meaning + part of speech, and clicking hears the word spoken.
  const GLOSS_CLASSES = new Set(['noun', 'verb', 'adjective', 'adverb', 'phrase']);
  const renderRichGerman = (text: string) =>
    text.split(/(\s+)/).map((token, i) => {
      if (token === '' || /^\s+$/.test(token)) return <React.Fragment key={i}>{token}</React.Fragment>;
      const m = token.match(/^([„"«(\[]*)(.*?)([.,!?;:…”"»)\]]*)$/);
      const lead = m ? m[1] : '';
      const core = m ? m[2] : token;
      const trail = m ? m[3] : '';
      const entry = core ? dictLookup.get(core.toLowerCase()) : undefined;
      const glossable = !!entry && core.length > 1 &&
        (entry.wordClass ? GLOSS_CLASSES.has(entry.wordClass) : core.length >= 4);
      if (!glossable || !entry) return <React.Fragment key={i}>{token}</React.Fragment>;
      const cls = entry.wordClass ? (WORD_CLASS_MN[entry.wordClass] ?? '') : '';
      const spoken = entry.article ? `${entry.article} ${core}` : core;
      return (
        <React.Fragment key={i}>
          {lead}
          <span
            className="word-highlight font-extrabold text-paper-2 tracking-tight cursor-pointer relative"
            onClick={() => speakGerman(spoken)}
          >
            {core}
            <span className="tooltip-container">
              <span className="block bg-ink-raise text-paper border-2 border-ink-line font-serif font-bold text-xs rounded-xl p-3 shadow-2xl flex flex-col gap-1">
                <span className="flex items-center gap-2 text-paper">
                  <Volume2 className="w-3 h-3 fill-current text-paper-2" />
                  <span className="text-[13px] text-paper">{entry.article ? `${entry.article} ` : ''}{core} — {entry.mongolian}</span>
                </span>
                {cls && <span className="text-[11px] text-paper-2">{cls}</span>}
              </span>
            </span>
          </span>
          {trail}
        </React.Fragment>
      );
    });

  // Cancel any in-flight utterance on unmount so it never keeps talking.
  // (Per-clip / per-tab stops live inside tabs/ListenTab.tsx.)
  useEffect(() => () => stopTts(), []);


  // Evaluation trigger: Speaking (TEXT path) — used by the type-to-test box and
  // as a fallback when real audio recording isn't available.
  const evaluateSpeechText = async (text: string, target: string = speakTargetRef.current) => {
    if (!text.trim()) return;
    if (!requireAccount()) return; // visitors can't submit a speaking answer
    setSpeakingLoading(true);
    try {
      const response = await fetch('/api/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await aiAuthHeaders()) },
        body: JSON.stringify({
          sentence: target,
          spokenText: text
        })
      });
      const data = await response.json();
      setSpeakingEvaluation(data);
      if (data.isCorrect) recordStudyActivity(activityKey('speak', target));
    } catch (e) {
      console.error(e);
      // Heuristic fallback
      setSpeakingEvaluation({
        isCorrect: text.toLowerCase().includes('wie geht') || text.toLowerCase().includes('ihnen'),
        analysis: 'Таны дуудлагыг хэмжлээ. Хэлсэн үг: "' + text + '". "Wie geht es Ihnen" дуудлагатай таарч байна.',
        feedbackMessage: 'Сайн байна! Гэхдээ...'
      });
      if (text.toLowerCase().includes('wie geht') || text.toLowerCase().includes('ihnen')) {
        recordStudyActivity(activityKey('speak', target));
      }
    } finally {
      setSpeakingLoading(false);
      refreshAiQuota();
    }
  };

  // Evaluation trigger: Speaking (AUDIO path) — the real "voice AI". Sends the
  // actual recorded audio to Gemini so it can hear pronunciation and accent.
  const evaluateSpeechAudio = async (blob: Blob, target: string = speakTargetRef.current) => {
    setSpeakingLoading(true);
    setVoiceSupportMessage('AI таны дуу хоолойг сонсож, дүн шинжилгээ хийж байна...');
    try {
      const wavBlob = await audioBlobToWavBlob(blob);
      const bodyData: any = {
        sentence: target,
        mimeType: 'audio/wav',
      };

      if (isFirebaseConfigured) {
        try {
          const storage = getStorageInstance();
          const auth = getAuthInstance();
          const userId = auth.currentUser?.uid || 'anonymous';
          const fileRef = ref(storage, `audio-evaluations/${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.wav`);
          
          await uploadBytes(fileRef, wavBlob);
          const downloadUrl = await getDownloadURL(fileRef);
          bodyData.audioUrl = downloadUrl;
        } catch (storageErr) {
          console.error('Firebase Storage upload failed, falling back to base64:', storageErr);
          const wavBase64 = await audioBlobToWavBase64(blob);
          bodyData.audio = wavBase64;
        }
      } else {
        const wavBase64 = await audioBlobToWavBase64(blob);
        bodyData.audio = wavBase64;
      }

      const response = await fetch('/api/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await aiAuthHeaders()) },
        body: JSON.stringify(bodyData)
      });
      const data = await response.json();
      setSpeakingEvaluation(data);
      if (data.isCorrect) recordStudyActivity(activityKey('speak', target));
      if (data.transcript) setSpeakingTextEntered(data.transcript);
      setVoiceSupportMessage('Шинжилгээ бэлэн боллоо! Доороос үр дүнгээ хараарай.');
    } catch (e) {
      console.error('Audio evaluation failed:', e);
      setVoiceSupportMessage('Дуу хоолой шинжлэхэд алдаа гарлаа. Доорх талбарт шивж туршина уу.');
    } finally {
      setSpeakingLoading(false);
      refreshAiQuota();
    }
  };

  // Begin capturing real microphone audio via MediaRecorder. `target` is the
  // German model sentence to grade against; stored on a ref so the async onstop
  // callback evaluates the same item even if the user navigates afterwards.
  const startAudioRecording = async (target: string = speakTargetRef.current) => {
    speakTargetRef.current = target;
    setSpeakingEvaluation(null);
    setSpeakingTextEntered('');
    if (recordedAudioUrl) { URL.revokeObjectURL(recordedAudioUrl); setRecordedAudioUrl(null); }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      // Older browser: fall back to Web Speech API text recognition if present.
      setVoiceSupportMessage('Таны хөтөч дуу бичлэгийг дэмжихгүй байна. Доорх талбарт шивж туршина уу.');
      try { recognitionRef.current?.start(); } catch { /* no-op */ }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      // Pick a mime type the browser actually supports (Chrome: webm, Safari: mp4).
      const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const mimeType = candidates.find((t) => (window as any).MediaRecorder?.isTypeSupported?.(t)) || '';
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (blob.size > 0) {
          setRecordedAudioUrl(URL.createObjectURL(blob));
          await evaluateSpeechAudio(blob);
        }
      };

      recorder.start();
      setIsRecording(true);
      setRecordSeconds(0);
      recordTimerRef.current = setInterval(() => setRecordSeconds((s) => s + 1), 1000);
      setVoiceSupportMessage('Бичиж байна... Германоор хэлчихээд зогсоох товчийг дарна уу.');
    } catch (e) {
      console.error('Microphone access failed:', e);
      setIsRecording(false);
      setVoiceSupportMessage('Микрофон руу хандах боломжгүй байна. Зөвшөөрлөө шалгах эсвэл доор шивж туршина уу.');
    }
  };

  // Stop recording; onstop handler runs the AI evaluation.
  const stopAudioRecording = () => {
    if (recordTimerRef.current) { clearInterval(recordTimerRef.current); recordTimerRef.current = null; }
    try { mediaRecorderRef.current?.stop(); } catch { /* no-op */ }
    setIsRecording(false);
  };

  // Toggle Microphone recording (real-audio voice-AI pipeline). `target` is the
  // German model sentence the AI judge grades the recording against.
  const toggleMic = (target: string = speakTargetRef.current) => {
    if (!isRecording && !requireAccount()) return; // visitors can't record/submit
    if (isRecording) {
      stopAudioRecording();
    } else {
      startAudioRecording(target);
    }
  };

  // Clear the shared AI-judge state (report, typed text, recording playback).
  // Called when switching speaking library items or modes so a stale report
  // never lingers under a different prompt.
  const resetSpeakingJudge = () => {
    setSpeakingEvaluation(null);
    setSpeakingTextEntered('');
    setVoiceSupportMessage('');
    if (recordedAudioUrl) { URL.revokeObjectURL(recordedAudioUrl); setRecordedAudioUrl(null); }
  };


  // Clear the shared AI writing report. Called when switching writing library
  // items/modes, exam items/sections, or main tabs so a report never lingers
  // under a different prompt.
  const resetWritingFeedback = () => {
    setWriteFeedback(null);
    setWriteFeedbackText('');
  };

  // Evaluation trigger: free writing (library + every exam writing task). Sends
  // the learner's text plus the task context to the AI, which flags wrong grammar
  // / wrong words and recommends better wording. `ctx` is the active item.
  const checkComposition = async (
    text: string,
    ctx: { prompt: string; points: string[]; modelAnswer: string; level: string },
  ) => {
    if (!text.trim()) return;
    if (!requireAccount()) return; // visitors can't submit a writing answer
    setWriteFeedbackLoading(true);
    setWriteFeedbackText(text);
    setWriteFeedback(null);
    try {
      const response = await fetch('/api/evaluate-composition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await aiAuthHeaders()) },
        body: JSON.stringify({
          prompt: ctx.prompt,
          points: ctx.points,
          modelAnswer: ctx.modelAnswer,
          level: ctx.level,
          text,
        }),
      });
      const data = await response.json();
      setWriteFeedback(data);
      if (data.isCorrect) recordStudyActivity(activityKey(`write:${ctx.level}`, ctx.prompt));
    } catch (e) {
      console.error('Composition evaluation failed:', e);
      setWriteFeedback({
        isCorrect: false,
        feedbackMessage: 'Алдаа гарлаа',
        analysis: 'Шинжилгээ хийх үед алдаа гарлаа. Сүлжээгээ шалгаад дахин оролдоно уу.',
        corrected: text,
        corrections: [],
      });
    } finally {
      setWriteFeedbackLoading(false);
      refreshAiQuota();
    }
  };


  // Trigger main quick core quiz options (Screen 1 mock-flow helper)
  const submitCoreLessonAnswer = (optionIndex: number) => {
    setCoreLessonAnswer(optionIndex);
    // Correct option is "Өдрийн мэнд" which is index 1
    if (optionIndex === 1) {
      setCoreLessonFeedback('correct');
      recordStudyActivity('lesson:core-guten-tag');
    } else {
      setCoreLessonFeedback('incorrect');
    }
  };

  // Central function to launch activities from suggested sections or unit
  // curriculum path. Only the cross-tab selection (item id + level filter) is
  // set here; the per-attempt sub-state (question index, answers, reveals,
  // draft text) lives inside each tab component and starts fresh on mount.
  const startActivity = (tab: 'read' | 'listen' | 'speak' | 'write', itemId: number) => {
    if (tab === 'read') {
      const item = READING_LIBRARY.find((r) => r.id === itemId);
      if (item) {
        setLibReadId(item.id);
        setLibReadLevel(item.level);
        setActiveTab('read');
      }
    } else if (tab === 'listen') {
      const item = LISTENING_LIBRARY.find((l) => l.id === itemId);
      if (item) {
        setLibListenId(item.id);
        setLibListenLevel(item.level);
        setActiveTab('listen');
      }
    } else if (tab === 'speak') {
      const item = SPEAKING_LIBRARY.find((s) => s.id === itemId);
      if (item) {
        setLibSpeakId(item.id);
        resetSpeakingJudge();
        setLibSpeakLevel(item.level);
        setActiveTab('speak');
      }
    } else if (tab === 'write') {
      const item = WRITING_LIBRARY.find((w) => w.id === itemId);
      if (item) {
        setLibWriteId(item.id);
        resetWritingFeedback();
        setLibWriteLevel(item.level);
        setActiveTab('write');
      }
    }
  };

  // Side bar navigation helper with auto menu closing on mobile. Clears the
  // shared AI reports so a speaking/writing result never bleeds across tabs.
  const selectTab = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    resetSpeakingJudge();
    resetWritingFeedback();
  };

  // Count each browser once per day so the admin dashboard sees real traffic,
  // not just signups. Runs regardless of auth state (the whole point is to
  // measure logged-out visitors who never convert).
  useEffect(() => {
    if (isTest) return;
    trackVisitOncePerDay();
  }, []);

  // Enter a no-account guest session so visitors can sample the app (free tier)
  // before signing up. Nothing persists — saveProfileProgress() bails with no
  // Firebase user. The free-tier gating already limits guests appropriately.
  const startGuest = () => {
    if (!isTest) track('guest_start');
    setActiveTab('read');
    const guest = createGuestProfile();
    currentUserRef.current = guest;
    setCurrentUser(guest);
  };

  // Guest hits a "sign up to save" prompt → drop the guest session and show the
  // signup screen.
  const exitGuestToSignup = () => {
    if (!isTest) track('signup_click');
    setGuestPromptOpen(false);
    currentUserRef.current = null;
    setCurrentUser(null);
    setShowAuth(true);
  };

  // Gate every interactive action behind a real account: a guest can view the
  // free-tier surface but cannot interact with it. Returns true if the caller
  // may proceed; otherwise opens the sign-up nudge and returns false.
  const requireAccount = (): boolean => {
    if (!canInteract(currentUser)) {
      setGuestPromptOpen(true);
      return false;
    }
    return true;
  };

  const logoutUser = () => {
    // The auth listener clears currentUser once Firebase signs out; we reset the
    // tab immediately so the UI feels responsive.
    setActiveTab('read');
    // Guests have no Firebase session — the listener won't fire. Clear the guest
    // flag and reload so the top-level AuthGate returns to the login screen
    // (where they can sign in, sign up, or guest into a language again).
    if (currentUserRef.current?.isGuest) {
      currentUserRef.current = null;
      try { localStorage.removeItem('vivid-lingua-guest'); } catch { /* ignore */ }
      window.location.reload();
      return;
    }
    logOutUser().catch((err) => console.warn('Sign out failed:', err));
  };

  // Teacher-promo lookup for the paywall (discount display + free-grant CTA).
  const loadMyPromo = async () => {
    try {
      const { promo } = await getMyPromo();
      setMyPromo(promo);
    } catch {
      setMyPromo(null);
    }
  };

  const handleRedeemManualPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPromoCode.trim()) return;
    setManualPromoLoading(true);
    setManualPromoError(null);
    setPaymentMessage(null);
    try {
      const res = await redeemPromoCode(manualPromoCode.trim());
      if (res.redeemed) {
        setPaymentMessage({
          type: 'success',
          text: `Багш ${res.teacherName || ''}-ийн код холбогдлоо. (${res.discountPercent}% хямдрал эхний төлбөрт ажиллана.)`
        });
        setManualPromoCode('');
        await loadMyPromo();
      } else if (res.already) {
        setManualPromoError('Энэ код аль хэдийн таны дансанд холбогдсон байна.');
      } else {
        setManualPromoError('Код холбож чадсангүй.');
      }
    } catch (err: any) {
      setManualPromoError(err.message || 'Код холбоход алдаа гарлаа.');
    } finally {
      setManualPromoLoading(false);
    }
  };

  // Холбосон promo-гоо салгаж, өөр код холбох боломж нээнэ.
  const handleRemoveMyPromo = async () => {
    setManualPromoLoading(true);
    setManualPromoError(null);
    setPaymentMessage(null);
    try {
      await removeMyPromo();
      setMyPromo(null);
      setManualPromoCode('');
      setPaymentMessage({ type: 'info', text: 'Код салгагдлаа. Одоо өөр код холбож болно.' });
    } catch (err: any) {
      setManualPromoError(err.message || 'Код салгаж чадсангүй.');
    } finally {
      setManualPromoLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser || isTest) return;
    loadPaymentMethods();
    refreshAiQuota();
    // Promo lookup needs a Firebase token — guests would only 401.
    if (!currentUser.isGuest) loadMyPromo();
  }, [currentUser?.email, currentUser?.billing?.plan, currentUser?.isGuest, isTest]);

  // Merge a billing object returned by the payments API into the local profile.
  const applyBillingUpdate = (billing: NonNullable<UserProfile['billing']>) => {
    if (!currentUserRef.current) return;
    const nextProfile = normalizeProfileMetrics({
      ...currentUserRef.current,
      billing: {
        ...currentUserRef.current.billing,
        ...billing,
      },
    });
    currentUserRef.current = nextProfile;
    setCurrentUser(nextProfile);
  };

  // Byl / dummy checkout + invoice polling — shared with the English track.
  const {
    paymentMethods, paymentMethodsLoading, loadPaymentMethods,
    bylCheckout, setBylCheckout,
    dummyInvoice,
    paymentActionLoading, paymentStatusLoading,
    paymentMessage, setPaymentMessage,
    startCheckout, payDummyInvoice, checkBylPaymentStatus,
  } = useBylCheckout({
    applyBilling: applyBillingUpdate,
    billingInterval,
    onFreeGrant: loadMyPromo,
  });

  // ---------------------------------------------------------------------------
  // Locked-feature card. Shown wherever the current plan doesn't cover a
  // feature; the button jumps to the Profile tab where plans are sold.
  // ---------------------------------------------------------------------------
  const renderPlanLockCard = (title: string, description: string, requiredPlan: 'pro' | 'max') => (
    <div className="w-full flex flex-col items-center justify-center text-center gap-3 py-8 px-6 bg-ink-raise border-2 border-ink-line border-dashed rounded-xl block-shadow my-4">
      <span className="w-14 h-14 rounded-full bg-ink-raise border-2 border-ink-line flex items-center justify-center block-shadow">
        <Lock className="w-6 h-6 text-paper" />
      </span>
      <h4 className="text-lg font-light font-serif text-paper">{title}</h4>
      <p className="text-sm text-paper-2 max-w-md leading-relaxed">{description}</p>
      <button
        onClick={() => setActiveTab('profile')}
        className="flex items-center gap-2 px-5 py-2.5 bg-paper text-ink border-2 border-ink-line rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] active:scale-95 transition-transform"
      >
        <Zap className="w-4 h-4" /> {PLANS[requiredPlan].name} багц авах
      </button>
    </div>
  );

  // What the AI lock card says: quota ran out vs. plain Max-only pitch.
  const aiLockDesc = (feature: string) =>
    aiQuota && aiQuota.limit !== null
      ? `Энэ сарын үнэгүй AI туршилт (${aiQuota.limit}) дууслаа. ${feature} Max багцад хязгааргүй.`
      : `${feature} Max багцад хязгааргүй нээлттэй.`;

  // Small counter strip shown above AI features while teaser uses remain.
  const renderAiTeaserBanner = () =>
    !aiAllowed && aiQuota && aiQuota.limit !== null && (aiQuota.remaining ?? 0) > 0 ? (
      <div className="w-full flex flex-wrap items-center justify-center gap-2 px-4 py-2 mb-3 bg-ink-raise/60 border-2 border-ink-line rounded-xl text-xs font-bold text-paper block-shadow">
        <Sparkles className="w-3.5 h-3.5" />
        Энэ сарын үнэгүй AI туршилт: {aiQuota.remaining}/{aiQuota.limit} үлдсэн
        <button onClick={() => setActiveTab('profile')} className="text-paper-2 underline cursor-pointer font-black">
          Max багцаар хязгааргүй
        </button>
      </div>
    ) : null;

  // ---------------------------------------------------------------------------
  // Shared AI speaking-judge UI. `target` is the German model sentence the recording
  // (or typed text) is graded against. Reused by every library item AND the detailed
  // lesson, so importing new speaking resources gets the AI judge automatically.
  // Free/Pro accounts spend monthly teaser uses; once exhausted, the upgrade
  // card replaces the judge until next month.
  // ---------------------------------------------------------------------------
  const renderSpeakingJudge = (target: string) => !aiUsable ? renderPlanLockCard(
    'Дуут AI багш',
    aiLockDesc('Ярианы дасгалын AI үнэлгээ (дуудлага, оноо, зөвлөмж)'),
    'max',
  ) : (
    // Microphone Interface Area — real voice recording for the AI coach
    <div className="w-full flex flex-col items-center justify-center relative py-6 bg-ink-raise border-2 border-ink-line border-dashed rounded-xl block-shadow my-4">

      <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 bg-ink-raise border-2 border-ink-line text-[11px] font-light font-serif rounded-full uppercase tracking-wider block-shadow">
        <AudioLines className="w-3.5 h-3.5" /> Дуут AI багш
      </span>

      <div className="px-6 w-full flex justify-center">{renderAiTeaserBanner()}</div>

      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={() => toggleMic(target)}
          disabled={speakingLoading && !isRecording}
          title={isRecording ? 'Зогсоох' : 'Бичиж эхлэх'}
          className={`relative z-10 w-24 h-24 text-paper rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none border-2 border-ink-line cursor-pointer block-shadow disabled:opacity-60 disabled:cursor-not-allowed ${
            isRecording ? 'bg-paper text-ink animate-ripple' : 'bg-paper'
          }`}
        >
          {isRecording ? <Square className="w-9 h-9 fill-current" /> : <Mic className="w-10 h-10 stroke-[2.5px]" />}
        </button>
      </div>

      <h4 className="text-xl font-black text-paper-2 font-sans mb-1 flex items-center gap-2">
        {isRecording && <span className="w-2.5 h-2.5 rounded-full bg-paper animate-pulse" />}
        {speakingLoading && !isRecording
          ? 'AI сонсож байна...'
          : isRecording
            ? `Бичиж байна  ${String(Math.floor(recordSeconds / 60)).padStart(2, '0')}:${String(recordSeconds % 60).padStart(2, '0')}`
            : 'Бичихийн тулд дарна уу'}
      </h4>
      <p className="text-sm font-semibold text-paper-3 text-center px-4 max-w-md">
        {voiceSupportMessage || 'Микрофон дээр дарж германаар чанга ярина уу. Дуусаад зогсоох товчийг дарвал AI таны дуу хоолойг сонсож, дуудлага, аялга, дүрэм, үгсийн санг үнэлнэ.'}
      </p>

      {/* Playback of the learner's own recording */}
      {recordedAudioUrl && !isRecording && (
        <div className="mt-5 w-full max-w-sm px-4 flex flex-col items-center gap-1.5">
          <p className="text-[11px] font-serif text-paper-3 font-bold uppercase">Таны бичлэг:</p>
          <audio src={recordedAudioUrl} controls className="w-full h-10" />
        </div>
      )}

      {/* Text alternative input field for users with missing micro permissions */}
      <div className="mt-6 w-full max-w-sm px-4 flex flex-col gap-2">
        <p className="text-[11px] font-serif text-paper-3 font-bold uppercase text-center">Эсвэл дуу бичихгүйгээр шивж туршина уу:</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Германаар бичнэ үү (e.g., Wie geht es Ihnen?)"
            value={speakingTextEntered}
            onChange={(e) => setSpeakingTextEntered(e.target.value)}
            maxLength={500}
            className="flex-grow bg-ink-raise border-2 border-ink-line font-bold text-sm px-3 py-2 rounded-xl outline-none focus:border-ink-line transition-all text-paper"
          />
          <button
            onClick={() => evaluateSpeechText(speakingTextEntered, target)}
            disabled={!speakingTextEntered.trim() || speakingLoading}
            className="px-4 py-2 border-2 border-ink-line text-sm font-bold bg-paper text-ink rounded-xl block-shadow cursor-pointer disabled:opacity-50"
          >
            {speakingLoading ? 'Үнэлж байна...' : 'Шалгах'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSpeakingReport = (target: string) => (
    // AI voice-coach report — pronunciation, accent, grammar, vocabulary
    !speakingEvaluation ? null : (
      <div className="w-full flex flex-col gap-4 animate-scale-up">

        {/* Headline + summary */}
        <div className="w-full border-2 border-ink-line rounded-xl p-6 flex items-start gap-4 shadow-sm block-shadow">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 border-ink-line shrink-0 block-shadow ${
            speakingEvaluation.isCorrect ? 'bg-ink-raise' : 'bg-ink-raise'
          }`}>
            {speakingEvaluation.isCorrect ? <CheckCircle className="w-5 h-5 text-paper-2" /> : <AlertCircle className="w-5 h-5 text-paper-2" />}
          </div>
          <div className="flex-grow">
            <h5 className="text-lg font-black text-paper mb-1 font-sans">{speakingEvaluation.feedbackMessage}</h5>
            <p className="text-sm text-paper-2 leading-relaxed font-sans">{speakingEvaluation.analysis}</p>
          </div>
        </div>

        {/* Score row (only when the AI returned numeric scores) */}
        {typeof speakingEvaluation.overallScore === 'number' && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Нийт оноо', value: speakingEvaluation.overallScore, icon: Target },
              { label: 'Дуудлага', value: speakingEvaluation.pronunciationScore, icon: AudioLines },
              { label: 'Чөлөөтэй байдал', value: speakingEvaluation.fluencyScore, icon: Gauge },
            ].filter((s) => typeof s.value === 'number').map((s, i) => {
              const v = s.value as number;
              const tone = v >= 75 ? 'text-paper-2' : v >= 50 ? 'text-paper' : 'text-paper-2';
              const barTone = v >= 75 ? 'bg-paper' : v >= 50 ? 'bg-paper' : 'bg-paper';
              return (
                <div key={i} className="border-2 border-ink-line rounded-xl p-4 block-shadow flex flex-col items-center text-center">
                  <s.icon className={`w-5 h-5 mb-1 ${tone}`} />
                  <span className={`text-3xl font-light font-serif ${tone}`}>{v}</span>
                  <span className="text-[10px] font-bold uppercase text-paper-3 tracking-wide mt-0.5">{s.label}</span>
                  <div className="w-full h-1.5 bg-ink-2 rounded-full mt-2 overflow-hidden">
                    <div className={`h-full ${barTone} rounded-full transition-all`} style={{ width: `${v}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* What the AI heard */}
        {speakingEvaluation.transcript && (
          <div className="w-full bg-ink-raise border-2 border-ink-line rounded-xl p-4 block-shadow">
            <p className="text-[11px] font-serif font-bold uppercase text-paper-3 mb-1 flex items-center gap-1.5">
              <MessageSquareText className="w-3.5 h-3.5" /> AI сонссон нь
            </p>
            <p className="text-base font-bold text-paper font-sans">"{speakingEvaluation.transcript}"</p>
          </div>
        )}

        {/* Detailed feedback cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Дуудлага', text: speakingEvaluation.pronunciationFeedback, icon: AudioLines, tint: 'bg-ink-raise' },
            { label: 'Аялга', text: speakingEvaluation.accentNote, icon: Languages, tint: 'bg-ink-raise' },
            { label: 'Дүрэм', text: speakingEvaluation.grammarFeedback, icon: SpellCheck, tint: 'bg-ink-raise' },
            { label: 'Үгсийн сан', text: speakingEvaluation.vocabularyFeedback, icon: BookOpen, tint: 'bg-ink-raise' },
          ].filter((c) => c.text).map((c, i) => (
            <div key={i} className="border-2 border-ink-line rounded-xl p-4 block-shadow">
              <p className="text-xs font-black uppercase text-paper mb-1.5 flex items-center gap-1.5">
                <span className={`w-6 h-6 rounded-full ${c.tint} border-2 border-ink-line flex items-center justify-center`}>
                  <c.icon className="w-3.5 h-3.5" />
                </span>
                {c.label}
              </p>
              <p className="text-sm text-paper-2 leading-relaxed font-sans">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Strengths / improvements */}
        {((speakingEvaluation.strengths?.length || 0) > 0 || (speakingEvaluation.improvements?.length || 0) > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(speakingEvaluation.strengths?.length || 0) > 0 && (
              <div className="bg-ink-raise/40 border-2 border-ink-line rounded-xl p-4">
                <p className="text-xs font-black uppercase text-paper-2 mb-2 flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> Сайн байгаа тал</p>
                <ul className="space-y-1.5">
                  {speakingEvaluation.strengths!.map((s, i) => (
                    <li key={i} className="text-sm text-paper font-medium flex items-start gap-2"><Check className="w-4 h-4 text-paper-2 shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {(speakingEvaluation.improvements?.length || 0) > 0 && (
              <div className="bg-ink-raise/40 border-2 border-ink-line rounded-xl p-4">
                <p className="text-xs font-black uppercase text-paper-2 mb-2 flex items-center gap-1.5"><Target className="w-4 h-4" /> Сайжруулах зүйл</p>
                <ul className="space-y-1.5">
                  {speakingEvaluation.improvements!.map((s, i) => (
                    <li key={i} className="text-sm text-paper font-medium flex items-start gap-2"><ArrowRight className="w-4 h-4 text-paper-2 shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { if (!requireAccount()) return; speakGerman(target); }}
            className="px-4 py-2 bg-ink-raise border-2 border-ink-line rounded-lg text-xs font-bold text-paper hover:bg-ink-raise transition-colors font-serif flex items-center gap-2 block-shadow cursor-pointer"
          >
            <Volume2 className="w-4 h-4" /> Загвар дуудлага сонсох
          </button>
          <button
            onClick={() => toggleMic(target)}
            disabled={isRecording || speakingLoading}
            className="px-4 py-2 bg-paper border-2 border-ink-line rounded-lg text-xs font-bold text-ink hover:scale-[1.02] transition-transform font-serif flex items-center gap-2 block-shadow cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" /> Дахин бичих
          </button>
        </div>
      </div>
    )
  );

  // ---------------------------------------------------------------------------
  // Shared AI writing checker. Reused by the writing library AND every exam
  // writing task, so importing new writing resources gets the AI check
  // automatically. `text` is the learner's input; `ctx` is the active item.
  // ---------------------------------------------------------------------------
  const renderWritingChecker = (
    text: string,
    ctx: { prompt: string; points: string[]; modelAnswer: string; level: string },
  ) => !aiUsable ? renderPlanLockCard(
    'AI бичгийн засвар',
    aiLockDesc('Бичсэн зохиолын AI үнэлгээ, засвар, оноо'),
    'max',
  ) : (
    <>
      <div className="mt-4">
        {renderAiTeaserBanner()}
        <button
          onClick={() => checkComposition(text, ctx)}
          disabled={!text.trim() || writeFeedbackLoading}
          className="flex items-center gap-2 px-5 py-2.5 bg-paper text-ink border-2 border-ink-line rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" /> {writeFeedbackLoading ? 'AI шалгаж байна...' : 'AI-аар шалгуулах'}
        </button>
      </div>
      {renderCompositionReport()}
    </>
  );

  const renderCompositionReport = () => (
    !writeFeedback ? null : (
      <div className="w-full flex flex-col gap-4 mt-5 animate-scale-up">

        {/* Headline + summary */}
        <div className="w-full border-2 border-ink-line rounded-xl p-6 flex items-start gap-4 shadow-sm block-shadow">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 border-ink-line shrink-0 block-shadow ${
            writeFeedback.isCorrect ? 'bg-ink-raise' : 'bg-ink-raise'
          }`}>
            {writeFeedback.isCorrect ? <CheckCircle className="w-5 h-5 text-paper-2" /> : <AlertCircle className="w-5 h-5 text-paper-2" />}
          </div>
          <div className="flex-grow">
            <h5 className="text-lg font-black text-paper mb-1 font-sans">{writeFeedback.feedbackMessage}</h5>
            <p className="text-sm text-paper-2 leading-relaxed font-sans">{writeFeedback.analysis}</p>
          </div>
        </div>

        {/* Score row (only when the AI returned numeric scores) */}
        {typeof writeFeedback.overallScore === 'number' && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Нийт оноо', value: writeFeedback.overallScore, icon: Target },
              { label: 'Дүрэм', value: writeFeedback.grammarScore, icon: SpellCheck },
              { label: 'Үгсийн сан', value: writeFeedback.vocabularyScore, icon: BookOpen },
            ].filter((s) => typeof s.value === 'number').map((s, i) => {
              const v = s.value as number;
              const tone = v >= 75 ? 'text-paper-2' : v >= 50 ? 'text-paper' : 'text-paper-2';
              const barTone = v >= 75 ? 'bg-paper' : v >= 50 ? 'bg-paper' : 'bg-paper';
              return (
                <div key={i} className="border-2 border-ink-line rounded-xl p-4 block-shadow flex flex-col items-center text-center">
                  <s.icon className={`w-5 h-5 mb-1 ${tone}`} />
                  <span className={`text-3xl font-light font-serif ${tone}`}>{v}</span>
                  <span className="text-[10px] font-bold uppercase text-paper-3 tracking-wide mt-0.5">{s.label}</span>
                  <div className="w-full h-1.5 bg-ink-2 rounded-full mt-2 overflow-hidden">
                    <div className={`h-full ${barTone} rounded-full transition-all`} style={{ width: `${v}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* What you wrote vs the corrected version */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {writeFeedbackText && (
            <div className="bg-ink-raise border-2 border-ink-line rounded-xl p-4 block-shadow">
              <p className="text-[11px] font-serif font-bold uppercase text-paper-3 mb-1 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" /> Таны бичсэн нь
              </p>
              <p className="text-sm text-paper font-sans whitespace-pre-line leading-relaxed">{writeFeedbackText}</p>
            </div>
          )}
          {writeFeedback.corrected && (
            <div className="bg-ink-raise/30 border-2 border-ink-line rounded-xl p-4 block-shadow">
              <p className="text-[11px] font-serif font-bold uppercase text-paper-2 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Засаж сайжруулсан хувилбар
              </p>
              <p className="text-sm text-paper font-medium font-sans whitespace-pre-line leading-relaxed">{writeFeedback.corrected}</p>
            </div>
          )}
        </div>

        {/* Specific corrections — wrong grammar / wrong word → better wording */}
        {(writeFeedback.corrections?.length || 0) > 0 && (
          <div className="border-2 border-ink-line rounded-xl p-4 block-shadow">
            <p className="text-xs font-black uppercase text-paper mb-3 flex items-center gap-1.5">
              <SpellCheck className="w-4 h-4 text-paper" /> Засварууд ({writeFeedback.corrections!.length})
            </p>
            <div className="flex flex-col gap-2.5">
              {writeFeedback.corrections!.map((c, i) => (
                <div key={i} className="border-2 border-ink-line rounded-lg p-3 bg-ink-raise">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-sm font-bold text-paper-2 line-through font-mono">{c.original}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-paper-3 shrink-0" />
                    <span className="text-sm font-bold text-paper-2 font-mono">{c.suggestion}</span>
                    <span className="text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded bg-ink-raise border border-ink-line text-paper">{c.type}</span>
                  </div>
                  <p className="text-xs text-paper-2 leading-relaxed">{c.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grammar / vocabulary summary cards */}
        {(writeFeedback.grammarFeedback || writeFeedback.vocabularyFeedback) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'Дүрэм', text: writeFeedback.grammarFeedback, icon: SpellCheck, tint: 'bg-ink-raise' },
              { label: 'Үгсийн сан', text: writeFeedback.vocabularyFeedback, icon: BookOpen, tint: 'bg-ink-raise' },
            ].filter((c) => c.text).map((c, i) => (
              <div key={i} className="border-2 border-ink-line rounded-xl p-4 block-shadow">
                <p className="text-xs font-black uppercase text-paper mb-1.5 flex items-center gap-1.5">
                  <span className={`w-6 h-6 rounded-full ${c.tint} border-2 border-ink-line flex items-center justify-center`}>
                    <c.icon className="w-3.5 h-3.5" />
                  </span>
                  {c.label}
                </p>
                <p className="text-sm text-paper-2 leading-relaxed font-sans">{c.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Strengths / improvements */}
        {((writeFeedback.strengths?.length || 0) > 0 || (writeFeedback.improvements?.length || 0) > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(writeFeedback.strengths?.length || 0) > 0 && (
              <div className="bg-ink-raise/40 border-2 border-ink-line rounded-xl p-4">
                <p className="text-xs font-black uppercase text-paper-2 mb-2 flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> Сайн байгаа тал</p>
                <ul className="space-y-1.5">
                  {writeFeedback.strengths!.map((s, i) => (
                    <li key={i} className="text-sm text-paper font-medium flex items-start gap-2"><Check className="w-4 h-4 text-paper-2 shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {(writeFeedback.improvements?.length || 0) > 0 && (
              <div className="bg-ink-raise/40 border-2 border-ink-line rounded-xl p-4">
                <p className="text-xs font-black uppercase text-paper-2 mb-2 flex items-center gap-1.5"><Target className="w-4 h-4" /> Сайжруулах зүйл</p>
                <ul className="space-y-1.5">
                  {writeFeedback.improvements!.map((s, i) => (
                    <li key={i} className="text-sm text-paper font-medium flex items-start gap-2"><ArrowRight className="w-4 h-4 text-paper-2 shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    )
  );

  // While Firebase is checking for a saved session, show a brief loading screen
  // so we don't flash the login page at an already-signed-in user.
  if (authLoading) {
    return (
      <div className="bg-ink text-paper font-sans min-h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-light font-serif tracking-tight flex items-center gap-3">
          <BrandLogo className="w-9 h-9" />
          <span><span className="text-paper">Vivid</span> <span className="text-paper-2">Lingua</span></span>
        </h1>
        <Loader2 className="w-7 h-7 text-paper animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    // Invite links (duel / referral) jump straight to signup. Otherwise show
    // the marketing landing page first, and only swap in the auth screen once
    // the visitor chooses to log in or sign up.
    if (showAuth || inviteContext) {
      return (
        <LoginScreen
          inviteContext={inviteContext ?? undefined}
          onBack={inviteContext ? undefined : () => setShowAuth(false)}
        />
      );
    }
    return (
      <LandingPage
        onGetStarted={() => { if (!isTest) track('signup_click'); setShowAuth(true); }}
        onLogin={() => setShowAuth(true)}
        onTryGuest={startGuest}
      />
    );
  }

  if (currentUser && !currentUser.onboardingDone) {
    return (
      <OnboardingWizard
        userName={currentUser.name}
        onComplete={(data) => {
          applyMetricProfile({
            ...currentUser,
            onboardingDone: true,
            learningGoal: data.goal,
            targetLevel: data.level,
            dailyGoalMinutes: data.dailyGoalMinutes,
          });
        }}
      />
    );
  }

  // Шинэ хэрэглэгч onboarding дуусмагц түвшин тогтоох тест өгнө; бусад үед
  // Шалгалт табын картаар дахин нээж болно. Үр дүн нээгдсэн (төлбөртэй/founder)
  // үед л targetLevel-ийг тестийн түвшнээр шинэчилнэ.
  if (currentUser && (currentUser.placementPending || placementOpen)) {
    return (
      <PlacementTest
        isFounder={isFounderEmail(currentUser.email)}
        evalCredits={currentUser.placementCredits ?? 0}
        onFinish={(record) => {
          setPlacementOpen(false);
          // The CEFR result is given + assigned automatically; content gating
          // (Free = A1 only) still locks higher-level lessons until upgrade.
          applyMetricProfile({
            ...currentUser,
            ...placementProfilePatch(record),
          });
        }}
        onSkip={() => {
          setPlacementOpen(false);
          if (currentUser.placementPending) {
            applyMetricProfile({ ...currentUser, placementPending: false });
          }
        }}
      />
    );
  }

  return (
    <div className="bg-ink text-paper font-sans min-h-screen flex flex-col md:flex-row relative overflow-x-hidden">

      {/* Зочин горим — явцаа хадгалахын тулд бүртгүүлэх уриалга (бусад дэлгэцийг хаахгүй, хөвдөг) */}
      {currentUser?.isGuest && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-2rem)] max-w-md animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-ink-raise/95 backdrop-blur-md border border-ink-line/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Sparkles className="w-5 h-5 text-paper-2 flex-shrink-0" />
            <p className="text-xs md:text-sm font-semibold text-paper flex-grow">
              Зочин горимоор үзэж байна. Явцаа хадгалж, бүх түвшин нээхийн тулд бүртгүүлээрэй.
            </p>
            <button
              onClick={exitGuestToSignup}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-paper hover:bg-paper text-ink text-xs md:text-sm font-bold border border-ink-line/40 transition-all cursor-pointer"
            >
              Бүртгүүлэх
            </button>
          </div>
        </div>
      )}

      {/* Зочин интеракц хийх гэж оролдоход гарах бүртгүүлэх цонх */}
      {guestPromptOpen && (
        <div className="fixed inset-0 z-[140] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 animate-fade-in"
          onClick={() => setGuestPromptOpen(false)}>
          <div className="bg-ink-raise border border-ink-line/30 rounded-2xl p-6 max-w-sm w-full space-y-4 animate-scale-up text-paper shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center gap-3">
              <span className="w-14 h-14 rounded-2xl bg-ink-raise border border-ink-line flex items-center justify-center text-paper-2">
                <Lock className="w-7 h-7" />
              </span>
              <h3 className="text-lg font-serif font-light text-paper">Бүртгүүлж үнэгүй эхлээрэй</h3>
              <p className="text-sm text-paper-2 font-medium">
                Зочин горимд та зөвхөн үзэж болно. Дасгал, шалгалт, түвшин тогтоох тестийг ажиллуулахын тулд үнэгүй бүртгүүлнэ үү — бүртгүүлэхэд 3 өдрийн бүх эрх нээгдэнэ.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={exitGuestToSignup}
                className="w-full px-4 py-2.5 rounded-xl bg-paper text-ink text-sm font-bold cursor-pointer hover:bg-white transition-colors">
                Бүртгүүлэх
              </button>
              <button onClick={() => setGuestPromptOpen(false)}
                className="w-full px-4 py-2.5 rounded-xl bg-ink-raise text-paper-2 border border-ink-line text-sm font-bold cursor-pointer hover:bg-ink-2 transition-colors">
                Үзсээр байх
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TestDaF бүрэн загвар шалгалт — бүрэн дэлгэц overlay (sidebar-аас дээгүүр) */}
      {testdafOpen && <TestDafExam onExit={() => setTestdafOpen(false)} />}

      {/* Тулааны урилгын pop-up — над руу challenge ирэхэд */}
      {incomingDuel && !activeDuel && (
        <div className="fixed inset-0 z-[130] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 animate-fade-in">
          <div className="bg-ink-raise border border-ink-line/30 rounded-2xl p-6 max-w-sm w-full space-y-4 animate-scale-up text-paper shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center text-center gap-3">
              <span className="w-14 h-14 rounded-2xl bg-ink-raise border border-ink-line flex items-center justify-center text-paper-2">
                <Swords className="w-7 h-7" />
              </span>
              {incomingDuel.challenger?.avatar && (
                <img src={incomingDuel.challenger.avatar} alt="" className="w-12 h-12 rounded-full object-cover -mt-1" />
              )}
              <h3 className="text-xl font-light font-serif">
                <span className="text-paper">
                  {incomingDuel.challenger?.name ?? 'Нэгэн суралцагч'}
                </span>{' '}
                таныг тулаанд уриалаа!
              </h3>
              <p className="text-sm text-paper-2 leading-relaxed">
                {incomingDuel.level} түвшний 10 асуултад өрсөлдөнө — ялагч <b className="text-paper-2">+1 Streak Freeze</b> авна.
              </p>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { markDuelChallengeSeen(incomingDuel.code); setIncomingDuel(null); }}
                className="flex-1 py-3 border border-ink-line hover:bg-ink-raise rounded-xl font-bold transition-all text-paper cursor-pointer"
              >
                Дараа
              </button>
              <button
                onClick={() => { markDuelChallengeSeen(incomingDuel.code); setActiveDuel(incomingDuel); setIncomingDuel(null); }}
                className="flex-[2] bg-paper text-ink font-bold rounded-xl py-3 px-4 hover:bg-paper transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Swords className="w-4 h-4" /> Тоглох
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Тулаан (quiz duel) — бүрэн дэлгэц overlay */}
      {activeDuel && (
        <DuelScreen
          duel={activeDuel}
          onExit={(changed) => {
            setActiveDuel(null);
            if (changed) setSocialRefreshKey((k) => k + 1);
          }}
        />
      )}

      {/* Standalone Duolingo Core Quiz Overlay (Matches Screen 1 format explicitly) */}
      {coreLessonActive && (
        <div id="core-lesson-modal" className="fixed inset-0 bg-ink z-100 flex flex-col items-center justify-between pb-8 pt-4 px-4 md:px-12 animate-fade-in text-paper">
          {/* Atmospheric background glows in overlay */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-paper/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-paper/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
          
          {/* Top Header progress & close buttons */}
          <header className="w-full max-w-[800px] flex items-center gap-4 py-2 relative z-10">
            <button 
              id="close-lesson-btn"
              onClick={() => {
                setCoreLessonActive(false);
                setCoreLessonAnswer(null);
                setCoreLessonFeedback(null);
              }}
              className="w-12 h-12 flex items-center justify-center border border-ink-line rounded-full hover:bg-ink-raise transition-all block-shadow bg-ink-raise text-paper cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl font-bold">close</span>
            </button>
            <div className="flex-grow h-4 bg-ink-raise border border-ink-line rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-paper transition-all duration-500 relative"
                style={{ width: coreLessonStep === 1 ? '60%' : '100%' }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-ink-raise"></div>
              </div>
            </div>
          </header>

          {/* Core Exercise Workspace */}
          {coreLessonStep === 1 ? (
            <main className="flex-grow w-full max-w-[800px] flex flex-col justify-between py-8 md:py-16">
              {/* Present German Word Display */}
              <div className="flex flex-col items-center justify-center flex-grow mb-12">
                <div className="flex items-center gap-6">
                  <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-center tracking-tight text-paper">
                    Guten Tag
                  </h1>
                  <button 
                    id="audio-prompt-btn"
                    onClick={() => speakGerman('Guten Tag')}
                    className="w-16 h-16 flex items-center justify-center bg-paper text-ink rounded-full border-2 border-ink-line block-shadow hover:bg-paper hover:scale-105 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-2xl fill">volume_up</span>
                  </button>
                </div>
              </div>

              {/* Choices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Option 1 */}
                <button 
                  onClick={() => !coreLessonFeedback && submitCoreLessonAnswer(0)}
                  disabled={coreLessonFeedback !== null}
                  className={`choice-card relative w-full text-left bg-ink-raise border border-ink-line rounded-xl p-6 group transition-all block-shadow cursor-pointer ${
                    coreLessonAnswer === 0 && coreLessonFeedback === 'incorrect' ? 'bg-ink-raise border-ink-line text-paper opacity-100 shadow-black/40' :
                    coreLessonFeedback !== null ? 'opacity-40 cursor-not-allowed' : 'hover:border-ink-line hover:bg-ink-raise'
                  }`}
                >
                  <span className="absolute top-4 right-4 border border-ink-line bg-ink-raise px-2 py-1 rounded font-serif text-[12px] font-bold text-paper-2 group-hover:border-ink-line group-hover:text-paper">1</span>
                  <span className={`font-sans text-lg font-bold ${coreLessonAnswer === 0 && coreLessonFeedback === 'incorrect' ? 'text-paper-2' : 'text-paper group-hover:text-paper-2'}`}>Өглөөний мэнд</span>
                </button>

                {/* Option 2 (Correct) */}
                <button 
                  onClick={() => !coreLessonFeedback && submitCoreLessonAnswer(1)}
                  disabled={coreLessonFeedback !== null}
                  className={`choice-card relative w-full text-left rounded-xl p-6 group transition-all block-shadow cursor-pointer ${
                    coreLessonAnswer === 1 && coreLessonFeedback === 'correct' ? 'bg-ink-raise border-ink-line text-paper-2 opacity-100 shadow-black/40' :
                    coreLessonFeedback === 'incorrect' ? 'bg-ink-raise border-dashed border-ink-line opacity-100' : 
                    coreLessonFeedback !== null ? 'opacity-40 cursor-not-allowed' : 'bg-ink-raise border border-ink-line hover:border-ink-line'
                  }`}
                >
                  <span className="absolute top-4 right-4 border border-ink-line bg-ink-raise px-2 py-1 rounded font-serif text-[12px] font-bold text-paper-2 group-hover:border-ink-line group-hover:text-paper">2</span>
                  <span className={`font-sans text-lg font-bold ${coreLessonAnswer === 1 && coreLessonFeedback === 'correct' ? 'text-paper-2' : 'text-paper group-hover:text-paper-2'}`}>Өдрийн мэнд</span>
                </button>

                {/* Option 3 */}
                <button 
                  onClick={() => !coreLessonFeedback && submitCoreLessonAnswer(2)}
                  disabled={coreLessonFeedback !== null}
                  className={`choice-card relative w-full text-left bg-ink-raise border border-ink-line rounded-xl p-6 group transition-all block-shadow cursor-pointer ${
                    coreLessonAnswer === 2 && coreLessonFeedback === 'incorrect' ? 'bg-ink-raise border-ink-line text-paper opacity-100 shadow-black/40' :
                    coreLessonFeedback !== null ? 'opacity-40 cursor-not-allowed' : 'hover:border-ink-line hover:bg-ink-raise'
                  }`}
                >
                  <span className="absolute top-4 right-4 border border-ink-line bg-ink-raise px-2 py-1 rounded font-serif text-[12px] font-bold text-paper-2 group-hover:border-ink-line group-hover:text-paper">3</span>
                  <span className={`font-sans text-lg font-bold ${coreLessonAnswer === 2 && coreLessonFeedback === 'incorrect' ? 'text-paper-2' : 'text-paper group-hover:text-paper-2'}`}>Баяртай</span>
                </button>

                {/* Option 4 */}
                <button 
                  onClick={() => !coreLessonFeedback && submitCoreLessonAnswer(3)}
                  disabled={coreLessonFeedback !== null}
                  className={`choice-card relative w-full text-left bg-ink-raise border border-ink-line rounded-xl p-6 group transition-all block-shadow cursor-pointer ${
                    coreLessonAnswer === 3 && coreLessonFeedback === 'incorrect' ? 'bg-ink-raise border-ink-line text-paper opacity-100 shadow-black/40' :
                    coreLessonFeedback !== null ? 'opacity-40 cursor-not-allowed' : 'hover:border-ink-line hover:bg-ink-raise'
                  }`}
                >
                  <span className="absolute top-4 right-4 border border-ink-line bg-ink-raise px-2 py-1 rounded font-serif text-[12px] font-bold text-paper-2 group-hover:border-ink-line group-hover:text-paper">4</span>
                  <span className={`font-sans text-lg font-bold ${coreLessonAnswer === 3 && coreLessonFeedback === 'incorrect' ? 'text-paper-2' : 'text-paper group-hover:text-paper-2'}`}>Сайн байна уу</span>
                </button>
              </div>
            </main>
          ) : (
            // Core Lesson Completed Screen
            <div className="flex-grow w-full max-w-[800px] flex flex-col items-center justify-center p-8 text-center my-auto transition-all animate-scale-up">
              <div className="w-24 h-24 rounded-full bg-ink-raise flex items-center justify-center border-4 border-ink-line block-shadow-green mb-8">
                <span className="material-symbols-outlined text-4xl text-paper font-black fill">trophy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-paper mb-4">Хичээл Амжилттай Дууслаа!</h2>
              <p className="text-body-lg text-paper-2 max-w-md mb-8">
                Баяр хүргэе! Та өнөөдрийн quick-lesson даалгаврыг амжилттай дуусгаж, Германы суурь мэндийг цээжиллээ.
              </p>
              <div className="border-2 border-ink-line rounded-xl p-6 max-w-sm block-shadow w-full flex justify-around items-center">
                <div>
                  <p className="text-[12px] font-serif text-paper-3 font-bold uppercase">Streak</p>
                  <p className="text-2xl font-black text-paper-2 flex items-center justify-center gap-1">
                    <Flame className="w-6 h-6 text-paper fill-paper-2" /> {streak} өдөр
                  </p>
                </div>
                <div className="w-[1px] h-10 bg-ink-line"></div>
                <div>
                  <p className="text-[12px] font-serif text-paper-3 font-bold uppercase">Прогресс</p>
                  <p className="text-2xl font-black text-paper flex items-center justify-center gap-1">
                    <CheckCircle className="w-6 h-6 text-paper-2 fill-paper-2" /> {lessonProgress}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Slider Toast Bottom Panel */}
          {coreLessonFeedback && (
            <div className={`w-full max-w-[800px] p-6 border-4 border-ink-line rounded-2xl flex flex-col sm:flex-row justify-between items-center shadow-[0_-8px_24px_rgba(0,0,0,0.1)] gap-4 transition-all duration-300 ${
              coreLessonFeedback === 'correct' 
                ? 'bg-paper text-ink border-paper shadow-black/40'
                : 'bg-ink-raise text-paper border-ink-line shadow-black/40'
            }`}>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl fill">
                  {coreLessonFeedback === 'correct' ? 'check_circle' : 'cancel'}
                </span>
                <div>
                  <h3 className="text-xl font-black font-sans">
                    {coreLessonFeedback === 'correct' ? 'Зөв байна! Сүрхий!' : 'Өө, буруу даралт!'}
                  </h3>
                  <p className="text-[14px]">
                    {coreLessonFeedback === 'correct' ? '"Guten Tag" нь өдрийн мэндийг илэрхийлдэг.' : 'Хариулт 2 ("Өдрийн мэнд") нь зөв хувилбар байв.'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  if (coreLessonStep === 1) {
                    setCoreLessonStep(2);
                    setCoreLessonAnswer(null);
                    setCoreLessonFeedback(null);
                  } else {
                    // Close lesson overlay
                    setCoreLessonActive(false);
                    setCoreLessonStep(1);
                    setCoreLessonAnswer(null);
                    setCoreLessonFeedback(null);
                  }
                }}
                className={`px-8 py-3 font-sans font-bold text-[16px] rounded-xl border-2 border-ink-line transition-all block-shadow w-full sm:w-auto cursor-pointer ${
                  coreLessonFeedback === 'correct' 
                    ? 'bg-paper text-ink hover:bg-white' 
                    : 'bg-paper text-ink hover:bg-white'
                }`}
              >
                Үргэлжлүүлэх
              </button>
            </div>
          )}
        </div>
      )}

      {/* Shared Sidebar - Visible on Desktop only */}
      <AppSidebar
        currentUser={currentUser}
        activeTab={activeTab}
        selectTab={selectTab}
        streak={streak}
        dueCount={dueCount}
        logoutUser={logoutUser}
      />

      {/* Shared TopAppBar - Mobile Only */}
      <header className="md:hidden flex justify-between items-center w-full px-4 h-16 bg-ink-raise border-b-2 border-ink-line fixed top-0 left-0 z-40 shrink-0">
        <button 
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="text-paper p-2 border-2 border-ink-line rounded-lg bg-ink-raise hover:bg-ink-2 shadow-[2px_2px_0_0_#000000] cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl font-bold">menu</span>
        </button>
        <h1 className="text-xl font-light font-serif text-paper tracking-tight flex items-center gap-2">
          <BrandLogo className="w-6 h-6" />
          Vivid Lingua
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center p-2 text-paper-2 select-none">
            <Flame className="w-5 h-5 text-paper fill-paper-2 animate-pulse" />
            <span className="text-xs font-black text-paper ml-1">{streak}</span>
          </div>
          <div className="p-2 text-paper select-none">
            <span className="material-symbols-outlined fill text-lg">military_tech</span>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-45 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-[280px] h-full bg-ink py-8 px-4 flex flex-col gap-y-6 text-paper border-r border-ink-line animate-slide-right relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-2">
              <h1 className="text-2xl font-light font-serif flex items-center gap-2">
                <BrandLogo className="w-7 h-7" />
                Vivid Lingua
              </h1>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full border border-ink-line bg-ink-raise hover:bg-ink-raise cursor-pointer"
              >
                <X className="w-5 h-5 text-paper" />
              </button>
            </div>

            {currentUser ? (
              <div className="bg-ink-raise p-3 rounded-xl border border-ink-line mx-2 flex gap-3 items-center cursor-pointer hover:bg-ink-raise" onClick={() => selectTab('profile')}>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-ink-raise border border-ink-line flex-shrink-0">
                  <img alt="User" className="w-full h-full object-cover" src={currentUser.avatar} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold truncate text-paper leading-tight">{currentUser.name}</h3>
                  <p className="text-[10px] text-paper-2 font-bold truncate leading-none mt-0.5">{currentUser.role}</p>
                </div>
              </div>
            ) : (
              <div className="bg-ink-raise p-3 rounded-xl border border-ink-line mx-2 flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-ink-raise flex items-center justify-center text-paper-2">
                  <span className="material-symbols-outlined">account_circle</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-paper">Нэвтрээгүй</h3>
                  <p className="text-[10px] text-paper-2">Сайн байна уу?</p>
                </div>
              </div>
            )}

            <ul className="flex flex-col gap-2 mt-4 flex-grow px-2 overflow-y-auto">
              {currentUser && (
                <li>
                  <button 
                    onClick={() => selectTab('profile')}
                    className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'profile' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                  >
                    <Target className="w-5 h-5" />
                    <span>Хяналтын самбар</span>
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={() => selectTab('read')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'read' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Унших</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => selectTab('listen')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'listen' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <Headphones className="w-5 h-5" />
                  <span>Сонсох</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => selectTab('speak')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'speak' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <Mic className="w-5 h-5" />
                  <span>Ярих</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => selectTab('write')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'write' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <Edit3 className="w-5 h-5" />
                  <span>Бичих</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => selectTab('vocab')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'vocab' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <Languages className="w-5 h-5" />
                  <span className="flex-grow flex justify-between items-center pr-4">
                    <span>Үгсийн сан</span>
                    {dueCount > 0 && (
                      <span className="bg-paper text-ink text-[10px] font-bold font-serif px-2 py-0.5 rounded-full">
                        {dueCount}
                      </span>
                    )}
                  </span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => selectTab('translate')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'translate' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <Sparkles className="w-5 h-5 text-paper" />
                  <span>Орчуулагч</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => selectTab('exam')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'exam' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <GraduationCap className="w-5 h-5 text-paper" />
                  <span>Шалгалт</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectTab('friends')}
                  className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 rounded-xl cursor-pointer ${activeTab === 'friends' ? 'text-paper border-l-4 border-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`}
                >
                  <Swords className="w-5 h-5 text-paper" />
                  <span>Найзууд</span>
                </button>
              </li>
            </ul>

            <div className="border-t border-ink-line pt-4 px-2 flex flex-col gap-1 shrink-0">
              <button 
                onClick={() => selectTab('settings')}
                className="flex items-center gap-3 py-2 w-full text-left text-paper hover:text-paper"
              >
                <Settings className="w-4 h-4" />
                <span>Тохиргоо</span>
              </button>
              {currentUser && (
                <button 
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-2 w-full text-left text-paper hover:text-paper-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-paper-3" />
                  <span>Гарах</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-grow md:ml-[280px] px-4 md:px-8 flex flex-col justify-between pt-24 md:pt-8 w-full min-h-screen relative overflow-x-hidden max-lg:overflow-y-auto max-lg:overscroll-y-contain lg:overflow-hidden bg-ink">
        {/* Ambient neon flares */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-paper/[0.02] rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-paper/[0.02] rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full relative z-10">

          {/* Unified Lesson Progress Bar - Screen 2/3 style */}
          {activeTab !== 'settings' && activeTab !== 'profile' && activeTab !== 'friends' && (
            <div className="w-full mb-8 flex items-center gap-4 bg-ink-raise p-4 rounded-2xl border border-ink-line block-shadow">
              <div className="h-4 flex-grow bg-ink-raise border border-ink-line rounded-full overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div 
                  className="h-full bg-paper transition-all duration-300 rounded-full relative" 
                  style={{ width: `${lessonProgress}%` }}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-ink-raise"></div>
                </div>
              </div>
              <span className="text-xs font-serif font-bold bg-paper text-ink px-4 py-1.5 rounded-full border border-ink-line shadow-black/40">
                {lessonProgress}% дууссан
              </span>
            </div>
          )}

          {/* Render Active View Modules */}

          {/* Tab 0: Профайл / Хяналтын самбар */}
          {activeTab === 'profile' && (
            <ProfileTab
              authLoading={authLoading}
              brokenStreakNotice={brokenStreakNotice}
              setBrokenStreakNotice={setBrokenStreakNotice}
              completedActivityIds={completedActivityIds}
              currentUser={currentUser}
              lessonProgress={lessonProgress}
              logoutUser={logoutUser}
              selectTab={selectTab}
              startActivity={startActivity}
              streak={streak}
              studyDays={studyDays}
              TRAINER_WORDS={TRAINER_WORDS}
              TRACKABLE_ACTIVITY_TOTAL={TRACKABLE_ACTIVITY_TOTAL}
              billingCard={
                <BillingCard
                  currentUser={currentUser}
                  billingInterval={billingInterval}
                  setBillingInterval={setBillingInterval}
                  bylCheckout={bylCheckout}
                  setBylCheckout={setBylCheckout}
                  checkBylPaymentStatus={checkBylPaymentStatus}
                  dummyInvoice={dummyInvoice}
                  payDummyInvoice={payDummyInvoice}
                  manualPromoCode={manualPromoCode}
                  setManualPromoCode={setManualPromoCode}
                  manualPromoError={manualPromoError}
                  manualPromoLoading={manualPromoLoading}
                  handleRedeemManualPromo={handleRedeemManualPromo}
                  handleRemoveMyPromo={handleRemoveMyPromo}
                  myPromo={myPromo}
                  paymentActionLoading={paymentActionLoading}
                  paymentMessage={paymentMessage}
                  setPaymentMessage={setPaymentMessage}
                  paymentMethods={paymentMethods}
                  paymentMethodsLoading={paymentMethodsLoading}
                  paymentStatusLoading={paymentStatusLoading}
                  startCheckout={startCheckout}
                  founderAccess={founderAccess}
                  userPlan={userPlan}
                />
              }
            />
          )}

          {/* Tab: Найзууд — тулаан, найз урих, долоо хоногийн самбар, badges */}
          {activeTab === 'friends' && currentUser && (
            <div className="w-full pb-24 animate-fade-in">
              <SocialSection
                targetLevel={currentUser.targetLevel}
                onPlayDuel={(duel) => setActiveDuel(duel)}
                refreshKey={socialRefreshKey}
              />
            </div>
          )}

          {/* Tab 1: Унших (Reading) - Screen 3 layout */}
          {activeTab === 'read' && (
            <ReadTab
              libReadId={libReadId}
              setLibReadId={setLibReadId}
              libReadLevel={libReadLevel}
              setLibReadLevel={setLibReadLevel}
              readTranslateEnabled={readTranslateEnabled}
              audioSpeed={audioSpeed}
              currentUser={currentUser}
              currentUserRef={currentUserRef}
              lockedActivityIds={lockedActivityIds}
              lessonPlanLocked={lessonPlanLocked}
              renderPlanLockCard={renderPlanLockCard}
              selectTab={selectTab}
              requireAccount={requireAccount}
              recordStudyActivity={recordStudyActivity}
              applyMetricProfile={applyMetricProfile}
              speakGerman={speakGerman}
              renderRichGerman={renderRichGerman}
            />
          )}

          {/* Tab 2: Сонсох (Listening) - Screen 2 layout */}
          {activeTab === 'listen' && (
            <ListenTab
              libListenId={libListenId}
              setLibListenId={setLibListenId}
              libListenLevel={libListenLevel}
              setLibListenLevel={setLibListenLevel}
              readTranslateEnabled={readTranslateEnabled}
              audioSpeed={audioSpeed}
              setAudioSpeed={setAudioSpeed}
              currentUser={currentUser}
              currentUserRef={currentUserRef}
              lockedActivityIds={lockedActivityIds}
              lessonPlanLocked={lessonPlanLocked}
              renderPlanLockCard={renderPlanLockCard}
              selectTab={selectTab}
              requireAccount={requireAccount}
              recordStudyActivity={recordStudyActivity}
              applyMetricProfile={applyMetricProfile}
              renderRichGerman={renderRichGerman}
            />
          )}

          {/* Tab 3: Ярих (Speaking) - Screen 4 layout */}
          {activeTab === 'speak' && (
            <SpeakTab
              libSpeakId={libSpeakId}
              setLibSpeakId={setLibSpeakId}
              libSpeakLevel={libSpeakLevel}
              setLibSpeakLevel={setLibSpeakLevel}
              currentUser={currentUser}
              lockedActivityIds={lockedActivityIds}
              lessonPlanLocked={lessonPlanLocked}
              renderPlanLockCard={renderPlanLockCard}
              selectTab={selectTab}
              requireAccount={requireAccount}
              speakGerman={speakGerman}
              renderRichGerman={renderRichGerman}
              renderSpeakingJudge={renderSpeakingJudge}
              renderSpeakingReport={renderSpeakingReport}
              resetSpeakingJudge={resetSpeakingJudge}
            />
          )}

          {/* Tab 4: Бичих (Writing) - Screen 6 layout */}
          {activeTab === 'write' && (
            <WriteTab
              libWriteId={libWriteId}
              setLibWriteId={setLibWriteId}
              libWriteLevel={libWriteLevel}
              setLibWriteLevel={setLibWriteLevel}
              currentUser={currentUser}
              lockedActivityIds={lockedActivityIds}
              lessonPlanLocked={lessonPlanLocked}
              renderPlanLockCard={renderPlanLockCard}
              selectTab={selectTab}
              renderRichGerman={renderRichGerman}
              renderWritingChecker={renderWritingChecker}
              resetWritingFeedback={resetWritingFeedback}
            />
          )}

          {/* Tab 5: Үгсийн сан (Vocabulary) — Trainer (flashcards) + Dictionary (browse) */}
          {activeTab === 'vocab' && (
            <VocabTab
              TRAINER_WORDS={TRAINER_WORDS}
              placementSuggestedLevel={placementSuggestedLevel}
              currentUserRef={currentUserRef}
              requireAccount={requireAccount}
              applyMetricProfile={applyMetricProfile}
              speakGerman={speakGerman}
            />
          )}

          {/* Tab: Орчуулагч (Professional Translation & Lingua Helper) */}
          {activeTab === 'translate' && (
            <TranslateTab
              aiUsable={aiUsable}
              renderPlanLockCard={renderPlanLockCard}
              aiLockDesc={aiLockDesc}
              renderAiTeaserBanner={renderAiTeaserBanner}
              aiAuthHeaders={aiAuthHeaders}
              refreshAiQuota={refreshAiQuota}
              setAiQuota={setAiQuota}
              speakGerman={speakGerman}
            />
          )}

          {/* Tab 8: Шалгалт — CEFR түвшний шалгалтууд (A1–C2) */}
          {activeTab === 'exam' && (
            <ExamTab
              currentUser={currentUser}
              fullContent={fullContent}
              audioSpeed={audioSpeed}
              requireAccount={requireAccount}
              setActiveTab={setActiveTab}
              setTestdafOpen={setTestdafOpen}
              setPlacementOpen={setPlacementOpen}
              recordStudyActivity={recordStudyActivity}
              speakGerman={speakGerman}
              renderPlanLockCard={renderPlanLockCard}
              renderWritingChecker={renderWritingChecker}
              renderSpeakingJudge={renderSpeakingJudge}
              renderSpeakingReport={renderSpeakingReport}
              resetSpeakingJudge={resetSpeakingJudge}
              resetWritingFeedback={resetWritingFeedback}
            />
          )}

          {/* Legacy A1 model-test panel — superseded by the level-based exams above. */}

          {/* Special view Module: Settings (Тохиргоо) view panel */}
          {activeTab === 'settings' && (
            <SettingsTab
              currentUser={currentUser}
              currentUserRef={currentUserRef}
              setCurrentUser={setCurrentUser}
              readTranslateEnabled={readTranslateEnabled}
              setReadTranslateEnabled={setReadTranslateEnabled}
              audioSpeed={audioSpeed}
              setAudioSpeed={setAudioSpeed}
              streak={streak}
              logoutUser={logoutUser}
            />
          )}

          {/* Bottom Interactive Sticky Navbar (Mobile Only) - matches screen specs */}
          <MobileNav activeTab={activeTab} selectTab={selectTab} />

        </div>
      </main>
    </div>
  );
}
