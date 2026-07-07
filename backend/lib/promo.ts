// =============================================================================
// Багшийн promo / affiliate-ийн цэвэр (pure) логик — Express/Firebase-ээс
// хамааралгүй тул tests/promo.test.ts шууд импортолж шалгана.
//
// Багш бүрт нэг branded код өгнө. Сурагч кодыг ашиглавал ЭХНИЙ төлбөртэй
// захиалга дээрээ хямдрал авна; багш тухайн ЦЭВЭР төлсөн дүнгээс комисс авна.
// Хямдрал 0–100%; 100% = үнэгүй (төлбөрийн gateway алгасаж шууд идэвхжүүлнэ).
// =============================================================================

import { normalizeCode } from './socialLogic';

// Firestore `teacherCodes/{CODE}` баримтын бүтэц (CODE = doc id).
export interface TeacherCode {
  teacherName: string;
  teacherContact?: string;      // гар аргаар төлбөр өгөхөд (зөвхөн admin харна)
  teacherEmail?: string;        // lowercase — багшийн /api/teacher/students-д хандах эрх энэ email-ээр баталгаажна
  kind?: 'teacher' | 'influencer'; // admin-ий ангилал; байхгүй бол 'teacher' (хуучин баримт)
  discountPercent: number;      // 0..100; 100 = үнэгүй
  commissionPercent: number;    // 0..100, цэвэр төлсөн дүнгээс
  active: boolean;
  createdAt: string;
  createdBy: string;            // admin uid
  redeemCount: number;          // кодыг холбосон сурагчдын тоо
  paidConversions: number;      // захиалга идэвхжүүлсэн (төлбөртэй ба үнэгүй)
  commissionAccruedCents: number; // нийт хуримтлагдсан комисс (өртэй)
}

// Сурагчийн user баримт дээр хадгалагдах promo snapshot (server-owned).
export interface UserPromo {
  code: string;
  teacherName: string;
  discountPercent: number;
  commissionPercent: number;
  firstPaymentDone: boolean;
}

// 0..100 хооронд таслана. Тоо биш бол NaN буцаана (parse* нь null болгоно).
export function clampPercent(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return NaN;
  return Math.min(100, Math.max(0, n));
}

// MNT дүнд хувийн хямдрал тооцоод хамгийн ойрын төгрөг рүү бүхэлчилнэ.
// 100% → 0 (үнэгүй). Буруу/NaN хувь → хямдралгүй (анхны дүн).
export function discountedAmountMnt(listMnt: number, discountPercent: number): number {
  const pct = clampPercent(discountPercent);
  const safe = Number.isFinite(pct) ? pct : 0;
  return Math.max(0, Math.round(listMnt * (1 - safe / 100)));
}

// Багшийн комисс (cent) — сурагчийн ЦЭВЭР төлсөн дүнгээс тооцно.
export function commissionCents(netCents: number, commissionPercent: number): number {
  const pct = clampPercent(commissionPercent);
  const safe = Number.isFinite(pct) ? pct : 0;
  return Math.max(0, Math.round(netCents * (safe / 100)));
}

// Admin-ийн оруулсан хувийг шалгаж нормчилно (0..100). Буруу бол null.
export function parsePercent(value: unknown): number | null {
  const n = clampPercent(value);
  return Number.isFinite(n) ? n : null;
}

// Багшийн нэр — хоосон биш, 80 тэмдэгтээр хязгаарлана.
export function parseTeacherName(value: unknown): string | null {
  const name = String(value ?? '').trim().slice(0, 80);
  return name.length > 0 ? name : null;
}

// Кодыг нормчилно (socialLogic.normalizeCode-тэй ижил: ABCDEF... uppercase).
// Дор хаяж 3 тэмдэгт шаардана.
export function parseTeacherCodeId(value: unknown): string | null {
  const code = normalizeCode(value);
  return code.length >= 3 ? code : null;
}

// Кодын төрөл: 'teacher' (анхны утга) эсвэл 'influencer'. Буруу утга бол null.
export function parseCodeKind(value: unknown): 'teacher' | 'influencer' | null {
  if (value === undefined) return 'teacher';
  return value === 'teacher' || value === 'influencer' ? value : null;
}

// Багшийн и-мэйл — lowercase болгож нормчилно. Хоосон/буруу форматтай бол null.
// (undefined тусад нь route дээр "оруулаагүй" гэж авч, '' эсвэл null-г "цэвэрлэх"
// гэж ялгах ёстой тул энэ функц зөвхөн ФОРМАТ шалгана, undefined-г үл хамаарна.)
export function parseTeacherEmail(value: unknown): string | null {
  const email = String(value ?? '').trim().toLowerCase();
  if (!email) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}
