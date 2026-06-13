// Deploy firestore.rules without the firebase CLI. Mints an access token from
// the Admin service account already in .env and calls the Firebase Rules REST
// API: create a ruleset from the local file, then point the cloud.firestore
// release at it. Equivalent to `firebase deploy --only firestore:rules`.
//
//   npx tsx scripts/deployFirestoreRules.ts
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env') });

import { GoogleAuth } from 'google-auth-library';

async function main() {
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!saJson) throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON missing in .env');
  const credentials = JSON.parse(saJson);
  const projectId = process.env.FIREBASE_PROJECT_ID || credentials.project_id;
  if (!projectId) throw new Error('No project id (FIREBASE_PROJECT_ID or service account project_id).');

  const content = fs.readFileSync(path.join(process.cwd(), 'firestore.rules'), 'utf8');

  const auth = new GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  const token = await auth.getAccessToken();
  if (!token) throw new Error('Could not obtain access token from service account.');

  const api = `https://firebaserules.googleapis.com/v1/projects/${projectId}`;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  console.log(`Deploying firestore.rules to project ${projectId} (${content.length} bytes)…`);

  // 1. Create a ruleset from the local file.
  const rsRes = await fetch(`${api}/rulesets`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ source: { files: [{ name: 'firestore.rules', content }] } }),
  });
  const rsBody = await rsRes.json();
  if (!rsRes.ok) throw new Error(`ruleset create failed (${rsRes.status}): ${JSON.stringify(rsBody)}`);
  const rulesetName: string = rsBody.name;
  console.log(`created ruleset: ${rulesetName}`);

  // 2. Point the cloud.firestore release at the new ruleset.
  const releaseName = `projects/${projectId}/releases/cloud.firestore`;
  const relRes = await fetch(`${api}/releases/cloud.firestore`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ release: { name: releaseName, rulesetName }, updateMask: 'rulesetName' }),
  });
  const relBody = await relRes.json();
  if (!relRes.ok) throw new Error(`release update failed (${relRes.status}): ${JSON.stringify(relBody)}`);

  console.log(`released ${releaseName} -> ${relBody.rulesetName ?? rulesetName}`);
  console.log('Done. Firestore rules are live.');
}

main().catch((err) => {
  console.error('RULES DEPLOY FAILED:', err?.message || err);
  process.exit(1);
});
