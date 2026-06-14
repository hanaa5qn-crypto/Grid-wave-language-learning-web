import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Check, Clock, Copy, Loader2, Share2, Swords, Trophy, X, Snowflake,
} from 'lucide-react';
import { buildDuelQuestions, DUEL_QUESTION_COUNT, DuelQuestion } from './duel';
import { ExamLevel } from './exams';
import { DuelView, duelLink, shareLink, submitDuelScore } from './social';

interface DuelScreenProps {
  duel: DuelView;          // тоглох тулаан (минийх эсвэл урилгаар нээсэн)
  onExit: (changed: boolean) => void; // true = оноо илгээгдсэн (жагсаалт шинэчлэх)
}

type Stage = 'play' | 'submitting' | 'done' | 'error';

function timeLabel(ms: number | null | undefined): string {
  if (!ms && ms !== 0) return '—';
  const totalSec = Math.round(ms / 1000);
  return `${String(Math.floor(totalSec / 60)).padStart(2, '0')}:${String(totalSec % 60).padStart(2, '0')}`;
}

// Тулаан тоглох бүтэн дэлгэцийн overlay: 10 асуулт → оноо илгээх → үр дүн
// (хүлээж байна / яллаа / ялагдлаа / тэнцлээ).
export default function DuelScreen({ duel, onExit }: DuelScreenProps) {
  const questions = useMemo(
    () => buildDuelQuestions(duel.seed, duel.level as ExamLevel),
    [duel.seed, duel.level],
  );

  const alreadySubmitted = Boolean(
    (duel.challenger?.isMe && duel.challenger.submitted) ||
    (duel.opponent?.isMe && duel.opponent.submitted),
  );

  const [stage, setStage] = useState<Stage>(alreadySubmitted ? 'done' : 'play');
  const [result, setResult] = useState<DuelView>(duel);
  const [submitted, setSubmitted] = useState(alreadySubmitted);
  const [errorText, setErrorText] = useState('');

  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quitConfirmOpen, setQuitConfirmOpen] = useState(false);

  // Хугацааны хэмжилт — оноо тэнцвэл бага хугацаатай нь ялна.
  const [startedAt] = useState(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  useEffect(() => {
    if (stage !== 'play') return;
    const timer = setInterval(() => setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [stage, startedAt]);
  const elapsedLabel = `${String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:${String(elapsedSeconds % 60).padStart(2, '0')}`;

  const [copied, setCopied] = useState(false);
  const share = async () => {
    const challengerName = result.challenger?.isMe ? 'Би' : result.challenger?.name ?? '';
    const toClipboard = await shareLink(
      `${challengerName} таныг герман хэлний тулаанд урьж байна — хэн нь илүү вэ?`,
      duelLink(duel.code),
    );
    if (toClipboard) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const submit = async (finalScore: number) => {
    setStage('submitting');
    try {
      const updated = await submitDuelScore(duel.code, {
        score: finalScore,
        total: questions.length,
        timeMs: Date.now() - startedAt,
      });
      setResult(updated);
      setSubmitted(true);
      setStage('done');
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Оноог илгээж чадсангүй.');
      setStage('error');
    }
  };

  const answer = () => {
    if (selected === null) return;
    const correct = selected === questions[qIdx].correctIndex;
    const nextCorrect = correctCount + (correct ? 1 : 0);
    setCorrectCount(nextCorrect);
    setSelected(null);
    if (qIdx + 1 >= questions.length) {
      void submit(nextCorrect);
    } else {
      setQIdx(qIdx + 1);
    }
  };

  const question: DuelQuestion | undefined = questions[qIdx];

  const shell = (content: React.ReactNode, footer?: React.ReactNode) => (
    <div className="fixed inset-0 bg-[#020205] z-[100] flex flex-col items-center justify-between pb-10 pt-6 px-4 md:px-12 animate-fade-in text-white overflow-y-auto">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="w-full max-w-[640px] flex flex-col gap-4 py-2 relative z-10">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-black font-space tracking-tight flex items-center gap-2">
            <Swords className="w-6 h-6 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Тулаан</span>
            <span className="text-sm font-bold text-slate-500 mt-1">{duel.level}</span>
          </h1>
          {stage === 'play' && (
            <span className="flex items-center gap-3 text-sm font-space text-slate-400 font-bold">
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {elapsedLabel}</span>
              {qIdx + 1} / {questions.length}
              <button
                onClick={() => setQuitConfirmOpen(true)}
                aria-label="Тулаанаас гарах"
                className="p-1.5 border border-white/10 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
        <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${stage === 'play' ? Math.round((qIdx / questions.length) * 100) : 100}%` }}
          />
        </div>
      </header>

      <main className="flex-grow w-full max-w-[640px] flex flex-col justify-center py-8 relative z-10">
        <div className="animate-scale-up space-y-6">{content}</div>
      </main>

      {footer && <footer className="w-full max-w-[640px] flex gap-4 mt-4 relative z-10">{footer}</footer>}

      {quitConfirmOpen && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-[#0d0d16] border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-4 animate-scale-up">
            <h3 className="text-xl font-black font-space">Тулаанаас гарах уу?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Тулааны оноо хадгалагдахгүй — дараа линкээр дахин орж эхнээс нь тоглож болно.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setQuitConfirmOpen(false)}
                className="flex-[2] bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl py-3 px-4 hover:opacity-95 transition-all cursor-pointer"
              >
                Үргэлжлүүлэх
              </button>
              <button
                onClick={() => onExit(false)}
                className="flex-1 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-bold transition-all text-slate-300 cursor-pointer"
              >
                Гарах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // --- Тоглолт -----------------------------------------------------------------
  if (stage === 'play' && question) {
    return shell(
      <div className="space-y-5" data-duel-question-index={qIdx}>
        {result.challenger && !result.challenger.isMe && (
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
            <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1">
              <Swords className="w-3.5 h-3.5" /> {result.challenger.name} таныг өрсөлдөхөд урьсан
            </span>
          </div>
        )}
        <p className="text-sm text-slate-400">{question.instruction}</p>

        {question.passage && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-[15px] leading-relaxed text-slate-100">
            {question.passage}
          </div>
        )}

        <h2 className="text-lg md:text-xl font-black font-space">{question.question}</h2>

        <div className="grid grid-cols-1 gap-3">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`text-left p-4 rounded-xl transition-all cursor-pointer text-[15px] ${
                selected === i
                  ? 'bg-purple-950/40 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10'
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>,
      <button
        onClick={answer}
        disabled={selected === null}
        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl py-3.5 px-6 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        Дараах <ArrowRight className="w-5 h-5" />
      </button>,
    );
  }

  // --- Илгээж байна ---------------------------------------------------------------
  if (stage === 'submitting') {
    return shell(
      <div className="flex flex-col items-center gap-4 text-slate-300">
        <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
        <p className="font-bold">Оноог илгээж байна…</p>
      </div>,
    );
  }

  // --- Алдаа -----------------------------------------------------------------------
  if (stage === 'error') {
    return shell(
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-black font-space">Алдаа гарлаа</h2>
        <p className="text-sm text-red-400 font-bold">{errorText}</p>
      </div>,
      <>
        <button
          onClick={() => onExit(false)}
          className="flex-1 py-3.5 border border-white/10 hover:bg-white/5 rounded-xl font-bold transition-all text-slate-300 cursor-pointer"
        >
          Гарах
        </button>
        <button
          onClick={() => void submit(correctCount)}
          className="flex-[2] bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl py-3.5 px-6 hover:opacity-95 transition-all cursor-pointer"
        >
          Дахин илгээх
        </button>
      </>,
    );
  }

  // --- Үр дүн -----------------------------------------------------------------------
  const me = result.challenger?.isMe ? result.challenger : result.opponent;
  const them = result.challenger?.isMe ? result.opponent : result.challenger;
  const finished = result.status === 'finished';
  const iWon = Boolean(result.iWon);
  const draw = Boolean(result.draw);

  const slotCard = (slot: typeof me, label: string) => (
    <div className={`flex-1 bg-white/5 border rounded-2xl p-4 flex flex-col items-center gap-2 ${
      finished && slot && ((iWon && slot.isMe) || (!iWon && !draw && slot && !slot.isMe))
        ? 'border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
        : 'border-white/10'
    }`}>
      {slot?.avatar ? (
        <img src={slot.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-black">?</div>
      )}
      <span className="text-sm font-bold text-slate-200">{slot ? (slot.isMe ? 'Та' : slot.name) : label}</span>
      <span className="text-2xl font-black font-space">
        {slot?.submitted ? `${slot.score}/${slot.total}` : '—'}
      </span>
      <span className="text-xs text-slate-500 font-mono inline-flex items-center gap-1">
        <Clock className="w-3 h-3" /> {slot?.submitted ? timeLabel(slot.timeMs) : 'хүлээгдэж байна'}
      </span>
    </div>
  );

  return shell(
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        {finished ? (
          <>
            <div className={`inline-flex p-4 rounded-2xl mb-2 border ${
              iWon ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                : draw ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}>
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-space">
              {iWon ? 'Та яллаа! 🏆' : draw ? 'Тэнцлээ! 🤝' : 'Ялагдлаа 😅'}
            </h2>
            {iWon && (
              <p className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5">
                <Snowflake className="w-4 h-4" /> +1 Streak Freeze шагнал авлаа
              </p>
            )}
            {!iWon && !draw && (
              <p className="text-slate-400 text-sm">Дараагийн тулаанд дахин оролдоорой — ялагч streak freeze авна.</p>
            )}
          </>
        ) : (
          <>
            <div className="inline-flex p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400 mb-2">
              <Swords className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-space">Таны оноо бүртгэгдлээ</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              {them?.name
                ? <>Өрсөлдөгч <b className="text-purple-300">{them.name}</b> тоглоход үр дүн гарна — тулаан түүний тулаануудын жагсаалтад нэмэгдсэн.</>
                : <>Найз тань тоглож дуустал үр дүн "хүлээгдэж байна" төлөвт байна. Линкийг хуваалцаад өрсөлдөгчөө урьж дуэлээ дуусгаарай!</>}
            </p>
          </>
        )}
      </div>

      <div className="flex gap-3">
        {slotCard(me, 'Та')}
        <div className="self-center text-lg font-black text-slate-500 font-space">VS</div>
        {slotCard(them, 'Өрсөлдөгч')}
      </div>

      {!finished && submitted && (
        <button
          onClick={share}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl py-3.5 px-6 hover:opacity-95 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {copied ? <><Check className="w-5 h-5" /> Линк хуулагдлаа</> : <><Share2 className="w-5 h-5" /> Урилгын линк хуваалцах</>}
        </button>
      )}
      {!finished && submitted && (
        <p className="text-xs text-slate-500 text-center font-mono flex items-center justify-center gap-2">
          {duelLink(duel.code)}
          <button onClick={share} aria-label="Линк хуулах" className="p-1 hover:text-white cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
        </p>
      )}
    </div>,
    <button
      onClick={() => onExit(submitted)}
      className="flex-1 py-3.5 border border-white/10 hover:bg-white/5 rounded-xl font-bold transition-all text-slate-300 cursor-pointer"
    >
      Хаах
    </button>,
  );
}
