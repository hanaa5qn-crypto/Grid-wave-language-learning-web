import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../lib/theme';

interface QuizNavProps {
  qIdx: number;
  total: number;
  answered: boolean;
  onPrev: () => void;
  onNext: () => void;
  nextLessonLabel: boolean;
}

export default function QuizNav({ qIdx, total, answered, onPrev, onNext, nextLessonLabel }: QuizNavProps) {
  const themeName = useTheme();
  const gold = themeName === 'gold';
  const aurora = themeName === 'aurora';
  return (
    <div className="flex items-center justify-between gap-2 mt-5">
      <button onClick={onPrev} disabled={qIdx === 0}
        className={gold || aurora ? `flex items-center gap-1.5 px-4 py-2.5 rounded-lg border-2 border-on-background font-bold text-sm font-space transition-all ${
          qIdx === 0 ? 'opacity-40 cursor-default bg-surface-container text-on-surface-variant' : 'cursor-pointer bg-surface-container text-on-surface hover:scale-[1.02] block-shadow'}` : `flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-ink-line font-medium text-xs uppercase tracking-[0.15em] transition-all ${
          qIdx === 0 ? 'opacity-40 cursor-default bg-transparent text-paper-2' : 'cursor-pointer bg-transparent text-paper hover:border-paper/60 hover:bg-ink-raise'}`}>
        <ArrowLeft className="w-4 h-4" /> Өмнөх асуулт
      </button>
      <span className={gold || aurora ? "text-xs font-space font-bold text-on-surface-variant whitespace-nowrap" : "text-xs font-medium uppercase tracking-[0.18em] text-paper-3 whitespace-nowrap"}>
        Асуулт {qIdx + 1} / {total}
      </span>
      <button onClick={onNext} disabled={!answered}
        className={gold || aurora ? `flex items-center gap-1.5 px-4 py-2.5 rounded-lg border-2 border-on-background font-bold text-sm font-space transition-all ${
          !answered ? 'opacity-40 cursor-default bg-surface-container text-on-surface-variant' : 'cursor-pointer bg-secondary text-white hover:scale-[1.02] block-shadow'}` : `flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-ink-line font-medium text-xs uppercase tracking-[0.15em] transition-all ${
          !answered ? 'opacity-40 cursor-default bg-transparent text-paper-2' : 'cursor-pointer bg-paper text-ink border-paper hover:bg-paper-bright hover:-translate-y-0.5'}`}>
        {nextLessonLabel ? 'Дараах хичээл' : 'Дараах асуулт'} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
