// =============================================================================
// English track — adaptive CEFR placement test.
// -----------------------------------------------------------------------------
// Shown to new English learners on first entry (and re-takeable from the
// dashboard). An adaptive staircase over the study library's graded reading +
// listening questions estimates the learner's level (A1–C2). It opens hard (at
// B1) and moves a full level on every answer, so it homes in on the true level
// fast. The result is free — it sets the English target level and, on the
// result screen, auto-suggests level-compatible lessons (locked behind Pro for
// free accounts, with a free A1 fallback offered). Mirrors the German
// PlacementTest UX (intro → quiz → result) without the paid reveal.
//
// Listening prompts use the shared NEURAL TTS client (../../frontend/src/utils/
// tts) — human-sounding voices with real pause/resume — instead of the robotic
// built-in speechSynthesis, and audio is always stopped the moment an answer is
// submitted (or the test is left) so a clip never keeps playing underneath.
// =============================================================================
import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen, Headphones, Play, Pause, RotateCcw, ArrowRight, Sparkles,
  TrendingUp, X, Clock, Lock, Crown, Edit3, Mic,
} from 'lucide-react';
import {
  EN_PLACEMENT_TOTAL, EN_PLACEMENT_SEQUENCE, EN_PLACEMENT_START_INDEX,
  pickEnglishPlacementQuestion, advanceEnglishDifficulty, scoreEnglishPlacement,
  buildEnglishToday,
  type EnPlacementQuestion, type EnPlacementAnswer, type EnglishPlacementResult,
} from './englishLearning';
import {
  playTts, pauseTts, resumeTts, stopTts, type TtsState,
} from '../../frontend/src/utils/tts';

// Lesson destinations the result screen can hand back to the dashboard (a
// subset of DashboardTab's DashDest — kept local to avoid a circular import).
export type LessonDest = 'read' | 'listen' | 'write' | 'speak' | 'vocab';

// British neural voice — the most natural fit for IELTS-style listening.
const LISTEN_OPTS = { lang: 'en-GB', voice: 'en-GB-SoniaNeural', rate: 0.95 } as const;

const SKILL_META = {
  read: { label: 'Reading · Унших', icon: <BookOpen className="w-4 h-4" /> },
  listen: { label: 'Listening · Сонсох', icon: <Headphones className="w-4 h-4" /> },
} as const;

const LESSON_META: Record<LessonDest, { label: string; icon: React.ReactNode }> = {
  read: { label: 'Reading', icon: <BookOpen className="w-4 h-4" /> },
  listen: { label: 'Listening', icon: <Headphones className="w-4 h-4" /> },
  write: { label: 'Writing', icon: <Edit3 className="w-4 h-4" /> },
  speak: { label: 'Speaking', icon: <Mic className="w-4 h-4" /> },
  vocab: { label: 'Vocabulary', icon: <Sparkles className="w-4 h-4" /> },
};

export default function EnglishPlacementTest({
  onFinish, onSkip, hasAllContent = false, onStartLesson, onUpgrade,
}: {
  onFinish: (result: EnglishPlacementResult) => void;
  onSkip: () => void;
  /** Pro / Max / founder → suggested lessons are unlocked; free → gated. */
  hasAllContent?: boolean;
  /** Jump straight into a suggested lesson (also saves the result + closes). */
  onStartLesson?: (result: EnglishPlacementResult, dest: LessonDest) => void;
  /** Open the upgrade / plans view (free accounts unlocking the full path). */
  onUpgrade?: () => void;
}) {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [question, setQuestion] = useState<EnPlacementQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [result, setResult] = useState<EnglishPlacementResult | null>(null);

  // Adaptive staircase state (0 = A1 … 5 = C2). Starts hard (B1) and climbs or
  // drops a full level per answer via advanceEnglishDifficulty.
  const levelIndexRef = useRef(EN_PLACEMENT_START_INDEX);
  const usedIdsRef = useRef<Set<string>>(new Set());
  const answersRef = useRef<EnPlacementAnswer[]>([]);

  // Listening playback state — drives the play/pause/replay control.
  const [ttsState, setTtsState] = useState<TtsState>('idle');
  function playListen(text: string) {
    playTts(text, { ...LISTEN_OPTS, onState: setTtsState });
  }

  // Never leave audio running when the test unmounts (navigated away / closed).
  useEffect(() => () => stopTts(), []);

  // Stop audio, then run the parent skip handler.
  function skip() {
    stopTts();
    onSkip();
  }

  // Elapsed timer (mm:ss).
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (phase !== 'quiz' || startedAt === null) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(t);
  }, [phase, startedAt]);
  const elapsedLabel = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;

  function nextQuestion(count: number) {
    const skill = EN_PLACEMENT_SEQUENCE[count % EN_PLACEMENT_SEQUENCE.length];
    const q = pickEnglishPlacementQuestion(skill, levelIndexRef.current, usedIdsRef.current)
      // If a skill is exhausted at every level, try the other skill before stopping.
      ?? pickEnglishPlacementQuestion(skill === 'read' ? 'listen' : 'read', levelIndexRef.current, usedIdsRef.current);
    if (!q) return null;
    usedIdsRef.current.add(q.id);
    return q;
  }

  function startQuiz() {
    levelIndexRef.current = EN_PLACEMENT_START_INDEX;
    usedIdsRef.current = new Set();
    answersRef.current = [];
    setAnsweredCount(0);
    setSelected(null);
    const q = nextQuestion(0);
    setQuestion(q);
    setStartedAt(Date.now());
    setElapsed(0);
    setPhase('quiz');
    if (q?.skill === 'listen' && q.transcript) playListen(q.transcript);
  }

  function submitAnswer() {
    if (question === null || selected === null) return;
    // Stop the listening clip the instant the answer is submitted — it must not
    // keep playing into the next question or the result screen.
    stopTts();
    const correct = selected === question.correctIndex;
    answersRef.current.push({
      questionId: question.id, skill: question.skill, level: question.level, correct,
    });
    levelIndexRef.current = advanceEnglishDifficulty(levelIndexRef.current, correct);

    const count = answeredCount + 1;
    setAnsweredCount(count);
    setSelected(null);

    const q = count >= EN_PLACEMENT_TOTAL ? null : nextQuestion(count);
    if (!q) {
      const scored = scoreEnglishPlacement(answersRef.current);
      setResult(scored);
      setPhase('result');
      return;
    }
    setQuestion(q);
    if (q.skill === 'listen' && q.transcript) playListen(q.transcript);
  }

  // ---- Intro --------------------------------------------------------------
  if (phase === 'intro') {
    return (
      <Shell onSkip={skip}>
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink-2 border border-ink-line px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-paper-2">
            <Sparkles className="w-4 h-4" /> Түвшин тогтоох тест
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-paper mt-5">
            Find your English level
          </h1>
          <p className="text-paper-2 mt-3 leading-relaxed">
            Унших, сонсох {EN_PLACEMENT_TOTAL} асуултаар таны түвшинг A1-ээс C2 хүртэл тодорхойлно.
            Тест дунд түвшнээс хүндээр эхэлж, зөв хариулах тутам нэг шатаар хүндэрч, алдвал
            хөнгөрнө — ингэснээр таны бодит түвшинг хурдан бөгөөд нарийн олно. Үр дүн нь
            үнэгүй — таны хичээлийн замыг тохируулна.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              onClick={startQuiz}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-7 py-3 font-medium uppercase tracking-[0.15em] text-sm hover:bg-paper-bright"
            >
              Тест эхлүүлэх <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={skip}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-line text-paper-2 hover:text-paper hover:border-paper/60 px-7 py-3 font-medium uppercase tracking-[0.15em] text-sm"
            >
              Дараа нь · түвшингээ өөрөө сонгох
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  // ---- Result -------------------------------------------------------------
  if (phase === 'result' && result) {
    const pct = result.totalQuestions > 0
      ? Math.round((result.totalCorrect / result.totalQuestions) * 100) : 0;

    // Auto-suggested, level-compatible lessons (one per skill at the result
    // level). Free accounts above A1 see them locked behind Pro, with a free
    // A1 fallback offered below.
    const compatible = buildEnglishToday(result.level, []);
    const lessonItems = ([
      compatible.reading && { dest: 'read' as const, title: compatible.reading.title },
      compatible.listening && { dest: 'listen' as const, title: compatible.listening.title },
      compatible.writing && { dest: 'write' as const, title: compatible.writing.title },
      compatible.speaking && { dest: 'speak' as const, title: compatible.speaking.title },
    ].filter(Boolean) as { dest: LessonDest; title: string }[]);
    const lessonsLocked = !hasAllContent && result.level !== 'A1';
    const goLesson = (dest: LessonDest) =>
      onStartLesson ? onStartLesson(result, dest) : onFinish(result);

    return (
      <Shell>
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink-2 border border-ink-line px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-paper-2">
            <TrendingUp className="w-4 h-4" /> Таны түвшин
          </span>
          <div className="text-7xl font-serif font-light text-paper mt-6">{result.level}</div>
          <p className="text-paper-2 mt-3">
            {result.totalCorrect}/{result.totalQuestions} зөв ({pct}%). Энэ түвшнээр таны өдөр
            тутмын даалгавар, хичээлийн зам, зөвлөмжийг тохирууллаа.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-6 text-left">
            {(['read', 'listen'] as const).map((s) => {
              const sc = result.skillScores[s] ?? { correct: 0, total: 0 };
              const p = sc.total > 0 ? Math.round((sc.correct / sc.total) * 100) : 0;
              return (
                <div key={s} className="rounded-2xl bg-ink-raise border border-ink-line p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-paper-3 font-medium">
                    {SKILL_META[s].icon} {SKILL_META[s].label}
                  </p>
                  <p className="text-xl font-serif font-light text-paper mt-1">{sc.correct}/{sc.total}</p>
                  <div className="w-full h-1.5 bg-ink-2 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-paper rounded-full" style={{ width: `${p}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Auto-suggested, level-compatible lessons */}
          {lessonItems.length > 0 && (
            <div className="mt-8 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-paper-2" />
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-paper-2">
                  {result.level} түвшинд тохирох хичээлүүд
                </h3>
                {lessonsLocked && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-paper border border-paper/40 rounded-full px-2 py-0.5">
                    <Lock className="w-3 h-3" /> Pro
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lessonItems.map((l) => (
                  <button
                    key={l.dest}
                    disabled={lessonsLocked}
                    onClick={() => goLesson(l.dest)}
                    className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border transition-colors ${
                      lessonsLocked
                        ? 'bg-ink border-ink-line opacity-60 cursor-not-allowed'
                        : 'bg-ink-raise border-ink-line hover:border-paper/50'
                    }`}
                  >
                    <span className="p-2 rounded-lg bg-ink-2 border border-ink-line text-paper-2 shrink-0">
                      {LESSON_META[l.dest].icon}
                    </span>
                    <span className="overflow-hidden">
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-paper-3">{LESSON_META[l.dest].label}</span>
                      <span className="block text-sm font-medium text-paper truncate">{l.title}</span>
                    </span>
                    {lessonsLocked
                      ? <Lock className="w-4 h-4 text-paper-3 ml-auto shrink-0" />
                      : <ArrowRight className="w-4 h-4 text-paper-3 ml-auto shrink-0" />}
                  </button>
                ))}
              </div>

              {lessonsLocked && (
                <div className="mt-4 rounded-2xl border border-ink-line bg-ink-raise p-4 text-center space-y-3">
                  <p className="text-sm text-paper-2 leading-relaxed">
                    Таны {result.level} түвшний бүрэн хичээлийн төлөвлөгөө{' '}
                    <span className="text-paper font-medium">Pro</span>-д нээлттэй. Үнэгүй эрхээр
                    A1 түвшний хичээл болон үгийн сангаар эхэлж болно.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                    <button
                      onClick={() => (onUpgrade ? onUpgrade() : onFinish(result))}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-6 py-2.5 text-sm font-bold hover:bg-paper-bright"
                    >
                      <Crown className="w-4 h-4" /> Pro-оор бүгдийг нээх
                    </button>
                    <button
                      onClick={() => goLesson('read')}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-line text-paper-2 hover:text-paper hover:border-paper/60 px-6 py-2.5 text-sm font-medium"
                    >
                      Үнэгүй хувилбараар эхлэх
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => onFinish(result)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-8 py-3 font-medium uppercase tracking-[0.15em] text-sm hover:bg-paper-bright mt-8"
          >
            Сургалт руу орох <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Shell>
    );
  }

  // ---- Quiz ---------------------------------------------------------------
  if (phase === 'quiz' && question) {
    const progress = Math.round((answeredCount / EN_PLACEMENT_TOTAL) * 100);
    return (
      <Shell onSkip={skip}>
        <div className="max-w-2xl mx-auto">
          {/* Progress + timer */}
          <div className="flex items-center justify-between text-xs text-paper-2 mb-3">
            <span className="flex items-center gap-1.5 uppercase tracking-[0.15em] font-medium">
              {SKILL_META[question.skill].icon} {SKILL_META[question.skill].label}
            </span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {elapsedLabel}</span>
              <span>{answeredCount + 1} / {EN_PLACEMENT_TOTAL}</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-ink-2 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-paper rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>

          {/* Reading passage, or the listening player for listening */}
          {question.skill === 'read' && question.passage && (
            <div className="rounded-2xl bg-ink-raise border border-ink-line p-5 mb-5 max-h-64 overflow-y-auto">
              <p className="text-paper-2 text-sm leading-relaxed whitespace-pre-line">{question.passage}</p>
            </div>
          )}
          {question.skill === 'listen' && question.transcript && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {ttsState === 'playing' ? (
                <button
                  onClick={pauseTts}
                  className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2.5 text-sm font-medium hover:bg-paper-bright"
                >
                  <Pause className="w-4 h-4" /> Түр зогсоох
                </button>
              ) : (
                <button
                  onClick={() => (ttsState === 'paused' ? resumeTts() : playListen(question.transcript!))}
                  className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2.5 text-sm font-medium hover:bg-paper-bright"
                >
                  <Play className="w-4 h-4" /> {ttsState === 'paused' ? 'Үргэлжлүүлэх' : 'Сонсох'}
                </button>
              )}
              <button
                onClick={() => playListen(question.transcript!)}
                className="inline-flex items-center gap-2 rounded-full bg-ink-2 border border-ink-line text-paper px-5 py-2.5 text-sm font-medium hover:bg-ink-raise"
              >
                <RotateCcw className="w-4 h-4" /> Эхнээс
              </button>
            </div>
          )}

          <h2 className="text-lg font-medium text-paper mb-4">{question.question}</h2>
          <div className="space-y-2.5">
            {question.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                  selected === i
                    ? 'bg-paper text-ink border-paper font-medium'
                    : 'bg-ink-raise border-ink-line text-paper hover:border-paper/50'
                }`}
              >
                {choice}
              </button>
            ))}
          </div>

          <button
            onClick={submitAnswer}
            disabled={selected === null}
            className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-7 py-3 font-medium uppercase tracking-[0.15em] text-sm hover:bg-paper-bright disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {answeredCount + 1 >= EN_PLACEMENT_TOTAL ? 'Дуусгах' : 'Дараагийнх'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Shell>
    );
  }

  return null;
}

// Full-screen monochrome shell consistent with the rest of the English track.
function Shell({ children, onSkip }: { children: React.ReactNode; onSkip?: () => void }) {
  return (
    <div className="fixed inset-0 z-[150] bg-ink text-paper font-sans overflow-y-auto">
      <div className="min-h-full flex flex-col">
        {onSkip && (
          <div className="flex justify-end p-4">
            <button
              onClick={onSkip}
              className="inline-flex items-center gap-1.5 text-xs text-paper-3 hover:text-paper uppercase tracking-[0.15em]"
            >
              Алгасах <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex-1 flex items-center justify-center px-4 py-10">{children}</div>
      </div>
    </div>
  );
}
