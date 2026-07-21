import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../../frontend/src/lib/theme';
import type { GlossaryItem } from './content';

export default function GlossaryPanel({ glossary }: { glossary: GlossaryItem[] }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => { const normalized = query.trim().toLowerCase(); return !normalized ? glossary : glossary.filter((item) => `${item.term} ${item.def}`.toLowerCase().includes(normalized)); }, [glossary, query]);
  return <section className={gold ? 'rounded-3xl border border-outline-variant bg-surface-container p-5 md:p-7' : 'rounded-3xl border border-ink-line bg-ink-raise p-5 md:p-7'}>
    <p className={gold ? 'text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant' : 'text-[10px] font-bold uppercase tracking-[0.2em] text-paper-3'}>66 terms · search term or definition</p><h2 className={gold ? 'mt-1 font-space text-2xl font-bold text-on-surface' : 'mt-1 font-serif text-3xl font-light text-paper'}>Market glossary</h2>
    <label className={gold ? 'mt-5 flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-high px-3 py-2 text-on-surface-variant' : 'mt-5 flex items-center gap-2 rounded-xl border border-ink-line bg-ink-2 px-3 py-2 text-paper-2'}><Search className="h-4 w-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search: hawkish, yield, risk…" className={gold ? 'w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant' : 'w-full bg-transparent text-sm text-paper outline-none placeholder:text-paper-3'} /></label>
    <p className={gold ? 'mt-3 text-xs text-on-surface-variant' : 'mt-3 text-xs text-paper-3'}>{filtered.length} matching terms</p>
    <dl className="mt-4 grid gap-3 md:grid-cols-2">{filtered.map((item) => <div key={item.term} className={gold ? 'rounded-xl bg-surface-container-high p-4' : 'rounded-xl bg-ink-2 p-4'}><dt className={gold ? 'font-space font-bold text-on-surface' : 'font-serif text-lg text-paper'}>{item.term}</dt><dd className={gold ? 'mt-1 text-sm leading-6 text-on-surface-variant' : 'mt-1 text-sm leading-6 text-paper-2'}>{item.def}</dd></div>)}</dl>
  </section>;
}
