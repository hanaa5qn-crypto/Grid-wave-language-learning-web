import { describe, it, expect } from 'vitest';
import { buildDuelQuestions, DUEL_QUESTION_COUNT } from '../frontend/src/duel';
import { EXAM_LEVEL_ORDER } from '../frontend/src/exams';

describe('buildDuelQuestions — хуваалцсан seed-ийн тогтмол байдал', () => {
  it('returns identical question sets for the same seed and level', () => {
    for (const level of EXAM_LEVEL_ORDER) {
      const first = buildDuelQuestions(123456789, level);
      const second = buildDuelQuestions(123456789, level);
      // Хоёр тоглогчийн клиент дээр асуулт, дараалал, сонголтын байрлал
      // хүртэл яг ижил байх ёстой.
      expect(second).toEqual(first);
    }
  });

  it('produces different sets for different seeds', () => {
    const a = buildDuelQuestions(1, 'B1');
    const b = buildDuelQuestions(2, 'B1');
    expect(a).not.toEqual(b);
  });

  it('always builds exactly 10 valid MCQs at every level', () => {
    for (const level of EXAM_LEVEL_ORDER) {
      const questions = buildDuelQuestions(42, level);
      expect(questions).toHaveLength(DUEL_QUESTION_COUNT);
      for (const q of questions) {
        expect(q.question.length).toBeGreaterThan(0);
        expect(q.choices.length).toBeGreaterThanOrEqual(2);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.choices.length);
        // Сонголтууд давхардахгүй байх ёстой (өөрөөр зөв хариулт хоёрдмол болно).
        expect(new Set(q.choices).size).toBe(q.choices.length);
      }
    }
  });

  it('does not repeat the same question within one duel', () => {
    const questions = buildDuelQuestions(777, 'A2');
    const texts = questions.map((q) => q.question + (q.passage ?? ''));
    expect(new Set(texts).size).toBe(texts.length);
  });
});
