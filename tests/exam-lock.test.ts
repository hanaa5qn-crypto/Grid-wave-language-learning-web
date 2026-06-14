import { describe, it, expect } from 'vitest';
import { isExamQuestionLocked, FREE_QUESTIONS_PER_SECTION } from '../frontend/src/plans';
import type { UserProfile } from '../frontend/src/profiles';
import type { ExamSection } from '../frontend/src/plans';

function profileWith(billing: UserProfile['billing'], email = 'student@example.com'): UserProfile {
  return {
    email,
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
const SECTIONS: ExamSection[] = ['reading', 'listening', 'writing', 'speaking'];
const free = () => profileWith(undefined);

describe('isExamQuestionLocked — free exam access is split evenly across skills', () => {
  it('gives every A1 section (incl. writing & speaking) the same free sample', () => {
    for (const section of SECTIONS) {
      for (let i = 0; i < FREE_QUESTIONS_PER_SECTION; i++) {
        expect(isExamQuestionLocked(free(), 'A1', section, i)).toBe(false);
      }
      // The question right after the per-section limit is locked.
      expect(isExamQuestionLocked(free(), 'A1', section, FREE_QUESTIONS_PER_SECTION)).toBe(true);
    }
  });

  it('no longer front-loads reading at the expense of writing/speaking', () => {
    // Regression: the old global cutoff unlocked deep reading while locking
    // writing/speaking entirely. Now reading is capped and writing/speaking open.
    expect(isExamQuestionLocked(free(), 'A1', 'reading', FREE_QUESTIONS_PER_SECTION + 3)).toBe(true);
    expect(isExamQuestionLocked(free(), 'A1', 'writing', 0)).toBe(false);
    expect(isExamQuestionLocked(free(), 'A1', 'speaking', 0)).toBe(false);
  });

  it('locks every section above A1 for free users', () => {
    for (const level of ['A2', 'B1', 'B2', 'C1', 'C2'] as const) {
      for (const section of SECTIONS) {
        expect(isExamQuestionLocked(free(), level, section, 0)).toBe(true);
      }
    }
  });

  it('unlocks everything for an active paid subscriber', () => {
    const paid = profileWith({
      plan: 'pro',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + days(20)).toISOString(),
    });
    expect(isExamQuestionLocked(paid, 'C2', 'speaking', 50)).toBe(false);
  });
});
