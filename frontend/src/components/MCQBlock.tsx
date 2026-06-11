import React from 'react';
import { Check, X } from 'lucide-react';

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

  const displayFeedback = feedbackText !== undefined
    ? feedbackText
    : (isCorrect ? 'Та зөв сонголтыг хийлээ.' : `Зөв хариулт нь: "${choices[correctIndex]}"`);

  return (
    <>
      <div className="flex flex-col gap-4">
        {choices.map((c, i) => {
          const isSel = selectedAnswer === i;
          const isOptionCorrect = i === correctIndex;

          let containerClass = '';
          let circleClass = 'bg-white';
          let borderEffect = null;

          if (answered) {
            if (isOptionCorrect) {
              containerClass = 'bg-secondary-container text-on-secondary-fixed border-secondary';
              circleClass = 'bg-secondary text-white';
              borderEffect = <div className="absolute inset-0 border-2 border-secondary rounded-xl pointer-events-none"></div>;
            } else if (isSel) {
              containerClass = 'bg-error-container text-on-error-container border-error';
              circleClass = 'bg-error text-white';
              borderEffect = <div className="absolute inset-0 border-2 border-error rounded-xl pointer-events-none"></div>;
            } else {
              containerClass = 'opacity-60 border-on-background/40';
            }
          }

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => { if (!answered) onSelect(i); }}
              className={`relative flex items-center p-4 border-2 border-on-background rounded-xl text-left transition-all group block-shadow select-none text-body-md font-bold text-on-surface ${
                !answered ? 'cursor-pointer hover:bg-surface-container hover:text-primary' : 'cursor-default'
              } ${containerClass}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 border-on-background mr-4 flex items-center justify-center shrink-0 transition-all ${circleClass}`}>
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
        <div className={`mt-6 p-4 rounded-xl border-2 border-on-background animate-fade-in ${
          isCorrect ? 'bg-secondary-container text-on-secondary-fixed border-on-secondary-container' : 'bg-error-container text-on-error-container border-on-error-container'
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
