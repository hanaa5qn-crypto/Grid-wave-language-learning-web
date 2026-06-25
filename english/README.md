# Vivid Lingua — English track (IELTS + SAT)

A **separate, self-contained** English-learning experience that mirrors the German
track in `../frontend/src`. The German code is untouched except for three thin
integration points (see below). A first-screen language picker decides which
track loads, and the choice is remembered.

## Layout

```
english/src/
  types.ts              # single source of truth — all interfaces
  EnglishApp.tsx        # app shell: Home / Reading / Listening / Speaking / Writing / Vocab / Tests
  components/           # (reserved)
  content/
    library.ts          # READING/LISTENING/WRITING/SPEAKING_LIBRARY (A1–C2, 64 items)
    vocabulary.ts       # VOCAB deck (120+ words, A1–C2)
    index.ts
  ielts/
    ieltsTests.ts       # aggregates the tests + official band-score conversion
    ieltsTest1.ts       # IELTS Academic — Practice Test 1 (80 Q)
    ieltsTest2.ts       # IELTS Academic — Practice Test 2 (80 Q)
    ieltsGeneral1.ts    # IELTS General Training — Practice Test 1 (80 Q)
    IeltsTestRunner.tsx # interactive player (reading/listening/writing/speaking + band estimate)
    index.ts
  sat/
    satTests.ts         # aggregates the tests + raw→scaled (200–800) curve
    satTest1.ts         # Digital SAT — Practice Test 1 (98 Q: RW 54 + Math 44)
    satTest2.ts         # Digital SAT — Practice Test 2 (98 Q)
    SatTestRunner.tsx   # interactive player (module timer, grid-ins, scaled score)
    index.ts
```

## Tests

- **IELTS**: authentic exam structure — 3 reading passages (40 Q), 4 listening
  sections (40 Q), 2 writing tasks, 3 speaking parts per test. All nine official
  IELTS question types are used. Band scores use the published Academic
  Reading/Listening conversion tables.
- **SAT**: Digital SAT structure — Reading & Writing Modules 1–2 (27 Q each) and
  Math Modules 1–2 (22 Q each), across all eight domains, with grid-in items and
  worked explanations. Section scores use a 200–800 raw→scaled curve.

All content is original, modeled faithfully on the official test formats.

## Integration with the German track (the only shared edits)

1. `frontend/src/LanguageGate.tsx` *(new)* — first screen; "🇩🇪 Germany" or
   "🇬🇧 English"; persists `localStorage['vivid-lingua-track']` (`de` | `en`);
   renders `<App/>` or `<EnglishApp/>`. English gets a "Switch language" control.
2. `frontend/src/main.tsx` — renders `<LanguageGate/>` instead of `<App/>`.
3. `frontend/vite.config.ts` — `server.fs.allow` includes the parent dir so the
   cross-folder import resolves in dev.

`tsconfig.json` also adds `english/src/**/*` to `include` for typechecking.

## Verified

- `npx tsc --noEmit` — clean.
- `npx vite build` — succeeds (English bundles into the production build).
- German suite — 168/168 tests still pass (no regression).
