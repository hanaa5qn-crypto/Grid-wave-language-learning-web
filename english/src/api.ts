// =============================================================================
// English track — AI review API client.
// -----------------------------------------------------------------------------
// Thin client for the backend Gemini-powered review endpoints. ALL learner-
// facing text in the response (feedbackMessage, explanation, strengths,
// improvements) is returned in MONGOLIAN, because the audience is Mongolian
// learners — mirroring the German track's evaluate-writing/speaking feedback.
// =============================================================================

import { getAuthInstance, isFirebaseConfigured } from '../../frontend/src/firebase';

export type ExamKind = 'ielts' | 'sat';

// The review endpoints are gated server-side by checkAiAccess (verified Firebase
// user + metered quota), so every call must carry the signed-in user's ID token —
// mirrors the German track's aiAuthHeaders. Returns {} when signed out so the
// server replies 401 (AUTH_REQUIRED) rather than silently running paid AI.
async function authHeader(): Promise<Record<string, string>> {
  try {
    if (!isFirebaseConfigured) return {};
    const user = getAuthInstance().currentUser;
    if (!user) return {};
    return { Authorization: `Bearer ${await user.getIdToken()}` };
  } catch {
    return {};
  }
}

export interface WritingReviewRequest {
  exam: ExamKind;
  /** Human label of the task, e.g. "IELTS Academic Task 2" or "SAT Essay". */
  task: string;
  /** The question/prompt the learner was answering. */
  prompt: string;
  /** The learner's written answer (English). */
  answer: string;
}

export interface SpeakingReviewRequest {
  exam: ExamKind;
  /** e.g. "IELTS Speaking Part 2". */
  part: string;
  /** The question / cue card. */
  prompt: string;
  /** Base64-encoded audio of the learner speaking (no data: prefix). Primary input. */
  audio?: string;
  /** MIME type of `audio`, e.g. 'audio/webm'. */
  mimeType?: string;
  /** Typed fallback transcript when audio recording isn't available. */
  transcript?: string;
}

// Shared shape for both reviews. Numeric estimate is a band (IELTS, 0–9) or a
// short label; keep it optional so the UI degrades gracefully.
export interface AiReview {
  /** Short encouraging title in Mongolian, e.g. "Сайн байна!". */
  feedbackMessage: string;
  /** Estimated band/score, e.g. "6.5" (IELTS) — optional. */
  estimate?: string;
  /** Speaking only: what the AI heard, transcribed (English). */
  transcript?: string;
  /** Speaking only: pronunciation feedback heard from the audio — IN MONGOLIAN. */
  pronunciation?: string;
  /** Speaking only: fluency feedback — IN MONGOLIAN. */
  fluency?: string;
  /** Improved/model version of the learner's answer (English). */
  improved: string;
  /** Detailed explanation of strengths & errors — IN MONGOLIAN. */
  explanation: string;
  /** Bullet strengths — IN MONGOLIAN. */
  strengths: string[];
  /** Bullet improvements — IN MONGOLIAN. */
  improvements: string[];
  /** True when the backend used a local fallback (no AI configured). */
  fallback?: boolean;
}

async function postReview(path: string, body: unknown): Promise<AiReview> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // 503 → AI not configured; surface a Mongolian message the UI can show.
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail?.error || 'AI үнэлгээ одоогоор боломжгүй байна.');
  }
  return res.json();
}

export function reviewWriting(req: WritingReviewRequest): Promise<AiReview> {
  return postReview('/api/english/review-writing', req);
}

export function reviewSpeaking(req: SpeakingReviewRequest): Promise<AiReview> {
  return postReview('/api/english/review-speaking', req);
}
