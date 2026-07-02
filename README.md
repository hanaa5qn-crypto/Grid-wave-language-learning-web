# Vivid Lingua

Language-learning platform for Mongolian speakers. Two tracks today — German
(A1–C1) and English (IELTS + SAT) — with placement testing, AI-graded
writing/speaking, spaced-repetition vocabulary, and QPay/SocialPay payments
via Byl.

One Express server (`backend/`) serves both the API and the React SPA
(`frontend/` + `english/`).

## Run locally

**Prerequisites:** Node.js 22+

```bash
npm install
npm run dev        # http://localhost:3000
```

## Commands

```bash
npm run lint       # type-check (tsc --noEmit)
npm test           # vitest suite
npm run build      # production build (frontend → dist, backend → dist/server.cjs)
npm start          # serve the production build
```

Type-check and tests need extra memory for the generated vocab data:
prefix with `NODE_OPTIONS=--max-old-space-size=4096`.

## More

- `CLAUDE.md` / `AGENTS.md` — architecture map + working conventions
- `DEPLOY.md` — deployment (Vercel is production; Render blueprint is a fallback)
- `FIREBASE_SETUP.md` — Firebase project + rules setup
- `PAYMENTS_MONGOLIA.md` — Byl/QPay payment flow
