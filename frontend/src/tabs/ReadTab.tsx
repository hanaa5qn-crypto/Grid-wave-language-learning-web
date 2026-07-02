import React, { useState } from 'react';
import {
  Volume2, Languages, Lightbulb, RotateCcw, ArrowLeft, ArrowRight, Shield,
} from 'lucide-react';
import { TabType } from '../types';
import {
  READING_LIBRARY, Level, ReadingItem, getReadingQuestions, shuffleQuiz,
} from '../library';
import { UserProfile } from '../profiles';
import { addMistake, clearMistake } from '../learning';
import { activityKey } from '../utils/profileMetrics';
import MCQBlock from '../components/MCQBlock';
import GrammarTipCard from '../GrammarTipCard';
import QuizNav from '../components/QuizNav';
import ExternalResourcesPanel from '../components/ExternalResourcesPanel';

// Level filter chips shared by every skill-library browser.
const LIB_LEVELS: (Level | 'all')[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface ReadTabProps {
  libReadId: number;
  setLibReadId: (id: number) => void;
  libReadLevel: Level | 'all';
  setLibReadLevel: (level: Level | 'all') => void;
  readTranslateEnabled: boolean;
  audioSpeed: '0.8' | '1.0';
  currentUser: UserProfile | null;
  currentUserRef: { current: UserProfile | null };
  lockedActivityIds: Record<'read' | 'listen' | 'speak' | 'write', Set<number>>;
  lessonPlanLocked: (level: string, itemId: number, tab: 'read' | 'listen' | 'speak' | 'write') => boolean;
  renderPlanLockCard: (title: string, description: string, requiredPlan: 'pro' | 'max') => React.ReactNode;
  selectTab: (tab: TabType) => void;
  requireAccount: () => boolean;
  recordStudyActivity: (activityId: string) => void;
  applyMetricProfile: (profile: UserProfile, save?: boolean) => void;
  speakGerman: (text: string, speedMultiplier?: number) => void;
  renderRichGerman: (text: string) => React.ReactNode;
}

// Tab 1: Унших (Reading) - Screen 3 layout
export function ReadTab({
  libReadId,
  setLibReadId,
  libReadLevel,
  setLibReadLevel,
  readTranslateEnabled,
  audioSpeed,
  currentUser,
  currentUserRef,
  lockedActivityIds,
  lessonPlanLocked,
  renderPlanLockCard,
  selectTab,
  requireAccount,
  recordStudyActivity,
  applyMetricProfile,
  speakGerman,
  renderRichGerman,
}: ReadTabProps) {
  // Multi-question state: which question is open + the chosen answer per question.
  const [libReadQIdx, setLibReadQIdx] = useState<number>(0);
  const [libReadAnswers, setLibReadAnswers] = useState<Record<number, number>>({});
  // Translation starts hidden so the learner reads/attempts first and only
  // reveals the Mongolian once stuck. Follows the "auto-show" setting if the
  // user opts into always-on translations.
  const [libReadTrans, setLibReadTrans] = useState<boolean>(readTranslateEnabled);

  return (
            <div className="w-full pb-24">


              {/* LIBRARY browser — 50+ readings */}
              {(() => {
                const filtered = libReadLevel === 'all' ? READING_LIBRARY : READING_LIBRARY.filter(r => r.level === libReadLevel);
                const item = READING_LIBRARY.find(r => r.id === libReadId) || READING_LIBRARY[0];
                // Multi-question set: per-item questions get a stable per-question shuffle
                // so the correct answer position can't be gamed ("always B").
                const questions = getReadingQuestions(item).map((qq, qi) => shuffleQuiz(`read:${item.id}:${qi}`, qq));
                const qIdx = Math.min(libReadQIdx, questions.length - 1);
                const q = questions[qIdx];
                const qAnswer = libReadAnswers[qIdx] ?? null;
                const idxInFiltered = filtered.findIndex(r => r.id === item.id);
                const openReadItem = (next: ReadingItem) => { setLibReadId(next.id); setLibReadQIdx(0); setLibReadAnswers({}); setLibReadTrans(readTranslateEnabled); };
                return (
                  <>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* List of readings */}
                    <aside className="lg:col-span-4 border-2 border-ink-line rounded-xl p-4 block-shadow">
                      <div className="flex gap-1 mb-3">
                        {LIB_LEVELS.map(lv => (
                          <button key={lv} onClick={() => setLibReadLevel(lv)}
                            className={`flex-1 py-1.5 rounded-lg border-2 border-ink-line text-xs font-bold cursor-pointer transition-colors ${libReadLevel === lv ? 'bg-paper text-ink' : 'bg-ink-raise text-paper-2'}`}>
                            {lv === 'all' ? 'Бүгд' : lv}
                          </button>
                        ))}
                      </div>
                      <div className="nested-scroll flex flex-col gap-2 max-h-[55vh] max-lg:h-[45vh] max-lg:max-h-[45vh] pr-1">
                        {filtered.map(r => {
                          const isLocked = (lockedActivityIds.read.has(r.id) && r.level === currentUser?.targetLevel) || lessonPlanLocked(r.level, r.id, 'read');
                          return (
                            <button key={r.id} onClick={() => openReadItem(r)}
                              className={`text-left p-2.5 rounded-lg border-2 border-ink-line cursor-pointer transition-colors ${r.id === libReadId ? 'bg-ink-raise' : 'bg-ink-raise hover:bg-ink-2'}`}>
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

                    {/* Reader */}
                    <section className="lg:col-span-8 border-2 border-ink-line rounded-xl p-6 md:p-8 block-shadow text-paper">
                      {lessonPlanLocked(item.level, item.id, 'read') ? renderPlanLockCard('Энэ хичээл Pro багцад нээлттэй', 'Үнэгүй эрхээр зөвхөн A1 түвшний эхний хичээл болон үгийн сан нээлттэй. Бусад хичээлүүд Pro багцад нээгдэнэ.', 'pro') : lockedActivityIds.read.has(item.id) && item.level === currentUser?.targetLevel ? (
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
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-serif font-bold text-paper-2 bg-ink-raise border border-ink-line px-3 py-1.5 rounded-full">{item.level} · {item.topic}</span>
                            <div className="flex gap-2">
                              <button onClick={() => speakGerman(item.text, audioSpeed === '0.8' ? 0.8 : 1.0)} title="Сонсох"
                                className="p-2 border-2 border-ink-line rounded-full bg-ink-raise hover:scale-105 transition-transform text-paper block-shadow cursor-pointer">
                                <Volume2 className="w-5 h-5" />
                              </button>
                              <button onClick={() => setLibReadTrans(v => !v)}
                                className={`px-3 py-1 border-2 border-ink-line rounded-full font-bold text-xs block-shadow cursor-pointer hover:scale-105 transition-transform flex items-center gap-1 ${libReadTrans ? 'bg-paper text-ink' : 'bg-ink-raise text-paper'}`}>
                                <Languages className="w-4 h-4" /> {libReadTrans ? 'Нуух' : 'Орчуулга'}
                              </button>
                            </div>
                          </div>

                          <h2 className="text-2xl md:text-3xl font-extrabold text-paper mb-1 tracking-tight">{item.title}</h2>
                          <p className="text-sm text-paper-2 mb-5">{item.titleMn}</p>

                          <p className="text-lg leading-relaxed text-paper whitespace-pre-line font-medium">{renderRichGerman(item.text)}</p>
                          {libReadTrans && (
                            <p className="text-sm leading-relaxed text-paper-2 whitespace-pre-line mt-4 pt-4 border-t border-ink-line/50 italic">{item.translation}</p>
                          )}

                          {/* Comprehension questions — multi-question set with prev/next */}
                          <div className="mt-6 pt-5 border-t border-ink-line">
                            <p className="text-xs font-serif font-bold uppercase text-paper mb-2">Ойлголт шалгах · Асуулт {qIdx + 1}/{questions.length}:</p>
                            <p className="text-base font-bold text-paper mb-3">{q.question}</p>
                            <div className="mb-4 flex flex-wrap gap-2">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink-raise border-2 border-ink-line text-xs font-semibold rounded-full font-serif block-shadow text-paper">
                                <Lightbulb className="w-4 h-4 text-paper fill-paper-2" />
                                {q.hint ?? 'Санамж: тодруулсан үг дээр дарж утга, дуудлагыг нь үзээрэй.'}
                              </span>
                            </div>
                            <MCQBlock
                              choices={q.choices}
                              correctIndex={q.correctIndex}
                              selectedAnswer={qAnswer}
                              feedbackText={q.explanation}
                              onSelect={(index) => {
                                if (!requireAccount()) return;
                                const nextAnswers = { ...libReadAnswers, [qIdx]: index };
                                setLibReadAnswers(nextAnswers);
                                const actId = activityKey('library:read', item.id);
                                const profile = currentUserRef.current;
                                if (index === q.correctIndex) {
                                  // The activity counts as done once EVERY question is answered correctly.
                                  const allCorrect = questions.every((qq, i) => nextAnswers[i] === qq.correctIndex);
                                  if (allCorrect) {
                                    recordStudyActivity(actId);
                                    if (profile && profile.mistakeIds?.includes(actId)) {
                                      applyMetricProfile({
                                        ...profile,
                                        mistakeIds: clearMistake(profile.mistakeIds, actId),
                                      });
                                    }
                                  }
                                } else if (profile) {
                                  applyMetricProfile({
                                    ...profile,
                                    mistakeIds: addMistake(profile.mistakeIds, actId),
                                  });
                                }
                              }}
                            />
                            {qAnswer !== null && qAnswer !== q.correctIndex && (
                              <>
                                <button
                                  onClick={() => { const na = { ...libReadAnswers }; delete na[qIdx]; setLibReadAnswers(na); }}
                                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-ink-raise text-paper border-2 border-ink-line rounded-lg font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform">
                                  <RotateCcw className="w-3.5 h-3.5" /> Дахин оролдох
                                </button>
                                <GrammarTipCard
                                  correctAnswer={q.choices[q.correctIndex]}
                                  explanation={q.explanation}
                                  germanContext={item.text}
                                  level={item.level}
                                />
                              </>
                            )}
                            <QuizNav
                              qIdx={qIdx}
                              total={questions.length}
                              answered={qAnswer !== null}
                              onPrev={() => setLibReadQIdx(Math.max(0, qIdx - 1))}
                              onNext={() => {
                                if (qIdx < questions.length - 1) setLibReadQIdx(qIdx + 1);
                                else if (filtered.length > 0) openReadItem(filtered[(Math.max(idxInFiltered, 0) + 1) % filtered.length]);
                              }}
                              nextLessonLabel={qIdx === questions.length - 1}
                            />
                          </div>

                          {/* Prev/next lesson */}
                          {idxInFiltered >= 0 && filtered.length > 1 && (
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-ink-line">
                              <button onClick={() => openReadItem(filtered[(idxInFiltered - 1 + filtered.length) % filtered.length])}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform">
                                <ArrowLeft className="w-3.5 h-3.5" /> Өмнөх хичээл
                              </button>
                              <span className="text-[11px] font-serif font-bold text-paper-2">{idxInFiltered + 1} / {filtered.length}</span>
                              <button onClick={() => openReadItem(filtered[(idxInFiltered + 1) % filtered.length])}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform">
                                Дараах хичээл <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </section>
                  </div>
                  <ExternalResourcesPanel skill="read" level={libReadLevel} />
                  </>
                );
              })()}

            </div>
  );
}
