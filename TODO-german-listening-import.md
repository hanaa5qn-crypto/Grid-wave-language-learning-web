# TODO: Import German listening expansion (saved 2026-07-02, not yet wired in)

Four ready-made data files sit in `frontend/src/`, **created but intentionally NOT
imported anywhere yet** (per user request — import later):

| File | Export | Items | IDs | Level |
|---|---|---|---|---|
| `libraryListeningB1.ts` | `LISTENING_EXPANSION_B1` | 12 | 601–612 | B1 |
| `libraryListeningB2.ts` | `LISTENING_EXPANSION_B2` | 15 | 621–635 | B2 |
| `libraryListeningC1.ts` | `LISTENING_EXPANSION_C1` | 17 | 641–657 | C1 |
| `libraryListeningC2.ts` | `LISTENING_EXPANSION_C2` | 18 | 661–678 | C2 |

Each item follows the `ListeningItem` shape (German `audioText` for Azure neural
TTS, full Mongolian `transcriptMn`, 2 Mongolian MCQ `questions` with
explanations). Topics were pre-assigned to be non-overlapping with all existing
library and exam listening content; IDs don't collide with anything
(library max was 113; exam arrays use 201–405 in their own namespace).

Resulting per-level library counts after import: A1 21 (unchanged), A2 21
(unchanged), B1 22, B2 21, C1 21, C2 21.

## How to wire it in (2 files)

**1. `frontend/src/library.ts`** — next to the existing `LISTENING_EXTRA` push
(around line 1254):

```ts
import { LISTENING_EXPANSION_B1 } from './libraryListeningB1';
import { LISTENING_EXPANSION_B2 } from './libraryListeningB2';
import { LISTENING_EXPANSION_C1 } from './libraryListeningC1';
import { LISTENING_EXPANSION_C2 } from './libraryListeningC2';

LISTENING_LIBRARY.push(
  ...LISTENING_EXPANSION_B1,
  ...LISTENING_EXPANSION_B2,
  ...LISTENING_EXPANSION_C1,
  ...LISTENING_EXPANSION_C2,
);
```

**2. `frontend/src/exams.ts`** — to give every exam level 20 listening items:

```ts
import { LISTENING_EXPANSION_B2 } from './libraryListeningB2';
import { LISTENING_EXPANSION_C1 } from './libraryListeningC1';
import { LISTENING_EXPANSION_C2 } from './libraryListeningC2';

const LISTEN_N = 20;
// A1/A2/B1 entries:  listening: byLevel(LISTENING_LIBRARY, 'A1', LISTEN_N)
// B2:  listening: [...B2_LISTENING, ...LISTENING_EXPANSION_B2.slice(0, LISTEN_N - B2_LISTENING.length)]
// C1:  listening: [...C1_LISTENING, ...LISTENING_EXPANSION_C1.slice(0, LISTEN_N - C1_LISTENING.length)]
// C2:  listening: [...C2_LISTENING, ...LISTENING_EXPANSION_C2.slice(0, LISTEN_N - C2_LISTENING.length)]
```

Then run `NODE_OPTIONS=--max-old-space-size=4096 npm run lint && npm test`.

Known pre-existing overlap to optionally clean up at import time: exam B2
`id 201 "Interview: Ehrenamt"` duplicates library B2 `id 106 "Interview:
Ehrenamt"` (different audio, same title/theme).
