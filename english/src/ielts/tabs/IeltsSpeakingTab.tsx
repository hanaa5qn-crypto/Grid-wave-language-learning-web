// =============================================================================
// IELTS — Speaking practice tab.
// -----------------------------------------------------------------------------
// Sorted like Reading/Listening: the learner opens a TEST CARD, which steps them
// through Part 1 (interview) → Part 2 (cue card) → Part 3 (discussion) in exam
// order via a "next part" button. Within each part the learner RECORDS their
// actual voice (MediaRecorder), and the recording itself is sent to the AI, which
// LISTENS and grades the real voice — pronunciation, fluency and intonation
// included — then returns Mongolian feedback via the shared card. (Older browsers
// with no MediaRecorder fall back to typing a transcript.) A "Hear a model
// answer" button uses the British neural voice. The test bank lives in
// ./ieltsSpeakingGenerated.ts.
// =============================================================================
import React, { useRef, useState } from 'react';
import {
  Mic, Square, Volume2, Sparkles, Loader2, AlertCircle, MessageSquare,
  ChevronLeft, ArrowRight, ArrowLeft, Check,
} from 'lucide-react';
import { reviewSpeaking, AiReview } from '../../api';
import { speak, stopSpeaking } from '../../audio';
import { AiReviewCard } from './AiReviewCard';
import { ProLockedTab, PartProgress } from './quizKit';
import { useEnglishStats } from '../../stats';
import { IELTS_SPEAKING_TESTS } from './ieltsSpeakingGenerated';
import { useTheme } from '../../../../frontend/src/lib/theme';

const IELTS_VOICE = 'en-GB-SoniaNeural';

export interface SpeakingPrompt {
  id: string;
  part: 1 | 2 | 3;
  label: string;
  title: string;
  /** Interview questions, or the cue card bullets for Part 2. */
  questions: string[];
  modelAnswer: string;
}

/** One full speaking test: Part 1 → Part 2 → Part 3, worked through in order. */
export interface SpeakingTest {
  id: string;
  title: string;
  parts: SpeakingPrompt[];
}

const TESTS: SpeakingTest[] = IELTS_SPEAKING_TESTS;

function recorderSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== 'undefined'
  );
}

/** FileReader → base64 without the `data:...;base64,` prefix. */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

export default function IeltsSpeakingTab({
  allContent,
  onUpgrade,
}: {
  allContent: boolean;
  onUpgrade: () => void;
}) {
  const { recordStudy } = useEnglishStats();
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  // Two-level navigation: a null active test shows the test-card grid; otherwise
  // we're inside a test, stepping through its parts via partIndex.
  const [activeTest, setActiveTest] = useState<SpeakingTest | null>(null);
  const [partIndex, setPartIndex] = useState(0);

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<AiReview | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Fallback only: typed transcript when the browser can't record audio.
  const [typedTranscript, setTypedTranscript] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prompt = activeTest ? activeTest.parts[partIndex] : null;
  const canRecord = recorderSupported();

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function resetRecording() {
    clearTimer();
    try { mediaRecorderRef.current?.stop(); } catch { /* already stopped */ }
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    blobRef.current = null;
    setRecording(false);
    setSeconds(0);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  }

  // Shared cleanup whenever the active part changes (new part, new test, or back
  // to the grid): kill any recording/playback and clear the per-part answer.
  function resetForNewPart() {
    resetRecording();
    stopSpeaking();
    setReview(null);
    setError(null);
    setTypedTranscript('');
    setSpeaking(false);
  }

  function openTest(test: SpeakingTest) {
    resetForNewPart();
    setActiveTest(test);
    setPartIndex(0);
  }

  function goToPart(i: number) {
    if (!activeTest || i < 0 || i >= activeTest.parts.length) return;
    resetForNewPart();
    setPartIndex(i);
  }

  function backToTests() {
    resetForNewPart();
    setActiveTest(null);
    setPartIndex(0);
  }

  async function startRecording() {
    setError(null);
    setReview(null);
    if (audioUrl) { URL.revokeObjectURL(audioUrl); setAudioUrl(null); }
    blobRef.current = null;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      // Pick a mime the browser supports (Chrome: webm, Safari: mp4).
      const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const mime = candidates.find((t) => MediaRecorder.isTypeSupported?.(t)) || '';
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (blob.size > 0) {
          blobRef.current = blob;
          setAudioUrl(URL.createObjectURL(blob));
        }
      };

      recorder.start();
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (e) {
      console.error('Microphone access failed:', e);
      setError('Микрофон руу хандах боломжгүй байна. Зөвшөөрлөө шалгаарай.');
      setRecording(false);
    }
  }

  function stopRecording() {
    clearTimer();
    try { mediaRecorderRef.current?.stop(); } catch { /* already stopped */ }
    setRecording(false);
  }

  function hearModel() {
    if (!prompt) return;
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    void speak(prompt.modelAnswer, { voice: IELTS_VOICE, rate: 0.95 }).finally(() =>
      setSpeaking(false),
    );
  }

  async function getFeedback() {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setReview(null);
    try {
      const blob = blobRef.current;
      const base = {
        exam: 'ielts' as const,
        part: `IELTS Speaking ${prompt.label}`,
        prompt: prompt.questions.join('\n'),
      };
      const res = blob
        ? await reviewSpeaking({
            ...base,
            audio: await blobToBase64(blob),
            mimeType: (blob.type || 'audio/webm').split(';')[0],
          })
        : await reviewSpeaking({ ...base, transcript: typedTranscript.trim() });
      setReview(res);
      recordStudy();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'AI үнэлгээ авахад алдаа гарлаа. Дахин оролдоно уу.',
      );
    } finally {
      setLoading(false);
    }
  }

  const hasAudio = !!audioUrl;
  const canSubmit = hasAudio || (!canRecord && typedTranscript.trim() !== '');

  // Speaking is AI-graded — Pro/Max only. Free accounts see the upsell instead.
  if (!allContent) {
    return (
      <ProLockedTab
        icon={Mic}
        title="Speaking practice"
        blurb="Бүх Speaking тест (Part 1–3), дуу хоолойн бичлэг болон AI-ийн дуудлага, чөлөөт ярианы Монгол үнэлгээ Pro болон Max багцад нээгдэнэ."
        onUpgrade={onUpgrade}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // Test picker — a grid of cards, mirroring the Reading/Listening tabs.
  // ---------------------------------------------------------------------------
  if (!activeTest) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className={gold || aurora ? "text-2xl font-space font-light tracking-tight text-on-surface flex items-center gap-2" : "text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2"}>
            <Mic className={gold || aurora ? "w-6 h-6 text-on-surface" : "w-6 h-6 text-paper"} /> Speaking practice
          </h2>
          <p className={gold || aurora ? "text-on-surface-variant mt-1" : "text-paper-2 mt-1"}>
            Тест сонгоод Part 1 → 2 → 3-ыг дараалан ярина. AI таны дуу хоолойг сонсож, дуудлага,
            чөлөөт яриаг Монгол хэлээр үнэлнэ.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {TESTS.map((test, i) => (
            <button
              key={test.id}
              onClick={() => openTest(test)}
              className={gold || aurora ? "text-left rounded-2xl bg-surface-container hover:bg-surface-container-high p-5 transition-colors" : "text-left rounded-2xl bg-ink-raise hover:bg-ink-2 p-5 transition-colors"}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={gold || aurora ? "rounded-full bg-surface-container-high text-on-surface px-2.5 py-0.5 text-xs font-bold" : "rounded-full bg-ink-2 text-paper px-2.5 py-0.5 text-xs font-bold"}>
                  Тест {i + 1}
                </span>
                <span className={gold || aurora ? "text-xs text-on-surface-variant" : "text-xs text-paper-2"}>{test.parts.length} хэсэг</span>
              </div>
              <h3 className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>{test.title}</h3>
              <ul className={gold || aurora ? "mt-2 space-y-1 text-sm text-on-surface-variant" : "mt-2 space-y-1 text-sm text-paper-2"}>
                {test.parts.map((part) => (
                  <li key={part.id}>
                    <span className={gold || aurora ? "font-semibold text-on-surface" : "font-semibold text-paper"}>{part.label}:</span> {part.title}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Test runner — one part at a time, advancing Part 1 → 2 → 3.
  // ---------------------------------------------------------------------------
  const parts = activeTest.parts;
  const isLast = partIndex >= parts.length - 1;
  const nextPart = isLast ? null : parts[partIndex + 1];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <button
        onClick={backToTests}
        className={gold || aurora ? "inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant hover:text-on-surface" : "inline-flex items-center gap-1.5 text-sm font-semibold text-paper-2 hover:text-paper"}
      >
        <ChevronLeft className="w-4 h-4" /> Бүх тест рүү буцах
      </button>

      <div className="space-y-3">
        <h2 className={gold || aurora ? "text-2xl font-space font-light tracking-tight text-on-surface flex items-center gap-2" : "text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2"}>
          <Mic className={gold || aurora ? "w-6 h-6 text-on-surface" : "w-6 h-6 text-paper"} /> {activeTest.title}
        </h2>
        <PartProgress
          steps={parts.map((part) => part.label)}
          current={partIndex}
          onJump={goToPart}
        />
      </div>

      <div className={gold || aurora ? "rounded-2xl bg-surface-container p-5 space-y-3" : "rounded-2xl bg-ink-raise p-5 space-y-3"}>
        <div className="flex items-center gap-2">
          <span className={gold || aurora ? "rounded-full bg-surface-container-high text-on-surface px-2.5 py-0.5 text-xs font-bold" : "rounded-full bg-ink-2 text-paper px-2.5 py-0.5 text-xs font-bold"}>
            {prompt!.label}
          </span>
          <span className={gold || aurora ? "text-sm font-bold text-on-surface" : "text-sm font-bold text-paper"}>{prompt!.title}</span>
        </div>
        <ul className={gold || aurora ? "space-y-1.5 text-on-surface leading-relaxed" : "space-y-1.5 text-paper leading-relaxed"}>
          {prompt!.questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
        <button
          onClick={hearModel}
          className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-surface-container-high text-on-surface px-5 py-2.5 font-semibold hover:bg-surface-container-high" : "inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"}
        >
          {speaking ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {speaking ? 'Зогсоох' : 'Hear a model answer'}
        </button>
      </div>

      {/* --- Recorder ---------------------------------------------------------- */}
      {canRecord ? (
        <div className={gold || aurora ? "rounded-2xl bg-surface-container p-5 space-y-4" : "rounded-2xl bg-ink-raise p-5 space-y-4"}>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={recording ? stopRecording : startRecording}
              className={gold || aurora ? [
                'inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-colors',
                recording
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-high',
              ].join(' ') : [
                'inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-colors',
                recording
                  ? 'bg-paper text-ink'
                  : 'bg-ink-2 text-paper hover:bg-ink-raise',
              ].join(' ')}
            >
              {recording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {recording ? 'Бичлэг зогсоох' : hasAudio ? 'Дахин бичих' : 'Дуу хоолой бичих'}
            </button>
            {recording && (
              <span className={gold || aurora ? "inline-flex items-center gap-2 text-on-surface" : "inline-flex items-center gap-2 text-paper"}>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                {formatTime(seconds)}
              </span>
            )}
          </div>

          {hasAudio && !recording && (
            <div className="space-y-1">
              <span className={gold || aurora ? "text-xs text-on-surface-variant" : "text-xs text-paper-2"}>Таны бичлэг — сонсож шалгаарай:</span>
              <audio src={audioUrl!} controls className="w-full" />
            </div>
          )}

          <p className={gold || aurora ? "text-xs text-on-surface-variant" : "text-xs text-paper-2"}>
            Зөвлөмж: тайван орчинд, бүрэн өгүүлбэрээр 1–2 минут ярина уу.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <label className={gold || aurora ? "flex items-center gap-2 text-sm font-bold text-on-surface" : "flex items-center gap-2 text-sm font-bold text-paper"}>
            <MessageSquare className={gold || aurora ? "w-4 h-4 text-on-surface" : "w-4 h-4 text-paper"} /> Энэ хөтөч дуу бичлэг дэмждэггүй — бичвэрээ оруулна уу
          </label>
          <textarea
            value={typedTranscript}
            onChange={(e) => setTypedTranscript(e.target.value)}
            rows={8}
            placeholder="Хэлэх байсан зүйлээ энд бичнэ үү…"
            className={gold || aurora ? "w-full rounded-2xl bg-surface-container border border-on-background p-4 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary leading-relaxed resize-y" : "w-full rounded-2xl bg-ink-raise border border-ink-line p-4 text-paper placeholder:text-paper-2 focus:outline-none focus:border-paper leading-relaxed resize-y"}
          />
        </div>
      )}

      <button
        onClick={getFeedback}
        disabled={loading || !canSubmit}
        className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-6 py-3 font-bold disabled:opacity-40" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 font-bold disabled:opacity-40"}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? 'Дуу хоолойг сонсож байна…' : 'Get AI feedback / AI үнэлгээ авах'}
      </button>

      {error && (
        <div className={gold || aurora ? "rounded-2xl bg-surface-container-high text-on-surface-variant p-4 flex items-start gap-2" : "rounded-2xl bg-ink-2 text-paper-2 p-4 flex items-start gap-2"}>
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {review && <AiReviewCard review={review} />}

      {/* --- Part navigation --------------------------------------------------- */}
      <div className={gold || aurora ? "flex flex-wrap items-center justify-between gap-3 border-t border-on-background pt-5" : "flex flex-wrap items-center justify-between gap-3 border-t border-ink-line pt-5"}>
        {partIndex > 0 ? (
          <button
            onClick={() => goToPart(partIndex - 1)}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-surface-container-high text-on-surface px-5 py-2.5 font-semibold hover:bg-surface-container-high" : "inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"}
          >
            <ArrowLeft className="w-4 h-4" /> Өмнөх хэсэг
          </button>
        ) : (
          <span />
        )}
        {nextPart ? (
          <button
            onClick={() => goToPart(partIndex + 1)}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-6 py-3 font-bold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 font-bold"}
          >
            Дараагийн хэсэг — {nextPart.label} <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={backToTests}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-6 py-3 font-bold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 font-bold"}
          >
            <Check className="w-4 h-4" /> Тест дуусгах
          </button>
        )}
      </div>
    </div>
  );
}
