import React from 'react';
import {
  BookOpen, Headphones, Mic, Edit3, Languages, Settings, LogOut, Flame,
  Sparkles, GraduationCap, Target, Swords,
} from 'lucide-react';
import { TabType } from '../types';
import { UserProfile } from '../profiles';
import { BrandLogo } from './BrandLogo';

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
  return (
      <nav aria-label="Desktop menu" className="hidden md:flex flex-col h-screen py-8 px-4 gap-y-6 bg-ink w-[280px] fixed left-0 top-0 text-paper border-r border-ink-line select-none z-30 shadow-[4px_0_24px_rgba(0,0,0,0.6)]">
        <div>
          <h1 className="text-2xl font-light tracking-tight font-serif flex items-center gap-2">
            <BrandLogo className="w-8 h-8" />
            <span><span className="text-paper">Vivid</span> <span className="text-paper-2">Lingua</span></span>
          </h1>
        </div>

        {/* User Context Avatar Panel */}
        {currentUser ? (
          <div className="flex items-center gap-3 bg-ink-raise p-3 rounded-xl border border-ink-line cursor-pointer hover:bg-ink-raise transition-colors" onClick={() => selectTab('profile')}>
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-ink-line">
              <img
                alt="Profile"
                className="w-full h-full object-cover bg-ink-2"
                src={currentUser.avatar}
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase text-paper tracking-wider flex items-center gap-1">
                <Target className="w-2.5 h-2.5" /> {currentUser.targetLevel} ТҮВШИН
              </p>
              <h2 className="text-[15px] font-extrabold truncate text-paper leading-tight">{currentUser.name}</h2>
              <p className="text-[11px] text-paper-2 truncate leading-none mt-0.5">{currentUser.role}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-ink-raise p-3 rounded-xl border border-ink-line">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-ink-line flex items-center justify-center bg-ink-raise text-paper-2">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div>
              <p className="text-xs text-paper-2">Сайн байна уу?</p>
              <h2 className="text-[16px] font-bold">Нэвтрээгүй</h2>
            </div>
          </div>
        )}

        {/* Dynamic Streak Badge Card */}
        <div>
          <div className="bg-ink-raise text-paper text-[14px] font-bold rounded-xl px-4 py-3 flex items-center justify-between border border-ink-line">
            <span className="flex items-center gap-2 text-paper-2">
              <Flame className="w-5 h-5 text-paper fill-paper-2 animate-pulse" />
              Streak: {streak} өдөр
            </span>
            <span className="text-[11px] font-serif bg-paper text-ink px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide">AUTO</span>
          </div>
        </div>

        {/* Tabs Lists layout */}
        <ul className="flex flex-col gap-2 flex-grow mt-2 overflow-y-auto pr-1">
          {currentUser && (
            <li>
              <button
                onClick={() => selectTab('profile')}
                className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                  activeTab === 'profile'
                    ? 'text-paper border-l-4 border-paper bg-ink-raise'
                    : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
                }`}
              >
                <Target className={`w-5 h-5 ${activeTab === 'profile' ? 'text-paper' : ''}`} />
                <span className="text-[14px] font-bold">Хяналтын самбар</span>
              </button>
            </li>
          )}
          <li>
            <button
              onClick={() => selectTab('read')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'read'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <BookOpen className={`w-5 h-5 ${activeTab === 'read' ? 'text-paper' : ''}`} />
              <span className="text-[14px] font-bold">Унших</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('listen')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'listen'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <Headphones className={`w-5 h-5 ${activeTab === 'listen' ? 'text-paper' : ''}`} />
              <span className="text-[14px] font-bold">Сонсох</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('speak')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'speak'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <Mic className={`w-5 h-5 ${activeTab === 'speak' ? 'text-paper' : ''}`} />
              <span className="text-[14px] font-bold">Ярих</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('write')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'write'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <Edit3 className={`w-5 h-5 ${activeTab === 'write' ? 'text-paper' : ''}`} />
              <span className="text-[14px] font-bold">Бичих</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('vocab')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'vocab'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <Languages className={`w-5 h-5 ${activeTab === 'vocab' ? 'text-paper' : ''}`} />
              <span className="text-[14px] font-bold flex-grow flex justify-between items-center pr-4">
                <span>Үгсийн сан</span>
                {dueCount > 0 && (
                  <span className="bg-paper text-ink text-[10px] font-bold font-serif px-2 py-0.5 rounded-full">
                    {dueCount}
                  </span>
                )}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('translate')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'translate'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <Sparkles className={`w-5 h-5 ${activeTab === 'translate' ? 'text-paper text-paper' : ''}`} />
              <span className="text-[14px] font-bold">Орчуулагч</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('exam')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'exam'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <GraduationCap className={`w-5 h-5 ${activeTab === 'exam' ? 'text-paper' : ''} text-paper`} />
              <span className="text-[14px] font-bold">Шалгалт</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => selectTab('friends')}
              className={`flex items-center gap-3 py-3 w-full text-left font-bold pl-4 transition-all rounded-r-lg group cursor-pointer ${
                activeTab === 'friends'
                  ? 'text-paper border-l-4 border-paper bg-ink-raise'
                  : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
              }`}
            >
              <Swords className={`w-5 h-5 ${activeTab === 'friends' ? 'text-paper' : ''} text-paper`} />
              <span className="text-[14px] font-bold">Найзууд</span>
            </button>
          </li>
        </ul>

        {/* Sidebar Settings Footer */}
        <div className="border-t border-ink-line pt-4 flex flex-col gap-1">
          <button
            onClick={() => selectTab('settings')}
            className={`flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'text-paper bg-ink-raise' : 'text-paper-2 hover:text-paper hover:bg-ink-raise'
            }`}
          >
            <Settings className="w-4 h-4 text-paper-3" />
            <span className="text-sm">Тохиргоо</span>
          </button>
          {currentUser && (
            <button
              onClick={logoutUser}
              className="flex items-center gap-3 py-2 px-4 rounded-lg font-bold text-left text-paper hover:text-paper-2 hover:bg-ink-raise transition-colors cursor-pointer w-full"
            >
              <LogOut className="w-4 h-4 text-paper-3" />
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
  return (
          <nav aria-label="Mobile Navigation Drawer" className="md:hidden fixed bottom-0 left-0 w-full bg-ink-raise border-t-2 border-ink-line z-40 pb-safe">
            <div className="flex justify-around items-center h-16">

              <button
                onClick={() => selectTab('read')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'read' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'read' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full"></div>}
                <BookOpen className="w-5 h-5" />
                <span className="text-[10px] font-bold font-serif">Унших</span>
              </button>

              <button
                onClick={() => selectTab('listen')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'listen' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'listen' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full"></div>}
                <Headphones className="w-5 h-5" />
                <span className="text-[10px] font-bold font-serif">Сонсох</span>
              </button>

              <button
                onClick={() => selectTab('speak')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'speak' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'speak' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full"></div>}
                <Mic className="w-5 h-5" />
                <span className="text-[10px] font-bold font-serif">Ярих</span>
              </button>

              <button
                onClick={() => selectTab('write')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'write' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'write' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full"></div>}
                <Edit3 className="w-5 h-5" />
                <span className="text-[10px] font-bold font-serif">Бичих</span>
              </button>

              <button
                onClick={() => selectTab('vocab')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'vocab' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'vocab' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full"></div>}
                <Languages className="w-5 h-5" />
                <span className="text-[10px] font-bold font-serif font-medium">Үгс</span>
              </button>

              <button
                onClick={() => selectTab('translate')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'translate' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'translate' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full text-paper"></div>}
                <Sparkles className="w-5 h-5 text-paper" />
                <span className="text-[10px] font-bold font-serif">Орч</span>
              </button>

              <button
                onClick={() => selectTab('exam')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'exam' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'exam' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full text-paper"></div>}
                <GraduationCap className="w-5 h-5 text-paper" />
                <span className="text-[10px] font-bold font-serif">Сорил</span>
              </button>

              <button
                onClick={() => selectTab('friends')}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 relative cursor-pointer ${
                  activeTab === 'friends' ? 'text-paper' : 'text-paper-2'
                }`}
              >
                {activeTab === 'friends' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-paper rounded-b-full"></div>}
                <Swords className="w-5 h-5 text-paper" />
                <span className="text-[10px] font-bold font-serif">Найз</span>
              </button>
            </div>
          </nav>
  );
}
