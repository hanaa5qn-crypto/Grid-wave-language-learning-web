# Deploying Vivid Lingua

## The big picture

The app is **one server**, not two. The same Express app serves the website
*and* the API (`/api/...`), so you deploy **one service** and get **one URL**.
Firebase (login + saved progress) is called directly from the browser and works
from any host — set it up once via **`FIREBASE_SETUP.md`**.

```
        ┌──────────────────────────────────────────┐
        │   One web service                          │
   you → │   /            → the website (frontend)    │
        │   /api/...      → backend (AI, payments)    │
        └──────────────────────────────────────────┘
                     │  (browser talks directly to Firebase)
                     ▼
        ┌──────────────────────────────────────────┐
        │  Firebase Auth  → login / signup / reset   │
        │  Firestore      → saved progress           │
        └──────────────────────────────────────────┘
```

---

## Production: Vercel (current)

Production runs on Vercel as the project **vivid-lingua**. `vercel.json` wires
it up: `npm run build` builds the SPA into `dist/` and bundles the backend to
`dist/server.cjs`; `api/index.ts` re-exports the Express app as a serverless
function; all `/api/*` traffic rewrites to it.

Deploys happen automatically on push to `main` (Vercel Git integration).

### Environment variables (Vercel project settings)

| Variable | Purpose |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Admin SDK — auth verification + all entitlement writes |
| `BYL_TOKEN`, `BYL_PROJECT_ID` | Byl payment gateway (QPay/SocialPay checkout) |
| `BYL_WEBHOOK_SECRET` | HMAC verification of Byl webhooks — **required in production**; the webhook fails closed without it |
| `GEMINI_API_KEY` *or* `GOOGLE_VERTEX_PROJECT` + `GOOGLE_VERTEX_LOCATION` | Gemini for AI grading (Vertex path uses OIDC federation) |
| `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` | Neural TTS proxy (optional; falls back to browser speech) |
| `APP_BASE_URL` | Public URL for payment success/cancel redirects |
| `FOUNDER_EMAILS` | Founder account override (optional) |
| `ALLOW_DUMMY_PAYMENTS` | **Leave unset in production.** `1` enables the simulated payment provider on dev/preview |

Rate limits are tunable via `AI_RATE_PER_MIN`, `TTS_RATE_PER_MIN`,
`AI_DAILY_BUDGET`, `AI_MAX_TEXT_CHARS`, `AI_MAX_AUDIO_BYTES` (all optional).

### After changing Firestore rules

`firestore.rules` only takes effect when deployed:

```bash
npx tsx scripts/deployFirestoreRules.ts
```

### Firebase authorized domain

Firebase console → **Authentication → Settings → Authorized domains** → add
your production host (no `https://`).

---

## Fallback: Render blueprint

`render.yaml` deploys the same app as one classic Node web service (build
`npm install --include=dev && npm run build`, start `npm start`). Create a
**New → Blueprint** from the GitHub repo and fill in every secret listed in
`render.yaml` — the same set as the Vercel table above. Free-tier note: the
service sleeps after ~15 idle minutes; the first visit after that takes
~30–60s.

---

## Quick checklist

- [ ] Code pushed to GitHub (`main` auto-deploys)
- [ ] All env vars from the table set on the host
- [ ] `firestore.rules` deployed after any rules change
- [ ] Production URL added to Firebase **Authorized domains**
- [ ] Signed up a test account and confirmed progress saves
- [ ] Test payment: real Byl checkout on production; dummy provider only on preview
