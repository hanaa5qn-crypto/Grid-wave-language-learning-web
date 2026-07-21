import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import AccountScreen from './AccountScreen';
import ProgressSyncBanner from './ProgressSyncBanner';
import { saveTrackChoice, subscribeToProfileUpdates, logOutUser } from './auth';
import { UserProfile } from './profiles';
import { useTheme } from './lib/theme';

// Each track is its own chunk: picking German must not download the English
// exams (and their megabyte-scale vocab data), and vice versa.
const App = lazy(() => import('./App'));
const EnglishApp = lazy(() => import('../../english/src/EnglishApp'));
const EducationApp = lazy(() => import('../../education/src/EducationApp'));

function GateLoader() {
  // gold + aurora share the M3-token chrome (amber under html.gold, violet
  // under html.aurora); this gate had no aurora original so aurora reuses it.
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  return (
    <div className={gold
      ? 'min-h-screen bg-background text-on-background font-sans flex items-center justify-center'
      : 'min-h-screen bg-ink text-paper font-sans flex items-center justify-center'}
    >
      <Loader2 className={gold ? 'w-7 h-7 text-on-surface-variant animate-spin' : 'w-7 h-7 text-paper-2 animate-spin'} />
    </div>
  );
}

// localStorage key shared by all tracks. 'de' => German app, 'en' => English app.
const TRACK_KEY = 'vivid-lingua-track';
// Marks that the profile-first setup screen has been completed this login, so a
// reload before picking a track doesn't show it again. Cleared by AuthGate on a
// fresh interactive login so the next login shows it once.
const SETUP_KEY = 'vivid-lingua-setup-done';
type Track = 'de' | 'en' | 'edu';

function isTrack(value: string | null): value is Track {
  return value === 'de' || value === 'en' || value === 'edu';
}

// One selectable language card.
function TrackCard({
  flag, title, native, blurb, onPick, delay,
}: {
  flag: string; title: string; native: string; blurb: string;
  onPick: () => void; delay: string;
}) {
  // gold + aurora share the M3-token chrome (amber under html.gold, violet
  // under html.aurora); this gate had no aurora original so aurora reuses it.
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  return (
    <button
      onClick={onPick}
      style={{ animationDelay: delay }}
      className={gold
        ? 'animate-scale-up group flex flex-col items-start gap-4 rounded-3xl bg-surface-container border border-surface-variant p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-surface-container-high focus:outline-none focus-visible:border-primary/80'
        : 'animate-scale-up group flex flex-col items-start gap-4 rounded-3xl bg-ink-raise/60 border border-ink-line p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-paper/60 hover:bg-ink-raise focus:outline-none focus-visible:border-paper/80'}
    >
      <span className="text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">{flag}</span>
      <span className="flex flex-col gap-1">
        <span className={gold ? 'text-2xl font-space font-extrabold tracking-tight text-on-surface' : 'text-2xl font-serif font-light tracking-tight text-paper'}>{title}</span>
        <span className={gold
          ? 'text-[0.7rem] uppercase tracking-[0.2em] font-medium text-on-surface-variant'
          : 'text-[0.7rem] uppercase tracking-[0.2em] font-medium text-paper-3'}
        >{native}</span>
      </span>
      <span className={gold ? 'text-sm leading-relaxed text-on-surface-variant' : 'text-sm leading-relaxed text-paper-2'}>{blurb}</span>
      <span className={gold
        ? 'mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-on-surface-variant transition-colors group-hover:text-primary'
        : 'mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-paper-3 transition-colors group-hover:text-paper'}
      >
        Эхлэх · Start
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}

// First-screen chooser shown right after login (or after a reset). Asks the user
// what they want to learn before either track boots.
function Chooser({ onPick }: { onPick: (track: Track) => void }) {
  // gold + aurora share the M3-token chrome (amber under html.gold, violet
  // under html.aurora); this gate had no aurora original so aurora reuses it.
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  return (
    <div className={gold
      ? 'min-h-screen bg-background text-on-background font-sans flex flex-col items-center justify-center px-4 py-12'
      : 'min-h-screen bg-ink text-paper font-sans flex flex-col items-center justify-center px-4 py-12'}
    >
      <div className="animate-fade-in w-full max-w-2xl">
        <div className="text-center mb-12">
          <p className={gold
            ? 'text-[0.7rem] uppercase tracking-[0.28em] font-medium text-on-surface-variant mb-6'
            : 'text-[0.7rem] uppercase tracking-[0.28em] font-medium text-paper-3 mb-6'}
          >Vivid Lingua</p>
          <h1 className={gold
            ? 'font-space font-extrabold tracking-tight text-4xl sm:text-5xl text-on-background mb-4'
            : 'font-serif font-light tracking-tight text-4xl sm:text-5xl text-paper mb-4'}
          >
            What do you want to learn?
          </h1>
          <p className={gold ? 'text-on-surface-variant text-base' : 'text-paper-2 text-base'}>Юу сурахыг хүсэж байна вэ?</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <TrackCard
            flag="🇩🇪"
            title="German"
            native="Deutsch"
            blurb="Live, work or study in Germany. Lessons, listening and grammar from A1 to C1."
            onPick={() => onPick('de')}
            delay="80ms"
          />
          <TrackCard
            flag="🇬🇧"
            title="English"
            native="English"
            blurb="Ace IELTS & the SAT. Vocabulary, practice exams and AI feedback in Mongolian."
            onPick={() => onPick('en')}
            delay="160ms"
          />
          <TrackCard
            flag="📊"
            title="Market Analysis"
            native="Эдийн засаг · Markets"
            blurb="Fundamental market analysis. Rates, inflation, FOMC, CPI — how news moves markets."
            onPick={() => onPick('edu')}
            delay="240ms"
          />
        </div>

        <p className={gold ? 'mt-10 text-center text-xs text-on-surface-variant' : 'mt-10 text-center text-xs text-paper-3'}>
          You can switch anytime · Дараа нь сольж болно
        </p>
      </div>
    </div>
  );
}

// Gate that decides which language track to render and persists the choice.
// Wraps the gate body so the progress-sync retry toast (audit §4.2 #1/#3) is
// mounted once for BOTH tracks and every gate screen.
export default function LanguageGate() {
  return (
    <>
      <GateBody />
      <ProgressSyncBanner />
    </>
  );
}

function GateBody() {
  // gold + aurora share the M3-token chrome (amber under html.gold, violet
  // under html.aurora); this gate had no aurora original so aurora reuses it.
  const themeName = useTheme();
  const gold = themeName === 'gold' || themeName === 'aurora';
  const [track, setTrack] = useState<Track | null>(null);
  // Profile-first flow: after login, the account/settings screen is shown once
  // before the language chooser. `setupDone` flips true after the user continues
  // (or when a track is already persisted / they switch language), so it isn't
  // shown again on every reload.
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileResolved, setProfileResolved] = useState(false);
  const [setupDone, setSetupDone] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TRACK_KEY);
      // A persisted track means a returning session → skip the setup screen and
      // resume straight into the track.
      if (isTrack(stored)) { setTrack(stored); setSetupDone(true); }
      // Or the setup screen was already completed this login (persisted so a
      // reload before choosing a track doesn't re-show it).
      else if (localStorage.getItem(SETUP_KEY) === '1') setSetupDone(true);
    } catch {
      /* localStorage unavailable — fall back to the chooser */
    }
  }, []);

  function completeSetup() {
    try { localStorage.setItem(SETUP_KEY, '1'); } catch { /* ignore */ }
    setSetupDone(true);
  }

  // Load the shared account profile for the setup/settings screen. Guests resolve
  // to null and skip straight to the chooser. Updates channel so the setup
  // screen reflects the freshest saved profile, not a login-time snapshot.
  useEffect(() => {
    const unsub = subscribeToProfileUpdates((p) => {
      setProfile(p);
      setProfileResolved(true);
    });
    return unsub;
  }, []);

  function pick(next: Track) {
    try {
      localStorage.setItem(TRACK_KEY, next);
    } catch {
      /* persistence failed — still proceed for this session */
    }
    setTrack(next);
    // Mirror the choice onto the signed-in user's profile (no-op for guests) so
    // the admin English/German dashboards can split customers by track.
    void saveTrackChoice(next);
  }

  function reset() {
    try {
      localStorage.removeItem(TRACK_KEY);
    } catch {
      /* ignore */
    }
    // Switching language returns to the chooser, not the setup screen.
    setSetupDone(true);
    setTrack(null);
  }

  // Profile-first: signed-in users see the account screen once before choosing a
  // language. Guests (no account) and resolved-null profiles fall through.
  if (!track && !setupDone) {
    if (!profileResolved) {
      return <GateLoader />;
    }
    if (profile && !profile.isGuest) {
      return (
        <AccountScreen
          mode="setup"
          profile={profile}
          onSaved={setProfile}
          onLogout={() => { void logOutUser(); }}
          onContinue={completeSetup}
        />
      );
    }
  }

  if (track === 'de') {
    // German app has no built-in language switch, so overlay a small floating
    // button that returns to the chooser (where English can be picked). It sits
    // clear of the German app's fixed bars: below the mobile top header, above
    // the desktop content, and off the mobile bottom nav / desktop left sidebar.
    return (
      <Suspense fallback={<GateLoader />}>
        <App />
        <button
          onClick={reset}
          title="Хэл солих / Switch language"
          aria-label="Switch language"
          className={gold
            ? 'fixed right-3 top-20 md:top-3 z-[130] inline-flex items-center gap-1.5 rounded-full border border-surface-variant bg-surface-container/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-on-surface shadow-lg hover:bg-surface-container-high transition-colors'
            : 'fixed right-3 top-20 md:top-3 z-[130] inline-flex items-center gap-1.5 rounded-full border border-ink-line bg-ink-raise/90 backdrop-blur px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-paper-2 shadow-black/40 hover:border-paper/60 hover:bg-ink-2 hover:text-paper transition-colors'}
        >
          <span aria-hidden="true">🌐</span> Хэл солих
        </button>
      </Suspense>
    );
  }
  if (track === 'en') {
    return (
      <Suspense fallback={<GateLoader />}>
        <EnglishApp onSwitchLanguage={reset} />
      </Suspense>
    );
  }
  if (track === 'edu') {
    return <Suspense fallback={<GateLoader />}><EducationApp onSwitchLanguage={reset} /></Suspense>;
  }
  return <Chooser onPick={pick} />;
}
