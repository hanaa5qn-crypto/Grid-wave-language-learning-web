# CHECKPOINT — Native mobile apps (Capacitor) + local React fix

_Last updated: 2026-06-21. For resuming in a fresh Claude/AI session with zero prior context._

## Context
Vivid Lingua = German-learning web app for the Mongolian market (React 19 + Vite + TS,
Express backend, Firebase, Gemini AI). Served by `npm run dev` (Express + Vite middleware
on :3000). Live in production at https://vivid-lingua.vercel.app (Vercel project
`vivid-lingua`, team `gipfel-s-projects`). Repo `main` is in sync with origin.

## DONE ✅ this session

### 1. Fixed local React not rendering
- **Symptom:** blank app, `GET /src/main.tsx` → 404 in browser.
- **Root cause:** Vite couldn't resolve `@vercel/analytics/react`. The package was listed
  in `package.json` + lockfile but **missing from local `node_modules`** (install was out of
  sync with the lockfile). Committed code was always fine — only the local install broke.
- **Fix:** `npm install @vercel/analytics`. No tracked-file change. Verified: dev server
  renders the full app, `npm run build` green, `tsc --noEmit` clean.
- Harmless dev-only console errors remain: Vite HMR websocket + Vercel analytics scripts
  blocked by the strict CSP in `backend/server.ts`. Only matters in prod if analytics wanted —
  would need `va.vercel-scripts.com` added to CSP `script-src`/`connect-src`.

### 2. Native iOS + Android apps via Capacitor (no rewrite)
Goal: downloadable apps in Apple App Store + Google Play. Chose **Capacitor** (wraps the
existing web build) over Expo/React Native (would require full rewrite).
- Installed `@capacitor/core,cli,ios,android` v8.4.1.
- **`capacitor.config.ts`** (project root): `appId: com.vividlingua.app` (⚠ PERMANENT once
  published — change before first store submit if desired), `appName: 'Vivid Lingua'`,
  `webDir: 'dist'`.
- **`frontend/src/native.ts`** — app uses relative `fetch('/api/...')` (12 sites) which break
  inside a native WebView (origin = `capacitor://localhost`, no backend). `setupNativeApi()`
  patches `window.fetch` only when `Capacitor.isNativePlatform()` to prepend
  `https://vivid-lingua.vercel.app` to `/api` paths. Wired in `frontend/src/main.tsx`.
- `npx cap add android` + `npx cap add ios` → created `android/` and `ios/` projects (web
  assets copied from `dist`). Capacitor 8 iOS uses Swift Package Manager.
- **Mic permissions** (app records audio for speaking practice):
  - iOS: `NSMicrophoneUsageDescription` in `ios/App/App/Info.plist`.
  - Android: `RECORD_AUDIO` + `MODIFY_AUDIO_SETTINGS` in `android/app/src/main/AndroidManifest.xml`.

## NEXT / TODO
- [ ] Finish package.json scripts (was mid-edit): `cap:sync`, `cap:android`, `cap:ios`.
- [ ] `tsc --noEmit` to confirm `native.ts` typechecks.
- [ ] Install build tooling (NOT present): Java JDK + Android Studio/SDK (Android),
      Xcode + (CocoaPods or SwiftPM) (iOS).
- [ ] `npm run cap:android` / `cap:ios` → open IDE, run on simulator/device.
- [ ] App icons + splash screens (`@capacitor/assets`).
- [ ] Store publish (USER's accounts/manual): Apple Developer $99/yr, Google Play $25 once,
      signing certs, store listings.
- [ ] Decide whether to commit `android/` + `ios/` to git (currently untracked).
