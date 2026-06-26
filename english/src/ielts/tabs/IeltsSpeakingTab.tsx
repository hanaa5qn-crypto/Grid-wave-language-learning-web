// =============================================================================
// IELTS — Speaking practice tab.
// -----------------------------------------------------------------------------
// Speaking Parts 1–3 (interview, cue card, discussion). The learner RECORDS
// their actual voice (MediaRecorder), and the recording itself is sent to the
// AI, which LISTENS and grades the real voice — pronunciation, fluency and
// intonation included — then returns Mongolian feedback via the shared card.
// (Older browsers with no MediaRecorder fall back to typing a transcript.)
// A "Hear a model answer" button uses the British neural voice.
// =============================================================================
import React, { useMemo, useRef, useState } from 'react';
import {
  Mic, Square, Volume2, Sparkles, Loader2, AlertCircle, MessageSquare,
} from 'lucide-react';
import { reviewSpeaking, AiReview } from '../../api';
import { speak, stopSpeaking } from '../../audio';
import { AiReviewCard } from './AiReviewCard';
import { ProLockedTab } from './quizKit';
import { useEnglishStats } from '../../stats';

const IELTS_VOICE = 'en-GB-SoniaNeural';

interface SpeakingPrompt {
  id: string;
  part: 1 | 2 | 3;
  label: string;
  title: string;
  /** Interview questions, or the cue card bullets for Part 2. */
  questions: string[];
  modelAnswer: string;
}

const BASE_PROMPTS: SpeakingPrompt[] = [
  {
    id: 'p1',
    part: 1,
    label: 'Part 1',
    title: 'Hometown & daily life',
    questions: [
      'Where is your hometown, and what is it like?',
      'Do you prefer living in a city or in the countryside? Why?',
      'How do you usually spend your weekends?',
      'Has your daily routine changed much in recent years?',
    ],
    modelAnswer:
      'I am originally from Ulaanbaatar, the capital of Mongolia. It is a busy, fast-growing city, so there is always something happening, though it can get quite crowded. Personally, I prefer city life because everything I need — work, friends, cafés — is close by, and I enjoy the energy of it. At weekends, I usually catch up with friends or go hiking in the hills just outside the city to get some fresh air. My routine has actually changed a fair bit lately, since I now study English in the evenings, which keeps me much busier than before.',
  },
  {
    id: 'p2',
    part: 2,
    label: 'Part 2 (cue card)',
    title: 'Describe a skill you would like to learn',
    questions: [
      'Describe a skill you would like to learn. You should say:',
      '• what the skill is',
      '• why you want to learn it',
      '• how you would learn it',
      '• and explain how this skill would change your life.',
    ],
    modelAnswer:
      'The skill I would most like to learn is how to play the piano. I have always been drawn to music, but I never had the chance to take lessons as a child, so it feels like something I missed out on. I want to learn it mainly because I find playing an instrument incredibly relaxing, and I think it would be a wonderful way to unwind after a stressful day at work. To learn it, I would probably start with online tutorials to grasp the basics, and then, once I could afford it, hire a private teacher to correct my technique and keep me motivated. I believe this skill would change my life in a small but meaningful way: it would give me a creative outlet that has nothing to do with my job, and I imagine that being able to play for my family and friends would bring me a great deal of joy.',
  },
  {
    id: 'p3',
    part: 3,
    label: 'Part 3',
    title: 'Learning & technology — discussion',
    questions: [
      'Do you think people learn new skills more easily today than in the past? Why?',
      'What are the advantages and disadvantages of learning online?',
      'Should governments do more to help adults learn new skills?',
      'How might the way we learn change in the future?',
    ],
    modelAnswer:
      'On the whole, I would say people can learn new skills far more easily nowadays, largely because of the internet. In the past, you often needed access to a specific teacher or institution, whereas today an enormous amount of high-quality material is available for free online. That said, learning online does have its drawbacks — it requires a great deal of self-discipline, and some people miss the structure and feedback that a real classroom provides. As for governments, I firmly believe they should do more, perhaps by funding free retraining programmes, because economies change so quickly that adults frequently need to update their skills to stay employable. Looking ahead, I suspect learning will become increasingly personalised, with artificial intelligence tailoring lessons to each individual’s pace and weaknesses, which could make the whole process much more efficient.',
  },
  // --- Practice Test 1 — Speaking (imported) -----------------------------
  {
    id: 'p4',
    part: 1,
    label: 'Part 1 · Famous people',
    title: 'Hometown & reading',
    questions: [
      'Let’s talk about your hometown. Where are you from?',
      'What is the most interesting part of your hometown?',
      'Has your hometown changed much since you were a child?',
      'Let’s move on to reading. Do you enjoy reading books in your free time?',
    ],
    modelAnswer:
      'I’m from Ulaanbaatar, the capital of Mongolia, which is by far the largest city in the country. For me, the most interesting part is the contrast you find there: traditional ger districts sit right alongside modern glass towers, so the old and the new are constantly side by side. It has actually changed enormously since I was a child — when I was young there were far fewer cars and high-rise buildings, whereas now the centre is busy and quite international. As for reading, yes, I genuinely enjoy it; I try to read for half an hour before bed, mostly novels in English at the moment, partly for pleasure and partly because it’s a painless way to pick up new vocabulary.',
  },
  {
    id: 'p5',
    part: 2,
    label: 'Part 2 (cue card) · A person you admire',
    title: 'Describe a well-known person you admire',
    questions: [
      'Describe a well-known person you like or admire. You should say:',
      '• who this person is',
      '• what they have done',
      '• why they are well-known',
      '• and explain why you admire this person.',
    ],
    modelAnswer:
      'The well-known person I’d like to talk about is Sir David Attenborough, the British broadcaster and naturalist. He’s spent more than sixty years making documentaries about the natural world, and his voice and films are recognised almost everywhere. What he has done, essentially, is bring the planet’s most remote wildlife into ordinary people’s living rooms, and in recent years he has used that fame to warn the public about climate change and the loss of biodiversity. He’s well-known partly because of the sheer quality of his programmes, but also because he comes across as calm, curious and completely sincere. The reason I admire him so much is that he has used his influence for something far bigger than himself: rather than simply entertaining, he has changed the way millions of people think about the environment, and he’s done it gently, through knowledge rather than fear. I find that combination of expertise and genuine purpose truly inspiring.',
  },
  {
    id: 'p6',
    part: 3,
    label: 'Part 3 · Celebrity culture',
    title: 'Fame & the media — discussion',
    questions: [
      'In your country, what kind of people become famous nowadays?',
      'Do you think the media reports on famous people fairly?',
      'What are the negative impacts of celebrity culture on young people?',
      'Do you think famous people have a moral responsibility to act as good role models?',
    ],
    modelAnswer:
      'These days, I’d say the people who become famous in my country are increasingly those who are active on social media — influencers, singers and athletes — rather than, say, scientists or writers, simply because online platforms reward visibility. As for whether the media report on them fairly, I’m fairly sceptical; coverage often exaggerates scandals because controversy attracts more clicks, so the picture the public receives can be quite distorted. The negative impact on young people worries me the most: constant exposure to carefully edited, glamorous lives can damage teenagers’ self-esteem and create unrealistic expectations about wealth and appearance. On the question of responsibility, I do believe famous people have at least some moral obligation to behave well, because whether they like it or not, young fans imitate them. That said, I don’t think it’s entirely fair to expect them to be flawless; the real solution is to teach young people to view celebrity culture critically rather than to place the whole burden on the celebrities themselves.',
  },
];

// Grouped by part (1 → 2 → 3) so the pills read in exam order. Array.sort is
// stable, so prompts keep their original order within each part.
const PROMPTS: SpeakingPrompt[] = [...BASE_PROMPTS].sort((a, b) => a.part - b.part);

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
  const [selectedId, setSelectedId] = useState<string>(PROMPTS[0].id);
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

  const prompt = useMemo(
    () => PROMPTS.find((p) => p.id === selectedId) ?? PROMPTS[0],
    [selectedId],
  );
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

  function selectPrompt(id: string) {
    resetRecording();
    stopSpeaking();
    setSelectedId(id);
    setReview(null);
    setError(null);
    setTypedTranscript('');
    setSpeaking(false);
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
        blurb="Бүх Speaking даалгавар (Part 1–3), дуу хоолойн бичлэг болон AI-ийн дуудлага, чөлөөт ярианы Монгол үнэлгээ Pro болон Max багцад нээгдэнэ."
        onUpgrade={onUpgrade}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2">
          <Mic className="w-6 h-6 text-paper" /> Speaking practice
        </h2>
        <p className="text-paper-2 mt-1">
          Part 1–3-ыг чангаар ярьж бичүүлээрэй. AI таны дуу хоолойг сонсож, дуудлага, чөлөөт яриаг
          Монгол хэлээр үнэлнэ.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((p) => {
          const on = p.id === selectedId;
          return (
            <button
              key={p.id}
              onClick={() => selectPrompt(p.id)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                on
                  ? 'bg-paper text-ink'
                  : 'bg-ink-2 text-paper-2 hover:text-paper',
              ].join(' ')}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-ink-raise p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-ink-2 text-paper px-2.5 py-0.5 text-xs font-bold">
            {prompt.label}
          </span>
          <span className="text-sm font-bold text-paper">{prompt.title}</span>
        </div>
        <ul className="space-y-1.5 text-paper leading-relaxed">
          {prompt.questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
        <button
          onClick={hearModel}
          className="inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-5 py-2.5 font-semibold hover:bg-ink-raise"
        >
          {speaking ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {speaking ? 'Зогсоох' : 'Hear a model answer'}
        </button>
      </div>

      {/* --- Recorder ---------------------------------------------------------- */}
      {canRecord ? (
        <div className="rounded-2xl bg-ink-raise p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={recording ? stopRecording : startRecording}
              className={[
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
              <span className="inline-flex items-center gap-2 text-paper">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                {formatTime(seconds)}
              </span>
            )}
          </div>

          {hasAudio && !recording && (
            <div className="space-y-1">
              <span className="text-xs text-paper-2">Таны бичлэг — сонсож шалгаарай:</span>
              <audio src={audioUrl!} controls className="w-full" />
            </div>
          )}

          <p className="text-xs text-paper-2">
            Зөвлөмж: тайван орчинд, бүрэн өгүүлбэрээр 1–2 минут ярина уу.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-paper">
            <MessageSquare className="w-4 h-4 text-paper" /> Энэ хөтөч дуу бичлэг дэмждэггүй — бичвэрээ оруулна уу
          </label>
          <textarea
            value={typedTranscript}
            onChange={(e) => setTypedTranscript(e.target.value)}
            rows={8}
            placeholder="Хэлэх байсан зүйлээ энд бичнэ үү…"
            className="w-full rounded-2xl bg-ink-raise border border-ink-line p-4 text-paper placeholder:text-paper-2 focus:outline-none focus:border-paper leading-relaxed resize-y"
          />
        </div>
      )}

      <button
        onClick={getFeedback}
        disabled={loading || !canSubmit}
        className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 font-bold disabled:opacity-40"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? 'Дуу хоолойг сонсож байна…' : 'Get AI feedback / AI үнэлгээ авах'}
      </button>

      {error && (
        <div className="rounded-2xl bg-ink-2 text-paper-2 p-4 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {review && <AiReviewCard review={review} />}
    </div>
  );
}
