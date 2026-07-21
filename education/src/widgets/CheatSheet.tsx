import React from 'react';
import { useTheme } from '../../../frontend/src/lib/theme';

export default function CheatSheet({ data }: { data: { head: string[]; rows: string[][] } }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const tone = (value: string) => value.includes('▲') ? 'text-emerald-500' : value.includes('▼') ? 'text-rose-500' : 'text-amber-500';
  return (
    <section className={gold ? 'overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container p-4' : 'overflow-x-auto rounded-2xl border border-ink-line bg-ink-raise p-4'}>
      <h3 className={gold ? 'mb-3 font-space text-lg font-bold text-on-surface' : 'mb-3 font-serif text-xl font-light text-paper'}>Quick reaction cheat sheet</h3>
      <table className="w-full min-w-[620px] text-left text-xs">
        <thead><tr>{data.head.map((cell) => <th key={cell} className={gold ? 'border-b border-outline-variant px-3 py-2 text-on-surface-variant' : 'border-b border-ink-line px-3 py-2 text-paper-2'}>{cell}</th>)}</tr></thead>
        <tbody>{data.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className={gold ? `border-b border-outline-variant/60 px-3 py-2.5 ${cellIndex ? tone(cell) : 'font-semibold text-on-surface'}` : `border-b border-ink-line/60 px-3 py-2.5 ${cellIndex ? tone(cell) : 'font-semibold text-paper'}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </section>
  );
}
