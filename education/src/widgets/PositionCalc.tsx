import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import { useTheme } from '../../../frontend/src/lib/theme';
import type { ImpactData } from '../content';

export default function PositionCalc({ data }: { data: ImpactData['positionSizeCalculator'] }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const [account, setAccount] = useState(data.defaults.account);
  const [riskPct, setRiskPct] = useState(data.defaults.riskPct);
  const [instrument, setInstrument] = useState(data.defaults.instrument);
  const [stopPoints, setStopPoints] = useState(data.defaults.stopPoints);
  const result = useMemo(() => {
    const item = data.instruments[instrument] || Object.values(data.instruments)[0];
    const valid = account > 0 && riskPct > 0 && stopPoints > 0;
    if (!valid || !item) return null;
    const dollarRisk = account * (riskPct / 100);
    const contracts = Math.floor(dollarRisk / (stopPoints * item.perPoint));
    return { item, dollarRisk, contracts, actualRisk: contracts * stopPoints * item.perPoint };
  }, [account, riskPct, instrument, stopPoints, data.instruments]);
  const money = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const input = gold ? 'w-full rounded-xl border border-outline-variant bg-surface-container-high px-3 py-2 text-sm text-on-surface' : 'w-full rounded-xl border border-ink-line bg-ink-2 px-3 py-2 text-sm text-paper';
  return <section className={gold ? 'rounded-2xl border border-outline-variant bg-surface-container p-5' : 'rounded-2xl border border-ink-line bg-ink-raise p-5'}>
    <div className="mb-4 flex items-center gap-2"><Calculator className={gold ? 'h-5 w-5 text-on-surface-variant' : 'h-5 w-5 text-paper-2'} /><h3 className={gold ? 'font-space text-lg font-bold text-on-surface' : 'font-serif text-xl font-light text-paper'}>Position size calculator</h3></div>
    <div className="grid gap-3 sm:grid-cols-2">
      <label className={gold ? 'text-xs text-on-surface-variant' : 'text-xs text-paper-2'}>Account size<input className={input} type="number" min="0" value={account} onChange={(event) => setAccount(Number(event.target.value))} /></label>
      <label className={gold ? 'text-xs text-on-surface-variant' : 'text-xs text-paper-2'}>Risk per trade (%)<input className={input} type="number" min="0" step="0.1" value={riskPct} onChange={(event) => setRiskPct(Number(event.target.value))} /></label>
      <label className={gold ? 'text-xs text-on-surface-variant' : 'text-xs text-paper-2'}>Instrument<select className={input} value={instrument} onChange={(event) => setInstrument(event.target.value)}>{Object.keys(data.instruments).map((key) => <option key={key}>{key}</option>)}</select></label>
      <label className={gold ? 'text-xs text-on-surface-variant' : 'text-xs text-paper-2'}>Stop distance (points)<input className={input} type="number" min="0" step="0.25" value={stopPoints} onChange={(event) => setStopPoints(Number(event.target.value))} /></label>
    </div>
    <p className={gold ? 'mt-3 text-xs text-on-surface-variant' : 'mt-3 text-xs text-paper-2'}>{result?.item.caption}</p>
    <div className="mt-4 grid grid-cols-3 gap-2">{[['Risk budget', result ? money(result.dollarRisk) : '—'], ['Contracts', result ? String(result.contracts) : '—'], ['Actual risk', result ? money(result.actualRisk) : '—']].map(([label, value]) => <div key={label} className={gold ? 'rounded-xl bg-surface-container-high p-3 text-center' : 'rounded-xl bg-ink-2 p-3 text-center'}><p className={gold ? 'text-[10px] uppercase tracking-widest text-on-surface-variant' : 'text-[10px] uppercase tracking-widest text-paper-3'}>{label}</p><p className={gold ? 'mt-1 font-space font-bold text-on-surface' : 'mt-1 font-serif text-lg text-paper'}>{value}</p></div>)}</div>
    {result?.contracts === 0 && <p className="mt-3 text-xs text-amber-500">This stop is too wide for one contract at this risk budget; consider micros, a tighter stop, or a different risk budget.</p>}
  </section>;
}
