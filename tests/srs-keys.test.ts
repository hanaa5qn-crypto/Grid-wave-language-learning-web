// audit §5.2 #6 (docs/backend-audit.md, RECOMMENDED FIXES item 6): the old
// `srsWordKey` — `String(word.rank ?? german-mongolian)` — collided on 83 of
// the 6420 trainer words and could be silently renumbered by re-running
// `vocab:gen`. These tests cover the replacement key (collision-free over the
// full dictionary) and the one-time migration shim that moves legacy
// `srsByWord` entries onto it.
import { describe, it, expect } from 'vitest';
import { srsWordKey, SrsMap } from '../frontend/src/learning';
import { runKeyMigrations } from '../frontend/src/keyMigrations';
import { DICTIONARY } from '../frontend/src/data';
import { VocabularyWord } from '../frontend/src/types';
import { UserProfile, createCustomProfile, createGuestProfile } from '../frontend/src/profiles';

function word(overrides: Partial<VocabularyWord> = {}): VocabularyWord {
  return {
    german: 'Wort', mongolian: 'үг', category: '', exampleGerman: '', exampleMongolian: '',
    ...overrides,
  };
}

describe('srsWordKey — collision-free over the full dictionary', () => {
  it('never contains a dot (Firestore dotted-path safety)', () => {
    const withDot = word({ german: 'z. B.', wordClass: 'phrase', mongolian: 'ж. нь' });
    expect(srsWordKey(withDot)).not.toContain('.');
  });

  it('has zero duplicate keys across every trainer word in the shipped dictionary', () => {
    // Same filter App.tsx uses to build TRAINER_WORDS.
    const trainerWords = DICTIONARY.filter((w) => w.mongolian.trim().length > 0);
    const seen = new Map<string, VocabularyWord[]>();
    for (const w of trainerWords) {
      const key = srsWordKey(w);
      const bucket = seen.get(key);
      if (bucket) bucket.push(w); else seen.set(key, [w]);
    }
    const collisions = [...seen.entries()].filter(([, words]) => words.length > 1);
    if (collisions.length > 0) {
      const detail = collisions
        .slice(0, 10)
        .map(([key, words]) => `${key}: ${words.map((w) => w.german).join(', ')}`)
        .join('\n');
      throw new Error(`${collisions.length} colliding srsWordKey(s) over ${trainerWords.length} trainer words:\n${detail}`);
    }
    expect(collisions).toHaveLength(0);
  });
});

describe('runKeyMigrations — srs-v2 (audit §5.2 #6)', () => {
  const wordA = word({ german: 'Hund', wordClass: 'noun', mongolian: 'нохой', english: 'dog', rank: 42 });
  const wordB = word({ german: 'Katze', wordClass: 'noun', mongolian: 'муур', english: 'cat', rank: 7 });
  const rankless = word({ german: 'Tschüss', wordClass: 'phrase', mongolian: 'баяртай', rank: undefined });
  const words = [wordA, wordB, rankless];

  function profileWithLegacySrs(srsByWord: SrsMap): UserProfile {
    return { ...createCustomProfile('s@e.mn', 'S', 'A1', 'x'), srsByWord };
  }

  const entry = { ease: 2.5, intervalDays: 3, reps: 2, due: '2026-07-15', lastReviewed: '2026-07-12' };

  it('migrates an unambiguous ranked legacy key to the new key', () => {
    const profile = profileWithLegacySrs({ '42': entry });
    const { profile: migrated, patch } = runKeyMigrations(profile, words, [], []);
    const newKey = srsWordKey(wordA);
    expect(migrated.srsByWord?.[newKey]).toEqual(entry);
    expect(patch[`srsByWord.${newKey}`]).toEqual(entry);
    // Both migrations run in one pass for a never-migrated account — see
    // tests/speakwrite-keys.test.ts for 'speakwrite-v1'-specific coverage.
    expect(migrated.keyMigrations).toEqual(['srs-v2', 'speakwrite-v1']);
    expect(patch.keyMigrations).toEqual(['srs-v2', 'speakwrite-v1']);
    // Legacy entry is never deleted.
    expect(migrated.srsByWord?.['42']).toEqual(entry);
  });

  it('migrates the rankless german-mongolian legacy form', () => {
    const legacyKey = `${rankless.german}-${rankless.mongolian}`;
    const profile = profileWithLegacySrs({ [legacyKey]: entry });
    const { profile: migrated } = runKeyMigrations(profile, words, [], []);
    expect(migrated.srsByWord?.[srsWordKey(rankless)]).toEqual(entry);
  });

  it('fans a colliding rank out to every claimant word (conservative: copy, never guess)', () => {
    const collider = word({ german: 'Bank', wordClass: 'noun', mongolian: 'банк', english: 'bank', rank: 7 });
    const collidingWords = [...words, collider]; // wordB and collider both claim rank 7
    const profile = profileWithLegacySrs({ '7': entry });
    const { profile: migrated, patch } = runKeyMigrations(profile, collidingWords, [], []);
    expect(migrated.srsByWord?.[srsWordKey(wordB)]).toEqual(entry);
    expect(migrated.srsByWord?.[srsWordKey(collider)]).toEqual(entry);
    expect(Object.keys(patch).filter((k) => k.startsWith('srsByWord.'))).toHaveLength(2);
  });

  it('is idempotent: running twice produces the same result as running once', () => {
    const profile = profileWithLegacySrs({ '42': entry, '7': entry });
    const once = runKeyMigrations(profile, words, [], []);
    const twice = runKeyMigrations(once.profile, words, [], []);
    expect(twice.profile.srsByWord).toEqual(once.profile.srsByWord);
    expect(twice.profile.keyMigrations).toEqual(once.profile.keyMigrations);
    // The second pass is a pure no-op: nothing left to write.
    expect(twice.patch).toEqual({});
  });

  it('does not re-migrate once both gates are already set (no writes at all)', () => {
    const profile: UserProfile = {
      ...profileWithLegacySrs({ '42': entry }),
      keyMigrations: ['srs-v2', 'speakwrite-v1'],
    };
    const { profile: result, patch } = runKeyMigrations(profile, words, [], []);
    expect(result).toBe(profile); // untouched reference — true no-op
    expect(patch).toEqual({});
  });

  it('re-runs srs-v2 independently even if only the OTHER gate is already set', () => {
    // Guards against the pre-fix-5 bug where a single shared early-return
    // would skip every migration once ANY gate was present.
    const profile: UserProfile = {
      ...profileWithLegacySrs({ '42': entry }),
      keyMigrations: ['speakwrite-v1'],
    };
    const { profile: migrated, patch } = runKeyMigrations(profile, words, [], []);
    const newKey = srsWordKey(wordA);
    expect(migrated.srsByWord?.[newKey]).toEqual(entry);
    expect(migrated.keyMigrations).toEqual(['speakwrite-v1', 'srs-v2']);
    expect(patch.keyMigrations).toEqual(['speakwrite-v1', 'srs-v2']);
  });

  it('never touches a new-format key already present', () => {
    const newKey = srsWordKey(wordA);
    const profile = profileWithLegacySrs({ [newKey]: entry });
    const { patch } = runKeyMigrations(profile, words, [], []);
    // Nothing to migrate — the only write is the gate.
    expect(Object.keys(patch)).toEqual(['keyMigrations']);
  });

  it('skips guest profiles entirely — no writes, no gate', () => {
    const guest: UserProfile = { ...createGuestProfile(), srsByWord: { '42': entry } };
    const { profile: result, patch } = runKeyMigrations(guest, words, [], []);
    expect(result).toBe(guest);
    expect(patch).toEqual({});
  });

  it('skips fallback profiles entirely — no writes, no gate', () => {
    const fallback: UserProfile = { ...profileWithLegacySrs({ '42': entry }), isFallback: true };
    const { profile: result, patch } = runKeyMigrations(fallback, words, [], []);
    expect(result).toBe(fallback);
    expect(patch).toEqual({});
  });
});
