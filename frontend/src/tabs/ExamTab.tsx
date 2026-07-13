import React, { useState } from 'react';
import {
  Volume2, BookOpen, Headphones, Mic, Edit3, Languages, Lightbulb,
  ArrowRight, ArrowLeft, GraduationCap, Lock, Sparkles,
} from 'lucide-react';
import { TabType, SpeakTarget } from '../types';
import {
  ReadingItem, ListeningItem, WritingItem, SpeakingItem, shuffleQuiz,
} from '../library';
import { EXAMS, EXAM_LEVEL_ORDER, ExamLevel } from '../exams';
import { UserProfile } from '../profiles';
import { isExamQuestionLocked, FREE_QUESTIONS_PER_SECTION } from '../plans';
import MCQBlock from '../components/MCQBlock';
import { stopTts } from '../utils/tts';
import { activityKey } from '../utils/profileMetrics';
import { useTheme } from '../lib/theme';

// Union of all exam item types — they all share `topic`, `title`, `titleMn`.
type ExamItem = ReadingItem | ListeningItem | WritingItem | SpeakingItem;

interface ExamTabProps {
  currentUser: UserProfile | null;
  fullContent: boolean;
  audioSpeed: '0.8' | '1.0';
  requireAccount: () => boolean;
  setActiveTab: (tab: TabType) => void;
  setTestdafOpen: (open: boolean) => void;
  setPlacementOpen: (open: boolean) => void;
  recordStudyActivity: (activityId: string) => void;
  speakGerman: (text: string, speedMultiplier?: number) => void;
  renderPlanLockCard: (title: string, description: string, requiredPlan: 'pro' | 'max') => React.ReactNode;
  renderWritingChecker: (
    text: string,
    ctx: { id: number; prompt: string; points: string[]; modelAnswer: string; level: string },
  ) => React.ReactNode;
  renderSpeakingJudge: (target: SpeakTarget) => React.ReactNode;
  renderSpeakingReport: (target: SpeakTarget) => React.ReactNode;
  resetSpeakingJudge: () => void;
  resetWritingFeedback: () => void;
}

export function ExamTab({
  currentUser,
  fullContent,
  audioSpeed,
  requireAccount,
  setActiveTab,
  setTestdafOpen,
  setPlacementOpen,
  recordStudyActivity,
  speakGerman,
  renderPlanLockCard,
  renderWritingChecker,
  renderSpeakingJudge,
  renderSpeakingReport,
  resetSpeakingJudge,
  resetWritingFeedback,
}: ExamTabProps) {
  const themeName = useTheme();
  const gold = themeName === 'gold';
  const aurora = themeName === 'aurora';

  // CEFR level-based exams (A1–C2) — test tab
  const [examLevelSel, setExamLevelSel] = useState<ExamLevel | null>(null);
  const [examSec, setExamSec] = useState<'reading' | 'listening' | 'writing' | 'speaking'>('reading');
  const [examItemIdx, setExamItemIdx] = useState(0);
  const [examItemAns, setExamItemAns] = useState<number | null>(null);
  const [examItemReveal, setExamItemReveal] = useState(false);
  const [examItemWrite, setExamItemWrite] = useState('');
  const [examItemTrans, setExamItemTrans] = useState(false);

  // Reset the per-test sub-state when switching section or test. Also clears the
  // shared speaking judge so a report never carries over to a different prompt.
  // stopTts() so a listening clip never keeps playing after the learner moves
  // on — they're often done answering before the audio finishes.
  const selectExamSection = (sec: 'reading' | 'listening' | 'writing' | 'speaking') => {
    stopTts();
    setExamSec(sec); setExamItemIdx(0); setExamItemAns(null); setExamItemReveal(false); setExamItemWrite(''); resetSpeakingJudge(); resetWritingFeedback();
  };
  const selectExamItem = (idx: number) => {
    stopTts();
    setExamItemIdx(idx); setExamItemAns(null); setExamItemReveal(false); setExamItemWrite(''); resetSpeakingJudge(); resetWritingFeedback();
  };

  return (
    <div className="w-full pb-24 animate-fade-in">

      {/* Header */}
      <div className={gold || aurora ? "flex items-center gap-3 pb-4 border-b border-outline-variant mb-6 text-on-surface" : "flex items-center gap-3 pb-4 border-b border-ink-line mb-6 text-paper"}>
        <GraduationCap className={gold || aurora ? "w-8 h-8 text-secondary" : "w-8 h-8 text-paper"} />
        <div>
          <h2 className={gold || aurora ? "text-2xl font-extrabold font-space text-on-background" : "text-2xl font-extrabold font-serif text-paper"}>Шалгалт</h2>
          <p className={gold || aurora ? "text-xs text-on-surface-variant font-mono" : "text-xs text-paper-2 font-mono"}>CEFR түвшин (A1–C2) · Унших · Сонсох · Бичих · Ярих</p>
        </div>
      </div>

      {/* LEVEL SELECTOR */}
      {examLevelSel === null && (
        <>
          {/* Түвшин тогтоох үнэлгээний тест — 4 ур чадвар, CEFR түвшин */}
          <button onClick={() => { if (!requireAccount()) return; setPlacementOpen(true); }}
            className={gold || aurora ? "w-full text-left mb-4 bg-gradient-to-br from-surface-container-low to-surface-container border-2 border-on-background rounded-2xl p-5 md:p-6 block-shadow hover:scale-[1.01] active:scale-95 transition-transform cursor-pointer" : "w-full text-left mb-4 bg-gradient-to-br from-ink-raise to-ink-2 border-2 border-ink-line rounded-2xl p-5 md:p-6 block-shadow hover:scale-[1.01] active:scale-95 transition-transform cursor-pointer"}>
            <div className="flex items-start gap-4">
              <div className={gold || aurora ? "w-12 h-12 rounded-xl bg-surface-container border-2 border-on-background flex items-center justify-center shrink-0" : "w-12 h-12 rounded-xl bg-ink-raise border-2 border-ink-line flex items-center justify-center shrink-0"}>
                <Sparkles className={gold || aurora ? "w-7 h-7 text-secondary" : "w-7 h-7 text-paper-2"} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={gold || aurora ? "text-lg md:text-xl font-black font-space text-on-surface" : "text-lg md:text-xl font-light font-serif text-paper"}>Түвшин тогтоох тест</h3>
                  <span className={gold || aurora ? "text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-white" : "text-[10px] font-bold px-2 py-0.5 rounded-full bg-paper text-ink"}>Einstufungstest</span>
                </div>
                <p className={gold || aurora ? "text-xs text-on-surface leading-relaxed mt-1" : "text-xs text-paper leading-relaxed mt-1"}>Дөрвөн ур чадварыг бүгдийг шалгаад <b className={gold || aurora ? "text-on-surface" : "text-paper"}>CEFR түвшнээ</b> (A1–C2) тогтоолгоно. Асуултууд таны түвшинд автоматаар тохирно. 10–15 минут.</p>
                <span className={gold || aurora ? "inline-flex items-center gap-1 mt-2 text-xs font-bold text-white bg-secondary border border-on-background px-3 py-1 rounded-full" : "inline-flex items-center gap-1 mt-2 text-xs font-bold text-paper bg-ink-raise border border-ink-line px-3 py-1 rounded-full"}>Тест эхлүүлэх <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          </button>

          {/* TestDaF бүрэн загвар шалгалтын симуляци — Pro ба түүнээс дээш багцад. */}
          <button onClick={() => fullContent ? setTestdafOpen(true) : setActiveTab('profile')}
            className={gold || aurora ? "w-full text-left mb-6 bg-gradient-to-br from-surface-container-low to-surface-container border-2 border-on-background rounded-2xl p-5 md:p-6 block-shadow hover:scale-[1.01] active:scale-95 transition-transform cursor-pointer" : "w-full text-left mb-6 bg-gradient-to-br from-ink-raise to-ink-2 border-2 border-ink-line rounded-2xl p-5 md:p-6 block-shadow hover:scale-[1.01] active:scale-95 transition-transform cursor-pointer"}>
            <div className="flex items-start gap-4">
              <div className={gold || aurora ? "w-12 h-12 rounded-xl bg-surface-container border-2 border-on-background flex items-center justify-center shrink-0" : "w-12 h-12 rounded-xl bg-ink-raise border-2 border-ink-line flex items-center justify-center shrink-0"}>
                <GraduationCap className={gold || aurora ? "w-7 h-7 text-secondary" : "w-7 h-7 text-paper-2"} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={gold || aurora ? "text-lg md:text-xl font-black font-space text-on-surface" : "text-lg md:text-xl font-light font-serif text-paper"}>TestDaF — Бүрэн загвар шалгалт</h3>
                  <span className={gold || aurora ? "text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-white" : "text-[10px] font-bold px-2 py-0.5 rounded-full bg-paper text-ink"}>Prüfungssimulation</span>
                </div>
                <p className={gold || aurora ? "text-xs text-on-surface leading-relaxed mt-1" : "text-xs text-paper leading-relaxed mt-1"}>Жинхэнэ шалгалтын бүтэц: <b className={gold || aurora ? "text-on-surface" : "text-paper"}>Унших</b> 60′/30, <b className={gold || aurora ? "text-on-surface" : "text-paper"}>Сонсох</b> 40′/25, <b className={gold || aurora ? "text-on-surface" : "text-paper"}>Бичих</b> 60′/график-эссэ, <b className={gold || aurora ? "text-on-surface" : "text-paper"}>Ярих</b> 35′/7 ситуаци. Цаг хэмжсэн, дараалсан, AI үнэлгээтэй.</p>
                <span className={gold || aurora ? "inline-flex items-center gap-1 mt-2 text-xs font-bold text-white bg-secondary border border-on-background px-3 py-1 rounded-full" : "inline-flex items-center gap-1 mt-2 text-xs font-bold text-paper bg-ink-raise border border-ink-line px-3 py-1 rounded-full"}>
                  {fullContent ? <>Симуляци эхлүүлэх <ArrowRight className="w-3.5 h-3.5" /></> : <><Lock className="w-3.5 h-3.5" /> Pro багцаар нээгдэнэ</>}
                </span>
              </div>
            </div>
          </button>

          <p className={gold || aurora ? "text-sm text-on-surface-variant mb-5 max-w-2xl" : "text-sm text-paper-2 mb-5 max-w-2xl"}>Эсвэл <b className={gold || aurora ? "text-on-surface" : "text-paper"}>CEFR түвшнээ</b> сонгоно уу. Түвшин бүр <b className={gold || aurora ? "text-on-surface" : "text-paper"}>Унших, Сонсох, Бичих, Ярих</b> гэсэн дөрвөн хэсэгтэй бөгөөд хэсэг бүрт 5+ тест байна. Доош нь A1 хамгийн хялбар, C2 хамгийн хүнд.</p>

          {/* Free tier: only the first N questions of the bank are open. */}
          {!fullContent && (
            <div className={gold || aurora ? "flex items-start gap-3 mb-5 p-4 bg-surface-container/60 border-2 border-on-background rounded-xl block-shadow max-w-2xl" : "flex items-start gap-3 mb-5 p-4 bg-ink-raise/60 border-2 border-ink-line rounded-xl block-shadow max-w-2xl"}>
              <Lock className={gold || aurora ? "w-5 h-5 text-on-surface shrink-0 mt-0.5" : "w-5 h-5 text-paper shrink-0 mt-0.5"} />
              <div>
                <p className={gold || aurora ? "text-sm font-extrabold text-on-surface" : "text-sm font-extrabold text-paper"}>Үнэгүй эрхээр A1 шалгалт бүрийн (унших/сонсох/бичих/ярих) эхний {FREE_QUESTIONS_PER_SECTION} асуулт нээлттэй.</p>
                <p className={gold || aurora ? "text-xs text-on-surface-variant mt-1" : "text-xs text-paper-2 mt-1"}>
                  Бүх түвшний {EXAM_LEVEL_ORDER.reduce((n, lv) => n + EXAMS[lv].reading.length + EXAMS[lv].listening.length + EXAMS[lv].writing.length + EXAMS[lv].speaking.length, 0)} тестийг бүрэн нээхийн тулд{' '}
                  <button onClick={() => setActiveTab('profile')} className={gold || aurora ? "font-bold text-secondary underline cursor-pointer" : "font-bold text-paper-2 underline cursor-pointer"}>Pro эсвэл Max багц</button> аваарай.
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAM_LEVEL_ORDER.map((lv) => {
              const ex = EXAMS[lv];
              const total = ex.reading.length + ex.listening.length + ex.writing.length + ex.speaking.length;
              return (
                <button key={lv} onClick={() => { setExamLevelSel(lv); selectExamSection('reading'); }}
                  className={gold || aurora ? "text-left border-2 border-on-background rounded-xl p-5 block-shadow hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer" : "text-left border-2 border-ink-line rounded-xl p-5 block-shadow hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={gold || aurora ? "text-3xl font-black font-space text-primary" : "text-3xl font-light font-serif text-paper"}>{lv}</span>
                    <span className={gold || aurora ? "text-[10px] font-bold px-2 py-1 rounded-full bg-secondary text-white" : "text-[10px] font-bold px-2 py-1 rounded-full bg-paper text-ink"}>{total} тест</span>
                  </div>
                  <p className={gold || aurora ? "text-sm font-extrabold text-on-surface-variant mb-1" : "text-sm font-extrabold text-paper-2 mb-1"}>{ex.titleMn}</p>
                  <p className={gold || aurora ? "text-xs text-on-surface-variant leading-relaxed" : "text-xs text-paper-2 leading-relaxed"}>{ex.descriptionMn}</p>
                  <div className={gold || aurora ? "flex items-center gap-2 mt-3 text-secondary" : "flex items-center gap-2 mt-3 text-paper-2"}>
                    <BookOpen className="w-4 h-4" /><Headphones className="w-4 h-4" /><Edit3 className="w-4 h-4" /><Mic className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* LEVEL EXAM (4 sections, each with 5+ tests) */}
      {examLevelSel !== null && (() => {
        const exam = EXAMS[examLevelSel];
        const items = exam[examSec];
        const item = items[Math.min(examItemIdx, items.length - 1)];
        const answered = examItemAns !== null;
        // Free plan: only the first FREE_QUESTIONS_PER_SECTION questions
        // of each A1 section (reading/listening/writing/speaking).
        const itemLocked = isExamQuestionLocked(currentUser, examLevelSel, examSec, Math.min(examItemIdx, items.length - 1));
        const sections = [
          { key: 'reading' as const, icon: BookOpen, mn: 'Унших' },
          { key: 'listening' as const, icon: Headphones, mn: 'Сонсох' },
          { key: 'writing' as const, icon: Edit3, mn: 'Бичих' },
          { key: 'speaking' as const, icon: Mic, mn: 'Ярих' },
        ];
        return (
          <div className="font-sans">
            {/* Back + level title */}
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => { stopTts(); setExamLevelSel(null); }}
                className={gold || aurora ? "px-3 py-2 bg-surface-container text-on-surface border-2 border-on-background rounded-xl font-bold text-xs cursor-pointer block-shadow hover:bg-surface-container-high transition-colors flex items-center gap-1" : "px-3 py-2 bg-ink-raise text-paper border-2 border-ink-line rounded-xl font-bold text-xs cursor-pointer block-shadow hover:bg-ink-2 transition-colors flex items-center gap-1"}>
                <ArrowLeft className="w-4 h-4" /> Түвшнүүд
              </button>
              <span className={gold || aurora ? "text-lg font-black font-space text-on-surface" : "text-lg font-light font-serif text-paper"}>{examLevelSel} · {exam.titleMn}</span>
            </div>

            {/* Section tabs */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {sections.map((s) => {
                const Icon = s.icon; const active = examSec === s.key;
                return (
                  <button key={s.key} onClick={() => selectExamSection(s.key)}
                    className={gold || aurora ? `flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg border-2 border-on-background cursor-pointer transition-colors ${active ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}` : `flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg border-2 border-ink-line cursor-pointer transition-colors ${active ? 'bg-paper text-ink' : 'bg-ink-raise text-paper-2 hover:bg-ink-2'}`}>
                    <Icon className="w-4 h-4" />
                    <span className={gold || aurora ? "text-[10px] font-bold font-space" : "text-[10px] font-bold font-serif"}>{s.mn} ({exam[s.key].length})</span>
                  </button>
                );
              })}
            </div>

            {/* Test selector chips — a lock marks questions beyond the free limit. */}
            <div className="flex flex-wrap gap-2 mb-5">
              {items.map((_, i) => {
                const locked = isExamQuestionLocked(currentUser, examLevelSel, examSec, i);
                return (
                  <button key={i} onClick={() => selectExamItem(i)}
                    className={gold || aurora ? `flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-on-background text-xs font-bold cursor-pointer transition-colors ${examItemIdx === i ? 'bg-secondary text-white' : locked ? 'bg-surface-container text-on-surface-variant opacity-60 hover:opacity-80' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}` : `flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-ink-line text-xs font-bold cursor-pointer transition-colors ${examItemIdx === i ? 'bg-ink-raise text-paper' : locked ? 'bg-ink-raise text-paper-2 opacity-60 hover:opacity-80' : 'bg-ink-raise text-paper-2 hover:bg-ink-2'}`}>
                    {locked && <Lock className="w-3 h-3" />} Тест {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Detail card */}
            <div className={gold || aurora ? "border-2 border-on-background rounded-xl p-6 md:p-8 block-shadow" : "border-2 border-ink-line rounded-xl p-6 md:p-8 block-shadow"}>
              {itemLocked ? renderPlanLockCard(
                `Тест ${examItemIdx + 1} түгжээтэй`,
                `Үнэгүй эрхээр A1 шалгалт бүрийн эхний ${FREE_QUESTIONS_PER_SECTION} асуулт нээлттэй. Энэ тестийг нээхийн тулд Pro эсвэл Max багц аваарай.`,
                'pro',
              ) : (<>
              <div className="flex items-center justify-between mb-4">
                <span className={gold || aurora ? "text-xs font-space font-bold text-secondary bg-secondary-container border border-on-background px-3 py-1.5 rounded-full" : "text-xs font-serif font-bold text-paper-2 bg-ink-raise border border-ink-line px-3 py-1.5 rounded-full"}>{examLevelSel} · {(item as ExamItem).topic}</span>
                {(examSec === 'reading' || examSec === 'listening') && (
                  <div className="flex gap-2">
                    {examSec === 'reading' && (
                      <button onClick={() => { if (!requireAccount()) return; speakGerman((item as typeof exam.reading[number]).text, audioSpeed === '0.8' ? 0.8 : 1.0); }} title="Сонсох"
                        className={gold || aurora ? "p-2 border-2 border-on-background rounded-full bg-surface-container hover:scale-105 transition-transform text-on-surface block-shadow cursor-pointer" : "p-2 border-2 border-ink-line rounded-full bg-ink-raise hover:scale-105 transition-transform text-paper block-shadow cursor-pointer"}>
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                    <button onClick={() => setExamItemTrans(v => !v)}
                      className={gold || aurora ? `px-3 py-1 border-2 border-on-background rounded-full font-bold text-xs block-shadow cursor-pointer hover:scale-105 transition-transform flex items-center gap-1 ${examItemTrans ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface'}` : `px-3 py-1 border-2 border-ink-line rounded-full font-bold text-xs block-shadow cursor-pointer hover:scale-105 transition-transform flex items-center gap-1 ${examItemTrans ? 'bg-paper text-ink' : 'bg-ink-raise text-paper'}`}>
                      <Languages className="w-4 h-4" /> {examItemTrans ? 'Нуух' : (examSec === 'reading' ? 'Орчуулга' : 'Текст')}
                    </button>
                  </div>
                )}
              </div>

              <h3 className={gold || aurora ? "text-xl md:text-2xl font-extrabold text-on-surface mb-1" : "text-xl md:text-2xl font-extrabold text-paper mb-1"}>{(item as ExamItem).titleMn}</h3>
              <p className={gold || aurora ? "text-xs text-on-surface-variant mb-5" : "text-xs text-paper-2 mb-5"}>{(item as ExamItem).title}</p>

              {/* READING */}
              {examSec === 'reading' && (() => {
                const r = item as typeof exam.reading[number];
                const sq = shuffleQuiz(`exam:${exam.level}:reading:${r.id}`, { question: r.question, choices: r.choices, correctIndex: r.correctIndex });
                return (
                  <>
                    <p className={gold || aurora ? "text-lg leading-relaxed text-on-surface whitespace-pre-line font-medium" : "text-lg leading-relaxed text-paper whitespace-pre-line font-medium"}>{r.text}</p>
                    {examItemTrans && <p className={gold || aurora ? "text-sm leading-relaxed text-on-surface-variant whitespace-pre-line mt-4 pt-4 border-t border-outline-variant/50 italic" : "text-sm leading-relaxed text-paper-2 whitespace-pre-line mt-4 pt-4 border-t border-ink-line/50 italic"}>{r.translation}</p>}
                    <div className={gold || aurora ? "mt-6 pt-5 border-t border-outline-variant" : "mt-6 pt-5 border-t border-ink-line"}>
                      <p className={gold || aurora ? "text-xs font-space font-bold uppercase text-primary mb-2" : "text-xs font-serif font-bold uppercase text-paper mb-2"}>Ойлголт шалгах:</p>
                      <p className={gold || aurora ? "text-base font-bold text-on-surface mb-3" : "text-base font-bold text-paper mb-3"}>{r.question}</p>
                      <MCQBlock
                        choices={sq.choices}
                        correctIndex={sq.correctIndex}
                        selectedAnswer={examItemAns}
                        onSelect={(index) => {
                        if (!requireAccount()) return;
                          setExamItemAns(index);
                          if (index === sq.correctIndex) recordStudyActivity(activityKey(`exam:${exam.level}:reading`, r.id));
                        }}
                      />
                    </div>
                  </>
                );
              })()}

              {/* LISTENING */}
              {examSec === 'listening' && (() => {
                const l = item as typeof exam.listening[number];
                const sq = shuffleQuiz(`exam:${exam.level}:listening:${l.id}`, { question: l.question, choices: l.choices, correctIndex: l.correctIndex });
                return (
                  <>
                    <div className={gold || aurora ? "flex flex-col items-center gap-3 py-6 bg-surface-container border-2 border-on-background rounded-xl mb-5" : "flex flex-col items-center gap-3 py-6 bg-ink-raise border-2 border-ink-line rounded-xl mb-5"}>
                      <button onClick={() => { if (!requireAccount()) return; speakGerman(l.audioText, audioSpeed === '0.8' ? 0.8 : 1.0); }}
                        className={gold || aurora ? "w-16 h-16 rounded-full bg-secondary text-white border-2 border-on-background flex items-center justify-center cursor-pointer hover:scale-105 transition-transform block-shadow" : "w-16 h-16 rounded-full bg-paper text-ink border-2 border-ink-line flex items-center justify-center cursor-pointer hover:scale-105 transition-transform block-shadow"}>
                        <Volume2 className="w-7 h-7" />
                      </button>
                      <p className={gold || aurora ? "text-xs text-on-surface-variant" : "text-xs text-paper-2"}>Бичлэгийг сонсохын тулд дарна уу (2 удаа)</p>
                    </div>
                    {examItemTrans && (
                      <div className={gold || aurora ? "bg-surface-container border-l-4 border-secondary rounded-lg p-3 mb-5" : "bg-ink-raise border-l-4 border-ink-line rounded-lg p-3 mb-5"}>
                        <p className={gold || aurora ? "text-sm text-on-surface font-medium" : "text-sm text-paper font-medium"}>{l.audioText}</p>
                        <p className={gold || aurora ? "text-xs text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/50 italic" : "text-xs text-paper-2 mt-2 pt-2 border-t border-ink-line/50 italic"}>{l.transcriptMn}</p>
                      </div>
                    )}
                    <div className={gold || aurora ? "pt-5 border-t border-outline-variant" : "pt-5 border-t border-ink-line"}>
                      <p className={gold || aurora ? "text-xs font-space font-bold uppercase text-primary mb-2" : "text-xs font-serif font-bold uppercase text-paper mb-2"}>Ойлголт шалгах:</p>
                      <p className={gold || aurora ? "text-base font-bold text-on-surface mb-3" : "text-base font-bold text-paper mb-3"}>{l.question}</p>
                      <MCQBlock
                        choices={sq.choices}
                        correctIndex={sq.correctIndex}
                        selectedAnswer={examItemAns}
                        onSelect={(index) => {
                        if (!requireAccount()) return;
                          stopTts(); // done answering — stop the clip if it's still playing
                          setExamItemAns(index);
                          if (index === sq.correctIndex) recordStudyActivity(activityKey(`exam:${exam.level}:listening`, l.id));
                        }}
                      />
                    </div>
                  </>
                );
              })()}

              {/* WRITING */}
              {examSec === 'writing' && (() => {
                const w = item as typeof exam.writing[number];
                const words = examItemWrite.trim() ? examItemWrite.trim().split(/\s+/).length : 0;
                return (
                  <>
                    <div className={gold || aurora ? "bg-surface-container rounded-lg p-4 mb-4" : "bg-ink-raise rounded-lg p-4 mb-4"}>
                      <p className={gold || aurora ? "text-xs font-space font-bold uppercase text-primary mb-1" : "text-xs font-serif font-bold uppercase text-paper mb-1"}>Даалгавар:</p>
                      <p className={gold || aurora ? "text-sm font-bold text-on-surface mb-2" : "text-sm font-bold text-paper mb-2"}>{w.prompt}</p>
                      <ul className={gold || aurora ? "text-xs text-on-surface-variant space-y-1 list-disc list-inside" : "text-xs text-paper-2 space-y-1 list-disc list-inside"}>{w.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                    <textarea value={examItemWrite} onChange={(e) => setExamItemWrite(e.target.value)} placeholder="Энд герман хэлээр бичнэ үү..." rows={6} maxLength={2000}
                      className={gold || aurora ? "w-full px-3 py-2 text-sm border-2 border-on-background rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline outline-none focus:border-secondary resize-y" : "w-full px-3 py-2 text-sm border-2 border-ink-line rounded-lg bg-ink-raise text-paper placeholder:text-paper-3 outline-none focus:border-ink-line resize-y"} />
                    <div className="flex items-center justify-between mt-3">
                      <span className={gold || aurora ? "text-[11px] text-on-surface-variant" : "text-[11px] text-paper-2"}>{words} үг</span>
                      <button onClick={() => setExamItemReveal(v => !v)}
                        className={gold || aurora ? "px-4 py-2 bg-surface-container text-on-surface border-2 border-on-background rounded-lg font-bold text-xs cursor-pointer block-shadow hover:scale-[1.02] transition-transform flex items-center gap-1" : "px-4 py-2 bg-ink-raise text-paper border-2 border-ink-line rounded-lg font-bold text-xs cursor-pointer block-shadow hover:scale-[1.02] transition-transform flex items-center gap-1"}>
                        <Lightbulb className={gold || aurora ? "w-3.5 h-3.5 text-orange-500 fill-current" : "w-3.5 h-3.5 text-paper fill-current"} /> {examItemReveal ? 'Загварыг нуух' : 'Загвар хариулт харах'}
                      </button>
                    </div>
                    {examItemReveal && (
                      <div className={gold || aurora ? "bg-surface-container/40 border-2 border-on-background rounded-lg p-4 mt-4" : "bg-ink-raise/40 border-2 border-ink-line rounded-lg p-4 mt-4"}>
                        <p className={gold || aurora ? "text-[10px] font-bold uppercase text-on-surface-variant mb-1" : "text-[10px] font-bold uppercase text-paper-2 mb-1"}>Загвар хариулт:</p>
                        <p className={gold || aurora ? "text-sm text-on-surface whitespace-pre-line leading-relaxed font-medium" : "text-sm text-paper whitespace-pre-line leading-relaxed font-medium"}>{w.modelAnswer}</p>
                        <p className={gold || aurora ? "text-xs text-on-surface-variant whitespace-pre-line leading-relaxed mt-2 pt-2 border-t border-outline-variant/30 italic" : "text-xs text-paper-2 whitespace-pre-line leading-relaxed mt-2 pt-2 border-t border-ink-line/30 italic"}>{w.modelMn}</p>
                      </div>
                    )}

                    {/* AI writing check for the exam writing task. */}
                    {renderWritingChecker(examItemWrite, { id: w.id, prompt: w.prompt, points: w.points, modelAnswer: w.modelAnswer, level: w.level })}
                  </>
                );
              })()}

              {/* SPEAKING */}
              {examSec === 'speaking' && (() => {
                const sp = item as typeof exam.speaking[number];
                return (
                  <>
                    <div className={gold || aurora ? "bg-surface-container border-l-4 border-secondary rounded-lg p-4 mb-5" : "bg-ink-raise border-l-4 border-ink-line rounded-lg p-4 mb-5"}>
                      <p className={gold || aurora ? "text-xs font-space font-bold uppercase text-primary mb-1" : "text-xs font-serif font-bold uppercase text-paper mb-1"}>Даалгавар:</p>
                      <p className={gold || aurora ? "text-base font-bold text-on-surface" : "text-base font-bold text-paper"}>{sp.prompt}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <button onClick={() => { if (!requireAccount()) return; speakGerman(sp.modelAnswer, 1.0); }}
                        className={gold || aurora ? "flex items-center gap-2 px-4 py-2.5 bg-secondary text-white border-2 border-on-background rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] active:scale-95 transition-transform" : "flex items-center gap-2 px-4 py-2.5 bg-paper text-ink border-2 border-ink-line rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] active:scale-95 transition-transform"}>
                        <Volume2 className="w-4 h-4" /> Загварыг сонсох
                      </button>
                      <button onClick={() => setExamItemReveal(v => !v)}
                        className={gold || aurora ? "flex items-center gap-2 px-4 py-2.5 bg-surface-container text-on-surface border-2 border-on-background rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] transition-transform" : "flex items-center gap-2 px-4 py-2.5 bg-ink-raise text-paper border-2 border-ink-line rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] transition-transform"}>
                        <Lightbulb className={gold || aurora ? "w-4 h-4 text-orange-500 fill-current" : "w-4 h-4 text-paper fill-current"} /> {examItemReveal ? 'Нуух' : 'Загвар хариулт харах'}
                      </button>
                    </div>
                    <div className="mb-2">
                      <p className={gold || aurora ? "text-[11px] font-space font-bold uppercase text-on-surface-variant mb-2" : "text-[11px] font-serif font-bold uppercase text-paper-2 mb-2"}>Хэрэгтэй хэллэг:</p>
                      <div className="flex flex-col gap-1.5">{sp.tips.map((t, i) => <div key={i} className={gold || aurora ? "flex items-start gap-2 text-xs text-on-surface" : "flex items-start gap-2 text-xs text-paper"}><span className={gold || aurora ? "text-secondary font-black" : "text-paper-2 font-black"}>›</span>{t}</div>)}</div>
                    </div>
                    {examItemReveal && (
                      <div className={gold || aurora ? "bg-surface-container/40 border-2 border-on-background rounded-lg p-4 mt-4" : "bg-ink-raise/40 border-2 border-ink-line rounded-lg p-4 mt-4"}>
                        <p className={gold || aurora ? "text-[10px] font-bold uppercase text-on-surface-variant mb-1" : "text-[10px] font-bold uppercase text-paper-2 mb-1"}>Загвар хариулт:</p>
                        <p className={gold || aurora ? "text-base text-on-surface font-medium leading-relaxed" : "text-base text-paper font-medium leading-relaxed"}>{sp.modelAnswer}</p>
                        <p className={gold || aurora ? "text-xs text-on-surface-variant mt-2 italic leading-relaxed" : "text-xs text-paper-2 mt-2 italic leading-relaxed"}>{sp.modelMn}</p>
                      </div>
                    )}
                    <p className={gold || aurora ? "text-[11px] text-on-surface-variant mt-4 italic" : "text-[11px] text-paper-2 mt-4 italic"}>Зөвлөмж: эхлээд өөрөө чангаар хэлж үзээд, дараа нь загвартай харьцуулаарай.</p>

                    {/* AI judge for exam speaking — graded against this item's model answer. */}
                    {renderSpeakingJudge({ id: sp.id, text: sp.modelAnswer })}
                    {renderSpeakingReport({ id: sp.id, text: sp.modelAnswer })}
                  </>
                );
              })()}
              </>)}
            </div>

            {/* Prev / Next navigation */}
            <div className={gold || aurora ? "flex justify-between items-center mt-6 pt-4 border-t border-outline-variant/50" : "flex justify-between items-center mt-6 pt-4 border-t border-ink-line/50"}>
              <button
                onClick={() => selectExamItem(examItemIdx - 1)}
                disabled={examItemIdx === 0}
                className={gold || aurora ? `flex items-center gap-1 px-4 py-2.5 border-2 border-on-background rounded-xl font-bold text-xs block-shadow transition-colors ${examItemIdx === 0 ? 'opacity-40 cursor-not-allowed bg-surface-container text-on-surface-variant' : 'bg-surface-container text-on-surface cursor-pointer hover:bg-surface-container-high'}` : `flex items-center gap-1 px-4 py-2.5 border-2 border-ink-line rounded-xl font-bold text-xs block-shadow transition-colors ${examItemIdx === 0 ? 'opacity-40 cursor-not-allowed bg-ink-raise text-paper-2' : 'bg-ink-raise text-paper cursor-pointer hover:bg-ink-2'}`}
              >
                <ArrowLeft className="w-4 h-4" /> Өмнөх
              </button>
              <span className={gold || aurora ? "text-xs text-on-surface-variant font-space font-bold" : "text-xs text-paper-2 font-serif font-bold"}>{examItemIdx + 1} / {items.length}</span>
              <button
                onClick={() => selectExamItem(examItemIdx + 1)}
                disabled={examItemIdx >= items.length - 1}
                className={gold || aurora ? `flex items-center gap-1 px-4 py-2.5 border-2 border-on-background rounded-xl font-bold text-xs block-shadow transition-colors ${examItemIdx >= items.length - 1 ? 'opacity-40 cursor-not-allowed bg-surface-container text-on-surface-variant' : 'bg-secondary text-white cursor-pointer hover:scale-[1.02]'}` : `flex items-center gap-1 px-4 py-2.5 border-2 border-ink-line rounded-xl font-bold text-xs block-shadow transition-colors ${examItemIdx >= items.length - 1 ? 'opacity-40 cursor-not-allowed bg-ink-raise text-paper-2' : 'bg-paper text-ink cursor-pointer hover:scale-[1.02]'}`}
              >
                Дараах <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
