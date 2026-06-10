import { describe, it, expect } from 'vitest';
import {
  PLACEMENT_POOL, PLACEMENT_QUESTION_INDEX, PLACEMENT_TOTAL_QUESTIONS,
  SKILL_SEQUENCE, STREAK_TO_LEVEL_UP,
  advanceDifficulty, pickQuestion, estimateLevel, scorePlacement, isFounderEmail,
  PlacementAnswer, PlacementSkill,
} from '../frontend/src/placement';
import { EXAM_LEVEL_ORDER, ExamLevel } from '../frontend/src/exams';
import { FOUNDER_EMAILS } from '../frontend/src/plans';

const SKILLS: PlacementSkill[] = ['read', 'listen', 'write', 'speak'];

describe('placement question pool', () => {
  it('covers every CEFR level and every skill', () => {
    for (const level of EXAM_LEVEL_ORDER) {
      for (const skill of SKILLS) {
        expect(PLACEMENT_POOL[level][skill].length, `${level}/${skill}`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it('is large enough to fill a full 60-question run', () => {
    // Ур чадвар бүрийн нийт асуулт нь дарааллын эзлэх хувиас их байх ёстой.
    for (const skill of SKILLS) {
      const total = EXAM_LEVEL_ORDER.reduce((n, lv) => n + PLACEMENT_POOL[lv][skill].length, 0);
      const needed = (PLACEMENT_TOTAL_QUESTIONS / SKILL_SEQUENCE.length)
        * SKILL_SEQUENCE.filter((s) => s === skill).length;
      expect(total, skill).toBeGreaterThanOrEqual(needed);
    }
  });

  it('every question has a valid correct choice and required media', () => {
    for (const q of PLACEMENT_QUESTION_INDEX.values()) {
      expect(q.choices.length).toBeGreaterThanOrEqual(2);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.choices.length);
      if (q.skill === 'read') expect(q.passage, q.id).toBeTruthy();
      if (q.skill === 'listen') expect(q.audioText, q.id).toBeTruthy();
    }
  });
});

describe('advanceDifficulty (adaptive staircase)', () => {
  it('steps up one level after consecutive correct answers', () => {
    let state = { levelIndex: 0, streak: 0 };
    for (let i = 0; i < STREAK_TO_LEVEL_UP; i++) {
      state = advanceDifficulty(state.levelIndex, state.streak, true);
    }
    expect(state.levelIndex).toBe(1);
    expect(state.streak).toBe(0);
  });

  it('steps down one level after a wrong answer', () => {
    expect(advanceDifficulty(3, 1, false)).toEqual({ levelIndex: 2, streak: 0 });
  });

  it('stays within A1..C2 bounds', () => {
    expect(advanceDifficulty(0, 0, false).levelIndex).toBe(0);
    let top = { levelIndex: EXAM_LEVEL_ORDER.length - 1, streak: 0 };
    for (let i = 0; i < STREAK_TO_LEVEL_UP; i++) top = advanceDifficulty(top.levelIndex, top.streak, true);
    expect(top.levelIndex).toBe(EXAM_LEVEL_ORDER.length - 1);
  });
});

describe('pickQuestion', () => {
  it('prefers the requested level and never repeats a question', () => {
    const used = new Set<string>();
    const first = pickQuestion('read', 2, used);
    expect(first?.level).toBe('B1');
    used.add(first!.id);
    const second = pickQuestion('read', 2, used);
    expect(second?.id).not.toBe(first!.id);
  });

  it('falls back to neighbouring levels when a pool is exhausted', () => {
    const used = new Set(PLACEMENT_POOL.C2.write.map((q) => q.id));
    const q = pickQuestion('write', EXAM_LEVEL_ORDER.length - 1, used);
    expect(q).not.toBeNull();
    expect(q!.level).toBe('C1');
  });
});

describe('estimateLevel & scorePlacement', () => {
  const answers = (entries: Array<[ExamLevel, boolean]>): PlacementAnswer[] =>
    entries.map(([level, correct], i) => ({
      questionId: `q${i}`,
      skill: SKILLS[i % SKILLS.length],
      level,
      correct,
    }));

  it('returns the highest level held at ≥60% accuracy', () => {
    const record = scorePlacement(answers([
      ['A1', true], ['A1', true], ['A1', true],
      ['A2', true], ['A2', true], ['A2', false],
      ['B1', true], ['B1', false], ['B1', false],
    ]));
    expect(record.level).toBe('A2'); // B1 33% — хүрэлцэхгүй
  });

  it('ignores levels with too few questions asked', () => {
    const record = scorePlacement(answers([
      ['A1', true], ['A1', true], ['A1', true],
      ['C2', true], ['C2', true], // ердөө 2 асуулт — нотолгоо хүрэлцэхгүй
    ]));
    expect(record.level).toBe('A1');
  });

  it('places an all-wrong run at A1 and keeps the result locked', () => {
    const record = scorePlacement(answers([
      ['A1', false], ['A1', false], ['A1', false], ['A1', false],
    ]));
    expect(record.level).toBe('A1');
    expect(record.unlocked).toBe(false);
    expect(record.unlockedBy).toBeUndefined();
  });

  it('tallies per-skill and per-level statistics', () => {
    const record = scorePlacement(answers([
      ['A1', true], ['A1', false], ['A1', true], ['A1', true],
    ]));
    expect(record.totalQuestions).toBe(4);
    expect(record.totalCorrect).toBe(3);
    expect(record.levelStats.A1).toEqual({ asked: 4, correct: 3 });
    expect(record.skillScores.read.total).toBe(1);
  });

  it('estimateLevel defaults to A1 with no data', () => {
    expect(estimateLevel({})).toBe('A1');
  });
});

describe('isFounderEmail', () => {
  it('accepts every account on the canonical founder list, case-insensitively', () => {
    expect(FOUNDER_EMAILS.length).toBeGreaterThan(0);
    for (const email of FOUNDER_EMAILS) {
      expect(isFounderEmail(email)).toBe(true);
      expect(isFounderEmail(`  ${email.toUpperCase()} `)).toBe(true);
    }
  });

  it('rejects regular learners and empty emails', () => {
    expect(isFounderEmail('bat@gmail.com')).toBe(false);
    expect(isFounderEmail(undefined)).toBe(false);
  });
});
