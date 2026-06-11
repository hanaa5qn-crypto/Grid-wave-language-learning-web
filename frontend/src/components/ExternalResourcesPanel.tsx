import React, { useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { resourcesFor, SkillTab } from '../externalResources';
import type { Level } from '../library';

export default function ExternalResourcesPanel({ skill, level }: { skill: SkillTab; level: Level | 'all' }) {
  const [open, setOpen] = useState(false);
  const items = resourcesFor(skill, level);
  if (items.length === 0) return null;
  return (
    <div className="mt-6 border-2 border-on-background rounded-xl block-shadow overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-surface-container cursor-pointer hover:bg-surface-container-high transition-colors">
        <span className="flex items-center gap-2 text-sm font-bold font-space text-on-surface">
          <ExternalLink className="w-4 h-4 text-secondary" />
          Гадны шилдэг эх сурвалжууд {level !== 'all' && <span className="text-xs font-black px-1.5 py-0.5 rounded bg-secondary text-white">{level}</span>}
          <span className="text-xs text-on-surface-variant font-medium">({items.length})</span>
        </span>
        <ChevronRight className={`w-4 h-4 text-on-surface-variant transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-surface-container-low">
          {items.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
              className="block p-3 rounded-lg border-2 border-on-background bg-surface-container hover:bg-surface-container-high transition-colors group">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-on-surface group-hover:text-primary">{r.name}</span>
                <ExternalLink className="w-3 h-3 text-on-surface-variant shrink-0" />
                <span className="ml-auto flex gap-1">
                  {r.levels.slice(0, 6).map(lv => (
                    <span key={lv} className="text-[9px] font-black px-1 py-0.5 rounded bg-secondary-container text-on-secondary-fixed">{lv}</span>
                  ))}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{r.descMn}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
