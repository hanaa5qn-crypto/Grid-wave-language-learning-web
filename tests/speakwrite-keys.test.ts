// audit §5.2 #5 (docs/backend-audit.md, RECOMMENDED FIXES item 5): German
// speaking/writing completion keys used to be content-derived text slugs
// (`speak:<modelAnswer text>`, `write:<level>:<prompt text>`) — any wording
// edit to library.ts silently invalidated prior completions. Keys are now
// built from each item's permanent numeric `id` instead; these tests pin the
// legacy-key recomputation (so the migration shim can never silently drift
// from what the old code produced), guard the library ids against future
// duplicates, and cover the 'speakwrite-v1' migration shim + its downstream
// consumers (unit membership, buildTodaySession).
import { describe, it, expect } from 'vitest';
import {
  activityKey, buildUnitsForLevel, buildTodaySession, MISTAKE_LOG_LIMIT,
} from '../frontend/src/learning';
import { runKeyMigrations } from '../frontend/src/keyMigrations';
import { SPEAKING_LIBRARY, WRITING_LIBRARY } from '../frontend/src/library';
import { UserProfile, createCustomProfile, createGuestProfile } from '../frontend/src/profiles';

describe('legacy speak/write key recomputation (pins the OLD content-derived format)', () => {
  it('speak: matches the exact string the old code built from modelAnswer (96-char cap included)', () => {
    const item = SPEAKING_LIBRARY.find((s) => s.id === 1)!;
    expect(item.modelAnswer).toBe(
      'Ich heiße Bat. Ich bin 25 Jahre alt und komme aus der Mongolei. Ich bin Student und mein Hobby ist Fußball.',
    );
    expect(activityKey('speak', item.modelAnswer)).toBe(
      'speak:ich-heiße-bat.-ich-bin-25-jahre-alt-und-komme-aus-der-mongolei.-ich-bin-student-und-mein-hobby-i',
    );
  });

  it('write:<level>: matches the exact string the old code built from prompt', () => {
    const item = WRITING_LIBRARY.find((w) => w.id === 1)!;
    expect(item.prompt).toBe('Шинэ найздаа өөрийгөө танилцуулсан богино мессеж бич.');
    expect(activityKey(`write:${item.level}`, item.prompt)).toBe(
      'write:A1:шинэ-найздаа-өөрийгөө-танилцуулсан-богино-мессеж-бич.',
    );
  });
});

describe('SPEAKING_LIBRARY / WRITING_LIBRARY — permanent, collision-free ids', () => {
  function duplicateIds(items: { id: number }[]): number[] {
    const seen = new Set<number>();
    const dupes = new Set<number>();
    for (const item of items) {
      if (seen.has(item.id)) dupes.add(item.id);
      seen.add(item.id);
    }
    return [...dupes];
  }

  it('has no duplicate ids in SPEAKING_LIBRARY (post-SPEAKING_EXTRA push)', () => {
    expect(duplicateIds(SPEAKING_LIBRARY)).toEqual([]);
  });

  it('has no duplicate ids in WRITING_LIBRARY (post-WRITING_EXTRA push)', () => {
    expect(duplicateIds(WRITING_LIBRARY)).toEqual([]);
  });
});

describe("runKeyMigrations — speakwrite-v1 (audit §5.2 #5)", () => {
  const speak1 = SPEAKING_LIBRARY.find((s) => s.id === 1)!;
  const speak2 = SPEAKING_LIBRARY.find((s) => s.id === 2)!;
  const write1 = WRITING_LIBRARY.find((w) => w.id === 1)!;

  const legacySpeakKey = activityKey('speak', speak1.modelAnswer);
  const newSpeakKey = activityKey('speak', speak1.id);
  const legacyWriteKey = activityKey(`write:${write1.level}`, write1.prompt);
  const newWriteKey = activityKey(`write:${write1.level}`, write1.id);

  function profileWith(overrides: Partial<UserProfile>): UserProfile {
    return { ...createCustomProfile('s@e.mn', 'S', 'A1', 'x'), ...overrides };
  }

  it('adds the new speak/write keys for legacy completions, keeping the legacy keys', () => {
    const profile = profileWith({ completedActivityIds: [legacySpeakKey, legacyWriteKey] });
    const { profile: migrated, patch } = runKeyMigrations(profile, [], [speak1], [write1]);

    expect(migrated.completedActivityIds).toEqual(
      expect.arrayContaining([legacySpeakKey, legacyWriteKey, newSpeakKey, newWriteKey]),
    );
    expect(patch.completedActivityIds).toEqual(expect.arrayContaining([newSpeakKey, newWriteKey]));
    // 'srs-v2' also runs (this is a never-migrated profile) — see srs-keys.test.ts
    // for coverage that each gate is independent of the other.
    expect(migrated.keyMigrations).toEqual(['srs-v2', 'speakwrite-v1']);
    expect(patch.keyMigrations).toEqual(['srs-v2', 'speakwrite-v1']);
  });

  it('migrates mistakeIds too (whole-array replace, capped at MISTAKE_LOG_LIMIT)', () => {
    const profile = profileWith({ mistakeIds: [legacySpeakKey] });
    const { profile: migrated, patch } = runKeyMigrations(profile, [], [speak1], []);

    expect(migrated.mistakeIds).toEqual(expect.arrayContaining([legacySpeakKey, newSpeakKey]));
    expect(patch.mistakeIds).toEqual(expect.arrayContaining([legacySpeakKey, newSpeakKey]));
    expect(patch.mistakeIds).toHaveLength(Math.min(2, MISTAKE_LOG_LIMIT));
  });

  it('does not add a new key when the item has no legacy completion/mistake', () => {
    const profile = profileWith({ completedActivityIds: [newSpeakKey] }); // already migrated
    const { patch } = runKeyMigrations(profile, [], [speak1, speak2], [write1]);
    expect(patch.completedActivityIds).toBeUndefined();
    // Only the gate is written when there is nothing else to migrate.
    expect(Object.keys(patch)).toEqual(['keyMigrations']);
  });

  it('is idempotent: running twice produces the same result as running once', () => {
    const profile = profileWith({ completedActivityIds: [legacySpeakKey, legacyWriteKey] });
    const once = runKeyMigrations(profile, [], [speak1], [write1]);
    const twice = runKeyMigrations(once.profile, [], [speak1], [write1]);
    expect(twice.profile.completedActivityIds).toEqual(once.profile.completedActivityIds);
    expect(twice.patch).toEqual({});
  });

  it('skips guest profiles entirely — no writes, no gate', () => {
    const guest: UserProfile = { ...createGuestProfile(), completedActivityIds: [legacySpeakKey] };
    const { profile: result, patch } = runKeyMigrations(guest, [], [speak1], [write1]);
    expect(result).toBe(guest);
    expect(patch).toEqual({});
  });

  it('skips fallback profiles entirely — no writes, no gate', () => {
    const fallback = profileWith({ completedActivityIds: [legacySpeakKey], isFallback: true });
    const { profile: result, patch } = runKeyMigrations(fallback, [], [speak1], [write1]);
    expect(result).toBe(fallback);
    expect(patch).toEqual({});
  });
});

describe('buildUnitsForLevel / buildTodaySession — id-based speak/write keys', () => {
  it('unit activity ids for speak/write are id-based, not text-based', () => {
    const units = buildUnitsForLevel('A1');
    const speakActivity = units.flatMap((u) => u.activities).find((a) => a.tab === 'speak');
    const writeActivity = units.flatMap((u) => u.activities).find((a) => a.tab === 'write');
    expect(speakActivity).toBeDefined();
    expect(writeActivity).toBeDefined();
    expect(speakActivity!.activityId).toBe(activityKey('speak', speakActivity!.itemId));
    expect(writeActivity!.activityId).toBe(activityKey('write:A1', writeActivity!.itemId));
  });

  it('a completed set keyed by speak:<id> marks the speaking item done in buildTodaySession', () => {
    const first = SPEAKING_LIBRARY.filter((s) => s.level === 'A1')[0];
    const completed = new Set([activityKey('speak', first.id)]);
    const session = buildTodaySession('A1', completed, {}, []);
    // The first A1 speaking item is completed, so today's pick must be a different item.
    expect(session.speaking?.id).not.toBe(first.id);
  });
});

// The B2-C2 exams (frontend/src/exams.ts) have their OWN speak/write item
// arrays that record into the same `speak:<id>` / `write:<level>:<id>` key
// space (A1-B1 exams deliberately reuse the library items, so equal ids there
// mean the same exercise). Library and exam-only ids must stay disjoint or a
// new library item could appear pre-completed for exam takers (audit §5.4).
describe('exam vs library speak/write id spaces stay disjoint', () => {
  it('B2-C2 exam speak/write ids never collide with library ids', async () => {
    const { EXAMS } = await import('../frontend/src/exams');
    const libSpeak = new Set(SPEAKING_LIBRARY.map((i) => i.id));
    const libWrite = new Set(WRITING_LIBRARY.map((i) => i.id));
    for (const level of ['B2', 'C1', 'C2'] as const) {
      const exam = EXAMS[level];
      expect(exam.speaking.filter((i) => libSpeak.has(i.id))).toEqual([]);
      expect(exam.writing.filter((i) => libWrite.has(i.id))).toEqual([]);
    }
  });
});
