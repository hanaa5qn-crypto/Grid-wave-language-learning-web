// =============================================================================
// Shared audio playback for the English track.
// -----------------------------------------------------------------------------
// Prefers the backend Azure neural-TTS proxy (/api/tts) — human-sounding voices
// instead of the robotic built-in synthesizer. If the proxy is unavailable
// (key not configured, offline, etc.) it transparently falls back to the
// browser's window.speechSynthesis so audio never silently breaks.
// =============================================================================

export interface SpeakOptions {
  /** Specific Azure neural voice, e.g. 'en-GB-SoniaNeural'. */
  voice?: string;
  /** BCP-47 language hint used to pick a default voice, e.g. 'en-GB'. */
  lang?: string;
  /** Playback rate, 1 = normal (0.5–1.5). */
  rate?: number;
}

let currentAudio: HTMLAudioElement | null = null;
let currentUrl: string | null = null;
// Once the proxy answers 503 (not configured) we stop hitting it for the session.
let proxyDisabled = false;

/** Stop any in-flight Azure audio and cancel any browser speech. */
export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (currentUrl) {
    URL.revokeObjectURL(currentUrl);
    currentUrl = null;
  }
  try { window.speechSynthesis?.cancel(); } catch { /* unsupported */ }
}

function fallbackSpeak(text: string, opts: SpeakOptions) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts.lang || (opts.voice ? opts.voice.split('-').slice(0, 2).join('-') : 'en-US');
    u.rate = opts.rate ?? 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch { /* TTS unsupported — silent */ }
}

/**
 * Speak `text` with a human neural voice when possible.
 * Always cancels whatever was playing first.
 */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  stopSpeaking();
  const clean = text?.trim();
  if (!clean) return;

  if (!proxyDisabled) {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: clean, voice: opts.voice, lang: opts.lang, rate: opts.rate }),
      });
      if (res.status === 503) {
        proxyDisabled = true; // not configured on this deployment
      } else if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        currentAudio = audio;
        currentUrl = url;
        audio.onended = () => {
          if (currentUrl === url) { URL.revokeObjectURL(url); currentUrl = null; }
          if (currentAudio === audio) currentAudio = null;
        };
        await audio.play();
        return;
      }
      // Any other status → fall through to the browser synth.
    } catch {
      // Network/playback error → fall through to the browser synth.
    }
  }

  fallbackSpeak(clean, opts);
}
