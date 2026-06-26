# CHECKPOINT — Vivid Lingua

_Last updated: 2026-06-25 (session 2). For resuming in a fresh Claude/AI session with zero prior context._

## Context
Vivid Lingua = German (+ English IELTS/SAT) learning web app for the Mongolian market
(React 19 + Vite + TS, Express backend, Firebase, Gemini AI). `npm run dev` = Express + Vite
on :3000. `npm run lint` = `tsc --noEmit`; `npm test` = vitest. Vercel project `vivid-lingua`,
team `gipfel-s-projects`. Repo: `Grid-wave-language-learning-web`. ⚠ App code lives in the nested
dir `antigravity/Vivid-Lingua/` (the repo root is one level up and is NOT the git repo).
Production deploys from **`main`** only.

---

## DONE ✅ 2026-06-25 (session 2) — English placement: harder/adaptive, neural pausable listening, real free=A1 gating
**Shipped to `main` as commit `032900a` (pushed).** User goal: make the first (evaluation)
test much harder + adaptive; make listening pausable and STOP it on submit; fix the robotic
voice on the evaluation test; after eval auto-suggest compatible lessons and, for free users,
show them locked + give the free version. User explicitly chose **"actually lock it (free = A1
only)"** when told the lesson paywall had never been wired in.

**Adaptive placement** (`english/src/englishLearning.ts`, `EnglishPlacementTest.tsx`):
- Opens at **B1** (`EN_PLACEMENT_START_INDEX = 2`) and moves a FULL CEFR level per answer
  (`advanceEnglishDifficulty`: correct → +1, wrong → −1, clamped). The German 60-q test in
  `frontend/src/placement.ts` is untouched (still the 2-in-a-row streak staircase).

**Listening** (`EnglishPlacementTest.tsx` + shared `frontend/src/utils/tts.ts`):
- Replaced the inline robotic `window.speechSynthesis` with the neural client `playTts`/
  `pauseTts`/`resumeTts`/`stopTts` (Azure `en-GB-SoniaNeural`). Play/Pause/Resume/Replay UI.
- `stopTts()` on submit / finish / skip / unmount → audio never keeps playing after submit.
- Fixed a real race: Pause hit *while the neural clip was still fetching* was lost; added a
  `pausePending` flag honored in the fetch continuation + fallback path.

**Real free = A1 lesson gating** (the paywall was previously DEAD code — `PracticeGate` was
never mounted, so free users could open every lesson):
- IELTS **Reading/Listening** (`ielts/tabs/IeltsReadingTab.tsx`, `IeltsListeningTab.tsx`,
  `quizKit.tsx`): added **A1** to `IELTS_LEVELS`; free defaults to A1; `isFreeLessonLocked`
  locks A2–C2 cards → `onUpgrade`.
- SAT **Reading&Writing/Math** (no CEFR A1): `satQuizKit.gateFreePractice` + `FreePracticeLock`
  give free users the first domain as a taste, rest Pro — gated against the FULL set so the
  domain filter can't bypass it.
- Wired `allContent`/`onUpgrade` through `IeltsApp.tsx` / `SatApp.tsx` into those tabs.
- `EnglishPlacementTest` result screen auto-suggests level-compatible lessons; free above A1 →
  locked + a working "free A1 version" button (`onStartLesson`/`hasAllContent`/`onUpgrade`
  passed from `DashboardTab.tsx`).
- IELTS **Writing/Speaking** left as-is — already gated by the free AI-feedback quota, not by
  level. ⚠ OPEN QUESTION for user: should those be A1-locked too?
- Removed dead `english/src/PracticeGate.tsx`; corrected the stale `frontend/src/plans.ts` comment.

**Tests/verify:** new `tests/english-lesson-gate.test.ts` (gating helpers incl. SAT
filter-bypass regression) + new staircase tests in `tests/englishLearning.test.ts`. De-flaked
the speech-recognition mock (`tests/setup.ts` 50ms→300ms, `tests/e2e/mocks.test.tsx` wait→500ms)
that parallel runs were racing. `tsc` clean; **199 tests pass (3× deterministic).** Two
adversarial review workflows (10 agents) confirmed the fixes and caught the SAT bypass.

---

## (prior session) Minimalist monochrome restyle (Image #1) of all non-hero pages

⚠ The branch/deploy facts in the section below are from session 1 and may be stale — `main`
now includes session-2 commit `032900a`. The monochrome design notes remain accurate.

Active branch then: **`english-ielts-sat-track`**.

## DONE ✅ this session — pure-monochrome editorial restyle

**Goal (user):** make login/signup + EVERY page except the hero look like Image #1 — a
minimalist, pure-grayscale, editorial dark UI (near-black canvas, high-contrast serif display,
uppercase letter-spaced sans labels, thin hairline borders, white-fill CTAs, NO color). The
user explicitly rejected the earlier warm "Atelier Press" gold/teal direction.

### Design foundation — `frontend/src/index.css` (additive, hero-safe)
- Added **Fraunces** serif to the Google Fonts `@import` (alongside the other agent's
  Instrument Serif + Inter — both kept).
- Added a self-contained **ink↔paper monochrome token scale** in `@theme`:
  `--color-ink #0a0a0a` (page), `ink-raise #141414` (cards/inputs), `ink-2 #1e1e1e` (hover),
  `ink-line #262626` / `ink-line-2 #3a3a3a` (borders), `paper #ededeb` (text/CTA fills),
  `paper-2 #9b9893` (secondary), `paper-3 #66635e` (faint), `--font-serif`.
- Neutralized **app-only** warm effects to grayscale (none used by the hero): `main::before`
  aurora glow, `.block-shadow` / `-orange` / `-green` gold/teal hover borders, reading
  `.word-highlight` teal, `code/pre` teal, `.animate-ripple` teal.
- The original warm tokens (`--color-primary` gold, etc.) are **untouched** — still used by
  the legacy `LandingPage.tsx`.

### Pages converted (20 files) → ink/paper tokens, serif headings, uppercase labels
LoginScreen, App.tsx (shell + ALL learning modules), OnboardingWizard, PlacementTest,
TestDafExam, DuelScreen, SocialSection, AdminDashboard, tabs/ProfileTab, components/BillingCard,
LanguageGate, GrammarTipCard, components/{MCQBlock,QuizNav,ExternalResourcesPanel},
pages/{LegalLayout,Terms,Privacy,Contact}, plus AuthGate's brand-loader.
- Mono states (no hue): correct = `bg-paper text-ink` / wrong = dim `border-ink-line` + icon;
  errors keep their AlertCircle icon so meaning survives without red.
- **Verified:** 0 residual color utilities across all non-hero files; `tsc --noEmit` clean;
  `vite build` green (Fraunces + ink/paper compile into prod CSS); screenshots of LanguageGate
  + app shell + login computed-styles all confirm the look.

### Merge with the OTHER agent's work (was pushed to the same branch mid-session)
Another session pushed 3 commits to `english-ielts-sat-track`: a **cinematic dark video hero**
(`HeroPage.tsx`, Instrument Serif + Inter, video bg via `motionPrimitives.tsx`) + a
**login-first auth flow** (`AuthGate.tsx`, `main.tsx` now renders `<AuthGate/>`) + the English
track. I **rebased** my monochrome commit on top (not force-pushed) and resolved:
- `index.css` font `@import` → unioned all 5 font families.
- `LoginScreen.tsx` → kept their new `onGuest`/`initialMode` props + "Try without account"
  button, monochromed it.
- `AuthGate.tsx` brand-loader → monochromed.
- `HeroPage.tsx`, `motionPrimitives.tsx`, `main.tsx` left **byte-identical** to their push.

### THE HERO — do NOT restyle
- The live hero is now **`HeroPage.tsx`** (cinematic, dark, already grayscale — matches Image #1).
- `LandingPage.tsx` (old warm gold marketing page) is now **legacy/unused** by the main flow
  (`AuthGate` → `HeroPage` → login). Left untouched; candidate for deletion (see TODO).

## GIT + DEPLOY STATE
- **CURRENT (session 2): `main` @ `032900a`** (English placement/listening/gating) — pushed to
  origin, in sync. Production deploys from `main`. The lines below are session-1 history.
- Branch `english-ielts-sat-track` @ **`2f4455e`** "design: monochrome editorial theme…" — pushed to origin, in sync.
- `main` (= production) is at `6021e1c`, **5 commits behind** → production still shows the OLD
  warm build. Confirmed via CSS diff: prod CSS has no `--color-ink`/Fraunces.
- **Monochrome IS live on the branch PREVIEW (verified, HTTP 200, has ink+Fraunces):**
  https://vivid-lingua-git-english-ielts-sat-track-gipfel-s-projects.vercel.app
- Production domains (`gridwave.me`, `www.gridwave.me`, `vivid-lingua.vercel.app`) → `main` (old).

## NEXT / TODO
- [ ] **GO LIVE (awaiting user OK):** merge `english-ielts-sat-track` → `main` so Vercel deploys
      production. ⚠ This also launches the cinematic hero, the login-first flow, AND the English
      IELTS/SAT track to all users — it's the whole branch, not just the restyle. User chose to
      review the preview first.
- [ ] Optional: delete legacy warm `LandingPage.tsx` (no longer rendered) for a single source of truth.
- [ ] Optional polish: remove the faint `blur-[140px]` ambient glow divs left on LoginScreen /
      PlacementTest (perf + cleaner minimalism; they stalled headless screenshots).
- [ ] Optional: uppercase + letter-space the CTA button label TEXT (currently white-fill but
      labels not transformed; left as-is to avoid shouty Cyrillic).
- [ ] Note: pure-monochrome removed some color-coded cues (der/die/das article badges,
      score-meter tone). Meaning preserved via text/length/icons. Restore hue cues only if asked.

## EARLIER (still-pending) — Native mobile apps via Capacitor
Capacitor 8 wraps the web build into iOS/Android (`capacitor.config.ts` appId
`com.vividlingua.app`; `frontend/src/native.ts` rewrites `/api` → prod URL in native WebView;
`android/` + `ios/` projects exist, untracked). TODO: install Java/Android Studio + Xcode,
`npm run cap:android`/`cap:ios`, icons/splash, store publish (user's Apple/Google accounts).
