// =============================================================================
// SAT tabs — shared practice-question rendering kit.
// -----------------------------------------------------------------------------
// A reusable card that grades a single SatQuestion in place: passage + 4-choice
// MCQ, OR a grid-in text input compared case/space-insensitively to
// gridInAnswer. Used by the Reading & Writing and Math practice tabs so the
// look-and-feel stays consistent. Pure presentation; no exam data here.
// =============================================================================
import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Lock, ChevronDown } from 'lucide-react';
import { SatQuestion } from '../../types';
import { useEnglishStats } from '../../stats';
import { enSatKey } from '../../englishLearning';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Decide the free-tier "taste" for a domain-grouped SAT practice tab. SAT has
// no CEFR A1 tier, so a free account gets exactly ONE domain — the first (in
// canonical order) that actually has questions — and everything else is Pro.
// Computed from the FULL question set, never the current domain filter, so a
// free user can't reveal a locked domain just by selecting its filter chip.
export function gateFreePractice<Q extends { domain: string }>(
  all: Q[],
  order: readonly string[],
  allContent: boolean,
): { freeDomain: string | undefined; hiddenCount: number } {
  const freeDomain = order.find((d) => all.some((q) => q.domain === d));
  const hiddenCount = allContent ? 0 : all.filter((q) => q.domain !== freeDomain).length;
  return { freeDomain, hiddenCount };
}

// SAT has no CEFR A1 tier, so a free account gets the first practice group as a
// taste; the rest is replaced by this Pro upsell panel. Keeps the placement
// result screen's "locked for free" claim truthful on the SAT track too.
export function FreePracticeLock({ hiddenCount, onUpgrade }: { hiddenCount: number; onUpgrade: () => void }) {
  return (
    <div className="rounded-2xl border border-ink-line bg-ink-raise p-6 text-center space-y-3">
      <span className="inline-flex w-12 h-12 rounded-xl bg-ink-2 border border-ink-line items-center justify-center text-paper-2">
        <Lock className="w-6 h-6" />
      </span>
      <h3 className="text-lg font-serif font-light text-paper">Үлдсэн {hiddenCount} дасгал Pro-д</h3>
      <p className="text-sm text-paper-2 leading-relaxed max-w-sm mx-auto">
        Үнэгүй эрхээр эхний хэсгийг туршиж үзээрэй. Бүх домэйны бүрэн дасгалыг Pro болон Max багцаар нээнэ.
      </p>
      <button
        onClick={onUpgrade}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-6 py-2.5 text-sm font-bold hover:bg-white"
      >
        <Lock className="w-4 h-4" /> Pro-оор нээх
      </button>
    </div>
  );
}

// Per-question practice status, derived from the profile's completion +
// mistake ledgers (see recordPracticeDone in stats.tsx):
//   'correct'   — answered right at least once, no outstanding mistake
//   'incorrect' — currently flagged in the mistake log (retry it)
//   'unseen'    — never answered
export type SatQuestionStatus = 'correct' | 'incorrect' | 'unseen';

export function satQuestionStatus(
  questionId: number,
  completedIds: string[],
  mistakeIds: string[],
): SatQuestionStatus {
  const key = enSatKey(questionId);
  if (mistakeIds.includes(key)) return 'incorrect';
  if (completedIds.includes(key)) return 'correct';
  return 'unseen';
}

// Stable partition: flagged mistakes float to the top of the (already
// difficulty-sorted) list, everything else keeps its relative order.
export function sortMistakesFirst<Q extends { id: number }>(
  questions: Q[],
  mistakeIds: string[],
): Q[] {
  const isMistake = (q: Q) => mistakeIds.includes(enSatKey(q.id));
  return questions.slice().sort((a, b) => Number(isMistake(b)) - Number(isMistake(a)));
}

// Small pill toggle shared by the Math/RW practice tabs — reveals questions
// already answered correctly (hidden by default so a tab reads as "what's
// left to do").
export function CompletedToggle({ show, onChange }: { show: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!show)}
      className={[
        'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
        show ? 'bg-paper text-ink' : 'bg-ink-2 text-paper-2 hover:text-paper',
      ].join(' ')}
    >
      Хийсэн харуулах
    </button>
  );
}

// A grid-in item is one with no choices array (student-produced response).
export function isGridIn(q: SatQuestion): boolean {
  return !q.choices || q.choices.length === 0;
}

// Normalise a free-text / grid-in answer for tolerant, case/space-insensitive
// comparison. Collapses numeric forms so ".5", "0.50" and "0.5" all match.
function normalise(raw: string): string {
  const t = raw.trim().toLowerCase().replace(/\s+/g, '');
  if (t === '') return '';
  if (/^[-+]?[0-9.]+$/.test(t)) {
    const asNum = Number(t);
    if (!Number.isNaN(asNum)) return String(asNum);
  }
  return t;
}

export function gridInCorrect(q: SatQuestion, value: string): boolean {
  if (q.gridInAnswer === undefined) return false;
  return normalise(value) === normalise(q.gridInAnswer);
}

// A single self-grading SAT question (passage + MCQ or grid-in) with a worked
// explanation shown after answering.
export const SatPracticeCard: React.FC<{ q: SatQuestion; index: number }> = ({ q, index }) => {
  const { recordStudy, recordPracticeDone, requireAccount, profile } = useEnglishStats();
  const gridIn = isGridIn(q);
  // Persisted "answered before" state — survives reloads and future sessions.
  const doneBefore = (profile?.completedActivityIdsEn ?? []).includes(enSatKey(q.id));
  const mistakeBefore = (profile?.mistakeIdsEn ?? []).includes(enSatKey(q.id));
  const [picked, setPicked] = useState<number | undefined>(undefined);
  const [grid, setGrid] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const wasCorrect = gridIn
    ? gridInCorrect(q, grid)
    : picked !== undefined && picked === q.correctIndex;
  const canSubmit = gridIn ? grid.trim() !== '' : picked !== undefined;

  function reset() {
    setPicked(undefined);
    setGrid('');
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl bg-ink-raise p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-2 text-paper-2 font-semibold text-sm">
          {index + 1}.
          {!submitted && mistakeBefore && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink-2 text-paper px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              <XCircle className="w-3 h-3" /> Буруу — дахин хийх
            </span>
          )}
          {doneBefore && !mistakeBefore && !submitted && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink-2 text-paper px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3" /> Хийсэн
            </span>
          )}
        </span>
        <span className="flex items-center gap-2">
          {q.difficulty && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-ink-2 text-paper-2">
              {q.difficulty}
            </span>
          )}
          <span className="text-xs font-medium text-paper-2">{q.domain}</span>
        </span>
      </div>

      {q.passage && (
        <div className="rounded-xl bg-ink-raise p-4 mb-4 leading-relaxed whitespace-pre-line text-paper">
          {q.passage}
        </div>
      )}

      <p className="font-semibold text-paper mb-4 whitespace-pre-line">{q.question}</p>

      {gridIn ? (
        <div>
          <label className="block text-sm text-paper-2 mb-2">
            Enter your answer
          </label>
          <input
            type="text"
            inputMode="text"
            value={grid}
            disabled={submitted}
            onChange={(e) => setGrid(e.target.value)}
            placeholder="e.g. 12 or 3/4 or 0.5"
            className={[
              'w-full sm:w-64 rounded-xl border bg-ink-raise px-4 py-3 text-paper outline-none transition-colors',
              submitted
                ? wasCorrect
                  ? 'border-paper bg-paper text-ink'
                  : 'border-ink-line bg-ink-2 text-paper-2'
                : 'border-ink-line focus:border-paper',
            ].join(' ')}
          />
          {submitted && (
            <p className="mt-2 text-sm font-medium text-paper-2">
              {wasCorrect ? (
                <span className="inline-flex items-center gap-1.5 text-paper">
                  <CheckCircle2 className="w-4 h-4" /> Correct
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Correct answer: {q.gridInAnswer}
                </span>
              )}
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-2">
          {(q.choices ?? []).map((c, ci) => {
            const isPicked = picked === ci;
            const isAnswer = ci === q.correctIndex;
            const cls = [
              'flex items-start gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors',
              submitted && isAnswer
                ? 'border-paper bg-paper text-ink'
                : submitted && isPicked
                  ? 'border-ink-line bg-ink-2 text-paper-2'
                  : isPicked
                    ? 'border-paper bg-ink-2 text-paper'
                    : 'border-ink-line text-paper hover:border-paper/60',
            ].join(' ');
            return (
              <button
                key={ci}
                type="button"
                disabled={submitted}
                onClick={() => setPicked(ci)}
                className={cls}
              >
                <span className="mt-0.5 font-bold">{LETTERS[ci]}</span>
                <span className="flex-1 whitespace-pre-line">{c}</span>
                {submitted && isAnswer && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                {submitted && isPicked && !isAnswer && <XCircle className="w-5 h-5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => {
              if (!requireAccount()) return;
              setSubmitted(true);
              recordStudy();
              recordPracticeDone(enSatKey(q.id), wasCorrect); // correct→done+clears mistake, wrong→flagged for retry
            }}
            className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2 text-sm font-semibold disabled:opacity-40"
          >
            <CheckCircle2 className="w-4 h-4" /> Check answer
          </button>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-5 py-2 text-sm font-semibold hover:bg-ink-raise"
          >
            <RotateCcw className="w-4 h-4" /> Try again
          </button>
        )}
      </div>

      {submitted && q.explanation && (
        <div className="mt-3 rounded-xl bg-ink-raise p-4">
          <p className="text-xs font-bold text-paper uppercase tracking-wide mb-1">
            Тайлбар · Explanation
          </p>
          <p className="text-sm text-paper-2 leading-relaxed whitespace-pre-line">
            {q.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

// Domain filter pill bar shared by the RW and Math practice tabs.
export function DomainFilter<T extends string>({
  domains,
  active,
  onChange,
}: {
  domains: T[];
  active: T | 'all';
  onChange: (d: T | 'all') => void;
}) {
  const options: (T | 'all')[] = ['all', ...domains];
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

// Difficulty breakdown shown in a domain header when no single difficulty is
// selected — e.g. "E 8 · M 12 · H 5".
export type DifficultyCounts = { Easy: number; Medium: number; Hard: number };

// A collapsible domain section (native <details>/<summary>, no accordion lib).
// Reused by the Math and RW practice tabs so the collapse/expand + header
// markup — bullet, domain name, filtered count, difficulty breakdown, chevron
// — lives in one place. `open` is driven by the parent's domain filter (a
// single selected domain renders open; otherwise the tab loads fully
// collapsed as a compact index).
export const DomainSection: React.FC<{
  domain: string;
  count: number;
  breakdown?: DifficultyCounts;
  open: boolean;
  children: React.ReactNode;
}> = ({ domain, count, breakdown, open, children }) => {
  return (
    <details open={open} className="group">
      <summary className="list-none [&::-webkit-details-marker]:hidden flex items-center gap-2 cursor-pointer text-lg font-bold text-paper">
        <span className="h-5 w-1.5 rounded-full bg-paper" />
        {domain}
        <span className="text-sm font-normal text-paper-2">· {count}</span>
        {breakdown && (
          <span className="text-xs font-normal text-paper-2/70">
            E {breakdown.Easy} · M {breakdown.Medium} · H {breakdown.Hard}
          </span>
        )}
        <ChevronDown className="w-4 h-4 ml-auto shrink-0 text-paper-2 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-4 mt-4">{children}</div>
    </details>
  );
};
