import React from 'react';
import { Check, Lightbulb } from 'lucide-react';
import { useTheme } from '../../frontend/src/lib/theme';
import type { ContentBlock, EducationCard, ImpactData } from './content';
import { isCardLearned, markSectionCelebrated, sectionProgress, toggleCardLearned, useEducationProgress } from './progress';
import ImpactMap from './widgets/ImpactMap';
import PositionCalc from './widgets/PositionCalc';
import ReactionGame from './widgets/ReactionGame';
import SessionClock from './widgets/SessionClock';

function Widget({ id, impact }: { id: string; impact: ImpactData | null }) {
  if (!impact) return <div className="py-5 text-sm text-paper-2">Loading interactive lesson…</div>;
  if (id === 'impact-map') return <ImpactMap data={impact} />;
  if (id === 'reaction-game') return <ReactionGame data={impact.reactionGame} events={impact.events} />;
  if (id === 'session-clock') return <SessionClock data={impact.sessionClock} />;
  if (id === 'position-size-calculator') return <PositionCalc data={impact.positionSizeCalculator} />;
  return null;
}

function Block({ block, impact, gold }: { key?: React.Key; block: ContentBlock; impact: ImpactData | null; gold: boolean }) {
  if (block.type === 'p') return <p className={gold ? 'text-sm leading-7 text-on-surface-variant' : 'text-sm leading-7 text-paper-2'}>{block.text}</p>;
  if (block.type === 'h') return <h3 className={gold ? 'pt-2 font-space text-lg font-bold text-on-surface' : 'pt-2 font-serif text-2xl font-light text-paper'}>{block.text}</h3>;
  if (block.type === 'list') return <ul className={gold ? 'list-disc space-y-2 pl-5 text-sm leading-6 text-on-surface-variant' : 'list-disc space-y-2 pl-5 text-sm leading-6 text-paper-2'}>{block.items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
  if (block.type === 'callout') return <aside className={gold ? 'rounded-xl border-l-4 border-secondary bg-surface-container-high p-4 text-sm leading-6 text-on-surface-variant' : 'rounded-xl border-l-4 border-paper bg-ink-2 p-4 text-sm leading-6 text-paper-2'}><Lightbulb className={gold ? 'mb-2 h-4 w-4 text-secondary' : 'mb-2 h-4 w-4 text-paper'} />{block.text}</aside>;
  if (block.type === 'table') return <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-xs"><thead><tr>{block.head.map((cell) => <th key={cell} className={gold ? 'border-b border-outline-variant px-3 py-2 text-on-surface-variant' : 'border-b border-ink-line px-3 py-2 text-paper-2'}>{cell}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className={gold ? 'border-b border-outline-variant/60 px-3 py-2 leading-relaxed text-on-surface-variant' : 'border-b border-ink-line/60 px-3 py-2 leading-relaxed text-paper-2'}>{cell}</td>)}</tr>)}</tbody></table></div>;
  return <Widget id={block.id} impact={impact} />;
}

export default function CardRenderer({ card, sectionId, cardIndex, cardsTotal, impact }: { key?: React.Key; card: EducationCard; sectionId: string; cardIndex: number; cardsTotal: number; impact: ImpactData | null }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  useEducationProgress();
  const learned = isCardLearned(sectionId, cardIndex);
  const markLearned = () => {
    const nowLearned = toggleCardLearned(sectionId, cardIndex);
    if (nowLearned && sectionProgress(sectionId, cardsTotal).pct === 100) markSectionCelebrated(sectionId);
  };
  return <article className={gold ? 'rounded-2xl border border-outline-variant bg-surface-container p-5 md:p-6' : 'rounded-2xl border border-ink-line bg-ink-raise p-5 md:p-6'}>
    <div className="mb-5 flex items-start justify-between gap-4"><h2 className={gold ? 'font-space text-xl font-bold tracking-tight text-on-surface' : 'font-serif text-2xl font-light tracking-tight text-paper'}>{card.title}</h2><button onClick={markLearned} aria-pressed={learned} className={learned ? 'shrink-0 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white' : gold ? 'shrink-0 rounded-full border border-outline-variant px-3 py-1.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high' : 'shrink-0 rounded-full border border-ink-line px-3 py-1.5 text-xs font-semibold text-paper-2 hover:bg-ink-2'}>{learned && <Check className="mr-1 inline h-3.5 w-3.5" />}{learned ? 'Learned ✓' : 'Mark as learned'}</button></div>
    <div className="space-y-4">{card.blocks.map((block, index) => <Block key={index} block={block} impact={impact} gold={gold} />)}</div>
  </article>;
}
