// =============================================================================
// IELTS — Practice Tests tab.
// -----------------------------------------------------------------------------
// Lists the full IELTS practice tests and launches the shared IeltsTestRunner.
// Holds the selected-test state; onExit clears it and returns to the catalogue.
// =============================================================================
import React, { useState } from 'react';
import { ClipboardList, BookOpen, Headphones, Edit3, Mic, ArrowRight, Lock } from 'lucide-react';
import { IELTS_TESTS } from '../ieltsTests';
import IeltsTestRunner from '../IeltsTestRunner';
import { IeltsTest } from '../../types';
import { FREE_TESTS } from '../../access';
import { useEnglishStats } from '../../stats';

export default function IeltsTestsTab({
  allContent,
  onUpgrade,
}: {
  allContent: boolean;
  onUpgrade: () => void;
}) {
  const { requireAccount } = useEnglishStats();
  const [selected, setSelected] = useState<IeltsTest | null>(null);

  if (selected) {
    return <IeltsTestRunner test={selected} onExit={() => setSelected(null)} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-paper" /> Practice Tests
        </h2>
        <p className="text-paper-2 mt-1">
          Бүрэн дөрвөн ур чадварын дасгал шалгалт — Reading, Listening, Writing, Speaking.
        </p>
      </div>

      <div className="grid gap-4">
        {IELTS_TESTS.map((t, i) => {
          const locked = !allContent && i >= FREE_TESTS;
          return (
            <button
              key={t.id}
              onClick={() => {
                if (locked) { onUpgrade(); return; }
                if (!requireAccount()) return; // guests browse the catalogue; taking a test needs an account
                setSelected(t);
              }}
              className={`group text-left rounded-2xl bg-ink-raise hover:bg-ink-2 p-5 transition-colors ${locked ? 'opacity-80' : ''}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-primary-container text-on-primary-container px-2.5 py-0.5 text-xs font-bold">
                  {t.module}
                </span>
                <span className="text-xs text-paper-2">{t.source}</span>
                {locked && (
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-ink-2 px-2.5 py-0.5 text-xs font-bold text-paper-2">
                    <Lock className="w-3 h-3" /> Pro
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-paper">{t.title}</h3>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-paper-2">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> {t.reading.length} passages
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Headphones className="w-4 h-4" /> {t.listening.length} sections
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4" /> {t.writing.length} tasks
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mic className="w-4 h-4" /> {t.speaking.length} parts
                </span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-primary font-semibold">
                {locked ? (
                  <>
                    <Lock className="w-4 h-4" /> Pro-оор нээх
                  </>
                ) : (
                  <>
                    Шалгалт эхлүүлэх
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
