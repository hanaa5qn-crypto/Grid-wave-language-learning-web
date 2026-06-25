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
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-ink-line font-medium text-xs uppercase tracking-[0.15em] transition-all ${
          qIdx === 0 ? 'opacity-40 cursor-default bg-transparent text-paper-2' : 'cursor-pointer bg-transparent text-paper hover:border-paper/60 hover:bg-ink-raise'}`}>
        <ArrowLeft className="w-4 h-4" /> Өмнөх асуулт
      </button>
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-paper-3 whitespace-nowrap">
        Асуулт {qIdx + 1} / {total}
      </span>
      <button onClick={onNext} disabled={!answered}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-ink-line font-medium text-xs uppercase tracking-[0.15em] transition-all ${
          !answered ? 'opacity-40 cursor-default bg-transparent text-paper-2' : 'cursor-pointer bg-paper text-ink border-paper hover:bg-white hover:-translate-y-0.5'}`}>
        {nextLessonLabel ? 'Дараах хичээл' : 'Дараах асуулт'} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
