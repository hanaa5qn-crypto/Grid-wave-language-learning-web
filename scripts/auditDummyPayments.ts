// Audit (and optionally revoke) subscriptions that were activated through the
// dummy payment provider. The dummy endpoints granted real entitlements with
// no real payment and were briefly reachable in production, so any account
// whose access traces back to a dummy activation never actually paid.
//
//   npx tsx scripts/auditDummyPayments.ts          # dry run: report only
//   npx tsx scripts/auditDummyPayments.ts --apply  # revoke bogus access
//
// Keep-list accounts (co-founder + founder) are never touched. A user is only
// revoked when their CURRENT billing.provider is still 'dummy' — if they later
// paid for real via Byl, billing.provider is 'byl' and they are left alone.
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdmin } from '../backend/lib/firebaseAdmin';
import { isFounderEmail } from '../backend/lib/plans';

// Co-founder: keep full access regardless of how it was granted.
const KEEP_EMAILS = new Set(['yubndaayubnda@gmail.com']);

function keep(email: string | undefined | null): boolean {
  const e = (email ?? '').trim().toLowerCase();
  if (!e) return false;
  return KEEP_EMAILS.has(e) || isFounderEmail(e);
}

const APPLY = process.argv.includes('--apply');

async function main() {
  const admin = getFirebaseAdmin();
  if (!admin) {
    console.error('Firebase Admin not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON (or the trio) in .env.');
    process.exit(1);
  }

  // 1. Every payment doc the dummy provider ever wrote.
  const dummyPayments = await admin.db.collection('payments').where('provider', '==', 'dummy').get();
  console.log(`\nFound ${dummyPayments.size} dummy payment record(s).\n`);

  // Group by user so a user with several dummy activations is reviewed once.
  const byUser = new Map<string, { emails: Set<string>; count: number; plans: Set<string> }>();
  for (const doc of dummyPayments.docs) {
    const d = doc.data();
    const uid = String(d.userId ?? '');
    if (!uid) continue;
    const entry = byUser.get(uid) ?? { emails: new Set(), count: 0, plans: new Set() };
    if (d.customerEmail) entry.emails.add(String(d.customerEmail));
    entry.plans.add(String(d.plan ?? '?'));
    entry.count++;
    byUser.set(uid, entry);
  }

  const toRevoke: Array<{ uid: string; email: string; status: string; provider: string; credits: number }> = [];
  const kept: string[] = [];
  const alreadyPaid: string[] = [];

  // 2. Cross-check each affected user's live entitlement state.
  for (const [uid, info] of byUser) {
    const snap = await admin.db.collection('users').doc(uid).get();
    const u = snap.data() ?? {};
    const billing = (u.billing ?? {}) as Record<string, unknown>;
    const email = String(u.email ?? [...info.emails][0] ?? '');
    const provider = String(billing.provider ?? '');
    const status = String(billing.status ?? 'none');
    const credits = Number(u.placementCredits) || 0;

    const tag = `${email || '(no email)'} | uid=${uid} | billing.status=${status} provider=${provider || '-'} credits=${credits} | dummyActivations=${info.count}`;

    if (keep(email)) {
      kept.push(tag);
      continue;
    }
    if (provider && provider !== 'dummy') {
      // Later paid for real (e.g. Byl) — entitlement no longer traces to dummy.
      alreadyPaid.push(tag);
      continue;
    }
    toRevoke.push({ uid, email, status, provider, credits });
    console.log('REVOKE  ', tag);
  }

  console.log(`\n— kept (co-founder/founder): ${kept.length}`);
  kept.forEach((t) => console.log('  KEEP   ', t));
  console.log(`— paid for real later, untouched: ${alreadyPaid.length}`);
  alreadyPaid.forEach((t) => console.log('  PAID   ', t));
  console.log(`\nUsers to revoke: ${toRevoke.length}`);

  if (!APPLY) {
    console.log('\nDry run. Re-run with --apply to revoke the above and void the dummy payment records.');
    return;
  }

  // 3. Revoke: drop entitlement to free, zero non-purchased credits, and stamp
  //    the dummy payment docs as voided for an audit trail.
  const pastIso = new Date(Date.now() - 1000).toISOString();
  let revoked = 0;
  for (const r of toRevoke) {
    await admin.db.collection('users').doc(r.uid).set({
      placementCredits: 0,
      billing: { status: 'inactive', plan: 'free', currentPeriodEnd: pastIso },
    }, { merge: true });
    revoked++;
  }

  let voided = 0;
  for (const doc of dummyPayments.docs) {
    const email = String(doc.data().customerEmail ?? '');
    if (keep(email)) continue;
    await doc.ref.set({ voided: true, voidedReason: 'dummy-cleanup', voidedAt: FieldValue.serverTimestamp() }, { merge: true });
    voided++;
  }

  console.log(`\nApplied: revoked ${revoked} user(s), voided ${voided} dummy payment record(s).`);
}

main().catch((err) => {
  console.error('AUDIT FAILED:', err?.message || err);
  process.exit(1);
});
