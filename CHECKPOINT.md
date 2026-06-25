# CHECKPOINT — Minimalist monochrome restyle (Image #1) of all non-hero pages

_Last updated: 2026-06-25. For resuming in a fresh Claude/AI session with zero prior context._

## Context
Vivid Lingua = German (+ new English IELTS/SAT) learning web app for the Mongolian market
(React 19 + Vite + TS, Express backend, Firebase, Gemini AI). `npm run dev` = Express + Vite
on :3000. Vercel project `vivid-lingua`, team `gipfel-s-projects`
(projectId `prj_IalSD4wBcgWAghfsNBR69OjjfUFX`, orgId `team_EwwuWOkyh2FmUArhiOB8yHlG`).
⚠ The GitHub repo was **renamed**: `german-language-learning-project` → **`Grid-wave-language-learning-web`**
(old URL still redirects). Consider:
`git remote set-url origin https://github.com/hanaa5qn-crypto/Grid-wave-language-learning-web.git`

Active branch: **`english-ielts-sat-track`** (5 commits ahead of `main`). Production deploys
from `main` only.

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
