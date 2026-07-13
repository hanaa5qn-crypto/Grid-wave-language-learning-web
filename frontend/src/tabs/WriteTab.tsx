import React, { useState } from 'react';
import {
  Lightbulb, ArrowLeft, ArrowRight, Shield,
} from 'lucide-react';
import { TabType } from '../types';
import { WRITING_LIBRARY, Level, WritingItem } from '../library';
import { UserProfile } from '../profiles';
import ExternalResourcesPanel from '../components/ExternalResourcesPanel';

// Level filter chips shared by every skill-library browser.
const LIB_LEVELS: (Level | 'all')[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface WriteTabProps {
  libWriteId: number;
  setLibWriteId: (id: number) => void;
  libWriteLevel: Level | 'all';
  setLibWriteLevel: (level: Level | 'all') => void;
  currentUser: UserProfile | null;
  lockedActivityIds: Record<'read' | 'listen' | 'speak' | 'write', Set<number>>;
  lessonPlanLocked: (level: string, itemId: number, tab: 'read' | 'listen' | 'speak' | 'write') => boolean;
  renderPlanLockCard: (title: string, description: string, requiredPlan: 'pro' | 'max') => React.ReactNode;
  selectTab: (tab: TabType) => void;
  renderRichGerman: (text: string) => React.ReactNode;
  // Shared AI writing checker (also used by the exam tab) — stays in LearnerApp.
  renderWritingChecker: (
    text: string,
    ctx: { id: number; prompt: string; points: string[]; modelAnswer: string; level: string },
  ) => React.ReactNode;
  resetWritingFeedback: () => void;
}

// Tab 4: Бичих (Writing) - Screen 6 layout
export function WriteTab({
  libWriteId,
  setLibWriteId,
  libWriteLevel,
  setLibWriteLevel,
  currentUser,
  lockedActivityIds,
  lessonPlanLocked,
  renderPlanLockCard,
  selectTab,
  renderRichGerman,
  renderWritingChecker,
  resetWritingFeedback,
}: WriteTabProps) {
  const [libWriteText, setLibWriteText] = useState<string>('');
  const [libWriteReveal, setLibWriteReveal] = useState<boolean>(false);

  return (
            <div className="w-full pb-24">


              {/* LIBRARY browser — 50+ writing tasks */}
              {(() => {
                const filtered = libWriteLevel === 'all' ? WRITING_LIBRARY : WRITING_LIBRARY.filter(r => r.level === libWriteLevel);
                const item = WRITING_LIBRARY.find(r => r.id === libWriteId) || WRITING_LIBRARY[0];
                const words = libWriteText.trim() ? libWriteText.trim().split(/\s+/).length : 0;
                const idxInFiltered = filtered.findIndex(r => r.id === item.id);
                const openWriteItem = (next: WritingItem) => { setLibWriteId(next.id); setLibWriteText(''); setLibWriteReveal(false); resetWritingFeedback(); };
                return (
                  <>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <aside className="lg:col-span-4 border-2 border-ink-line rounded-xl p-4 block-shadow">
                      <div className="flex gap-1 mb-3">
                        {LIB_LEVELS.map(lv => (
                          <button key={lv} onClick={() => setLibWriteLevel(lv)}
                            className={`flex-1 py-1.5 rounded-lg border-2 border-ink-line text-xs font-bold cursor-pointer transition-colors ${libWriteLevel === lv ? 'bg-paper text-ink' : 'bg-ink-raise text-paper-2'}`}>
                            {lv === 'all' ? 'Бүгд' : lv}
                          </button>
                        ))}
                      </div>
                      <div className="nested-scroll flex flex-col gap-2 max-h-[55vh] max-lg:h-[45vh] max-lg:max-h-[45vh] pr-1">
                        {filtered.map(r => {
                          const isLocked = (lockedActivityIds.write.has(r.id) && r.level === currentUser?.targetLevel) || lessonPlanLocked(r.level, r.id, 'write');
                          return (
                            <button key={r.id} onClick={() => openWriteItem(r)}
                              className={`text-left p-2.5 rounded-lg border-2 border-ink-line cursor-pointer transition-colors ${r.id === libWriteId ? 'bg-ink-raise' : 'bg-ink-raise hover:bg-ink-2'}`}>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-paper text-ink shrink-0">{r.level}</span>
                                <span className="text-xs font-bold text-paper truncate flex items-center gap-1.5">
                                  {isLocked && <span>🔒</span>}
                                  {r.titleMn}
                                </span>
                              </div>
                              <p className="text-[10px] text-paper-2 mt-0.5 truncate">{r.title} · {r.topic}</p>
                            </button>
                          );
                        })}
                      </div>
                    </aside>

                    <section className="lg:col-span-8 border-2 border-ink-line rounded-xl p-6 md:p-8 block-shadow text-paper">
                      {lessonPlanLocked(item.level, item.id, 'write') ? renderPlanLockCard('Энэ хичээл Pro багцад нээлттэй', 'Үнэгүй эрхээр зөвхөн A1 түвшний эхний хичээл болон үгийн сан нээлттэй. Бусад хичээлүүд Pro багцад нээгдэнэ.', 'pro') : lockedActivityIds.write.has(item.id) && item.level === currentUser?.targetLevel ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-ink-2 flex items-center justify-center text-paper-2">
                            <Shield className="w-8 h-8" />
                          </div>
                          <h2 className="text-xl font-bold text-paper">🔒 Энэ дасгал түгжигдсэн байна</h2>
                          <p className="text-sm text-paper-2 max-w-sm font-sans font-medium">
                            Шалгалт өгөх эсвэл өмнөх хэсгийг дуусгаж нээнэ үү.
                          </p>
                          <button
                            onClick={() => selectTab('profile')}
                            className="px-5 py-2.5 bg-paper text-ink font-bold rounded-xl text-sm hover:bg-paper transition-all shadow-md cursor-pointer font-serif"
                          >
                            Сургалтын зам руу очих
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs font-serif font-bold text-paper-2 bg-ink-raise border border-ink-line px-3 py-1.5 rounded-full">{item.level} · {item.topic}</span>
                          <h2 className="text-xl md:text-2xl font-extrabold text-paper mt-4 mb-1">{item.titleMn}</h2>
                          <p className="text-xs text-paper-2 mb-4">{item.title}</p>

                      <div className="bg-ink-raise rounded-lg p-4 mb-4">
                        <p className="text-xs font-serif font-bold uppercase text-paper mb-1">Даалгавар:</p>
                        <p className="text-sm font-bold text-paper mb-2">{item.prompt}</p>
                        <ul className="text-xs text-paper-2 space-y-1 list-disc list-inside">
                          {item.points.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>

                      <textarea value={libWriteText} onChange={(e) => setLibWriteText(e.target.value)}
                        placeholder="Энд герман хэлээр бичнэ үү..." rows={6} maxLength={2000}
                        className="w-full px-3 py-2 text-sm border-2 border-ink-line rounded-lg bg-ink-raise text-paper placeholder:text-paper-3 outline-none focus:border-ink-line resize-y" />

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[11px] text-paper-2">{words} үг</span>
                        <button onClick={() => setLibWriteReveal(v => !v)}
                          className="px-4 py-2 bg-ink-raise text-paper border-2 border-ink-line rounded-lg font-bold text-xs cursor-pointer block-shadow hover:scale-[1.02] transition-transform flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-paper fill-current" /> {libWriteReveal ? 'Загварыг нуух' : 'Загвар хариулт харах'}
                        </button>
                      </div>

                      {libWriteReveal && (
                        <div className="bg-ink-raise/40 border-2 border-ink-line rounded-lg p-4 mt-4">
                          <p className="text-[10px] font-bold uppercase text-paper-2 mb-1">Загвар хариулт:</p>
                          <p className="text-sm text-paper whitespace-pre-line leading-relaxed font-medium">{renderRichGerman(item.modelAnswer)}</p>
                          <p className="text-xs text-paper-2 whitespace-pre-line leading-relaxed mt-2 pt-2 border-t border-ink-line/30 italic">{item.modelMn}</p>
                        </div>
                      )}

                      {/* AI writing check — flags wrong grammar / words and recommends
                          better wording. Data-driven, so new imports get it automatically. */}
                      {renderWritingChecker(libWriteText, { id: item.id, prompt: item.prompt, points: item.points, modelAnswer: item.modelAnswer, level: item.level })}

                      {/* Prev/next lesson */}
                      {idxInFiltered >= 0 && filtered.length > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-ink-line">
                          <button onClick={() => openWriteItem(filtered[(idxInFiltered - 1 + filtered.length) % filtered.length])}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform">
                            <ArrowLeft className="w-3.5 h-3.5" /> Өмнөх хичээл
                          </button>
                          <span className="text-[11px] font-serif font-bold text-paper-2">{idxInFiltered + 1} / {filtered.length}</span>
                          <button onClick={() => openWriteItem(filtered[(idxInFiltered + 1) % filtered.length])}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform">
                            Дараах хичээл <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>
                  <ExternalResourcesPanel skill="write" level={libWriteLevel} />
                  </>
            );
              })()}

            </div>
  );
}
