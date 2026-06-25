import { describe, it, expect } from 'vitest';
import {
  FREE_UNIT_LIMIT, isFreeUnitLocked, isFreeUnitIndexLocked, canInteract,
} from '../frontend/src/plans';
import type { UserProfile } from '../frontend/src/profiles';

// Minimal profile factory — only the fields the plan gates read matter here.
function profileWith(
  billing: UserProfile['billing'],
  extra: Partial<UserProfile> = {},
  email = 'student@example.com',
): UserProfile {
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
    ...extra,
  } as UserProfile;
}

const days = (n: number) => n * 24 * 3600 * 1000;
const paid = profileWith({
  plan: 'pro',
  status: 'active',
  currentPeriodEnd: new Date(Date.now() + days(20)).toISOString(),
});
const founder = profileWith(undefined, {}, 'hanaa5qn@gmail.com');
const guest = profileWith(undefined, { isGuest: true });
const free = profileWith(undefined);

describe('free "small taste" — only A1 unit 1 is open', () => {
  it('exposes a single free unit', () => {
    expect(FREE_UNIT_LIMIT).toBe(1);
  });

  it('isFreeUnitLocked: free user gets A1 unit 0, nothing past it', () => {
    expect(isFreeUnitLocked(free, 'A1', 0)).toBe(false);
    expect(isFreeUnitLocked(free, 'A1', 1)).toBe(true);
    expect(isFreeUnitLocked(free, 'A1', 5)).toBe(true);
  });

  it('isFreeUnitLocked: every non-A1 level is locked for free, even unit 0', () => {
    for (const level of ['A2', 'B1', 'B2', 'C1', 'C2']) {
      expect(isFreeUnitLocked(free, level, 0)).toBe(true);
    }
  });

  it('isFreeUnitLocked: paid and founder unlock every unit at every level', () => {
    for (const who of [paid, founder]) {
      expect(isFreeUnitLocked(who, 'A1', 3)).toBe(false);
      expect(isFreeUnitLocked(who, 'C2', 9)).toBe(false);
    }
  });

  it('isFreeUnitIndexLocked (English): free gets the first unit only', () => {
    expect(isFreeUnitIndexLocked(free, 0)).toBe(false);
    expect(isFreeUnitIndexLocked(free, 1)).toBe(true);
    expect(isFreeUnitIndexLocked(paid, 4)).toBe(false);
    expect(isFreeUnitIndexLocked(founder, 4)).toBe(false);
  });
});

describe('canInteract — visitors may view but not interact', () => {
  it('blocks guests and null sessions', () => {
    expect(canInteract(guest)).toBe(false);
    expect(canInteract(null)).toBe(false);
  });

  it('allows any real (non-guest) account, regardless of plan', () => {
    expect(canInteract(free)).toBe(true);
    expect(canInteract(paid)).toBe(true);
    expect(canInteract(founder)).toBe(true);
  });
});
