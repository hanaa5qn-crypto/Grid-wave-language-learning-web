import type { Express, Request, Response } from 'express';
import { firebaseAdminMissingMessage, getFirebaseAdmin, verifyFirebaseBearer } from '../lib/firebaseAdmin';
import { buildTeacherStudent, buildTeacherStudentDetail, type TeacherStudent } from '../lib/teacher';

// Тухайн bearer email-тэй холбоотой teacherCodes-г эсвэл 403-г буцаана. Хоёр
// route-ийн адил auth+sandbox шатыг нэг дор байлгав.
async function loadCallerCodes(admin: NonNullable<ReturnType<typeof getFirebaseAdmin>>, req: Request, res: Response): Promise<string[] | null> {
  const user = await verifyFirebaseBearer(req);
  if (!user) { res.status(401).json({ error: 'Дахин нэвтэрсний дараа үргэлжлүүлнэ үү.' }); return null; }
  const email = (user.email ?? '').toLowerCase();
  if (!email) { res.status(401).json({ error: 'И-мэйл шаардлагатай.' }); return null; }

  const codesSnap = await admin.db.collection('teacherCodes').where('teacherEmail', '==', email).get();
  if (codesSnap.empty) { res.status(403).json({ error: 'not_a_teacher' }); return null; }
  return codesSnap.docs.map((d) => d.id);
}

// =============================================================================
// Багшийн class-sandbox API: багш зөвхөн ӨӨРИЙН teacherEmail-тэй холбоотой
// кодуудаар холбогдсон сурагчдыг л харна. Клиентээс code параметр АВАХГҮЙ —
// зөвхөн баталгаажсан bearer token-ы email-ээр teacherCodes-г шүүнэ, тул
// sandbox нь сервер дээр л тогтоогдоно.
// =============================================================================

export function registerTeacherRoute(app: Express) {
  app.get('/api/teacher/students', async (req: Request, res: Response) => {
    const admin = getFirebaseAdmin();
    if (!admin) return res.status(503).json({ error: firebaseAdminMissingMessage() });

    const codes = await loadCallerCodes(admin, req, res);
    if (!codes) return;

    const students: TeacherStudent[] = [];
    for (const code of codes) {
      const usersSnap = await admin.db.collection('users').where('promo.code', '==', code).get();
      for (const doc of usersSnap.docs) {
        students.push(buildTeacherStudent(doc.id, code, doc.data() as Record<string, unknown>));
      }
    }

    return res.json({ codes, students });
  });

  // Нэг сурагчийн дэлгэрэнгүй харагдац: caller-ийн кодуудаар л шүүнэ — өөр
  // багшийн сурагчийн uid дамжуулбал 404 (оршин байгааг ч мэдэгдэхгүй).
  app.get('/api/teacher/students/:uid', async (req: Request, res: Response) => {
    const admin = getFirebaseAdmin();
    if (!admin) return res.status(503).json({ error: firebaseAdminMissingMessage() });

    const codes = await loadCallerCodes(admin, req, res);
    if (!codes) return;

    const doc = await admin.db.collection('users').doc(req.params.uid).get();
    if (!doc.exists) return res.status(404).json({ error: 'not_found' });
    const data = doc.data() as Record<string, unknown>;
    const promo = data.promo as { code?: string } | undefined;
    if (!promo?.code || !codes.includes(promo.code)) return res.status(404).json({ error: 'not_found' });

    return res.json(buildTeacherStudentDetail(doc.id, promo.code, data));
  });
}
