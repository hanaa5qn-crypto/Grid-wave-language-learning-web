import React, { useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { resourcesFor, SkillTab } from '../externalResources';
import type { Level } from '../library';
import { useTheme } from '../lib/theme';

export default function ExternalResourcesPanel({ skill, level }: { skill: SkillTab; level: Level | 'all' }) {
  const [open, setOpen] = useState(false);
  const items = resourcesFor(skill, level);
  const themeName = useTheme();
  const gold = themeName === 'gold';
  const aurora = themeName === 'aurora';
  if (items.length === 0) return null;
  return (
    <div className={gold || aurora ? "mt-6 border-2 border-on-background rounded-xl block-shadow overflow-hidden" : "mt-6 border border-ink-line rounded-xl overflow-hidden"}>
      <button onClick={() => setOpen(v => !v)}
        className={gold || aurora ? "w-full flex items-center justify-between px-5 py-3.5 bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors" : "w-full flex items-center justify-between px-5 py-3.5 bg-ink-raise cursor-pointer hover:bg-ink-2 transition-colors"}>
        <span className={gold || aurora ? "flex items-center gap-2 text-sm font-bold font-space text-on-surface" : "flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-paper"}>
          <ExternalLink className={gold || aurora ? "w-4 h-4 text-secondary" : "w-4 h-4 text-paper-2"} />
          Гадны шилдэг эх сурвалжууд {level !== 'all' && <span className={gold || aurora ? "text-xs font-black px-1.5 py-0.5 rounded bg-secondary text-white" : "text-xs font-medium px-1.5 py-0.5 rounded bg-ink-raise text-paper-2"}>{level}</span>}
          <span className={gold || aurora ? "text-xs text-on-surface-variant font-medium" : "text-xs text-paper-3 font-medium"}>({items.length})</span>
        </span>
        <ChevronRight className={gold || aurora ? `w-4 h-4 text-on-surface-variant transition-transform ${open ? 'rotate-90' : ''}` : `w-4 h-4 text-paper-2 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className={gold || aurora ? "p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-surface-container-low" : "p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-ink-raise"}>
          {items.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
              className={gold || aurora ? "block p-3 rounded-lg border-2 border-on-background bg-surface-container hover:bg-surface-container-high transition-colors group" : "block p-3 rounded-lg border border-ink-line bg-ink-raise hover:border-ink-line-2 hover:bg-ink-2 transition-colors group"}>
              <div className="flex items-center gap-2 mb-1">
                <span className={gold || aurora ? "text-sm font-bold text-on-surface group-hover:text-primary" : "text-sm font-medium text-paper group-hover:text-paper"}>{r.name}</span>
                <ExternalLink className={gold || aurora ? "w-3 h-3 text-on-surface-variant shrink-0" : "w-3 h-3 text-paper-2 shrink-0"} />
                <span className="ml-auto flex gap-1">
                  {r.levels.slice(0, 6).map(lv => (
                    <span key={lv} className={gold || aurora ? "text-[9px] font-black px-1 py-0.5 rounded bg-secondary-container text-on-secondary-fixed" : "text-[9px] font-medium px-1 py-0.5 rounded bg-ink-raise text-paper-2"}>{lv}</span>
                  ))}
                </span>
              </div>
              <p className={gold || aurora ? "text-xs text-on-surface-variant leading-relaxed" : "text-xs text-paper-2 leading-relaxed"}>{r.descMn}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
