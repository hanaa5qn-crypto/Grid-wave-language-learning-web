import React, { useMemo, useState } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import { useTheme } from '../../../frontend/src/lib/theme';
import type { ImpactData, ImpactEvent } from '../content';

type Guess = 'up' | 'down' | undefined;
interface Round { event: ImpactEvent; scenario: 'hot' | 'cool'; }

function makeRounds(events: ImpactEvent[], length: number): Round[] {
  const options = events.flatMap((event) => [{ event, scenario: 'hot' as const }, { event, scenario: 'cool' as const }]);
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  return Array.from({ length }, (_, index) => shuffled[index % shuffled.length]);
}

export default function ReactionGame({ data, events }: { data: ImpactData['reactionGame']; events: ImpactEvent[] }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const [rounds, setRounds] = useState(() => makeRounds(events, data.roundLength));
  const [index, setIndex] = useState(0);
  const [guesses, setGuesses] = useState<Record<string, Guess>>({});
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const round = rounds[index];
  const scenario = round?.event[round.scenario];
  const complete = index >= rounds.length;
  const restart = () => { setRounds(makeRounds(events, data.roundLength)); setIndex(0); setGuesses({}); setRevealed(false); setScore(0); };
  const correct = useMemo(() => scenario ? data.markets.reduce((total, market) => total + (guesses[market] === scenario.mkts[market]?.d ? 1 : 0), 0) : 0, [data.markets, guesses, scenario]);
  if (complete) return <section className={gold ? 'rounded-2xl border border-outline-variant bg-surface-container p-6 text-center' : 'rounded-2xl border border-ink-line bg-ink-raise p-6 text-center'}><Trophy className="mx-auto h-8 w-8 text-amber-500" /><h3 className={gold ? 'mt-2 font-space text-xl font-bold text-on-surface' : 'mt-2 font-serif text-2xl text-paper'}>Round complete</h3><p className={gold ? 'mt-1 text-on-surface-variant' : 'mt-1 text-paper-2'}>{score}/{rounds.length * data.markets.length} market calls correct.</p><button onClick={restart} className={gold ? 'mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white' : 'mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-xs font-bold text-ink'}><RotateCcw className="h-4 w-4" />Try another round</button></section>;
  if (!round || !scenario) return null;
  const canReveal = data.markets.every((market) => guesses[market]);
  const continueRound = () => { setScore((value) => value + correct); setIndex((value) => value + 1); setGuesses({}); setRevealed(false); };
  return <section className={gold ? 'rounded-2xl border border-outline-variant bg-surface-container p-5' : 'rounded-2xl border border-ink-line bg-ink-raise p-5'}>
    <div className="flex items-start justify-between gap-3"><div><p className={gold ? 'text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant' : 'text-[10px] font-bold uppercase tracking-[0.18em] text-paper-3'}>Reaction game · {index + 1}/{rounds.length}</p><h3 className={gold ? 'mt-1 font-space text-lg font-bold text-on-surface' : 'mt-1 font-serif text-xl text-paper'}>{round.event.name}: {scenario.ev}</h3><p className={gold ? 'mt-1 text-xs text-on-surface-variant' : 'mt-1 text-xs text-paper-2'}>{data.description}</p></div><span className={gold ? 'rounded-full bg-surface-container-high px-3 py-1 text-xs text-on-surface-variant' : 'rounded-full bg-ink-2 px-3 py-1 text-xs text-paper-2'}>Score {score}</span></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">{data.markets.map((market) => { const reaction = scenario.mkts[market]; const guess = guesses[market]; return <div key={market} className={gold ? 'rounded-xl bg-surface-container-high p-3' : 'rounded-xl bg-ink-2 p-3'}><p className={gold ? 'font-space font-bold text-on-surface' : 'font-serif text-lg text-paper'}>{market}</p>{!revealed ? <div className="mt-3 flex gap-2"><button onClick={() => setGuesses((all) => ({ ...all, [market]: 'up' }))} className={guess === 'up' ? 'rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white' : gold ? 'rounded-lg border border-outline-variant px-3 py-1.5 text-xs text-on-surface-variant' : 'rounded-lg border border-ink-line px-3 py-1.5 text-xs text-paper-2'}>▲ Up</button><button onClick={() => setGuesses((all) => ({ ...all, [market]: 'down' }))} className={guess === 'down' ? 'rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white' : gold ? 'rounded-lg border border-outline-variant px-3 py-1.5 text-xs text-on-surface-variant' : 'rounded-lg border border-ink-line px-3 py-1.5 text-xs text-paper-2'}>▼ Down</button></div> : <><p className={`mt-2 text-lg font-bold ${reaction.d === 'up' ? 'text-emerald-500' : reaction.d === 'down' ? 'text-rose-500' : 'text-amber-500'}`}>{reaction.a} {reaction.d}</p><p className={gold ? 'mt-1 text-xs text-on-surface-variant' : 'mt-1 text-xs text-paper-2'}>{reaction.n}</p><p className="mt-2 text-xs font-bold">{guess === reaction.d ? '✓ Correct' : `Correct: ${reaction.d}`}</p></>}</div>; })}</div>
    {!revealed ? <button disabled={!canReveal} onClick={() => setRevealed(true)} className={gold ? 'mt-4 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white disabled:opacity-40' : 'mt-4 rounded-full bg-paper px-4 py-2 text-xs font-bold text-ink disabled:opacity-40'}>Reveal reactions</button> : <button onClick={continueRound} className={gold ? 'mt-4 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white' : 'mt-4 rounded-full bg-paper px-4 py-2 text-xs font-bold text-ink'}>{index === rounds.length - 1 ? 'See score' : 'Next scenario'}</button>}
  </section>;
}
