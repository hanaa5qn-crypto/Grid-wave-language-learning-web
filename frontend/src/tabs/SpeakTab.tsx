import React, { useState } from 'react';
import {
  Volume2, Lightbulb, ArrowLeft, ArrowRight, Shield,
} from 'lucide-react';
import { TabType, SpeakTarget } from '../types';
import { SPEAKING_LIBRARY, Level, SpeakingItem } from '../library';
import { UserProfile } from '../profiles';
import ExternalResourcesPanel from '../components/ExternalResourcesPanel';
import { useTheme } from '../lib/theme';

// Level filter chips shared by every skill-library browser.
const LIB_LEVELS: (Level | 'all')[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface SpeakTabProps {
  libSpeakId: number;
  setLibSpeakId: (id: number) => void;
  libSpeakLevel: Level | 'all';
  setLibSpeakLevel: (level: Level | 'all') => void;
  currentUser: UserProfile | null;
  lockedActivityIds: Record<'read' | 'listen' | 'speak' | 'write', Set<number>>;
  lessonPlanLocked: (level: string, itemId: number, tab: 'read' | 'listen' | 'speak' | 'write') => boolean;
  renderPlanLockCard: (title: string, description: string, requiredPlan: 'pro' | 'max') => React.ReactNode;
  selectTab: (tab: TabType) => void;
  requireAccount: () => boolean;
  speakGerman: (text: string, speedMultiplier?: number) => void;
  renderRichGerman: (text: string) => React.ReactNode;
  // Shared AI speaking judge (also used by the exam tab) — stays in LearnerApp.
  renderSpeakingJudge: (target: SpeakTarget) => React.ReactNode;
  renderSpeakingReport: (target: SpeakTarget) => React.ReactNode;
  resetSpeakingJudge: () => void;
}

// Tab 3: Ярих (Speaking) - Screen 4 layout
export function SpeakTab({
  libSpeakId,
  setLibSpeakId,
  libSpeakLevel,
  setLibSpeakLevel,
  currentUser,
  lockedActivityIds,
  lessonPlanLocked,
  renderPlanLockCard,
  selectTab,
  requireAccount,
  speakGerman,
  renderRichGerman,
  renderSpeakingJudge,
  renderSpeakingReport,
  resetSpeakingJudge,
}: SpeakTabProps) {
  const [libSpeakReveal, setLibSpeakReveal] = useState<boolean>(false);
  const themeName = useTheme();
  const gold = themeName === 'gold';
  const aurora = themeName === 'aurora';

  return (
            <div className="w-full pb-24">


              {/* LIBRARY browser — 50+ speaking prompts */}
              {(() => {
                const filtered = libSpeakLevel === 'all' ? SPEAKING_LIBRARY : SPEAKING_LIBRARY.filter(r => r.level === libSpeakLevel);
                const item = SPEAKING_LIBRARY.find(r => r.id === libSpeakId) || SPEAKING_LIBRARY[0];
                const idxInFiltered = filtered.findIndex(r => r.id === item.id);
                const openSpeakItem = (next: SpeakingItem) => { setLibSpeakId(next.id); setLibSpeakReveal(false); resetSpeakingJudge(); };
                return (
                  <>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <aside className={gold || aurora ? "lg:col-span-4 border-2 border-on-background rounded-xl p-4 block-shadow" : "lg:col-span-4 border-2 border-ink-line rounded-xl p-4 block-shadow"}>
                      <div className="flex gap-1 mb-3">
                        {LIB_LEVELS.map(lv => (
                          <button key={lv} onClick={() => setLibSpeakLevel(lv)}
                            className={gold || aurora ? `flex-1 py-1.5 rounded-lg border-2 border-on-background text-xs font-bold cursor-pointer transition-colors ${libSpeakLevel === lv ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface-variant'}` : `flex-1 py-1.5 rounded-lg border-2 border-ink-line text-xs font-bold cursor-pointer transition-colors ${libSpeakLevel === lv ? 'bg-paper text-ink' : 'bg-ink-raise text-paper-2'}`}>
                            {lv === 'all' ? 'Бүгд' : lv}
                          </button>
                        ))}
                      </div>
                      <div className="nested-scroll flex flex-col gap-2 max-h-[55vh] max-lg:h-[45vh] max-lg:max-h-[45vh] pr-1">
                        {filtered.map(r => {
                          const isLocked = (lockedActivityIds.speak.has(r.id) && r.level === currentUser?.targetLevel) || lessonPlanLocked(r.level, r.id, 'speak');
                          return (
                            <button key={r.id} onClick={() => openSpeakItem(r)}
                              className={gold || aurora ? `text-left p-2.5 rounded-lg border-2 border-on-background cursor-pointer transition-colors ${r.id === libSpeakId ? 'bg-secondary-container' : 'bg-surface-container hover:bg-surface-container-high'}` : `text-left p-2.5 rounded-lg border-2 border-ink-line cursor-pointer transition-colors ${r.id === libSpeakId ? 'bg-ink-raise' : 'bg-ink-raise hover:bg-ink-2'}`}>
                              <div className="flex items-center gap-2">
                                <span className={gold || aurora ? "text-[10px] font-black px-1.5 py-0.5 rounded bg-secondary text-white shrink-0" : "text-[10px] font-black px-1.5 py-0.5 rounded bg-paper text-ink shrink-0"}>{r.level}</span>
                                <span className={gold || aurora ? "text-xs font-bold text-on-surface truncate flex items-center gap-1.5" : "text-xs font-bold text-paper truncate flex items-center gap-1.5"}>
                                  {isLocked && <span>🔒</span>}
                                  {r.titleMn}
                                </span>
                              </div>
                              <p className={gold || aurora ? "text-[10px] text-on-surface-variant mt-0.5 truncate" : "text-[10px] text-paper-2 mt-0.5 truncate"}>{r.title} · {r.topic}</p>
                            </button>
                          );
                        })}
                      </div>
                    </aside>

                    <section className={gold || aurora ? "lg:col-span-8 border-2 border-on-background rounded-xl p-6 md:p-8 block-shadow text-on-surface" : "lg:col-span-8 border-2 border-ink-line rounded-xl p-6 md:p-8 block-shadow text-paper"}>
                      {lessonPlanLocked(item.level, item.id, 'speak') ? renderPlanLockCard('Энэ хичээл Pro багцад нээлттэй', 'Үнэгүй эрхээр зөвхөн A1 түвшний эхний хичээл болон үгийн сан нээлттэй. Бусад хичээлүүд Pro багцад нээгдэнэ.', 'pro') : lockedActivityIds.speak.has(item.id) && item.level === currentUser?.targetLevel ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                          <div className={gold || aurora ? "w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant" : "w-16 h-16 rounded-full bg-ink-2 flex items-center justify-center text-paper-2"}>
                            <Shield className="w-8 h-8" />
                          </div>
                          <h2 className={gold || aurora ? "text-xl font-bold text-on-surface" : "text-xl font-bold text-paper"}>🔒 Энэ дасгал түгжигдсэн байна</h2>
                          <p className={gold || aurora ? "text-sm text-on-surface-variant max-w-sm font-sans font-medium" : "text-sm text-paper-2 max-w-sm font-sans font-medium"}>
                            Шалгалт өгөх эсвэл өмнөх хэсгийг дуусгаж нээнэ үү.
                          </p>
                          <button
                            onClick={() => selectTab('profile')}
                            className={gold ? "px-5 py-2.5 bg-primary text-on-primary font-bold rounded-xl text-sm hover:bg-surface-tint transition-all shadow-md cursor-pointer font-space" : aurora ? "px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl text-sm hover:opacity-95 transition-all shadow-md cursor-pointer font-space" : "px-5 py-2.5 bg-paper text-ink font-bold rounded-xl text-sm hover:bg-paper transition-all shadow-md cursor-pointer font-serif"}
                          >
                            Сургалтын зам руу очих
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className={gold || aurora ? "text-xs font-space font-bold text-secondary bg-secondary-container border border-on-background px-3 py-1.5 rounded-full" : "text-xs font-serif font-bold text-paper-2 bg-ink-raise border border-ink-line px-3 py-1.5 rounded-full"}>{item.level} · {item.topic}</span>
                          <h2 className={gold || aurora ? "text-xl md:text-2xl font-extrabold text-on-surface mt-4 mb-1" : "text-xl md:text-2xl font-extrabold text-paper mt-4 mb-1"}>{item.titleMn}</h2>
                          <p className={gold || aurora ? "text-xs text-on-surface-variant mb-4" : "text-xs text-paper-2 mb-4"}>{item.title}</p>

                      {/* Task prompt */}
                      <div className={gold || aurora ? "bg-surface-container-low border-l-4 border-secondary rounded-lg p-4 mb-5" : "bg-ink-raise border-l-4 border-ink-line rounded-lg p-4 mb-5"}>
                        <p className={gold || aurora ? "text-xs font-space font-bold uppercase text-primary mb-1" : "text-xs font-serif font-bold uppercase text-paper mb-1"}>Даалгавар:</p>
                        <p className={gold || aurora ? "text-base font-bold text-on-surface" : "text-base font-bold text-paper"}>{item.prompt}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <button onClick={() => { if (!requireAccount()) return; speakGerman(item.modelAnswer, 1.0); }}
                          className={gold || aurora ? "flex items-center gap-2 px-4 py-2.5 bg-secondary text-white border-2 border-on-background rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] active:scale-95 transition-transform" : "flex items-center gap-2 px-4 py-2.5 bg-paper text-ink border-2 border-ink-line rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] active:scale-95 transition-transform"}>
                          <Volume2 className="w-4 h-4" /> Загварыг сонсох
                        </button>
                        <button onClick={() => setLibSpeakReveal(v => !v)}
                          className={gold || aurora ? "flex items-center gap-2 px-4 py-2.5 bg-surface-container text-primary border-2 border-on-background rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] transition-transform" : "flex items-center gap-2 px-4 py-2.5 bg-ink-raise text-paper border-2 border-ink-line rounded-lg font-bold text-sm cursor-pointer block-shadow hover:scale-[1.02] transition-transform"}>
                          <Lightbulb className={gold ? "w-4 h-4 text-amber-400 fill-current" : aurora ? "w-4 h-4 text-yellow-400 fill-current" : "w-4 h-4 text-paper fill-current"} /> {libSpeakReveal ? 'Нуух' : 'Загвар хариулт харах'}
                        </button>
                      </div>

                      {/* Tips */}
                      <div className="mb-2">
                        <p className={gold || aurora ? "text-[11px] font-space font-bold uppercase text-on-surface-variant mb-2" : "text-[11px] font-serif font-bold uppercase text-paper-2 mb-2"}>Хэрэгтэй хэллэг:</p>
                        <div className="flex flex-col gap-1.5">
                          {item.tips.map((t, i) => (
                            <div key={i} className={gold || aurora ? "flex items-start gap-2 text-xs text-on-surface" : "flex items-start gap-2 text-xs text-paper"}>
                              <span className={gold || aurora ? "text-secondary font-black" : "text-paper-2 font-black"}>›</span>{t}
                            </div>
                          ))}
                        </div>
                      </div>

                      {libSpeakReveal && (
                        <div className={gold || aurora ? "bg-secondary-container/40 border-2 border-secondary rounded-lg p-4 mt-4" : "bg-ink-raise/40 border-2 border-ink-line rounded-lg p-4 mt-4"}>
                          <p className={gold || aurora ? "text-[10px] font-bold uppercase text-secondary mb-1" : "text-[10px] font-bold uppercase text-paper-2 mb-1"}>Загвар хариулт:</p>
                          <p className={gold || aurora ? "text-base text-on-surface font-medium leading-relaxed" : "text-base text-paper font-medium leading-relaxed"}>{renderRichGerman(item.modelAnswer)}</p>
                          <p className={gold || aurora ? "text-xs text-on-surface-variant mt-2 italic leading-relaxed" : "text-xs text-paper-2 mt-2 italic leading-relaxed"}>{item.modelMn}</p>
                        </div>
                      )}
                      <p className={gold || aurora ? "text-[11px] text-on-surface-variant mt-4 italic" : "text-[11px] text-paper-2 mt-4 italic"}>Зөвлөмж: эхлээд өөрөө чангаар хэлж үзээд, дараа нь загвартай харьцуулаарай.</p>

                      {/* AI judge — graded against this item's model answer. Every imported
                          speaking resource gets it automatically because it is data-driven. */}
                      {renderSpeakingJudge({ id: item.id, text: item.modelAnswer })}
                      {renderSpeakingReport({ id: item.id, text: item.modelAnswer })}

                      {/* Prev/next lesson */}
                      {idxInFiltered >= 0 && filtered.length > 1 && (
                        <div className={gold || aurora ? "flex items-center justify-between mt-6 pt-4 border-t border-outline-variant" : "flex items-center justify-between mt-6 pt-4 border-t border-ink-line"}>
                          <button onClick={() => openSpeakItem(filtered[(idxInFiltered - 1 + filtered.length) % filtered.length])}
                            className={gold || aurora ? "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-on-background bg-surface-container text-on-surface font-bold text-xs font-space cursor-pointer block-shadow hover:scale-[1.02] transition-transform" : "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform"}>
                            <ArrowLeft className="w-3.5 h-3.5" /> Өмнөх хичээл
                          </button>
                          <span className={gold || aurora ? "text-[11px] font-space font-bold text-on-surface-variant" : "text-[11px] font-serif font-bold text-paper-2"}>{idxInFiltered + 1} / {filtered.length}</span>
                          <button onClick={() => openSpeakItem(filtered[(idxInFiltered + 1) % filtered.length])}
                            className={gold || aurora ? "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-on-background bg-surface-container text-on-surface font-bold text-xs font-space cursor-pointer block-shadow hover:scale-[1.02] transition-transform" : "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform"}>
                            Дараах хичээл <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>
                  <ExternalResourcesPanel skill="speak" level={libSpeakLevel} />
                  </>
                );
              })()}

            </div>
  );
}
