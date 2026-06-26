// =============================================================================
// Neural Text-to-Speech client (frontend).
// -----------------------------------------------------------------------------
// The browser's window.speechSynthesis sounds robotic, which is most noticeable
// on the Listening sections. This client POSTs to /api/tts, which proxies to
// Azure's neural voices (human-sounding) and returns audio/mpeg. If that
// endpoint is not configured (503) or unreachable, it falls back to the local
// speechSynthesis so a learner is never left without audio.
//
// There is a single shared player: only one passage/word is ever audible at a
// time, and any screen can stopTts() to silence it (e.g. when the learner is
// done with a question or skips to the next one). A generation counter makes
// the async neural fetch race-safe — if playback is superseded or stopped while
// a request is in flight, the stale response is ignored.
// =============================================================================

export type TtsState = 'idle' | 'playing' | 'paused';

export interface PlayTtsOptions {
  /** BCP-47 tag passed to the server to pick a voice. Defaults to de-DE. */
  lang?: string;
  /** Specific Azure neural voice name (whitelisted server-side). Optional. */
  voice?: string;
  /** Playback rate, 1 = normal. Applied server-side via SSML for the neural
   *  path, and on the utterance for the local fallback. */
  rate?: number;
  /** Reflects idle/playing/paused back to a screen that renders player UI. */
  onState?: (state: TtsState) => void;
}

const hasSpeechSynthesis =
  typeof window !== 'undefined' && 'speechSynthesis' in window;

// Current playback handles — at most one of these is active at a time.
let audioEl: HTMLAudioElement | null = null;
let audioUrl: string | null = null;
let utter: SpeechSynthesisUtterance | null = null;

// Bumps on every play/stop. A neural fetch captures the value at start; if it
// no longer matches when the response arrives, playback was superseded.
let gen = 0;

// The screen that owns the current playback's state UI. When a new caller takes
// over (or playback stops), the previous owner is handed a final 'idle' so its
// play/pause button never gets stuck showing "playing".
let stateCb: ((s: TtsState) => void) | null = null;

// Once /api/tts answers 503 (key not configured) we stop hammering it and go
// straight to the local fallback for the rest of the session.
let neuralDisabled = false;

// Set when the user hits Pause while a neural clip is still being fetched (no
// <audio> element exists yet). The fetch continuation honors it so the freshly
// created element starts PAUSED instead of overriding the user's pause — and the
// local fallback honors it too. Cleared by any play/resume/stop.
let pausePending = false;

function emit(state: TtsState) {
  if (stateCb) stateCb(state);
}

// Detach handlers and release the current audio element / utterance without
// touching gen or stateCb (callers decide what to emit).
function teardown() {
  if (audioEl) {
    audioEl.onended = null;
    audioEl.onerror = null;
    audioEl.pause();
    audioEl.src = '';
    audioEl = null;
  }
  if (audioUrl) {
    URL.revokeObjectURL(audioUrl);
    audioUrl = null;
  }
  if (utter) {
    utter.onend = null;
    utter.onerror = null;
    utter = null;
  }
  if (hasSpeechSynthesis) window.speechSynthesis.cancel();
}

/** Stop any audio immediately and reset to idle. Safe to call any time. */
export function stopTts() {
  gen++;
  pausePending = false;
  teardown();
  emit('idle');
  stateCb = null;
}

function fallbackSpeak(text: string, lang: string, rate: number, myGen: number) {
  // Release any neural <audio> element / object URL first. The neural error
  // paths (el.onerror, play().catch) call us while audioEl is still the dead
  // element — without this, pause/resume would target that element instead of
  // the speechSynthesis we're about to start, and its blob URL would leak.
  teardown();
  if (!hasSpeechSynthesis) {
    if (myGen === gen) emit('idle');
    return;
  }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  u.onend = () => {
    if (myGen === gen) emit('idle');
  };
  u.onerror = () => {
    if (myGen === gen) emit('idle');
  };
  utter = u;
  emit('playing');
  window.speechSynthesis.speak(u);
  // The user paused while we were deciding to fall back — honor it.
  if (pausePending) {
    pausePending = false;
    window.speechSynthesis.pause();
    if (myGen === gen) emit('paused');
  }
}

/**
 * Speak `text` with a neural voice, falling back to speechSynthesis. Replaces
 * whatever was playing before. The optional onState callback receives
 * 'playing' immediately and 'idle' when playback ends or is stopped.
 */
export async function playTts(text: string, opts: PlayTtsOptions = {}): Promise<void> {
  const { lang = 'de-DE', voice, onState } = opts;
  // Clamp once so the neural (server SSML prosody) and local fallback paths
  // play at the same speed — the server bounds rate to [0.5, 1.5], so match it.
  const rawRate = typeof opts.rate === 'number' ? opts.rate : 1;
  const rate = Math.max(0.5, Math.min(1.5, rawRate));
  const trimmed = (text || '').trim();

  // Hand the previous owner a clean 'idle' so its UI doesn't get stuck.
  const nextCb = onState ?? null;
  if (stateCb && stateCb !== nextCb) stateCb('idle');

  gen++;
  const myGen = gen;
  pausePending = false; // a fresh play request supersedes any prior pause intent
  teardown();
  stateCb = nextCb;

  if (!trimmed) {
    emit('idle');
    return;
  }

  emit('playing');

  if (neuralDisabled) {
    fallbackSpeak(trimmed, lang, rate, myGen);
    return;
  }

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed, lang, voice, rate }),
    });

    if (myGen !== gen) return; // superseded or stopped while fetching

    if (res.status === 503) {
      neuralDisabled = true;
      fallbackSpeak(trimmed, lang, rate, myGen);
      return;
    }
    if (!res.ok) {
      fallbackSpeak(trimmed, lang, rate, myGen);
      return;
    }

    const blob = await res.blob();
    if (myGen !== gen) return;

    const url = URL.createObjectURL(blob);
    const el = new Audio(url);
    el.onended = () => {
      if (myGen === gen) {
        teardown();
        emit('idle');
      }
    };
    el.onerror = () => {
      if (myGen === gen) fallbackSpeak(trimmed, lang, rate, myGen);
    };
    audioEl = el;
    audioUrl = url;
    // If the user hit Pause while this was fetching, keep the freshly created
    // element paused instead of starting playback over their pause.
    if (pausePending) {
      pausePending = false;
      emit('paused');
      return;
    }
    emit('playing');
    // play() can reject (autoplay policy, decode error) — fall back to local TTS.
    await el.play().catch(() => {
      if (myGen === gen) fallbackSpeak(trimmed, lang, rate, myGen);
    });
  } catch {
    if (myGen === gen) fallbackSpeak(trimmed, lang, rate, myGen);
  }
}

/** Pause the current playback (neural audio element or local utterance). */
export function pauseTts() {
  if (audioEl) {
    audioEl.pause();
    emit('paused');
    return;
  }
  // No element yet — a neural fetch is still in flight (or we're mid-fallback).
  // Remember the intent so the in-flight clip starts paused, and pause any
  // local speech that may already be talking.
  pausePending = true;
  if (hasSpeechSynthesis) window.speechSynthesis.pause();
  emit('paused');
}

/** Resume playback after pauseTts(). */
export function resumeTts() {
  pausePending = false; // user wants sound again; let any in-flight clip play
  if (audioEl) {
    audioEl.play().catch(() => {});
    emit('playing');
    return;
  }
  if (hasSpeechSynthesis) {
    window.speechSynthesis.resume();
    emit('playing');
  }
}
