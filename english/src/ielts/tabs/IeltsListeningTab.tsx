// =============================================================================
// IELTS — Listening practice tab.
// -----------------------------------------------------------------------------
// Reuses the shared LISTENING_LIBRARY. Plays transcripts aloud with the shared
// Azure neural TTS helper using the British voice 'en-GB-SoniaNeural' (the IELTS
// listening register), offers a reveal-transcript toggle, and grades MCQs.
// =============================================================================
import React, { useEffect, useMemo, useState } from 'react';
import {
  Headphones, Play, Pause, Eye, EyeOff, ListChecks, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2,
} from 'lucide-react';
import { LISTENING_LIBRARY } from '../../content';
import { playTts, pauseTts, resumeTts, stopTts, type TtsState } from '../../../../frontend/src/utils/tts';
import { ListeningItem, EnglishLevel } from '../../types';
import { McqBlock, LevelFilter, ScoreBanner, IELTS_LEVELS, isFreeLessonLocked, LockBadge } from './quizKit';
import { useEnglishStats } from '../../stats';
import { enActivityKey } from '../../englishLearning';
import { useTheme } from '../../../../frontend/src/lib/theme';

// British neural voice — the IELTS listening register.
const LISTEN_OPTS = { lang: 'en-GB', voice: 'en-GB-SoniaNeural', rate: 0.92 } as const;

export default function IeltsListeningTab({ allContent, onUpgrade, initialItemId }: { allContent: boolean; onUpgrade: () => void; initialItemId?: number }) {
  const { recordStudy, recordEnglishActivity, requireAccount, profile } = useEnglishStats();
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  // Persisted completion ledger — shows which sections were finished before.
  const completed = useMemo(
    () => new Set(profile?.completedActivityIdsEn ?? []),
    [profile?.completedActivityIdsEn],
  );
  // Failed-and-not-yet-repassed ledger — flags cards that need another attempt.
  const mistakes = useMemo(
    () => new Set(profile?.mistakeIdsEn ?? []),
    [profile?.mistakeIdsEn],
  );
  // Deep-link (dashboard mistake review): open that exact section immediately.
  const initialItem = initialItemId != null ? LISTENING_LIBRARY.find((p) => p.id === initialItemId) ?? null : null;
  // Free accounts start on the unlocked A1 level; paid users keep the academic default.
  const [level, setLevel] = useState<EnglishLevel | 'all'>(initialItem ? initialItem.level : allContent ? 'B2' : 'A1');
  const [active, setActive] = useState<ListeningItem | null>(initialItem);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  // Playback state — drives the play / pause / resume / replay control.
  const [ttsState, setTtsState] = useState<TtsState>('idle');

  // Never leave audio running when the tab unmounts (navigated away / closed).
  useEffect(() => () => stopTts(), []);

  const levelPool = useMemo(() => {
    const pool = LISTENING_LIBRARY.filter((p) => IELTS_LEVELS.includes(p.level));
    return level === 'all' ? pool : pool.filter((p) => p.level === level);
  }, [level]);
  const sections = useMemo(() => {
    // Failed cards surface first (need a redo); passed cards hide unless toggled on.
    return levelPool
      .filter((p) => showCompleted || !completed.has(enActivityKey('listen', p.id)) || mistakes.has(enActivityKey('listen', p.id)))
      .sort((a, b) => {
        const aFailed = mistakes.has(enActivityKey('listen', a.id)) ? 0 : 1;
        const bFailed = mistakes.has(enActivityKey('listen', b.id)) ? 0 : 1;
        return aFailed - bFailed;
      });
  }, [levelPool, showCompleted, completed, mistakes]);

  // After finishing a section: the next open (unlocked, not-yet-done) one so the
  // learner never has to walk back to the list between exercises.
  const nextItem = useMemo(
    () => sections.find((p) => p.id !== active?.id && !isFreeLessonLocked(allContent, p.level)) ?? null,
    [sections, active, allContent],
  );

  function open(item: ListeningItem) {
    stopTts();
    setActive(item);
    setAnswers({});
    setSubmitted(false);
    setShowTranscript(false);
    setTtsState('idle');
  }

  function playListen(text: string) {
    // Guests browse; TTS playback (a paid Azure call) needs an account.
    if (!requireAccount()) return;
    playTts(text, { ...LISTEN_OPTS, onState: setTtsState });
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  const correctCount = active
    ? active.questions.reduce((n, q) => n + (answers[q.id] === q.correctIndex ? 1 : 0), 0)
    : 0;
  const allAnswered = active ? active.questions.every((q) => answers[q.id] !== undefined) : false;

  if (active) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <button
          onClick={() => { stopTts(); setActive(null); }}
          className={gold || aurora ? "inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant hover:text-on-surface" : "inline-flex items-center gap-1.5 text-sm font-semibold text-paper-2 hover:text-paper"}
        >
          <ChevronLeft className="w-4 h-4" /> Бүх дасгал руу буцах
        </button>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={gold || aurora ? "rounded-full bg-surface-container-high text-on-surface px-2.5 py-0.5 text-xs font-bold" : "rounded-full bg-ink-2 text-paper px-2.5 py-0.5 text-xs font-bold"}>
              {active.level}
            </span>
            <span className={gold || aurora ? "text-xs text-on-surface-variant" : "text-xs text-paper-2"}>{active.topic}</span>
          </div>
          <h2 className={gold || aurora ? "text-2xl font-space font-light tracking-tight text-on-surface" : "text-2xl font-serif font-light tracking-tight text-paper"}>{active.title}</h2>
        </div>

        <div className={gold || aurora ? "rounded-2xl bg-surface-container p-5 space-y-4" : "rounded-2xl bg-ink-raise p-5 space-y-4"}>
          <p className={gold || aurora ? "text-on-surface-variant text-sm" : "text-paper-2 text-sm"}>
            Аудиог сонсоод асуултад хариулна уу. Эхлээд бичвэрийг харалгүй сонсож үзээрэй.
          </p>
          <div className="flex flex-wrap gap-3">
            {ttsState === 'playing' ? (
              <button
                onClick={pauseTts}
                className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-5 py-2.5 font-bold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2.5 font-bold"}
              >
                <Pause className="w-4 h-4" /> Түр зогсоох
              </button>
            ) : (
              <button
                onClick={() => (ttsState === 'paused' ? resumeTts() : playListen(active.transcript))}
                className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-5 py-2.5 font-bold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2.5 font-bold"}
              >
                <Play className="w-4 h-4" /> {ttsState === 'paused' ? 'Үргэлжлүүлэх' : 'Аудио тоглуулах'}
              </button>
            )}
            <button
              onClick={() => playListen(active.transcript)}
              className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-surface-container-high text-on-surface px-5 py-2.5 font-semibold hover:bg-surface-container-high" : "inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"}
            >
              <RotateCcw className="w-4 h-4" /> Эхнээс
            </button>
            <button
              onClick={() => setShowTranscript((s) => !s)}
              className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-surface-container-high text-on-surface px-5 py-2.5 font-semibold hover:bg-surface-container-high" : "inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"}
            >
              {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showTranscript ? 'Бичвэр нуух' : 'Бичвэр харах'}
            </button>
          </div>
          {showTranscript && (
            <article className={gold || aurora ? "rounded-xl bg-surface-container-high p-4 leading-relaxed whitespace-pre-line text-on-surface" : "rounded-xl bg-ink-2 p-4 leading-relaxed whitespace-pre-line text-paper"}>
              {active.transcript}
            </article>
          )}
        </div>

        <div className="space-y-4">
          <h3 className={gold || aurora ? "flex items-center gap-2 text-lg font-bold text-on-surface" : "flex items-center gap-2 text-lg font-bold text-paper"}>
            <ListChecks className={gold || aurora ? "w-5 h-5 text-on-surface" : "w-5 h-5 text-paper"} /> Асуултууд
          </h3>
          {active.questions.map((q, i) => (
            <McqBlock
              key={q.id}
              q={q}
              index={i}
              selected={answers[q.id]}
              submitted={submitted}
              onPick={(choice) => setAnswers((prev) => ({ ...prev, [q.id]: choice }))}
            />
          ))}
        </div>

        {submitted ? (
          <div className="space-y-3">
            <ScoreBanner correct={correctCount} total={active.questions.length} />
            <div className="flex flex-wrap items-center gap-3">
              {nextItem && (
                <button
                  onClick={() => open(nextItem)}
                  className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-6 py-2.5 font-bold hover:bg-secondary/90" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-2.5 font-bold hover:bg-paper-bright"}
                >
                  Дараагийн дасгал <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={reset}
                className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-surface-container-high text-on-surface px-5 py-2.5 font-semibold hover:bg-surface-container-high" : "inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"}
              >
                <RotateCcw className="w-4 h-4" /> Дахин оролдох
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              if (!requireAccount()) return; // guests browse; answering needs an account
              setSubmitted(true);
              recordStudy();
              if (active) {
                const pass = active.questions.length > 0 && correctCount / active.questions.length >= 0.6;
                recordEnglishActivity(enActivityKey('listen', active.id), pass);
              }
            }}
            disabled={!allAnswered}
            className={gold || aurora ? "rounded-full bg-secondary text-white px-6 py-3 font-bold disabled:opacity-40" : "rounded-full bg-paper text-ink px-6 py-3 font-bold disabled:opacity-40"}
          >
            Хариуг шалгах
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className={gold || aurora ? "text-2xl font-space font-light tracking-tight text-on-surface flex items-center gap-2" : "text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2"}>
          <Headphones className={gold || aurora ? "w-6 h-6 text-on-surface" : "w-6 h-6 text-paper"} /> Listening practice
        </h2>
        <p className={gold || aurora ? "text-on-surface-variant mt-1" : "text-paper-2 mt-1"}>
          Британи хүний хоолойгоор уншсан аудиог сонсоод асуултад хариулаарай.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <LevelFilter levels={IELTS_LEVELS} active={level} onChange={setLevel} />
        <button
          onClick={() => setShowCompleted((s) => !s)}
          className={gold || aurora ? `rounded-full px-3 py-1 text-xs font-bold transition-colors ${
            showCompleted ? 'bg-secondary text-white' : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }` : `rounded-full px-3 py-1 text-xs font-bold transition-colors ${
            showCompleted ? 'bg-paper text-ink' : 'bg-ink-2 text-paper-2 hover:text-paper'
          }`}
        >
          Хийсэн харуулах
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map((p) => {
          const key = enActivityKey('listen', p.id);
          const locked = isFreeLessonLocked(allContent, p.level);
          const done = completed.has(key);
          const failed = mistakes.has(key);
          return (
            <button
              key={p.id}
              onClick={() => (locked ? onUpgrade() : open(p))}
              className={gold || aurora ? `text-left rounded-2xl bg-surface-container hover:bg-surface-container-high p-5 transition-colors ${locked ? 'opacity-80' : ''}` : `text-left rounded-2xl bg-ink-raise hover:bg-ink-2 p-5 transition-colors ${locked ? 'opacity-80' : ''}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={gold || aurora ? "rounded-full bg-surface-container-high text-on-surface px-2.5 py-0.5 text-xs font-bold" : "rounded-full bg-ink-2 text-paper px-2.5 py-0.5 text-xs font-bold"}>
                  {p.level}
                </span>
                <span className={gold || aurora ? "text-xs text-on-surface-variant" : "text-xs text-paper-2"}>{p.topic}</span>
                {failed && !locked && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-900/40 text-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    Буруу — дахин хийх
                  </span>
                )}
                {done && !failed && !locked && (
                  <span className={gold || aurora ? "inline-flex items-center gap-1 rounded-full bg-surface-container-high text-on-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" : "inline-flex items-center gap-1 rounded-full bg-ink-2 text-paper px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"}>
                    <CheckCircle2 className="w-3 h-3" /> Хийсэн
                  </span>
                )}
                {locked && <span className="ml-auto"><LockBadge /></span>}
              </div>
              <h3 className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>{p.title}</h3>
              <p className={gold || aurora ? "text-sm text-on-surface-variant mt-1" : "text-sm text-paper-2 mt-1"}>{locked ? 'Pro-оор нээх' : `${p.questions.length} асуулт`}</p>
            </button>
          );
        })}
      </div>

      {sections.length === 0 && levelPool.length === 0 && (
        <p className={gold || aurora ? "text-on-surface-variant" : "text-paper-2"}>Энэ түвшинд дасгал алга байна.</p>
      )}
      {sections.length === 0 && levelPool.length > 0 && (
        <p className={gold || aurora ? "text-on-surface-variant" : "text-paper-2"}>Бүгдийг зөв хийсэн — Хийсэн харуулах дээр дарж дахин үзнэ үү.</p>
      )}
    </div>
  );
}
