import { describe, it, expect } from 'vitest';
import { effectivePlan, canAccessAllContent, canUseAi, isLessonLocked, isExamQuestionLocked } from '../frontend/src/plans';
import type { UserProfile } from '../frontend/src/profiles';

// Зөвхөн billing талбар нь чухал — бусад нь хамгийн бага profile.
function profileWith(billing: UserProfile['billing']): UserProfile {
  return {
    email: 'student@example.com',
    name: 'Сурагч',
    avatar: '',
    role: '',
    targetLevel: 'A1',
    streak: 0,
    progress: 0,
    completedLessons: 0,
    learningGoal: '',
    suggestions: [],
    learningCurve: [],
    billing,
  } as UserProfile;
}

const days = (n: number) => n * 24 * 3600 * 1000;

describe('effectivePlan — referral Pro trial', () => {
  it('grants pro while the trial period is still running', () => {
    expect(effectivePlan(profileWith({
      plan: 'pro',
      status: 'trialing',
      currentPeriodEnd: new Date(Date.now() + days(2)).toISOString(),
    }))).toBe('pro');
  });

  it('falls back to free once the trial period has ended', () => {
    expect(effectivePlan(profileWith({
      plan: 'pro',
      status: 'trialing',
      currentPeriodEnd: new Date(Date.now() - days(1)).toISOString(),
    }))).toBe('free');
  });

  it('treats a trial without an end date as expired', () => {
    expect(effectivePlan(profileWith({ plan: 'pro', status: 'trialing' }))).toBe('free');
  });

});

describe('3-day trial reverts to free and re-locks content after it ends', () => {
  const trial = (offsetDays: number) => profileWith({
    plan: 'pro',
    status: 'trialing',
    provider: 'signup',
    currentPeriodEnd: new Date(Date.now() + days(offsetDays)).toISOString(),
  });

  it('during the trial: pro access, content unlocked', () => {
    const active = trial(3);
    expect(effectivePlan(active)).toBe('pro');
    expect(canAccessAllContent(active)).toBe(true);
    expect(isLessonLocked(active, 'B2')).toBe(false);
    expect(isExamQuestionLocked(active, 'C1', 'writing', 5)).toBe(false);
  });

  it('one second past the end: free, content re-locked, AI teaser only', () => {
    // currentPeriodEnd just barely in the past — the boundary that matters.
    const justExpired = profileWith({
      plan: 'pro',
      status: 'trialing',
      provider: 'signup',
      currentPeriodEnd: new Date(Date.now() - 1000).toISOString(),
    });
    expect(effectivePlan(justExpired)).toBe('free');
    expect(canAccessAllContent(justExpired)).toBe(false);
    expect(canUseAi(justExpired)).toBe(false);
    expect(isLessonLocked(justExpired, 'A2')).toBe(true);          // A2+ locked again
    expect(isLessonLocked(justExpired, 'A1')).toBe(false);         // A1 still free
    expect(isExamQuestionLocked(justExpired, 'A1', 'writing', 5)).toBe(true);  // beyond free sample
    expect(isExamQuestionLocked(justExpired, 'A1', 'writing', 0)).toBe(false); // free sample stays
  });
});

describe('effectivePlan — paid subscription monthly expiry', () => {
  it('grants the paid plan while the period is still running', () => {
    expect(effectivePlan(profileWith({
      plan: 'max',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + days(10)).toISOString(),
    }))).toBe('max');
  });

  it('expires a paid subscription once currentPeriodEnd has passed', () => {
    expect(effectivePlan(profileWith({
      plan: 'max',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() - days(1)).toISOString(),
    }))).toBe('free');
  });

  it('expires a paid pro subscription a month after its period end', () => {
    expect(effectivePlan(profileWith({
      plan: 'pro',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() - days(30)).toISOString(),
    }))).toBe('free');
  });

  it('trusts legacy paid records that carry no currentPeriodEnd', () => {
    expect(effectivePlan(profileWith({ plan: 'max', status: 'active' }))).toBe('max');
    expect(effectivePlan(profileWith({ plan: 'pro', status: 'paid' }))).toBe('pro');
  });

  it('honors a legacy "Monthly" subscription without a period end as max', () => {
    expect(effectivePlan(profileWith({ plan: 'Monthly', status: 'active' }))).toBe('max');
  });
});
