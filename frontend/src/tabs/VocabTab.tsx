import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2, CheckCircle, X, RotateCcw, ChevronRight, HelpCircle, Search, Library,
} from 'lucide-react';
import { VocabularyWord, WordClass, CEFRLevel } from '../types';
import { DICTIONARY } from '../data';
import { UserProfile } from '../profiles';
import {
  reviewSrs, srsWordKey, orderTrainerWords, compareWordsByLevel,
} from '../learning';
import { localDateKey, activityKey } from '../utils/profileMetrics';

// How many cards a "Дахин давтах" (don't know) word waits before reappearing
// in the same session.
const VOCAB_REQUEUE_GAP = 5;

// Mongolian labels for dictionary word-class filter chips.
const WORD_CLASS_LABELS: { value: WordClass | 'all'; label: string }[] = [
  { value: 'all', label: 'Бүгд' },
  { value: 'noun', label: 'Нэр үг' },
  { value: 'verb', label: 'Үйл үг' },
  { value: 'adjective', label: 'Тэмдэг нэр' },
  { value: 'adverb', label: 'Дайвар үг' },
  { value: 'preposition', label: 'Угтвар үг' },
  { value: 'pronoun', label: 'Төлөөний үг' },
  { value: 'numeral', label: 'Тооны нэр' },
  { value: 'conjunction', label: 'Холбоос үг' },
  { value: 'interjection', label: 'Аялга үг' },
  { value: 'article', label: 'Артикль' },
  { value: 'phrase', label: 'Хэллэг' },
];

const LEVEL_OPTIONS: (CEFRLevel | 'all')[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface VocabTabProps {
  TRAINER_WORDS: VocabularyWord[];
  placementSuggestedLevel: CEFRLevel | null;
  currentUserRef: { current: UserProfile | null };
  requireAccount: () => boolean;
  applyMetricProfile: (profile: UserProfile, save?: boolean) => void;
  speakGerman: (text: string, speedMultiplier?: number) => void;
}

// Tab 5: Үгсийн сан (Vocabulary) — Trainer (flashcards) + Dictionary (browse)
export function VocabTab({
  TRAINER_WORDS,
  placementSuggestedLevel,
  currentUserRef,
  requireAccount,
  applyMetricProfile,
  speakGerman,
}: VocabTabProps) {
  // Trainer CEFR filter. Defaults to the learner's placement-test level (when
  // the result is unlocked); they can switch freely after.
  const initialLevel: CEFRLevel | 'all' = placementSuggestedLevel ?? 'all';
  const [trainerLevel, setTrainerLevel] = useState<CEFRLevel | 'all'>(initialLevel);

  // Flashcards state for Vocabulary Trainer (Screen 5) — draws from the dictionary
  // entries that already have a Mongolian translation, so the trainer stays polished.
  // (The Browse dictionary below shows the full set incl. words still awaiting Mongolian.)
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [vocabList, setVocabList] = useState<VocabularyWord[]>(() => {
    const words = initialLevel === 'all' ? TRAINER_WORDS : TRAINER_WORDS.filter((w) => w.level === initialLevel);
    return orderTrainerWords(words, currentUserRef.current?.srsByWord ?? {});
  });
  const [vocabFlipped, setVocabFlipped] = useState(false);
  const [vocabMemorizedCount, setVocabMemorizedCount] = useState(0);
  const vocabTotalCount = vocabList.length;

  // Rebuild the trainer queue: filter by level, then SRS order (due → new → scheduled).
  const rebuildTrainerQueue = (level: CEFRLevel | 'all') => {
    const words = level === 'all' ? TRAINER_WORDS : TRAINER_WORDS.filter((w) => w.level === level);
    setVocabList(orderTrainerWords(words, currentUserRef.current?.srsByWord ?? {}));
    setCurrentVocabIndex(0);
    setVocabFlipped(false);
    setVocabMemorizedCount(0);
  };

  const selectTrainerLevel = (level: CEFRLevel | 'all') => {
    setTrainerLevel(level);
    rebuildTrainerQueue(level);
  };

  // Dictionary (Browse) state — vocabeo-style searchable/filterable word list
  const [vocabView, setVocabView] = useState<'trainer' | 'browse'>('trainer');
  const [dictSearch, setDictSearch] = useState('');
  const [dictClass, setDictClass] = useState<WordClass | 'all'>('all');
  const [dictLevel, setDictLevel] = useState<CEFRLevel | 'all'>('all');
  const [dictVisible, setDictVisible] = useState(24); // how many results to render (load-more paging)

  const filteredDictionary = useMemo(() => {
    const q = dictSearch.trim().toLowerCase();
    return DICTIONARY.filter((w) => {
      if (dictClass !== 'all' && w.wordClass !== dictClass) return false;
      if (dictLevel !== 'all' && w.level !== dictLevel) return false;
      if (!q) return true;
      return (
        w.german.toLowerCase().includes(q) ||
        w.mongolian.toLowerCase().includes(q) ||
        (w.english ? w.english.toLowerCase().includes(q) : false) ||
        (w.article ? `${w.article} ${w.german}`.toLowerCase().includes(q) : false)
      );
    }).sort(compareWordsByLevel); // easiest first: A1 → C2
  }, [dictSearch, dictClass, dictLevel]);

  // Reset paging whenever the filters change so the list starts from the top.
  useEffect(() => {
    setDictVisible(24);
  }, [dictSearch, dictClass, dictLevel]);

  // Vocabulary list card selections
  const handleVocabAction = (knows: boolean) => {
    if (!requireAccount()) return;
    setVocabFlipped(false);
    if (vocabList.length === 0) return;
    const word = vocabList[currentVocabIndex];
    const key = srsWordKey(word);

    const profile = currentUserRef.current;
    if (profile) {
      const currentSrsByWord = profile.srsByWord ?? {};
      const prevEntry = currentSrsByWord[key];
      const nextEntry = reviewSrs(prevEntry, knows);

      const nextSrs = {
        ...currentSrsByWord,
        [key]: nextEntry
      };

      const actId = activityKey('vocab', word.rank ?? `${word.german}-${word.mongolian}`);
      const nextCompleted = knows
        ? Array.from(new Set([...(profile.completedActivityIds ?? []), actId]))
        : (profile.completedActivityIds ?? []);
      // A correct vocab review marks today as studied like every other activity;
      // otherwise vocab-only days never reach studyDays and the streak breaks.
      const nextStudyDays = knows
        ? Array.from(new Set([...(profile.studyDays ?? []), localDateKey()])).sort()
        : (profile.studyDays ?? []);

      applyMetricProfile({
        ...profile,
        srsByWord: nextSrs,
        completedActivityIds: nextCompleted,
        studyDays: nextStudyDays,
        lastActiveAt: new Date().toISOString(),
      });
    }

    if (knows) {
      setVocabMemorizedCount(prev => Math.min(prev + 1, vocabTotalCount));
    }

    // Advance after the flip-back animation. A known word just moves on; an
    // unknown word is pulled out and reinserted a few cards ahead so it comes
    // back around in this same session.
    setTimeout(() => {
      if (knows) {
        setCurrentVocabIndex(prev => (prev + 1) % vocabList.length);
        return;
      }
      const idx = currentVocabIndex;
      setVocabList(prev => {
        const next = [...prev];
        const [again] = next.splice(idx, 1);
        next.splice(Math.min(idx + VOCAB_REQUEUE_GAP, next.length), 0, again);
        return next;
      });
      // Removing the current card shifts the next one into this index — except
      // on the last card, where the reinsert lands back on itself; wrap then.
      if (idx >= vocabList.length - 1) {
        setCurrentVocabIndex(0);
      }
    }, 200);
  };

  return (
          <div className="mt-4 animate-fade-in">

            {/* Sub-view toggle: flashcard Trainer vs in-app Dictionary */}
            <div className="flex w-full sm:w-auto sm:inline-flex p-1.5 bg-ink-raise border-2 border-ink-line rounded-2xl block-shadow mb-6">
              <button
                onClick={() => setVocabView('trainer')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                  vocabView === 'trainer' ? 'bg-paper text-ink border-2 border-ink-line block-shadow-green' : 'text-paper-2 hover:bg-ink-raise'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Дасгал
              </button>
              <button
                onClick={() => setVocabView('browse')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold font-serif text-sm transition-all cursor-pointer ${
                  vocabView === 'browse' ? 'bg-paper text-ink border-2 border-ink-line block-shadow-green' : 'text-paper-2 hover:bg-ink-raise'
                }`}
              >
                <Library className="w-4 h-4" />
                Толь бичиг
              </button>
            </div>

            {vocabView === 'trainer' && (
            <>
            {/* Trainer level filter (A1 → C2) + placement-based suggestion */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-serif font-bold text-paper-3 uppercase tracking-wider mr-1">Түвшин:</span>
              {LEVEL_OPTIONS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => selectTrainerLevel(lvl)}
                  className={`px-3.5 py-1.5 border-2 border-ink-line rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer block-shadow ${
                    trainerLevel === lvl ? 'bg-paper text-ink' : 'bg-ink-raise hover:bg-ink-2 text-paper-2'
                  }`}
                >
                  {lvl === 'all' ? 'Бүгд' : lvl}
                  {lvl !== 'all' && lvl === placementSuggestedLevel && (
                    <span className="ml-1.5 text-[10px] uppercase opacity-80">★</span>
                  )}
                </button>
              ))}
              {placementSuggestedLevel && (
                <span className="text-xs font-bold text-paper-2 font-sans ml-1">
                  ★ Түвшин тогтоох шалгалтын дүнгээр танд {placementSuggestedLevel} түвшний үгсийг санал болгож байна
                </span>
              )}
            </div>

            {vocabList.length === 0 ? (
              <div className="rounded-2xl border-2 border-ink-line p-10 block-shadow text-center">
                <p className="font-bold text-paper-2 font-sans">
                  Энэ түвшинд дасгал хийх үг алга. Өөр түвшин сонгоно уу.
                </p>
              </div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Central carousel card element block */}
              <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[500px]">

                {/* Visual tactile card flip display wrapper */}
                <div
                  onClick={() => setVocabFlipped(prev => !prev)}
                  className="w-full max-w-2xl aspect-[4/3] sm:aspect-video perspective-1000 cursor-pointer"
                >
                  <div className="relative w-full h-full transform-style-3d border-2 border-ink-line rounded-2xl block-shadow">

                    {/* FRONT of the card (displays German word) - Backface hidden layout */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden bg-ink-2 text-paper rounded-2xl flex flex-col items-center justify-between p-8 transition-transform duration-500 transform-style-3d ${
                      vocabFlipped ? '[transform:rotateY(-180deg)]' : '[transform:rotateY(0deg)]'
                    }`}>
                      <span className="text-xs font-serif font-bold text-paper-2 uppercase tracking-wider px-3 py-1 bg-ink-raise border border-ink-line rounded-full">
                        Шинэ үг
                      </span>

                      <div className="flex flex-col items-center gap-4">
                        {vocabList[currentVocabIndex].article && (
                          <span className={`text-base font-black lowercase tracking-widest px-4 py-1 rounded-full border-2 border-ink-line block-shadow ${
                            vocabList[currentVocabIndex].article === 'der' ? 'bg-ink-raise text-paper-2' :
                            vocabList[currentVocabIndex].article === 'die' ? 'bg-ink-raise text-paper-2' :
                            'bg-ink-raise text-paper-2'
                          }`}>
                            {vocabList[currentVocabIndex].article}
                          </span>
                        )}
                        <h2 className="text-4xl sm:text-5xl font-black text-paper text-center font-sans tracking-tight">
                          {vocabList[currentVocabIndex].german}
                        </h2>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const w = vocabList[currentVocabIndex];
                            speakGerman(w.article ? `${w.article} ${w.german}` : w.german);
                          }}
                          className="p-4 rounded-full bg-ink-raise hover:bg-ink-2 border-2 border-ink-line hover:scale-110 text-paper-2 transition-all block-shadow cursor-pointer flex items-center justify-center"
                        >
                          <Volume2 className="w-8 h-8 font-black stroke-[2.5px]" />
                        </button>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setVocabFlipped(true);
                        }}
                        className="mb-2 px-6 py-2.5 bg-paper text-ink border-2 border-ink-line rounded-xl font-bold font-sans text-sm shadow-[0_4px_18px_-2px_rgba(0,0,0,0.35)] cursor-pointer hover:scale-105 transition-all"
                      >
                        Хариултыг харах ↺
                      </button>
                    </div>

                    {/* BACK of the card (displays Mongolian definitions & explanations) */}
                    <div className={`absolute inset-0 w-full h-full backface-hidden bg-ink-2 text-paper rounded-2xl flex flex-col items-center justify-between p-8 border-2 border-ink-line shadow-black/40 transition-transform duration-500 transform-style-3d ${
                      vocabFlipped ? '[transform:rotateY(0deg)]' : '[transform:rotateY(180deg)]'
                    }`}>
                      <span className="text-xs font-serif font-bold text-paper-2 bg-ink-raise px-3 py-1 border border-ink-line rounded-full uppercase tracking-wider">
                        {vocabList[currentVocabIndex].category}
                      </span>

                      <div className="flex flex-col items-center gap-6 w-full max-w-md">
                        <h2 className="text-3xl font-extrabold text-paper text-center font-sans tracking-tight">
                          {vocabList[currentVocabIndex].mongolian}
                        </h2>

                        <div className="w-full bg-ink-raise p-4 rounded-xl border-2 border-ink-line block-shadow text-center">
                          <p className="text-sm leading-normal text-paper-2 italic mb-2 font-sans font-bold">
                            "{vocabList[currentVocabIndex].exampleGerman}"
                          </p>
                          <p className="text-sm font-bold text-paper-2 leading-normal font-sans">
                            {vocabList[currentVocabIndex].exampleMongolian}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setVocabFlipped(false);
                        }}
                        className="mb-2 px-6 py-2.5 bg-paper text-ink border-2 border-ink-line rounded-xl font-bold font-sans text-sm shadow-[0_4px_18px_-2px_rgba(0,0,0,0.35)] cursor-pointer hover:scale-105 transition-all"
                      >
                        Үгийг харах ↺
                      </button>
                    </div>

                  </div>
                </div>

                {/* Display tactile repeat-repeat actions buttons on flipped cards */}
                <div className={`flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-2xl transition-opacity duration-300 ${
                  vocabFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-30 pointer-events-none'
                }`}>
                  <button
                    onClick={() => handleVocabAction(false)}
                    className="flex-1 basis-0 flex items-center justify-center gap-2 border-2 border-ink-line text-paper hover:bg-ink-raise0 hover:text-paper py-4 px-6 rounded-xl font-bold font-sans text-lg block-shadow-orange cursor-pointer transition-all active:scale-95"
                  >
                    <RotateCcw className="w-5 h-5 font-black" />
                    Дахин давтах
                  </button>
                  <button
                    onClick={() => handleVocabAction(true)}
                    className="flex-1 basis-0 flex items-center justify-center gap-2 bg-paper border-2 border-ink-line text-ink hover:bg-white py-4 px-6 rounded-xl font-bold font-sans text-lg block-shadow-green cursor-pointer transition-all active:scale-95"
                  >
                    <CheckCircle className="w-5 h-5 font-black fill-current" />
                    Мэднэ
                  </button>
                </div>

              </div>

              {/* Right Sidebar: Progression Circular SVG & upcoming word panels */}
              <aside className="lg:col-span-4 flex flex-col gap-6">
                {/* SVGs Progress tracking ring list items */}
                <div className="rounded-xl border-2 border-ink-line p-6 block-shadow flex flex-col items-center">
                  <h3 className="text-lg font-bold text-paper mb-6 w-full font-serif pb-2 border-b border-ink-line uppercase tracking-wider">
                    Өнөөдрийн явц
                  </h3>

                  <div className="relative w-40 h-40 mb-4 flex items-center justify-center select-none">
                    {/* SVG circular calculation */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        className="text-paper-2 stroke-current"
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r="60"
                        strokeWidth="10"                      ></circle>
                      <circle
                        className="text-paper-2 stroke-current progress-ring__circle transition-all duration-500"
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r="60"
                        strokeWidth="10"
                        strokeDasharray={376.8}
                        strokeDashoffset={376.8 - (376.8 * vocabMemorizedCount) / vocabTotalCount}
                        strokeLinecap="round"                      ></circle>
                    </svg>

                    {/* Central counter summary text */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-extrabold text-paper font-serif">
                        {vocabMemorizedCount}/{vocabTotalCount}
                      </span>
                      <span className="text-xs font-bold text-paper-3 uppercase font-serif">Цээжилсэн үг</span>
                    </div>
                  </div>

                  <div className="flex justify-between w-full mt-4 text-xs font-serif font-bold border-t border-ink-line pt-4">
                    <div className="flex items-center gap-2 text-paper-2">
                      <div className="w-3 h-3 rounded-full bg-paper"></div>
                      <span>Мэдэхгүй</span>
                    </div>
                    <div className="flex items-center gap-2 text-paper-2">
                      <div className="w-3 h-3 rounded-full bg-ink-raise"></div>
                      <span>Цээжилсэн</span>
                    </div>
                  </div>
                </div>

                {/* Carousel Upcoming Cards lists previews */}
                <div className="rounded-xl border-2 border-ink-line p-6 block-shadow">
                  <h3 className="text-lg font-bold text-paper mb-4 font-serif pb-2 border-b border-ink-line uppercase tracking-wider">
                    Дараагийн үгс
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Show the current word + a short upcoming window (the dictionary has 200+ words) */}
                    {Array.from({ length: Math.min(12, vocabList.length) }).map((_, i) => {
                      const idx = (currentVocabIndex + i) % vocabList.length;
                      const item = vocabList[idx];
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setVocabFlipped(false);
                            setCurrentVocabIndex(idx);
                          }}
                          className={`px-3 py-1.5 border-2 border-ink-line rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer block-shadow ${
                            idx === currentVocabIndex
                              ? 'bg-ink-raise text-paper border-ink-line'
                              : 'bg-ink-raise hover:bg-ink-2 text-paper-2'
                          }`}
                        >
                          {item.german}
                        </button>
                      );
                    })}
                    <span className="px-3 py-1.5 bg-ink-raise border-2 border-ink-line rounded-lg text-xs font-bold text-paper-2 blur-[0.5px] opacity-70">
                      ...
                    </span>
                  </div>
                </div>

                {/* Resource card — opens the in-app dictionary (Browse) */}
                <div className="rounded-xl border-2 border-ink-line p-6 block-shadow">
                  <h3 className="text-lg font-bold text-paper mb-2 font-serif pb-2 border-b border-ink-line uppercase tracking-wider">
                    Нэмэлт эх сурвалж
                  </h3>
                  <p className="text-xs text-paper-2 mb-4 leading-normal font-sans">
                    Илүү олон герман үг, жишээ өгүүлбэрийг апп дотроос шууд хайж, түвшингээр шүүж үзээрэй.
                  </p>
                  <button
                    onClick={() => setVocabView('browse')}
                    className="w-full flex items-center justify-center gap-2 bg-paper text-ink border-2 border-ink-line py-3 px-4 rounded-xl font-bold font-sans text-sm block-shadow-green cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Library className="w-4 h-4" />
                    Толь бичиг нээх ({DICTIONARY.length})
                  </button>
                </div>
              </aside>

            </div>
            )}
            </>
            )}

            {/* Dictionary (Browse) — searchable, filterable German→Mongolian word list */}
            {vocabView === 'browse' && (
            <div className="flex flex-col gap-6 pb-24">

              {/* Header + search + filters */}
              <div className="rounded-2xl border-2 border-ink-line p-6 block-shadow flex flex-col gap-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="text-2xl font-light text-paper font-serif flex items-center gap-2">
                      <Library className="w-6 h-6 text-paper-2" />
                      Герман–Монгол толь бичиг
                    </h2>
                    <p className="text-xs text-paper-2 font-sans mt-1">
                      Нийт {DICTIONARY.length} үг · хайж, төрөл болон түвшингээр шүүнэ
                    </p>
                  </div>
                </div>

                {/* Search box */}
                <div className="relative">
                  <Search className="w-5 h-5 text-paper-3 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={dictSearch}
                    onChange={(e) => setDictSearch(e.target.value)}
                    placeholder="Герман эсвэл монгол үгээр хайх..."
                    className="w-full bg-ink-raise border-2 border-ink-line rounded-xl pl-12 pr-10 py-3 text-md font-bold text-paper focus:border-ink-line outline-none transition-all placeholder:text-paper-3 placeholder:font-normal shadow-inner"
                  />
                  {dictSearch && (
                    <button
                      onClick={() => setDictSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-3 hover:text-paper cursor-pointer"
                      title="Цэвэрлэх"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Word-class filter chips */}
                <div className="flex flex-wrap gap-2">
                  {WORD_CLASS_LABELS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setDictClass(c.value)}
                      className={`px-3.5 py-1.5 border-2 border-ink-line rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer block-shadow ${
                        dictClass === c.value ? 'bg-ink-raise text-paper' : 'bg-ink-raise hover:bg-ink-2 text-paper-2'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Level filter chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-serif font-bold text-paper-3 uppercase tracking-wider mr-1">Түвшин:</span>
                  {LEVEL_OPTIONS.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDictLevel(lvl)}
                      className={`px-3.5 py-1.5 border-2 border-ink-line rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer block-shadow ${
                        dictLevel === lvl ? 'bg-paper text-ink' : 'bg-ink-raise hover:bg-ink-2 text-paper-2'
                      }`}
                    >
                      {lvl === 'all' ? 'Бүгд' : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-bold text-paper-2 font-serif">
                  {filteredDictionary.length} үг олдлоо
                </span>
              </div>

              {/* Word cards grid */}
              {filteredDictionary.length === 0 ? (
                <div className="rounded-2xl border-2 border-ink-line p-12 block-shadow text-center">
                  <HelpCircle className="w-12 h-12 text-paper-3 mx-auto mb-3" />
                  <p className="text-paper-2 font-bold font-sans">Тохирох үг олдсонгүй.</p>
                  <p className="text-xs text-paper-3 mt-1">Хайлт эсвэл шүүлтүүрээ өөрчилж үзнэ үү.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredDictionary.slice(0, dictVisible).map((w, idx) => (
                      <div
                        key={`${w.german}-${idx}`}
                        className="rounded-xl border-2 border-ink-line p-5 block-shadow flex flex-col gap-3 hover:-translate-y-0.5 transition-transform"
                      >
                        <div className="flex items-start justify-between gap-2">
                          {w.article ? (
                            <span className={`text-sm font-black lowercase tracking-widest px-3 py-0.5 rounded-full border-2 border-ink-line ${
                              w.article === 'der' ? 'bg-ink-raise text-paper-2' :
                              w.article === 'die' ? 'bg-ink-raise text-paper-2' :
                              'bg-ink-raise text-paper-2'
                            }`}>
                              {w.article}
                            </span>
                          ) : (
                            <span className="text-[11px] font-serif font-bold text-paper-2 bg-ink-raise px-2.5 py-1 border border-ink-line rounded-full uppercase tracking-wider">
                              {WORD_CLASS_LABELS.find((c) => c.value === w.wordClass)?.label || ''}
                            </span>
                          )}
                          <span className="text-[11px] font-serif font-extrabold text-paper-2 bg-ink-raise px-2.5 py-1 border border-ink-line rounded-full">
                            {w.level}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-2xl font-black text-paper font-sans tracking-tight leading-tight truncate">
                              {w.german}
                            </h3>
                            {w.phonetic && (
                              <p className="text-xs text-paper-2/70 font-mono mt-0.5">{w.phonetic}</p>
                            )}
                          </div>
                          <button
                            onClick={() => speakGerman(w.article ? `${w.article} ${w.german}` : w.german)}
                            className="shrink-0 p-2.5 rounded-full bg-ink-raise hover:bg-ink-2 border-2 border-ink-line hover:scale-110 text-paper-2 transition-all cursor-pointer"
                            title="Дуудлага сонсох"
                          >
                            <Volume2 className="w-5 h-5 stroke-[2.5px]" />
                          </button>
                        </div>

                        {/* Meaning: Mongolian once translated, otherwise the English gloss. */}
                        {w.mongolian.trim() ? (
                          <p className="text-base font-bold text-paper-2 font-sans">{w.mongolian}</p>
                        ) : (
                          <p className="text-base font-bold text-paper-2 font-sans">
                            {w.english}
                            <span className="ml-1.5 text-[10px] font-serif font-bold text-paper-3 align-middle">EN</span>
                          </p>
                        )}
                        {w.wordClass === 'noun' && w.plural && (
                          <p className="text-xs text-paper-2/80 font-sans -mt-1">
                            Олон тоо: <span className="font-bold">die {w.plural}</span>
                          </p>
                        )}

                        {w.exampleGerman.trim() && (
                          <div className="mt-auto bg-ink-raise p-3 rounded-lg border border-ink-line">
                            <p className="text-xs leading-normal text-paper-2 italic font-sans font-semibold mb-1">
                              „{w.exampleGerman}“
                            </p>
                            <p className="text-xs text-paper-2/80 leading-normal font-sans">
                              {w.exampleMongolian}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Load more */}
                  {dictVisible < filteredDictionary.length && (
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={() => setDictVisible((n) => n + 24)}
                        className="flex items-center gap-2 border-2 border-ink-line text-paper hover:bg-ink-raise py-3 px-8 rounded-xl font-bold font-sans text-sm block-shadow cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <ChevronRight className="w-4 h-4 rotate-90" />
                        Цааш үзэх ({filteredDictionary.length - dictVisible})
                      </button>
                    </div>
                  )}
                </>
              )}

              <p className="text-center text-[11px] text-paper-3 font-sans mt-2">
                Vocabeo.com-ийн загвараар бүтээв
              </p>
            </div>
            )}

          </div>
  );
}
