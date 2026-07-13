# Vivid Lingua — Backend Audit & Progress-Tracking Bug Diagnosis

Date: 2026-07-12 · Branch audited: `feature/seo-prerender` (HEAD `7cc28c4`)
Read-only investigation. No code was changed. Every claim cites `file:line`.
Items that could not be determined from code are marked **[inferred]** or **[undetermined]**.

---

## 1. STACK INVENTORY

### 1.1 Stack

| Layer | Technology | Where configured |
|---|---|---|
| Database | **Cloud Firestore** (Firebase project `gipfel-german-language-learn`) | `frontend/src/firebaseConfig.ts:16-23` (web config, public by design) |
| Client DB library | `firebase/firestore` web SDK, lazy-initialized | `frontend/src/firebase.ts:17-24` |
| Server DB library | Firebase **Admin SDK** (bypasses security rules) | `backend/lib/firebaseAdmin.ts`; credentials from `FIREBASE_SERVICE_ACCOUNT_JSON` (line 11) or `FIREBASE_PROJECT_ID`/`FIREBASE_CLIENT_EMAIL`/`FIREBASE_PRIVATE_KEY` (lines 20-22) or `GOOGLE_APPLICATION_CREDENTIALS` (line 32) |
| Auth | **Firebase Auth**, email + password | `frontend/src/auth.ts:9-16`; admin role is a server-set custom claim `admin:true` (`firestore.rules:16-18`) |
| ORM / schema | **None.** No migrations, no schema file. `firestore.indexes.json` is empty. All field types below are **inferred from code**. |
| Security rules | `firestore.rules` (deployed manually: `firebase deploy --only firestore:rules`) |
| Backend | Single Express app (`backend/server.ts`), thin routes over pure libs (`backend/lib/*`), runs serverless on Vercel |

Notable: **Firestore offline persistence is NOT enabled** — `getFirestore(app)` plain at `frontend/src/firebase.ts:21`, no `enableIndexedDbPersistence`/`persistentLocalCache`. The web SDK therefore uses a memory-only cache: a fresh page load with a flaky network has **no local fallback for reads, and queued writes die with the tab**. This matters for the bug (§4).

### 1.2 Collections (all fields inferred from code — no schema exists)

Eleven collections. The only two files where the *client* SDK touches Firestore are `frontend/src/auth.ts` (users doc) and `frontend/src/AdminDashboard.tsx` (admin reads). `english/src/**` has **zero direct Firestore access** — it persists through shared helpers in `frontend/src/auth.ts` and the backend HTTP API.

#### `users/{uid}` — profile + ALL learning progress (the collection that matters for the bug)

Doc ID = Firebase Auth uid. Full client-side field list: `UserProfile` interface, `frontend/src/profiles.ts:1-141`.

Progress-relevant fields:

| Field | Type | Meaning | Declared |
|---|---|---|---|
| `completedActivityIds` | `string[]` | German completion ledger (activity-key strings) | `profiles.ts:13` |
| `studyDays` | `string[]` (local `YYYY-MM-DD`) | German streak source | `profiles.ts:14` |
| `studySecondsByDate` | `Record<string,number>` | German study time per day | `profiles.ts:15` |
| `streak`, `progress`, `completedLessons` | `number` | German aggregates, **recomputed on load** (`utils/profileMetrics.ts:68-94`) | `profiles.ts:7-9` |
| `srsByWord` | `Record<string, {ease,intervalDays,reps,due,lastReviewed}>` | German vocab SM-2 state, keyed by `srsWordKey` (§5) | `profiles.ts:63` |
| `mistakeIds` | `string[]` | German failed-MCQ review queue | `profiles.ts:65` |
| `completedActivityIdsEn` | `string[]` | English completion ledger (`en:read:12`, `en:sat:92001`, …) | `profiles.ts:26` |
| `studyDaysEn`, `studySecondsByDateEn` | as above | English streak/time (fully separate from German) | `profiles.ts:21-22` |
| `mistakeIdsEn`, `vocabLearnedEn` | `string[]` | English mistakes / learned flashcards | `profiles.ts:27-31` |
| `testHistoryEn` | array of attempt records | English mock-test attempts, newest first, capped 50 (`english/src/englishLearning.ts:63-73`) | `profiles.ts:36-45` |
| `placement`, `placementEn`, `placementPending(En)`, `targetLevel(En)` | object/scalar | Placement results & level | `profiles.ts:48-59, 77-88` |

Server-owned fields (client writes rejected by rules AND stripped client-side): `billing`, `placementCredits`, `aiUsage`, `promo`, `redeemedCodes`, `placementUnlock` — defined in **two places that must stay in sync**: `firestore.rules:39-41` and `profiles.ts:147`. They currently match. `aiUsage` is written by the backend (`backend/lib/plans.ts:239-243`) but is **not declared in the `UserProfile` interface** — schema drift, harmless but undocumented.

Rules for `users/{uid}` (`firestore.rules:49-55`): get = owner or admin; list = admin; create/update = owner (minus server-owned fields) or admin; delete = owner.

#### Other collections (summary; none hold learning progress)

| Collection | Doc ID | Purpose | Writers | Readers | Rules |
|---|---|---|---|---|---|
| `payments/{provider_paymentId}` | `payments.ts:178` | Revenue ledger | `backend/routes/payments.ts:190` | `AdminDashboard.tsx:367` (full scan); scripts | admin-only (`firestore.rules:57-59`) |
| `paymentInvoices/{senderInvoiceNo}` | `payments.ts:107-110` | Pending checkouts | `payments.ts:384,519,767,239` | `payments.ts:186,568,664,667,807` | no rule → default-deny; Admin-SDK only |
| `webhookEvents/{byl_eventId}` | `payments.ts:650` | Webhook replay guard | `payments.ts:685` | `payments.ts:657` | no rule → default-deny |
| `teacherCodes/{code}` | `backend/lib/promo.ts:71-74` | Affiliate codes | `backend/routes/promo.ts:108,150,171,237,242,323`; `payments.ts:283` | `promo.ts:122,139,168,190,226,317` | admin-only (`firestore.rules:69-71`) |
| `commissions/{provider_paymentId}` | `payments.ts:257` | Teacher commissions | `payments.ts:258` (only writer) | `AdminDashboard.tsx:397` | get/list/update admin (`firestore.rules:72-74`); no create/delete rule (Admin SDK bypasses anyway) |
| `analytics/{YYYY-MM-DD}` | `backend/routes/track.ts:30-32` | Traffic counters | `track.ts:47` | `AdminDashboard.tsx:368` | admin read-only (`firestore.rules:80-82`) |
| `rateLimits/{docId}` | `backend/lib/aiGuard.ts:74-75,129`; `payments.ts:41` | Cross-instance rate limiters | `aiGuard.ts:88,92,142`; `payments.ts:48,52` | only inside their own transactions | no rule → default-deny |
| `duels/{code}` | `backend/routes/social.ts:133` | Head-to-head quizzes | `social.ts:142,186,310` | `social.ts:203-204,228,254,375` | no rule → default-deny |
| `referralCodes/{code}` | `social.ts:340` | Referral code → uid | `social.ts:342` | `social.ts:165,372` | no rule → default-deny |
| `subscriptions/{id}` | — | **ORPHAN: declared in `firestore.rules:61-63`, never read or written by any code.** Billing actually lives on `users.billing`. | — | — | admin-only (dead rule) |

Flags:
- `subscriptions` — rules-only orphan (written never, read never).
- `rateLimits`, `webhookEvents`, `referralCodes`, `paymentInvoices`, `duels` — server-internal; no admin/UI reader (by design, but relies on default-deny rather than explicit rules).
- Fields `friendUids`, `duelStats`, `referralCode`, `referredBy`, `invitesCount`, `streakFreezeCount`, `placement.unlocked` are written by the backend but **not server-owned** — the owner-write rule permits a client to tamper with them (`firestore.rules:53` only protects the six listed fields).

---

## 2. DATA FLOW MAP — `users/{uid}` progress fields

(Full read/write tables for the non-progress collections are in §1.2; this section details the progress document.)

### 2.1 Writers

| Site | Function | Method | Fields touched |
|---|---|---|---|
| `frontend/src/auth.ts:51` | `signUpWithProfile` | `setDoc` merge | whole new profile (stripped) |
| `frontend/src/auth.ts:90` | `saveProfileProgress` | `setDoc` merge | **whole profile** (stripped) — currently only reachable from `AccountScreen` settings saves **[inferred: no other live caller found; App.tsx references it only in comments at 1077]** |
| `frontend/src/auth.ts:121` | `updateProfileFields` | `updateDoc` field patch | only given fields; dotted paths supported |
| `frontend/src/auth.ts:129` | `updateProfileFields` fallback | `setDoc` merge | same patch when doc missing |
| `frontend/src/auth.ts:187` | `saveTrackChoice` | `setDoc` merge | `{track}` |
| `frontend/src/auth.ts:247` | `loadProfileFor` | **`setDoc` (NO merge)** | whole default profile when getDoc says doc doesn't exist |
| `frontend/src/App.tsx:200` | streak-reset on login | via `updateProfileFields` | `streak` |
| `frontend/src/App.tsx:380-384` | `applyMetricProfile` (diff patch) | via `updateProfileFields` | any changed field incl. **`completedActivityIds` (whole array)**, `mistakeIds`, `srsByWord`, `studyDays` |
| `frontend/src/App.tsx:433-436` | `recordStudySeconds` | via `updateProfileFields` | `studySecondsByDate.<date>` (dotted), `learningCurve`, `lastActiveAt` |
| `frontend/src/App.tsx:458-461` | flush on hide/unload | via `updateProfileFields` | whole `studySecondsByDate` map |
| `english/src/stats.tsx:192` | `recordStudy` | via `updateProfileFields` | `studyDaysEn` |
| `english/src/stats.tsx:207` | `patchProfile` | via `updateProfileFields` | patched fields incl. **`completedActivityIdsEn` (whole array)**, `mistakeIdsEn`, `testHistoryEn`, `vocabLearnedEn`, `placementEn`, `targetLevelEn` |
| `english/src/stats.tsx:320-322, 340-342` | study-seconds flush | via `updateProfileFields` | `studySecondsByDateEn.<date>` / whole map |
| Backend (Admin SDK) | trial grant `backend/routes/account.ts:48`; payments `payments.ts:213,223,279,606`; AI quota `plans.ts:239`; social `social.ts:101,298,349,412,416`; promo `promo.ts:236,320` | `tx.set` merge | server-owned + social fields only — **never touches `completedActivityIds*`** |

### 2.2 Readers

| Site | Function | Shape |
|---|---|---|
| `frontend/src/auth.ts:237` | `loadProfileFor` — the ONLY client profile read; runs once per auth event | `getDoc` single doc |
| `frontend/src/auth.ts:260-287` | `startProfileWatcher` fans the loaded profile out to both tracks via `subscribeToAuthedProfile` / `subscribeToProfileUpdates` (`auth.ts:300-308`) | ~~in-memory pub/sub, **no `onSnapshot` — never re-reads after load**~~ **FIXED (fix 4, 2026-07-12): now a live `onSnapshot` per auth event; first snapshot → auth channel, subsequent → updates channel with echo-guard + ledger-union reconciliation** |
| `frontend/src/App.tsx:191-232` | German app subscription → seeds `completedActivityIds`/`studyDays`/`studySecondsByDate` state (lines 207-209) | memory |
| `english/src/stats.tsx:146-171` | English provider subscription → `profile` state | memory |
| `frontend/src/AdminDashboard.tsx:366` | admin | `getDocs` full collection scan |
| Backend readers | `plans.ts:167`, `payments.ts:188,337,602`, `social.ts:52,333,383-385,443,450`, `promo.ts:197,279,306` | single-doc gets/`tx.get` |

**Key structural fact:** after the one `getDoc` per page load, each track keeps its own in-memory copy (`currentUserRef` in `App.tsx:164`; `profileRef` in `stats.tsx:132`) and *pushes* whole arrays back with `updateDoc`. There is no listener, no transaction, and no `arrayUnion` on the completion ledgers.

### 2.3 Client-side-only persistence (progress-relevant flags)

All localStorage keys are **global — none are uid-scoped**. Routing/session flags (`vivid-lingua-guest` `AuthGate.tsx:26`, `vivid-lingua-track` `LanguageGate.tsx:21`, `vivid-lingua-setup-done` `LanguageGate.tsx:25`, `vivid-english-exam` `EnglishApp.tsx:38`, deep-link stashes `App.tsx:563-565`, `duelChallengeSeen` `App.tsx:529`, `theme`, `vl_visit_<date>`) are fine. Flags:

| # | Severity | Item |
|---|---|---|
| F1 | **High** | German full mock exam (`TestDafExam.tsx:127-171`): every answer, score, AI evaluation is React state only — no Firestore, no localStorage. A finished attempt vanishes on refresh. German has no `testHistory` equivalent at all (English has `testHistoryEn`). |
| F2 | Medium | German Goethe `ExamTab.tsx:270,308` records only per-question completion flags — no attempt/score record. |
| F3 | Medium | German placement in-progress state AND scored result cached in localStorage `vivid-placement-progress-v1` (`PlacementTest.tsx:48-93`) — **not uid-scoped**; on a shared device user B can resume user A's snapshot. Authoritative copy does reach Firestore on completion. |
| F4 | Low | English mock tests / placement have no crash-recovery snapshot (memory-only until submit). |
| F5 | By design | Guest progress is intentionally memory-only (`profiles.ts:310-347`; guards `auth.ts:82,103`, `stats.tsx:173`). |

---

## 3. CRITICAL FLOW TRACES

### 3a. "User completes an exercise"

**German reading example** (listening/exam/speak/write are parallel):

1. UI: learner answers the last MCQ correctly → `onSelect` in `frontend/src/tabs/ReadTab.tsx:174-198`. Completion requires ALL questions of the item answered correctly *within the current session's local answer state* (`ReadTab.tsx:182`).
2. Key built: `actId = activityKey('library:read', item.id)` — `ReadTab.tsx:178`; `activityKey(prefix, value)` = `` `${prefix}:${String(value).trim().toLowerCase().replace(/\s+/g,'-').slice(0,96)}` `` (`utils/profileMetrics.ts:64-66`, mirrored `learning.ts:227`). For reading/listening `value` is the numeric literal `id` from `frontend/src/library.ts` → e.g. `library:read:12`.
3. `recordStudyActivity(actId)` — `App.tsx:388-407`: reads the in-memory profile from `currentUserRef.current` (line 389), builds `nextCompleted = Set(existing ∪ actId)` (line 393), adds today to `studyDays` (line 394), early-returns if both already present (line 398).
4. `applyMetricProfile` — `App.tsx:357-386`: recomputes aggregates (`normalizeProfileMetrics`, `utils/profileMetrics.ts:68`), updates React state, then **diffs against the previous in-memory profile** (lines 373-379) and calls `updateProfileFields(patch)` with only changed fields — including the **entire `completedActivityIds` array**.
5. DB write: `updateProfileFields` (`auth.ts:99-134`) strips server-owned roots, then `updateDoc(users/{uid}, patch)` (`auth.ts:121`). Arrays are **replaced wholesale** (Firestore `updateDoc` semantics; no `arrayUnion`). Errors are swallowed: `.catch(console.warn)` at `App.tsx:381-383`.
6. Write keys: `{ uid: implicit doc path, completedActivityIds: string[] of activity-key strings }`. There is **no per-attempt record** — no timestamp, score, or attempt id.

Key formats by exercise type (write side):
- German read/listen: `library:read:<numeric id>` / `library:listen:<numeric id>` (`ReadTab.tsx:178`, `ListenTab.tsx:223`) — **stable** (ids are literals in `library.ts`).
- German exam MCQs: `exam:<level>:reading:<id>` / `...listening:<id>` (`ExamTab.tsx:270,308`) — stable.
- German speaking: `activityKey('speak', <modelAnswer TEXT>)` (`App.tsx:811,821,868`; unit path mirror `learning.ts:257`) — **content-derived: first 96 chars of the German sentence**.
- German writing: `activityKey('write:<level>', <prompt TEXT>)` (`App.tsx:992`; `learning.ts:260`) — **content-derived**.
- German core lesson: literal `'lesson:core-guten-tag'` (`App.tsx:1015`).
- German vocab SRS: `srsWordKey(word) = String(word.rank ?? german-mongolian)` (`learning.ts:76-78`), written `VocabTab.tsx:117-142` into `srsByWord`.
- English read/listen: `en:read:<id>` / `en:listen:<id>` (`englishLearning.ts:28-30`; callers `IeltsReadingTab.tsx:125`, `IeltsListeningTab.tsx:182` → `recordEnglishActivity`, `stats.tsx:216-230`) — stable. Note `recordEnglishActivity` marks the item completed **even when answered wrong** (`stats.tsx:219-221`); wrongness only adds a mistake entry.
- English SAT practice: `en:sat:<question id>` (`englishLearning.ts:35-37`; `satQuizKit.tsx:257` → `recordPracticeDone`, `stats.tsx:235-249`) — completed only when correct; stable literal ids in partitioned ranges (tests 1–98, drills 91001+, generated math 92001+, RW 93001+ — `english/src/sat/satGenerated.ts:7-8`).
- English writes go through `patchProfile` (`stats.tsx:199-210`) → same `updateProfileFields` array-replace path; errors also only `console.warn` (`stats.tsx:207-209`).

### 3b. "User opens a lesson/exercise list"

1. Page load → `startProfileWatcher` (`auth.ts:260-287`) → `onAuthStateChanged` fires with the restored user → `loadProfileFor` does **one** `getDoc(users/{uid})` (`auth.ts:237`).
   - Doc exists → profile fans out to subscribers.
   - Doc missing → a **default blank profile is created and written with non-merge `setDoc`** (`auth.ts:241-248`).
   - **Read throws (network flicker, offline, rules)** → an **in-memory blank fallback profile** is returned (`auth.ts:249-257`) — `completedActivityIds: []`, `targetLevel 'A1'`, everything reset. Only a `console.warn`.
2. German app: subscription callback seeds state from the loaded profile (`App.tsx:204-209`). Completion display and gating all derive from that in-memory array:
   - Unit path/locks: `buildUnitsForLevel` + `lockedItemIds(units, new Set(completedActivityIds))` (`App.tsx:262-266`; `learning.ts:234-296`). A unit "passes" at ≥70 % of its activities completed (`learning.ts:202,274-277`).
   - "Today's Session": `buildTodaySession` picks the first library item whose `activityKey(...)` is **not** in the completed set (`learning.ts:369-382`).
   - Tabs mark done/not-done by `completed.has(activityKey(...))` — read keys are built with the *same* functions as write keys, so **read/write key parity holds for every type as long as the underlying `id`/text is unchanged**.
3. English app: `EnglishStatsProvider` subscription (`stats.tsx:146-171`) → tabs read `profile.completedActivityIdsEn` directly (`DashboardTab.tsx:57`, `SatMathTab.tsx:203-204`, `satQuizKit.tsx:129-130`); Today's Session via `buildEnglishToday` (`englishLearning.ts:120-132`); unit locks via `buildEnglishUnits`/`enUnitUnlocked` (`englishLearning.ts:197-235`).
4. There is **no re-read after load**: no `onSnapshot`, no polling. The UI's notion of "completed" is whatever the single login-time `getDoc` returned, mutated locally since.

---

## 4. BUG DIAGNOSIS — completed exercises re-marked as not done

### 4.1 Write-key vs read-key comparison

For every exercise type the read predicate uses the same key-builder as the write (§3a/§3b) — **no format, type, or scoping mismatch exists in the happy path**. `user_id` scoping is implicit and correct (doc path = auth uid on both sides). So the bug is not a key-shape mismatch; it is a **data-loss / staleness problem around the array itself**, plus **key *instability* over time** for two exercise families.

### 4.2 Ranked root-cause candidates

**#1 — Blank-fallback profile on a failed login-time read, then array-replace writes make the wipe permanent. Confidence: HIGH (as the mechanism matching the symptom); the trigger frequency is [undetermined] without production logs.**

Evidence chain:
- `loadProfileFor` catch-branch (`auth.ts:249-257`) returns a **fresh blank profile** on ANY `getDoc` error. Offline persistence is not enabled (`firebase.ts:21`), so a flaky connection at page load has no cache to fall back on — the read rejects and the user silently gets an empty profile. UI instantly shows *every* exercise as not done (the exact reported symptom), streak 0, level reset to `'A1'`.
- Worse, the wipe becomes durable the moment the user does anything: `recordStudyActivity` builds `nextCompleted` from the blank in-memory copy (`App.tsx:393`) and `updateProfileFields` **replaces** the server's `completedActivityIds` with a 1-element array (`auth.ts:121`). Same for English via `patchProfile` (`stats.tsx:207`). Nothing merges with the server state.
- Sibling hazard in the same function: if `getDoc` *succeeds* but reports the doc missing (e.g. reading before a slow first write, or against the wrong project), `auth.ts:247` writes the blank default with a **non-merge `setDoc`**, which would itself erase any fields the doc later turns out to have. **[inferred as lower-probability; snap.exists() false for an existing doc requires unusual conditions]**
- All of these failures produce only `console.warn` (`auth.ts:250`, `App.tsx:382`, `stats.tsx:208`) — invisible to the user and to you.

**#2 — Lost-update between stale in-memory copies (multi-tab / multi-device / long-lived tab). Confidence: MEDIUM-HIGH; guaranteed by design to lose data when it happens.**

- The profile is read once per page load (`auth.ts:237`) and never refreshed (`auth.ts:300-308` has no snapshot listener). Every completion write sends the **whole array** derived from that snapshot.
- Scenario: phone tab opened Monday (copy has 40 completions) sits in the background; laptop completes 10 more (server now 50); phone completes one exercise Tuesday → phone writes its 41-element array → the 10 laptop completions are silently reverted. Last-writer-wins per whole array; `updateDoc` array semantics offer no merge.
- Also applies to a single device with the app open in two tabs, and to the PWA/Capacitor wrapper plus a browser tab (`package.json` cap:* scripts).

**#3 — Silent write loss (write never landed, refresh reveals it). Confidence: MEDIUM.**

- Every progress write is fire-and-forget with `.catch(console.warn)` (`App.tsx:381-383,437-439,462-464`; `stats.tsx:192-194,207-209,323-325,343-345`). No retry, no queue, no user feedback.
- With memory-only cache, an offline `updateDoc` is queued in RAM and **lost if the tab closes before reconnect**. The exercise looked completed all session; after refresh it is "not done" again.

**#4 — Content-derived activity keys drift when content is edited (German speak & write only). Confidence: HIGH that the mechanism exists; scope limited to those two skills.**

- Write/read keys for speaking are the first 96 chars of the item's `modelAnswer` text (`App.tsx:811`; `learning.ts:257,379`) and for writing the prompt text (`App.tsx:992`; `learning.ts:260`). Any wording fix to `library.ts` (which has been bulk-edited: commit `2c45664` "Add B2-C2 content, multi-question sets…") silently invalidates prior completions of the edited items — they reappear as fresh, permanently, and the stale keys linger as dead entries in the array.

**#5 — Unit re-chunking on content growth re-locks previously open lessons (perceived as "progress reset"). Confidence: MEDIUM.**

- Units are formed by slicing the level-filtered library arrays into fixed chunks (`learning.ts:230-267`; `englishLearning.ts:193-222`). Adding items to a level (it happened: commit `cf8d710` expanded IELTS listening to 20/level, ids 101-217 per `english/src/content/index.ts:29-30`) changes each unit's membership; a unit that was ≥70 % complete can fall below the threshold, re-locking every later unit (`learning.ts:274-283`). Completions themselves survive, but the learner sees previously reachable exercises locked/fresh.

Ruled out:
- **RLS/rules silently blocking**: rules allow owner get/update (`firestore.rules:50,53`); server-owned fields are stripped before every client write (`auth.ts:106-112`, `profiles.ts:149-155`), so a stale `billing` in the patch cannot fail a progress write. A rules rejection would surface in candidate #3's silent-catch anyway.
- **Missing await**: writes are intentionally un-awaited but promise-chained with catch; not a distinct cause beyond #3.
- **String/number type mismatch**: all ledger keys are strings on both sides; numeric ids are stringified identically by `activityKey`/`enActivityKey`.
- **Cross-track clobber**: German and English deliberately own disjoint fields and both use field-level patches (`App.tsx:369-385` comment; `stats.tsx:205-207`), so track A cannot erase track B.

### 4.3 Does completion survive a page refresh, as written?

**Yes, if and only if** (a) the `updateDoc` actually reached Firestore before the tab closed, and (b) the next load's single `getDoc` succeeds. Both conditions fail silently: (a) fails offline/with-error → console.warn only (#3); (b) fails → blank fallback profile (#1). There is no local durable cache (no offline persistence, no localStorage mirror of the ledgers), so a refresh is a full round-trip with no safety net on either side.

---

## 5. QUESTION / CONTENT MODEL ASSESSMENT

### 5.1 How exercises/questions are stored

All content is **hard-coded TypeScript arrays shipped with the bundle** — there is no content collection in Firestore:
- German: `frontend/src/library.ts` (65 items × 4 skills, literal numeric `id`s), exams `frontend/src/exams.ts`, vocab `frontend/src/data.ts` + generated `vocabeoVocabulary.ts`/`generatedVocabulary.ts` (regenerable via `npm run vocab:gen`, `scripts/generateVocabeo.ts`).
- English: `english/src/content/*` merged in `english/src/content/index.ts:24-40` (reading 51, listening 120, speaking 33, writing 14 — verified no duplicate ids); SAT banks `english/src/sat/*` with documented id ranges (`satGenerated.ts:7-8`).

### 5.2 ID stability

| Content family | Key | Stable? |
|---|---|---|
| German read/listen/exam, English read/listen, SAT questions | literal numeric `id` in source | **Yes** — as long as nobody renumbers |
| German speaking | `speak:<modelAnswer text, 96 chars>` | **No — breaks on any text edit** (`learning.ts:257`) |
| German writing | `write:<level>:<prompt text, 96 chars>` | **No — breaks on any text edit** (`learning.ts:260`) |
| German vocab SRS | `String(word.rank)` (`learning.ts:76-78`) | **No — two independent defects:** (1) verified **83 rank collisions** among the 6,420 trainer words (e.g. two different words share rank 1, rank 4 — homograph entries like "der" article vs pronoun in `vocabeoVocabulary.ts`), so distinct words share one SRS entry today; (2) ranks come from the generated vocab file — re-running `vocab:gen` with a changed source can renumber ranks, silently re-pointing every learner's SRS state at different words. |
| English vocab flashcards | `<exam>:<word text>` (`englishLearning.ts:40-42`) | Mostly — breaks only if a word's spelling is edited |

### 5.3 Attempt records vs aggregates

Progress is stored as **flat ledgers + recomputed aggregates**, never per-attempt records:
- Ledgers: `completedActivityIds(En)` (unordered id sets), `mistakeIds(En)` (capped 100), `vocabLearnedEn`, `srsByWord`.
- Aggregates: `streak`/`progress`/`completedLessons`/`learningCurve` are **derived on every load** from the ledgers (`utils/profileMetrics.ts:68-94`) — good: they self-heal. The only attempt-shaped record in the system is English `testHistoryEn` (capped 50). German has none (audit flag F1: full German mock exams vanish entirely).
- No timestamps, scores, or counts per completion — one boolean of information per exercise, no way to distinguish "completed once in 2025" from "completed 50 times".

### 5.4 What breaks if questions are added/removed today

- **Adding items**: (a) `TRACKABLE_ACTIVITY_TOTAL` (`utils/profileMetrics.ts:11-21`) and `EN_TRACKABLE_TOTAL` (`englishLearning.ts:83`) grow → every learner's `progress` % silently drops on next load (cosmetic but visible). (b) Unit membership re-chunks (`learning.ts:248-263`; `englishLearning.ts:209-217`) → passed units can un-pass, re-locking later lessons (§4 candidate #5). (c) Nothing corrupts.
- **Removing/renumbering items**: orphaned ids linger harmlessly in the ledgers (`resolveMistakes` ignores unresolvable ids, `learning.ts:327-341`); but **reusing** a freed numeric id makes the new exercise appear pre-completed for anyone who did the old one.
- **Editing text**: German speak/write completions and mistake entries for edited items are permanently lost (key drift, §5.2). English read/listen safe.
- **Regenerating vocab** (`npm run vocab:gen`): if source order/content shifts ranks, every learner's `srsByWord` silently re-maps to different words — the worst corruption mode in the system because it is invisible and wrong rather than merely reset.

---

## RECOMMENDED FIXES (ordered; fixes 1–3 implemented 2026-07-12)

1. **Stop the durable wipe: never write ledgers computed from a fallback/blank profile.** Mark the fallback profile from `loadProfileFor`'s catch (`auth.ts:249-257`) (e.g. an in-memory `isFallback` flag, like `isGuest`) and have `updateProfileFields`/`applyMetricProfile`/`patchProfile` refuse ledger writes while it is set; surface a "progress could not be loaded — retry" state instead. Also change `auth.ts:247` to `setDoc(..., {merge:true})`. **Blast radius: tiny** — 3 files (`auth.ts`, `App.tsx`, `stats.tsx`), no schema change, no user-visible behavior except during failures.
   **IMPLEMENTED (2026-07-12):** `isFallback` flag on `UserProfile` (`profiles.ts`), set in `loadProfileFor`'s catch; `updateProfileFields`/`saveProfileProgress` centrally refuse all ledger-field writes while it is set (covers `applyMetricProfile` and `patchProfile` since every writer routes through them) and strip the flag itself from every write; doc-missing `setDoc` now `{merge:true}`; retry toast `ProgressSyncBanner.tsx` (mounted in `LanguageGate.tsx`) with `retryProfileLoad()` that clears the flag via a fresh auth-event emit. Unit-tested in `tests/fallback-write-guard.test.ts`.
2. **Make ledger writes merge-safe: use `arrayUnion` for append-only sets.** `completedActivityIds(En)`, `vocabLearnedEn`, `studyDays(En)` are append-only — write them with `FieldValue.arrayUnion(newId)` instead of full-array replace in `updateProfileFields` call sites. Kills the multi-tab/multi-device lost-update (#2) for completions outright. `mistakeIds` (ordered, capped) and `srsByWord` (map — already mergeable via dotted paths) need slightly different handling. **Blast radius: small** — same 3 files + the German mistake-clear paths; tests in `tests/` cover pure logic, not these writers.
   **IMPLEMENTED (2026-07-12):** `toMergeSafePatch` in `auth.ts` translates every Firestore patch at the chokepoint: the five append-only sets → `arrayUnion(...items)` (removal diffs logged, never written; empty arrays skipped); `srsByWord` + `studySecondsByDate(En)` maps → dotted per-key writes for changed keys only. In-memory state keeps plain values. The hide/unload whole-map flushes (`App.tsx`, `stats.tsx`) now write dotted per-date patches (today + yesterday). `saveProfileProgress` drops the five append-only arrays from its whole-profile `setDoc` (they persist only via the arrayUnion path). `mistakeIds(En)`/`testHistoryEn` keep replace semantics as specified. Grep verified: `auth.ts` is the only client Firestore writer — no whole-array ledger replaces remain.
3. **Enable Firestore offline persistence** (`persistentLocalCache` in `firebase.ts:17-24`). Failed loads fall back to cache instead of a blank profile; queued writes survive tab closes. **Blast radius: small** — one file; multi-tab needs `persistentMultipleTabManager`; verify Capacitor webview support.
   **IMPLEMENTED (2026-07-12):** `firebase.ts` initializes Firestore with `persistentLocalCache({ tabManager: persistentMultipleTabManager() })`, wrapped in try/catch falling back to the default `getFirestore` memory cache (logged once). Capacitor webviews (WKWebView / Android System WebView) ship IndexedDB, so the persistent cache works in the mobile wrappers.
4. **Keep the profile live: subscribe with `onSnapshot`** in `startProfileWatcher` instead of one `getDoc` (`auth.ts:235-258`), publishing through the existing pub/sub. Removes the stale-copy window entirely and makes cross-device progress converge. **Blast radius: medium** — the German subscriber resets tab state on auth events (`auth.ts:202-204` comment), so snapshot updates must flow through the *updates* channel only.
   **IMPLEMENTED (2026-07-12):** `startProfileWatcher` now attaches a live `onSnapshot(users/{uid})` per auth event via a new `attachProfileSnapshot(user, seq)` helper, torn down (`teardownSnapshot`) on the next auth event/logout/retry; the `loadSeq` guard makes a late snapshot from a superseded subscription inert. The one-shot `getDoc` path (`loadProfileFor`) and its import are deleted. Routing: the **first** snapshot per auth event → `emitAuthEvent` (auth + updates channels, so German tab-state reset fires exactly once), **every subsequent** snapshot → `publishAuthedProfile` (updates channel only, never resets tabs). Echo guard: subsequent snapshots with `metadata.hasPendingWrites` are our own local writes echoing back (sharedProfile is already optimistically ahead via `updateProfileFields`) and are skipped entirely — no publish, no write, no loop; the first snapshot is accepted even with pending writes so a queued-offline profile still boots. Subsequent remote snapshots run `reconcileRemote` before publishing: the append-only ledgers take the UNION of incoming ∪ current cache (a remote snapshot can't hide a not-yet-landed local optimistic append), everything else takes the incoming server value — in-memory only, never a write. Doc-missing on the first snapshot keeps the `setDoc(..., {merge:true})` default-profile behavior; a doc-missing *later* snapshot is a deletion and is logged+ignored. Snapshot errors are terminal: with no profile emitted yet → blank `isFallback` fallback on the auth channel + `notifyProgressSyncIssue()` (fix-1 behavior preserved); with a real profile already emitted → republish the *current* sharedProfile with `isFallback:true` (updates channel) so data is kept but ledger writes lock and the banner shows. `retryProfileLoad` tears down the dead subscription and attaches a fresh one, resolving `true` on a good first snapshot (clears fallback) and `false` on error/timeout (`RETRY_TIMEOUT_MS`), keeping the staleness guarantee (a retry that loses to a newer auth event reports the live state). The signup fast-path still emits `pendingSignupProfile` immediately, then attaches the snapshot (`alreadyEmitted:true`) for live updates. `ProgressSyncBanner`'s fallback→non-fallback hide logic works unchanged — the error-after-data republish carries `isFallback:true` and the retry emit clears it, exactly the transition the banner watches. Reworked `tests/fallback-write-guard.test.ts` (now mocks `onSnapshot`; 16 cases) pins channel routing, echo skip, ledger union, both error timings, retry recovery + stale-retry race, and doc-missing merge:true — full suite 270 green, `tsc --noEmit` clean.
5. **Freeze exercise identity: give German speaking/writing items key-independent ids.** Write completions as `speak:<numeric id>` / `write:<numeric id>` and, on load, migrate legacy text-keys by matching current text (one-time client-side rewrite). **Blast radius: medium** — `App.tsx` speak/write recorders, `learning.ts:249-267`, `buildTodaySession`, plus a migration shim; old completions for already-edited texts are unrecoverable.
   **IMPLEMENTED (2026-07-12):** Completion/mistake keys for speak/write are now `speak:<id>` / `write:<level>:<id>` (`activityKey('speak', i.id)` / `activityKey(\`write:${i.level}\`, i.id)`), built from each `SPEAKING_LIBRARY`/`WRITING_LIBRARY` item's permanent `id` instead of its `modelAnswer`/`prompt` text — `learning.ts`'s `buildUnitsForLevel` (unit membership) and `buildTodaySession` (speaking pick), plus every `App.tsx` recorder (`evaluateSpeechText`, `evaluateSpeechAudio`, `checkComposition`). The AI-judge target threaded through `App.tsx`'s `speakTargetRef`/`toggleMic`/`renderSpeakingJudge` was widened from a bare model-answer string to a `{id, text}` pair (new shared `SpeakTarget` type in `types.ts`) so the async record callback always has the id to key against; the writing checker's `ctx` object gained the same `id` field. Every render call site (`SpeakTab.tsx`, `WriteTab.tsx`, and — importantly — `ExamTab.tsx`'s B2–C2 exam writing/speaking sections, which are separate `WritingItem[]`/`SpeakingItem[]` arrays in `exams.ts` but still carry a permanent `id`) had a real library id available, so no site needed a text-key fallback. `library.ts` now documents `SPEAKING_LIBRARY`/`WRITING_LIBRARY` ids as permanent (never renumber/reuse), with a duplicate-id regression test. `keyMigrations.ts` gained a second, independently-gated migration (`'speakwrite-v1'`, alongside `'srs-v2'` from fix 6) — `runKeyMigrations` now takes `speakingItems`/`writingItems` params and runs each pending migration by its own gate name rather than short-circuiting on the first gate found (the old single-gate dispatch would have silently skipped fix 5's migration forever on any account that had already run fix 6's). It recomputes each item's legacy text key, and where that legacy key is present in `completedActivityIds`/`mistakeIds`, adds the new id-based key alongside it (legacy keys are never deleted — unrecoverable once their text has actually changed). `completedActivityIds`/`keyMigrations` are written as full desired arrays (arrayUnion-safe, append-only ledger fields in `auth.ts`); `mistakeIds` is not append-only, so its patch is the full merged + `MISTAKE_LOG_LIMIT`-capped array. Unit-tested in `tests/speakwrite-keys.test.ts` (legacy-key recomputation pinned against real library text, duplicate-id guards, migration + idempotency + guest/fallback skip, unit-membership and `buildTodaySession` id-key coverage) and `tests/srs-keys.test.ts` (updated for the multi-gate signature, plus a regression test that fix 6's gate alone can no longer block fix 5's migration).
6. **Fix vocab SRS keys**: key `srsByWord` by a collision-free stable id (e.g. `rank:wordClass` or a slug of `german|wordClass`), add a load-time migration, and make `scripts/generateVocabeo.ts` treat rank as immutable once assigned. **Blast radius: medium** — `learning.ts:76-78`, `VocabTab.tsx`, generator script; 83 currently-colliding entries can't be disentangled retroactively.
   **IMPLEMENTED (2026-07-12):** `srsWordKey` (`learning.ts`) now returns a pipe-joined slug of `german|wordClass|mongolian|english` via a new exported `slugForKey` helper (lowercase, trimmed, whitespace→`-`, dots stripped — dot-free by construction, satisfying `auth.ts`'s dotted-path write requirement). `german|wordClass` alone still collided on 29/6420 trainer words (case-only pairs like `sie`/`Sie`, plus genuine duplicate dictionary entries); adding `mongolian` + `english` as tie-breakers gives **zero collisions across the full 6420-word trainer dictionary**, asserted directly against the shipped `DICTIONARY` in `tests/srs-keys.test.ts`. `VocabTab.tsx`'s vocab completion-activity id (`activityKey('vocab', ...)`) had the same rank-based instability and now reuses the same key. A new pure module `keyMigrations.ts` (no React/Firebase/vocab-data imports, so it stays cheap for the English track chunk) migrates legacy `srsByWord` entries forward: `runKeyMigrations(profile, words)` maps each legacy key (`String(rank)` or rankless `german-mongolian`) back to its current word(s) — a colliding legacy rank copies the same SRS entry to **every** claimant word (conservative: over-reviewing beats losing state) — and returns a merged profile plus a dotted-path Firestore patch. It is gated by `'srs-v2'` in a new append-only `profile.keyMigrations` field (added to `auth.ts`'s `APPEND_ONLY_LEDGER_FIELDS`, so it's arrayUnion-written and safe across tabs) and no-ops entirely (no writes, not even the gate) for guest/fallback profiles. `App.tsx` runs it once per page load on the auth-event profile (module-level flag; the gate makes any re-run a no-op regardless) and persists the patch through `updateProfileFields`. `scripts/generateVocabeo.ts` now checks a checked-in `scripts/vocabeoRankMap.json` (senseKey → rank) before writing output and **fails loudly** (non-zero exit) if the vocabeo source would renumber an already-mapped word; new words simply extend the map. The initial map was generated from the currently-shipped `vocabeoVocabulary.ts` (not by running the generator, which needs a Gemini key) and independently verified against `scripts/vocabeoWords.json` via `buildSeeds()` — 6274/6274 entries match with zero conflicts. Unit-tested in `tests/srs-keys.test.ts` (collision-free key, unambiguous + colliding-rank migration, rankless migration, idempotency, guest/fallback skip).
7. **Pin unit membership** so content growth can't re-lock passed units: either persist "unit passed" facts into the ledger (e.g. `unit:de:A1:0` pseudo-activity id) or chunk by explicit per-item unit assignment instead of array position (`learning.ts:230-267`, `englishLearning.ts:193-222`). **Blast radius: medium**.
   **IMPLEMENTED (2026-07-12):** ratchet variant — chunking untouched. `unit:de:<level>:<index>` / `unit:en:<level>:<index>` pass facts (English units are level-scoped only; `buildEnglishUnits` has no exam dimension) are appended to `completedActivityIds(En)` via the arrayUnion path. `isUnitPassed`/`enUnitPassed` treat a ledgered fact OR the live ≥70% ratio as passed, so every unlock gate (`isUnitUnlocked`, `lockedItemIds`, `enUnitUnlocked`, ProfileTab/DashboardTab) ratchets automatically. Detection: `newlyPassedUnitIds(En)` runs inside every completion write (`applyMetricProfile`, `patchProfile` — the fact rides the same write) and on every updates-channel publish (fix-4 background snapshots), loop-safe and skipped for guest (in-memory ratchet still applies via the shared pass check) / fallback profiles. Pseudo-ids are excluded from `calculateProgress`, `completedLessons`, `englishProgressPercent`, the ProfileTab/DashboardTab counters, unit ratios, session picking, and mistake resolution (prefix-keyed, never match). One-time pinning migration `runUnitsMigration` (gates `units-v1` German / `units-v1-en` English — two gates because each track computes ids from its own content bundle) sweeps ALL levels against current chunking; units passed only under OLD chunking are unknowable and not pinned. Tested in `tests/unit-ratchet.test.ts`.
8. **Schema evolution: move to immutable content ids + per-attempt records.** Add an `attempts/{uid}/records/{autoId}` subcollection (`{activityId, ts, correct, score?, source}`) written alongside the ledger; derive ledgers/aggregates from it over time; give every content item (incl. speak/write/vocab) a permanent `id` field enforced by a generator check; add German `testHistory` parity (fixes audit flag F1). **Blast radius: large** — new collection + rules, dual-write period, admin dashboard additions; do last, after 1–4 have stopped the bleeding.

Also worth doing opportunistically: delete the dead `subscriptions` rule block (`firestore.rules:61-63`), declare `aiUsage` in `UserProfile`, uid-scope the placement localStorage key (`PlacementTest.tsx:48`), and replace the silent `.catch(console.warn)` on progress writes with a visible retry toast.
