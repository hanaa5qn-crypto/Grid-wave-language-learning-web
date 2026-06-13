// Pre-launch revenue reset. The admin dashboard derives Gross Revenue / MRR /
// ARPU live from Firestore: paid `payments` docs and users' billing amount
// fields. There were never any real paying customers (only dummy + test Byl
// activations), so this zeroes the revenue source data:
//
//   * every existing `payments` doc -> voided (isPaidPayment skips voided),
//   * every user's billing.monthlyAmountCents + lifetimeValueCents -> 0.
//
// Entitlement fields (status / plan / currentPeriodEnd / placementCredits) are
// left untouched, so anyone keeping access (co-founder) still has it — they
// just stop counting toward revenue. Real Byl payments after this point are
// not voided and count normally.
//
//   npx tsx scripts/resetRevenueMetrics.ts          # dry run
//   npx tsx scripts/resetRevenueMetrics.ts --apply  # write
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdmin } from '../backend/lib/firebaseAdmin';

const APPLY = process.argv.includes('--apply');

async function main() {
  const admin = getFirebaseAdmin();
  if (!admin) {
    console.error('Firebase Admin not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON (or the trio) in .env.');
    process.exit(1);
  }

  // 1. Void every payment doc that is not already voided.
  const payments = await admin.db.collection('payments').get();
  const livePayments = payments.docs.filter((d) => d.data().voided !== true);
  console.log(`payments: ${payments.size} total, ${livePayments.length} still counted as revenue.`);
  for (const d of livePayments) {
    const p = d.data();
    console.log(`  void  ${d.id} | ${p.customerEmail ?? '?'} | ${p.plan ?? '?'} | ${p.amountCents ?? 0}¢ | provider=${p.provider ?? '?'}`);
  }

  // 2. Zero the revenue amount fields on every user that has billing.
  const users = await admin.db.collection('users').get();
  const withRevenue = users.docs.filter((d) => {
    const b = (d.data().billing ?? {}) as Record<string, unknown>;
    return Number(b.monthlyAmountCents) > 0 || Number(b.lifetimeValueCents) > 0;
  });
  console.log(`\nusers: ${users.size} total, ${withRevenue.length} carrying nonzero revenue fields.`);
  for (const d of withRevenue) {
    const u = d.data();
    const b = (u.billing ?? {}) as Record<string, unknown>;
    console.log(`  zero  ${u.email ?? d.id} | status=${b.status ?? '-'} plan=${b.plan ?? '-'} | monthly=${b.monthlyAmountCents ?? 0}¢ lifetime=${b.lifetimeValueCents ?? 0}¢ (access kept)`);
  }

  if (!APPLY) {
    console.log('\nDry run. Re-run with --apply to void payments and zero revenue fields. Access fields untouched.');
    return;
  }

  for (const d of livePayments) {
    await d.ref.set({ voided: true, voidedReason: 'pre-launch-revenue-reset', voidedAt: FieldValue.serverTimestamp() }, { merge: true });
  }
  for (const d of withRevenue) {
    await d.ref.set({ billing: { monthlyAmountCents: 0, lifetimeValueCents: 0 } }, { merge: true });
  }

  console.log(`\nApplied: voided ${livePayments.length} payment(s), zeroed revenue on ${withRevenue.length} user(s). Gross Revenue / MRR / ARPU now read 0.`);
}

main().catch((err) => {
  console.error('RESET FAILED:', err?.message || err);
  process.exit(1);
});
