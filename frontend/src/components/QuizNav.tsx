import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizNavProps {
  qIdx: number;
  total: number;
  answered: boolean;
  onPrev: () => void;
  onNext: () => void;
  nextLessonLabel: boolean;
}

export default function QuizNav({ qIdx, total, answered, onPrev, onNext, nextLessonLabel }: QuizNavProps) {
  return (
    <div className="flex items-center justify-between gap-2 mt-5">
      <button onClick={onPrev} disabled={qIdx === 0}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border-2 border-on-background font-bold text-sm font-space transition-all ${
          qIdx === 0 ? 'opacity-40 cursor-default bg-surface-container text-on-surface-variant' : 'cursor-pointer bg-surface-container text-on-surface hover:scale-[1.02] block-shadow'}`}>
        <ArrowLeft className="w-4 h-4" /> Өмнөх асуулт
      </button>
      <span className="text-xs font-space font-bold text-on-surface-variant whitespace-nowrap">
        Асуулт {qIdx + 1} / {total}
      </span>
      <button onClick={onNext} disabled={!answered}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border-2 border-on-background font-bold text-sm font-space transition-all ${
          !answered ? 'opacity-40 cursor-default bg-surface-container text-on-surface-variant' : 'cursor-pointer bg-secondary text-white hover:scale-[1.02] block-shadow'}`}>
        {nextLessonLabel ? 'Дараах хичээл' : 'Дараах асуулт'} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
