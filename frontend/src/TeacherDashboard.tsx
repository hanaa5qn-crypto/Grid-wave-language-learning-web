import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, ArrowLeft, Flame, GraduationCap, Loader2, LogOut, RefreshCw, ShieldCheck, Tag, Users,
} from 'lucide-react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { getAuthInstance, isFirebaseConfigured } from './firebase';
import { getTeacherStudents, getTeacherStudentDetail, type TeacherStudentView, type TeacherStudentDetailView } from './promo';

const WEEKDAY_LABELS = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];

function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatHm(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}ц ${m}м`;
}

// Сүүлийн 7 хоногийн (өнөөдрийг оруулаад) суралцсан цаг — German+English map-ийг
// нийлүүлж нэг өдрийн нийлбэрийг гаргана.
function buildLast7Days(byDate: Record<string, number>, byDateEn: Record<string, number>) {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    const key = localDateKey(date);
    const seconds = (byDate[key] ?? 0) + (byDateEn[key] ?? 0);
    return { key, label: WEEKDAY_LABELS[date.getDay()], seconds };
  });
}

// =============================================================================
// Багшийн class-sandbox дэлгэц: багш өөрийн Firebase бүртгэлээрээ нэвтэрч,
// зөвхөн өөрийн teacherEmail-тэй холбоотой promo код(ууд)оор бүртгүүлсэн
// сурагчдыг харна. Эрх шалгалт бүхэлдээ /api/teacher/students дээр (сервер),
// клиент код дамжуулахгүй.
// =============================================================================

function formatDate(value: string | null): string {
  if (!value) return 'Тодорхойгүй';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('mn-MN', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

// Сурагчийн дэлгэрэнгүй харагдац — суралцсан цаг, өдрийн зорилго, ур чадвар,
// тестийн бүрэн түүх. Overlay хэлбэрээр AccountScreen-ийн pattern-тэй адил.
const StudentDetailPanel: React.FC<{ uid: string; onClose: () => void }> = ({ uid, onClose }) => {
  const [detail, setDetail] = useState<TeacherStudentDetailView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    getTeacherStudentDetail(uid)
      .then((d) => { if (!cancelled) setDetail(d); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Мэдээлэл ачаалж чадсангүй.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [uid]);

  const days = useMemo(
    () => (detail ? buildLast7Days(detail.studySecondsByDate, detail.studySecondsByDateEn) : []),
    [detail],
  );
  const maxDaySeconds = Math.max(...days.map((d) => d.seconds), 1);
  const todaySeconds = days.at(-1)?.seconds ?? 0;
  const goalSeconds = (detail?.dailyGoalMinutes ?? 15) * 60;

  return (
    <div className="fixed inset-0 z-[200] bg-ink overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-paper-2 hover:text-paper transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Буцах
        </button>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-paper-2" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-ink-2 border border-ink-line text-paper-2 rounded-lg p-3 text-xs font-medium flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {detail && !loading && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-serif font-light tracking-tight text-paper">{detail.name || 'Нэргүй'}</h1>
              <p className="text-sm text-paper-2 font-medium">{detail.email}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-ink-raise border border-ink-line rounded-xl p-3">
                <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium">Нийт цаг</p>
                <p className="text-paper font-serif font-light text-lg mt-0.5">{formatHm(detail.totalStudySeconds)}</p>
              </div>
              <div className="bg-ink-raise border border-ink-line rounded-xl p-3">
                <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium flex items-center gap-1"><Flame className="w-3 h-3" /> Streak</p>
                <p className="text-paper font-serif font-light text-lg mt-0.5">{detail.streak}</p>
              </div>
              <div className="bg-ink-raise border border-ink-line rounded-xl p-3">
                <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium">Дуусгасан</p>
                <p className="text-paper font-serif font-light text-lg mt-0.5">{detail.completedActivityCount}</p>
              </div>
              <div className="bg-ink-raise border border-ink-line rounded-xl p-3">
                <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium">Сурсан үг</p>
                <p className="text-paper font-serif font-light text-lg mt-0.5">{detail.vocabLearnedCount}</p>
              </div>
            </div>

            <div className="bg-ink-raise border border-ink-line rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-paper">Сүүлийн 7 хоног</h2>
                <span className="text-xs text-paper-2 font-medium">
                  Өдрийн зорилго: {detail.dailyGoalMinutes}м {todaySeconds >= goalSeconds ? '✓' : `(өнөөдөр ${Math.round(todaySeconds / 60)}м)`}
                </span>
              </div>
              <div className="space-y-2">
                {days.map((d) => (
                  <div key={d.key} className="flex items-center gap-3 text-xs">
                    <span className="w-14 shrink-0 text-paper-2 font-medium">{d.label}</span>
                    <div className="flex-1 h-2 bg-ink-2 rounded-full overflow-hidden">
                      <div className="h-full bg-paper rounded-full" style={{ width: `${(d.seconds / maxDaySeconds) * 100}%` }} />
                    </div>
                    <span className="w-14 shrink-0 text-right text-paper-2 font-medium">{formatHm(d.seconds)}</span>
                  </div>
                ))}
              </div>
            </div>

            {detail.placementSkillScores && (
              <div className="bg-ink-raise border border-ink-line rounded-2xl p-5">
                <h2 className="text-sm font-medium text-paper mb-3">Ур чадвар ({detail.placementLevel ?? '—'})</h2>
                <div className="space-y-2">
                  {Object.entries(detail.placementSkillScores as Record<string, { correct: number; total: number }>).map(([skill, score]) => {
                    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
                    return (
                      <div key={skill} className="flex items-center gap-3 text-xs">
                        <span className="w-24 shrink-0 text-paper-2 font-medium truncate">{skill}</span>
                        <div className="flex-1 h-2 bg-ink-2 rounded-full overflow-hidden">
                          <div className="h-full bg-paper rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-16 shrink-0 text-right text-paper-2 font-medium">{score.correct}/{score.total}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-ink-raise border border-ink-line rounded-2xl p-5">
              <h2 className="text-sm font-medium text-paper mb-3">Тестийн түүх ({detail.testHistoryEn.length})</h2>
              {detail.testHistoryEn.length === 0 ? (
                <p className="text-xs text-paper-2 font-medium">Тест өгөөгүй байна.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="text-paper-3">
                      <tr>
                        <th className="text-left font-medium uppercase tracking-[0.1em] py-1.5 pr-3">Тест</th>
                        <th className="text-left font-medium uppercase tracking-[0.1em] py-1.5 pr-3">Огноо</th>
                        <th className="text-left font-medium uppercase tracking-[0.1em] py-1.5 pr-3">Оноо</th>
                        <th className="text-left font-medium uppercase tracking-[0.1em] py-1.5">Band/Scaled</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-line">
                      {detail.testHistoryEn.map((t, i) => (
                        <tr key={`${t.testId}-${i}`}>
                          <td className="py-1.5 pr-3 text-paper">{t.label}</td>
                          <td className="py-1.5 pr-3 text-paper-2">{formatDate(t.takenAt)}</td>
                          <td className="py-1.5 pr-3 text-paper-2">{t.correct}/{t.total}</td>
                          <td className="py-1.5 text-paper-2">{t.band ?? t.scaledScore ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StudentCard: React.FC<{ student: TeacherStudentView; onOpen: (uid: string) => void }> = ({ student, onOpen }) => {
  return (
    <button
      onClick={() => onOpen(student.uid)}
      className="w-full text-left bg-ink-raise border border-ink-line rounded-2xl p-5 shadow-black/40 hover:border-paper/40 hover:bg-ink-2 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-paper truncate">{student.name || 'Нэргүй'}</p>
          <p className="text-xs text-paper-2 font-medium truncate">{student.email}</p>
        </div>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] bg-ink-2 border border-ink-line text-paper-2 px-2 py-0.5 rounded-md">
          {student.code}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="bg-ink-2 border border-ink-line rounded-lg p-2.5">
          <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium">Түвшин</p>
          <p className="text-paper font-serif font-light text-lg mt-0.5">{student.placementLevel ?? '—'}</p>
        </div>
        <div className="bg-ink-2 border border-ink-line rounded-lg p-2.5">
          <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium flex items-center gap-1">
            <Flame className="w-3 h-3" /> Streak
          </p>
          <p className="text-paper font-serif font-light text-lg mt-0.5">{student.streak}</p>
        </div>
        <div className="bg-ink-2 border border-ink-line rounded-lg p-2.5">
          <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium">Сурсан үг</p>
          <p className="text-paper font-serif font-light text-lg mt-0.5">{student.vocabLearnedCount}</p>
        </div>
        <div className="bg-ink-2 border border-ink-line rounded-lg p-2.5">
          <p className="text-paper-3 uppercase tracking-[0.14em] text-[10px] font-medium">Алдаа</p>
          <p className="text-paper font-serif font-light text-lg mt-0.5">{student.mistakeCount}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-paper-2 font-medium">
        <span>{student.studyDaysEn} өдөр суралцсан</span>
        <span>Сүүлд идэвхтэй: {formatDate(student.lastActive)}</span>
      </div>
    </button>
  );
};

export default function TeacherDashboard() {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [codes, setCodes] = useState<string[]>([]);
  const [students, setStudents] = useState<TeacherStudentView[]>([]);
  const [loading, setLoading] = useState(false);
  const [notATeacher, setNotATeacher] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured) { setAuthLoading(false); return; }
    return onAuthStateChanged(getAuthInstance(), (user) => {
      setAuthUser(user);
      if (user?.email) setEmail(user.email);
      setAuthLoading(false);
    });
  }, []);

  const load = async () => {
    setLoading(true);
    setLoadError('');
    setNotATeacher(false);
    try {
      const result = await getTeacherStudents();
      setCodes(result.codes);
      setStudents(result.students);
    } catch (err) {
      if (err instanceof Error && err.message === 'not_a_teacher') {
        setNotATeacher(true);
      } else {
        setLoadError(err instanceof Error ? err.message : 'Мэдээлэл ачаалж чадсангүй.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(getAuthInstance(), email.trim(), password);
    } catch (err) {
      console.error('Teacher login failed:', err);
      setLoginError('Нэвтрэхэд алдаа гарлаа. Имэйл болон нууц үгээ шалгана уу.');
    }
  };

  const studentsByStreak = useMemo(
    () => [...students].sort((a, b) => b.streak - a.streak),
    [students],
  );

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return studentsByStreak;
    return studentsByStreak.filter(
      (s) => s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q),
    );
  }, [studentsByStreak, search]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-ink text-paper flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-paper-2" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen bg-ink text-paper flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-ink-raise text-paper border border-ink-line rounded-2xl p-6 shadow-black/40">
          <div className="w-12 h-12 rounded-lg bg-ink-2 border border-ink-line text-paper-2 flex items-center justify-center mb-5">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-light tracking-tight text-paper">Багшийн самбар</h1>
          <p className="text-sm text-paper-2 font-medium mt-1">Vivid Lingua — сурагчдын явц</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-paper-3 mb-1.5">Имэйл</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-ink-raise border border-ink-line rounded-lg px-3 py-2.5 text-sm font-medium text-paper placeholder:text-paper-3 outline-none focus:border-paper/60"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-paper-3 mb-1.5">Нууц үг</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-ink-raise border border-ink-line rounded-lg px-3 py-2.5 text-sm font-medium text-paper placeholder:text-paper-3 outline-none focus:border-paper/60"
              />
            </div>
          </div>

          {loginError && (
            <div className="mt-4 bg-ink-raise border border-ink-line text-paper-2 rounded-lg p-3 text-xs font-medium flex gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-5 bg-paper text-ink rounded-full py-3 text-xs font-medium uppercase tracking-[0.15em] hover:bg-white transition-colors"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    );
  }

  if (notATeacher) {
    return (
      <div className="min-h-screen bg-ink text-paper flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-ink-raise border border-ink-line rounded-2xl p-6 text-center shadow-black/40">
          <div className="w-12 h-12 mx-auto rounded-lg bg-ink-2 border border-ink-line text-paper-2 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-serif font-light tracking-tight text-paper">Хандах эрхгүй байна</h1>
          <p className="text-sm text-paper-2 font-medium mt-2">
            Танай имэйл багшийн кодтой холбогдоогүй байна.
          </p>
          <button
            onClick={() => signOut(getAuthInstance())}
            className="mt-5 px-5 py-2.5 bg-transparent border border-ink-line text-paper rounded-full text-xs font-medium uppercase tracking-[0.15em] hover:border-paper/60 hover:bg-ink-2 transition-colors"
          >
            Гарах
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="bg-ink border-b border-ink-line sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper-3">Vivid Lingua</p>
            <h1 className="text-2xl font-serif font-light tracking-tight text-paper flex items-center gap-2 flex-wrap">
              Багшийн самбар
              {codes.map((c) => (
                <span key={c} className="text-[11px] font-medium uppercase tracking-[0.1em] bg-ink-2 border border-ink-line text-paper-2 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Tag className="w-3 h-3" />{c}
                </span>
              ))}
            </h1>
            <p className="text-xs text-paper-2 font-medium mt-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {students.length} сурагч
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              disabled={loading}
              className="px-5 py-2.5 bg-paper text-ink rounded-full text-xs font-medium uppercase tracking-[0.15em] flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-40"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Шинэчлэх
            </button>
            <button
              onClick={() => signOut(getAuthInstance())}
              className="px-5 py-2.5 bg-transparent border border-ink-line text-paper rounded-full text-xs font-medium uppercase tracking-[0.15em] flex items-center gap-2 hover:border-paper/60 hover:bg-ink-raise transition-colors"
            >
              <LogOut className="w-4 h-4" /> Гарах
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {loadError && (
          <div className="mb-5 bg-ink-2 border border-ink-line text-paper-2 rounded-lg p-3 text-xs font-medium flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loadError}</span>
          </div>
        )}

        {studentsByStreak.length > 0 && (
          <div className="mb-5">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Сурагч хайх…"
              className="w-full max-w-sm bg-ink-raise border border-ink-line rounded-lg px-3 py-2.5 text-sm font-medium text-paper placeholder:text-paper-3 outline-none focus:border-paper/60"
            />
            {search.trim() && (
              <p className="text-xs text-paper-2 font-medium mt-2">{filteredStudents.length} илэрц</p>
            )}
          </div>
        )}

        {loading && students.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-paper-2" />
          </div>
        ) : studentsByStreak.length === 0 ? (
          <div className="bg-ink-raise border border-ink-line rounded-2xl p-10 text-center">
            <p className="text-sm text-paper-2 font-medium">Сурагч бүртгэгдээгүй байна.</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="bg-ink-raise border border-ink-line rounded-2xl p-10 text-center">
            <p className="text-sm text-paper-2 font-medium">Илэрц олдсонгүй</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((s) => (
              <StudentCard key={s.uid} student={s} onOpen={setSelectedUid} />
            ))}
          </div>
        )}
      </main>

      {selectedUid && (
        <StudentDetailPanel uid={selectedUid} onClose={() => setSelectedUid(null)} />
      )}
    </div>
  );
}
