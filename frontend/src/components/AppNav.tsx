import React from 'react';
import {
  BookOpen, Headphones, Mic, Edit3, Languages, Settings, LogOut, Flame,
  Sparkles, GraduationCap, Target, Swords,
} from 'lucide-react';
import { TabType } from '../types';
import { UserProfile } from '../profiles';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../lib/theme';

interface AppSidebarProps {
  currentUser: UserProfile | null;
  activeTab: TabType;
  selectTab: (tab: TabType) => void;
  streak: number;
  dueCount: number;
  logoutUser: () => void;
}

// Shared Sidebar - Visible on Desktop only
export function AppSidebar({
  currentUser,
  activeTab,
  selectTab,
  streak,
  dueCount,
  logoutUser,
}: AppSidebarProps) {
  // Gold theme restores the original "Atelier Press" nav chrome verbatim;
  // aurora restores the original violet "Aurora Atelier" chrome verbatim.
  const theme = useTheme();
  const gold = theme === 'gold';
  const aurora = theme === 'aurora';
  const navTab = (active: boolean) =>
    gold || aurora
      ? `flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
          active
            ? 'text-on-primary border-l-4 border-secondary bg-white/15'
            : 'text-on-primary-container hover:text-secondary-fixed hover:bg-white/5'
        }`
      : `flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
          active
            ? 'text-paper border-l-4 border-paper bg-ink-raise'
            : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
        }`;
  // Simple active-icon tint for read/listen/speak/write/vocab.
  const navIcon = (active: boolean) => (active ? (gold || aurora ? 'text-secondary-fixed' : 'text-paper') : '');
  return (
      <nav aria-label="Desktop menu" className={gold ? 'hidden md:flex flex-col h-screen py-8 px-4 gap-y-6 bg-surface-container-lowest w-[280px] fixed left-0 top-0 text-on-surface border-r border-outline-variant select-none z-30 shadow-[4px_0_24px_rgba(0,0,0,0.6)]' : aurora ? 'hidden md:flex flex-col h-screen py-8 px-4 gap-y-6 bg-[#04040a] w-[280px] fixed left-0 top-0 text-white border-r border-white/10 select-none z-30 shadow-[4px_0_24px_rgba(0,0,0,0.5)]' : 'hidden md:flex flex-col h-screen py-8 px-4 gap-y-6 bg-ink w-[280px] fixed left-0 top-0 text-paper border-r border-ink-line select-none z-30 shadow-[4px_0_24px_rgba(0,0,0,0.6)]'}>
        <div>
          <h1 className={gold || aurora ? 'text-2xl font-black tracking-tight font-space flex items-center gap-2' : 'text-2xl font-light tracking-tight font-serif flex items-center gap-2'}>
            <BrandLogo className="w-8 h-8" />
            {gold
              ? <span><span className="text-primary">Vivid</span> Lingua</span>
              : aurora
              ? <span><span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Vivid</span> Lingua</span>
              : <span><span className="text-paper">Vivid</span> <span className="text-paper-2">Lingua</span></span>}
          </h1>
        </div>

        {/* User Context Avatar Panel */}
        {currentUser ? (
          <div className={gold || aurora ? 'flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors' : 'flex items-center gap-3 bg-ink-raise p-3 rounded-xl border border-ink-line cursor-pointer hover:bg-ink-raise transition-colors'} onClick={() => selectTab('profile')}>
            <div className={gold ? 'w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-500/50' : aurora ? 'w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-500/50' : 'w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-ink-line'}>
              <img
                alt="Profile"
                className={gold || aurora ? 'w-full h-full object-cover bg-slate-800' : 'w-full h-full object-cover bg-ink-2'}
                src={currentUser.avatar}
              />
            </div>
            <div className="overflow-hidden">
              <p className={gold ? 'text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1' : aurora ? 'text-[10px] font-black uppercase text-purple-400 tracking-wider flex items-center gap-1' : 'text-[10px] font-black uppercase text-paper tracking-wider flex items-center gap-1'}>
                <Target className="w-2.5 h-2.5" /> {currentUser.targetLevel} ТҮВШИН
              </p>
              <h2 className={gold || aurora ? 'text-[15px] font-extrabold truncate text-white leading-tight' : 'text-[15px] font-extrabold truncate text-paper leading-tight'}>{currentUser.name}</h2>
              <p className={gold || aurora ? 'text-[11px] text-slate-400 truncate leading-none mt-0.5' : 'text-[11px] text-paper-2 truncate leading-none mt-0.5'}>{currentUser.role}</p>
            </div>
          </div>
        ) : (
          <div className={gold || aurora ? 'flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10' : 'flex items-center gap-3 bg-ink-raise p-3 rounded-xl border border-ink-line'}>
            <div className={gold || aurora ? 'w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/20 flex items-center justify-center bg-white/5 text-slate-400' : 'w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-ink-line flex items-center justify-center bg-ink-raise text-paper-2'}>
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div>
              <p className={gold || aurora ? 'text-xs text-slate-400' : 'text-xs text-paper-2'}>Сайн байна уу?</p>
              <h2 className="text-[16px] font-bold">Нэвтрээгүй</h2>
            </div>
          </div>
        )}

        {/* Dynamic Streak Badge Card */}
        <div>
          <div className={gold || aurora ? 'bg-white/5 text-white text-[14px] font-bold rounded-xl px-4 py-3 flex items-center justify-between border border-white/10' : 'bg-ink-raise text-paper text-[14px] font-bold rounded-xl px-4 py-3 flex items-center justify-between border border-ink-line'}>
            <span className={gold ? 'flex items-center gap-2 text-amber-300' : aurora ? 'flex items-center gap-2 text-purple-300' : 'flex items-center gap-2 text-paper-2'}>
              <Flame className={gold ? 'w-5 h-5 text-amber-400 fill-amber-400 animate-pulse' : aurora ? 'w-5 h-5 text-purple-400 fill-purple-400 animate-pulse' : 'w-5 h-5 text-paper fill-paper-2 animate-pulse'} />
              Streak: {streak} өдөр
            </span>
            <span className={gold ? 'text-[11px] font-space bg-primary text-on-primary px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide' : aurora ? 'text-[11px] font-space bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide' : 'text-[11px] font-serif bg-paper text-ink px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide'}>AUTO</span>
          </div>
        </div>

        {/* Tabs Lists layout */}
        <ul className="flex flex-col gap-2 flex-grow mt-2 overflow-y-auto pr-1">
          {currentUser && (
            <li>
              <button
                onClick={() => selectTab('profile')}
                className={navTab(activeTab === 'profile')}
              >
                <Target className={`w-5 h-5 ${navIcon(activeTab === 'profile')}`} />
                <span className="text-[14px] font-bold">Хяналтын самбар</span>
              </button>
            </li>
          )}
          <li>
            <button
              onClick={() => selectTab('read')}
              className={navTab(activeTab === 'read')}
            >
              <BookOpen className={`w-5 h-5 ${navIcon(activeTab === 'read')}`} />
              <span className="text-[14px] font-bold">Унших</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('listen')}
              className={navTab(activeTab === 'listen')}
            >
              <Headphones className={`w-5 h-5 ${navIcon(activeTab === 'listen')}`} />
              <span className="text-[14px] font-bold">Сонсох</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('speak')}
              className={navTab(activeTab === 'speak')}
            >
              <Mic className={`w-5 h-5 ${navIcon(activeTab === 'speak')}`} />
              <span className="text-[14px] font-bold">Ярих</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('write')}
              className={navTab(activeTab === 'write')}
            >
              <Edit3 className={`w-5 h-5 ${navIcon(activeTab === 'write')}`} />
              <span className="text-[14px] font-bold">Бичих</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('vocab')}
              className={navTab(activeTab === 'vocab')}
            >
              <Languages className={`w-5 h-5 ${navIcon(activeTab === 'vocab')}`} />
              <span className="text-[14px] font-bold flex-grow flex justify-between items-center pr-4">
                <span>Үгсийн сан</span>
                {dueCount > 0 && (
                  <span className={gold || aurora ? 'bg-red-500 text-white text-[10px] font-black font-space px-2 py-0.5 rounded-full' : 'bg-paper text-ink text-[10px] font-bold font-serif px-2 py-0.5 rounded-full'}>
                    {dueCount}
                  </span>
                )}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('translate')}
              className={navTab(activeTab === 'translate')}
            >
              <Sparkles className={gold ? `w-5 h-5 ${activeTab === 'translate' ? 'text-secondary-fixed text-amber-400' : ''}` : aurora ? `w-5 h-5 ${activeTab === 'translate' ? 'text-secondary-fixed text-purple-450' : ''}` : `w-5 h-5 ${activeTab === 'translate' ? 'text-paper text-paper' : ''}`} />
              <span className="text-[14px] font-bold">Орчуулагч</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('exam')}
              className={navTab(activeTab === 'exam')}
            >
              <GraduationCap className={gold ? `w-5 h-5 ${activeTab === 'exam' ? 'text-secondary-fixed' : ''} text-amber-400` : aurora ? `w-5 h-5 ${activeTab === 'exam' ? 'text-secondary-fixed' : ''} text-yellow-400` : `w-5 h-5 ${activeTab === 'exam' ? 'text-paper' : ''} text-paper`} />
              <span className="text-[14px] font-bold">Шалгалт</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('friends')}
              className={navTab(activeTab === 'friends')}
            >
              <Swords className={gold ? `w-5 h-5 ${activeTab === 'friends' ? 'text-secondary-fixed' : ''} text-amber-400` : aurora ? `w-5 h-5 ${activeTab === 'friends' ? 'text-secondary-fixed' : ''} text-purple-400` : `w-5 h-5 ${activeTab === 'friends' ? 'text-paper' : ''} text-paper`} />
              <span className="text-[14px] font-bold">Найзууд</span>
            </button>
          </li>
        </ul>

        {/* Sidebar Settings Footer */}
        <div className={gold || aurora ? 'border-t border-white/15 pt-4 flex flex-col gap-1' : 'border-t border-ink-line pt-4 flex flex-col gap-1'}>
          <button
            onClick={() => selectTab('settings')}
            className={
              gold || aurora
                ? `flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left transition-colors cursor-pointer ${activeTab === 'settings' ? 'text-white bg-white/10' : 'text-on-primary-container hover:text-white hover:bg-white/5'}`
                : `flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left transition-colors cursor-pointer ${activeTab === 'settings' ? 'text-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'}`
            }
          >
            <Settings className={gold || aurora ? 'w-4 h-4 text-outline' : 'w-4 h-4 text-paper-3'} />
            <span className="text-sm">Тохиргоо</span>
          </button>
          {currentUser && (
            <button
              onClick={logoutUser}
              className={gold || aurora ? 'flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left text-on-primary-container hover:text-error hover:bg-white/5 transition-colors cursor-pointer w-full' : 'flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left text-paper hover:text-paper-2 hover:bg-ink-raise transition-colors cursor-pointer w-full'}
            >
              <LogOut className={gold || aurora ? 'w-4 h-4 text-outline' : 'w-4 h-4 text-paper-3'} />
              <span className="text-sm">Гарах</span>
            </button>
          )}
        </div>
      </nav>
  );
}

interface MobileNavProps {
  activeTab: TabType;
  selectTab: (tab: TabType) => void;
}

// Bottom Interactive Sticky Navbar (Mobile Only) - matches screen specs
export function MobileNav({ activeTab, selectTab }: MobileNavProps) {
  const theme = useTheme();
  const gold = theme === 'gold';
  const aurora = theme === 'aurora';
  // Standard bottom-nav button tint (read/listen/speak/write/vocab/exam/friends).
  const bnBtn = (active: boolean) =>
    `flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
      active ? (gold || aurora ? 'text-secondary-fixed' : 'text-paper') : (gold || aurora ? 'text-on-primary-container' : 'text-paper-2')
    }`;
  // Standard active indicator bar.
  const bnBar = gold || aurora ? 'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-secondary-fixed rounded-b-full' : 'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full';
  const bnLabel = gold || aurora ? 'text-[10px] font-bold font-space' : 'text-[10px] font-bold font-serif';
  return (
          <nav aria-label="Mobile Navigation Drawer" className={gold || aurora ? 'md:hidden fixed bottom-0 left-0 w-full bg-primary border-t-2 border-on-background z-40 pb-safe' : 'md:hidden fixed bottom-0 left-0 w-full bg-ink-raise border-t-2 border-ink-line z-40 pb-safe'}>
            <div className="flex justify-around items-center h-16">

              <button
                onClick={() => selectTab('read')}
                className={bnBtn(activeTab === 'read')}
              >
                {activeTab === 'read' && <div className={bnBar}></div>}
                <BookOpen className="w-5 h-5" />
                <span className={bnLabel}>Унших</span>
              </button>

              <button
                onClick={() => selectTab('listen')}
                className={bnBtn(activeTab === 'listen')}
              >
                {activeTab === 'listen' && <div className={bnBar}></div>}
                <Headphones className="w-5 h-5" />
                <span className={bnLabel}>Сонсох</span>
              </button>

              <button
                onClick={() => selectTab('speak')}
                className={bnBtn(activeTab === 'speak')}
              >
                {activeTab === 'speak' && <div className={bnBar}></div>}
                <Mic className="w-5 h-5" />
                <span className={bnLabel}>Ярих</span>
              </button>

              <button
                onClick={() => selectTab('write')}
                className={bnBtn(activeTab === 'write')}
              >
                {activeTab === 'write' && <div className={bnBar}></div>}
                <Edit3 className="w-5 h-5" />
                <span className={bnLabel}>Бичих</span>
              </button>

              <button
                onClick={() => selectTab('vocab')}
                className={bnBtn(activeTab === 'vocab')}
              >
                {activeTab === 'vocab' && <div className={bnBar}></div>}
                <Languages className="w-5 h-5" />
                <span className={gold || aurora ? 'text-[10px] font-bold font-space font-medium' : 'text-[10px] font-bold font-serif font-medium'}>Үгс</span>
              </button>

              <button
                onClick={() => selectTab('translate')}
                className={gold
                  ? `flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${activeTab === 'translate' ? 'text-amber-400' : 'text-on-primary-container'}`
                  : aurora
                  ? `flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${activeTab === 'translate' ? 'text-purple-400' : 'text-on-primary-container'}`
                  : `flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${activeTab === 'translate' ? 'text-paper' : 'text-paper-2'}`}
              >
                {activeTab === 'translate' && <div className={gold ? 'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-amber-400 rounded-b-full text-amber-400' : aurora ? 'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-400 rounded-b-full text-purple-400' : 'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full text-paper'}></div>}
                <Sparkles className={gold ? 'w-5 h-5 text-amber-400' : aurora ? 'w-5 h-5 text-purple-400' : 'w-5 h-5 text-paper'} />
                <span className={bnLabel}>Орч</span>
              </button>

              <button
                onClick={() => selectTab('exam')}
                className={bnBtn(activeTab === 'exam')}
              >
                {activeTab === 'exam' && <div className={gold || aurora ? 'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-secondary-fixed rounded-b-full text-secondary-fixed' : 'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full text-paper'}></div>}
                <GraduationCap className={gold ? 'w-5 h-5 text-amber-400' : aurora ? 'w-5 h-5 text-yellow-400' : 'w-5 h-5 text-paper'} />
                <span className={bnLabel}>Сорил</span>
              </button>

              <button
                onClick={() => selectTab('friends')}
                className={bnBtn(activeTab === 'friends')}
              >
                {activeTab === 'friends' && <div className={bnBar}></div>}
                <Swords className={gold ? 'w-5 h-5 text-amber-400' : aurora ? 'w-5 h-5 text-purple-400' : 'w-5 h-5 text-paper'} />
                <span className={bnLabel}>Найз</span>
              </button>
            </div>
          </nav>
  );
}
