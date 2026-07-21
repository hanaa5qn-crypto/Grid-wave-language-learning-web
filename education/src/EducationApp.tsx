// =============================================================================
// Education track — Market Analysis. Chrome mirrors english/src/AppShell.tsx
// (fixed 280px sidebar: brand, user panel, section nav, settings/switch/logout
// footer; mobile: fixed top header + slide-in drawer) so the tracks feel like
// one product. Content is fetched at runtime from /education/*.json.
// =============================================================================
import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronRight, Globe, Loader2, LogOut, Menu, Settings, X } from 'lucide-react';
import { useTheme } from '../../frontend/src/lib/theme';
import { logOutUser, subscribeToProfileUpdates } from '../../frontend/src/auth';
import { UserProfile } from '../../frontend/src/profiles';
import AccountScreen from '../../frontend/src/AccountScreen';
import CardRenderer from './CardRenderer';
import { fetchEducationContent, fetchEducationImpact, fetchEducationQuizzes, type ContentData, type ImpactData, type QuizData } from './content';
import GlossaryPanel from './GlossaryPanel';
import QuizPanel from './QuizPanel';
import { isSectionCelebrated, sectionProgress, useEducationProgress } from './progress';

// Brand mark — paper gradient, same as the German/English shells.
function BrandLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="edu-brand-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ededeb" />
          <stop offset="1" stopColor="#9b9893" />
        </linearGradient>
      </defs>
      <circle cx="13" cy="19" r="9" fill="url(#edu-brand-grad)" />
      <line x1="43" y1="16" x2="30" y2="48" stroke="url(#edu-brand-grad)" strokeWidth="18" strokeLinecap="round" />
    </svg>
  );
}

function SectionNavButton({ section, active, gold, onPick }: { key?: React.Key; section: ContentData['sections'][number]; active: boolean; gold: boolean; onPick: () => void }) {
  const stats = sectionProgress(section.id, section.cards.length);
  const ringTone = stats.pct === 100 ? 'border-emerald-500 text-emerald-500' : gold ? 'border-outline-variant text-on-surface-variant' : 'border-ink-line text-paper-3';
  const buttonClass = active
    ? gold ? 'flex w-full items-center gap-3 rounded-r-lg border-l-4 border-secondary bg-surface-container py-3 pl-3 text-left text-on-surface' : 'flex w-full items-center gap-3 rounded-r-lg border-l-4 border-paper bg-ink-raise py-3 pl-3 text-left text-paper'
    : gold ? 'flex w-full items-center gap-3 rounded-r-lg py-3 pl-4 text-left text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface' : 'flex w-full items-center gap-3 rounded-r-lg py-3 pl-4 text-left text-paper-2 hover:bg-ink-raise hover:text-paper';
  return (
    <button onClick={onPick} className={buttonClass}>
      <span className={'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ' + ringTone}>{section.cards.length ? String(stats.pct) + '%' : <BookOpen className="h-3.5 w-3.5" />}</span>
      <span className="min-w-0"><span className="block truncate text-sm font-bold">{section.name}</span><span className={gold ? 'block truncate text-[10px] text-on-surface-variant' : 'block truncate text-[10px] text-paper-3'}>{section.sub}</span></span>
      {active ? <ChevronRight className="ml-auto h-4 w-4 shrink-0" /> : null}
    </button>
  );
}

export default function EducationApp({ onSwitchLanguage }: { onSwitchLanguage: () => void }) {
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const [content, setContent] = useState<ContentData | null>(null);
  const [impact, setImpact] = useState<ImpactData | null>(null);
  const [quizzes, setQuizzes] = useState<QuizData>({});
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEducationProgress();

  useEffect(() => subscribeToProfileUpdates(setProfile), []);

  useEffect(() => {
    let live = true;
    void Promise.all([fetchEducationContent(), fetchEducationImpact(), fetchEducationQuizzes()])
      .then(([nextContent, nextImpact, nextQuizzes]) => { if (live) { setContent(nextContent); setImpact(nextImpact); setQuizzes(nextQuizzes); } })
      .catch(() => { if (live) setError(true); });
    return () => { live = false; };
  }, []);

  useEffect(() => {
    if (!content) return;
    const syncHash = () => {
      const requested = window.location.hash.replace(/^#/, '');
      if (content.sections.some((section) => section.id === requested)) setActiveId(requested);
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [content]);

  const pickSection = (id: string) => {
    setActiveId(id);
    setDrawerOpen(false);
    if (window.location.hash !== `#${id}`) window.location.hash = id;
  };

  if (error) return <main className={gold ? 'min-h-screen bg-surface p-6 text-on-surface font-sans' : 'min-h-screen bg-ink p-6 text-paper font-sans'}><p>Education content could not be loaded. Please refresh and try again.</p></main>;
  if (!content) return <main className={gold ? 'min-h-screen bg-surface text-on-surface font-sans flex items-center justify-center' : 'min-h-screen bg-ink text-paper font-sans flex items-center justify-center'}><Loader2 className={gold ? 'h-7 w-7 animate-spin text-on-surface-variant' : 'h-7 w-7 animate-spin text-paper-2'} /><span className="sr-only">Loading Market Analysis</span></main>;

  const active = content.sections.find((section) => section.id === activeId) || content.sections[0];
  const quiz = active && quizzes[active.id as keyof QuizData];
  const signedIn = !!profile && !profile.isGuest;
  const name = profile?.name || 'Зочин';
  const avatar = profile?.avatar || '';
  const footerButton = gold ? 'flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer' : 'flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left text-paper-2 hover:text-paper hover:bg-ink-raise transition-colors cursor-pointer';
  const footerIcon = gold ? 'w-4 h-4 text-outline' : 'w-4 h-4 text-paper-3';

  // Full sidebar body, shared by the desktop sidebar and the mobile drawer —
  // same structure as AppShell: brand, user panel, nav, footer.
  const SidebarBody = (
    <>
      <h1 className="flex items-center gap-2 font-serif text-2xl font-light tracking-tight">
        <BrandLogo className="w-8 h-8" />
        <span><span className={gold ? 'text-on-surface' : 'text-paper'}>Vivid</span> <span className={gold ? 'text-on-surface-variant' : 'text-paper-2'}>Lingua</span></span>
        <span className={gold ? 'ml-1 rounded-full bg-surface-container-high px-2 py-0.5 text-xs font-semibold text-on-surface' : 'ml-1 rounded-full bg-ink-2 px-2 py-0.5 text-xs font-semibold text-paper'}>Markets</span>
      </h1>

      {/* User panel → opens settings (like the other tracks' user panel → dashboard) */}
      <button
        onClick={() => { if (signedIn) { setSettingsOpen(true); setDrawerOpen(false); } }}
        className={gold ? 'flex w-full cursor-pointer items-center gap-3 rounded-xl border border-on-background bg-surface-container p-3 text-left transition-colors hover:bg-surface-container-high' : 'flex w-full cursor-pointer items-center gap-3 rounded-xl border border-ink-line bg-ink-raise p-3 text-left transition-colors hover:bg-ink-2'}
      >
        <div className={gold ? 'h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-on-background bg-surface-container-high' : 'h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-ink-line bg-ink-2'}>
          {avatar ? <img alt={name} className="h-full w-full object-cover" src={avatar} /> : null}
        </div>
        <div className="overflow-hidden">
          <p className={gold ? 'text-[10px] font-black uppercase tracking-wider text-on-surface-variant' : 'text-[10px] font-black uppercase tracking-wider text-paper-2'}>Markets</p>
          <h2 className={gold ? 'truncate text-[15px] font-extrabold leading-tight text-on-surface' : 'truncate text-[15px] font-extrabold leading-tight text-paper'}>{name}</h2>
          <p className={gold ? 'mt-0.5 truncate text-[11px] leading-none text-on-surface-variant' : 'mt-0.5 truncate text-[11px] leading-none text-paper-2'}>{signedIn ? 'Эдийн засаг' : 'Зочин'}</p>
        </div>
      </button>

      {/* Section nav */}
      <ul className="mt-2 flex flex-grow flex-col gap-2 overflow-y-auto pr-1">
        {content.sections.map((section) => <li key={section.id}><SectionNavButton section={section} active={section.id === active.id} gold={gold} onPick={() => pickSection(section.id)} /></li>)}
      </ul>

      {/* Footer: settings / switch language / log out — mirrors AppShell */}
      <div className={gold ? 'flex flex-col gap-1 border-t border-on-background pt-4' : 'flex flex-col gap-1 border-t border-ink-line pt-4'}>
        {signedIn && (
          <button onClick={() => { setSettingsOpen(true); setDrawerOpen(false); }} className={footerButton}>
            <Settings className={footerIcon} />
            <span className="text-sm">Тохиргоо</span>
          </button>
        )}
        <button onClick={() => { onSwitchLanguage(); setDrawerOpen(false); }} className={footerButton}>
          <Globe className={footerIcon} />
          <span className="text-sm">Switch language</span>
        </button>
        <button onClick={() => { void logOutUser(); setDrawerOpen(false); }} className={gold ? 'flex w-full cursor-pointer items-center gap-3 rounded-lg py-2 px-4 text-left font-bold text-on-surface transition-colors hover:bg-surface-container-high hover:text-on-surface-variant' : 'flex w-full cursor-pointer items-center gap-3 rounded-lg py-2 px-4 text-left font-bold text-paper transition-colors hover:bg-ink-raise hover:text-paper-2'}>
          <LogOut className={footerIcon} />
          <span className="text-sm">Гарах</span>
        </button>
      </div>
    </>
  );

  return <div className={gold ? 'min-h-screen flex bg-surface text-on-surface font-sans' : 'min-h-screen flex bg-ink text-paper font-sans'}>
    {/* Desktop sidebar */}
    <nav aria-label="Menu" className={gold ? 'hidden md:flex flex-col h-screen py-8 px-4 gap-y-6 bg-surface w-[280px] fixed left-0 top-0 text-on-surface border-r border-on-background select-none z-30 shadow-[4px_0_24px_rgba(0,0,0,0.6)]' : 'hidden md:flex flex-col h-screen py-8 px-4 gap-y-6 bg-ink w-[280px] fixed left-0 top-0 text-paper border-r border-ink-line select-none z-30 shadow-[4px_0_24px_rgba(0,0,0,0.6)]'}>
      {SidebarBody}
    </nav>

    {/* Mobile top header */}
    <header className={gold ? 'md:hidden flex justify-between items-center w-full px-4 h-16 bg-surface-container border-b border-on-background fixed top-0 left-0 z-40' : 'md:hidden flex justify-between items-center w-full px-4 h-16 bg-ink-raise border-b border-ink-line fixed top-0 left-0 z-40'}>
      <button onClick={() => setDrawerOpen((v) => !v)} className={gold ? 'text-on-surface p-2 border border-on-background rounded-lg bg-surface-container hover:bg-surface-container-high cursor-pointer' : 'text-paper p-2 border border-ink-line rounded-lg bg-ink-raise hover:bg-ink-2 cursor-pointer'} aria-label="Menu">
        <Menu className="w-5 h-5" />
      </button>
      <h1 className={gold ? 'text-xl font-light font-space text-on-surface tracking-tight flex items-center gap-2' : 'text-xl font-light font-serif text-paper tracking-tight flex items-center gap-2'}>
        <BrandLogo className="w-6 h-6" /> Vivid Lingua
      </h1>
      <div className="w-12" />
    </header>

    {/* Mobile drawer */}
    {drawerOpen && (
      <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setDrawerOpen(false)}>
        <div className={gold ? 'w-[280px] h-full bg-surface py-8 px-4 flex flex-col gap-y-6 text-on-surface border-r border-on-background animate-slide-right relative' : 'w-[280px] h-full bg-ink py-8 px-4 flex flex-col gap-y-6 text-paper border-r border-ink-line animate-slide-right relative'} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setDrawerOpen(false)} className={gold ? 'absolute top-3 right-3 text-on-surface-variant hover:text-on-surface p-1' : 'absolute top-3 right-3 text-paper-2 hover:text-paper p-1'} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
          {SidebarBody}
        </div>
      </div>
    )}

    {/* Main content — offset for the sidebar (desktop) and the fixed header (mobile) */}
    <main className={gold ? 'flex-1 md:ml-[280px] pt-16 md:pt-0 min-h-screen bg-surface w-full' : 'flex-1 md:ml-[280px] pt-16 md:pt-0 min-h-screen bg-ink w-full'}>
      <div className="mx-auto max-w-4xl px-4 py-6 pb-16 md:px-8 md:py-10">
        <div className="mb-6">
          <p className={gold ? 'text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant' : 'text-[10px] font-bold uppercase tracking-[0.2em] text-paper-3'}>{active.sub}</p>
          <h2 className={gold ? 'mt-1 font-space text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl' : 'mt-1 font-serif text-4xl font-light tracking-tight text-paper'}>{active.name}</h2>
        </div>
        {active.id === 'glossary' ? <GlossaryPanel glossary={content.glossary} /> : <div className="space-y-5">
          {active.cards.map((card, index) => <CardRenderer key={card.id} card={card} sectionId={active.id} cardIndex={index} cardsTotal={active.cards.length} impact={impact} />)}
          {active.cards.length > 0 && sectionProgress(active.id, active.cards.length).pct === 100 && isSectionCelebrated(active.id) && <p className={gold ? 'rounded-xl bg-surface-container-high p-4 text-sm text-on-surface-variant' : 'rounded-xl bg-ink-2 p-4 text-sm text-paper-2'}>Section complete — every card here is marked as learned.</p>}
          {quiz && quiz.length > 0 && <QuizPanel quizKey={active.id} questions={quiz} />}
        </div>}
      </div>
    </main>

    {/* Settings overlay ON TOP of the track (same pattern as english/src/stats.tsx) */}
    {settingsOpen && profile && (
      <div className={gold ? 'fixed inset-0 z-[200] bg-surface overflow-y-auto' : 'fixed inset-0 z-[200] bg-ink overflow-y-auto'}>
        <AccountScreen
          mode="settings"
          profile={profile}
          onSaved={setProfile}
          onLogout={() => { void logOutUser(); }}
          onSwitchLanguage={onSwitchLanguage}
          onClose={() => setSettingsOpen(false)}
        />
      </div>
    )}
  </div>;
}
