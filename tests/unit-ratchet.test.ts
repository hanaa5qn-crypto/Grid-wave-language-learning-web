// audit fix 7 (docs/backend-audit.md RECOMMENDED FIXES item 7): units are
// positional slices of the level-filtered libraries, so adding content
// re-chunks membership and used to silently un-pass passed units (commit
// cf8d710 did exactly that), re-locking everything after them. The ratchet
// persists `unit:` pass facts into the completion ledgers; these tests pin the
// ratchet semantics, the exclusion of the pseudo-ids from every activity
// count, and the one-time pinning migration.
import { describe, it, expect } from 'vitest';
import {
  Unit, unitPassId, isUnitPassed, isUnitUnlocked, unitProgress, newlyPassedUnitIds,
  buildUnitsForLevel, buildTodaySession,
} from '../frontend/src/learning';
import {
  EnUnit, enUnitPassId, enUnitPassed, enUnitUnlocked, newlyPassedEnUnitIds,
  englishProgressPercent, buildEnglishToday,
} from '../english/src/englishLearning';
import { calculateProgress, countRealActivities, normalizeProfileMetrics } from '../frontend/src/utils/profileMetrics';
import { runUnitsMigration } from '../frontend/src/keyMigrations';
import { UserProfile, createCustomProfile, createGuestProfile } from '../frontend/src/profiles';

function deUnit(index: number, activityIds: string[], level = 'A1'): Unit {
  return {
    level: level as Unit['level'],
    index,
    title: `${index + 1}-р хэсэг`,
    activities: activityIds.map((id, i) => ({
      activityId: id, tab: 'read' as const, itemId: i + 1, title: id, titleMn: id,
    })),
  };
}

function enUnit(index: number, activityIds: string[], level = 'A1'): EnUnit {
  return {
    level: level as EnUnit['level'],
    index,
    title: `Unit ${index + 1}`,
    activities: activityIds.map((id, i) => ({
      activityId: id, skill: 'read' as const, itemId: i + 1, title: id,
    })),
  };
}

describe('German unit-pass ratchet', () => {
  const acts = ['library:read:1', 'library:read:2', 'library:read:3', 'library:read:4'];
  const threeDone = new Set(acts.slice(0, 3)); // 75% ≥ 70%

  it('a live-passed unit reports its ratchet id as newly passed', () => {
    const unit = deUnit(0, acts);
    expect(isUnitPassed(unit, threeDone)).toBe(true);
    expect(newlyPassedUnitIds([unit], threeDone)).toEqual(['unit:de:A1:0']);
  });

  it('stays passed after content insertion drops the live ratio below threshold', () => {
    // Simulated content drop: the same unit slot now holds 6 activities, so the
    // 3 completions fall to 50% — below the 70% live threshold.
    const grown = deUnit(0, [...acts, 'library:read:5', 'library:read:6']);
    expect(isUnitPassed(grown, threeDone)).toBe(false); // without the ratchet: un-passed

    const withFact = new Set([...threeDone, unitPassId('A1', 0)]);
    expect(isUnitPassed(grown, withFact)).toBe(true);   // ratchet: passed forever
    // ...and the next unit stays unlocked through it.
    const next = deUnit(1, ['library:read:7']);
    expect(isUnitUnlocked([grown, next], 1, withFact)).toBe(true);
    // Already-ledgered facts are not reported again (no redundant write).
    expect(newlyPassedUnitIds([grown, next], withFact)).toEqual([]);
  });

  it('unit completion ratios never count the pseudo-id itself', () => {
    const unit = deUnit(0, acts);
    expect(unitProgress(unit, new Set([unitPassId('A1', 0)]))).toEqual({ done: 0, total: 4 });
  });
});

describe('English unit-pass ratchet', () => {
  const acts = ['en:read:1', 'en:read:2', 'en:read:3', 'en:read:4'];
  const threeDone = new Set(acts.slice(0, 3));

  it('ratchet id shape is unit:en:<level>:<index> and pins a re-chunked unit', () => {
    const unit = enUnit(0, acts);
    expect(newlyPassedEnUnitIds([unit], threeDone)).toEqual(['unit:en:A1:0']);

    const grown = enUnit(0, [...acts, 'en:read:5', 'en:read:6']);
    expect(enUnitPassed(grown, threeDone)).toBe(false);
    const withFact = new Set([...threeDone, enUnitPassId('A1', 0)]);
    expect(enUnitPassed(grown, withFact)).toBe(true);
    expect(enUnitUnlocked([grown, enUnit(1, ['en:read:7'])], 1, withFact)).toBe(true);
  });
});

describe('pseudo-ids are excluded from every activity count', () => {
  const facts = ['unit:de:A1:0', 'unit:de:B1:2'];

  it('German progress % and lesson count ignore unit: facts', () => {
    expect(calculateProgress(facts)).toBe(0);
    expect(countRealActivities([...facts, 'library:read:1'])).toBe(1);
    const profile = normalizeProfileMetrics({
      ...createCustomProfile('s@e.mn', 'S', 'A1', 'x'),
      completedActivityIds: [...facts, 'library:read:1'],
    });
    expect(profile.completedLessons).toBe(1);
    // The ledger itself keeps the facts — only the counts exclude them.
    expect(profile.completedActivityIds).toEqual(expect.arrayContaining(facts));
  });

  it('English progress % ignores unit: facts', () => {
    expect(englishProgressPercent(['unit:en:A1:0'])).toBe(0);
  });

  it("today-session picking is unaffected by unit: facts (they match no item key)", () => {
    const empty = buildTodaySession('A1', new Set(), {}, []);
    const withFacts = buildTodaySession('A1', new Set(facts), {}, []);
    expect(withFacts.reading?.id).toBe(empty.reading?.id);
    expect(withFacts.speaking?.id).toBe(empty.speaking?.id);
    const enEmpty = buildEnglishToday('A1', []);
    const enWithFacts = buildEnglishToday('A1', ['unit:en:A1:0']);
    expect(enWithFacts.reading?.id).toBe(enEmpty.reading?.id);
  });
});

describe('units-v1 migration (runUnitsMigration)', () => {
  const base = (): UserProfile => ({
    ...createCustomProfile('s@e.mn', 'S', 'A1', 'x'),
    completedActivityIds: ['library:read:1'],
  });

  it('pins the given ids, sets the gate, and skips ids already in the ledger', () => {
    const profile = { ...base(), completedActivityIds: ['library:read:1', 'unit:de:A1:0'] };
    const { profile: migrated, patch } = runUnitsMigration(
      profile, 'units-v1', 'completedActivityIds', ['unit:de:A1:0', 'unit:de:A2:0'],
    );
    expect(migrated.completedActivityIds).toEqual(['library:read:1', 'unit:de:A1:0', 'unit:de:A2:0']);
    expect(migrated.keyMigrations).toContain('units-v1');
    expect(patch.completedActivityIds).toEqual(migrated.completedActivityIds);
    expect(patch.keyMigrations).toEqual(migrated.keyMigrations);
  });

  it('is idempotent: the gate makes a second run a pure no-op', () => {
    const once = runUnitsMigration(base(), 'units-v1', 'completedActivityIds', ['unit:de:A1:0']);
    const twice = runUnitsMigration(once.profile, 'units-v1', 'completedActivityIds', ['unit:de:A1:0']);
    expect(twice.profile).toBe(once.profile);
    expect(twice.patch).toEqual({});
  });

  it('with nothing to pin, only the gate is written', () => {
    const { patch } = runUnitsMigration(base(), 'units-v1', 'completedActivityIds', []);
    expect(Object.keys(patch)).toEqual(['keyMigrations']);
  });

  it('skips guest and fallback profiles entirely', () => {
    const guest = runUnitsMigration(createGuestProfile(), 'units-v1', 'completedActivityIds', ['unit:de:A1:0']);
    expect(guest.patch).toEqual({});
    const fallback = runUnitsMigration({ ...base(), isFallback: true }, 'units-v1', 'completedActivityIds', ['unit:de:A1:0']);
    expect(fallback.patch).toEqual({});
  });

  it('multi-level sweep pins a passed unit on a NON-active level (caller pattern)', () => {
    // The learner's target level is A1, but their ledger fully covers the first
    // A2 unit — the migration caller sweeps every level, so A2's fact is pinned.
    const a2Unit0 = buildUnitsForLevel('A2')[0];
    const completed = new Set(a2Unit0.activities.map((a) => a.activityId));
    const passedAllLevels = (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const)
      .flatMap((lvl) => newlyPassedUnitIds(buildUnitsForLevel(lvl), completed));
    expect(passedAllLevels).toContain('unit:de:A2:0');
    expect(passedAllLevels).not.toContain('unit:de:A1:0');
  });
});

describe('regression: fresh user locks are unchanged', () => {
  it('zero completions → unit 0 open, unit 1+ locked, nothing newly passed', () => {
    const units = buildUnitsForLevel('A1');
    const none = new Set<string>();
    expect(isUnitUnlocked(units, 0, none)).toBe(true);
    if (units.length > 1) expect(isUnitUnlocked(units, 1, none)).toBe(false);
    expect(newlyPassedUnitIds(units, none)).toEqual([]); // → no ratchet write for fresh users
  });
});
