import React from 'react';
import { Check, X } from 'lucide-react';
import { useTheme } from '../lib/theme';

export interface MCQBlockProps {
  choices: string[];
  correctIndex: number;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  feedbackText?: string;
}

export default function MCQBlock({
  choices,
  correctIndex,
  selectedAnswer,
  onSelect,
  feedbackText,
}: MCQBlockProps) {
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === correctIndex;
  const themeName = useTheme();
  const gold = themeName === 'gold';
  const aurora = themeName === 'aurora';

  const displayFeedback = feedbackText !== undefined
    ? feedbackText
    : (isCorrect ? 'Та зөв сонголтыг хийлээ.' : `Зөв хариулт нь: "${choices[correctIndex]}"`);

  return (
    <>
      <div className="flex flex-col gap-4">
        {choices.map((c, i) => {
          const isSel = selectedAnswer === i;
          const isOptionCorrect = i === correctIndex;

          const era = gold || aurora;
          let containerClass = '';
          let circleClass = era ? 'bg-white' : 'bg-ink-2 border-ink-line';
          let borderEffect = null;

          if (answered) {
            if (isOptionCorrect) {
              containerClass = era ? 'bg-secondary-container text-on-secondary-fixed border-secondary' : 'bg-paper text-ink border-paper';
              circleClass = era ? 'bg-secondary text-white' : 'bg-ink text-paper';
              borderEffect = era
                ? <div className="absolute inset-0 border-2 border-secondary rounded-xl pointer-events-none"></div>
                : <div className="absolute inset-0 border-2 border-paper rounded-xl pointer-events-none"></div>;
            } else if (isSel) {
              containerClass = era ? 'bg-error-container text-on-error-container border-error' : 'bg-transparent text-paper-3 border-ink-line';
              circleClass = era ? 'bg-error text-white' : 'bg-transparent text-paper-3 border-ink-line';
              borderEffect = era
                ? <div className="absolute inset-0 border-2 border-error rounded-xl pointer-events-none"></div>
                : <div className="absolute inset-0 border-2 border-ink-line rounded-xl pointer-events-none"></div>;
            } else {
              containerClass = era ? 'opacity-60 border-on-background/40' : 'opacity-40 border-ink-line/40';
            }
          }

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => { if (!answered) onSelect(i); }}
              className={era ? `relative flex items-center p-4 border-2 border-on-background rounded-xl text-left transition-all group block-shadow select-none text-body-md font-bold text-on-surface ${
                !answered ? 'cursor-pointer hover:bg-surface-container hover:text-primary' : 'cursor-default'
              } ${containerClass}` : `relative flex items-center p-4 border border-ink-line rounded-xl text-left transition-all group select-none text-body-md font-medium text-paper bg-ink-raise ${
                !answered ? 'cursor-pointer hover:border-paper/60 hover:bg-ink-2' : 'cursor-default'
              } ${containerClass}`}
            >
              <div className={era ? `w-6 h-6 rounded-full border-2 border-on-background mr-4 flex items-center justify-center shrink-0 transition-all ${circleClass}` : `w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 transition-all ${circleClass}`}>
                {answered && isOptionCorrect && <Check className="w-4 h-4 stroke-[3px]" />}
                {answered && isSel && !isOptionCorrect && <X className="w-4 h-4 stroke-[3px]" />}
              </div>
              <span className="flex-grow">{c}</span>
              {borderEffect}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={gold || aurora ? `mt-6 p-4 rounded-xl border-2 border-on-background animate-fade-in ${
          isCorrect ? 'bg-secondary-container text-on-secondary-fixed border-on-secondary-container' : 'bg-error-container text-on-error-container border-on-error-container'
        }` : `mt-6 p-4 rounded-xl border animate-fade-in ${
          isCorrect ? 'bg-paper text-ink border-paper' : 'bg-ink-raise text-paper-2 border-ink-line'
        }`}>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-2xl font-bold fill mt-0.5">
              {isCorrect ? 'check_circle' : 'cancel'}
            </span>
            <div>
              <h4 className="font-extrabold text-[15px]">
                {isCorrect ? 'Сүрхий зөв хариуллаа!' : 'Өө, буруу хувилбар! Дахин оролдоод үзээрэй.'}
              </h4>
              <p className="text-xs mt-1 leading-normal font-mono whitespace-pre-line">
                {displayFeedback}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
