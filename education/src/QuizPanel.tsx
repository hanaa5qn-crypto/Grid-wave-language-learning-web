import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { useTheme } from '../../frontend/src/lib/theme';
import type { QuizQuestion } from './content';
import { getQuizBest, setQuizBest, useEducationProgress } from './progress';

function tierLine(score: number, total: number) { if (score === total) return 'Solid — the mechanisms stuck.'; if (score >= total * 0.75) return 'Good read — review the ones you missed.'; if (score >= total * 0.5) return 'Halfway — reread the cards you missed and retry.'; return 'Early days — go through the section once more, then retry.'; }

export default function QuizPanel({ quizKey, questions }: { quizKey: string; questions: QuizQuestion[] }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  useEducationProgress();
  const [started, setStarted] = useState(false);
  const [order, setOrder] = useState(() => questions.map((_, index) => index));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [result, setResult] = useState<{ score: number; previous: number | null } | null>(null);
  const finished = result !== null;
  const question = questions[order[index]];
  const score = useMemo(() => answers.filter(Boolean).length, [answers]);
  const restart = () => { setOrder((all) => [...all].sort(() => Math.random() - 0.5)); setIndex(0); setPicked(null); setAnswers([]); setResult(null); setStarted(true); };
  const begin = () => { setIndex(0); setPicked(null); setAnswers([]); setResult(null); setStarted(true); };
  const choose = (choice: number) => { if (picked !== null) return; setPicked(choice); setAnswers((all) => [...all, choice === question.answer]); };
  const next = () => {
    if (index === questions.length - 1) {
      const finalScore = answers.filter(Boolean).length;
      setResult({ score: finalScore, previous: setQuizBest(quizKey, finalScore) });
      return;
    }
    setPicked(null);
    setIndex((value) => value + 1);
  };
  const shell = gold ? 'rounded-2xl border border-outline-variant bg-surface-container p-5' : 'rounded-2xl border border-ink-line bg-ink-raise p-5';
  const action = gold ? 'rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white' : 'rounded-full bg-paper px-4 py-2 text-xs font-bold text-ink';
  if (!started) return <section className={shell}><h3 className={gold ? 'font-space text-xl font-bold text-on-surface' : 'font-serif text-2xl text-paper'}>Test yourself</h3><p className={gold ? 'mt-1 text-sm text-on-surface-variant' : 'mt-1 text-sm text-paper-2'}>{questions.length} questions · instant feedback{getQuizBest(quizKey) !== null ? ` · best ${getQuizBest(quizKey)}/${questions.length}` : ''}</p><button onClick={begin} className={`${action} mt-4`}>Start quiz</button></section>;
  if (finished && result) { const missed = answers.map((answer, answerIndex) => ({ answer, question: questions[order[answerIndex]] })).filter((item) => !item.answer); return <section className={shell}><h3 className={gold ? 'font-space text-2xl font-bold text-on-surface' : 'font-serif text-3xl text-paper'}>{result.score}/{questions.length}</h3><p className={gold ? 'mt-1 text-sm text-on-surface-variant' : 'mt-1 text-sm text-paper-2'}>{result.previous === null ? 'First run logged.' : result.score > result.previous ? `New best — previous best ${result.previous}/${questions.length}` : `Best so far: ${Math.max(result.previous, result.score)}/${questions.length}`}</p><p className={gold ? 'mt-3 text-sm text-on-surface' : 'mt-3 text-sm text-paper'}>{tierLine(result.score, questions.length)}</p>{missed.length > 0 && <div className={gold ? 'mt-4 rounded-xl bg-surface-container-high p-4' : 'mt-4 rounded-xl bg-ink-2 p-4'}><h4 className={gold ? 'font-space font-bold text-on-surface' : 'font-serif text-lg text-paper'}>Missed</h4>{missed.map((item, missedIndex) => <p key={missedIndex} className={gold ? 'mt-2 text-xs text-on-surface-variant' : 'mt-2 text-xs text-paper-2'}>{item.question.q} — correct: {item.question.choices[item.question.answer]}</p>)}</div>}<button onClick={restart} className={`${action} mt-4 inline-flex items-center gap-2`}><RotateCcw className="h-4 w-4" />Try again</button></section>; }
  return <section className={shell}><p className={gold ? 'text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant' : 'text-[10px] font-bold uppercase tracking-[0.18em] text-paper-3'}>Question {index + 1}/{questions.length} · score {score}</p><h3 className={gold ? 'mt-3 font-space text-lg font-bold text-on-surface' : 'mt-3 font-serif text-2xl text-paper'}>{question.q}</h3><div className="mt-4 space-y-2">{question.choices.map((choice, choiceIndex) => { const correct = choiceIndex === question.answer; const chosen = choiceIndex === picked; const resultStyle = picked === null ? gold ? 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high' : 'border-ink-line text-paper-2 hover:bg-ink-2' : correct ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : chosen ? 'border-rose-500 bg-rose-500/10 text-rose-500' : gold ? 'border-outline-variant text-on-surface-variant opacity-50' : 'border-ink-line text-paper-2 opacity-50'; return <button disabled={picked !== null} key={choice} onClick={() => choose(choiceIndex)} className={`w-full rounded-xl border p-3 text-left text-sm transition-colors ${resultStyle}`}>{picked !== null && correct ? '✓ ' : picked !== null && chosen ? '✗ ' : ''}{choice}</button>; })}</div>{picked !== null && <div className={gold ? 'mt-4 rounded-xl bg-surface-container-high p-4' : 'mt-4 rounded-xl bg-ink-2 p-4'}><p className={gold ? 'text-sm text-on-surface' : 'text-sm text-paper'}>{picked === question.answer ? <CheckCircle2 className="mr-1 inline h-4 w-4 text-emerald-500" /> : <XCircle className="mr-1 inline h-4 w-4 text-rose-500" />}{picked === question.answer ? 'Correct. ' : 'Not quite. '}{question.why}</p><p className={gold ? 'mt-2 text-xs text-on-surface-variant' : 'mt-2 text-xs text-paper-3'}>From: {question.card}</p><button onClick={next} className={`${action} mt-3`}>{index === questions.length - 1 ? 'See results' : 'Next'}</button></div>}</section>;
}
