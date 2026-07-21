import React, { useEffect, useState } from 'react';
import { Clock3 } from 'lucide-react';
import { useTheme } from '../../../frontend/src/lib/theme';
import type { ImpactData } from '../content';

function marketMinutes(timezone: string) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0) % 24;
  const minute = Number(parts.find((part) => part.type === 'minute')?.value || 0);
  return { hour, minute, minutes: hour * 60 + minute };
}

export default function SessionClock({ data }: { data: ImpactData['sessionClock'] }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const [now, setNow] = useState(() => marketMinutes(data.timezone));
  useEffect(() => { const timer = window.setInterval(() => setNow(marketMinutes(data.timezone)), 60000); return () => window.clearInterval(timer); }, [data.timezone]);
  const isOpen = (start: number, end: number) => start <= end ? now.minutes >= start && now.minutes < end : now.minutes >= start || now.minutes < end;
  const open = data.sessions.filter((session) => isOpen(session.startMinutes, session.endMinutes));
  const range = (minute: number) => `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;
  return <section className={gold ? 'rounded-2xl border border-outline-variant bg-surface-container p-5' : 'rounded-2xl border border-ink-line bg-ink-raise p-5'}>
    <div className="mb-4 flex items-center gap-2"><Clock3 className={gold ? 'h-5 w-5 text-on-surface-variant' : 'h-5 w-5 text-paper-2'} /><h3 className={gold ? 'font-space text-lg font-bold text-on-surface' : 'font-serif text-xl font-light text-paper'}>Global session clock</h3></div>
    <p className={gold ? 'mb-4 text-sm text-on-surface-variant' : 'mb-4 text-sm text-paper-2'}>Now: {String(now.hour).padStart(2, '0')}:{String(now.minute).padStart(2, '0')} ET — {open.length ? `${open.map((session) => session.label).join(' + ')} ${open.length > 1 ? 'overlap' : 'open'}` : 'no major session currently open'}</p>
    <div className="space-y-3">{data.sessions.map((session) => { const active = isOpen(session.startMinutes, session.endMinutes); return <div key={session.id}><div className="mb-1 flex justify-between text-xs"><span className={gold ? 'font-semibold text-on-surface' : 'font-semibold text-paper'}>{session.label}</span><span className={active ? 'text-emerald-500' : gold ? 'text-on-surface-variant' : 'text-paper-3'}>{range(session.startMinutes)}–{range(session.endMinutes)} ET · {active ? 'OPEN' : 'Closed'}</span></div><div className={gold ? 'h-2 overflow-hidden rounded-full bg-surface-container-high' : 'h-2 overflow-hidden rounded-full bg-ink-2'}><div className={active ? 'h-full w-full rounded-full bg-emerald-500' : 'h-full w-1/3 rounded-full bg-ink-line'} /></div></div>; })}</div>
  </section>;
}
