import { describe, it, expect } from 'vitest';
import {
  EN_LEVEL_ORDER, EN_PLACEMENT_POOL, EN_PLACEMENT_TOTAL, EN_PLACEMENT_SEQUENCE,
  pickEnglishPlacementQuestion, advanceEnglishDifficulty, EN_PLACEMENT_START_INDEX,
  scoreEnglishPlacement,
  buildEnglishToday, resolveEnglishMistakes, addEnglishMistake, clearEnglishMistake,
  englishProgressPercent, EN_TRACKABLE_TOTAL, buildEnglishUnits, enUnitUnlocked,
  enUnitPassed, buildEnglishCurve, enActivityKey, enSatKey, enVocabKey,
  appendTestHistory, EN_TEST_HISTORY_LIMIT, promotedEnglishLevel,
  type EnPlacementAnswer, type EnglishTestHistoryEntry,
} from '../english/src/englishLearning';
import { READING_LIBRARY, LISTENING_LIBRARY } from '../english/src/content';

function englishUnitActivityIds(level: string): string[] {
  return buildEnglishUnits(level).flatMap((unit) => unit.activities.map((activity) => activity.activityId));
}

describe('promotedEnglishLevel', () => {
  it('returns the next level when every unit is passed', () => {
    expect(promotedEnglishLevel('A1', new Set(englishUnitActivityIds('A1')))).toBe('A2');
  });

  it('returns null when one unit is not passed', () => {
    const units = buildEnglishUnits('A1');
    const incompleteUnit = units.at(-1)!;
    const completed = new Set(units
      .filter((unit) => unit !== incompleteUnit)
      .flatMap((unit) => unit.activities.map((activity) => activity.activityId)));

    expect(promotedEnglishLevel('A1', completed)).toBeNull();
  });

  it('returns null for a fully passed top level', () => {
    expect(promotedEnglishLevel('C2', new Set(englishUnitActivityIds('C2')))).toBeNull();
  });

  it('returns null for an unknown level', () => {
    expect(promotedEnglishLevel('X9', new Set())).toBeNull();
  });
});

describe('English placement pool', () => {
  it('covers reading + listening for the levels that have content', () => {
    for (const level of EN_LEVEL_ORDER) {
      const r = EN_PLACEMENT_POOL[level].read.length;
      const l = EN_PLACEMENT_POOL[level].listen.length;
      // Every level we ship study content for must offer placement questions.
      if (READING_LIBRARY.some((x) => x.level === level)) expect(r, `${level}/read`).toBeGreaterThan(0);
      if (LISTENING_LIBRARY.some((x) => x.level === level)) expect(l, `${level}/listen`).toBeGreaterThan(0);
    }
  });

  it('every question has a valid correct choice and its media', () => {
    for (const level of EN_LEVEL_ORDER) {
      for (const skill of ['read', 'listen'] as const) {
        for (const q of EN_PLACEMENT_POOL[level][skill]) {
          expect(q.choices.length).toBeGreaterThanOrEqual(2);
          expect(q.correctIndex).toBeGreaterThanOrEqual(0);
          expect(q.correctIndex).toBeLessThan(q.choices.length);
          if (skill === 'read') expect(q.passage, q.id).toBeTruthy();
          if (skill === 'listen') expect(q.transcript, q.id).toBeTruthy();
        }
      }
    }
  });
});

// --- Accuracy: a simulated learner of a known "true" level should be placed at
// that level (±1 band, which is the realistic precision of an adaptive test). --
function simulatePlacement(trueLevelIndex: number) {
  // Mirror the shipped flow: open at B1 and move a full level per answer.
  let levelIndex = EN_PLACEMENT_START_INDEX;
  const used = new Set<string>();
  const answers: EnPlacementAnswer[] = [];

  for (let count = 0; count < EN_PLACEMENT_TOTAL; count++) {
    const skill = EN_PLACEMENT_SEQUENCE[count % EN_PLACEMENT_SEQUENCE.length];
    const q = pickEnglishPlacementQuestion(skill, levelIndex, used)
      ?? pickEnglishPlacementQuestion(skill === 'read' ? 'listen' : 'read', levelIndex, used);
    if (!q) break;
    used.add(q.id);
    // The learner answers correctly iff the question is at or below their level.
    const correct = EN_LEVEL_ORDER.indexOf(q.level) <= trueLevelIndex;
    answers.push({ questionId: q.id, skill: q.skill, level: q.level, correct });
    levelIndex = advanceEnglishDifficulty(levelIndex, correct);
  }
  return scoreEnglishPlacement(answers);
}

describe('advanceEnglishDifficulty (hard, sharply adaptive staircase)', () => {
  it('opens at B1, not A1', () => {
    expect(EN_LEVEL_ORDER[EN_PLACEMENT_START_INDEX]).toBe('B1');
  });

  it('climbs one full level on a correct answer', () => {
    expect(advanceEnglishDifficulty(2, true)).toBe(3); // B1 → B2
  });

  it('drops one full level on a wrong answer', () => {
    expect(advanceEnglishDifficulty(2, false)).toBe(1); // B1 → A2
  });

  it('clamps at the C2 ceiling and the A1 floor', () => {
    expect(advanceEnglishDifficulty(EN_LEVEL_ORDER.length - 1, true)).toBe(EN_LEVEL_ORDER.length - 1);
    expect(advanceEnglishDifficulty(0, false)).toBe(0);
  });
});

describe('English placement accuracy', () => {
  it('places a true-A1 learner at A1', () => {
    const r = simulatePlacement(0);
    expect(r.level).toBe('A1');
  });

  it('places learners within one band of their true level', () => {
    EN_LEVEL_ORDER.forEach((trueLevel, trueIdx) => {
      const r = simulatePlacement(trueIdx);
      const placedIdx = EN_LEVEL_ORDER.indexOf(r.level);
      expect(Math.abs(placedIdx - trueIdx), `true ${trueLevel} → placed ${r.level}`).toBeLessThanOrEqual(1);
    });
  });

  it('never repeats a question within a run', () => {
    const used = new Set<string>();
    let dup = false;
    for (let i = 0; i < EN_PLACEMENT_TOTAL; i++) {
      const q = pickEnglishPlacementQuestion(i % 2 === 0 ? 'read' : 'listen', 2, used);
      if (!q) break;
      if (used.has(q.id)) dup = true;
      used.add(q.id);
    }
    expect(dup).toBe(false);
  });
});

describe('scoreEnglishPlacement', () => {
  const answers = (entries: Array<[string, boolean]>): EnPlacementAnswer[] =>
    entries.map(([level, correct], i) => ({
      questionId: `q${i}`, skill: i % 2 === 0 ? 'read' : 'listen', level: level as any, correct,
    }));

  it('returns the highest level held at >=60% accuracy', () => {
    const r = scoreEnglishPlacement(answers([
      ['A1', true], ['A1', true], ['A1', true],
      ['A2', true], ['A2', true], ['A2', false],
      ['B1', true], ['B1', false], ['B1', false],
    ]));
    expect(r.level).toBe('A2');
  });

  it('places an all-wrong run at A1', () => {
    const r = scoreEnglishPlacement(answers([['A1', false], ['A1', false], ['A1', false]]));
    expect(r.level).toBe('A1');
    expect(r.totalCorrect).toBe(0);
  });

  it('tallies per-skill totals', () => {
    const r = scoreEnglishPlacement(answers([['A1', true], ['A1', false], ['A1', true], ['A1', true]]));
    expect(r.totalQuestions).toBe(4);
    expect(r.totalCorrect).toBe(3);
    expect(r.skillScores.read.total + r.skillScores.listen.total).toBe(4);
  });
});

describe('appendTestHistory (capped, newest-first)', () => {
  const entry = (i: number): EnglishTestHistoryEntry => ({
    takenAt: `2026-07-0${(i % 9) + 1}T00:00:00.000Z`,
    exam: 'ielts', testId: `ielts-${i}:reading`, label: `Test ${i}`,
    correct: i, total: 40, band: 6,
  });

  it('prepends the new entry (most recent first)', () => {
    const a = entry(1), b = entry(2);
    expect(appendTestHistory([a], b)).toEqual([b, a]);
  });

  it('starts from empty history without error', () => {
    const a = entry(1);
    expect(appendTestHistory(undefined, a)).toEqual([a]);
    expect(appendTestHistory([], a)).toEqual([a]);
  });

  it('caps at the limit, dropping the oldest tail', () => {
    let hist: EnglishTestHistoryEntry[] = [];
    for (let i = 0; i < EN_TEST_HISTORY_LIMIT + 5; i++) hist = appendTestHistory(hist, entry(i));
    expect(hist).toHaveLength(EN_TEST_HISTORY_LIMIT);
    // Newest (last appended) is first; the earliest few fell off the end.
    expect(hist[0].testId).toBe(`ielts-${EN_TEST_HISTORY_LIMIT + 4}:reading`);
  });

  it('honours a custom limit', () => {
    const hist = appendTestHistory([entry(1), entry(2)], entry(3), 2);
    expect(hist).toHaveLength(2);
    expect(hist[0].testId).toBe('ielts-3:reading');
  });
});

describe('English dashboard engine', () => {
  it('merged libraries have no duplicate activity keys', () => {
    // The reading/listening libraries merge several content sources; a shared
    // id collapses two lessons onto one completion key and caps progress < 100%.
    for (const [skill, lib] of [['read', READING_LIBRARY], ['listen', LISTENING_LIBRARY]] as const) {
      const keys = lib.map((i) => enActivityKey(skill, i.id));
      expect(new Set(keys).size, `${skill} ids`).toBe(keys.length);
    }
  });

  it('progress percent is bounded and over reading + listening only', () => {
    expect(EN_TRACKABLE_TOTAL).toBe(READING_LIBRARY.length + LISTENING_LIBRARY.length);
    expect(englishProgressPercent([])).toBe(0);
    const all = [
      ...READING_LIBRARY.map((i) => enActivityKey('read', i.id)),
      ...LISTENING_LIBRARY.map((i) => enActivityKey('listen', i.id)),
    ];
    expect(englishProgressPercent(all)).toBe(100);
  });

  it('progress percent ignores SAT practice ids sharing the ledger', () => {
    const satOnly = [enSatKey(90001), enSatKey(90002)];
    expect(englishProgressPercent(satOnly)).toBe(0);
    const mixed = [...satOnly, enActivityKey('read', READING_LIBRARY[0].id)];
    expect(englishProgressPercent(mixed)).toBe(englishProgressPercent([mixed[2]]));
  });

  it('SAT + vocab ledger keys are stable and namespaced', () => {
    expect(enSatKey(90001)).toBe('en:sat:90001');
    expect(enVocabKey('ielts', '  Abate ')).toBe('ielts:abate');
    expect(enVocabKey('sat', 'Candid')).toBe('sat:candid');
  });

  it("today's session suggests an item per skill at the level", () => {
    const today = buildEnglishToday('A1', []);
    expect(today.reading?.level).toBe('A1');
    expect(today.listening?.level).toBe('A1');
    expect(today.vocabCount).toBeGreaterThanOrEqual(0);
  });

  it('falls forward to the next level when the current level is exhausted', () => {
    const completed = READING_LIBRARY
      .filter((item) => item.level === 'B1')
      .map((item) => enActivityKey('read', item.id));

    expect(buildEnglishToday('B1', completed).reading?.level).toBe('B2');
  });

  it('falls back through lower levels in descending order after higher levels are exhausted', () => {
    const completed = READING_LIBRARY
      .filter((item) => ['B1', 'B2', 'C1', 'C2'].includes(item.level))
      .map((item) => enActivityKey('read', item.id));

    expect(buildEnglishToday('B1', completed).reading?.level).toBe('A2');
  });

  it('mistake log adds, dedupes, clears and resolves to library items', () => {
    const id = enActivityKey('read', READING_LIBRARY[0].id);
    let log = addEnglishMistake([], id);
    log = addEnglishMistake(log, id); // dedupe
    expect(log).toEqual([id]);
    expect(resolveEnglishMistakes(log)[0].title).toBe(READING_LIBRARY[0].title);
    expect(clearEnglishMistake(log, id)).toEqual([]);
  });

  it('lesson path gates: unit 1 open, unit 2 locked until unit 1 passes', () => {
    const units = buildEnglishUnits('A1');
    expect(units.length).toBeGreaterThan(0);
    expect(enUnitUnlocked(units, 0, new Set())).toBe(true);
    if (units.length > 1) {
      expect(enUnitUnlocked(units, 1, new Set())).toBe(false);
      const allDone = new Set(units[0].activities.map((a) => a.activityId));
      expect(enUnitPassed(units[0], allDone)).toBe(true);
      expect(enUnitUnlocked(units, 1, allDone)).toBe(true);
    }
  });

  it('study-hours curve returns one point per weekday', () => {
    const curve = buildEnglishCurve({});
    expect(curve).toHaveLength(7);
    expect(curve.every((c) => c.hours === 0)).toBe(true);
  });
});
