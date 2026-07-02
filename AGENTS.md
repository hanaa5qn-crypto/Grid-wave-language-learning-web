# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Vivid Lingua is a monorepo language-learning web app (German + English tracks) for Mongolian speakers. The dev server bundles **Express** (`backend/server.ts`) with **Vite** (`frontend/`) on a single port.

### Running the app

- Install deps: `npm install` (see root `package.json`; lockfile is `package-lock.json`).
- Dev server: `npm run dev` → `http://localhost:3000` (or `PORT` env var).
- No separate frontend process; Vite runs in middleware mode inside Express.

### Lint / test / build

| Task | Command |
|------|---------|
| Typecheck | `npm run lint` (`tsc --noEmit`) |
| Tests | `npm test` (Vitest + jsdom; mocks Firebase/fetch — no live server required) |
| Production build | `npm run build` |

### Optional services (not required for basic UI dev)

- **Firebase** — real auth/profiles need the configured project in `frontend/src/firebaseConfig.ts`. Guest mode (`JUST BROWSE — NO ACCOUNT`) works without signing in.
- **`.env`** — copy from `.env.example` for Gemini, Azure TTS, QPay, and Firebase Admin. The app boots and serves the UI without these; AI/TTS/payment routes degrade gracefully.

### English track navigation (guest)

Hero → **JUST BROWSE — NO ACCOUNT** → pick **English** → `ExamChooser` (IELTS / SAT + coming-soon cards).

### Gotchas

- Automated e2e tests live under `tests/` and run via `npm test`; they do not start Playwright or a browser.
- One pre-existing flaky assertion may fail in `tests/englishLearning.test.ts` (`progress percent` expects 100 but content count can drift).
