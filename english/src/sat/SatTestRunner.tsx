// =============================================================================
// SAT — interactive Digital SAT test player.
// -----------------------------------------------------------------------------
// Renders the full adaptive structure (RW Module 1/2, Math Module 1/2) with a
// per-module countdown timer (display only), one-question-at-a-time navigation
// plus a question palette, MCQ radios + grid-in text inputs, raw→scaled section
// scoring via satScaledScore, and per-question explanations after grading.
// =============================================================================
import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, ChevronLeft, Clock, Flag, CheckCircle2, XCircle,
  ListChecks, RotateCcw,
} from 'lucide-react';
import { SatTest, SatSection, SatQuestion } from '../types';
import { satScaledScore } from './satTests';
import { useEnglishStats } from '../stats';
import { useTheme } from '../../../frontend/src/lib/theme';

// Map a section's module name to the scoring key satScaledScore expects.
function sectionScoreKey(section: SatSection): 'reading' | 'math' {
  return section.module === 'Reading and Writing' ? 'reading' : 'math';
}

// A short human label for a section ("RW · Module 1", "Math · Module 2").
function sectionLabel(section: SatSection): string {
  const short = section.module === 'Reading and Writing' ? 'RW' : 'Math';
  return `${short} · Module ${section.moduleNumber}`;
}

// A grid-in item is one with no choices array (student-produced response).
function isGridIn(q: SatQuestion): boolean {
  return !q.choices || q.choices.length === 0;
}

// Normalise a free-text / grid-in answer for tolerant comparison.
// Accepts e.g. ".5" === "0.5", "1/2" left as-is, ignores surrounding space/case.
function normaliseAnswer(raw: string): string {
  const t = raw.trim().toLowerCase().replace(/\s+/g, '');
  if (t === '') return '';
  const asNum = Number(t);
  if (!Number.isNaN(asNum) && /^[-+]?[0-9.]+$/.test(t)) {
    // Collapse numeric forms so "0.50", ".5", "0.5" all match.
    return String(asNum);
  }
  return t;
}

// Evaluate a "n/d" fraction string to a decimal, or null if not a fraction.
function fractionToDecimal(s: string): number | null {
  const m = /^-?\d+\/\d+$/.exec(s);
  if (!m) return null;
  const [n, d] = s.split('/').map(Number);
  return d === 0 ? null : n / d;
}

function gridInCorrect(q: SatQuestion, value: string): boolean {
  if (q.gridInAnswer === undefined) return false;
  const a = normaliseAnswer(value);
  const b = normaliseAnswer(q.gridInAnswer);
  if (a === b) return true;
  // Fraction vs. decimal (e.g. ".333" vs. stored "1/3"): compare numerically.
  const aFrac = fractionToDecimal(a);
  const bFrac = fractionToDecimal(b);
  if (aFrac !== null || bFrac !== null) {
    const aNum = aFrac !== null ? aFrac : Number(a);
    const bNum = bFrac !== null ? bFrac : Number(b);
    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
      return Math.abs(aNum - bNum) < 0.001;
    }
  }
  return false;
}

function mcqCorrect(q: SatQuestion, choiceIndex: number | undefined): boolean {
  return choiceIndex !== undefined && choiceIndex === q.correctIndex;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Format seconds as M:SS.
function fmtTime(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

// ---- Countdown timer (display only; does not hard-stop the module) ----------
function ModuleTimer({ minutes, sectionKey }: { minutes: number; sectionKey: string }) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  const [remaining, setRemaining] = useState(minutes * 60);
  const startRef = useRef<number>(Date.now());

  // Restart the clock whenever the active module (sectionKey) changes.
  useEffect(() => {
    startRef.current = Date.now();
    setRemaining(minutes * 60);
    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
      setRemaining(Math.max(0, minutes * 60 - elapsed));
    }, 1000);
    return () => window.clearInterval(id);
  }, [minutes, sectionKey]);

  const low = remaining <= 60;
  return (
    <span
      className={gold || aurora
        ? `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold tabular-nums ${low ? 'bg-surface-container-high text-on-surface-variant' : 'bg-surface-container-high text-on-surface'}`
        : `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold tabular-nums ${low ? 'bg-ink-2 text-paper-2' : 'bg-ink-2 text-paper'}`}
      aria-label="Time remaining in this module"
    >
      <Clock className="w-4 h-4" />
      {fmtTime(remaining)}
    </span>
  );
}

// ---- A single question card -------------------------------------------------
function QuestionCard({
  q,
  index,
  total,
  selectedChoice,
  gridValue,
  graded,
  onPickChoice,
  onGridChange,
}: {
  q: SatQuestion;
  index: number;
  total: number;
  selectedChoice: number | undefined;
  gridValue: string;
  graded: boolean;
  onPickChoice: (i: number) => void;
  onGridChange: (v: string) => void;
}) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  const gridIn = isGridIn(q);
  const wasCorrect = gridIn ? gridInCorrect(q, gridValue) : mcqCorrect(q, selectedChoice);

  return (
    <div className={gold || aurora ? "rounded-2xl bg-surface-container p-5 sm:p-6" : "rounded-2xl bg-ink-raise p-5 sm:p-6"}>
      <div className="flex items-center justify-between mb-3">
        <span className={gold || aurora ? "text-xs font-bold text-on-surface uppercase tracking-wide" : "text-xs font-bold text-paper uppercase tracking-wide"}>
          Question {index + 1} of {total}
        </span>
        <span className={gold || aurora ? "text-xs font-medium text-on-surface-variant" : "text-xs font-medium text-paper-2"}>{q.domain}</span>
      </div>

      {q.passage && (
        <div className={gold || aurora ? "rounded-xl bg-surface-container p-4 mb-4 leading-relaxed whitespace-pre-line text-on-surface" : "rounded-xl bg-ink-raise p-4 mb-4 leading-relaxed whitespace-pre-line text-paper"}>
          {q.passage}
        </div>
      )}

      <p className={gold || aurora ? "font-semibold text-on-surface mb-4 whitespace-pre-line" : "font-semibold text-paper mb-4 whitespace-pre-line"}>{q.question}</p>

      {gridIn ? (
        <div>
          <label className={gold || aurora ? "block text-sm text-on-surface-variant mb-2" : "block text-sm text-paper-2 mb-2"}>
            Enter your answer
          </label>
          <input
            type="text"
            inputMode="text"
            value={gridValue}
            disabled={graded}
            onChange={(e) => onGridChange(e.target.value)}
            placeholder="e.g. 12 or 3/4 or 0.5"
            className={gold || aurora
              ? `w-full sm:w-64 rounded-xl border bg-surface-container px-4 py-3 text-on-surface outline-none transition-colors ${
                  graded
                    ? wasCorrect
                      ? 'border-secondary bg-secondary text-white'
                      : 'border-on-background bg-surface-container-high text-on-surface-variant'
                    : 'border-on-background focus:border-secondary'
                }`
              : `w-full sm:w-64 rounded-xl border bg-ink-raise px-4 py-3 text-paper outline-none transition-colors ${
                  graded
                    ? wasCorrect
                      ? 'border-paper/60 bg-paper text-ink'
                      : 'border-ink-line bg-ink-2 text-paper-2'
                    : 'border-ink-line focus:border-paper'
                }`}
          />
          {graded && (
            <p className={gold || aurora ? "mt-2 text-sm font-medium text-on-surface-variant" : "mt-2 text-sm font-medium text-paper-2"}>
              {wasCorrect ? (
                <span className={gold || aurora ? "inline-flex items-center gap-1.5 text-on-surface" : "inline-flex items-center gap-1.5 text-paper"}>
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
            const picked = selectedChoice === ci;
            const isRight = ci === q.correctIndex;
            const cls = gold || aurora
              ? (graded
                  ? isRight
                    ? 'border-secondary bg-secondary text-white'
                    : picked
                    ? 'border-on-background bg-surface-container-high text-on-surface-variant'
                    : 'border-on-background text-on-surface-variant'
                  : picked
                  ? 'border-secondary bg-surface-container-high text-on-surface'
                  : 'border-on-background hover:border-secondary/60 text-on-surface')
              : (graded
                  ? isRight
                    ? 'border-paper/60 bg-paper text-ink'
                    : picked
                    ? 'border-ink-line bg-ink-2 text-paper-2'
                    : 'border-ink-line text-paper-2'
                  : picked
                  ? 'border-paper bg-ink-2 text-paper'
                  : 'border-ink-line hover:border-paper/60 text-paper');
            return (
              <button
                key={ci}
                type="button"
                disabled={graded}
                onClick={() => onPickChoice(ci)}
                className={`flex items-start gap-3 text-left rounded-xl px-4 py-3 border transition-colors ${cls}`}
              >
                <span
                  className={gold || aurora
                    ? `flex-shrink-0 w-7 h-7 rounded-full grid place-items-center text-sm font-bold border ${
                        picked && !graded
                          ? 'border-secondary bg-secondary text-white'
                          : graded && isRight
                          ? 'border-secondary/60'
                          : 'border-on-background'
                      }`
                    : `flex-shrink-0 w-7 h-7 rounded-full grid place-items-center text-sm font-bold border ${
                        picked && !graded
                          ? 'border-paper bg-paper text-ink'
                          : graded && isRight
                          ? 'border-paper/60'
                          : 'border-ink-line'
                      }`}
                >
                  {LETTERS[ci]}
                </span>
                <span className="pt-0.5 whitespace-pre-line">{c}</span>
                {graded && isRight && <CheckCircle2 className="w-4 h-4 ml-auto mt-1.5" />}
                {graded && picked && !isRight && <XCircle className="w-4 h-4 ml-auto mt-1.5" />}
              </button>
            );
          })}
        </div>
      )}

      {graded && (
        <div className={gold || aurora ? "mt-4 rounded-xl bg-surface-container p-4" : "mt-4 rounded-xl bg-ink-raise p-4"}>
          <p className={gold || aurora ? "text-xs font-bold text-on-surface uppercase tracking-wide mb-1" : "text-xs font-bold text-paper uppercase tracking-wide mb-1"}>Explanation</p>
          <p className={gold || aurora ? "text-sm text-on-surface-variant leading-relaxed whitespace-pre-line" : "text-sm text-paper-2 leading-relaxed whitespace-pre-line"}>
            {q.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ---- Question palette (jump grid) -------------------------------------------
function Palette({
  questions,
  current,
  answers,
  grids,
  flagged,
  graded,
  onJump,
}: {
  questions: SatQuestion[];
  current: number;
  answers: Record<number, number>;
  grids: Record<number, string>;
  flagged: Record<number, boolean>;
  graded: boolean;
  onJump: (i: number) => void;
}) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
      {questions.map((q, i) => {
        const answered = isGridIn(q)
          ? (grids[q.id] ?? '').trim() !== ''
          : answers[q.id] !== undefined;
        const isCurrent = i === current;
        let state = gold || aurora
          ? 'border-on-background text-on-surface-variant bg-surface-container-high'
          : 'border-ink-line text-paper-2 bg-ink-2';
        if (graded) {
          const ok = isGridIn(q)
            ? gridInCorrect(q, grids[q.id] ?? '')
            : mcqCorrect(q, answers[q.id]);
          state = gold || aurora
            ? (ok ? 'border-secondary bg-secondary text-white' : 'border-on-background bg-surface-container-high text-on-surface-variant')
            : (ok ? 'border-paper/60 bg-paper text-ink' : 'border-ink-line bg-ink-2 text-paper-2');
        } else if (answered) {
          state = gold || aurora ? 'border-secondary bg-surface-container-high text-on-surface' : 'border-paper bg-ink-2 text-paper';
        }
        return (
          <button
            key={q.id}
            type="button"
            onClick={() => onJump(i)}
            className={`relative h-9 rounded-lg border text-sm font-semibold transition-colors ${state} ${
              isCurrent ? (gold || aurora ? 'ring-2 ring-secondary ring-offset-1 ring-offset-surface' : 'ring-2 ring-paper ring-offset-1 ring-offset-ink') : ''
            }`}
            aria-label={`Go to question ${i + 1}`}
          >
            {i + 1}
            {flagged[q.id] && !graded && (
              <Flag className={gold || aurora ? "w-3 h-3 absolute -top-1 -right-1 text-on-surface fill-paper" : "w-3 h-3 absolute -top-1 -right-1 text-paper fill-paper"} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ---- Results banner for a graded module -------------------------------------
function ModuleResult({
  section,
  correct,
  total,
  onReview,
  onRetry,
}: {
  section: SatSection;
  correct: number;
  total: number;
  onReview: () => void;
  onRetry: () => void;
}) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  // satScaledScore expects a raw score out of the full-length curve (54 RW /
  // 44 Math). Scale proportionally so a shorter module isn't graded against
  // the full-length maximum (identity when total matches that curve max).
  const key = sectionScoreKey(section);
  const curveMax = key === 'reading' ? 54 : 44;
  const scaledRaw = total > 0 ? Math.round((correct * curveMax) / total) : 0;
  const scaled = satScaledScore(scaledRaw, key);
  return (
    <div className={gold || aurora ? "rounded-2xl bg-surface-container-high text-on-surface p-5 sm:p-6" : "rounded-2xl bg-ink-2 text-paper p-5 sm:p-6"}>
      <p className="text-sm font-semibold opacity-80">{sectionLabel(section)} · graded</p>
      <div className="flex flex-wrap items-end gap-x-8 gap-y-3 mt-2">
        <div>
          <p className="text-xs uppercase tracking-wide opacity-80">Raw score</p>
          <p className={gold || aurora ? "text-3xl font-space font-light tabular-nums" : "text-3xl font-serif font-light tabular-nums"}>
            {correct}<span className="text-xl opacity-70"> / {total}</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide opacity-80">Estimated section score</p>
          <p className={gold || aurora ? "text-3xl font-space font-light tabular-nums" : "text-3xl font-serif font-light tabular-nums"}>{scaled}</p>
        </div>
      </div>
      <p className="text-xs mt-3 opacity-80">
        Scaled to the 200–800 Digital SAT section range. Review each item below to
        see the worked explanation.
      </p>
      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={onReview}
          className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-5 py-2.5 text-sm font-semibold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2.5 text-sm font-semibold"}
        >
          <ListChecks className="w-4 h-4" /> Review answers
        </button>
        <button
          type="button"
          onClick={onRetry}
          className={gold || aurora ? "inline-flex items-center gap-2 rounded-full border border-on-background/40 px-5 py-2.5 text-sm font-semibold" : "inline-flex items-center gap-2 rounded-full border border-ink-line/40 px-5 py-2.5 text-sm font-semibold"}
        >
          <RotateCcw className="w-4 h-4" /> Retry module
        </button>
      </div>
    </div>
  );
}

// ---- Main runner ------------------------------------------------------------
export default function SatTestRunner({
  test,
  onExit,
}: {
  test: SatTest;
  onExit: () => void;
}) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  const { recordStudy, recordTestResult } = useEnglishStats();
  const sections = test.sections;
  const [activeSection, setActiveSection] = useState(0);
  const [current, setCurrent] = useState(0);

  // Per-section answer maps keyed by question id.
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [grids, setGrids] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  // Which section indices have been graded.
  const [graded, setGraded] = useState<Record<number, boolean>>({});
  // Section indices already written to test history — one entry per submit, so a
  // re-render can't double-log. Cleared for a section on retry (a resubmit is a
  // genuinely new attempt worth recording again).
  const recordedSectionsRef = useRef<Set<number>>(new Set());

  const section = sections[activeSection];
  const questions = section ? section.questions : [];
  const q = questions[current];
  const isGraded = !!graded[activeSection];

  // Guard against an empty / malformed test.
  if (!section || questions.length === 0) {
    return (
      <div className="max-w-3xl">
        <button
          onClick={onExit}
          className={gold || aurora ? "inline-flex items-center gap-2 text-on-surface-variant mb-4" : "inline-flex items-center gap-2 text-paper-2 mb-4"}
        >
          <ChevronLeft className="w-4 h-4" /> Back to tests
        </button>
        <div className={gold || aurora ? "rounded-2xl bg-surface-container p-6 text-on-surface-variant" : "rounded-2xl bg-ink-raise p-6 text-paper-2"}>
          This test has no questions yet.
        </div>
      </div>
    );
  }

  const switchSection = (i: number) => {
    setActiveSection(i);
    setCurrent(0);
  };

  const answeredCount = questions.filter((qq) =>
    isGridIn(qq) ? (grids[qq.id] ?? '').trim() !== '' : answers[qq.id] !== undefined,
  ).length;

  const correctCount = useMemo(
    () =>
      questions.filter((qq) =>
        isGridIn(qq)
          ? gridInCorrect(qq, grids[qq.id] ?? '')
          : mcqCorrect(qq, answers[qq.id]),
      ).length,
    [questions, grids, answers],
  );

  const submitModule = () => {
    setGraded((g) => ({ ...g, [activeSection]: true }));
    setCurrent(0);
    recordStudy();
    if (!recordedSectionsRef.current.has(activeSection)) {
      recordedSectionsRef.current.add(activeSection);
      recordTestResult({
        takenAt: new Date().toISOString(),
        exam: 'sat',
        testId: `${test.id}:${activeSection}`,
        label: `${test.title} · ${sectionLabel(section)}`,
        correct: correctCount,
        total: questions.length,
        scaledScore: satScaledScore(correctCount, sectionScoreKey(section)),
      });
    }
  };

  const retryModule = () => {
    // Clear this module's answers and grading; keep other modules intact.
    const ids = new Set(questions.map((qq) => qq.id));
    setAnswers((a) => {
      const next: Record<number, number> = {};
      for (const k of Object.keys(a)) {
        const id = Number(k);
        if (!ids.has(id)) next[id] = a[id];
      }
      return next;
    });
    setGrids((gv) => {
      const next: Record<number, string> = {};
      for (const k of Object.keys(gv)) {
        const id = Number(k);
        if (!ids.has(id)) next[id] = gv[id];
      }
      return next;
    });
    setFlagged((f) => {
      const next: Record<number, boolean> = {};
      for (const k of Object.keys(f)) {
        const id = Number(k);
        if (!ids.has(id)) next[id] = f[id];
      }
      return next;
    });
    setGraded((g) => ({ ...g, [activeSection]: false }));
    recordedSectionsRef.current.delete(activeSection);
    setCurrent(0);
  };

  return (
    <div className="max-w-4xl">
      {/* Persistent Back button — always returns to the tests hub. */}
      <button
        onClick={onExit}
        className={gold || aurora ? "inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface mb-4" : "inline-flex items-center gap-2 text-paper-2 hover:text-paper mb-4"}
      >
        <ChevronLeft className="w-4 h-4" /> Back to tests
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div>
          <h2 className={gold || aurora ? "text-2xl font-bold text-on-surface" : "text-2xl font-bold text-paper"}>{test.title}</h2>
          <p className={gold || aurora ? "text-sm text-on-surface-variant" : "text-sm text-paper-2"}>{test.source}</p>
        </div>
        <ModuleTimer minutes={section.minutes} sectionKey={`${activeSection}`} />
      </div>

      {/* Module switcher across all sections. */}
      <div className="flex flex-wrap gap-2 mt-4 mb-5">
        {sections.map((s, i) => {
          const active = i === activeSection;
          const done = !!graded[i];
          return (
            <button
              key={i}
              type="button"
              onClick={() => switchSection(i)}
              className={gold || aurora
                ? `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    active
                      ? 'bg-secondary text-white border-secondary'
                      : 'border-on-background text-on-surface-variant hover:text-on-surface'
                  }`
                : `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    active
                      ? 'bg-paper text-ink border-paper'
                      : 'border-ink-line text-paper-2 hover:text-paper'
                  }`}
            >
              {sectionLabel(s)}
              {done && <CheckCircle2 className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Module meta + progress. */}
      <div className={gold || aurora ? "flex flex-wrap items-center justify-between gap-2 mb-4 text-sm text-on-surface-variant" : "flex flex-wrap items-center justify-between gap-2 mb-4 text-sm text-paper-2"}>
        <span>
          {section.module} · Module {section.moduleNumber} · {questions.length} questions · {section.minutes} min
        </span>
        <span>
          {isGraded ? 'Graded' : `${answeredCount} / ${questions.length} answered`}
        </span>
      </div>

      {/* Graded summary banner. */}
      {isGraded && (
        <div className="mb-5">
          <ModuleResult
            section={section}
            correct={correctCount}
            total={questions.length}
            onReview={() => setCurrent(0)}
            onRetry={retryModule}
          />
        </div>
      )}

      {/* Question palette. */}
      <div className={gold || aurora ? "rounded-2xl bg-surface-container p-4 mb-5" : "rounded-2xl bg-ink-raise p-4 mb-5"}>
        <p className={gold || aurora ? "text-xs font-bold text-on-surface-variant uppercase tracking-wide mb-3" : "text-xs font-bold text-paper-2 uppercase tracking-wide mb-3"}>
          Question navigator
        </p>
        <Palette
          questions={questions}
          current={current}
          answers={answers}
          grids={grids}
          flagged={flagged}
          graded={isGraded}
          onJump={setCurrent}
        />
      </div>

      {/* Active question. */}
      <QuestionCard
        q={q}
        index={current}
        total={questions.length}
        selectedChoice={answers[q.id]}
        gridValue={grids[q.id] ?? ''}
        graded={isGraded}
        onPickChoice={(i) => setAnswers((a) => ({ ...a, [q.id]: i }))}
        onGridChange={(v) => setGrids((gv) => ({ ...gv, [q.id]: v }))}
      />

      {/* Per-question controls. */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full border border-on-background px-4 py-2 text-sm font-medium disabled:opacity-40" : "inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-sm font-medium disabled:opacity-40"}
          >
            <ArrowLeft className="w-4 h-4" /> Prev
          </button>
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
            disabled={current === questions.length - 1}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full border border-on-background px-4 py-2 text-sm font-medium disabled:opacity-40" : "inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-sm font-medium disabled:opacity-40"}
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {!isGraded && (
          <button
            type="button"
            onClick={() =>
              setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))
            }
            className={gold || aurora
              ? `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
                  flagged[q.id]
                    ? 'border-secondary text-on-surface'
                    : 'border-on-background text-on-surface-variant'
                }`
              : `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
                  flagged[q.id]
                    ? 'border-paper text-paper'
                    : 'border-ink-line text-paper-2'
                }`}
          >
            <Flag className={`w-4 h-4 ${flagged[q.id] ? 'fill-paper' : ''}`} />
            {flagged[q.id] ? 'Flagged' : 'Flag'}
          </button>
        )}
      </div>

      {/* Submit / next-module controls. */}
      {!isGraded ? (
        <div className={gold || aurora ? "mt-6 rounded-2xl bg-surface-container-high p-5 flex flex-wrap items-center justify-between gap-3" : "mt-6 rounded-2xl bg-ink-2 p-5 flex flex-wrap items-center justify-between gap-3"}>
          <p className={gold || aurora ? "text-sm text-on-surface-variant" : "text-sm text-paper-2"}>
            {answeredCount === questions.length
              ? 'All questions answered. Submit to see your scaled section score.'
              : `${questions.length - answeredCount} unanswered — you can still submit.`}
          </p>
          <button
            type="button"
            onClick={submitModule}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-6 py-2.5 font-semibold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-2.5 font-semibold"}
          >
            <CheckCircle2 className="w-5 h-5" /> Submit module
          </button>
        </div>
      ) : (
        activeSection < sections.length - 1 && (
          <div className={gold || aurora ? "mt-6 rounded-2xl bg-surface-container-high p-5 flex flex-wrap items-center justify-between gap-3" : "mt-6 rounded-2xl bg-ink-2 p-5 flex flex-wrap items-center justify-between gap-3"}>
            <p className={gold || aurora ? "text-sm text-on-surface-variant" : "text-sm text-paper-2"}>
              Module complete. Continue to the next module.
            </p>
            <button
              type="button"
              onClick={() => switchSection(activeSection + 1)}
              className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-6 py-2.5 font-semibold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-2.5 font-semibold"}
            >
              Next module: {sectionLabel(sections[activeSection + 1])}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )
      )}
    </div>
  );
}
