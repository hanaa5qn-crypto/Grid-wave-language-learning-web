import { UserProfile } from '../profiles';
import { DICTIONARY } from '../data';
import {
  READING_LIBRARY, LISTENING_LIBRARY, WRITING_LIBRARY, SPEAKING_LIBRARY,
} from '../library';
import { EXAMS } from '../exams';
import { calculateStreakWithGrace } from '../learning';

const WEEKDAY_LABELS = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];

export const TRACKABLE_ACTIVITY_TOTAL =
  4 + // core quick lesson + detailed reading/listening/writing lessons
  DICTIONARY.filter((w) => w.mongolian.trim().length > 0).length +
  READING_LIBRARY.length +
  LISTENING_LIBRARY.length +
  SPEAKING_LIBRARY.length +
  WRITING_LIBRARY.length +
  Object.values(EXAMS).reduce(
    (sum, exam) => sum + exam.reading.length + exam.listening.length + exam.speaking.length + exam.writing.length,
    0,
  );

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateFromLocalKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function buildLearningCurve(studySecondsByDate: Record<string, number> = {}): UserProfile['learningCurve'] {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(today, index - 6);
    const key = localDateKey(date);
    const seconds = Math.max(0, studySecondsByDate[key] ?? 0);
    return {
      day: WEEKDAY_LABELS[date.getDay()],
      hours: Number((seconds / 3600).toFixed(1)),
    };
  });
}

export function calculateStreak(studyDays: string[] = [], today = new Date()): number {
  return calculateStreakWithGrace(studyDays, today).streak;
}

export function calculateProgress(completedActivityIds: string[] = []): number {
  if (TRACKABLE_ACTIVITY_TOTAL <= 0) return 0;
  const uniqueCompleted = new Set(completedActivityIds).size;
  return Math.min(100, Math.round((uniqueCompleted / TRACKABLE_ACTIVITY_TOTAL) * 100));
}

export function activityKey(prefix: string, value: string | number): string {
  return `${prefix}:${String(value).trim().toLowerCase().replace(/\s+/g, '-').slice(0, 96)}`;
}

export function normalizeProfileMetrics(profile: UserProfile): UserProfile {
  const completedActivityIds = Array.from(new Set(profile.completedActivityIds ?? []));
  const studyDays = Array.from(new Set(profile.studyDays ?? [])).sort();
  const studySecondsByDate = profile.studySecondsByDate ?? {};

  // Calculate streak with grace using learning.ts engine
  const streakRes = calculateStreakWithGrace(studyDays);
  const streak = streakRes.streak;

  const progress = calculateProgress(completedActivityIds);
  return {
    ...profile,
    completedActivityIds,
    studyDays,
    studySecondsByDate,
    streak,
    progress,
    completedLessons: completedActivityIds.length,
    learningCurve: buildLearningCurve(studySecondsByDate),
    // Ensure all custom profile fields are present
    srsByWord: profile.srsByWord ?? {},
    mistakeIds: profile.mistakeIds ?? [],
    onboardingDone: profile.onboardingDone ?? false,
    dailyGoalMinutes: profile.dailyGoalMinutes ?? 15,
    streakFreezeCount: profile.streakFreezeCount ?? 1,
  };
}
