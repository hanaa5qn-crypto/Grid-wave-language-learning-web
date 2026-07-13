// =============================================================================
// Vivid-Lingua — one-time progress-ledger key migrations (audit §5.2 RECOMMENDED
// FIXES 5 & 6). Pure logic: no React, no Firebase, no library/vocab DATA import
// — the caller (App.tsx) supplies the word list + speak/write items so this
// module stays cheap to import from the English track chunk too. (Only
// structural TYPES are declared locally below, never library.ts's data arrays.)
// -----------------------------------------------------------------------------
// Each migration is gated by its OWN name in `profile.keyMigrations` (append-
// only ledger field, see auth.ts), independently of every other migration's
// gate, so each runs exactly once per account whenever it becomes pending —
// including for accounts that already completed an earlier migration.
// Re-running `runKeyMigrations` after every gate is set is a no-op (idempotent).
//
// Currently hosts:
//   - 'srs-v2': migrates legacy `srsByWord` keys (rank-based, collision-prone)
//     to the collision-free slug key from learning.ts's srsWordKey (audit §5.2 #6).
//   - 'speakwrite-v1': migrates legacy content-derived speak/write completion
//     and mistake keys to the id-based keys (audit §5.2 #5).
//   - 'units-v1' / 'units-v1-en': pins currently-passed units as `unit:` ratchet
//     facts (audit fix 7) — see runUnitsMigration. Two gates because each track
//     computes its unit ids from its own content bundle (German App vs English
//     stats provider); a single shared gate set by whichever track loads first
//     would permanently skip the other track's pinning.
// =============================================================================
import { VocabularyWord } from './types';
import { UserProfile } from './profiles';
import { srsWordKey, SrsEntry, activityKey, MISTAKE_LOG_LIMIT } from './learning';

const SRS_V2_GATE = 'srs-v2';
const SPEAKWRITE_V1_GATE = 'speakwrite-v1';

export interface KeyMigrationResult {
  profile: UserProfile;           // profile with migrated entries merged in (== input when nothing ran)
  patch: Record<string, unknown>; // dotted-path Firestore patch to persist via auth.ts's updateProfileFields
}

// Minimal shapes needed to recompute legacy + new speak/write activity keys —
// structurally compatible with SpeakingItem/WritingItem from library.ts, but
// declared locally so this module never imports library.ts's data arrays.
export interface SpeakingItemLike { id: number; modelAnswer: string }
export interface WritingItemLike { id: number; level: string; prompt: string }

const NOOP = (profile: UserProfile): KeyMigrationResult => ({ profile, patch: {} });

// Legacy srsWordKey (pre audit §5.2 #6): String(rank) for ranked words, or the
// literal `${german}-${mongolian}` for rankless ones. Build lookup maps once
// per call so every legacy entry can be resolved to its current word(s).
function legacyRankMap(words: VocabularyWord[]): Map<number, VocabularyWord[]> {
  const map = new Map<number, VocabularyWord[]>();
  for (const w of words) {
    if (w.rank == null) continue;
    const list = map.get(w.rank);
    if (list) list.push(w); else map.set(w.rank, [w]);
  }
  return map;
}

function legacyRanklessMap(words: VocabularyWord[]): Map<string, VocabularyWord[]> {
  const map = new Map<string, VocabularyWord[]>();
  for (const w of words) {
    if (w.rank != null) continue;
    const key = `${w.german}-${w.mongolian}`;
    const list = map.get(key);
    if (list) list.push(w); else map.set(key, [w]);
  }
  return map;
}

// New-format keys always contain '|' (the slug join separator, see
// learning.ts's srsWordKey); legacy keys never do — a bare rank is
// digits-only, and the rankless form is `german-mongolian` text with no pipe.
// Cheap way to skip entries already on the new key without re-deriving them.
function isNewFormatKey(key: string): boolean {
  return key.includes('|');
}

// Migrate `profile.srsByWord`'s legacy-format entries onto the new collision-
// free keys. A colliding legacy rank maps to more than one current word —
// conservatively, the SAME entry is copied to every claimant's new key
// (over-reviewing a word beats silently losing its SRS state). Legacy entries
// are never deleted (readers simply ignore unrecognized keys).
function migrateSrsV2(profile: UserProfile, words: VocabularyWord[]): KeyMigrationResult {
  const srsByWord = profile.srsByWord ?? {};
  const ranks = legacyRankMap(words);
  const rankless = legacyRanklessMap(words);

  const nextSrsByWord: Record<string, SrsEntry> = { ...srsByWord };
  const patch: Record<string, unknown> = {};

  for (const [legacyKey, entry] of Object.entries(srsByWord)) {
    if (isNewFormatKey(legacyKey)) continue; // already migrated / never legacy
    const matches = /^\d+$/.test(legacyKey)
      ? ranks.get(Number(legacyKey)) ?? []
      : rankless.get(legacyKey) ?? [];
    for (const word of matches) {
      const newKey = srsWordKey(word);
      if (JSON.stringify(nextSrsByWord[newKey]) === JSON.stringify(entry)) continue; // already identical — nothing to write
      nextSrsByWord[newKey] = entry;
      patch[`srsByWord.${newKey}`] = entry;
    }
  }

  const nextGates = [...(profile.keyMigrations ?? []), SRS_V2_GATE];
  patch.keyMigrations = nextGates; // append-only ledger field (auth.ts arrayUnion)

  return {
    profile: { ...profile, srsByWord: nextSrsByWord, keyMigrations: nextGates },
    patch,
  };
}

// Migrate `completedActivityIds`/`mistakeIds` entries built from the OLD
// content-derived speak/write keys (audit §5.2 #5 — `speak:<modelAnswer text>`
// / `write:<level>:<prompt text>`) onto the new id-based keys (`speak:<id>` /
// `write:<level>:<id>`). A legacy key only resolves if its item's wording is
// UNCHANGED since the entry was recorded — text already edited by the time
// this migration runs is unrecoverable (that data loss is exactly what this
// fix stops happening from now on). Legacy entries are never deleted.
function migrateSpeakWriteV1(
  profile: UserProfile,
  speakingItems: SpeakingItemLike[],
  writingItems: WritingItemLike[],
): KeyMigrationResult {
  const completed = new Set(profile.completedActivityIds ?? []);
  const mistakes = profile.mistakeIds ?? [];
  const mistakeSet = new Set(mistakes);

  const newCompleted: string[] = [];
  const newMistakes: string[] = [];

  const migrateOne = (legacyKey: string, newKey: string) => {
    if (completed.has(legacyKey) && !completed.has(newKey)) newCompleted.push(newKey);
    if (mistakeSet.has(legacyKey) && !mistakeSet.has(newKey)) newMistakes.push(newKey);
  };

  for (const item of speakingItems) {
    migrateOne(activityKey('speak', item.modelAnswer), activityKey('speak', item.id));
  }
  for (const item of writingItems) {
    migrateOne(activityKey(`write:${item.level}`, item.prompt), activityKey(`write:${item.level}`, item.id));
  }

  const nextCompleted = newCompleted.length > 0
    ? [...(profile.completedActivityIds ?? []), ...newCompleted]
    : (profile.completedActivityIds ?? []);
  // mistakeIds is NOT append-only (whole-array replace semantics, auth.ts) —
  // the patch must carry the full merged + capped array, same rule as addMistake.
  const nextMistakes = newMistakes.length > 0
    ? [...mistakes, ...newMistakes].slice(0, MISTAKE_LOG_LIMIT)
    : mistakes;

  const nextGates = [...(profile.keyMigrations ?? []), SPEAKWRITE_V1_GATE];
  const patch: Record<string, unknown> = { keyMigrations: nextGates }; // append-only ledger field (auth.ts arrayUnion)
  if (newCompleted.length > 0) patch.completedActivityIds = nextCompleted; // full desired array (also arrayUnion-written)
  if (newMistakes.length > 0) patch.mistakeIds = nextMistakes;

  return {
    profile: { ...profile, completedActivityIds: nextCompleted, mistakeIds: nextMistakes, keyMigrations: nextGates },
    patch,
  };
}

// One-time pinning of unit-pass ratchet facts (audit fix 7). The caller
// computes `passedUnitIds` for ALL levels of its track against CURRENT
// chunking (newlyPassedUnitIds / newlyPassedEnUnitIds over every level) — a
// unit that was passed under OLD chunking but no longer passes under current
// chunking is unknowable from the ledger, so only what current chunking
// confirms gets pinned. Idempotent: the gate makes re-runs a no-op, and ids
// already in the ledger are skipped. Guests/fallback profiles are never
// touched (same rule as runKeyMigrations).
export function runUnitsMigration(
  profile: UserProfile,
  gate: string,
  ledgerField: 'completedActivityIds' | 'completedActivityIdsEn',
  passedUnitIds: string[],
): KeyMigrationResult {
  if (profile.isGuest || profile.isFallback) return NOOP(profile);
  if ((profile.keyMigrations ?? []).includes(gate)) return NOOP(profile);

  const ledger = profile[ledgerField] ?? [];
  const present = new Set(ledger);
  const toAdd = passedUnitIds.filter((id) => !present.has(id));

  const nextLedger = toAdd.length > 0 ? [...ledger, ...toAdd] : ledger;
  const nextGates = [...(profile.keyMigrations ?? []), gate];
  const patch: Record<string, unknown> = { keyMigrations: nextGates }; // append-only (auth.ts arrayUnion)
  if (toAdd.length > 0) patch[ledgerField] = nextLedger; // full desired array (also arrayUnion-written)

  return {
    profile: { ...profile, [ledgerField]: nextLedger, keyMigrations: nextGates },
    patch,
  };
}

// Run every pending migration for `profile`, given the current word list
// (App.tsx's TRAINER_WORDS) and speak/write libraries (SPEAKING_LIBRARY,
// WRITING_LIBRARY). Never touches a guest or fallback profile (guest progress
// is never persisted; a fallback profile is a blank stand-in — see auth.ts's
// fallback-write guard, audit §4.2 #1) and never writes anything — not even a
// gate — for those. Each migration below checks its OWN gate independently,
// so an account that already ran 'srs-v2' still gets 'speakwrite-v1' applied
// (and vice versa) the next time this runs.
export function runKeyMigrations(
  profile: UserProfile,
  words: VocabularyWord[],
  speakingItems: SpeakingItemLike[],
  writingItems: WritingItemLike[],
): KeyMigrationResult {
  if (profile.isGuest || profile.isFallback) return NOOP(profile);

  let current = profile;
  let patch: Record<string, unknown> = {};

  if (!(current.keyMigrations ?? []).includes(SRS_V2_GATE)) {
    const result = migrateSrsV2(current, words);
    current = result.profile;
    patch = { ...patch, ...result.patch };
  }
  if (!(current.keyMigrations ?? []).includes(SPEAKWRITE_V1_GATE)) {
    const result = migrateSpeakWriteV1(current, speakingItems, writingItems);
    current = result.profile;
    patch = { ...patch, ...result.patch };
  }

  return { profile: current, patch };
}
