import React, { useLayoutEffect, useRef, useState } from 'react';
import { Info, X } from 'lucide-react';
import { useTheme } from '../../../frontend/src/lib/theme';
import type { Direction, EventScenario, ImpactData } from '../content';
import CheatSheet from './CheatSheet';

const MARKETS = ['NQ', 'ES', 'GC'];
const MARKET_NAMES: Record<string, string> = { NQ: 'NQ · Nasdaq 100', ES: 'ES · S&P 500', GC: 'GC · Gold' };
// Flow columns mirror the original map: event → first-order repricing → transmission → markets.
const COLUMNS: { label: string; nodes: { id: string; name: string }[] }[] = [
  { label: 'Event', nodes: [{ id: 'event', name: 'Economic event' }] },
  { label: 'First-order repricing', nodes: [{ id: 'policy', name: 'Fed rate-path expectations' }, { id: 'risk', name: 'Risk sentiment' }] },
  { label: 'Transmission channels', nodes: [{ id: 'yields', name: 'Treasury yields (real yields)' }, { id: 'usd', name: 'US dollar (DXY)' }] },
  { label: 'Markets', nodes: MARKETS.map((id) => ({ id, name: MARKET_NAMES[id] })) },
];

const STROKE: Record<Direction, string> = { up: '#10b981', down: '#f43f5e', mixed: '#f59e0b' };

// Same edge topology as the source page's drawEdges(): policy/risk fan out of the
// event, channels fan into every market, geo-style shocks hit USD directly.
function edgeList(s: EventScenario): { from: string; to: string; d: Direction }[] {
  const edges: { from: string; to: string; d: Direction }[] = [];
  const n = s.nodes;
  if (n.policy) {
    edges.push({ from: 'event', to: 'policy', d: n.policy.d });
    if (n.yields) edges.push({ from: 'policy', to: 'yields', d: n.yields.d });
    if (n.usd && !s.directUsd) edges.push({ from: 'policy', to: 'usd', d: n.usd.d });
  }
  if (n.risk) {
    edges.push({ from: 'event', to: 'risk', d: n.risk.d });
    MARKETS.forEach((m) => edges.push({ from: 'risk', to: m, d: s.mkts[m].d }));
  }
  if (n.usd && s.directUsd) edges.push({ from: 'event', to: 'usd', d: n.usd.d });
  if (n.yields) MARKETS.forEach((m) => edges.push({ from: 'yields', to: m, d: s.mkts[m].d }));
  if (n.usd) MARKETS.forEach((m) => edges.push({ from: 'usd', to: m, d: s.mkts[m].d }));
  return edges;
}

export default function ImpactMap({ data }: { data: ImpactData }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const [eventId, setEventId] = useState(data.events[0]?.id || '');
  const [mode, setMode] = useState<'hot' | 'cool'>('hot');
  const [infoKey, setInfoKey] = useState<string | null>(null);
  const [paths, setPaths] = useState<{ d: string; stroke: string }[]>([]);
  const [mapSize, setMapSize] = useState({ w: 0, h: 0 });
  const mapRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const event = data.events.find((item) => item.id === eventId) || data.events[0];
  const scenario = event ? event[mode] : null;

  useLayoutEffect(() => {
    if (!scenario) return;
    const draw = () => {
      const map = mapRef.current;
      if (!map) return;
      const box = map.getBoundingClientRect();
      const next: { d: string; stroke: string }[] = [];
      for (const edge of edgeList(scenario)) {
        const fromEl = nodeRefs.current[edge.from];
        const toEl = nodeRefs.current[edge.to];
        if (!fromEl || !toEl) continue;
        const a = fromEl.getBoundingClientRect();
        const b = toEl.getBoundingClientRect();
        const ax = a.right - box.left, ay = a.top - box.top + a.height / 2;
        const bx = b.left - box.left, by = b.top - box.top + b.height / 2;
        const dx = Math.max(30, (bx - ax) / 2);
        next.push({ d: `M${ax} ${ay} C${ax + dx} ${ay}, ${bx - dx} ${by}, ${bx} ${by}`, stroke: STROKE[edge.d] });
      }
      setMapSize({ w: map.clientWidth, h: map.clientHeight });
      setPaths(next);
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [scenario]);

  if (!event || !scenario) return null;
  const directionTone = (direction: string) => direction === 'up' ? 'border-emerald-500 text-emerald-500' : direction === 'down' ? 'border-rose-500 text-rose-500' : 'border-amber-500 text-amber-500';
  const node = (key: string, label: string, description?: string) => {
    const market = scenario.mkts[key];
    const status = key === 'event' ? { d: 'mixed' as const, t: scenario.ev } : scenario.nodes[key] || (market ? { d: market.d, t: market.a } : undefined);
    const stateTone = status ? directionTone(status.d) : gold ? 'border-outline-variant text-on-surface-variant' : 'border-ink-line text-paper-2';
    const base = gold ? 'w-full rounded-xl border bg-surface-container-high p-3 text-left transition-colors hover:bg-surface-container ' : 'w-full rounded-xl border bg-ink-2 p-3 text-left transition-colors hover:bg-ink-raise ';
    const titleClass = gold ? 'text-xs font-bold text-on-surface' : 'text-xs font-bold text-paper';
    const descriptionClass = gold ? 'mt-1 text-[10px] text-on-surface-variant' : 'mt-1 text-[10px] text-paper-3';
    return (
      <button ref={(el) => { nodeRefs.current[key] = el; }} onClick={() => setInfoKey(key)} className={base + stateTone}>
        <p className={titleClass}>{label}</p>
        <p className="mt-1 text-xs font-semibold">{status?.t || 'No direct signal'}</p>
        {description ? <p className={descriptionClass}>{description}</p> : null}
      </button>
    );
  };
  const columnLabel = gold ? 'text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant' : 'text-[10px] font-bold uppercase tracking-[0.16em] text-paper-3';
  const info = infoKey ? data.nodeInfo[infoKey] : undefined;
  return <section className={gold ? 'space-y-5 rounded-3xl border border-outline-variant bg-surface-container p-5 md:p-7' : 'space-y-5 rounded-3xl border border-ink-line bg-ink-raise p-5 md:p-7'}>
    <div><p className={gold ? 'text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant' : 'text-[10px] font-bold uppercase tracking-[0.2em] text-paper-3'}>Interactive · surprise vs expectations</p><h2 className={gold ? 'mt-1 font-space text-2xl font-bold text-on-surface' : 'mt-1 font-serif text-3xl font-light text-paper'}>Market impact map</h2><p className={gold ? 'mt-2 text-sm text-on-surface-variant' : 'mt-2 text-sm text-paper-2'}>Select an event and surprise direction, then follow the arrows. Green and red describe direction, not good or bad.</p></div>
    <div className="flex gap-2 overflow-x-auto pb-1">{data.events.map((item) => <button key={item.id} onClick={() => setEventId(item.id)} className={item.id === event.id ? gold ? 'shrink-0 rounded-full bg-secondary px-3 py-2 text-xs font-bold text-white' : 'shrink-0 rounded-full bg-paper px-3 py-2 text-xs font-bold text-ink' : gold ? 'shrink-0 rounded-full border border-outline-variant px-3 py-2 text-xs text-on-surface-variant' : 'shrink-0 rounded-full border border-ink-line px-3 py-2 text-xs text-paper-2'}>{item.name}</button>)}</div>
    <div className={gold ? 'rounded-2xl bg-surface-container-high p-4' : 'rounded-2xl bg-ink-2 p-4'}><p className={gold ? 'font-space font-bold text-on-surface' : 'font-serif text-xl text-paper'}>{event.name}</p><p className={gold ? 'mt-1 text-xs text-on-surface-variant' : 'mt-1 text-xs text-paper-2'}>{event.sub} · {event.meta}</p><div className="mt-3 flex gap-2"><button onClick={() => setMode('hot')} className={mode === 'hot' ? 'rounded-full bg-rose-600 px-3 py-2 text-xs font-bold text-white' : gold ? 'rounded-full border border-outline-variant px-3 py-2 text-xs text-on-surface-variant' : 'rounded-full border border-ink-line px-3 py-2 text-xs text-paper-2'}>{event.hotLabel}</button><button onClick={() => setMode('cool')} className={mode === 'cool' ? 'rounded-full bg-emerald-600 px-3 py-2 text-xs font-bold text-white' : gold ? 'rounded-full border border-outline-variant px-3 py-2 text-xs text-on-surface-variant' : 'rounded-full border border-ink-line px-3 py-2 text-xs text-paper-2'}>{event.coolLabel}</button></div></div>
    <div className="overflow-x-auto">
      <div ref={mapRef} className="relative grid min-w-[780px] grid-cols-4 items-center gap-x-12 gap-y-3 py-2">
        <svg aria-hidden="true" viewBox={`0 0 ${mapSize.w || 1} ${mapSize.h || 1}`} className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {paths.map((path, index) => <path key={index} d={path.d} stroke={path.stroke} strokeWidth={1.5} fill="none" opacity={0.45} />)}
        </svg>
        {COLUMNS.map((column) => <div key={column.label} className="relative z-10 flex flex-col justify-center gap-3 self-stretch">
          <p className={columnLabel}>{column.label}</p>
          {column.nodes.map((item) => <React.Fragment key={item.id}>{node(item.id, item.name, MARKETS.includes(item.id) ? scenario.mkts[item.id]?.n : undefined)}</React.Fragment>)}
        </div>)}
      </div>
    </div>
    {info && <div className={gold ? 'relative rounded-xl border-l-4 border-secondary bg-surface-container-high p-4' : 'relative rounded-xl border-l-4 border-paper bg-ink-2 p-4'}><button onClick={() => setInfoKey(null)} className={gold ? 'absolute right-3 top-3 text-on-surface-variant' : 'absolute right-3 top-3 text-paper-2'} aria-label="Close explanation"><X className="h-4 w-4" /></button><div className="flex items-center gap-2"><Info className="h-4 w-4" /><h3 className={gold ? 'font-space font-bold text-on-surface' : 'font-serif text-lg text-paper'}>{info.title}</h3></div><p className={gold ? 'mt-2 pr-5 text-sm leading-relaxed text-on-surface-variant' : 'mt-2 pr-5 text-sm leading-relaxed text-paper-2'}>{info.body}</p></div>}
    <div className="grid gap-3 md:grid-cols-3">{[['Why', scenario.why], ['What to compare', scenario.exp], ['Nuance', scenario.nuance]].map(([title, text]) => <div key={title} className={gold ? 'rounded-xl bg-surface-container-high p-4' : 'rounded-xl bg-ink-2 p-4'}><h3 className={gold ? 'font-space text-sm font-bold text-on-surface' : 'font-serif text-lg text-paper'}>{title}</h3><p className={gold ? 'mt-2 text-xs leading-relaxed text-on-surface-variant' : 'mt-2 text-xs leading-relaxed text-paper-2'}>{text}</p></div>)}</div>
    <CheatSheet data={data.cheatSheet} />
  </section>;
}
