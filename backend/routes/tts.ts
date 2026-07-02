import type { Express, Request, Response } from 'express';
import crypto from 'crypto';
import { clientIp, ttsRateLimited } from '../lib/aiGuard';

// =============================================================================
// Neural Text-to-Speech proxy (Azure AI Speech).
// -----------------------------------------------------------------------------
// The browser's built-in window.speechSynthesis sounds robotic, which is most
// noticeable on the Listening sections. This endpoint proxies to Azure's neural
// voices (which sound human) so the key never reaches the client. The frontend
// POSTs { text, voice?, lang?, rate? } and gets back audio/mpeg; if the key is
// not configured it returns 503 and the client falls back to speechSynthesis.
//
// Provisioned with the Azure CLI:
//   az cognitiveservices account create --kind SpeechServices --sku F0 ...
// F0 is the free tier (0.5M characters/month) — synthesized audio is cached
// in-process below so repeated plays of the same passage don't burn quota.
// =============================================================================

// NOTE: read these lazily inside the handler, not at module top-level — server.ts
// runs dotenv.config() only after its imports resolve, so reading process.env
// here at import time would see undefined.

// Whitelisted neural voices. Anything not in this set falls back to the default,
// so a malicious `voice` value can never inject arbitrary SSML attributes.
const ALLOWED_VOICES = new Set([
  // English (US / GB / AU) — GB voices suit IELTS listening best.
  'en-US-AriaNeural', 'en-US-JennyNeural', 'en-US-GuyNeural',
  'en-GB-SoniaNeural', 'en-GB-RyanNeural', 'en-GB-LibbyNeural',
  'en-AU-NatashaNeural', 'en-AU-WilliamNeural',
  // German — for the German track's listening / TestDaF. The Multilingual
  // voices are the most natural (least robotic) and are the current default.
  'de-DE-SeraphinaMultilingualNeural', 'de-DE-FlorianMultilingualNeural',
  'de-DE-KatjaNeural', 'de-DE-ConradNeural', 'de-DE-AmalaNeural',
]);
const DEFAULT_VOICE = 'en-US-AriaNeural';

// Map a bare BCP-47 language tag to a sensible default voice.
const LANG_DEFAULT: Record<string, string> = {
  'en': 'en-US-AriaNeural',
  'en-US': 'en-US-AriaNeural',
  'en-GB': 'en-GB-SoniaNeural',
  'en-AU': 'en-AU-NatashaNeural',
  'de': 'de-DE-SeraphinaMultilingualNeural',
  'de-DE': 'de-DE-SeraphinaMultilingualNeural',
};

const MAX_CHARS = 5000; // Azure caps a single request ~10 min of audio.

// Tiny in-process LRU cache: key -> mp3 buffer. Keeps the F0 quota healthy and
// makes repeated plays instant. Bounded so memory can't grow unbounded.
const cache = new Map<string, Buffer>();
const MAX_CACHE_ENTRIES = 250;

function cacheGet(key: string): Buffer | undefined {
  const buf = cache.get(key);
  if (buf) { cache.delete(key); cache.set(key, buf); } // mark as recently used
  return buf;
}
function cacheSet(key: string, buf: Buffer) {
  cache.set(key, buf);
  if (cache.size > MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value as string | undefined;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Convert a numeric rate (0.5–1.5, 1 = normal) into an SSML prosody percentage.
function ratePercent(rate: unknown): string {
  const n = typeof rate === 'number' ? rate : Number(rate);
  if (!Number.isFinite(n) || n === 1) return '0%';
  const pct = Math.round((Math.max(0.5, Math.min(1.5, n)) - 1) * 100);
  return `${pct >= 0 ? '+' : ''}${pct}%`;
}

export function registerTtsRoute(app: Express) {
  app.post('/api/tts', async (req: Request, res: Response) => {
    const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
    const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';
    if (!AZURE_KEY) {
      // Not configured — tell the client to use its local fallback.
      return res.status(503).json({ error: 'tts_not_configured' });
    }

    const rawText = typeof req.body?.text === 'string' ? req.body.text : '';
    const text = rawText.slice(0, MAX_CHARS).trim();
    if (!text) return res.status(400).json({ error: 'missing_text' });

    const reqVoice = typeof req.body?.voice === 'string' ? req.body.voice : '';
    const lang = typeof req.body?.lang === 'string' ? req.body.lang : '';
    const voice = ALLOWED_VOICES.has(reqVoice)
      ? reqVoice
      : (LANG_DEFAULT[lang] ?? DEFAULT_VOICE);
    const locale = voice.split('-').slice(0, 2).join('-'); // e.g. en-US
    const rate = ratePercent(req.body?.rate);

    const cacheKey = crypto.createHash('sha1').update(`${voice}|${rate}|${text}`).digest('hex');
    const cached = cacheGet(cacheKey);
    if (cached) {
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('X-TTS-Cache', 'hit');
      return res.send(cached);
    }

    // Rate-limit CACHE MISSES only — every miss costs paid Azure characters,
    // so an unthrottled loop of unique texts could burn the whole Speech
    // quota. Guests may use TTS, so this stays unauthenticated but throttled;
    // replays of already-synthesized passages (hits above) stay unmetered.
    if (await ttsRateLimited(clientIp(req))) {
      res.setHeader('Retry-After', '60');
      return res.status(429).json({ error: 'too_many_requests' });
    }

    const ssml =
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${locale}">` +
      `<voice name="${voice}"><prosody rate="${rate}">${xmlEscape(text)}</prosody></voice>` +
      `</speak>`;

    try {
      const azureRes = await fetch(
        `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': AZURE_KEY,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
            'User-Agent': 'vivid-lingua',
          },
          body: ssml,
        },
      );

      if (!azureRes.ok) {
        const detail = await azureRes.text().catch(() => '');
        console.warn('Azure TTS error', azureRes.status, detail.slice(0, 300));
        return res.status(502).json({ error: 'tts_upstream_failed', status: azureRes.status });
      }

      const audio = Buffer.from(await azureRes.arrayBuffer());
      cacheSet(cacheKey, audio);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('X-TTS-Cache', 'miss');
      return res.send(audio);
    } catch (err) {
      console.warn('TTS request failed:', err);
      return res.status(502).json({ error: 'tts_request_failed' });
    }
  });
}
