import { useEffect, useState } from 'react';

export const EDUCATION_PROGRESS_KEY = 'edu-progress-v1';

export interface EducationProgress {
  learned: Record<string, boolean>;
  quizBest: Record<string, number>;
  celebrated: Record<string, boolean>;
}

const emptyProgress = (): EducationProgress => ({ learned: {}, quizBest: {}, celebrated: {} });
let state: EducationProgress | undefined;
const listeners = new Set<() => void>();

function read(): EducationProgress {
  if (state) return state;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(EDUCATION_PROGRESS_KEY) || 'null');
    if (parsed && typeof parsed === 'object') {
      const source = parsed as Partial<EducationProgress>;
      state = {
        learned: source.learned && typeof source.learned === 'object' ? source.learned : {},
        quizBest: source.quizBest && typeof source.quizBest === 'object' ? source.quizBest : {},
        celebrated: source.celebrated && typeof source.celebrated === 'object' ? source.celebrated : {},
      };
      return state;
    }
  } catch { /* localStorage may be unavailable */ }
  state = emptyProgress();
  return state;
}

function persist() {
  try { localStorage.setItem(EDUCATION_PROGRESS_KEY, JSON.stringify(read())); } catch { /* local-only best effort */ }
  listeners.forEach((listener) => listener());
}

export function cardProgressKey(sectionId: string, cardIndex: number) { return `${sectionId}:${cardIndex}`; }

export function isCardLearned(sectionId: string, cardIndex: number) {
  return !!read().learned[cardProgressKey(sectionId, cardIndex)];
}

export function toggleCardLearned(sectionId: string, cardIndex: number) {
  const key = cardProgressKey(sectionId, cardIndex);
  const progress = read();
  if (progress.learned[key]) delete progress.learned[key];
  else progress.learned[key] = true;
  persist();
  return !!progress.learned[key];
}

export function getQuizBest(key: string) { return typeof read().quizBest[key] === 'number' ? read().quizBest[key] : null; }

export function setQuizBest(key: string, score: number) {
  const progress = read();
  const previous = getQuizBest(key);
  if (previous === null || score > previous) {
    progress.quizBest[key] = score;
    persist();
  }
  return previous;
}

export function sectionProgress(sectionId: string, total: number) {
  const learnedCount = Array.from({ length: total }, (_, i) => isCardLearned(sectionId, i)).filter(Boolean).length;
  return { learnedCount, total, pct: total ? Math.round((learnedCount / total) * 100) : 0 };
}

export function markSectionCelebrated(sectionId: string) {
  const progress = read();
  if (progress.celebrated[sectionId]) return false;
  progress.celebrated[sectionId] = true;
  persist();
  return true;
}

export function isSectionCelebrated(sectionId: string) { return !!read().celebrated[sectionId]; }

export function useEducationProgress() {
  const [, refresh] = useState(0);
  useEffect(() => {
    const listener = () => refresh((value) => value + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);
  return { isCardLearned, toggleCardLearned, sectionProgress, getQuizBest, setQuizBest };
}
