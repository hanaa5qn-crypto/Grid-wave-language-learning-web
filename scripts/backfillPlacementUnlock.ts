// One-time backfill for the placementUnlock migration.
//
// The paid placement-result reveal used to be gated on the client-writable
// `placement.unlocked` profile field, which any signed-in user could set on
// their own doc. Entitlement now lives in the SERVER-owned `placementUnlock`
// field (written only by the payments backend; rejected from client writes by
// firestore.rules serverOwnedFields()). Users who genuinely paid before the
// migration only have the legacy flag, so copy it over once.
//
// Only migrates users whose unlock source was a real grant path
// ('byl' | 'qpay' | 'dummy' | 'subscription' | 'founder'); an unlocked flag
// with no/unknown source is reported but NOT migrated (it may be tampered).
//
// Usage:
//   npx tsx scripts/backfillPlacementUnlock.ts            # dry run — lists targets
//   npx tsx scripts/backfillPlacementUnlock.ts --apply    # write placementUnlock
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

import { getFirebaseAdmin, firebaseAdminMissingMessage } from '../backend/lib/firebaseAdmin';

const APPLY = process.argv.includes('--apply');
const KNOWN_SOURCES = new Set(['byl', 'qpay', 'dummy', 'subscription', 'founder']);

async function main() {
  const admin = getFirebaseAdmin();
  if (!admin) throw new Error(firebaseAdminMissingMessage());

  const snap = await admin.db.collection('users').where('placement.unlocked', '==', true).get();
  console.log(`${snap.size} user(s) carry the legacy placement.unlocked flag.`);

  let migrated = 0;
  let skippedAlready = 0;
  let skippedUnknown = 0;

  for (const doc of snap.docs) {
    const data = doc.data();
    if (data.placementUnlock?.unlocked === true) {
      skippedAlready += 1;
      continue;
    }
    const by = String(data.placement?.unlockedBy ?? '');
    if (!KNOWN_SOURCES.has(by)) {
      skippedUnknown += 1;
      console.log(`  SKIP (unknown source '${by || 'none'}'): ${doc.id} ${data.email ?? ''}`);
      continue;
    }
    console.log(`  ${APPLY ? 'MIGRATE' : 'would migrate'}: ${doc.id} ${data.email ?? ''} (by=${by})`);
    if (APPLY) {
      await doc.ref.set({
        placementUnlock: { unlocked: true, by, at: new Date().toISOString() },
      }, { merge: true });
    }
    migrated += 1;
  }

  console.log(`\n${APPLY ? 'Migrated' : 'Would migrate'}: ${migrated}, already done: ${skippedAlready}, held back (unknown source): ${skippedUnknown}`);
  if (!APPLY) console.log('Dry run only — re-run with --apply to write.');
}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
