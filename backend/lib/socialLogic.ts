// =============================================================================
// Нийгмийн боломжуудын цэвэр (pure) логик — Express/Firebase-ээс хамааралгүй
// тул tests/social.test.ts шууд импортолж шалгана.
// =============================================================================

// Ялагчийг тогтооно: өндөр оноо түрүүлнэ, тэнцвэл бага хугацаа, бүгд тэнцвэл
// тэнцээ (null).
export function decideDuelWinner(
  a: { uid: string; score: number; timeMs: number },
  b: { uid: string; score: number; timeMs: number },
): string | null {
  if (a.score !== b.score) return a.score > b.score ? a.uid : b.uid;
  if (a.timeMs !== b.timeMs) return a.timeMs < b.timeMs ? a.uid : b.uid;
  return null;
}

// Орон нутгийн огнооны түлхүүр (frontend/src/learning.ts-ийн localDateKey-тэй
// ижил формат — сервер бандл руу контентын сангуудыг чирэхгүйн тулд энд
// давхар бичив).
export function localDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Энэ долоо хоногийн (Даваа–Ням) суралцсан минут — studySecondsByDate-аас.
export function weekMinutes(
  studySecondsByDate: Record<string, number> | undefined,
  now = new Date(),
): number {
  if (!studySecondsByDate) return 0;
  const monday = new Date(now);
  const offsetToMonday = (now.getDay() + 6) % 7; // Ням=0 → 6, Даваа=1 → 0
  monday.setDate(now.getDate() - offsetToMonday);
  let seconds = 0;
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    seconds += studySecondsByDate[localDateKey(day)] ?? 0;
  }
  return Math.round(seconds / 60);
}

// Андуурагдмааргүй тэмдэгтгүй (0/O, 1/I алгассан) санамсаргүй код.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export function randomCode(length: number): string {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

export function normalizeCode(value: unknown): string {
  return String(value ?? '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
}

// Урамшууллын хоногийг одоо байгаа дуусах хугацаан дээр СТЕК болгож нэмнэ:
// идэвхтэй (ирээдүйд дуусах) хугацаа байвал түүн дээр, эс бөгөөс одооноос
// эхлүүлж тооцно. Олон хүн урихад урьсан хүний Pro хугацаа уртасна.
export function stackedTrialEndMs(
  currentPeriodEnd: string | undefined,
  addDays: number,
  now = Date.now(),
): number {
  const existing = Date.parse(currentPeriodEnd ?? '');
  const base = Number.isFinite(existing) && existing > now ? existing : now;
  return base + addDays * 24 * 3600 * 1000;
}
