// Lazy Firebase initialization.
//
// Nothing here runs until getAuthInstance()/getDb() is first called. That keeps
// Firebase out of the way during unit tests (which import App but never log in)
// and means the app boots fine even before you've pasted your config.
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { firebaseConfig, isFirebaseConfigured } from './firebaseConfig';

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

function ensureInitialized() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    // audit fix #3: durable IndexedDB cache — a failed login-time read falls
    // back to cached data instead of a blank profile, and queued writes survive
    // tab closes. The multi-tab manager lets several open tabs share one cache.
    // Capacitor's webviews (WKWebView / Android System WebView) both ship
    // IndexedDB, so this works in the mobile wrappers too; if a browser can't
    // support it (e.g. some private modes), fall back to the default memory
    // cache instead of crashing.
    try {
      dbInstance = initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      });
    } catch (err) {
      console.warn('Firestore persistent cache unavailable; using memory cache:', err);
      dbInstance = getFirestore(app);
    }
    storageInstance = getStorage(app);
  }
}

export function getAuthInstance(): Auth {
  ensureInitialized();
  return authInstance!;
}

export function getDb(): Firestore {
  ensureInitialized();
  return dbInstance!;
}

export function getStorageInstance(): FirebaseStorage {
  ensureInitialized();
  return storageInstance!;
}

export { isFirebaseConfigured };
