// Free-tier lesson gating for the English (IELTS/CEFR) practice tabs: free
// accounts get A1 lessons as a taste; A2–C2 are Pro. Mirrors the lock the
// placement result screen advertises (free = A1 only).
import { describe, it, expect } from 'vitest';
import { IELTS_LEVELS, isFreeLessonLocked } from '../english/src/ielts/tabs/quizKit';
import { gateFreePractice } from '../english/src/sat/tabs/satQuizKit';
import type { EnglishLevel } from '../english/src/types';

describe('isFreeLessonLocked — English practice tabs', () => {
  it('paid accounts (allContent) can open every level', () => {
    for (const level of IELTS_LEVELS) {
      expect(isFreeLessonLocked(true, level)).toBe(false);
    }
  });

  it('free accounts can open A1 but nothing above it', () => {
    expect(isFreeLessonLocked(false, 'A1')).toBe(false);
    for (const level of ['A2', 'B1', 'B2', 'C1', 'C2'] as EnglishLevel[]) {
      expect(isFreeLessonLocked(false, level)).toBe(true);
    }
  });

  it('exposes A1 as a selectable level so the free taste is reachable', () => {
    expect(IELTS_LEVELS[0]).toBe('A1');
    expect(IELTS_LEVELS).toContain('A1');
  });
});

describe('gateFreePractice — SAT domain gate (filter cannot be bypassed)', () => {
  const ORDER = ['Algebra', 'Advanced Math', 'Geometry'] as const;
  const all = [
    { domain: 'Algebra' }, { domain: 'Algebra' },
    { domain: 'Advanced Math' }, { domain: 'Advanced Math' }, { domain: 'Advanced Math' },
    { domain: 'Geometry' },
  ];

  it('paid accounts see everything (nothing hidden)', () => {
    const { hiddenCount } = gateFreePractice(all, ORDER, true);
    expect(hiddenCount).toBe(0);
  });

  it('free accounts get only the first domain with questions as the taste', () => {
    const { freeDomain } = gateFreePractice(all, ORDER, false);
    expect(freeDomain).toBe('Algebra');
  });

  it('free hiddenCount is computed over the FULL set, not the current filter', () => {
    // The bypass bug: filtering to one domain made hiddenCount 0. hiddenCount
    // must always reflect every non-taste question regardless of the filter.
    const { hiddenCount } = gateFreePractice(all, ORDER, false);
    expect(hiddenCount).toBe(4); // 3 Advanced Math + 1 Geometry stay locked
  });

  it('skips empty leading domains when picking the taste', () => {
    const sparse = [{ domain: 'Geometry' }, { domain: 'Geometry' }];
    const { freeDomain, hiddenCount } = gateFreePractice(sparse, ORDER, false);
    expect(freeDomain).toBe('Geometry');
    expect(hiddenCount).toBe(0);
  });
});
