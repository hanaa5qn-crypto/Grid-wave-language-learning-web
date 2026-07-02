import React, { useEffect, useState } from 'react';
import { GraduationCap, Globe, BookMarked, Sigma, ArrowRight, LogOut, Sparkles, Lock } from 'lucide-react';
import IeltsApp from './ielts/IeltsApp';
import SatApp from './sat/SatApp';
import { EnglishStatsProvider, useEnglishStats } from './stats';
import { useEnglishAccess } from './access';
import EnglishUpgrade from './EnglishUpgrade';

// Brand mark — matches the German track's logo so the tracks feel like one product.
function BrandLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="en-brand-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ededeb" />
          <stop offset="1" stopColor="#9b9893" />
        </linearGradient>
      </defs>
      <circle cx="13" cy="19" r="9" fill="url(#en-brand-grad)" />
      <line x1="43" y1="16" x2="30" y2="48" stroke="url(#en-brand-grad)" strokeWidth="18" strokeLinecap="round" />
    </svg>
  );
}

// Pressing "English" lands here: two separate, fully tailored exam apps.
type Exam = 'ielts' | 'sat';
const EXAM_KEY = 'vivid-english-exam';

function isExam(v: string | null): v is Exam {
  return v === 'ielts' || v === 'sat';
}

function ExamChooser({ onPick, onSwitchLanguage }: { onPick: (e: Exam) => void; onSwitchLanguage?: () => void }) {
  const { logout } = useEnglishStats();
  return (
    <div className="min-h-screen bg-ink text-paper font-sans flex flex-col">
      <header className="border-b border-ink-line/50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif font-bold text-lg tracking-tight">
            <BrandLogo className="w-8 h-8" />
            <span><span className="text-paper">Vivid</span> Lingua</span>
            <span className="ml-2 text-xs font-semibold rounded-full bg-ink-2 text-paper px-2 py-0.5">English</span>
          </div>
          <div className="flex items-center gap-3">
            {onSwitchLanguage && (
              <button onClick={onSwitchLanguage} className="inline-flex items-center gap-2 text-sm text-paper-2 hover:text-paper">
                <Globe className="w-4 h-4" /> <span className="hidden sm:inline">Switch language</span>
              </button>
            )}
            <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-paper-2 hover:text-paper">
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Гарах</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl text-center py-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-tight mb-3">Which exam are you preparing for?</h1>
          <p className="text-paper-2 text-lg mb-10">
            Аль шалгалтад бэлдэх вэ? Тус бүр нь өөрийн гэсэн бүрэн сургалттай.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <button
              onClick={() => onPick('ielts')}
              className="group text-left rounded-3xl bg-ink-raise hover:bg-ink-2 p-7 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-2xl bg-ink-2 text-paper p-3"><BookMarked className="w-7 h-7" /></span>
                <span className="text-2xl font-bold">IELTS</span>
              </div>
              <p className="text-paper-2">
                Four skills — Reading, Listening, Writing &amp; Speaking — with full practice tests, band scoring, and AI feedback in Mongolian.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-paper font-semibold">
                Start IELTS <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => onPick('sat')}
              className="group text-left rounded-3xl bg-ink-raise hover:bg-ink-2 p-7 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-2xl bg-ink-2 text-paper p-3"><Sigma className="w-7 h-7" /></span>
                <span className="text-2xl font-bold">SAT</span>
              </div>
              <p className="text-paper-2">
                Digital SAT — Reading &amp; Writing and Math — with adaptive-style modules, full practice tests, and SAT vocabulary.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-paper font-semibold">
                Start SAT <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <div
              aria-disabled="true"
              className="relative text-left rounded-3xl bg-ink-raise/60 border-2 border-dashed border-ink-line p-7 opacity-80 cursor-not-allowed sm:col-span-2"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-2xl bg-ink-2 text-paper p-3"><Sparkles className="w-7 h-7" /></span>
                <span className="text-2xl font-bold text-paper-2">Шинэ ном</span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-ink-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-paper-3">
                  <Lock className="w-3 h-3" /> Coming soon
                </span>
              </div>
              <p className="text-paper-2 text-left">
                Бэлэн болоход энд нэмэгдэнэ. Удахгүй.
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs text-paper-2 inline-flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Each is a complete, separate learning app tailored to the exam.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function EnglishApp({ onSwitchLanguage }: { onSwitchLanguage?: () => void }) {
  const [exam, setExam] = useState<Exam | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(EXAM_KEY);
      if (isExam(stored)) setExam(stored);
    } catch { /* ignore */ }
  }, []);

  function pick(next: Exam) {
    try { localStorage.setItem(EXAM_KEY, next); } catch { /* ignore */ }
    setExam(next);
  }
  function back() {
    try { localStorage.removeItem(EXAM_KEY); } catch { /* ignore */ }
    setExam(null);
  }

  const access = useEnglishAccess();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const onUpgrade = () => setUpgradeOpen(true);

  let content;
  if (exam === 'ielts') {
    content = <IeltsApp onBack={back} onSwitchLanguage={onSwitchLanguage} access={access} onUpgrade={onUpgrade} />;
  } else if (exam === 'sat') {
    content = <SatApp onBack={back} onSwitchLanguage={onSwitchLanguage} access={access} onUpgrade={onUpgrade} />;
  } else {
    content = <ExamChooser onPick={pick} onSwitchLanguage={onSwitchLanguage} />;
  }

  // Wrap every English view in the shared stats provider so the streak + study
  // time tracker run the whole time the English track is open (mirrors how the
  // German App tracks study while it is mounted), against the shared profile.
  // The upgrade modal lives alongside it, opened by the content-level paywalls.
  return (
    <EnglishStatsProvider onSwitchLanguage={onSwitchLanguage}>
      {content}
      <EnglishUpgrade open={upgradeOpen} onClose={() => setUpgradeOpen(false)} currentPlan={access.plan} />
    </EnglishStatsProvider>
  );
}
