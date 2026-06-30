// =============================================================================
// IELTS tabs — shared MCQ / quiz rendering kit.
// -----------------------------------------------------------------------------
// Small reusable pieces used by the Reading and Listening practice tabs so the
// quiz look-and-feel stays consistent. Pure presentation; no exam data here.
// =============================================================================
import React from 'react';
import { CheckCircle2, XCircle, Lock, Check } from 'lucide-react';
import { MCQ, EnglishLevel } from '../../types';

// A1 is included so free accounts have a real, unlocked starter level (the
// "free version"); the academic A2–C2 set sits above it.
export const IELTS_LEVELS: EnglishLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Free accounts get A1 lessons as a taste; A2+ are Pro. Single source of truth
// so Reading + Listening lock identically and match what the placement result
// screen advertises (free = A1 only).
export function isFreeLessonLocked(allContent: boolean, level: EnglishLevel): boolean {
  return !allContent && level !== 'A1';
}

// Small "Pro" lock badge shown on lessons a free account can't open yet.
export function LockBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-paper/40 text-paper px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em]">
      <Lock className="w-3 h-3" /> Pro
    </span>
  );
}

// A single multiple-choice question with grade-aware option styling.
export const McqBlock: React.FC<{
  q: MCQ;
  index: number;
  selected: number | undefined;
  submitted: boolean;
  onPick: (choice: number) => void;
}> = ({
  q,
  index,
  selected,
  submitted,
  onPick,
}) => {
  return (
    <div className="rounded-2xl bg-ink-raise p-4 sm:p-5">
      <p className="font-semibold mb-3 text-paper">
        <span className="text-paper-2 mr-2">{index + 1}.</span>
        {q.question}
      </p>
      <div className="grid gap-2">
        {q.choices.map((choice, ci) => {
          const picked = selected === ci;
          const isAnswer = ci === q.correctIndex;
          const cls = [
            'flex items-start gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors',
            submitted && isAnswer
              ? 'border-paper bg-paper text-ink'
              : submitted && picked
                ? 'border-ink-line bg-ink-2 text-paper-2'
                : picked
                  ? 'border-paper bg-ink-2 text-paper'
                  : 'border-ink-line text-paper hover:border-paper/60',
          ].join(' ');
          return (
            <button
              key={ci}
              type="button"
              disabled={submitted}
              onClick={() => onPick(ci)}
              className={cls}
            >
              <span className="mt-0.5 font-bold">{String.fromCharCode(65 + ci)}</span>
              <span className="flex-1">{choice}</span>
              {submitted && isAnswer && <CheckCircle2 className="w-5 h-5 shrink-0" />}
              {submitted && picked && !isAnswer && <XCircle className="w-5 h-5 shrink-0" />}
            </button>
          );
        })}
      </div>
      {submitted && q.explanation && (
        <p className="mt-3 text-sm text-paper-2">
          <span className="font-semibold text-paper">Тайлбар: </span>
          {q.explanation}
        </p>
      )}
    </div>
  );
};

// Level filter pill bar shared by reading/listening/vocab tabs.
export function LevelFilter({
  levels,
  active,
  onChange,
  includeAll = true,
}: {
  levels: EnglishLevel[];
  active: EnglishLevel | 'all';
  onChange: (lvl: EnglishLevel | 'all') => void;
  includeAll?: boolean;
}) {
  const options: (EnglishLevel | 'all')[] = includeAll ? ['all', ...levels] : [...levels];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = active === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
              on
                ? 'bg-paper text-ink'
                : 'bg-ink-2 text-paper-2 hover:text-paper',
            ].join(' ')}
          >
            {opt === 'all' ? 'Бүгд' : opt}
          </button>
        );
      })}
    </div>
  );
}

// Step bar for the multi-part Writing/Speaking tests: shows "Part X of N" as a
// row of numbered chips (done = check, current = filled). When onJump is given,
// already-visited steps are tappable so a learner can flip back to an earlier
// part; future parts stay disabled until reached. Shared so Writing (Task 1→2)
// and Speaking (Part 1→2→3) read identically.
export function PartProgress({
  steps,
  current,
  onJump,
}: {
  steps: string[];
  current: number;
  onJump?: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const tappable = !!onJump && i <= current;
        return (
          <React.Fragment key={i}>
            <button
              type="button"
              disabled={!tappable}
              onClick={tappable ? () => onJump!(i) : undefined}
              aria-current={active ? 'step' : undefined}
              className={[
                'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold transition-colors',
                active ? 'bg-paper text-ink' : done ? 'bg-ink-2 text-paper' : 'bg-ink-2 text-paper-2',
                tappable ? 'cursor-pointer hover:opacity-90' : 'cursor-default',
              ].join(' ')}
            >
              <span
                className={[
                  'inline-flex w-5 h-5 items-center justify-center rounded-full text-[10px]',
                  active ? 'bg-ink text-paper' : done ? 'bg-paper text-ink' : 'bg-ink-raise text-paper-2',
                ].join(' ')}
              >
                {done ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              {label}
            </button>
            {i < steps.length - 1 && <span className="h-px w-3 bg-ink-line shrink-0" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Small score banner shown after grading a quiz.
export function ScoreBanner({ correct, total }: { correct: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  return (
    <div className="rounded-2xl bg-paper text-ink px-5 py-4 flex items-center justify-between">
      <span className="font-bold text-lg">
        {correct} / {total} зөв
      </span>
      <span className="text-sm font-semibold">{pct}%</span>
    </div>
  );
}

// Full-tab Pro paywall. Speaking and Writing are the AI-graded skills (every
// submission hits the Gemini grader), so unlike the local-MCQ tabs they give no
// free taste — a free account sees this upsell instead of the practice content.
// onUpgrade opens the shared EnglishUpgrade modal.
export function ProLockedTab({
  icon: Icon,
  title,
  blurb,
  onUpgrade,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  blurb: string;
  onUpgrade: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="rounded-3xl border border-ink-line bg-ink-raise p-8 sm:p-10 text-center space-y-4">
        <span className="inline-flex w-14 h-14 rounded-2xl bg-ink-2 border border-ink-line items-center justify-center text-paper">
          <Icon className="w-7 h-7" />
        </span>
        <div className="flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-paper-2" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper-2">Pro</span>
        </div>
        <h2 className="text-2xl font-serif font-light tracking-tight text-paper">{title}</h2>
        <p className="text-paper-2 leading-relaxed max-w-md mx-auto">{blurb}</p>
        <button
          onClick={onUpgrade}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-6 py-3 font-bold hover:bg-white"
        >
          <Lock className="w-4 h-4" /> Pro-оор нээх
        </button>
      </div>
    </div>
  );
}
