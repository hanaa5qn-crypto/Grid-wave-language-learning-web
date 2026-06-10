import { describe, it, expect } from 'vitest';
import { decideDuelWinner, localDateKey, normalizeCode, weekMinutes } from '../backend/lib/socialLogic';

describe('decideDuelWinner', () => {
  it('higher score wins regardless of time', () => {
    expect(decideDuelWinner(
      { uid: 'a', score: 8, timeMs: 90_000 },
      { uid: 'b', score: 7, timeMs: 10_000 },
    )).toBe('a');
    expect(decideDuelWinner(
      { uid: 'a', score: 3, timeMs: 10_000 },
      { uid: 'b', score: 9, timeMs: 990_000 },
    )).toBe('b');
  });

  it('breaks score ties by faster completion time', () => {
    expect(decideDuelWinner(
      { uid: 'a', score: 7, timeMs: 65_000 },
      { uid: 'b', score: 7, timeMs: 64_000 },
    )).toBe('b');
  });

  it('returns null (draw) when score and time are both equal', () => {
    expect(decideDuelWinner(
      { uid: 'a', score: 5, timeMs: 60_000 },
      { uid: 'b', score: 5, timeMs: 60_000 },
    )).toBeNull();
  });
});

describe('weekMinutes', () => {
  // 2026-06-10 бол Лхагва — долоо хоног нь 2026-06-08 (Даваа) … 06-14 (Ням).
  const wednesday = new Date(2026, 5, 10, 15, 30);

  it('sums only the current Monday-to-Sunday week and converts to minutes', () => {
    const minutes = weekMinutes({
      '2026-06-07': 3600, // өмнөх Ням — тооцохгүй
      '2026-06-08': 600,  // Даваа — 10 мин
      '2026-06-10': 900,  // Лхагва — 15 мин
      '2026-06-14': 300,  // Ням — 5 мин
      '2026-06-15': 1200, // дараагийн Даваа — тооцохгүй
    }, wednesday);
    expect(minutes).toBe(30);
  });

  it('handles Sunday as the last day of the week (not the first)', () => {
    const sunday = new Date(2026, 5, 14, 12, 0);
    const minutes = weekMinutes({ '2026-06-08': 600, '2026-06-14': 600 }, sunday);
    expect(minutes).toBe(20);
  });

  it('returns 0 for missing data', () => {
    expect(weekMinutes(undefined, wednesday)).toBe(0);
    expect(weekMinutes({}, wednesday)).toBe(0);
  });
});

describe('code helpers', () => {
  it('localDateKey formats as YYYY-MM-DD with local time', () => {
    expect(localDateKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('normalizeCode uppercases and strips unsafe characters', () => {
    expect(normalizeCode(' ab-12 ')).toBe('AB12');
    expect(normalizeCode(undefined)).toBe('');
    expect(normalizeCode('x'.repeat(50)).length).toBeLessThanOrEqual(16);
  });
});
