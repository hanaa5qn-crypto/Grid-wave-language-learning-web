// =============================================================================
// SAT — test catalogue + section raw→scaled (200–800) conversion.
// -----------------------------------------------------------------------------
// Each full Digital SAT practice test lives in its own file (satTest1.ts,
// satTest2.ts). This module aggregates them and exposes the scoring curve.
// =============================================================================
import { SatTest } from '../types';
import { SAT_TEST_1 } from './satTest1';
import { SAT_TEST_2 } from './satTest2';
import { SAT_TEST_3 } from './satTest3';
import { SAT_TEST_4 } from './satTest4';

export const SAT_TESTS: SatTest[] = [SAT_TEST_1, SAT_TEST_2, SAT_TEST_3, SAT_TEST_4];

// Approximate Digital SAT scaling. Reading & Writing raw is out of 54, Math out
// of 44. The official curve is roughly linear in the middle with compression at
// the extremes; this mirrors published practice-test conversion tables closely
// enough for a realistic estimated score.
export function satScaledScore(raw: number, module: 'reading' | 'math'): number {
  const max = module === 'reading' ? 54 : 44;
  const r = Math.max(0, Math.min(max, raw));
  const frac = r / max;
  // Gentle S-curve: floor 200, ceiling 800, slight ease at the ends.
  const eased = 0.5 - Math.cos(Math.PI * frac) / 2; // smoothstep-ish 0..1
  const blended = 0.65 * frac + 0.35 * eased;       // mostly linear, a touch of curve
  return Math.round((200 + blended * 600) / 10) * 10;
}
