// Shared protections for the AI endpoints so a public deploy can't run up the
// Gemini bill. Three layers, all tunable via env vars:
//   1. Per-IP sliding-window rate limit  -> HTTP 429 (abuse protection)
//   2. Text / audio size caps            -> clamp text, reject oversized audio
//   3. Global daily AI-call budget        -> past it, routes skip the AI call and
//      fall back to the local rule-based response (graceful degradation)
import type { Request } from 'express';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdmin } from './firebaseAdmin';

const num = (v: string | undefined, d: number) => {
  const n = v ? parseInt(v, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : d;
};

export const AI_LIMITS = {
  ratePerMin: num(process.env.AI_RATE_PER_MIN, 30),       // per-IP AI requests / minute
  ttsRatePerMin: num(process.env.TTS_RATE_PER_MIN, 60),   // per-IP TTS cache-misses / minute
  dailyBudget: num(process.env.AI_DAILY_BUDGET, 500),     // total AI calls / day, then fallback
  maxTextChars: num(process.env.AI_MAX_TEXT_CHARS, 4000), // per text field sent to the model
  maxAudioBytes: num(process.env.AI_MAX_AUDIO_BYTES, 6_000_000), // decoded audio size (~6MB)
};

export function clientIp(req: Request): string {
  // Use req.ip, which Express derives from X-Forwarded-For using the configured
  // `trust proxy` setting (server.ts sets it to 1), so it reflects the real
  // client as seen by the trusted edge proxy. We must NOT read raw X-Real-IP /
  // the first X-Forwarded-For entry: a client connecting directly can spoof those
  // and rotate a fresh "IP" per request, defeating the per-IP rate limit (which
  // is the primary abuse control on the AI endpoints).
  return (req.ip || req.socket?.remoteAddress || 'unknown').toString();
}

// --- per-IP fixed-window rate limit (shared across all AI endpoints) -------
// Two layers. The in-memory Map is a fast first check, but on serverless
// (Vercel) it resets on every cold start and counts per-instance, so it can
// be exceeded N×. The Firestore `rateLimits` collection is the authoritative
// cross-instance layer (same pattern as the checkout limiter in payments.ts).
// Firestore errors fail open — degrade to the in-memory layer rather than
// block users over a limiter hiccup.
const WINDOW_MS = 60_000;
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const hits = new Map<string, RateLimitRecord>();

function memoryLimited(key: string, max: number): boolean {
  const now = Date.now();
  const record = hits.get(key);

  if (!record || now > record.resetTime) {
    // Window expired or new IP connection
    hits.set(key, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });

    // Proactive cleanup of expired records if memory usage grows
    if (hits.size > 2000) {
      for (const [k, v] of hits.entries()) {
        if (now > v.resetTime) {
          hits.delete(k);
        }
      }
    }
    return false;
  }

  record.count++;
  return record.count > max;
}

function rateLimitDocId(kind: string, key: string): string {
  return `${kind}_${key}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 140);
}

async function firestoreWindowLimited(kind: string, key: string, max: number, windowMs: number): Promise<boolean> {
  const admin = getFirebaseAdmin();
  if (!admin) return false; // local dev without Admin creds → in-memory layer only
  const ref = admin.db.collection('rateLimits').doc(rateLimitDocId(kind, key));
  try {
    return await admin.db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const now = Date.now();
      const data = snap.data();
      if (!data || now > Number(data.resetTime ?? 0)) {
        tx.set(ref, { count: 1, resetTime: now + windowMs });
        return false;
      }
      const count = Number(data.count ?? 0) + 1;
      tx.set(ref, { count }, { merge: true });
      return count > max;
    });
  } catch (err) {
    console.warn('AI rate-limit check failed (fail-open to in-memory layer):', err);
    return false;
  }
}

export async function rateLimited(ip: string): Promise<boolean> {
  if (memoryLimited(`ai_${ip}`, AI_LIMITS.ratePerMin)) return true;
  return firestoreWindowLimited('ai', ip, AI_LIMITS.ratePerMin, WINDOW_MS);
}

// Separate window for the TTS proxy so heavy (legitimate) listening playback
// never starves the AI-grading limiter, and vice versa.
export async function ttsRateLimited(ip: string): Promise<boolean> {
  if (memoryLimited(`tts_${ip}`, AI_LIMITS.ttsRatePerMin)) return true;
  return firestoreWindowLimited('tts', ip, AI_LIMITS.ttsRatePerMin, WINDOW_MS);
}

// --- global daily AI-call budget (resets at UTC midnight) --------------------
// The count lives in Firestore so the cost backstop holds across serverless
// instances; the local counter is kept as a fast path / creds-less fallback.
let dayKey = '';
let dayCount = 0;
const today = () => new Date().toISOString().slice(0, 10);
function rollDay() {
  const d = today();
  if (dayKey !== d) { dayKey = d; dayCount = 0; }
}
export async function budgetExhausted(): Promise<boolean> {
  rollDay();
  if (dayCount >= AI_LIMITS.dailyBudget) return true;
  const admin = getFirebaseAdmin();
  if (!admin) return false;
  try {
    const snap = await admin.db.collection('rateLimits').doc(`aiBudget_${today()}`).get();
    return Number(snap.data()?.count ?? 0) >= AI_LIMITS.dailyBudget;
  } catch (err) {
    console.warn('AI budget check failed (fail-open):', err);
    return false;
  }
}
export async function consumeBudget(): Promise<void> {
  rollDay();
  dayCount++;
  const admin = getFirebaseAdmin();
  if (!admin) return;
  try {
    await admin.db.collection('rateLimits').doc(`aiBudget_${today()}`).set(
      { count: FieldValue.increment(1) },
      { merge: true },
    );
  } catch (err) {
    console.warn('AI budget increment failed:', err);
  }
}

// --- size guards ------------------------------------------------------------
export function clampText(s: string | undefined, max = AI_LIMITS.maxTextChars): string {
  if (!s) return '';
  return s.length > max ? s.slice(0, max) : s;
}
export function audioTooLarge(base64?: string): boolean {
  if (!base64) return false;
  const bytes = Math.floor((base64.length * 3) / 4); // base64 -> ~decoded bytes
  return bytes > AI_LIMITS.maxAudioBytes;
}

// Returns an AI client ONLY when within the daily budget; otherwise null so the
// caller degrades to its rule-based fallback. Does NOT consume budget — call
// consumeBudget() right before an actual model request.
import { getAIClient } from './ai';
export async function aiClientWithinBudget() {
  return (await budgetExhausted()) ? null : getAIClient();
}
