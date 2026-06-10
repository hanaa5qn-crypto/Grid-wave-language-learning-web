// =============================================================================
// Тулаан (Quiz Duel) — хуваалцсан seed-ээс хоёр тоглогчид яг ижил 10 асуулт
// угсарна. Сервер зөвхөн {seed, level} хадгалдаг тул асуултын сан клиент талд
// үлдэж, хоёр клиент ижил кодоор ижил багц гаргадаг байх нь шийдвэрлэх чухал:
// энд зөвхөн тогтмол (deterministic) үйлдлүүд хийнэ — Math.random хориотой.
// =============================================================================

import { DICTIONARY } from './data';
import { ExamLevel } from './exams';
import { QuizQuestion, shuffleQuiz } from './library';
import { PLACEMENT_POOL } from './placement';
import type { CEFRLevel, VocabularyWord } from './types';

export const DUEL_QUESTION_COUNT = 10;
const VOCAB_QUESTION_COUNT = 4; // үлдсэн 6 нь унших/бичих сангаас

// Тулааны асуулт — энгийн MCQ дээр унших эх (passage) болон заавар нэмэгдэнэ.
export interface DuelQuestion extends QuizQuestion {
  instruction: string;
  passage?: string;
}

// shuffleQuiz-тэй ижил LCG рекуррент дээр суурилсан seeded генератор.
function makeRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

// Жагсаалтаас давхардалгүй n элементийг seeded түүвэрлэнэ (Fisher–Yates-ийн
// эхний n алхам).
function sampleN<T>(items: readonly T[], n: number, rng: () => number): T[] {
  const pool = [...items];
  const out: T[] = [];
  while (out.length < n && pool.length > 0) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return out;
}

// Толь бичигт C1/C2 түвшин байхгүй (CEFRLevel нь A1–B2) тул дээд түвшний
// тулаанд B2 үгсийг ашиглана.
function vocabLevelFor(level: ExamLevel): CEFRLevel {
  return (level === 'C1' || level === 'C2') ? 'B2' : level;
}

// Орчуулгатай, тухайн түвшний үгс. Хэт цөөн бол бүх түвшнээс нөхнө.
function vocabCandidates(level: ExamLevel): VocabularyWord[] {
  const usable = DICTIONARY.filter((w) => w.mongolian && w.german);
  const atLevel = usable.filter((w) => w.level === vocabLevelFor(level));
  return atLevel.length >= VOCAB_QUESTION_COUNT * 4 ? atLevel : usable;
}

function buildVocabQuestion(
  word: VocabularyWord,
  distractorPool: VocabularyWord[],
  rng: () => number,
): DuelQuestion {
  const distractors = sampleN(
    distractorPool.filter((w) => w.mongolian !== word.mongolian && w.german !== word.german),
    3,
    rng,
  ).map((w) => w.mongolian);
  const headword = word.article ? `${word.article} ${word.german}` : word.german;
  return {
    instruction: 'Үгийн сан — зөв орчуулгыг сонгоно уу.',
    question: `«${headword}» гэдэг үгийн монгол орчуулга аль вэ?`,
    choices: [word.mongolian, ...distractors],
    correctIndex: 0,
  };
}

// Тухайн түвшний унших + бичих асуултууд (сонсох/ярихыг алгасна: TTS
// шаардлагагүй, хурдан тулаан).
function poolCandidates(level: ExamLevel): DuelQuestion[] {
  const bank = PLACEMENT_POOL[level];
  return [...bank.read, ...bank.write].map((q) => ({
    instruction: q.instruction,
    passage: q.passage,
    question: q.question,
    choices: q.choices,
    correctIndex: q.correctIndex,
  }));
}

// Гол функц: ижил seed + level → яг ижил 10 асуулт, ижил дарааллаар,
// сонголтын байрлал хүртэл ижил.
export function buildDuelQuestions(seed: number, level: ExamLevel): DuelQuestion[] {
  const rng = makeRng(seed);

  const words = sampleN(vocabCandidates(level), VOCAB_QUESTION_COUNT, rng);
  const distractorPool = vocabCandidates(level);
  const vocabQuestions = words.map((w) => buildVocabQuestion(w, distractorPool, rng));

  const bankQuestions = sampleN(poolCandidates(level), DUEL_QUESTION_COUNT - vocabQuestions.length, rng);

  // Дутвал (онолын хувьд ховор) үгийн сангаас нөхөж яг 10 болгоно.
  const combined = [...vocabQuestions, ...bankQuestions];
  while (combined.length < DUEL_QUESTION_COUNT) {
    const extra = sampleN(vocabCandidates(level), 1, rng)[0];
    if (!extra) break;
    combined.push(buildVocabQuestion(extra, distractorPool, rng));
  }

  // Асуултуудын дараалал + сонголтын байрлалыг seed-ээр холино: хоёр тоглогчид
  // адил, гэхдээ зөв хариулт үргэлж эхэндээ биш.
  const ordered = sampleN(combined, combined.length, rng);
  return ordered.map((q, i) => {
    const mixed = shuffleQuiz(`duel:${seed}:${i}`, q);
    return { ...q, choices: mixed.choices, correctIndex: mixed.correctIndex };
  });
}
