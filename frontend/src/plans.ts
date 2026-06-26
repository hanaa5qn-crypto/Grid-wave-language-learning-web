// =============================================================================
// Vivid-Lingua subscription plans (Free / Pro / Max) + founder override.
// -----------------------------------------------------------------------------
// • Free  — өдөр тутмын зуршил: үгийн сан бүрэн, хичээлүүд A1 түвшинд,
//           шалгалтын сангийн эхний 10 асуулт, сард 2 AI туршилт.
// • Pro   — бүх контент (A1–C2 сан, TestDaF симуляци), сард 5 AI туршилт.
// • Max   — бүгд + хязгааргүй AI (орчуулагч, ярих/бичих үнэлгээ).
// • Founder — имэйлээр таних; бүх эрх үргэлж нээлттэй, төлбөр шаардахгүй.
// Display prices here are defaults; the authoritative charge amount always
// comes from the backend (/api/payments/methods).
// =============================================================================

import type { UserProfile } from './profiles';
import { type ExamLevel } from './exams';

export type PlanId = 'free' | 'pro' | 'max';
export type EffectivePlan = PlanId | 'founder';
export type ExamSection = 'reading' | 'listening' | 'writing' | 'speaking';
export type BillingInterval = 'month' | 'year';

// Founder accounts: always full access, no payment needed.
export const FOUNDER_EMAILS = ['hanaa5qn@gmail.com'];

// Free tier exam access: the first N questions of EACH A1 section
// (reading / listening / writing / speaking), so the free sample is split
// evenly across all four skills instead of being front-loaded onto reading.
export const FREE_QUESTIONS_PER_SECTION = 2;

// Free "small taste" lesson access: only the first N units of A1 are open
// (everything past that — later A1 units AND all A2–C2 — is paywalled) on the
// German track. The English track gates practice per-lesson: free accounts get
// A1 lessons (Reading/Listening) and the first SAT practice group as a taste,
// while A2–C2 are Pro (see quizKit.isFreeLessonLocked and the SAT tabs).
// isFreeUnitIndexLocked below is the level-agnostic hook for a per-unit taste.
export const FREE_UNIT_LIMIT = 1;

// Total free exam questions surfaced (4 sections × per-section limit). Display
// only — the authoritative gate is isExamQuestionLocked below.
export const FREE_QUESTION_LIMIT = FREE_QUESTIONS_PER_SECTION * 4;

// Monthly AI teaser quota (server-enforced; these are the display defaults).
export const AI_TEASER: Record<PlanId, number | null> = { free: 2, pro: 5, max: null };

export interface PlanInfo {
  id: PlanId;
  name: string;
  nameMn: string;
  defaultAmountMnt: number;     // monthly fallback price; server price wins
  defaultYearAmountMnt: number; // annual fallback price (2 months free)
  taglineMn: string;
  featuresMn: string[];
  missingMn: string[];
}

export const PLAN_ORDER: PlanId[] = ['free', 'pro', 'max'];

// Apply a teacher-promo percentage discount to a price (display only — the
// server is authoritative on the actual charge). 100% → 0 (Үнэгүй). Clamps the
// percentage to [0, 100] and never returns a negative amount.
export function applyPromoDiscount(amountMnt: number, discountPercent: number): number {
  const pct = Math.max(0, Math.min(100, discountPercent));
  return Math.max(0, Math.round(amountMnt * (1 - pct / 100)));
}

export const PLANS: Record<PlanId, PlanInfo> = {
  free: {
    id: 'free',
    name: 'Free',
    nameMn: 'Үнэгүй',
    defaultAmountMnt: 0,
    defaultYearAmountMnt: 0,
    taglineMn: 'Өдөр бүр үнэгүй суралц',
    featuresMn: [
      'Үгийн сан, толь бичиг — бүрэн, хязгааргүй',
      'A1 түвшний эхний хичээл (танилцах)',
      `Шалгалт бүрийн (унших/сонсох/бичих/ярих) эхний ${FREE_QUESTIONS_PER_SECTION} асуулт`,
      'Сард 2 AI туршилт',
    ],
    missingMn: [
      'A1 түвшний бусад хичээл, A2–C2 бүх контент',
      'Шалгалтын бүрэн сан',
      'TestDaF загвар шалгалт',
      'Хязгааргүй AI',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    nameMn: 'Pro багц',
    defaultAmountMnt: 19900,
    defaultYearAmountMnt: 199000,
    taglineMn: 'Бүх контент нээлттэй',
    featuresMn: [
      'Бүх түвшний хичээл (A1–B1 сан бүрэн)',
      'Бүрэн шалгалтын сан (A1–C2)',
      'TestDaF загвар шалгалт',
      'Загвар хариултууд',
      'Сард 5 AI туршилт',
    ],
    missingMn: [
      'Хязгааргүй AI орчуулагч, AI үнэлгээ',
    ],
  },
  max: {
    id: 'max',
    name: 'Max',
    nameMn: 'Max багц',
    defaultAmountMnt: 39900,
    defaultYearAmountMnt: 399000,
    taglineMn: 'Бүгд + хязгааргүй AI',
    featuresMn: [
      'Pro багцын бүх боломж',
      'AI орчуулагч — хязгааргүй',
      'Ярих дасгалын AI үнэлгээ — хязгааргүй',
      'Бичих дасгалын AI засвар, оноо — хязгааргүй',
    ],
    missingMn: [],
  },
};

const ACTIVE_BILLING_STATUSES = ['active', 'paid', 'trialing'];

export function isFounder(profile: UserProfile | null): boolean {
  if (!profile) return false;
  if ((profile.billing?.plan ?? '').toLowerCase() === 'founder') return true;
  return FOUNDER_EMAILS.includes(profile.email.trim().toLowerCase());
}

// The plan that actually applies right now (expired/canceled billing → free).
export function effectivePlan(profile: UserProfile | null): EffectivePlan {
  if (!profile) return 'free';
  if (isFounder(profile)) return 'founder';

  const billing = profile.billing ?? {};
  const status = (billing.status ?? '').toLowerCase();
  if (!ACTIVE_BILLING_STATUSES.includes(status)) return 'free';
  // Byl checkouts are one-off charges with no auto-renewal, so every plan
  // expires once its paid period ends. Trials must always carry a valid,
  // unexpired end date; paid plans trust legacy records that predate
  // currentPeriodEnd tracking (no end date stored → still active).
  const end = Date.parse(billing.currentPeriodEnd ?? '');
  if (status === 'trialing') {
    if (!Number.isFinite(end) || end < Date.now()) return 'free';
  } else if (Number.isFinite(end) && end < Date.now()) {
    return 'free';
  }

  const plan = (billing.plan ?? '').toLowerCase();
  if (plan === 'pro') return 'pro';
  if (plan === 'max') return 'max';
  // Legacy single-plan subscriptions ("Monthly") predate the tier split and
  // included AI access, so honor them as Max.
  return plan ? 'max' : 'free';
}

// Unlimited AI (Max/founder). Free/Pro still get a monthly teaser quota,
// enforced server-side and surfaced via /api/ai/quota.
export function canUseAi(profile: UserProfile | null): boolean {
  const plan = effectivePlan(profile);
  return plan === 'max' || plan === 'founder';
}

export function canAccessAllContent(profile: UserProfile | null): boolean {
  return effectivePlan(profile) !== 'free';
}

// Visitors (guest sessions) may BROWSE the free-tier surface but cannot interact
// with it — answering, starting a lesson/test, playing audio, placement, etc.
// must prompt sign-up instead. A real (non-guest) account interacts within its
// plan. Use this to gate every interactive handler that a guest could reach.
export function canInteract(profile: UserProfile | null): boolean {
  return !!profile && !profile.isGuest;
}

// Skill-library lessons: Free accounts only get the first unit of A1 (the
// "small taste"); A2–C2 and later A1 units are paywalled. Pro/Max/founder get
// everything. Level-only gate kept for callers that don't know the unit index.
export function isLessonLocked(profile: UserProfile | null, level: string): boolean {
  if (canAccessAllContent(profile)) return false;
  return level !== 'A1';
}

// Plan gate for a specific unit within a level. Free → only A1 unit indices
// below FREE_UNIT_LIMIT are open. This is the authoritative lesson lock; the
// per-level isLessonLocked is the coarse fallback for unit-unaware callers.
export function isFreeUnitLocked(
  profile: UserProfile | null,
  level: string,
  unitIndex: number,
): boolean {
  if (canAccessAllContent(profile)) return false;
  if (level !== 'A1') return true;
  return unitIndex >= FREE_UNIT_LIMIT;
}

// Level-agnostic unit gate for the English track (its units aren't CEFR-tagged):
// free unlocks only the first FREE_UNIT_LIMIT units; the rest is paywalled.
export function isFreeUnitIndexLocked(
  profile: UserProfile | null,
  unitIndex: number,
): boolean {
  if (canAccessAllContent(profile)) return false;
  return unitIndex >= FREE_UNIT_LIMIT;
}

// Free accounts get an even sample of the exam bank: the first
// FREE_QUESTIONS_PER_SECTION questions of each A1 section (reading, listening,
// writing AND speaking). A2–C2 stay locked, matching the A1-only lesson tier.
// Previously a single global cutoff front-loaded reading and starved
// writing/speaking; this distributes the free taste across all four skills.
export function isExamQuestionLocked(
  profile: UserProfile | null,
  level: ExamLevel,
  section: ExamSection,
  itemIdx: number,
): boolean {
  if (canAccessAllContent(profile)) return false;
  if (level !== 'A1') return true;
  return itemIdx >= FREE_QUESTIONS_PER_SECTION;
}
