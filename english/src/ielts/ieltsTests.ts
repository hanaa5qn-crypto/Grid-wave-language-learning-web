// =============================================================================
// IELTS — test catalogue + official band-score conversion.
// -----------------------------------------------------------------------------
// Each full practice test lives in its own file (ieltsTest1.ts, ieltsTest2.ts,
// ieltsGeneral1.ts) so they can be authored independently. This module simply
// aggregates them and exposes the raw→band conversion used by the runner.
// =============================================================================
import { IeltsTest } from '../types';
import { IELTS_TEST_1 } from './ieltsTest1';
import { IELTS_TEST_2 } from './ieltsTest2';
import { IELTS_GENERAL_1 } from './ieltsGeneral1';

export const IELTS_TESTS: IeltsTest[] = [IELTS_TEST_1, IELTS_TEST_2, IELTS_GENERAL_1];

// Official-style IELTS raw-score (out of 40) → band conversion. Reading uses the
// Academic table; Listening uses its own. These mirror the conversion ranges
// published by the British Council / IDP for Academic Reading and Listening.
const READING_BANDS: { min: number; band: number }[] = [
  { min: 39, band: 9 }, { min: 37, band: 8.5 }, { min: 35, band: 8 },
  { min: 33, band: 7.5 }, { min: 30, band: 7 }, { min: 27, band: 6.5 },
  { min: 23, band: 6 }, { min: 19, band: 5.5 }, { min: 15, band: 5 },
  { min: 13, band: 4.5 }, { min: 10, band: 4 }, { min: 8, band: 3.5 },
  { min: 6, band: 3 }, { min: 4, band: 2.5 }, { min: 0, band: 2 },
];
const LISTENING_BANDS: { min: number; band: number }[] = [
  { min: 39, band: 9 }, { min: 37, band: 8.5 }, { min: 35, band: 8 },
  { min: 32, band: 7.5 }, { min: 30, band: 7 }, { min: 26, band: 6.5 },
  { min: 23, band: 6 }, { min: 18, band: 5.5 }, { min: 16, band: 5 },
  { min: 13, band: 4.5 }, { min: 10, band: 4 }, { min: 8, band: 3.5 },
  { min: 6, band: 3 }, { min: 4, band: 2.5 }, { min: 0, band: 2 },
];

export function ieltsBandScore(raw: number, kind: 'reading' | 'listening'): number {
  const table = kind === 'listening' ? LISTENING_BANDS : READING_BANDS;
  const clamped = Math.max(0, Math.min(40, Math.round(raw)));
  return (table.find((r) => clamped >= r.min) ?? table[table.length - 1]).band;
}
