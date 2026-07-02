# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Vivid Lingua — a language-learning platform (Mongolian-language UI). One Express server serves both an API and a single-page React app. Two learning tracks ship today; the roadmap is to add more.

## Commands

```bash
npm run dev          # dev server: tsx backend/server.ts + Vite middleware, http://localhost:3000
npm run lint         # type-check ONLY — this repo's "lint" is `tsc --noEmit` (no ESLint)
npm test             # vitest run (jsdom)
npm run test:watch   # vitest watch
npm run build        # vite build (frontend → dist) + esbuild bundle (backend → dist/server.cjs)
npm start            # production: NODE_ENV=production node dist/server.cjs
npm run cap:android  # build + Capacitor sync/open (also cap:ios, cap:sync)
npm run vocab:gen    # regenerate vocab data (scripts/generateVocabeo.ts)
```

Run a single test file / one test:
```bash
npx vitest run --config frontend/vite.config.ts tests/promo-route.test.ts
npx vitest run --config frontend/vite.config.ts -t "swaps an UNUSED active code"
```

Notes:
- `lint`/`test` can OOM on the large generated vocab files — prefix with `NODE_OPTIONS=--max-old-space-size=4096`.
- The dev backend (`tsx`) does **not** watch — restart it after backend changes. Frontend uses Vite HMR (set `DISABLE_HMR=true` to disable file-watching during agent edits).
- Vitest is configured inside `frontend/vite.config.ts`; always pass `--config frontend/vite.config.ts`.

## Architecture

### One process, two halves
`backend/server.ts` is a single Express app. In dev it lazy-imports Vite in middleware mode and serves the SPA; in prod (`NODE_ENV=production`) it serves the static `dist/` build with an `index.html` SPA fallback. `npm run build` bundles the backend to `dist/server.cjs` via esbuild. On Vercel the app runs serverless (the `app.listen` is skipped when `VERCEL` is set without `PORT`).

### Entry / track-selection flow (where languages are wired)
`frontend/src/main.tsx` → `AuthGate` (Firebase auth) → `frontend/src/LanguageGate.tsx` (the track chooser; the chosen track persists in `localStorage` under `TRACK_KEY` and mirrors onto the user profile for the admin split). LanguageGate then renders:
- `'de'` → the German app, `frontend/src/App.tsx`
- `'en'` → `english/src/EnglishApp.tsx`, which itself picks an exam: `IeltsApp` or `SatApp`

**Two tracks exist today: German (`frontend/src`) and English with IELTS + SAT exams (`english/src`). The product roadmap is to add more languages.** A new language is added at this seam: a new `Track` value + Chooser tile + render branch in `LanguageGate.tsx`, plus a new track folder that follows the existing app/shell/tabs pattern. Do not graft a new language onto the German `App.tsx`.

### Cross-folder sharing
`english/src/**` imports shared infrastructure from `../../frontend/src/**` (Firebase, `learning.ts`, `placement.ts`, `plans.ts`, `promo.ts`, `utils/tts.ts`, `profiles.ts`). The Vite alias `@` → `frontend/src`, and `vite.config.ts` widens `server.fs.allow` to the repo root so these cross-folder imports work in dev. Shared logic lives in `frontend/src`; track-specific code lives in its track folder.

### Exam app pattern (one file per skill — follow it)
Each English exam (`ielts/`, `sat/`) is a thin app (`IeltsApp.tsx`/`SatApp.tsx`) over the shared `english/src/AppShell.tsx`, with **one file per skill tab** under `<exam>/tabs/` (e.g. `IeltsReadingTab.tsx`, `IeltsSpeakingTab.tsx`, `SatMathTab.tsx`) and a shared `quizKit.tsx`/`satQuizKit.tsx` for reused UI pieces. Bulk content is generated `*.ts`/`*Generated.ts` data files imported by the tabs. Add a new skill/exam by adding a tab/app file, not by enlarging an existing one.

### Backend: thin routes over pure libs
`backend/routes/index.ts` registers every route module; each `routes/*.ts` is a thin Express handler. Real logic lives in `backend/lib/*` as **pure, framework-free functions** (e.g. `promo.ts`, `plans.ts`, `socialLogic.ts`, `payments/byl.ts`) that the test suite imports and exercises directly. `lib/firebaseAdmin.ts` initialises the Admin SDK from `FIREBASE_SERVICE_ACCOUNT_JSON`; the Admin SDK **bypasses `firestore.rules`**, so all entitlement writes go through the backend.

### Firestore data model + server-owned fields
The `users/{uid}` doc holds both client-writable progress and **server-owned** entitlement fields. Server-owned fields are enforced in **two places that must stay in sync**:
- `firestore.rules` → `serverOwnedFields()` (rejects client writes; must be **deployed** to take effect: `firebase deploy --only firestore:rules`)
- `frontend/src/profiles.ts` → `SERVER_OWNED_PROFILE_FIELDS` (client strips them before every profile write)

Current server-owned set: `billing`, `placementCredits`, `aiUsage`, `promo`, `redeemedCodes`. When you add an entitlement/anti-abuse field, add it to **both** lists or a client can tamper with it. Other collections (`teacherCodes`, `commissions`, `analytics`, `payments`, `subscriptions`) are admin-only and written solely by the backend; admin is a server-set custom claim (`admin:true`), never email-based.

### Payments
Three providers behind one flow (`backend/routes/payments.ts` + `lib/payments/byl.ts`): **`byl`** (real — QPay/SocialPay/Pocket hosted checkout, confirmed by polling + an HMAC-SHA256 webhook against the raw request body), **`dummy`** (dev/preview one-click simulation, excluded from revenue), and **`promo`** (100%-off teacher code → free grant, no gateway). Byl's API is always the source of truth for activation. Teacher promo codes give a per-person-per-code discount + commission; see `lib/promo.ts` and the `redeemedCodes` ledger.

### AI grading
Writing/speaking/composition are graded by `@google/genai` (Gemini via Vertex) through `backend/lib/ai.ts`, exposed by `routes/evaluate-*.ts` and `english-review.ts`. The Express JSON limit is 25 MB so base64 speaking-audio fits; the AI guard (`lib/aiGuard.ts`) + `routes/ai-quota.ts` rate-limit per IP/user.

### Mobile
Capacitor (`cap:*` scripts) wraps the built SPA for Android/iOS; native bits in `frontend/src/native.ts`.

## Conventions

- **Separate concerns; do not grow monoliths.** Keep backend route handlers thin and put logic in `backend/lib/*`. Put each frontend feature/screen/tab in its own file under `components/`, `tabs/`, or `pages/`. `frontend/src/App.tsx` (~5k lines, German app) and `AdminDashboard.tsx` are legacy monoliths — **extract** new work into new files rather than adding to them.
- **React 19, no `@types/react`.** Class components must `declare` their `state`/`props` fields (typing gotcha). Auth/routing is intercepted at `AuthGate` (root), so new top-level routes belong there.
- **Design system "Aurora Atelier".** Use the semantic tokens (`bg-ink`, `bg-ink-raise`, `bg-ink-2`, `text-paper`, `text-paper-2`, `border-ink-line`, …), Tailwind v4 via `@tailwindcss/vite`. Watch the `@layer` cascade gotcha in `frontend/src/index.css`. UI copy is Mongolian.
- **Testing.** Pure `lib/` + frontend `*.ts` logic is unit-tested directly; Express routes are tested with `supertest` over an in-memory Firestore mock (`tests/promo-route.test.ts` is the template — the mock enforces Firestore's reads-before-writes-in-a-transaction rule, so order route transactions accordingly).
