// =============================================================================
// IELTS — Vocabulary flashcard trainer.
// -----------------------------------------------------------------------------
// Flips through IELTS_VOCAB cards: word, phonetic, part of speech, English
// definition, the MONGOLIAN gloss, and an example. A "Say it" button speaks the
// word with the shared neural TTS; prev/next navigation and a CEFR level filter.
// =============================================================================
import React, { useEffect, useMemo, useState } from 'react';
import {
  BookA, Volume2, ChevronLeft, ChevronRight, Eye, EyeOff, Shuffle, Lock,
} from 'lucide-react';
import { IELTS_VOCAB } from '../ieltsVocab';
import { speak } from '../../audio';
import { EnglishLevel } from '../../types';
import { LevelFilter, IELTS_LEVELS } from './quizKit';
import { useEnglishStats } from '../../stats';
import { FREE_VOCAB_WORDS } from '../../access';

export default function IeltsVocabTab({
  allContent,
  onUpgrade,
}: {
  allContent: boolean;
  onUpgrade: () => void;
}) {
  const { recordStudy } = useEnglishStats();
  const [level, setLevel] = useState<EnglishLevel | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const fullDeck = useMemo(
    () => (level === 'all' ? IELTS_VOCAB : IELTS_VOCAB.filter((w) => w.level === level)),
    [level],
  );
  // Free tier only sees the first FREE_VOCAB_WORDS cards of each deck.
  const deck = useMemo(
    () => (allContent ? fullDeck : fullDeck.slice(0, FREE_VOCAB_WORDS)),
    [fullDeck, allContent],
  );
  const lockedCount = fullDeck.length - deck.length;

  // Keep the index valid whenever the filtered deck changes.
  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [level]);

  const card = deck[index];

  function go(delta: number) {
    if (deck.length === 0) return;
    setIndex((i) => (i + delta + deck.length) % deck.length);
    setRevealed(false);
  }
  function shuffle() {
    if (deck.length === 0) return;
    setIndex(Math.floor(Math.random() * deck.length));
    setRevealed(false);
  }
  function say() {
    if (card) void speak(card.word, { voice: 'en-GB-SoniaNeural', rate: 0.9 });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2">
          <BookA className="w-6 h-6 text-paper" /> IELTS Vocabulary
        </h2>
        <p className="text-paper-2 mt-1">
          Эрдэм шинжилгээний {IELTS_VOCAB.length} үгийг Монгол орчуулгатай нь сурцгаая.
        </p>
      </div>

      <LevelFilter levels={IELTS_LEVELS} active={level} onChange={setLevel} />

      {lockedCount > 0 && (
        <button
          onClick={onUpgrade}
          className="w-full text-left rounded-2xl bg-ink-raise hover:bg-ink-2 p-4 transition-colors flex items-center gap-3"
        >
          <span className="rounded-full bg-ink-2 p-2 text-paper-2">
            <Lock className="w-4 h-4" />
          </span>
          <span className="flex-1">
            <span className="block font-bold text-paper">Үнэгүй {FREE_VOCAB_WORDS} үг харагдаж байна</span>
            <span className="block text-sm text-paper-2">Бүх {fullDeck.length} үгийг Pro-оор нээ (+{lockedCount} үг)</span>
          </span>
          <span className="shrink-0 rounded-full bg-primary text-on-primary px-4 py-2 text-sm font-bold">Pro авах</span>
        </button>
      )}

      {deck.length === 0 || !card ? (
        <p className="text-paper-2">Энэ түвшинд үг алга байна.</p>
      ) : (
        <>
          <div className="rounded-3xl bg-ink-raise p-6 sm:p-8 min-h-[18rem] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="rounded-full bg-ink-2 text-paper px-2.5 py-0.5 text-xs font-bold">
                {card.level}
              </span>
              <span className="text-xs text-paper-2">{card.category}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-3xl font-serif font-light tracking-tight text-paper">{card.word}</h3>
                <button
                  onClick={say}
                  className="rounded-full bg-ink-2 text-paper p-2 hover:bg-ink-2 hover:text-paper transition-colors"
                  aria-label="Say it"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-paper-2 mt-1">
                {card.phonetic} · <span className="italic">{card.partOfSpeech}</span>
              </p>

              <p className="mt-5 text-paper leading-relaxed">{card.definition}</p>

              {revealed ? (
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-paper text-ink p-3">
                    <span className="text-xs font-bold uppercase tracking-wide opacity-80">Монгол</span>
                    <p className="text-lg font-bold">{card.mongolian}</p>
                  </div>
                  <p className="text-paper-2 italic">“{card.example}”</p>
                </div>
              ) : (
                <button
                  onClick={() => { setRevealed(true); recordStudy(); }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2.5 font-bold"
                >
                  <Eye className="w-4 h-4" /> Орчуулга харах
                </button>
              )}
            </div>

            {revealed && (
              <button
                onClick={() => setRevealed(false)}
                className="mt-4 self-start inline-flex items-center gap-2 text-sm font-semibold text-paper-2 hover:text-paper"
              >
                <EyeOff className="w-4 h-4" /> Нуух
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => go(-1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"
            >
              <ChevronLeft className="w-4 h-4" /> Өмнөх
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-paper-2 font-semibold">
                {index + 1} / {deck.length}
              </span>
              <button
                onClick={shuffle}
                className="rounded-full bg-ink-2 text-paper p-2.5 hover:bg-ink-raise"
                aria-label="Shuffle"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => go(1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"
            >
              Дараах <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
