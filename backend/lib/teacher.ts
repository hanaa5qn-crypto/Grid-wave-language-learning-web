// =============================================================================
// Багшийн class-sandbox: сурагчийн Firestore баримтаас багшид харуулж БОЛОХ
// талбаруудыг цэвэрлэж гаргана. Framework-ээс хамааралгүй (pure) тул
// tests/teacher-route.test.ts шууд импортолж шалгана.
//
// billing / aiUsage / promo дотоод / redeemedCodes зэрэг server-owned
// entitlement талбарууд ЭНД ХЭЗЭЭ Ч ОРОХГҮЙ — зөвхөн явцын мэдээлэл.
// =============================================================================

export interface TeacherStudent {
  uid: string;
  name: string;
  email: string;
  code: string;
  streak: number;
  placementLevel: string | null;
  testHistoryEn: unknown[];
  vocabLearnedCount: number;
  mistakeCount: number;
  studyDaysEn: number;
  lastActive: string | null;
}

// Огноогоор түлхүүрлэсэн map-аас хамгийн сүүлийн (хамгийн том) түлхүүрийг
// олно (YYYY-MM-DD хэлбэртэй тул лексикографик эрэмбэ = цаг хугацааны эрэмбэ).
function maxDateKey(map: unknown): string | null {
  if (!map || typeof map !== 'object') return null;
  const keys = Object.keys(map as Record<string, unknown>);
  return keys.length > 0 ? keys.sort().at(-1)! : null;
}

export function buildTeacherStudent(uid: string, code: string, data: Record<string, unknown>): TeacherStudent {
  const placementEn = data.placementEn as { level?: string } | undefined;
  const placement = data.placement as { level?: string } | undefined;
  const testHistoryEn = Array.isArray(data.testHistoryEn) ? data.testHistoryEn.slice(0, 20) : [];
  const vocabLearnedEn = Array.isArray(data.vocabLearnedEn) ? data.vocabLearnedEn : [];
  const mistakeIdsEn = Array.isArray(data.mistakeIdsEn) ? data.mistakeIdsEn : [];
  const studyDaysEn = Array.isArray(data.studyDaysEn) ? data.studyDaysEn : [];

  return {
    uid,
    name: String(data.name ?? ''),
    email: String(data.email ?? ''),
    code,
    streak: Number(data.streak ?? 0),
    placementLevel: placementEn?.level ?? placement?.level ?? null,
    testHistoryEn,
    vocabLearnedCount: vocabLearnedEn.length,
    mistakeCount: mistakeIdsEn.length,
    studyDaysEn: studyDaysEn.length,
    lastActive: maxDateKey(data.studySecondsByDateEn) ?? maxDateKey(data.studySecondsByDate),
  };
}

export interface TeacherStudentDetail extends TeacherStudent {
  studySecondsByDate: Record<string, number>;
  studySecondsByDateEn: Record<string, number>;
  totalStudySeconds: number;
  dailyGoalMinutes: number;
  placementSkillScores: Record<string, { correct: number; total: number }> | null;
  completedActivityCount: number;
}

function sumSeconds(map: unknown): number {
  if (!map || typeof map !== 'object') return 0;
  return Object.values(map as Record<string, number>).reduce((sum, v) => sum + (Number(v) || 0), 0);
}

// Дэлгэрэнгүй харагдац: жагсаалтын projection дээр суралцсан цаг/дэлгэрэнгүй
// тестийн түүх/ур чадвар зэргийг нэмнэ. billing/aiUsage/promo/redeemedCodes/
// placementCredits-г ЭНД Ч ХЭЗЭЭ Ч ОРУУЛАХГҮЙ.
export function buildTeacherStudentDetail(uid: string, code: string, data: Record<string, unknown>): TeacherStudentDetail {
  const base = buildTeacherStudent(uid, code, data);
  const placementEn = data.placementEn as { skillScores?: Record<string, { correct: number; total: number }> } | undefined;
  const placement = data.placement as { skillScores?: Record<string, { correct: number; total: number }> } | undefined;
  const studySecondsByDate = (data.studySecondsByDate && typeof data.studySecondsByDate === 'object' ? data.studySecondsByDate : {}) as Record<string, number>;
  const studySecondsByDateEn = (data.studySecondsByDateEn && typeof data.studySecondsByDateEn === 'object' ? data.studySecondsByDateEn : {}) as Record<string, number>;
  const completedActivityIdsEn = Array.isArray(data.completedActivityIdsEn) ? data.completedActivityIdsEn : [];
  const testHistoryEn = Array.isArray(data.testHistoryEn) ? data.testHistoryEn : [];

  return {
    ...base,
    testHistoryEn,
    studySecondsByDate,
    studySecondsByDateEn,
    totalStudySeconds: sumSeconds(studySecondsByDate) + sumSeconds(studySecondsByDateEn),
    dailyGoalMinutes: Number(data.dailyGoalMinutes ?? 15),
    placementSkillScores: placementEn?.skillScores ?? placement?.skillScores ?? null,
    completedActivityCount: completedActivityIdsEn.length,
  };
}
