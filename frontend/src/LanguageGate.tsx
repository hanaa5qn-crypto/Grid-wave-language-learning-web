import React, { useEffect, useState } from 'react';
import App from './App';
import EnglishApp from '../../english/src/EnglishApp';

// localStorage key shared by both tracks. 'de' => German app, 'en' => English app.
const TRACK_KEY = 'vivid-lingua-track';
type Track = 'de' | 'en';

function isTrack(value: string | null): value is Track {
  return value === 'de' || value === 'en';
}

// First-screen chooser shown before any track is selected (or after a reset).
function Chooser({ onPick }: { onPick: (track: Track) => void }) {
  return (
    <div className="min-h-screen bg-background text-on-background font-sans flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-black mb-2">
          <span className="text-primary">Choose your language</span>
        </h1>
        <p className="text-on-surface-variant text-lg mb-10">Хэл сонгох</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => onPick('de')}
            className="flex flex-col items-center gap-2 rounded-3xl bg-surface-container hover:bg-surface-container-high p-8 transition-colors"
          >
            <span className="text-5xl" aria-hidden="true">🇩🇪</span>
            <span className="text-xl font-bold text-on-surface">Germany — Learn German</span>
            <span className="text-sm text-on-surface-variant">Deutsch</span>
          </button>

          <button
            onClick={() => onPick('en')}
            className="flex flex-col items-center gap-2 rounded-3xl bg-surface-container hover:bg-surface-container-high p-8 transition-colors"
          >
            <span className="text-5xl" aria-hidden="true">🇬🇧</span>
            <span className="text-xl font-bold text-on-surface">English — Learn English</span>
            <span className="text-sm text-on-surface-variant">English</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Gate that decides which language track to render and persists the choice.
export default function LanguageGate() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRACK_KEY);
      if (isTrack(stored)) setTrack(stored);
    } catch {
      /* localStorage unavailable — fall back to the chooser */
    }
  }, []);

  function pick(next: Track) {
    try {
      localStorage.setItem(TRACK_KEY, next);
    } catch {
      /* persistence failed — still proceed for this session */
    }
    setTrack(next);
  }

  function reset() {
    try {
      localStorage.removeItem(TRACK_KEY);
    } catch {
      /* ignore */
    }
    setTrack(null);
  }

  if (track === 'de') {
    // German app has no built-in language switch, so overlay a small floating
    // button that returns to the chooser (where English can be picked). It sits
    // clear of the German app's fixed bars: below the mobile top header, above
    // the desktop content, and off the mobile bottom nav / desktop left sidebar.
    return (
      <>
        <App />
        <button
          onClick={reset}
          title="Хэл солих / Switch language"
          aria-label="Switch language"
          className="fixed right-3 top-20 md:top-3 z-[130] inline-flex items-center gap-1.5 rounded-full border border-surface-variant bg-surface-container/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-on-surface shadow-lg hover:bg-surface-container-high transition-colors"
        >
          <span aria-hidden="true">🌐</span> Хэл солих
        </button>
      </>
    );
  }
  if (track === 'en') return <EnglishApp onSwitchLanguage={reset} />;
  return <Chooser onPick={pick} />;
}
