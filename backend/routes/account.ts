import type { Express, Request, Response } from 'express';
import {
  firebaseAdminMissingMessage,
  getFirebaseAdmin,
  verifyFirebaseBearer,
} from '../lib/firebaseAdmin';

// =============================================================================
// Дансны туслах API.
//   - ensure-trial: шинэ данс бүрт 3 өдрийн үнэгүй туршилт (нэг л удаа, idempotent).
//     billing нь server-owned тул клиент өөртөө олгож чадахгүй — энд Admin SDK-ээр
//     олгоно. Аль хэдийн billing-тэй (төлбөртэй/туршилт) бол юу ч хийхгүй.
//
// Туршилтын багц = Pro (бүх контент, гэхдээ хязгааргүй AI биш). И-мэйл
// баталгаажуулалт байхгүй тул олон данс үүсгэх эрсдэлээс сэргийлж Max биш Pro.
// =============================================================================

const SIGNUP_TRIAL_DAYS = 3;
const SIGNUP_TRIAL_PLAN = 'pro';
const ACTIVE_BILLING_STATUSES = ['active', 'paid', 'trialing'];

export function registerAccountRoute(app: Express) {
  app.post('/api/account/ensure-trial', async (req: Request, res: Response) => {
    const admin = getFirebaseAdmin();
    if (!admin) return res.status(503).json({ error: firebaseAdminMissingMessage() });

    const user = await verifyFirebaseBearer(req);
    if (!user) return res.status(401).json({ error: 'Дахин нэвтэрсний дараа үргэлжлүүлнэ үү.' });

    const userRef = admin.db.collection('users').doc(user.uid);
    try {
      const outcome = await admin.db.runTransaction(async (tx) => {
        const snap = await tx.get(userRef);
        const data = snap.exists ? (snap.data() as Record<string, unknown>) : {};
        const billing = (data.billing ?? {}) as { status?: string };
        // Аль хэдийн идэвхтэй billing-тэй бол давхар туршилт олгохгүй.
        if (ACTIVE_BILLING_STATUSES.includes((billing.status ?? '').toLowerCase())) {
          return { granted: false as const };
        }
        const trialEnd = new Date(Date.now() + SIGNUP_TRIAL_DAYS * 24 * 3600 * 1000).toISOString();
        const grantedBilling = {
          plan: SIGNUP_TRIAL_PLAN,
          status: 'trialing',
          interval: 'month',
          provider: 'signup',
          currentPeriodEnd: trialEnd,
        };
        tx.set(userRef, { billing: grantedBilling }, { merge: true });
        return { granted: true as const, trialEnd, billing: grantedBilling };
      });

      // Return the granted billing so the client can merge it into the live
      // profile immediately — the profile read is a one-shot getDoc, so without
      // this the trial wouldn't unlock anything until the next reload.
      return res.json({
        granted: outcome.granted,
        ...(outcome.granted
          ? { plan: SIGNUP_TRIAL_PLAN, trialDays: SIGNUP_TRIAL_DAYS, trialEnd: outcome.trialEnd, billing: outcome.billing }
          : {}),
      });
    } catch (err) {
      console.error('ensure-trial failed:', err);
      return res.status(502).json({ error: 'Туршилтын эрх олгож чадсангүй.' });
    }
  });
}
