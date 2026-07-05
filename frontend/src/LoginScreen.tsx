import React, { useState } from 'react';
import {
  Mail, Lock, User as UserIcon, ArrowRight, ArrowLeft, Target, Sparkles,
  GraduationCap, Headphones, Loader2, AlertCircle, CheckCircle, Swords,
} from 'lucide-react';
import { signUpWithProfile, logInWithEmail, sendResetEmail } from './auth';
import { isFirebaseConfigured } from './firebase';
import { track } from './analytics';

type Mode = 'login' | 'signup';

// Turn raw Firebase error codes into friendly Mongolian messages.
function friendlyAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/configuration-not-found':
    case 'auth/operation-not-allowed':
      return 'Firebase Authentication дээр Email/Password нэвтрэлтийг Enable хийгээгүй байна.';
    case 'auth/unauthorized-domain':
      return 'Энэ Vercel домэйн Firebase дээр зөвшөөрөгдөөгүй байна. Firebase Authentication → Settings → Authorized domains хэсэгт Vercel домэйноо нэмнэ үү.';
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key':
      return 'Firebase web config буруу байна. frontend/src/firebaseConfig.ts доторх apiKey болон projectId-оо шалгана уу.';
    case 'auth/invalid-email':
      return 'Зөв имэйл хаяг оруулна уу (жишээ: нэр@gmail.com).';
    case 'auth/email-already-in-use':
      return 'Энэ имэйл аль хэдийн бүртгэлтэй байна. Доорх "Нэвтрэх" хэсгээр орно уу.';
    case 'auth/weak-password':
      return 'Нууц үг хэт богино байна. Дор хаяж 6 тэмдэгт оруулна уу.';
    case 'auth/missing-password':
      return 'Нууц үгээ оруулна уу.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Имэйл эсвэл нууц үг буруу байна. Дахин шалгана уу.';
    case 'auth/too-many-requests':
      return 'Хэт олон оролдлого хийсэн байна. Түр хүлээгээд дахин оролдоно уу.';
    case 'auth/network-request-failed':
      return 'Сүлжээний алдаа гарлаа. Интернэт холболтоо шалгана уу.';
    case 'permission-denied':
      return 'Firestore зөвшөөрөл хаалттай байна. Firestore database үүсгэсэн эсэх болон firestore.rules publish хийсэн эсэхээ шалгана уу.';
    case 'failed-precondition':
      return 'Firestore database эсвэл индексийн тохиргоо дутуу байна. Firebase Console дээр Firestore Database үүсгэсэн эсэхээ шалгана уу.';
    case 'unavailable':
      return 'Firebase түр холбогдохгүй байна. Түр хүлээгээд дахин оролдоно уу.';
    default:
      return code ? `Алдаа гарлаа (${code}). Firebase тохиргоогоо шалгаад дахин оролдоно уу.` : 'Алдаа гарлаа. Дахин оролдоно уу.';
  }
}

// Урилгын линкээр (тулаан эсвэл referral) ирсэн зочинд харуулах контекст.
export interface InviteContext {
  kind: 'duel' | 'ref';
  challengerName?: string;
}

interface LoginScreenProps {
  inviteContext?: InviteContext;
  /** Optional: return to the marketing landing page. */
  onBack?: () => void;
  /** Optional: continue without an account (guest mode). When provided, a
   *  "Try without account" button is shown below the form. */
  onGuest?: () => void;
  /** Which mode to open in when there's no invite. Defaults to 'login'. */
  initialMode?: Mode;
}

/**
 * Full-screen sign up / log in screen backed by Firebase Authentication.
 * On success, App's auth listener picks up the new session and swaps this
 * screen out — so there's no success callback to wire up here.
 */
export default function LoginScreen({ inviteContext, onBack, onGuest, initialMode }: LoginScreenProps = {}) {
  // Урилгаар ирсэн зочин ихэвчлэн шинэ хэрэглэгч тул бүртгүүлэх горимоор эхэлнэ.
  const [mode, setMode] = useState<Mode>(inviteContext ? 'signup' : (initialMode ?? 'login'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('A1');
  const [goal, setGoal] = useState('Унших / Сургууль орон');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError('');
    setInfo('');
  };

  const handleForgotPassword = async () => {
    setError('');
    setInfo('');
    if (!isFirebaseConfigured) {
      setError('Firebase тохиргоо хийгдээгүй байна. firebaseConfig.ts файлд тохиргоогоо оруулна уу.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Нууц үгээ сэргээхийн тулд эхлээд имэйл хаягаа оруулна уу.');
      return;
    }
    setResetLoading(true);
    try {
      await sendResetEmail(email);
      setInfo(`Нууц үг сэргээх холбоосыг ${email.trim()} хаяг руу илгээлээ. Имэйлээ (мөн спам хавтсаа) шалгаад, холбоос дээр дарж шинэ нууц үгээ тохируулна уу.`);
    } catch (err) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/user-not-found') {
        setError('Энэ имэйл хаягаар бүртгэл олдсонгүй. Эхлээд "Бүртгүүлэх" хэсгээр бүртгүүлнэ үү.');
      } else {
        setError(friendlyAuthError(err));
      }
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setInfo('');

    if (!isFirebaseConfigured) {
      setError('Firebase тохиргоо хийгдээгүй байна. firebaseConfig.ts файлд тохиргоогоо оруулна уу.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Зөв имэйл хаяг оруулна уу (жишээ: нэр@gmail.com).');
      return;
    }
    if (password.length < 6) {
      setError('Нууц үг дор хаяж 6 тэмдэгт байх ёстой.');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Өөрийн нэрээ оруулна уу.');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'signup') {
        await signUpWithProfile(email, password, name, level, goal);
        track('signup'); // new account created → funnel conversion
      } else {
        await logInWithEmail(email, password);
      }
      // Success → App's auth listener unmounts this screen. Keep the button in
      // its loading state until that happens.
    } catch (err) {
      console.error('Authentication request failed:', err);
      setError(friendlyAuthError(err));
      setSubmitting(false);
    }
  };

  const isSignup = mode === 'signup';

  return (
    <div className="bg-ink text-paper font-sans min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden w-full select-none">
      {/* Ambient depth — single faint monochrome glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-paper/[0.03] rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-paper/[0.03] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-5xl relative z-10 my-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-2 hover:text-paper transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Нүүр хуудас
          </button>
        )}
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-3 flex items-center justify-center gap-3">
            <img src="/favicon.svg" alt="" className="w-10 h-10 md:w-12 md:h-12" />
            <span><span className="text-paper">Vivid</span> <span className="text-paper-2">Lingua</span></span>
          </h1>
          <p className="text-paper-2 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Герман хэл сурах ухаалаг платформ. Бүртгүүлж нэвтэрснээр таны явц хадгалагдаж, аль ч төхөөрөмжөөс үргэлжлүүлэн суралцах боломжтой.
          </p>
        </div>

        {inviteContext && (
          <div className="max-w-2xl mx-auto mb-6 text-paper-2 text-sm bg-ink-raise p-4 rounded-xl border border-ink-line flex items-start gap-3 animate-fade-in">
            <Swords className="w-5 h-5 flex-shrink-0 mt-0.5 text-paper" />
            <span>
              {inviteContext.kind === 'duel'
                ? `🎮 ${inviteContext.challengerName || 'Найз тань'} таныг герман хэлний тулаанд урьж байна — бүртгүүлээд яг ижил 10 асуултад хариулж өрсөлдөөрэй!`
                : '🎁 Найз тань таныг урьсан байна — бүртгүүлмэгц танд 3 өдрийн үнэгүй Pro эрх, та хоёуланд Streak Freeze шагнал очно!'}
            </span>
          </div>
        )}

        {!isFirebaseConfigured && (
          <div className="max-w-2xl mx-auto mb-6 text-paper-2 text-xs bg-ink-raise p-4 rounded-xl border border-ink-line flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-paper" />
            <span>
              Firebase тохиргоо хараахан хийгдээгүй байна. <code className="text-paper font-mono bg-ink-2 px-1.5 py-0.5 rounded border border-ink-line">frontend/src/firebaseConfig.ts</code> файлд
              Firebase project-ийнхээ тохиргоог оруулсны дараа бүртгэл, нэвтрэлт идэвхжинэ.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: value props */}
          <div className="lg:col-span-6 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-serif font-light tracking-tight mb-8 flex items-center gap-3 text-paper">
              <Sparkles className="w-5 h-5 text-paper-2" /> Яагаад бүртгүүлэх вэ?
            </h2>
            <ul className="space-y-7">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-ink-raise border border-ink-line flex items-center justify-center flex-shrink-0">
                  <Target className="w-4.5 h-4.5 text-paper-2" />
                </div>
                <div>
                  <h3 className="font-medium text-paper text-sm">Таны явц хадгалагдана</h3>
                  <p className="text-paper-2 text-xs mt-1 leading-relaxed">Streak, дуусгасан хичээл, ахиц бүгд автоматаар хадгалагдана.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-ink-raise border border-ink-line flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4.5 h-4.5 text-paper-2" />
                </div>
                <div>
                  <h3 className="font-medium text-paper text-sm">Аль ч төхөөрөмжөөс</h3>
                  <p className="text-paper-2 text-xs mt-1 leading-relaxed">Утас, зөөврийн компьютер — хаанаас ч нэг бүртгэлээр үргэлжлүүлнэ.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-ink-raise border border-ink-line flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-4.5 h-4.5 text-paper-2" />
                </div>
                <div>
                  <h3 className="font-medium text-paper text-sm">Хувийн зөвлөмж</h3>
                  <p className="text-paper-2 text-xs mt-1 leading-relaxed">Таны зорилгод тохирсон унших, сонсох, ярих, бичих дасгалууд.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: auth form */}
          <div className="lg:col-span-6 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            {/* Mode toggle — understated underline tabs */}
            <div className="flex gap-8 border-b border-ink-line mb-7">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`relative pb-3 -mb-px text-[11px] font-medium uppercase tracking-[0.18em] transition-colors border-b ${
                  !isSignup ? 'text-paper border-paper' : 'text-paper-2 border-transparent hover:text-paper'
                }`}
              >
                Нэвтрэх
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`relative pb-3 -mb-px text-[11px] font-medium uppercase tracking-[0.18em] transition-colors border-b ${
                  isSignup ? 'text-paper border-paper' : 'text-paper-2 border-transparent hover:text-paper'
                }`}
              >
                Бүртгүүлэх
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-paper-3 uppercase tracking-[0.18em] mb-2">Имэйл хаяг</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-paper-3 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="нэр@gmail.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); setInfo(''); }}
                    className="w-full bg-ink border border-ink-line rounded-xl pl-10 pr-4 py-3 text-paper placeholder:text-paper-3 focus:outline-none focus:border-paper/60 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-paper-3 uppercase tracking-[0.18em] mb-2">Нууц үг</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-paper-3 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    placeholder="Дор хаяж 6 тэмдэгт"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); setInfo(''); }}
                    className="w-full bg-ink border border-ink-line rounded-xl pl-10 pr-4 py-3 text-paper placeholder:text-paper-3 focus:outline-none focus:border-paper/60 transition-colors text-sm"
                  />
                </div>
                {!isSignup && (
                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={resetLoading}
                      className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper-2 hover:text-paper disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
                    >
                      {resetLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                      Нууц үгээ мартсан уу?
                    </button>
                  </div>
                )}
              </div>

              {isSignup && (
                <div className="space-y-4 pt-5 border-t border-ink-line animate-fade-in">
                  <div>
                    <label className="block text-[11px] font-medium text-paper-3 uppercase tracking-[0.18em] mb-2">Таны нэр</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-paper-3 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Бат, Номин..."
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(''); }}
                        className="w-full bg-ink border border-ink-line rounded-xl pl-10 pr-4 py-3 text-paper placeholder:text-paper-3 focus:outline-none focus:border-paper/60 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-paper-3 uppercase tracking-[0.18em] mb-2">Зорилтот түвшин</label>
                      <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full bg-ink border border-ink-line rounded-xl px-3 py-3 text-paper focus:outline-none focus:border-paper/60 transition-colors text-sm cursor-pointer"
                      >
                        <option value="A1">A1 (Анхан)</option>
                        <option value="A2">A2 (Суурь)</option>
                        <option value="B1">B1 (Дунд)</option>
                        <option value="B2">B2 (Ахисан дунд)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-paper-3 uppercase tracking-[0.18em] mb-2">Суралцах чиглэл</label>
                      <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full bg-ink border border-ink-line rounded-xl px-3 py-3 text-paper focus:outline-none focus:border-paper/60 transition-colors text-sm cursor-pointer"
                      >
                        <option value="Унших / Сургууль орон">Их сургууль / Шалгалт</option>
                        <option value="Ажил / Мэргэжил">Ажил / Мэргэжил</option>
                        <option value="Аялал / Сонирхол">Аялал / Сонирхол</option>
                        <option value="Ерөнхий сургалт">Ерөнхий сургалт</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-paper-2 text-xs bg-ink border border-ink-line p-3 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-paper" />
                  <span className="min-w-0 break-words">{error}</span>
                </div>
              )}

              {info && (
                <div className="text-paper-2 text-xs bg-ink border border-ink-line p-3 rounded-lg flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-paper" />
                  {info}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-paper hover:bg-paper-bright disabled:opacity-40 disabled:cursor-not-allowed text-ink text-xs font-medium uppercase tracking-[0.15em] py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 mt-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Түр хүлээнэ үү...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignup ? 'Бүртгүүлээд нэвтрэх' : 'Нэвтрэх'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-paper-3 pt-1">
                {isSignup ? 'Аль хэдийн бүртгэлтэй юу? ' : 'Шинэ хэрэглэгч үү? '}
                <button
                  type="button"
                  onClick={() => switchMode(isSignup ? 'login' : 'signup')}
                  className="text-paper font-medium hover:text-paper-2 cursor-pointer"
                >
                  {isSignup ? 'Нэвтрэх' : 'Бүртгүүлэх'}
                </button>
              </p>

              {onGuest && (
                <div className="pt-3">
                  <div className="flex items-center gap-3 pb-3">
                    <span className="h-px flex-1 bg-ink-line" />
                    <span className="text-[11px] uppercase tracking-wider text-paper-3">эсвэл</span>
                    <span className="h-px flex-1 bg-ink-line" />
                  </div>
                  <button
                    type="button"
                    onClick={onGuest}
                    className="w-full bg-transparent hover:bg-ink-raise text-paper-2 hover:text-paper font-semibold py-3 px-6 rounded-xl border border-ink-line hover:border-ink-line-2 transition-colors cursor-pointer"
                  >
                    Бүртгэлгүй туршиж үзэх · Try without account
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
