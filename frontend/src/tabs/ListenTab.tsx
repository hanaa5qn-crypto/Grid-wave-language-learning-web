import React, { useState, useEffect } from 'react';
import {
  Play, Pause, Languages, Lightbulb, RotateCcw, ArrowLeft, ArrowRight, Shield,
} from 'lucide-react';
import { TabType } from '../types';
import {
  LISTENING_LIBRARY, Level, ListeningItem, getListeningQuestions, shuffleQuiz,
} from '../library';
import { UserProfile } from '../profiles';
import { addMistake, clearMistake } from '../learning';
import { activityKey } from '../utils/profileMetrics';
import { playTts, pauseTts, resumeTts, stopTts } from '../utils/tts';
import MCQBlock from '../components/MCQBlock';
import GrammarTipCard from '../GrammarTipCard';
import QuizNav from '../components/QuizNav';
import ExternalResourcesPanel from '../components/ExternalResourcesPanel';
import { useTheme } from '../lib/theme';

// Level filter chips shared by every skill-library browser.
const LIB_LEVELS: (Level | 'all')[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface ListenTabProps {
  libListenId: number;
  setLibListenId: (id: number) => void;
  libListenLevel: Level | 'all';
  setLibListenLevel: (level: Level | 'all') => void;
  readTranslateEnabled: boolean;
  audioSpeed: '0.8' | '1.0';
  setAudioSpeed: (speed: '0.8' | '1.0') => void;
  currentUser: UserProfile | null;
  currentUserRef: { current: UserProfile | null };
  lockedActivityIds: Record<'read' | 'listen' | 'speak' | 'write', Set<number>>;
  lessonPlanLocked: (level: string, itemId: number, tab: 'read' | 'listen' | 'speak' | 'write') => boolean;
  renderPlanLockCard: (title: string, description: string, requiredPlan: 'pro' | 'max') => React.ReactNode;
  selectTab: (tab: TabType) => void;
  requireAccount: () => boolean;
  recordStudyActivity: (activityId: string) => void;
  applyMetricProfile: (profile: UserProfile, save?: boolean) => void;
  renderRichGerman: (text: string) => React.ReactNode;
}

// Tab 2: Сонсох (Listening) - Screen 2 layout
export function ListenTab({
  libListenId,
  setLibListenId,
  libListenLevel,
  setLibListenLevel,
  readTranslateEnabled,
  audioSpeed,
  setAudioSpeed,
  currentUser,
  currentUserRef,
  lockedActivityIds,
  lessonPlanLocked,
  renderPlanLockCard,
  selectTab,
  requireAccount,
  recordStudyActivity,
  applyMetricProfile,
  renderRichGerman,
}: ListenTabProps) {
  const [libListenQIdx, setLibListenQIdx] = useState<number>(0);
  const [libListenAnswers, setLibListenAnswers] = useState<Record<number, number>>({});
  // Transcript starts hidden unless the "auto-show translations" setting is on.
  const [libListenTrans, setLibListenTrans] = useState<boolean>(readTranslateEnabled);
  const themeName = useTheme();
  const gold = themeName === 'gold';
  const aurora = themeName === 'aurora';

  // --- Listening player controls (pause / resume / replay) ---
  // These drive the listen-tab player UI via setListenState. The neural path
  // uses a real <audio> element (so pause/resume keep position); the fallback
  // maps to speechSynthesis pause()/resume() (replay-from-top there).
  const [listenState, setListenState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const playListening = (text: string, rate: number) => {
    playTts(text, { lang: 'de-DE', rate, onState: setListenState });
  };
  const pauseListening = () => pauseTts();
  const resumeListening = () => resumeTts();
  const stopListening = () => stopTts();

  // Listening player: stop speech when switching clip, and cancel any
  // in-flight utterance on unmount (leaving the tab) so it never keeps talking.
  useEffect(() => {
    stopListening();
  }, [libListenId]);
  useEffect(() => () => stopTts(), []);

  return (
            <div className="w-full pb-24">


              {/* LIBRARY browser — 50+ listening clips */}
              {(() => {
                const filtered = libListenLevel === 'all' ? LISTENING_LIBRARY : LISTENING_LIBRARY.filter(r => r.level === libListenLevel);
                const item = LISTENING_LIBRARY.find(r => r.id === libListenId) || LISTENING_LIBRARY[0];
                const questions = getListeningQuestions(item).map((qq, qi) => shuffleQuiz(`listen:${item.id}:${qi}`, qq));
                const qIdx = Math.min(libListenQIdx, questions.length - 1);
                const q = questions[qIdx];
                const qAnswer = libListenAnswers[qIdx] ?? null;
                const idxInFiltered = filtered.findIndex(r => r.id === item.id);
                const openListenItem = (next: ListeningItem) => { setLibListenId(next.id); setLibListenQIdx(0); setLibListenAnswers({}); setLibListenTrans(readTranslateEnabled); };
                return (
                  <>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <aside className={gold || aurora ? "lg:col-span-4 border-2 border-on-background rounded-xl p-4 block-shadow" : "lg:col-span-4 border-2 border-ink-line rounded-xl p-4 block-shadow"}>
                      <div className="flex gap-1 mb-3">
                        {LIB_LEVELS.map(lv => (
                          <button key={lv} onClick={() => setLibListenLevel(lv)}
                            className={gold || aurora ? `flex-1 py-1.5 rounded-lg border-2 border-on-background text-xs font-bold cursor-pointer transition-colors ${libListenLevel === lv ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface-variant'}` : `flex-1 py-1.5 rounded-lg border-2 border-ink-line text-xs font-bold cursor-pointer transition-colors ${libListenLevel === lv ? 'bg-paper text-ink' : 'bg-ink-raise text-paper-2'}`}>
                            {lv === 'all' ? 'Бүгд' : lv}
                          </button>
                        ))}
                      </div>
                      <div className="nested-scroll flex flex-col gap-2 max-h-[55vh] max-lg:h-[45vh] max-lg:max-h-[45vh] pr-1">
                        {filtered.map(r => {
                          const isLocked = (lockedActivityIds.listen.has(r.id) && r.level === currentUser?.targetLevel) || lessonPlanLocked(r.level, r.id, 'listen');
                          return (
                            <button key={r.id} onClick={() => openListenItem(r)}
                              className={gold || aurora ? `text-left p-2.5 rounded-lg border-2 border-on-background cursor-pointer transition-colors ${r.id === libListenId ? 'bg-secondary-container' : 'bg-surface-container hover:bg-surface-container-high'}` : `text-left p-2.5 rounded-lg border-2 border-ink-line cursor-pointer transition-colors ${r.id === libListenId ? 'bg-ink-raise' : 'bg-ink-raise hover:bg-ink-2'}`}>
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
                      {lessonPlanLocked(item.level, item.id, 'listen') ? renderPlanLockCard('Энэ хичээл Pro багцад нээлттэй', 'Үнэгүй эрхээр зөвхөн A1 түвшний эхний хичээл болон үгийн сан нээлттэй. Бусад хичээлүүд Pro багцад нээгдэнэ.', 'pro') : lockedActivityIds.listen.has(item.id) && item.level === currentUser?.targetLevel ? (
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
                          <div className="flex items-center justify-between mb-5">
                            <span className={gold || aurora ? "text-xs font-space font-bold text-secondary bg-secondary-container border border-on-background px-3 py-1.5 rounded-full" : "text-xs font-serif font-bold text-paper-2 bg-ink-raise border border-ink-line px-3 py-1.5 rounded-full"}>{item.level} · {item.topic}</span>
                            <button onClick={() => setLibListenTrans(v => !v)}
                              className={gold || aurora ? `px-3 py-1 border-2 border-on-background rounded-full font-bold text-xs block-shadow cursor-pointer hover:scale-105 transition-transform flex items-center gap-1 ${libListenTrans ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface'}` : `px-3 py-1 border-2 border-ink-line rounded-full font-bold text-xs block-shadow cursor-pointer hover:scale-105 transition-transform flex items-center gap-1 ${libListenTrans ? 'bg-paper text-ink' : 'bg-ink-raise text-paper'}`}>
                              <Languages className="w-4 h-4" /> {libListenTrans ? 'Нуух' : 'Текст'}
                            </button>
                          </div>

                          <h2 className={gold || aurora ? "text-xl md:text-2xl font-extrabold text-on-surface mb-1" : "text-xl md:text-2xl font-extrabold text-paper mb-1"}>{item.titleMn}</h2>
                          <p className={gold || aurora ? "text-xs text-on-surface-variant mb-5" : "text-xs text-paper-2 mb-5"}>{item.title}</p>

                          {/* Play controls */}
                          <div className={gold || aurora ? "flex flex-col items-center gap-3 py-6 bg-surface-container-low border-2 border-on-background rounded-xl mb-5" : "flex flex-col items-center gap-3 py-6 bg-ink-raise border-2 border-ink-line rounded-xl mb-5"}>
                            <div className="flex items-center gap-4">
                              {/* Replay from start */}
                              <button onClick={() => { if (!requireAccount()) return; playListening(item.audioText, audioSpeed === '0.8' ? 0.8 : 1.0); }}
                                title="Эхнээс дахин тоглуулах"
                                className={gold || aurora ? "w-11 h-11 rounded-full bg-surface-container text-on-surface border-2 border-on-background flex items-center justify-center cursor-pointer hover:scale-105 transition-transform block-shadow" : "w-11 h-11 rounded-full bg-ink-raise text-paper border-2 border-ink-line flex items-center justify-center cursor-pointer hover:scale-105 transition-transform block-shadow"}>
                                <RotateCcw className="w-5 h-5" />
                              </button>
                              {/* Play / Pause / Resume toggle */}
                              <button onClick={() => {
                                  if (!requireAccount()) return;
                                  if (listenState === 'playing') pauseListening();
                                  else if (listenState === 'paused') resumeListening();
                                  else playListening(item.audioText, audioSpeed === '0.8' ? 0.8 : 1.0);
                                }}
                                title={listenState === 'playing' ? 'Түр зогсоох' : 'Тоглуулах'}
                                className={gold || aurora ? `w-16 h-16 rounded-full bg-secondary text-white border-2 border-on-background flex items-center justify-center cursor-pointer hover:scale-105 transition-transform block-shadow ${listenState === 'playing' ? 'animate-pulse ring-4 ring-secondary/30' : ''}` : `w-16 h-16 rounded-full bg-paper text-ink border-2 border-ink-line flex items-center justify-center cursor-pointer hover:scale-105 transition-transform block-shadow ${listenState === 'playing' ? 'animate-pulse ring-4 ring-paper/30' : ''}`}>
                                {listenState === 'playing' ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
                              </button>
                            </div>
                            <p className={gold || aurora ? "text-xs text-on-surface-variant font-sans" : "text-xs text-paper-2 font-sans"}>
                              {listenState === 'playing' ? 'Тоглож байна… дарж түр зогсоо' : listenState === 'paused' ? 'Түр зогссон… дарж үргэлжлүүл' : 'Сонсохын тулд тоглуулах товчийг дарна уу'}
                            </p>
                            <div className="flex items-center gap-2">
                              <button onClick={() => { setAudioSpeed('0.8'); if (listenState !== 'idle') playListening(item.audioText, 0.8); }}
                                className={gold || aurora ? `px-3 py-1 rounded-full border-2 border-on-background text-[11px] font-bold font-space cursor-pointer block-shadow ${audioSpeed === '0.8' ? 'bg-primary-container text-white' : 'bg-surface-container text-on-surface-variant'}` : `px-3 py-1 rounded-full border-2 border-ink-line text-[11px] font-bold font-serif cursor-pointer block-shadow ${audioSpeed === '0.8' ? 'bg-ink-raise text-paper' : 'bg-ink-raise text-paper-2'}`}>
                                0.8x (Удаан)
                              </button>
                              <button onClick={() => { setAudioSpeed('1.0'); if (listenState !== 'idle') playListening(item.audioText, 1.0); }}
                                className={gold || aurora ? `px-3 py-1 rounded-full border-2 border-on-background text-[11px] font-bold font-space cursor-pointer block-shadow ${audioSpeed === '1.0' ? 'bg-primary-container text-white' : 'bg-surface-container text-on-surface-variant'}` : `px-3 py-1 rounded-full border-2 border-ink-line text-[11px] font-bold font-serif cursor-pointer block-shadow ${audioSpeed === '1.0' ? 'bg-ink-raise text-paper' : 'bg-ink-raise text-paper-2'}`}>
                                1.0x (Хэвийн)
                              </button>
                            </div>
                          </div>

                          {libListenTrans && (
                            <div className={gold || aurora ? "bg-surface-container-low border-l-4 border-secondary rounded-lg p-3 mb-5" : "bg-ink-raise border-l-4 border-ink-line rounded-lg p-3 mb-5"}>
                              <p className={gold || aurora ? "text-sm text-on-surface font-medium whitespace-pre-line" : "text-sm text-paper font-medium whitespace-pre-line"}>{renderRichGerman(item.audioText)}</p>
                              <p className={gold || aurora ? "text-xs text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/50 italic" : "text-xs text-paper-2 mt-2 pt-2 border-t border-ink-line/50 italic"}>{item.transcriptMn}</p>
                            </div>
                          )}

                          {/* Comprehension — multi-question set with prev/next */}
                          <div className={gold || aurora ? "pt-5 border-t border-outline-variant" : "pt-5 border-t border-ink-line"}>
                            <p className={gold || aurora ? "text-xs font-space font-bold uppercase text-primary mb-2" : "text-xs font-serif font-bold uppercase text-paper mb-2"}>Ойлголт шалгах · Асуулт {qIdx + 1}/{questions.length}:</p>
                            <p className={gold || aurora ? "text-base font-bold text-on-surface mb-3" : "text-base font-bold text-paper mb-3"}>{q.question}</p>
                            <div className="mb-4 flex flex-wrap gap-2">
                              <span className={gold || aurora ? "inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border-2 border-on-background text-xs font-semibold rounded-full font-space block-shadow text-on-surface" : "inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink-raise border-2 border-ink-line text-xs font-semibold rounded-full font-serif block-shadow text-paper"}>
                                <Lightbulb className={gold || aurora ? "w-4 h-4 text-orange-500 fill-orange-500" : "w-4 h-4 text-paper fill-paper-2"} />
                                {q.hint ?? 'Санамж: "Текст" товчийг дарж, тодруулсан үг дээр дарна уу.'}
                              </span>
                            </div>
                            <MCQBlock
                              choices={q.choices}
                              correctIndex={q.correctIndex}
                              selectedAnswer={qAnswer}
                              feedbackText={q.explanation}
                              onSelect={(index) => {
                                if (!requireAccount()) return;
                                const nextAnswers = { ...libListenAnswers, [qIdx]: index };
                                setLibListenAnswers(nextAnswers);
                                const actId = activityKey('library:listen', item.id);
                                const profile = currentUserRef.current;
                                if (index === q.correctIndex) {
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
                                  onClick={() => { const na = { ...libListenAnswers }; delete na[qIdx]; setLibListenAnswers(na); }}
                                  className={gold || aurora ? "mt-4 flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface border-2 border-on-background rounded-lg font-bold text-xs font-space cursor-pointer block-shadow hover:scale-[1.02] transition-transform" : "mt-4 flex items-center gap-2 px-4 py-2 bg-ink-raise text-paper border-2 border-ink-line rounded-lg font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform"}>
                                  <RotateCcw className="w-3.5 h-3.5" /> Дахин оролдох
                                </button>
                                <GrammarTipCard
                                  correctAnswer={q.choices[q.correctIndex]}
                                  explanation={q.explanation}
                                  germanContext={item.audioText}
                                  level={item.level}
                                />
                              </>
                            )}
                            <QuizNav
                              qIdx={qIdx}
                              total={questions.length}
                              answered={qAnswer !== null}
                              onPrev={() => setLibListenQIdx(Math.max(0, qIdx - 1))}
                              onNext={() => {
                                if (qIdx < questions.length - 1) setLibListenQIdx(qIdx + 1);
                                else if (filtered.length > 0) openListenItem(filtered[(Math.max(idxInFiltered, 0) + 1) % filtered.length]);
                              }}
                              nextLessonLabel={qIdx === questions.length - 1}
                            />
                          </div>

                          {/* Prev/next lesson */}
                          {idxInFiltered >= 0 && filtered.length > 1 && (
                            <div className={gold || aurora ? "flex items-center justify-between mt-6 pt-4 border-t border-outline-variant" : "flex items-center justify-between mt-6 pt-4 border-t border-ink-line"}>
                              <button onClick={() => openListenItem(filtered[(idxInFiltered - 1 + filtered.length) % filtered.length])}
                                className={gold || aurora ? "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-on-background bg-surface-container text-on-surface font-bold text-xs font-space cursor-pointer block-shadow hover:scale-[1.02] transition-transform" : "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform"}>
                                <ArrowLeft className="w-3.5 h-3.5" /> Өмнөх хичээл
                              </button>
                              <span className={gold || aurora ? "text-[11px] font-space font-bold text-on-surface-variant" : "text-[11px] font-serif font-bold text-paper-2"}>{idxInFiltered + 1} / {filtered.length}</span>
                              <button onClick={() => openListenItem(filtered[(idxInFiltered + 1) % filtered.length])}
                                className={gold || aurora ? "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-on-background bg-surface-container text-on-surface font-bold text-xs font-space cursor-pointer block-shadow hover:scale-[1.02] transition-transform" : "flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-ink-line bg-ink-raise text-paper font-bold text-xs font-serif cursor-pointer block-shadow hover:scale-[1.02] transition-transform"}>
                                Дараах хичээл <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </section>
                  </div>
                  <ExternalResourcesPanel skill="listen" level={libListenLevel} />
                  </>
                );
              })()}

            </div>
  );
}
