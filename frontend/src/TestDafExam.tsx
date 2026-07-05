// =============================================================================
// TestDaF Prüfungssimulation — бүрэн, цаг хэмжсэн, дараалсан загвар шалгалт.
// 4 модуль: Lesen (60′/30) · Hören (40′/25) · Schreiben (60′/график-эссэ) ·
// Sprechen (35′/7 ситуаци). Унших/Сонсох автоматаар дүгнэгдэнэ; Бичих/Ярих нь
// одоо байгаа /api/evaluate-composition ба /api/evaluate-speaking AI-аар үнэлэгдэнэ.
// =============================================================================
import { useEffect, useRef, useState, type FC } from 'react';
import {
  GraduationCap, Clock, BookOpen, Headphones, Edit3, Mic, Volume2,
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, Play, Square,
  Loader2, Trophy, X, Lightbulb, RefreshCw, Sparkles, AlertTriangle,
} from 'lucide-react';
import {
  TESTDAF_EXAM, TdReadingTask, TdListeningTask, TdSpeakingTask,
  TD_READING_COUNT, TD_LISTENING_COUNT, tdnFromScore,
} from './testdaf';
import { playTts, stopTts } from './utils/tts';

// --- AI хариултын хэлбэрүүд (App.tsx-тэй ижил) --------------------------------
interface WritingCorrection { original: string; suggestion: string; type: string; explanation: string; }
interface WritingFeedback {
  isCorrect: boolean; feedbackMessage: string; analysis: string; corrected: string;
  corrections?: WritingCorrection[]; overallScore?: number; grammarScore?: number;
  vocabularyScore?: number; grammarFeedback?: string; vocabularyFeedback?: string;
  strengths?: string[]; improvements?: string[];
}
interface SpeakingEvaluation {
  isCorrect: boolean; feedbackMessage: string; analysis: string; transcript?: string;
  overallScore?: number; pronunciationScore?: number; fluencyScore?: number;
  accentNote?: string; pronunciationFeedback?: string; grammarFeedback?: string;
  vocabularyFeedback?: string; strengths?: string[]; improvements?: string[];
}

// Бичигдсэн audio Blob-ийг Gemini найдвартай хүлээж авдаг 16kHz mono WAV (base64) болгох.
async function audioBlobToWavBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
  const ctx: AudioContext = new AudioCtx();
  const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
  ctx.close();
  const targetRate = 16000;
  const srcData = decoded.getChannelData(0);
  const ratio = decoded.sampleRate / targetRate;
  const outLen = Math.floor(srcData.length / ratio);
  const samples = new Int16Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const s = srcData[Math.floor(i * ratio)] || 0;
    samples[i] = Math.max(-1, Math.min(1, s)) * 0x7fff;
  }
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (off: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i)); };
  const dataLen = samples.length * 2;
  writeStr(0, 'RIFF'); view.setUint32(4, 36 + dataLen, true); writeStr(8, 'WAVE');
  writeStr(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, targetRate, true);
  view.setUint32(28, targetRate * 2, true); view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); writeStr(36, 'data'); view.setUint32(40, dataLen, true);
  for (let i = 0; i < samples.length; i++) view.setInt16(44 + i * 2, samples[i], true);
  const bytes = new Uint8Array(buffer);
  let binary = ''; const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  return btoa(binary);
}

// TTS-д уншихаас өмнө "Sprecher:" гэх мэт ярианы шошгыг цэвэрлэх.
const cleanForTts = (t: string) => t.replace(/^[A-Za-zÄÖÜäöüß. ]{2,20}:\s*/gm, '');
// Неорал хоолой (Azure) — тохируулагдаагүй бол speechSynthesis руу буцна.
const speakDe = (text: string, rate = 1) => {
  playTts(cleanForTts(text), { lang: 'de-DE', rate });
};

const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

type Phase = 'intro' | 'reading' | 'listening' | 'writing' | 'speaking' | 'results';

// --- График зураг (SVG) ------------------------------------------------------
function GraphSVG({ graph }: { graph: typeof TESTDAF_EXAM.writing.graph }) {
  const W = 600, H = 300, padL = 50, padR = 16, padT = 16, padB = 46;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const allVals = graph.series.flatMap((s) => s.values);
  const rawMax = Math.max(...allVals);
  const yMax = Math.ceil(rawMax / 50) * 50;
  const n = graph.xLabels.length;
  const x = (i: number) => padL + (n === 1 ? innerW / 2 : (innerW * i) / (n - 1));
  const y = (v: number) => padT + innerH - (innerH * v) / yMax;
  const ticks = [0, yMax / 2, yMax];
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[420px] max-w-[640px] mx-auto block">
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} y1={y(t)} x2={W - padR} y2={y(t)} stroke="var(--color-paper)" strokeOpacity={0.18} strokeWidth={1} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" className="fill-paper-2" fontSize={11}>{t}</text>
          </g>
        ))}
        {graph.xLabels.map((lab, i) => (
          <text key={lab} x={x(i)} y={H - padB + 20} textAnchor="middle" className="fill-paper" fontSize={12} fontWeight={600}>{lab}</text>
        ))}
        {graph.series.map((s, si) => {
          const tone = 'var(--color-paper)';
          const toneOpacity = si === 0 ? 1 : 0.5;
          return (
          <g key={s.label}>
            <polyline fill="none" stroke={tone} strokeOpacity={toneOpacity} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round"
              points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
            {s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={4} fill="var(--color-ink)" stroke={tone} strokeOpacity={toneOpacity} strokeWidth={2.5} />)}
          </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-4 justify-center mt-1">
        {graph.series.map((s, si) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs font-bold text-paper">
            <span className="w-3.5 h-3.5 rounded-sm inline-block" style={{ background: 'var(--color-paper)', opacity: si === 0 ? 1 : 0.5 }} /> {s.label}
          </div>
        ))}
      </div>
      <p className="text-[11px] text-paper-2 text-center mt-1">y-тэнхлэг: {graph.yUnit}</p>
    </div>
  );
}

export default function TestDafExam({ onExit }: { onExit: () => void }) {
  const exam = TESTDAF_EXAM;
  const D = exam.durations;
  const [phase, setPhase] = useState<Phase>('intro');

  // Унших / Сонсох хариултууд (асуултын id → сонгосон индекс)
  const [readAns, setReadAns] = useState<Record<string, number>>({});
  const [listenAns, setListenAns] = useState<Record<string, number>>({});
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [showKey, setShowKey] = useState(false); // үр дүнгийн дэлгэцэнд зөв хариулт харах
  const [showModels, setShowModels] = useState(false); // үр дүнгийн дэлгэцэнд загвар хариултууд (DE + MN)

  // Бичих
  const [writeText, setWriteText] = useState('');
  const [writeFb, setWriteFb] = useState<WritingFeedback | null>(null);
  const [writeLoading, setWriteLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  // --- Секцийн цаг хэмжигч ---------------------------------------------------
  const sectionDuration = phase === 'reading' ? D.reading : phase === 'listening' ? D.listening : phase === 'writing' ? D.writing : phase === 'speaking' ? D.speaking : 0;
  const timed = phase === 'reading' || phase === 'listening' || phase === 'writing' || phase === 'speaking';
  const [secLeft, setSecLeft] = useState(0);
  const expireRef = useRef<() => void>(() => {});
  useEffect(() => { if (timed) setSecLeft(sectionDuration); }, [phase]); // секц солигдоход reset
  useEffect(() => {
    if (!timed) return;
    const id = setInterval(() => {
      setSecLeft((l) => { if (l <= 1) { clearInterval(id); expireRef.current(); return 0; } return l - 1; });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const goReading = () => setPhase('reading');
  const goListening = () => { stopTts(); setPhase('listening'); };
  const goWriting = () => { stopTts(); setPhase('writing'); };
  const goSpeaking = () => { stopTts(); setPhase('speaking'); };
  const goResults = () => { stopTts(); stopRecording(); setPhase('results'); };
  expireRef.current = phase === 'reading' ? goListening : phase === 'listening' ? goWriting : phase === 'writing' ? goSpeaking : phase === 'speaking' ? goResults : () => {};

  // --- Ярих дэд урсгал --------------------------------------------------------
  const [spkIdx, setSpkIdx] = useState(0);
  const [spkMode, setSpkMode] = useState<'idle' | 'prep' | 'record' | 'done'>('idle');
  const [spkLeft, setSpkLeft] = useState(0);
  const [recUrls, setRecUrls] = useState<Record<number, string>>({});
  const recBlobRef = useRef<Record<number, Blob>>({});
  const [spkEval, setSpkEval] = useState<Record<number, SpeakingEvaluation>>({});
  const [spkLoading, setSpkLoading] = useState<number | null>(null);
  const [spkModel, setSpkModel] = useState<Record<number, boolean>>({});
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const curTask = exam.speaking[spkIdx];

  const stopTracks = () => { streamRef.current?.getTracks().forEach((t) => t.stop()); streamRef.current = null; };
  function stopRecording() {
    try { if (recRef.current && recRef.current.state !== 'inactive') recRef.current.stop(); } catch { /* noop */ }
  }
  async function startRecording(task: TdSpeakingTask) {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      alert('Энэ хөтөч микрофон бичлэг дэмжээгүй байна.'); setSpkMode('idle'); return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const cands = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const mime = cands.find((t) => (window as any).MediaRecorder?.isTypeSupported?.(t)) || '';
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      recRef.current = rec; chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
        recBlobRef.current[task.no] = blob;
        setRecUrls((u) => ({ ...u, [task.no]: URL.createObjectURL(blob) }));
        stopTracks();
        setSpkMode('done');
      };
      rec.start();
      setSpkMode('record'); setSpkLeft(task.speakSeconds);
    } catch {
      alert('Микрофон руу хандах боломжгүй. Зөвшөөрлөө шалгана уу.'); setSpkMode('idle'); stopTracks();
    }
  }
  // Бэлдэх / ярих секунд тоолуур.
  useEffect(() => {
    if (spkMode !== 'prep' && spkMode !== 'record') return;
    if (spkLeft <= 0) {
      if (spkMode === 'prep') startRecording(curTask);
      else if (spkMode === 'record') stopRecording();
      return;
    }
    const id = setTimeout(() => setSpkLeft((l) => l - 1), 1000);
    return () => clearTimeout(id);
  }, [spkMode, spkLeft]);

  const beginPrep = () => { stopTts(); setSpkMode('prep'); setSpkLeft(curTask.prepSeconds); };
  const skipToSpeak = () => { setSpkLeft(0); if (spkMode === 'prep') startRecording(curTask); else if (spkMode === 'idle') startRecording(curTask); };
  const switchTask = (i: number) => {
    if (spkMode === 'record' || spkMode === 'prep') return; // бичиж байх үед солихгүй
    stopTts();
    setSpkIdx(i); setSpkMode(recBlobRef.current[exam.speaking[i].no] ? 'done' : 'idle'); setSpkLeft(0);
  };

  async function evalSpeaking(task: TdSpeakingTask) {
    const blob = recBlobRef.current[task.no];
    if (!blob) return;
    setSpkLoading(task.no);
    try {
      const wavBase64 = await audioBlobToWavBase64(blob);
      const res = await fetch('/api/evaluate-speaking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: task.modelAnswer, audio: wavBase64, mimeType: 'audio/wav' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'eval failed');
      setSpkEval((m) => ({ ...m, [task.no]: data }));
    } catch (e: any) {
      alert('Дуу хоолой үнэлэхэд алдаа гарлаа: ' + (e?.message || e));
    } finally {
      setSpkLoading(null);
    }
  }

  async function evalWriting() {
    if (!writeText.trim()) return;
    setWriteLoading(true);
    try {
      const res = await fetch('/api/evaluate-composition', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: exam.writing.argumentPromptDe,
          points: exam.writing.bulletPointsDe,
          modelAnswer: exam.writing.modelAnswer,
          level: 'C1', text: writeText,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'eval failed');
      setWriteFb(data);
    } catch (e: any) {
      alert('Бичгийг үнэлэхэд алдаа гарлаа: ' + (e?.message || e));
    } finally {
      setWriteLoading(false);
    }
  }

  // Цэвэрлэгээ
  useEffect(() => () => { stopTts(); stopRecording(); stopTracks(); }, []);

  // --- Дүгнэлт ----------------------------------------------------------------
  const gradeReading = () => exam.reading.reduce((acc, t) => acc + t.questions.filter((q) => readAns[q.id] === q.correctIndex).length, 0);
  const gradeListening = () => exam.listening.reduce((acc, t) => acc + t.questions.filter((q) => listenAns[q.id] === q.correctIndex).length, 0);

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="fixed inset-0 z-100 bg-ink overflow-y-auto">
      {/* Дээд мөр: гарчиг + цаг + хаах */}
      <div className="sticky top-0 z-10 bg-ink text-paper border-b border-ink-line">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <GraduationCap className="w-6 h-6 text-paper-2 shrink-0" />
            <div className="min-w-0">
              <p className="font-serif font-normal text-lg tracking-tight leading-tight truncate">TestDaF · Prüfungssimulation</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-paper-3 leading-tight truncate mt-0.5">
                {phase === 'intro' && 'Бүрэн загвар шалгалт'}
                {phase === 'reading' && 'Leseverstehen · Унших'}
                {phase === 'listening' && 'Hörverstehen · Сонсох'}
                {phase === 'writing' && 'Schriftlicher Ausdruck · Бичих'}
                {phase === 'speaking' && 'Mündlicher Ausdruck · Ярих'}
                {phase === 'results' && 'Үр дүн'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {timed && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono font-medium text-sm tracking-wider ${secLeft <= 60 ? 'bg-paper text-ink border-paper animate-pulse' : 'bg-ink-raise text-paper border-ink-line'}`}>
                <Clock className="w-4 h-4" /> {fmt(secLeft)}
              </div>
            )}
            <button onClick={onExit} title="Гарах"
              className="p-2 rounded-full border border-ink-line bg-ink-raise text-paper hover:border-ink-line-2 hover:bg-ink-2 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-28">

        {/* ============ INTRO ============ */}
        {phase === 'intro' && (
          <div className="animate-fade-in">
            <div className="border border-ink-line rounded-2xl p-6 md:p-8 block-shadow">
              <h1 className="text-4xl font-serif font-light tracking-tight text-paper mb-2">TestDaF — бүрэн загвар шалгалт</h1>
              <p className="text-sm text-paper-2 mb-6 leading-relaxed">
                Энэ бол санамсаргүй 1–2 асуулт биш, <b className="text-paper">жинхэнэ TestDaF-ийн бүтэцтэй иж бүрэн симуляци</b>.
                Дөрвөн модулийг дараалан, цаг хэмжсэн нөхцөлд гүйцэтгэнэ. Унших ба Сонсох автоматаар дүгнэгдэж,
                Бичих ба Ярих хэсгийг AI үнэлнэ.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { icon: BookOpen, de: 'Leseverstehen', mn: 'Унших', meta: '60 мин · 3 текст · 30 даалгавар', c: 'text-paper-2' },
                  { icon: Headphones, de: 'Hörverstehen', mn: 'Сонсох', meta: '40 мин · 3 бичлэг · 25 даалгавар', c: 'text-paper-2' },
                  { icon: Edit3, de: 'Schriftlicher Ausdruck', mn: 'Бичих', meta: '60 мин · 1 график-эссэ', c: 'text-paper-2' },
                  { icon: Mic, de: 'Mündlicher Ausdruck', mn: 'Ярих', meta: '35 мин · 7 ситуаци', c: 'text-paper-2' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.de} className="flex items-start gap-3 p-4 rounded-xl border border-ink-line bg-ink-raise">
                      <Icon className={`w-6 h-6 ${s.c} shrink-0`} />
                      <div>
                        <p className="font-serif font-normal text-paper leading-tight">{s.de}</p>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-paper-3 mt-0.5">{s.mn}</p>
                        <p className="text-[11px] text-paper-2 mt-1 font-mono">{s.meta}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-start gap-2 text-xs text-paper-2 bg-ink-raise border border-ink-line rounded-lg p-3 mb-6 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-paper-2 shrink-0 mt-0.5" />
                <p>Сонсох хэсэгт бичлэгийг хөтчийн дуу хоолойгоор тоглуулна (чихэвчтэйгээ шалга). Ярих хэсэгт микрофоны зөвшөөрөл шаардана. Цаг дуусахад дараагийн хэсэг рүү автоматаар шилжинэ.</p>
              </div>
              <button onClick={goReading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-paper text-ink rounded-full font-medium text-xs uppercase tracking-[0.15em] hover:bg-paper-bright active:scale-95 transition-transform cursor-pointer">
                <Play className="w-5 h-5" /> Шалгалт эхлүүлэх
              </button>
            </div>
          </div>
        )}

        {/* ============ READING ============ */}
        {phase === 'reading' && (
          <div className="animate-fade-in space-y-8">
            <SectionIntro icon={BookOpen} de="Leseverstehen" sub="Leseverstehen — 3 Texte, 30 Aufgaben. Beantworten Sie alle Fragen und fahren Sie unten mit dem nächsten Teil fort." />
            {exam.reading.map((task) => (
              <ReadingTaskView key={task.no} task={task} ans={readAns} setAns={setReadAns} />
            ))}
            <NextBar label="Сонсох хэсэг рүү" onNext={goListening} />
          </div>
        )}

        {/* ============ LISTENING ============ */}
        {phase === 'listening' && (
          <div className="animate-fade-in space-y-8">
            <SectionIntro icon={Headphones} de="Hörverstehen" sub="Hörverstehen — 3 Audioaufnahmen, 25 Aufgaben. Spielen Sie die Aufnahmen ab und beantworten Sie die Fragen." />
            {exam.listening.map((task) => {
              const used = plays[`${task.no}`] || 0;
              return (
                <div key={task.no} className="border border-ink-line rounded-xl p-5 md:p-6 block-shadow">
                  <TaskHeader no={task.no} total={3} de={task.titleDe} instr={task.instructionDe} />
                  <div className="flex flex-col items-center gap-2 py-5 bg-ink-raise border border-ink-line rounded-xl mb-5">
                    <button
                      disabled={used >= task.plays}
                      onClick={() => { speakDe(task.audioText); setPlays((p) => ({ ...p, [`${task.no}`]: used + 1 })); }}
                      className={`w-16 h-16 rounded-full border flex items-center justify-center transition-transform ${used >= task.plays ? 'bg-ink-raise border-ink-line text-paper-3 opacity-40 cursor-not-allowed' : 'bg-paper border-paper text-ink cursor-pointer hover:scale-105'}`}>
                      <Volume2 className="w-7 h-7" />
                    </button>
                    <p className="text-xs text-paper-2">
                      {used >= task.plays ? 'Сонсох эрх дууссан' : `Тоглуулах (${task.plays - used} удаа үлдсэн)`}
                    </p>
                    <button onClick={() => stopTts()} className="text-[11px] text-paper-3 hover:text-paper underline cursor-pointer">Зогсоох</button>
                  </div>
                  <div className="space-y-3">
                    {task.questions.map((q, i) => (
                      <QuestionRow key={q.id} index={i} q={q} selected={listenAns[q.id]} onSelect={(idx) => setListenAns((a) => ({ ...a, [q.id]: idx }))} compact={task.kind === 'rf'} />
                    ))}
                  </div>
                </div>
              );
            })}
            <NextBar label="Бичих хэсэг рүү" onNext={goWriting} />
          </div>
        )}

        {/* ============ WRITING ============ */}
        {phase === 'writing' && (
          <div className="animate-fade-in space-y-5">
            <SectionIntro icon={Edit3} de="Schriftlicher Ausdruck" sub={exam.writing.introDe} />
            <div className="border border-ink-line rounded-xl p-5 md:p-6 block-shadow">
              <p className="text-sm font-bold text-paper mb-3">{exam.writing.graph.captionDe}</p>
              <GraphSVG graph={exam.writing.graph} />
            </div>
            <div className="bg-ink-raise border border-ink-line rounded-xl p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-3 mb-2">Aufgabe</p>
              <p className="text-sm font-bold text-paper mb-3 leading-relaxed">{exam.writing.argumentPromptDe}</p>
              <ul className="text-xs text-paper-2 space-y-1 list-disc list-inside">
                {exam.writing.bulletPointsDe.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
            <div className="border border-ink-line rounded-xl p-5 block-shadow">
              <textarea value={writeText} onChange={(e) => setWriteText(e.target.value)} rows={12} maxLength={4000}
                placeholder="Schreiben Sie hier Ihren Text (mind. 250 Wörter)…"
                className="w-full px-3 py-2 text-sm border border-ink-line rounded-lg bg-ink-raise text-paper placeholder:text-paper-3 outline-none focus:border-paper/60 resize-y leading-relaxed" />
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                <span className={`text-xs font-bold ${(writeText.trim() ? writeText.trim().split(/\s+/).length : 0) >= exam.writing.minWords ? 'text-paper' : 'text-paper-2'}`}>
                  {writeText.trim() ? writeText.trim().split(/\s+/).length : 0} / {exam.writing.minWords} үг
                </span>
                <button onClick={evalWriting} disabled={writeLoading || !writeText.trim()}
                  className="px-5 py-2.5 bg-paper text-ink rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:bg-paper-bright transition-transform flex items-center gap-1.5 disabled:opacity-40">
                  {writeLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} AI-аар шалгуулах
                </button>
              </div>
              {writeFb && <WritingFeedbackView fb={writeFb} />}
            </div>
            <NextBar label="Ярих хэсэг рүү" onNext={goSpeaking} />
          </div>
        )}

        {/* ============ SPEAKING ============ */}
        {phase === 'speaking' && (
          <div className="animate-fade-in space-y-5">
            <SectionIntro icon={Mic} de="Mündlicher Ausdruck" sub="Mündlicher Ausdruck — 7 Aufgaben. Für jede Aufgabe gibt es eine Vorbereitungszeit und eine Sprechzeit." />
            {/* Даалгаврын навигаци */}
            <div className="flex flex-wrap gap-2">
              {exam.speaking.map((t, i) => {
                const done = !!recBlobRef.current[t.no];
                return (
                  <button key={t.no} onClick={() => switchTask(i)}
                    className={`w-9 h-9 rounded-lg border text-xs font-medium cursor-pointer transition-colors flex items-center justify-center ${i === spkIdx ? 'bg-paper border-paper text-ink' : done ? 'bg-ink-raise border-paper text-paper' : 'bg-ink-raise border-ink-line text-paper-2 hover:bg-ink-2'}`}>
                    {t.no}
                  </button>
                );
              })}
            </div>

            <div className="border border-ink-line rounded-xl p-5 md:p-6 block-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-2 bg-ink-raise border border-ink-line px-3 py-1 rounded-full">Aufgabe {curTask.no} / 7 · {curTask.tdn}</span>
                <span className="text-[11px] text-paper-3 font-mono">Vorb. {fmt(curTask.prepSeconds)} · Sprech. {fmt(curTask.speakSeconds)}</span>
              </div>
              <h3 className="text-xl font-serif font-normal tracking-tight text-paper mb-3">{curTask.titleDe}</h3>

              <div className="bg-ink-raise border-l-2 border-ink-line-2 rounded-lg p-3 mb-2">
                <p className="text-sm text-paper font-medium leading-relaxed">{curTask.situationDe}</p>
              </div>
              <div className="bg-ink-raise rounded-lg p-3 mb-4">
                <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-3 mb-1">Aufgabe</p>
                <p className="text-sm text-paper font-medium leading-relaxed">{curTask.taskDe}</p>
              </div>

              {/* Timer / удирдлага */}
              <div className="flex flex-col items-center gap-3 py-4 border border-ink-line rounded-xl bg-ink-raise mb-4">
                {spkMode === 'idle' && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button onClick={beginPrep} className="flex items-center gap-2 px-5 py-2.5 bg-paper text-ink rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:bg-paper-bright transition-transform">
                      <Clock className="w-4 h-4" /> Бэлдэж эхлэх ({fmt(curTask.prepSeconds)})
                    </button>
                    <button onClick={() => startRecording(curTask)} className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-ink-line text-paper rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:border-paper/60 hover:bg-ink-2 transition-colors">
                      <Mic className="w-4 h-4" /> Шууд ярих
                    </button>
                  </div>
                )}
                {spkMode === 'prep' && (
                  <>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper-3">Vorbereitung · Бэлтгэл</p>
                    <p className="text-4xl font-mono text-paper">{fmt(spkLeft)}</p>
                    <button onClick={skipToSpeak} className="flex items-center gap-2 px-4 py-2 bg-transparent border border-ink-line text-paper rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:border-paper/60 hover:bg-ink-2 transition-colors">
                      <Mic className="w-4 h-4" /> Одоо ярьж эхлэх
                    </button>
                  </>
                )}
                {spkMode === 'record' && (
                  <>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-paper animate-pulse" /> Sprechzeit · Бичиж байна
                    </p>
                    <p className="text-4xl font-mono text-paper">{fmt(spkLeft)}</p>
                    <button onClick={stopRecording} className="flex items-center gap-2 px-4 py-2 bg-transparent border border-ink-line text-paper rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:border-paper/60 hover:bg-ink-2 transition-colors">
                      <Square className="w-4 h-4" /> Зогсоох
                    </button>
                  </>
                )}
                {spkMode === 'done' && (
                  <div className="w-full flex flex-col items-center gap-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Бичлэг хадгалагдлаа</p>
                    {recUrls[curTask.no] && <audio controls src={recUrls[curTask.no]} className="w-full max-w-sm" />}
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button onClick={() => { setSpkMode('idle'); }} className="flex items-center gap-1.5 px-4 py-2 bg-transparent border border-ink-line text-paper rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:border-paper/60 hover:bg-ink-2 transition-colors">
                        <RefreshCw className="w-3.5 h-3.5" /> Дахин бичих
                      </button>
                      <button onClick={() => evalSpeaking(curTask)} disabled={spkLoading === curTask.no}
                        className="flex items-center gap-1.5 px-5 py-2.5 bg-paper text-ink rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:bg-paper-bright transition-transform disabled:opacity-40">
                        {spkLoading === curTask.no ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} AI-аар үнэлүүлэх
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {spkEval[curTask.no] && <SpeakingFeedbackView ev={spkEval[curTask.no]} />}
            </div>

            <NextBar label="Дуусгаж дүнгээ харах" onNext={goResults} />
          </div>
        )}

        {/* ============ RESULTS ============ */}
        {phase === 'results' && (() => {
          const rc = gradeReading(), lc = gradeListening();
          const rT = tdnFromScore(rc, TD_READING_COUNT), lT = tdnFromScore(lc, TD_LISTENING_COUNT);
          const evals: SpeakingEvaluation[] = Object.values(spkEval);
          const spkAvg = evals.length ? Math.round(evals.reduce((a, e) => a + (e.overallScore || 0), 0) / evals.length) : null;
          const wScore = writeFb?.overallScore ?? null;
          return (
            <div className="animate-fade-in space-y-5">
              <div className="border border-ink-line rounded-2xl p-6 md:p-8 block-shadow text-center">
                <Trophy className="w-12 h-12 text-paper-2 mx-auto mb-2" />
                <h2 className="text-3xl font-serif font-light tracking-tight text-paper mb-1">Шалгалт дууслаа!</h2>
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper-3">TestDaF загвар шалгалтын тойм үр дүн</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <ScoreCard icon={BookOpen} de="Leseverstehen" mn="Унших" detail={`${rc} / ${TD_READING_COUNT} зөв`} tdn={rT.tdn} label={rT.label} c="text-paper-2" />
                <ScoreCard icon={Headphones} de="Hörverstehen" mn="Сонсох" detail={`${lc} / ${TD_LISTENING_COUNT} зөв`} tdn={lT.tdn} label={lT.label} c="text-paper-2" />
                <ScoreCard icon={Edit3} de="Schriftlicher Ausdruck" mn="Бичих"
                  detail={wScore != null ? `AI оноо: ${wScore}/100` : 'AI-аар үнэлүүлээгүй'}
                  tdn={wScore != null ? tdnFromScore(wScore, 100).tdn : '—'} label={wScore != null ? tdnFromScore(wScore, 100).label : 'Бичих хэсэгт AI шалгалт хийгээгүй'} c="text-paper-2" />
                <ScoreCard icon={Mic} de="Mündlicher Ausdruck" mn="Ярих"
                  detail={spkAvg != null ? `AI дундаж: ${spkAvg}/100 (${evals.length}/7 үнэлсэн)` : 'AI-аар үнэлүүлээгүй'}
                  tdn={spkAvg != null ? tdnFromScore(spkAvg, 100).tdn : '—'} label={spkAvg != null ? tdnFromScore(spkAvg, 100).label : 'Ярих хэсэгт AI үнэлгээ хийгээгүй'} c="text-paper-2" />
              </div>

              <div className="bg-ink-raise border border-ink-line rounded-xl p-4 text-xs text-paper-2 leading-relaxed">
                <b className="text-paper">TDN тайлбар:</b> TestDaF-ийн түвшнийг (TestDaF-Niveaustufe) TDN 3–5 гэж үнэлдэг. TDN 5 ≈ C1, TDN 4 ≈ B2+, TDN 3 ≈ B2.
                Унших/Сонсох нь зөв хариултын эзлэх хувиар, Бичих/Ярих нь AI-ийн оноогоор ойролцоолсон болно.
              </div>

              <div className="flex flex-wrap gap-2 justify-between items-center">
                <div className="flex gap-2">
                  <button onClick={() => setShowKey((v) => !v)} className="flex items-center gap-1.5 px-4 py-2.5 bg-transparent border border-ink-line text-paper rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:border-paper/60 hover:bg-ink-2 transition-colors">
                    {showKey ? 'Зөв хариулт нуух' : 'Зөв хариултыг харах'}
                  </button>
                  <button onClick={() => setShowModels((v) => !v)} className="flex items-center gap-1.5 px-4 py-2.5 bg-transparent border border-ink-line text-paper rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:border-paper/60 hover:bg-ink-2 transition-colors">
                    {showModels ? 'Загвар хариулт нуух' : 'Загвар хариултыг харах'}
                  </button>
                </div>
                <button onClick={onExit} className="flex items-center gap-1.5 px-5 py-2.5 bg-paper text-ink rounded-full font-medium text-xs uppercase tracking-[0.15em] cursor-pointer hover:bg-paper-bright transition-colors">
                  Хаах <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {showKey && (
                <div className="space-y-4">
                  <AnswerKey title="Leseverstehen · Унших" tasks={exam.reading} ans={readAns} />
                  <AnswerKey title="Hörverstehen · Сонсох" tasks={exam.listening} ans={listenAns} />
                </div>
              )}

              {showModels && (
                <div className="space-y-4">
                  <div className="border border-ink-line rounded-xl p-4 block-shadow">
                    <p className="font-serif font-normal text-lg tracking-tight text-paper mb-2">Schriftlicher Ausdruck · Бичих загвар хариулт</p>
                    <div className="bg-ink-raise rounded p-3 text-sm whitespace-pre-line leading-relaxed text-paper font-medium">
                      {exam.writing.modelAnswer}
                    </div>
                  </div>
                  <div className="border border-ink-line rounded-xl p-4 block-shadow">
                    <p className="font-serif font-normal text-lg tracking-tight text-paper mb-2">Mündlicher Ausdruck · Ярих загвар хариултууд</p>
                    <div className="space-y-3">
                      {exam.speaking.map((task) => (
                        <div key={task.no} className="border-t border-ink-line/60 pt-2 first:border-0 first:pt-0">
                          <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-2">Aufgabe {task.no} ({task.tdn}) · {task.titleDe}</p>
                          <p className="text-xs text-paper bg-ink-raise rounded p-2 mt-1 leading-relaxed font-medium">{task.modelAnswer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// --- Дэд компонентууд --------------------------------------------------------
function SectionIntro({ icon: Icon, de, sub }: { icon: any; de: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 border border-ink-line rounded-xl p-4 block-shadow">
      <Icon className="w-7 h-7 text-paper-2 shrink-0" />
      <div>
        <p className="font-serif font-normal text-lg tracking-tight text-paper">{de}</p>
        <p className="text-xs text-paper-2 leading-relaxed">{sub}</p>
      </div>
    </div>
  );
}

function TaskHeader({ no, total, de, instr }: { no: number; total: number; de: string; instr: string }) {
  return (
    <div className="mb-4">
      <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-2 bg-ink-raise border border-ink-line px-2.5 py-0.5 rounded-full">Teil {no} / {total}</span>
      <h3 className="text-lg font-serif font-normal tracking-tight text-paper mt-2">{de}</h3>
      <p className="text-sm text-paper-2 mt-2 bg-ink-raise border-l-2 border-ink-line-2 rounded p-2 leading-relaxed">{instr}</p>
    </div>
  );
}

function NextBar({ label, onNext }: { label: string; onNext: () => void }) {
  return (
    <div className="flex justify-end pt-2">
      <button onClick={onNext} className="flex items-center gap-2 px-6 py-3 bg-paper text-ink rounded-full font-medium text-xs uppercase tracking-[0.15em] hover:bg-paper-bright active:scale-95 transition-transform cursor-pointer">
        {label} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ReadingTaskViewProps { task: TdReadingTask; ans: Record<string, number>; setAns: (f: (a: Record<string, number>) => Record<string, number>) => void }
const ReadingTaskView: FC<ReadingTaskViewProps> = ({ task, ans, setAns }) => {
  return (
    <div className="border border-ink-line rounded-xl p-5 md:p-6 block-shadow">
      <TaskHeader no={task.no} total={3} de={task.titleDe} instr={task.instructionDe} />
      {task.kind === 'match' ? (
        <div className="grid md:grid-cols-2 gap-2 mb-5">
          {task.options!.map((o) => (
            <div key={o.label} className="flex gap-2 p-2.5 rounded-lg border border-ink-line bg-ink-raise">
              <span className="font-serif font-normal text-paper shrink-0">{o.label}</span>
              <div>
                <p className="text-xs font-bold text-paper">{o.titleDe}</p>
                <p className="text-[11px] text-paper-2 leading-snug">{o.textDe}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[15px] leading-relaxed text-paper whitespace-pre-line font-medium mb-5">{task.text}</p>
      )}
      <div className="space-y-3">
        {task.questions.map((q, i) => (
          <QuestionRow key={q.id} index={i} q={q} selected={ans[q.id]} onSelect={(idx) => setAns((a) => ({ ...a, [q.id]: idx }))} compact={task.kind === 'match' || task.kind === 'tristate'} />
        ))}
      </div>
    </div>
  );
}

interface QuestionRowProps { index: number; q: { id: string; prompt: string; choices: string[] }; selected: number | undefined; onSelect: (i: number) => void; compact?: boolean }
const QuestionRow: FC<QuestionRowProps> = ({ index, q, selected, onSelect, compact }) => {
  return (
    <div className="border-t border-ink-line/60 pt-3">
      <p className="text-sm font-bold text-paper mb-2">{index + 1}. {q.prompt}</p>
      <div className={compact ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'}>
        {q.choices.map((c, i) => {
          const sel = selected === i;
          return (
            <button key={i} onClick={() => onSelect(i)}
              className={`text-left rounded-lg border font-medium transition-colors cursor-pointer ${compact ? 'px-3 py-1.5 text-xs min-w-[44px] text-center' : 'px-3 py-2 text-sm'} ${sel ? 'bg-paper border-paper text-ink' : 'bg-ink-raise border-ink-line text-paper hover:border-ink-line-2 hover:bg-ink-2'}`}>
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScoreCard({ icon: Icon, de, mn, detail, tdn, label, c }: { icon: any; de: string; mn: string; detail: string; tdn: string; label: string; c: string }) {
  return (
    <div className="border border-ink-line rounded-xl p-4 block-shadow">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${c}`} />
        <div className="min-w-0">
          <p className="font-serif font-normal text-paper text-sm leading-tight truncate">{de}</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-paper-3">{mn}</p>
        </div>
      </div>
      <p className="text-3xl font-serif font-light tracking-tight text-paper">{tdn}</p>
      <p className="text-xs text-paper-2">{detail}</p>
      <p className="text-[11px] text-paper-3 mt-1">{label}</p>
    </div>
  );
}

function AnswerKey({ title, tasks, ans }: { title: string; tasks: { no: number; titleDe: string; questions: { id: string; prompt: string; choices: string[]; correctIndex: number }[] }[]; ans: Record<string, number> }) {
  return (
    <div className="border border-ink-line rounded-xl p-4 block-shadow">
      <p className="font-serif font-normal text-lg tracking-tight text-paper mb-2">{title}</p>
      {tasks.map((t) => (
        <div key={t.no} className="mb-3">
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-2 mb-1">Teil {t.no} · {t.titleDe}</p>
          <div className="grid sm:grid-cols-2 gap-1">
            {t.questions.map((q, i) => {
              const sel = ans[q.id];
              const ok = sel === q.correctIndex;
              return (
                <div key={q.id} className="flex items-center gap-1.5 text-[11px]">
                  {ok ? <CheckCircle2 className="w-3.5 h-3.5 text-paper shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-paper-3 shrink-0" />}
                  <span className="text-paper-2">
                    {i + 1}. {sel != null ? <b className={ok ? 'text-paper' : 'text-paper-3 line-through'}>{q.choices[sel]}</b> : <i className="text-paper-3">хариулаагүй</i>}
                    {!ok && <> → <b className="text-paper">{q.choices[q.correctIndex]}</b></>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function WritingFeedbackView({ fb }: { fb: WritingFeedback }) {
  return (
    <div className="mt-4 border border-ink-line rounded-xl p-4 bg-ink-raise">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-paper-2" />
        <p className="font-bold text-paper text-sm">{fb.feedbackMessage}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-3 text-[11px] font-bold">
        {fb.overallScore != null && <span className="px-2 py-0.5 rounded-full bg-paper text-ink">Нийт: {fb.overallScore}/100</span>}
        {fb.grammarScore != null && <span className="px-2 py-0.5 rounded-full bg-ink-2 text-paper border border-ink-line">Дүрэм: {fb.grammarScore}</span>}
        {fb.vocabularyScore != null && <span className="px-2 py-0.5 rounded-full bg-ink-2 text-paper border border-ink-line">Үгсийн сан: {fb.vocabularyScore}</span>}
      </div>
      <p className="text-xs text-paper leading-relaxed mb-3">{fb.analysis}</p>
      {fb.corrections && fb.corrections.length > 0 && (
        <div className="mb-3">
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-3 mb-1">Засварууд</p>
          <div className="space-y-1.5">
            {fb.corrections.map((c, i) => (
              <div key={i} className="text-xs bg-ink border border-ink-line rounded p-2">
                <span className="line-through text-paper-3">{c.original}</span> → <b className="text-paper">{c.suggestion}</b>
                <span className="text-[10px] uppercase ml-1 text-paper-3">({c.type})</span>
                <p className="text-[11px] text-paper-2">{c.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {fb.corrected && (
        <div className="mb-2">
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-3 mb-1">Засварласан хувилбар</p>
          <p className="text-xs text-paper bg-ink border border-ink-line rounded p-2 whitespace-pre-line leading-relaxed">{fb.corrected}</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-2 mt-2">
        {fb.strengths && fb.strengths.length > 0 && (
          <div><p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper mb-1">Давуу тал</p><ul className="text-[11px] text-paper-2 list-disc list-inside space-y-0.5">{fb.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        )}
        {fb.improvements && fb.improvements.length > 0 && (
          <div><p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-2 mb-1">Сайжруулах</p><ul className="text-[11px] text-paper-2 list-disc list-inside space-y-0.5">{fb.improvements.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        )}
      </div>
    </div>
  );
}

function SpeakingFeedbackView({ ev }: { ev: SpeakingEvaluation }) {
  return (
    <div className="mt-2 border border-ink-line rounded-xl p-4 bg-ink-raise">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-paper-2" />
        <p className="font-bold text-paper text-sm">{ev.feedbackMessage}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-3 text-[11px] font-bold">
        {ev.overallScore != null && <span className="px-2 py-0.5 rounded-full bg-paper text-ink">Нийт: {ev.overallScore}/100</span>}
        {ev.pronunciationScore != null && <span className="px-2 py-0.5 rounded-full bg-ink-2 text-paper border border-ink-line">Дуудлага: {ev.pronunciationScore}</span>}
        {ev.fluencyScore != null && <span className="px-2 py-0.5 rounded-full bg-ink-2 text-paper border border-ink-line">Чөлөөт: {ev.fluencyScore}</span>}
      </div>
      {ev.transcript && <p className="text-xs text-paper mb-2"><b className="text-paper-2">Сонссон:</b> „{ev.transcript}“</p>}
      <p className="text-xs text-paper leading-relaxed mb-2">{ev.analysis}</p>
      {ev.accentNote && <p className="text-[11px] text-paper-2 italic mb-2">{ev.accentNote}</p>}
      <div className="grid sm:grid-cols-2 gap-2">
        {ev.strengths && ev.strengths.length > 0 && (
          <div><p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper mb-1">Давуу тал</p><ul className="text-[11px] text-paper-2 list-disc list-inside space-y-0.5">{ev.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        )}
        {ev.improvements && ev.improvements.length > 0 && (
          <div><p className="text-[11px] uppercase tracking-[0.18em] font-medium text-paper-2 mb-1">Сайжруулах</p><ul className="text-[11px] text-paper-2 list-disc list-inside space-y-0.5">{ev.improvements.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        )}
      </div>
    </div>
  );
}
