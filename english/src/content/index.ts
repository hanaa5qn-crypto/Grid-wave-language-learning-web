// Barrel for the core English study content. The content sub-agent fills these
// files with real lessons/vocabulary, keeping these exact export names.
//
// The public Reading/Listening/Speaking libraries below merge three sources:
//   - the curated base set (./library),
//   - the researched IELTS reading bank, 20 Qs per CEFR level A1–C2
//     (./ieltsReadingBank), and
//   - the NotebookLM-generated, verified IELTS set (./ieltsGenerated).
// Every consumer (reading/listening/speaking tabs, placement test, progress
// totals) sees the full set. The German track lives elsewhere and is untouched.
import type { ReadingItem, ListeningItem, SpeakingItem } from '../types';
import {
  READING_LIBRARY as CORE_READING_LIBRARY,
  LISTENING_LIBRARY as BASE_LISTENING,
  WRITING_LIBRARY,
  SPEAKING_LIBRARY as BASE_SPEAKING,
} from './library';
import { IELTS_READING_BANK } from './ieltsReadingBank';
import { IELTS_GEN_READING, IELTS_GEN_LISTENING, IELTS_GEN_SPEAKING } from './ieltsGenerated';

export const READING_LIBRARY: ReadingItem[] = [
  ...CORE_READING_LIBRARY,
  ...IELTS_READING_BANK,
  ...IELTS_GEN_READING,
];
export const LISTENING_LIBRARY: ListeningItem[] = [...BASE_LISTENING, ...IELTS_GEN_LISTENING];
export const SPEAKING_LIBRARY: SpeakingItem[] = [...BASE_SPEAKING, ...IELTS_GEN_SPEAKING];
export { WRITING_LIBRARY };
export { VOCAB } from './vocabulary';
