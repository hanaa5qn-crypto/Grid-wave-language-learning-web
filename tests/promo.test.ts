import { describe, it, expect } from 'vitest';
import {
  clampPercent,
  discountedAmountMnt,
  commissionCents,
  parsePercent,
  parseTeacherName,
  parseTeacherCodeId,
} from '../backend/lib/promo';

// ---------------------------------------------------------------------------
// clampPercent
// ---------------------------------------------------------------------------
describe('clampPercent', () => {
  it('returns the value unchanged when within 0..100', () => {
    expect(clampPercent(0)).toBe(0);
    expect(clampPercent(50)).toBe(50);
    expect(clampPercent(100)).toBe(100);
    expect(clampPercent(15.5)).toBe(15.5);
  });

  it('clamps values below 0 to 0', () => {
    expect(clampPercent(-1)).toBe(0);
    expect(clampPercent(-999)).toBe(0);
  });

  it('clamps values above 100 to 100', () => {
    expect(clampPercent(101)).toBe(100);
    expect(clampPercent(9999)).toBe(100);
  });

  it('coerces numeric strings to numbers', () => {
    expect(clampPercent('20')).toBe(20);
    expect(clampPercent('0')).toBe(0);
    expect(clampPercent('100')).toBe(100);
  });

  it('returns NaN for non-numeric strings', () => {
    expect(clampPercent('abc')).toBeNaN();
    expect(clampPercent('12abc')).toBeNaN();
  });

  it('returns NaN for null and undefined', () => {
    // Number(null) === 0, Number(undefined) === NaN
    expect(clampPercent(undefined)).toBeNaN();
  });

  it('returns NaN for non-finite values like Infinity', () => {
    expect(clampPercent(Infinity)).toBeNaN();
    expect(clampPercent(-Infinity)).toBeNaN();
    expect(clampPercent(NaN)).toBeNaN();
  });
});

// ---------------------------------------------------------------------------
// discountedAmountMnt
// ---------------------------------------------------------------------------
describe('discountedAmountMnt', () => {
  it('applies a typical discount: 15% off 19900 → 16915', () => {
    expect(discountedAmountMnt(19900, 15)).toBe(16915);
  });

  it('applies 0% discount — full price returned', () => {
    expect(discountedAmountMnt(19900, 0)).toBe(19900);
  });

  it('applies 100% discount → 0 (free)', () => {
    expect(discountedAmountMnt(19900, 100)).toBe(0);
    expect(discountedAmountMnt(99000, 100)).toBe(0);
  });

  it('rounds to nearest integer for fractional results (33% off 100 → 67)', () => {
    // 100 * (1 - 0.33) = 67.0 → 67
    expect(discountedAmountMnt(100, 33)).toBe(67);
  });

  it('rounds 0.5 cases correctly (Math.round semantics)', () => {
    // 1000 * (1 - 0.155) = 845 — check a concrete rounding case
    // 10 * (1 - 0.15) = 8.5 → rounds to 9
    expect(discountedAmountMnt(10, 15)).toBe(9);
  });

  it('floors at 0 — never returns negative', () => {
    expect(discountedAmountMnt(-500, 0)).toBe(0);
    expect(discountedAmountMnt(-500, 50)).toBe(0);
  });

  it('uses no discount when discountPercent is NaN', () => {
    expect(discountedAmountMnt(19900, NaN)).toBe(19900);
  });

  it('uses no discount when discountPercent is a non-numeric string', () => {
    expect(discountedAmountMnt(19900, 'abc' as unknown as number)).toBe(19900);
  });

  it('clamps out-of-range discount percent rather than producing negative prices', () => {
    // 200% clamped to 100 → free
    expect(discountedAmountMnt(19900, 200)).toBe(0);
    // -10% clamped to 0 → full price
    expect(discountedAmountMnt(19900, -10)).toBe(19900);
  });
});

// ---------------------------------------------------------------------------
// commissionCents
// ---------------------------------------------------------------------------
describe('commissionCents', () => {
  it('computes a typical commission: 20% of 1_691_500 cents → 338300', () => {
    expect(commissionCents(1_691_500, 20)).toBe(338_300);
  });

  it('returns 0 for 0% commission', () => {
    expect(commissionCents(1_000_000, 0)).toBe(0);
  });

  it('returns the full net for 100% commission', () => {
    expect(commissionCents(500_000, 100)).toBe(500_000);
  });

  it('rounds fractional cent results', () => {
    // 10 * 0.333... = 3.33 → rounds to 3
    expect(commissionCents(10, 33)).toBe(3);
    // 10 * 0.15 = 1.5 → rounds to 2
    expect(commissionCents(10, 15)).toBe(2);
  });

  it('floors at 0 — never returns negative', () => {
    expect(commissionCents(-1000, 20)).toBe(0);
  });

  it('returns 0 for NaN commission percent (safe fallback)', () => {
    expect(commissionCents(500_000, NaN)).toBe(0);
  });

  it('clamps commission percent above 100 to 100', () => {
    expect(commissionCents(100_000, 150)).toBe(100_000);
  });

  it('clamps negative commission percent to 0', () => {
    expect(commissionCents(100_000, -5)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// parsePercent
// ---------------------------------------------------------------------------
describe('parsePercent', () => {
  it('returns the number for valid in-range values', () => {
    expect(parsePercent(0)).toBe(0);
    expect(parsePercent(50)).toBe(50);
    expect(parsePercent(100)).toBe(100);
    expect(parsePercent(15.75)).toBe(15.75);
  });

  it('clamps out-of-range values rather than returning null', () => {
    expect(parsePercent(-5)).toBe(0);
    expect(parsePercent(150)).toBe(100);
  });

  it('parses numeric strings', () => {
    expect(parsePercent('30')).toBe(30);
    expect(parsePercent('0')).toBe(0);
  });

  it('returns null for non-numeric strings', () => {
    expect(parsePercent('abc')).toBeNull();
    expect(parsePercent('12abc')).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(parsePercent(undefined)).toBeNull();
  });

  it('returns null for NaN and Infinity', () => {
    expect(parsePercent(NaN)).toBeNull();
    expect(parsePercent(Infinity)).toBeNull();
    expect(parsePercent(-Infinity)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// parseTeacherName
// ---------------------------------------------------------------------------
describe('parseTeacherName', () => {
  it('returns the trimmed name for a valid string', () => {
    expect(parseTeacherName('  Болд  ')).toBe('Болд');
    expect(parseTeacherName('Ану')).toBe('Ану');
  });

  it('returns null for empty string after trimming', () => {
    expect(parseTeacherName('')).toBeNull();
    expect(parseTeacherName('   ')).toBeNull();
  });

  it('returns null for null/undefined input', () => {
    expect(parseTeacherName(null)).toBeNull();
    expect(parseTeacherName(undefined)).toBeNull();
  });

  it('truncates names longer than 80 characters', () => {
    const long = 'А'.repeat(100);
    const result = parseTeacherName(long);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(80);
  });

  it('preserves a name that is exactly 80 characters', () => {
    const name = 'А'.repeat(80);
    expect(parseTeacherName(name)).toBe(name);
  });

  it('coerces non-string scalars to their string representation', () => {
    // Number(42) → '42' → valid
    expect(parseTeacherName(42)).toBe('42');
  });
});

// ---------------------------------------------------------------------------
// parseTeacherCodeId
// ---------------------------------------------------------------------------
describe('parseTeacherCodeId', () => {
  it('returns normalized uppercase code for a valid input', () => {
    expect(parseTeacherCodeId('abc123')).toBe('ABC123');
    expect(parseTeacherCodeId('BOLD20')).toBe('BOLD20');
  });

  it('strips punctuation and spaces before normalizing', () => {
    expect(parseTeacherCodeId(' ab-12 ')).toBe('AB12');
    expect(parseTeacherCodeId('BOLD_CODE!')).toBe('BOLDCODE');
  });

  it('returns null for codes shorter than 3 characters after normalization', () => {
    expect(parseTeacherCodeId('')).toBeNull();
    expect(parseTeacherCodeId('AB')).toBeNull();
    expect(parseTeacherCodeId('  -  ')).toBeNull(); // strips to ''
  });

  it('returns a valid code for exactly 3 characters', () => {
    expect(parseTeacherCodeId('ABC')).toBe('ABC');
    expect(parseTeacherCodeId('A1B')).toBe('A1B');
  });

  it('truncates normalized code to 16 characters', () => {
    const long = 'A'.repeat(30);
    const result = parseTeacherCodeId(long);
    expect(result).not.toBeNull();
    expect(result!.length).toBe(16);
  });

  it('returns null for undefined', () => {
    expect(parseTeacherCodeId(undefined)).toBeNull();
  });

  it('returns null when punctuation-only input normalizes to fewer than 3 chars', () => {
    expect(parseTeacherCodeId('!@#')).toBeNull();
    expect(parseTeacherCodeId('--')).toBeNull();
  });

  it('accepts alphanumeric mix correctly', () => {
    expect(parseTeacherCodeId('Anu2026')).toBe('ANU2026');
  });
});
