import type { Request } from 'express';
import { applicationDefault, cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function normalizePrivateKey(value: string): string {
  return value.replace(/\\n/g, '\n');
}

function serviceAccountFromEnv() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    const parsed = JSON.parse(json);
    if (typeof parsed.private_key === 'string') {
      parsed.private_key = normalizePrivateKey(parsed.private_key);
    }
    return cert(parsed);
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    return cert({
      projectId,
      clientEmail,
      privateKey: normalizePrivateKey(privateKey),
    });
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return applicationDefault();
  }

  return null;
}

function getAdminApp(): App | null {
  const existing = getApps()[0];
  if (existing) return existing;

  const credential = serviceAccountFromEnv();
  if (!credential) return null;

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  return initializeApp(projectId ? { credential, projectId } : { credential });
}

export function getFirebaseAdmin() {
  const app = getAdminApp();
  if (!app) return null;

  return {
    auth: getAuth(app),
    db: getFirestore(app),
  };
}

export function firebaseAdminMissingMessage(): string {
  return 'Server Firebase Admin credentials are not configured. Add FIREBASE_SERVICE_ACCOUNT_JSON, or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY.';
}

export async function verifyFirebaseBearer(req: Request): Promise<DecodedIdToken | null> {
  const header = req.header('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const admin = getFirebaseAdmin();
  if (!admin) return null;

  return admin.auth.verifyIdToken(match[1]);
}
