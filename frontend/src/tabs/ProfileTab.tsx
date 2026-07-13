import React from 'react';
import {
  GraduationCap, LogOut, Zap, BookOpen, Headphones, Mic, RotateCcw,
  XCircle, Flame, CheckCircle, Award, Target, Gauge, Shield, Lightbulb,
  Check, ArrowRight, Swords, ChevronRight, Edit3,
} from 'lucide-react';
import { TabType, VocabularyWord } from '../types';
import { Level } from '../library';
import { UserProfile } from '../profiles';
import {
  buildUnitsForLevel, unitProgress, isUnitPassed, isUnitUnlocked, UNIT_PASS_RATIO,
  resolveMistakes, buildTodaySession,
} from '../learning';

interface ProfileTabProps {
  authLoading: boolean;
  brokenStreakNotice: number | null;
  setBrokenStreakNotice: (v: number | null) => void;
  completedActivityIds: string[];
  currentUser: UserProfile | null;
  lessonProgress: number;
  logoutUser: () => void;
  selectTab: (tab: TabType) => void;
  startActivity: (tab: 'read' | 'listen' | 'speak' | 'write', itemId: number) => void;
  streak: number;
  studyDays: string[];
  TRAINER_WORDS: VocabularyWord[];
  TRACKABLE_ACTIVITY_TOTAL: number;
  billingCard: React.ReactNode;
}

export function ProfileTab({
  authLoading,
  brokenStreakNotice,
  setBrokenStreakNotice,
  completedActivityIds,
  currentUser,
  lessonProgress,
  logoutUser,
  selectTab,
  startActivity,
  streak,
  studyDays,
  TRAINER_WORDS,
  TRACKABLE_ACTIVITY_TOTAL,
  billingCard,
}: ProfileTabProps) {
    if (!currentUser) return null;

    const todaySession = buildTodaySession(
      currentUser.targetLevel,
      new Set(completedActivityIds),
      currentUser.srsByWord ?? {},
      TRAINER_WORDS
    );
    const unresolvedMistakes = resolveMistakes(currentUser.mistakeIds ?? []);
    const currentUnits = buildUnitsForLevel(currentUser.targetLevel as Level);

    // Exclude `unit:` ratchet facts (audit fix 7) — they are not activities.
    const completedCount = completedActivityIds.filter((id) => !id.startsWith('unit:')).length;
    const lastStudyDay = studyDays[studyDays.length - 1];
    // We draw an SVG line chart representing study hours (learningCurve)
    const maxHours = Math.max(...currentUser.learningCurve.map(c => c.hours), 4);
    const points = currentUser.learningCurve.map((c, i) => {
      const x = 40 + i * (520 / 6);
      const y = 160 - (c.hours / maxHours) * 120;
      return { x, y, day: c.day, hours: c.hours };
    });

    const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

    // Draw horizontal grid lines
    const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
      const y = 160 - ratio * 120;
      const label = (ratio * maxHours).toFixed(1) + 'ц';
      return { y, label };
    });

    return (
      <div className="w-full pb-24 space-y-8 animate-fade-in text-paper select-none">
        {/* Welcome Header Hero Banner */}
        <div className="relative overflow-hidden bg-ink-raise border border-ink-line rounded-3xl p-6 md:p-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-paper/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-ink-line-2 shrink-0">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover bg-ink-2" />
            </div>
            <div className="text-center lg:text-left space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink-2 border border-ink-line text-[10px] font-medium rounded-full uppercase tracking-[0.18em] text-paper-2">
                <GraduationCap className="w-3.5 h-3.5" /> {currentUser.role}
              </span>
              <h1 className="text-2xl md:text-4xl font-serif font-light tracking-tight"><span className="text-paper">Тавтай морил,</span> <span className="text-paper-2">{currentUser.name}!</span></h1>
              <p className="text-sm text-paper-2 max-w-xl leading-relaxed">
                Герман хэлний сургалтын хувийн танхимд тавтай морилно уу. Таны суралцах зорилго болон одоогийн явцыг доор нэгтгэв.
              </p>
            </div>

            <div className="lg:ml-auto flex items-center gap-3 shrink-0">
              <div className="text-center bg-ink-raise border border-ink-line rounded-xl px-4 py-3">
                <span className="text-[10px] font-medium text-paper-3 uppercase tracking-[0.18em] block mb-0.5">Зорилтот Түвшин</span>
                <p className="text-2xl font-serif font-light text-paper">{currentUser.targetLevel}</p>
              </div>
              <button
                onClick={logoutUser}
                className="px-4 py-3 bg-transparent hover:bg-ink-raise border border-ink-line hover:border-paper/60 text-paper-2 hover:text-paper text-xs font-medium uppercase tracking-[0.15em] rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Гарах
              </button>
            </div>
          </div>
        </div>

        {/* Today's Session & Mistake Log Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Session Card */}
          <div className="lg:col-span-8 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-paper-2" />
              <h2 className="text-xl font-serif font-light text-paper">Өнөөдрийн Даалгавар</h2>
            </div>
            <p className="text-paper-2 text-xs leading-relaxed">
              Суралцах хэвшлийг хадгалахад туслах өнөөдрийн санал болгож буй дасгалууд:
            </p>

            {todaySession && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {/* Reading suggestion */}
                {todaySession.reading ? (
                  <div className="flex items-center justify-between p-4 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-ink-2 border border-ink-line text-paper-2 rounded-lg shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">УНШИХ</p>
                        <p className="text-sm font-bold text-paper truncate">{todaySession.reading.titleMn}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => startActivity('read', todaySession.reading!.id)}
                      className="px-4 py-2 bg-paper text-ink font-medium uppercase tracking-[0.15em] rounded-full text-xs cursor-pointer hover:bg-paper-bright shrink-0"
                    >
                      Эхлэх
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-ink-raise border border-ink-line opacity-40 rounded-xl">
                    <span className="p-2.5 bg-ink-2 text-paper-3 rounded-lg shrink-0 mr-3">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">УНШИХ</p>
                      <p className="text-xs text-paper-2 font-medium">Бүгд дууссан</p>
                    </div>
                  </div>
                )}

                {/* Listening suggestion */}
                {todaySession.listening ? (
                  <div className="flex items-center justify-between p-4 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-ink-2 border border-ink-line text-paper-2 rounded-lg shrink-0">
                        <Headphones className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">СОНСОХ</p>
                        <p className="text-sm font-bold text-paper truncate">{todaySession.listening.titleMn}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => startActivity('listen', todaySession.listening!.id)}
                      className="px-4 py-2 bg-paper text-ink font-medium uppercase tracking-[0.15em] rounded-full text-xs cursor-pointer hover:bg-paper-bright shrink-0"
                    >
                      Эхлэх
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-ink-raise border border-ink-line opacity-40 rounded-xl">
                    <span className="p-2.5 bg-ink-2 text-paper-3 rounded-lg shrink-0 mr-3">
                      <Headphones className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">СОНСОХ</p>
                      <p className="text-xs text-paper-2 font-medium">Бүгд дууссан</p>
                    </div>
                  </div>
                )}

                {/* Speaking suggestion */}
                {todaySession.speaking ? (
                  <div className="flex items-center justify-between p-4 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-ink-2 border border-ink-line text-paper-2 rounded-lg shrink-0">
                        <Mic className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">ЯРИХ</p>
                        <p className="text-sm font-bold text-paper truncate">{todaySession.speaking.titleMn}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => startActivity('speak', todaySession.speaking!.id)}
                      className="px-4 py-2 bg-paper text-ink font-medium uppercase tracking-[0.15em] rounded-full text-xs cursor-pointer hover:bg-paper-bright shrink-0"
                    >
                      Эхлэх
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-ink-raise border border-ink-line opacity-40 rounded-xl">
                    <span className="p-2.5 bg-ink-2 text-paper-3 rounded-lg shrink-0 mr-3">
                      <Mic className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">ЯРИХ</p>
                      <p className="text-xs text-paper-2 font-medium">Бүгд дууссан</p>
                    </div>
                  </div>
                )}

                {/* Vocab review suggestion */}
                {todaySession.dueWordCount > 0 ? (
                  <div className="flex items-center justify-between p-4 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-ink-2 border border-ink-line text-paper-2 rounded-lg shrink-0">
                        <RotateCcw className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">ҮГСИЙН САН</p>
                        <p className="text-sm font-bold text-paper truncate">{todaySession.dueWordCount} үг давтах</p>
                      </div>
                    </div>
                    <button
                      onClick={() => selectTab('vocab')}
                      className="px-4 py-2 bg-paper text-ink font-medium uppercase tracking-[0.15em] rounded-full text-xs cursor-pointer hover:bg-paper-bright shrink-0"
                    >
                      Давтах
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-ink-raise border border-ink-line opacity-40 rounded-xl">
                    <span className="p-2.5 bg-ink-2 text-paper-3 rounded-lg shrink-0 mr-3">
                      <RotateCcw className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]">ҮГСИЙН САН</p>
                      <p className="text-xs text-paper-2 font-medium">Сэргээх үг байхгүй</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mistakes Card */}
          <div className="lg:col-span-4 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-paper-2" />
              <h2 className="text-xl font-serif font-light text-paper">Миний Алдаанууд</h2>
            </div>
            <p className="text-paper-2 text-xs leading-relaxed">
              Дахин давтах алдаатай дасгалууд:
            </p>

            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {unresolvedMistakes.length > 0 ? (
                unresolvedMistakes.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2 transition-colors">
                    <div className="overflow-hidden mr-2">
                      <span className="text-[9px] bg-ink-2 text-paper-2 px-1.5 py-0.5 rounded border border-ink-line uppercase tracking-[0.18em] font-medium">{m.tab === 'read' ? 'Унших' : 'Сонсох'}</span>
                      <p className="text-xs font-bold text-paper truncate mt-1">{m.titleMn}</p>
                    </div>
                    <button
                      onClick={() => startActivity(m.tab, m.itemId)}
                      className="px-3 py-1.5 bg-transparent border border-ink-line hover:border-paper/60 hover:bg-ink-2 text-paper-2 hover:text-paper font-medium uppercase tracking-[0.15em] rounded-lg text-[10px] cursor-pointer transition-colors shrink-0"
                    >
                      Засах
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-paper-3 text-xs font-medium font-sans">
                  ✨ Тэмдэглэгдсэн алдаа байхгүй. Хичээлээ алдаагүй үргэлжлүүлнэ үү!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Broken streak notice — shown once after login when the saved streak collapsed */}
        {brokenStreakNotice !== null && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-ink-raise border border-ink-line rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-paper-2 shrink-0" />
              <p className="text-sm font-medium text-paper-2 leading-relaxed">
                {brokenStreakNotice} өдрийн streak тасарлаа — 2 ба түүнээс олон өдөр алгассан тул 0 болж шинэчлэгдлээ. Өнөөдөр дасгал хийж шинээр эхлүүлээрэй!
              </p>
            </div>
            <button
              onClick={() => setBrokenStreakNotice(null)}
              className="px-4 py-2 bg-transparent border border-ink-line hover:border-paper/60 hover:bg-ink-2 text-paper-2 hover:text-paper font-medium uppercase tracking-[0.15em] rounded-lg text-xs cursor-pointer transition-colors shrink-0 self-end sm:self-auto"
            >
              Ойлголоо
            </button>
          </div>
        )}

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Streak */}
          <div className="bg-ink-raise border border-ink-line rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-ink-2 border border-ink-line flex items-center justify-center text-paper-2">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-paper-3 font-medium uppercase tracking-[0.18em]">Streak</p>
              <h3 className="text-xl font-serif font-light text-paper">{streak} өдөр дараалан</h3>
              <p className="text-[11px] text-paper-2 font-medium">Өдөр бүр зорилгодоо хүрээрэй!</p>
            </div>
          </div>

          {/* Lesson Progress */}
          <div className="bg-ink-raise border border-ink-line rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-ink-2 border border-ink-line flex items-center justify-center text-paper-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <p className="text-xs text-paper-3 font-medium uppercase tracking-[0.18em]">Прогресс</p>
              <h3 className="text-xl font-serif font-light text-paper">{lessonProgress}% дууссан</h3>
              <p className="text-[11px] text-paper-2 font-medium">{completedCount}/{TRACKABLE_ACTIVITY_TOTAL} дасгал</p>
              {/* Progress bar inside card */}
              <div className="w-full h-1.5 bg-ink-2 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-paper rounded-full" style={{ width: `${lessonProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Goals Completed */}
          <div className="bg-ink-raise border border-ink-line rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-ink-2 border border-ink-line flex items-center justify-center text-paper-2">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-paper-3 font-medium uppercase tracking-[0.18em]">Судлагдсан сэдэв</p>
              <h3 className="text-xl font-serif font-light text-paper">{completedCount} дасгал</h3>
              <p className="text-[11px] text-paper-2 font-medium">
                {lastStudyDay ? `Сүүлд: ${lastStudyDay}` : 'Эхний дасгалаа дуусгаарай'}
              </p>
            </div>
          </div>
        </div>

        {billingCard}

        {/* Goal and Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Goal and Learning Curve Chart */}
          <div className="lg:col-span-8 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-light flex items-center gap-2 text-paper mb-2">
                <Target className="w-5 h-5 text-paper-2" /> Суралцах Гол Зорилго
              </h2>
              <div className="bg-ink-raise border border-ink-line rounded-xl p-4 text-sm font-medium text-paper-2 leading-relaxed">
                "{currentUser.learningGoal}"
              </div>
            </div>

            {/* Learning Curve SVG Chart */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-serif font-light flex items-center gap-2 text-paper">
                <Gauge className="w-5 h-5 text-paper-2" /> Суралцах хурд / Давтамжийн муруй (Study Hours)
              </h3>
              <p className="text-paper-2 text-xs leading-relaxed">
                Долоо хоногийн хоногоор тооцсон хичээллэсэн цагийн график. Муруйн хэлбэр хүн бүрийн суралцах хэмнэлээс хамааран өөр байна.
              </p>

              {/* Chart container */}
              <div className="bg-ink border border-ink-line rounded-xl p-4 relative overflow-x-auto">
                <svg className="w-full min-w-[500px] h-[220px]" viewBox="0 0 600 200">
                  {/* Grid Lines */}
                  {gridLines.map((line, i) => (
                    <g key={i}>
                      <line
                        x1="40"
                        y1={line.y}
                        x2="560"
                        y2={line.y}
                        stroke="#262626"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="10"
                        y={line.y + 4}
                        fill="#66635e"
                        className="text-[10px] font-serif font-bold"
                      >
                        {line.label}
                      </text>
                    </g>
                  ))}

                  {/* Shaded Area Under Line */}
                  <path
                    d={`M ${points[0].x} 160 ${linePath} L ${points[points.length - 1].x} 160 Z`}
                    fill="url(#chart-glow)"
                    className="opacity-20"
                  />

                  {/* Line Connection */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#ededeb"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points & Labels */}
                  {points.map((p, i) => (
                    <g key={i} className="group/point">
                      {/* Hours Bubble Label on top of point */}
                      <text
                        x={p.x}
                        y={p.y - 12}
                        textAnchor="middle"
                        fill="#9b9893"
                        className="text-[11px] font-serif font-bold transition-all"
                      >
                        {p.hours}ц
                      </text>

                      {/* Glowing Dot */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="6"
                        fill="#ededeb"
                        stroke="#0a0a0a"
                        strokeWidth="2"
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="12"
                        fill="#ededeb"
                        fillOpacity="0.15"
                        stroke="none"
                        className="animate-pulse"
                      />

                      {/* Day Label at bottom */}
                      <text
                        x={p.x}
                        y="182"
                        textAnchor="middle"
                        fill="#9b9893"
                        className="text-[11px] font-bold"
                      >
                        {p.day}
                      </text>
                    </g>
                  ))}

                  {/* Definitions for Gradients */}
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ededeb" />
                      <stop offset="100%" stopColor="#ededeb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Lesson Path: Curriculum structure */}
            <div className="space-y-4 pt-6 border-t border-ink-line">
              <h3 className="text-xl font-serif font-light flex items-center gap-2 text-paper">
                <Shield className="w-5 h-5 text-paper-2" /> Сургалтын зам ({currentUser.targetLevel})
              </h3>
              <p className="text-paper-2 text-xs leading-relaxed font-sans">
                Түвшин бүрт тохирсон сэдвүүд. Хэсэг бүрийг {Math.round(UNIT_PASS_RATIO * 100)}%-иас дээш амжилттай дуусгаснаар дараагийн хэсэг нээгдэнэ.
              </p>

              <div className="space-y-4 mt-3">
                {currentUnits.map((unit, idx) => {
                  const unlocked = isUnitUnlocked(currentUnits, idx, new Set(completedActivityIds));
                  const progress = unitProgress(unit, new Set(completedActivityIds));
                  const passed = isUnitPassed(unit, new Set(completedActivityIds));
                  const percent = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

                  return (
                    <div
                      key={idx}
                      className={`relative overflow-hidden rounded-2xl border transition-all p-5 ${
                        unlocked
                          ? passed
                            ? 'bg-ink-2 border-ink-line-2'
                            : 'bg-ink-raise border border-ink-line hover:border-ink-line-2'
                          : 'bg-ink border border-ink-line opacity-40'
                      }`}
                    >
                      {/* Top Bar of unit card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-light text-sm shrink-0 border ${
                            unlocked
                              ? passed
                                ? 'bg-paper border-paper text-ink'
                                : 'bg-ink-2 border-ink-line-2 text-paper'
                              : 'bg-ink-raise border border-ink-line text-paper-3'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="font-serif font-light text-paper text-base">
                              {unit.title} {passed && ' (Дууссан)'}
                            </h4>
                            <p className="text-xs text-paper-2 font-sans">
                              {progress.done} / {progress.total} дасгал хийсэн ({percent}%)
                            </p>
                          </div>
                        </div>

                        <div>
                          {unlocked ? (
                            passed ? (
                              <span className="text-[11px] bg-paper text-ink px-3 py-1 rounded-full border border-paper font-medium uppercase tracking-[0.15em]">Дууссан</span>
                            ) : (
                              <span className="text-[11px] bg-transparent text-paper px-3 py-1 rounded-full border border-ink-line-2 font-medium uppercase tracking-[0.15em] animate-pulse">Идэвхтэй</span>
                            )
                          ) : (
                            <span className="text-[11px] bg-ink-raise text-paper-3 px-3 py-1 rounded-full border border-ink-line font-medium uppercase tracking-[0.15em]">Түгжигдсэн</span>
                          )}
                        </div>
                      </div>

                      {/* Progress bar inside unit card */}
                      {unlocked && (
                        <div className="w-full h-2 bg-ink-2 border border-ink-line rounded-full overflow-hidden mb-4">
                          <div
                            className="h-full bg-paper transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      )}

                      {/* Activities detail nested inside the unit */}
                      {unlocked && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {unit.activities.map((act, aIdx) => {
                            const isDone = completedActivityIds.includes(act.activityId);
                            const skillNames = {
                              read: 'Унших',
                              listen: 'Сонсох',
                              speak: 'Ярих',
                              write: 'Бичих',
                            };
                            const skillIcons = {
                              read: <BookOpen className="w-3.5 h-3.5" />,
                              listen: <Headphones className="w-3.5 h-3.5" />,
                              speak: <Mic className="w-3.5 h-3.5" />,
                              write: <Edit3 className="w-3.5 h-3.5" />,
                            };
                            return (
                              <button
                                key={aIdx}
                                onClick={() => startActivity(act.tab, act.itemId)}
                                className={`flex items-center justify-between text-left p-3 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                                  isDone
                                    ? 'bg-ink-2 border-ink-line-2 text-paper-2 hover:bg-ink-2'
                                    : 'bg-ink-raise border border-ink-line text-paper hover:border-ink-line-2 hover:bg-ink-2'
                                }`}
                              >
                                <div className="flex items-center gap-2 overflow-hidden mr-2">
                                  <span className={`p-1.5 rounded-lg shrink-0 ${
                                    isDone ? 'bg-paper text-ink' : 'bg-ink-2 text-paper-2'
                                  }`}>
                                    {skillIcons[act.tab]}
                                  </span>
                                  <div className="overflow-hidden text-left">
                                    <p className="text-[10px] text-paper-3 uppercase tracking-[0.18em]">{skillNames[act.tab]}</p>
                                    <p className="font-bold truncate max-w-[180px] text-paper">{act.titleMn}</p>
                                  </div>
                                </div>
                                {isDone ? (
                                  <Check className="w-4 h-4 text-paper shrink-0" />
                                ) : (
                                  <ArrowRight className="w-4 h-4 text-paper-3 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Tailored Suggestions */}
          <div className="lg:col-span-4 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-serif font-light flex items-center gap-2 text-paper mb-2">
                <Lightbulb className="w-5 h-5 text-paper-2" /> Хувийн зөвлөмж
              </h2>
              <p className="text-paper-2 text-xs mb-4 leading-relaxed">
                Таны сонгосон сэдэв болон түвшинд тохируулж манай системээс дараах зөвлөмжүүдийг өгч байна:
              </p>

              <div className="space-y-4">
                {currentUser.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex gap-3 items-start bg-ink-raise p-4 rounded-xl border border-ink-line hover:border-ink-line-2 transition-colors">
                    <span className="w-6 h-6 rounded-full bg-ink-2 border border-ink-line flex items-center justify-center shrink-0 text-paper-2 font-light text-xs mt-0.5 font-serif">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium text-paper-2 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Router */}
            <div className="pt-4 border-t border-ink-line">
              <h3 className="text-xs font-medium text-paper-3 uppercase tracking-[0.18em] mb-3">Хичээл рүү шилжих</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => selectTab('read')}
                  className="py-2.5 px-3 text-center bg-transparent hover:bg-ink-2 border border-ink-line hover:border-paper/60 text-paper-2 hover:text-paper text-xs font-medium uppercase tracking-[0.15em] rounded-lg cursor-pointer transition-colors"
                >
                  Унших дасгал
                </button>
                <button
                  onClick={() => selectTab('listen')}
                  className="py-2.5 px-3 text-center bg-transparent hover:bg-ink-2 border border-ink-line hover:border-paper/60 text-paper-2 hover:text-paper text-xs font-medium uppercase tracking-[0.15em] rounded-lg cursor-pointer transition-colors"
                >
                  Сонсох дасгал
                </button>
                <button
                  onClick={() => selectTab('speak')}
                  className="py-2.5 px-3 text-center bg-paper hover:bg-paper-bright border border-paper text-ink text-xs font-medium uppercase tracking-[0.15em] rounded-lg cursor-pointer transition-colors"
                >
                  Дуут AI Багш
                </button>
                <button
                  onClick={() => selectTab('write')}
                  className="py-2.5 px-3 text-center bg-transparent hover:bg-ink-2 border border-ink-line hover:border-paper/60 text-paper-2 hover:text-paper text-xs font-medium uppercase tracking-[0.15em] rounded-lg cursor-pointer transition-colors"
                >
                  Бичих дасгал
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Тэмцээн ба урилга өөрийн "Найзууд" таб руу нүүсэн — эндээс шууд очно. */}
        <button
          onClick={() => selectTab('friends')}
          className="w-full flex items-center justify-between gap-3 bg-ink-raise border border-ink-line hover:border-ink-line-2 rounded-2xl px-6 py-5 transition-all cursor-pointer text-left"
        >
          <span className="flex items-center gap-3">
            <Swords className="w-5 h-5 text-paper-2" />
            <span>
              <span className="block text-sm font-serif font-light text-paper">Тэмцээн ба урилга</span>
              <span className="block text-xs text-paper-2 mt-0.5 leading-relaxed">
                Найзтайгаа тулалдаж, найзаа уриад долоо хоногийн самбарт өрсөлдөөрэй.
              </span>
            </span>
          </span>
          <ChevronRight className="w-5 h-5 text-paper-3" />
        </button>
      </div>
    );
}
