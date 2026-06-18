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

    const completedCount = completedActivityIds.length;
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
      <div className="w-full pb-24 space-y-8 animate-fade-in text-white select-none">
        {/* Welcome Header Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-900/30 to-teal-900/30 border-2 border-white/10 rounded-3xl p-6 md:p-8 block-shadow">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-amber-500/50 shadow-lg shrink-0">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover bg-slate-800" />
            </div>
            <div className="text-center lg:text-left space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/60 border border-amber-500/30 text-[10px] font-black font-space rounded-full uppercase tracking-wider text-amber-300">
                <GraduationCap className="w-3.5 h-3.5" /> {currentUser.role}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Тавтай морил, {currentUser.name}!</h1>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed font-semibold">
                Герман хэлний сургалтын хувийн танхимд тавтай морилно уу. Таны суралцах зорилго болон одоогийн явцыг доор нэгтгэв.
              </p>
            </div>

            <div className="lg:ml-auto flex items-center gap-3 shrink-0">
              <div className="text-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 block-shadow">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-space block mb-0.5">Зорилтот Түвшин</span>
                <p className="text-2xl font-black text-secondary">{currentUser.targetLevel}</p>
              </div>
              <button
                onClick={logoutUser}
                className="px-4 py-3 bg-red-950/20 hover:bg-red-900/30 border border-red-500/30 hover:border-red-500/50 text-red-300 text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Гарах
              </button>
            </div>
          </div>
        </div>

        {/* Today's Session & Mistake Log Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Today's Session Card */}
          <div className="lg:col-span-8 bg-white/5 border border-amber-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 animate-bounce" />
              <h2 className="text-xl font-extrabold text-amber-300 font-space">Өнөөдрийн Даалгавар</h2>
            </div>
            <p className="text-slate-400 text-xs font-semibold">
              Суралцах хэвшлийг хадгалахад туслах өнөөдрийн санал болгож буй дасгалууд:
            </p>

            {todaySession && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {/* Reading suggestion */}
                {todaySession.reading ? (
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-teal-500/10 text-teal-400 rounded-lg shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-teal-400 font-bold uppercase font-space">УНШИХ</p>
                        <p className="text-sm font-bold text-white truncate">{todaySession.reading.titleMn}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => startActivity('read', todaySession.reading!.id)}
                      className="px-4 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs cursor-pointer hover:opacity-90 shrink-0"
                    >
                      Эхлэх
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-white/5 border border-white/5 opacity-55 rounded-xl">
                    <span className="p-2.5 bg-slate-800 text-slate-500 rounded-lg shrink-0 mr-3">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase font-space">УНШИХ</p>
                      <p className="text-xs text-slate-400 font-medium">Бүгд дууссан</p>
                    </div>
                  </div>
                )}

                {/* Listening suggestion */}
                {todaySession.listening ? (
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                        <Headphones className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-amber-400 font-bold uppercase font-space">СОНСОХ</p>
                        <p className="text-sm font-bold text-white truncate">{todaySession.listening.titleMn}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => startActivity('listen', todaySession.listening!.id)}
                      className="px-4 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs cursor-pointer hover:opacity-90 shrink-0"
                    >
                      Эхлэх
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-white/5 border border-white/5 opacity-55 rounded-xl">
                    <span className="p-2.5 bg-slate-800 text-slate-500 rounded-lg shrink-0 mr-3">
                      <Headphones className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase font-space">СОНСОХ</p>
                      <p className="text-xs text-slate-400 font-medium">Бүгд дууссан</p>
                    </div>
                  </div>
                )}

                {/* Speaking suggestion */}
                {todaySession.speaking ? (
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-teal-500/10 text-teal-400 rounded-lg shrink-0">
                        <Mic className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-teal-400 font-bold uppercase font-space">ЯРИХ</p>
                        <p className="text-sm font-bold text-white truncate">{todaySession.speaking.titleMn}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => startActivity('speak', todaySession.speaking!.id)}
                      className="px-4 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs cursor-pointer hover:opacity-90 shrink-0"
                    >
                      Эхлэх
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-white/5 border border-white/5 opacity-55 rounded-xl">
                    <span className="p-2.5 bg-slate-800 text-slate-500 rounded-lg shrink-0 mr-3">
                      <Mic className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase font-space">ЯРИХ</p>
                      <p className="text-xs text-slate-400 font-medium">Бүгд дууссан</p>
                    </div>
                  </div>
                )}

                {/* Vocab review suggestion */}
                {todaySession.dueWordCount > 0 ? (
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden mr-2">
                      <span className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                        <RotateCcw className="w-5 h-5" />
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-amber-400 font-bold uppercase font-space">ҮГСИЙН САН</p>
                        <p className="text-sm font-bold text-white truncate">{todaySession.dueWordCount} үг давтах</p>
                      </div>
                    </div>
                    <button
                      onClick={() => selectTab('vocab')}
                      className="px-4 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs cursor-pointer hover:opacity-90 shrink-0"
                    >
                      Давтах
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-white/5 border border-white/5 opacity-55 rounded-xl">
                    <span className="p-2.5 bg-slate-800 text-slate-500 rounded-lg shrink-0 mr-3">
                      <RotateCcw className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase font-space">ҮГСИЙН САН</p>
                      <p className="text-xs text-slate-400 font-medium font-space">Сэргээх үг байхгүй</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mistakes Card */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400 animate-pulse" />
              <h2 className="text-xl font-extrabold text-red-300 font-space">Миний Алдаанууд</h2>
            </div>
            <p className="text-slate-400 text-xs font-semibold">
              Дахин давтах алдаатай дасгалууд:
            </p>

            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {unresolvedMistakes.length > 0 ? (
                unresolvedMistakes.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-red-950/20 border border-red-500/20 rounded-xl hover:border-red-500/40 transition-colors">
                    <div className="overflow-hidden mr-2">
                      <span className="text-[9px] font-space bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 uppercase font-black">{m.tab === 'read' ? 'Унших' : 'Сонсох'}</span>
                      <p className="text-xs font-bold text-white truncate mt-1">{m.titleMn}</p>
                    </div>
                    <button
                      onClick={() => startActivity(m.tab, m.itemId)}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-650 text-white font-bold rounded-lg text-[10px] cursor-pointer transition-colors shrink-0"
                    >
                      Засах
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs font-bold font-sans">
                  ✨ Тэмдэглэгдсэн алдаа байхгүй. Хичээлээ алдаагүй үргэлжлүүлнэ үү!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Broken streak notice — shown once after login when the saved streak collapsed */}
        {brokenStreakNotice !== null && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-orange-500/10 border-2 border-orange-500/40 rounded-2xl p-4 block-shadow">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-slate-500 shrink-0" />
              <p className="text-sm font-bold text-orange-200">
                {brokenStreakNotice} өдрийн streak тасарлаа — 2 ба түүнээс олон өдөр алгассан тул 0 болж шинэчлэгдлээ. Өнөөдөр дасгал хийж шинээр эхлүүлээрэй!
              </p>
            </div>
            <button
              onClick={() => setBrokenStreakNotice(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors shrink-0 self-end sm:self-auto"
            >
              Ойлголоо
            </button>
          </div>
        )}

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Streak */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 block-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-6 h-6 fill-orange-500/20" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase font-space">Streak</p>
              <h3 className="text-xl font-black">{streak} өдөр дараалан</h3>
              <p className="text-[11px] text-orange-300 font-bold">Өдөр бүр зорилгодоо хүрээрэй!</p>
            </div>
          </div>

          {/* Lesson Progress */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 block-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <p className="text-xs text-slate-400 font-bold uppercase font-space">Прогресс</p>
              <h3 className="text-xl font-black">{lessonProgress}% дууссан</h3>
              <p className="text-[11px] text-amber-300 font-bold">{completedCount}/{TRACKABLE_ACTIVITY_TOTAL} дасгал</p>
              {/* Progress bar inside card */}
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${lessonProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Goals Completed */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 block-shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase font-space">Судлагдсан сэдэв</p>
              <h3 className="text-xl font-black">{completedCount} дасгал</h3>
              <p className="text-[11px] text-teal-300 font-bold">
                {lastStudyDay ? `Сүүлд: ${lastStudyDay}` : 'Эхний дасгалаа дуусгаарай'}
              </p>
            </div>
          </div>
        </div>

        {billingCard}

        {/* Goal and Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Goal and Learning Curve Chart */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-6">
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2 text-amber-300 mb-2 font-sans">
                <Target className="w-5 h-5" /> Суралцах Гол Зорилго
              </h2>
              <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 text-sm font-bold text-amber-200">
                "{currentUser.learningGoal}"
              </div>
            </div>

            {/* Learning Curve SVG Chart */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-extrabold flex items-center gap-2 text-teal-300">
                <Gauge className="w-5 h-5 text-teal-400" /> Суралцах хурд / Давтамжийн муруй (Study Hours)
              </h3>
              <p className="text-slate-400 text-xs font-semibold">
                Долоо хоногийн хоногоор тооцсон хичээллэсэн цагийн график. Муруйн хэлбэр хүн бүрийн суралцах хэмнэлээс хамааран өөр байна.
              </p>

              {/* Chart container */}
              <div className="bg-slate-950/60 border border-white/5 rounded-xl p-4 relative overflow-x-auto">
                <svg className="w-full min-w-[500px] h-[220px]" viewBox="0 0 600 200">
                  {/* Grid Lines */}
                  {gridLines.map((line, i) => (
                    <g key={i}>
                      <line
                        x1="40"
                        y1={line.y}
                        x2="560"
                        y2={line.y}
                        className="stroke-white/10"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="10"
                        y={line.y + 4}
                        className="fill-slate-500 text-[10px] font-space font-bold"
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
                    className="stroke-amber-400"
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
                        className="fill-amber-300 text-[11px] font-space font-bold transition-all"
                      >
                        {p.hours}ц
                      </text>

                      {/* Glowing Dot */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="6"
                        className="fill-amber-400 stroke-[#020205] stroke-2 shadow-lg"
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="12"
                        className="fill-amber-400/20 stroke-none animate-pulse"
                      />

                      {/* Day Label at bottom */}
                      <text
                        x={p.x}
                        y="182"
                        textAnchor="middle"
                        className="fill-slate-450 text-[11px] font-bold"
                      >
                        {p.day}
                      </text>
                    </g>
                  ))}

                  {/* Definitions for Gradients */}
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Lesson Path: Curriculum structure */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-xl font-extrabold flex items-center gap-2 text-amber-300">
                <Shield className="w-5 h-5 text-amber-400" /> Сургалтын зам ({currentUser.targetLevel})
              </h3>
              <p className="text-slate-400 text-xs font-semibold font-sans">
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
                      className={`relative overflow-hidden rounded-2xl border transition-all p-5 block-shadow ${
                        unlocked
                          ? passed
                            ? 'bg-amber-950/20 border-amber-500/40'
                            : 'bg-white/5 border border-white/10 hover:border-amber-500/30'
                          : 'bg-slate-950/40 border border-white/5 opacity-60'
                      }`}
                    >
                      {/* Top Bar of unit card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black font-space text-sm shrink-0 border ${
                            unlocked
                              ? passed
                                ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                                : 'bg-teal-500/10 border-teal-500 text-teal-400'
                              : 'bg-white/5 border border-white/10 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="font-extrabold text-white text-base font-space">
                              {unit.title} {passed && ' (Дууссан)'}
                            </h4>
                            <p className="text-xs text-slate-400 font-sans">
                              {progress.done} / {progress.total} дасгал хийсэн ({percent}%)
                            </p>
                          </div>
                        </div>

                        <div>
                          {unlocked ? (
                            passed ? (
                              <span className="text-[11px] font-space bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-bold">Дууссан</span>
                            ) : (
                              <span className="text-[11px] font-space bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-500/30 font-bold animate-pulse">Идэвхтэй</span>
                            )
                          ) : (
                            <span className="text-[11px] font-space bg-white/5 text-slate-500 px-3 py-1 rounded-full border border-white/10 font-bold">Түгжигдсэн</span>
                          )}
                        </div>
                      </div>

                      {/* Progress bar inside unit card */}
                      {unlocked && (
                        <div className="w-full h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden mb-4">
                          <div
                            className="h-full bg-primary transition-all duration-300"
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
                                    ? 'bg-amber-950/10 border-amber-500/20 text-slate-300 hover:bg-amber-950/20'
                                    : 'bg-white/5 border border-white/10 text-white hover:border-amber-500/40 hover:bg-white/10'
                                }`}
                              >
                                <div className="flex items-center gap-2 overflow-hidden mr-2">
                                  <span className={`p-1.5 rounded-lg shrink-0 ${
                                    isDone ? 'bg-amber-500/10 text-amber-400' : 'bg-white/5 text-slate-300'
                                  }`}>
                                    {skillIcons[act.tab]}
                                  </span>
                                  <div className="overflow-hidden text-left">
                                    <p className="text-[10px] text-slate-400 uppercase font-space">{skillNames[act.tab]}</p>
                                    <p className="font-bold truncate max-w-[180px] text-white">{act.titleMn}</p>
                                  </div>
                                </div>
                                {isDone ? (
                                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                                ) : (
                                  <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
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
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2 text-teal-300 mb-2 font-sans">
                <Lightbulb className="w-5 h-5 text-teal-400" /> Хувийн зөвлөмж
              </h2>
              <p className="text-slate-450 text-xs mb-4 font-semibold">
                Таны сонгосон сэдэв болон түвшинд тохируулж манай системээс дараах зөвлөмжүүдийг өгч байна:
              </p>

              <div className="space-y-4">
                {currentUser.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/15 block-shadow hover:border-teal-500/30 transition-colors">
                    <span className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 text-teal-400 font-bold text-xs mt-0.5 font-space">
                      {i + 1}
                    </span>
                    <p className="text-sm font-bold text-slate-205 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Router */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-3 font-space">Хичээл рүү шилжих</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => selectTab('read')}
                  className="py-2.5 px-3 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Унших дасгал
                </button>
                <button
                  onClick={() => selectTab('listen')}
                  className="py-2.5 px-3 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Сонсох дасгал
                </button>
                <button
                  onClick={() => selectTab('speak')}
                  className="py-2.5 px-3 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-lg cursor-pointer transition-colors animate-pulse text-amber-300"
                >
                  Дуут AI Багш
                </button>
                <button
                  onClick={() => selectTab('write')}
                  className="py-2.5 px-3 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-lg cursor-pointer transition-colors"
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
          className="w-full flex items-center justify-between gap-3 bg-white/5 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl px-6 py-5 transition-all cursor-pointer text-left block-shadow backdrop-blur-md"
        >
          <span className="flex items-center gap-3">
            <Swords className="w-5 h-5 text-amber-400" />
            <span>
              <span className="block text-sm font-extrabold text-amber-300">Тэмцээн ба урилга</span>
              <span className="block text-xs text-slate-400 mt-0.5">
                Найзтайгаа тулалдаж, найзаа уриад долоо хоногийн самбарт өрсөлдөөрэй.
              </span>
            </span>
          </span>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>
      </div>
    );
}
