# CHECKPOINT — Settings profile editing + avatars

_Last updated: 2026-06-13 ~8pm EDT. For resuming in a fresh Claude/AI session with zero prior context._

## Goal
Add profile-editing UI to the Settings tab of Vivid Lingua (German-learning app, Mongolian market, React+TS+Firebase). Cute avatars the user can **choose** (grid) or **upload** (own photo). NOT auto-assigned per user's correction.

## DONE ✅ (built this session, lint clean + 104/104 tests + prod build green)
- [x] **`frontend/src/profiles.ts`** — avatar helpers (DiceBear v9): `AVATAR_STYLES` (adventurer/fun-emoji/big-smile/lorelei/bottts) + `DEFAULT_AVATAR_STYLE='adventurer'` (the app's beloved old style), `avatarUrlFromSeed(seed,style)`, `avatarOptions(key,page,style)` (12 cute CHOICES/page), `placeholderAvatarFor(name)` (neutral **initials** monogram). **NO auto-assign** (cofounder rejected auto-assigning cute avatars — was the app's prior behavior). `createCustomProfile` sets `avatar: placeholderAvatarFor(name)`; user picks from grid (style switcher, incl. the old adventurer ones) or uploads. (`defaultAvatarFor` removed.)
- [x] **`frontend/src/App.tsx`** — Settings tab (`activeTab==='settings'`, ~line 5160+) replaced hardcoded account card with real **profile editor**: avatar preview + Camera toggle → picker (12-tile grid, **Шинэчлэх**/re-roll, **Зураг оруулах**/upload), name input (≤30), target level A1–C2 segmented, daily goal 5/10/15/30/60 segmented, learning-goal textarea (≤280), **Хадгалах** save button. Plus **account essentials**: email (read-only), **Нууц үг солих** (sends `sendResetEmail`), **Гарах** (logout).
  - State: `profileDraft` (seeded once from currentUser, reset on logout — so background study-time saves don't clobber edits), `avatarPage`, `showAvatarPicker`, `profileSaving/Saved`, `resetSent`, `avatarUploading`, `avatarError`, `avatarFileInputRef`.
  - Handlers: `saveProfileEdits` (merges → `stripServerOwnedFields` → `setCurrentUser` + `saveProfileProgress`), `handleResetPassword`, `handleAvatarUpload` (Firebase Storage `avatars/{uid}/...`, image-only ≤5MB, sets draft avatar to download URL).
  - Imports added: `stripServerOwnedFields, avatarOptions` (profiles); `sendResetEmail` (auth); `Save, Camera, Shuffle, Upload` (lucide). Reused existing `ref/uploadBytes/getDownloadURL/getStorageInstance/getAuthInstance/isFirebaseConfigured`.
- [x] **`storage.rules`** — added `avatars/{userId}/**`: public `read`, owner-only `create/update` (raster `image/(png|jpeg|webp|gif)` only — SVG blocked to avoid stored-XSS, <5MB), owner `delete`.
- [x] **Reviewer (cavecrew-reviewer) findings fixed:** (1) draft re-seeds on account identity change (keyed by `email` via `profileDraftKeyRef`), not just logout; (2) `saveProfileEdits` spreads from `currentUserRef.current` not the stale `currentUser` closure (so background study-time saves aren't clobbered by merge); (3) `role` recomputed from goal on save; (4) SVG upload blocked client+rules; (5) save failure now shows user-facing error. NOT fixed (cost-only, deferred): old avatar objects accumulate in Storage (no cleanup of prior uploads).

## PENDING / NEXT ⏳
- [x] **DEPLOYED storage.rules** — live in prod via new `scripts/deployStorageRules.ts` (mirrors deployFirestoreRules; Rules REST API, release `firebase.storage/gipfel-german-language-learn.firebasestorage.app`, ruleset 751665fe…). Photo upload now works end-to-end.
- [ ] Manual smoke test in browser: open Settings → edit name/level/goal → Save persists; pick avatar from grid; upload a photo; password-reset email arrives.
- [ ] Optional (researcher flagged, NOT built, scope-deferred): delete-account flow w/ re-auth + confirm modal (launch expectation for data rights); nativeLang/uiLang fields (no i18n system to hook into yet).

## Facts a fresh session needs
- Settings tab is **dark-themed** Aurora Atelier tokens: `surface-container*` = dark navy, `on-surface` = near-white, `secondary` #66aafd, `on-secondary` #08234e (dark text on light-blue buttons). Use dark-theme reds (`bg-red-950/20 text-red-300`), NOT `red-50/600`.
- Avatar stored as full URL string in `profile.avatar` (rendered in `<img src>` in 3 places in App.tsx + SocialSection). DiceBear: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=<seed>`.
- `stripServerOwnedFields` strips `billing/placementCredits/aiUsage` before every client Firestore write (security). New profile fields are all client-safe.
- Existing Storage upload pattern reference: `App.tsx` ~line 1014 (audio-evaluations upload).
- Prod/canonical domain `https://www.gridwave.me`. Vercel project `vivid-lingua` id `prj_IalSD4wBcgWAghfsNBR69OjjfUFX`, team `team_EwwuWOkyh2FmUArhiOB8yHlG`.
- Build/verify: `npm run lint` (tsc), `npm run build`, `npx vitest run --config frontend/vite.config.ts`.

## Prior checkpoint (payments) — superseded, all shipped
Byl payments integration complete (commit 2c80f2b+, prod live, `GET /api/payments/methods` → byl ready). See git log if needed.
