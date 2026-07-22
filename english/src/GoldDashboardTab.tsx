import React, { useMemo, useState } from 'react';
import {
  Flame, Settings, LogIn, LogOut, Target, Zap, XCircle, CheckCircle, Award,
  BookOpen, Headphones, Edit3, Mic, RotateCcw, Gauge, Lightbulb, Shield,
  Check, ArrowRight, TrendingUp, Sparkles, GraduationCap,
} from 'lucide-react';
import { useEnglishStats } from './stats';
import EnglishLeaderboard from './EnglishLeaderboard';
import EnglishPlacementTest from './EnglishPlacementTest';
import { GoldBillingCard } from '../../frontend/src/components/GoldBillingCard';
import { useEnglishPayments } from './useEnglishPayments';
import { canAccessAllContent, effectivePlan, isFounder, type PlanId } from '../../frontend/src/plans';
import type { UserProfile } from '../../frontend/src/profiles';
import {
  buildEnglishToday, resolveEnglishMistakes, englishProgressPercent, EN_TRACKABLE_TOTAL,
  buildEnglishUnits, enUnitProgress, enUnitPassed, enUnitUnlocked, EN_UNIT_PASS_RATIO,
  buildEnglishCurve, englishSuggestions, EN_LEVEL_ORDER,
} from './englishLearning';
import type { EnSkill } from './englishLearning';
import type { DashDest } from './DashboardTab';

const SKILL_ICON: Record<EnSkill, React.ReactNode> = {
  read: <BookOpen className="w-5 h-5" />,
  listen: <Headphones className="w-5 h-5" />,
  write: <Edit3 className="w-5 h-5" />,
  speak: <Mic className="w-5 h-5" />,
};
const SKILL_LABEL: Record<EnSkill, string> = {
  read: 'READING', listen: 'LISTENING', write: 'WRITING', speak: 'SPEAKING',
};
const SKILL_TONE: Record<EnSkill, string> = {
  read: 'bg-teal-500/10 text-teal-400', listen: 'bg-amber-500/10 text-amber-400',
  write: 'bg-teal-500/10 text-teal-400', speak: 'bg-amber-500/10 text-amber-400',
};

export default function GoldDashboardTab({ onNavigate }: { onNavigate?: (dest: DashDest) => void }) {
  const {
    profile, streak, enabled, openSettings, logout, requireAccount,
    setEnglishLevel, saveEnglishPlacement, skipEnglishPlacement, applyProfile,
  } = useEnglishStats();

  // Billing: merge confirmed server billing into local state (server-owned).
  const applyBilling = (billing: NonNullable<UserProfile['billing']>) => {
    if (!profile) return;
    applyProfile({ ...profile, billing: { ...profile.billing, ...billing } });
  };
  const pay = useEnglishPayments(profile, applyBilling);

  const targetLevel = profile?.targetLevelEn || 'A1';
  const completedIds = profile?.completedActivityIdsEn ?? [];
  // Exclude `unit:` ratchet facts (audit fix 7) — they are not activities.
  const completedCount = new Set(completedIds.filter((id) => !id.startsWith('unit:'))).size;

  // First-run placement: a real account with no level chosen and not dismissed.
  const needsPlacement =
    enabled && !profile?.targetLevelEn && !profile?.placementEn && profile?.placementPendingEn !== false;
  const [showPlacement, setShowPlacement] = useState(false);
  const placementOpen = showPlacement || needsPlacement;

  const today = useMemo(() => buildEnglishToday(targetLevel, completedIds), [targetLevel, completedIds]);
  const mistakes = useMemo(() => resolveEnglishMistakes(profile?.mistakeIdsEn ?? []), [profile?.mistakeIdsEn]);
  const units = useMemo(() => buildEnglishUnits(targetLevel), [targetLevel]);
  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);
  const progress = englishProgressPercent(completedIds);
  const curve = useMemo(() => buildEnglishCurve(profile?.studySecondsByDateEn), [profile?.studySecondsByDateEn]);
  const suggestions = useMemo(
    () => englishSuggestions(targetLevel, profile?.learningGoal ?? ''),
    [targetLevel, profile?.learningGoal],
  );

  const name = profile?.name || 'Зочин';
  const avatar = profile?.avatar || '';
  const lastDay = (profile?.studyDaysEn ?? []).slice().sort().at(-1);

  const founderAccess = isFounder(profile);
  const effective = effectivePlan(profile);
  const userPlan: PlanId | 'founder' = founderAccess ? 'founder' : (effective as PlanId);

  // --- Study-hours chart geometry (mirrors the German ProfileTab chart) ------
  const maxHours = Math.max(...curve.map((c) => c.hours), 2);
  const points = curve.map((c, i) => ({
    x: 40 + i * (520 / 6),
    y: 160 - (c.hours / maxHours) * 120,
    day: c.day,
    hours: c.hours,
  }));
  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((r) => ({
    y: 160 - r * 120,
    label: (r * maxHours).toFixed(1) + 'ц',
  }));

  // First-run / retake placement overlay takes over the screen.
  if (placementOpen) {
    return (
      <EnglishPlacementTest
        hasAllContent={canAccessAllContent(profile)}
        onUpgrade={openSettings}
        onStartLesson={(result, dest) => {
          saveEnglishPlacement(result);
          setShowPlacement(false);
          onNavigate?.(dest);
        }}
        onFinish={(result) => { saveEnglishPlacement(result); setShowPlacement(false); }}
        onSkip={() => { skipEnglishPlacement(); setShowPlacement(false); }}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 pb-24 space-y-8 animate-fade-in text-white select-none">
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900/30 to-teal-900/30 border-2 border-white/10 rounded-3xl p-6 md:p-8 block-shadow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-amber-500/50 shadow-lg shrink-0 bg-slate-800">
            {avatar && <img src={avatar} alt={name} className="w-full h-full object-cover" />}
          </div>
          <div className="text-center lg:text-left space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/60 border border-amber-500/30 text-[10px] font-black font-space rounded-full uppercase tracking-wider text-amber-300">
              <GraduationCap className="w-3.5 h-3.5" /> Англи хэл · IELTS / SAT
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Тавтай морил, {name}!</h1>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed font-semibold">Англи хэлний сургалтын хувийн танхим. Таны түвшин, өнөөдрийн даалгавар, явц энд нэгтгэгдэв.</p>
          </div>
          <div className="lg:ml-auto flex items-center gap-3 shrink-0">
            <div className="text-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 block-shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-space block mb-0.5">Түвшин</span>
              <p className="text-2xl font-black text-secondary">{targetLevel}</p>
            </div>
            {enabled && <button onClick={openSettings} className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 text-slate-400 hover:text-white text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"><Settings className="w-4 h-4" /> Тохиргоо</button>}
            <button onClick={logout} className="px-4 py-3 bg-red-950/20 hover:bg-red-900/30 border border-red-500/30 hover:border-red-500/50 text-red-300 text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"><LogOut className="w-4 h-4" /> Гарах</button>
          </div>
        </div>
      </section>

      {!enabled && <section className="rounded-2xl bg-white/5 border border-white/10 p-5 flex items-center gap-3 block-shadow"><LogIn className="w-5 h-5 text-amber-400 shrink-0" /><p className="text-sm text-slate-400 font-semibold">Бүртгүүлбэл streak, явц, оноо чинь хадгалагдаж, түвшин тогтоох тест өгөн хичээлийн зам гарна.</p></section>}

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white/5 border border-amber-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-4">
          <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400 animate-bounce" /><h2 className="text-xl font-extrabold text-amber-300 font-space">Өнөөдрийн даалгавар</h2></div>
          <p className="text-slate-400 text-xs font-semibold">Өнөөдөр санал болгож буй дасгалууд:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <TodayCell skill="read" title={today.reading?.title} onGo={() => onNavigate?.('read')} />
            <TodayCell skill="listen" title={today.listening?.title} onGo={() => onNavigate?.('listen')} />
            <TodayCell skill="write" title={today.writing?.title} onGo={() => onNavigate?.('write')} />
            <TodayCell skill="speak" title={today.speaking?.title} onGo={() => onNavigate?.('speak')} />
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all md:col-span-2">
              <div className="flex items-center gap-3 overflow-hidden mr-2"><span className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0"><RotateCcw className="w-5 h-5" /></span><div className="overflow-hidden"><p className="text-[10px] text-amber-400 font-bold uppercase font-space">VOCABULARY</p><p className="text-sm font-bold text-white truncate">{today.vocabCount} үг ({targetLevel}) сурах</p></div></div>
              <button onClick={() => onNavigate?.('vocab')} className="px-4 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs cursor-pointer hover:opacity-90 shrink-0">Эхлэх</button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-4">
          <div className="flex items-center gap-2"><XCircle className="w-5 h-5 text-red-400 animate-pulse" /><h2 className="text-xl font-extrabold text-red-300 font-space">Миний алдаанууд</h2></div>
          <p className="text-slate-400 text-xs font-semibold">Дахин давтах алдаатай дасгалууд:</p>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {mistakes.length > 0 ? mistakes.map((m, i) => <div key={i} className="flex items-center justify-between p-3 bg-red-950/20 border border-red-500/20 rounded-xl hover:border-red-500/40 transition-colors"><div className="overflow-hidden mr-2"><span className="text-[9px] font-space bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 uppercase font-black">{m.skill === 'read' ? 'Reading' : 'Listening'}</span><p className="text-xs font-bold text-white truncate mt-1">{m.title}</p></div><button onClick={() => onNavigate?.(m.skill)} className="px-3 py-1.5 bg-red-500 hover:bg-red-650 text-white font-bold rounded-lg text-[10px] cursor-pointer transition-colors shrink-0">Засах</button></div>) : <div className="text-center py-6 text-slate-500 text-xs font-bold">✨ Тэмдэглэгдсэн алдаа байхгүй. Сайн байна!</div>}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Flame} label="Streak" value={`${streak} өдөр дараалан`} sub="Өдөр бүр хичээллээрэй!" tone="orange" />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 block-shadow flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400"><CheckCircle className="w-6 h-6" /></div><div className="flex-grow"><p className="text-xs text-slate-400 font-bold uppercase font-space">Прогресс</p><h3 className="text-xl font-black">{progress}% дууссан</h3><p className="text-[11px] text-amber-300 font-bold">{completedCount}/{EN_TRACKABLE_TOTAL} дасгал</p><div className="w-full h-1.5 bg-white/5 rounded-full mt-1.5 overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${progress}%` }} /></div></div></div>
        <StatCard icon={Award} label="Судалсан" value={`${completedCount} дасгал`} sub={lastDay ? `Сүүлд: ${lastDay}` : 'Эхний дасгалаа эхлүүлээрэй'} tone="teal" />
      </section>

      {enabled && profile && <GoldBillingCard currentUser={profile} billingInterval={pay.billingInterval} setBillingInterval={pay.setBillingInterval} bylCheckout={pay.bylCheckout} setBylCheckout={pay.setBylCheckout} checkBylPaymentStatus={pay.checkBylPaymentStatus} dummyInvoice={pay.dummyInvoice} payDummyInvoice={pay.payDummyInvoice} manualPromoCode={pay.manualPromoCode} setManualPromoCode={pay.setManualPromoCode} manualPromoError={pay.manualPromoError} manualPromoLoading={pay.manualPromoLoading} handleRedeemManualPromo={pay.handleRedeemManualPromo} handleRemoveMyPromo={pay.handleRemoveMyPromo} myPromo={pay.myPromo} paymentActionLoading={pay.paymentActionLoading} paymentMessage={pay.paymentMessage} setPaymentMessage={pay.setPaymentMessage} paymentMethods={pay.paymentMethods} paymentMethodsLoading={pay.paymentMethodsLoading} paymentStatusLoading={pay.paymentStatusLoading} startCheckout={pay.startCheckout} founderAccess={founderAccess} userPlan={userPlan} />}

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-6">
          {profile?.learningGoal && <div><h2 className="text-xl font-extrabold flex items-center gap-2 text-amber-300 mb-2"><Target className="w-5 h-5" /> Суралцах гол зорилго</h2><div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 text-sm font-bold text-amber-200">"{profile.learningGoal}"</div></div>}
          <div className="space-y-3 pt-2"><h3 className="text-base font-extrabold flex items-center gap-2 text-teal-300"><Gauge className="w-5 h-5 text-teal-400" /> Хичээллэсэн цаг (энэ долоо хоног)</h3><p className="text-slate-400 text-xs font-semibold">Долоо хоногийн өдрөөр тооцсон хичээллэсэн цагийн график.</p><div className="bg-slate-950/60 border border-white/5 rounded-xl p-4 relative overflow-x-auto"><svg className="w-full min-w-[500px] h-[220px]" viewBox="0 0 600 200">{gridLines.map((line, i) => <g key={i}><line x1="40" y1={line.y} x2="560" y2={line.y} className="stroke-white/10" strokeDasharray="4 4" /><text x="10" y={line.y + 4} className="fill-slate-500 text-[10px] font-space font-bold">{line.label}</text></g>)}<path d={`M ${points[0].x} 160 ${linePath} L ${points[points.length - 1].x} 160 Z`} fill="url(#en-chart-glow)" className="opacity-20" /><path d={linePath} fill="none" className="stroke-amber-400" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />{points.map((p, i) => <g key={i}><text x={p.x} y={p.y - 12} textAnchor="middle" className="fill-amber-300 text-[11px] font-space font-bold">{p.hours}ц</text><circle cx={p.x} cy={p.y} r="6" className="fill-amber-400 stroke-[#020205] stroke-2" /><circle cx={p.x} cy={p.y} r="12" className="fill-amber-400/20 stroke-none animate-pulse" /><text x={p.x} y="182" textAnchor="middle" className="fill-slate-500 text-[11px] font-bold">{p.day}</text></g>)}<defs><linearGradient id="en-chart-glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#c084fc" stopOpacity="0" /></linearGradient></defs></svg></div></div>
          <div className="space-y-4 pt-6 border-t border-white/10"><h3 className="text-xl font-extrabold flex items-center gap-2 text-amber-300"><Shield className="w-5 h-5 text-amber-400" /> Сургалтын зам ({targetLevel})</h3><p className="text-slate-400 text-xs font-semibold">Хэсэг бүрийг {Math.round(EN_UNIT_PASS_RATIO * 100)}%-иас дээш дуусгаснаар дараагийнх нээгдэнэ.</p><div className="space-y-4 mt-3">{units.map((unit, idx) => { const unlocked = enUnitUnlocked(units, idx, completedSet); const prog = enUnitProgress(unit, completedSet); const passed = enUnitPassed(unit, completedSet); const percent = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0; return <div key={idx} className={`relative overflow-hidden rounded-2xl border transition-all p-5 block-shadow ${unlocked ? passed ? 'bg-amber-950/20 border-amber-500/40' : 'bg-white/5 border border-white/10 hover:border-amber-500/30' : 'bg-slate-950/40 border border-white/5 opacity-60'}`}><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3"><div className="flex items-center gap-2"><span className={`w-8 h-8 rounded-full flex items-center justify-center font-black font-space text-sm shrink-0 border ${unlocked ? passed ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-teal-500/10 border-teal-500 text-teal-400' : 'bg-white/5 border border-white/10 text-slate-500'}`}>{idx + 1}</span><div><h4 className="font-extrabold text-white text-base font-space">{unit.title}{passed && ' (Дууссан)'}</h4><p className="text-xs text-slate-400">{prog.done}/{prog.total} дасгал ({percent}%)</p></div></div><span className={`text-[11px] font-space px-3 py-1 rounded-full border font-bold ${unlocked ? passed ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-teal-500/20 text-teal-300 border-teal-500/30 animate-pulse' : 'bg-white/5 text-slate-500 border-white/10'}`}>{unlocked ? passed ? 'Дууссан' : 'Идэвхтэй' : 'Түгжээтэй'}</span></div>{unlocked && <><div className="w-full h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden mb-4"><div className="h-full bg-primary transition-all duration-300" style={{ width: `${percent}%` }} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">{unit.activities.map((act, aIdx) => { const done = completedSet.has(act.activityId); return <button key={aIdx} onClick={() => { if (!requireAccount()) return; onNavigate?.(act.skill); }} className={`flex items-center justify-between text-left p-3 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${done ? 'bg-amber-950/10 border-amber-500/20 text-slate-300 hover:bg-amber-950/20' : 'bg-white/5 border border-white/10 text-white hover:border-amber-500/40 hover:bg-white/10'}`}><div className="flex items-center gap-2 overflow-hidden mr-2"><span className={`p-1.5 rounded-lg shrink-0 ${done ? 'bg-amber-500/10 text-amber-400' : 'bg-white/5 text-slate-300'}`}>{SKILL_ICON[act.skill]}</span><div className="overflow-hidden"><p className="text-[10px] text-slate-400 uppercase font-space">{SKILL_LABEL[act.skill]}</p><p className="font-bold truncate max-w-[180px] text-white">{act.title}</p></div></div>{done ? <Check className="w-4 h-4 text-amber-400 shrink-0" /> : <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />}</button>; })}</div></>}</div>; })}</div></div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-4"><h2 className="text-xl font-extrabold flex items-center gap-2 text-teal-300"><Lightbulb className="w-5 h-5 text-teal-400" /> Хувийн зөвлөмж</h2><p className="text-slate-400 text-xs font-semibold">Таны түвшин, зорилгод тулгуурласан зөвлөмжүүд:</p><div className="space-y-4">{suggestions.map((s, i) => <div key={i} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/15 block-shadow hover:border-teal-500/30 transition-colors"><span className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 text-teal-400 font-bold text-xs mt-0.5 font-space">{i + 1}</span><p className="text-sm font-bold text-slate-300 leading-relaxed">{s}</p></div>)}</div></div>
          {enabled && <div className="bg-white/5 border border-white/10 rounded-2xl p-6 block-shadow space-y-4"><h3 className="text-base font-extrabold flex items-center gap-2 text-amber-300 font-space"><Target className="w-5 h-5 text-amber-400" /> Миний түвшин</h3><p className="text-slate-400 text-xs font-semibold">Түвшингээ гараар сонгох эсвэл түвшин тогтоох тест дахин өгөх.</p><div className="grid grid-cols-6 gap-1.5">{EN_LEVEL_ORDER.map((lvl) => <button key={lvl} onClick={() => setEnglishLevel(lvl)} className={`py-2 rounded-lg text-xs font-black border transition-all ${targetLevel === lvl ? 'bg-amber-500 text-white border-amber-500' : 'bg-white/5 border-white/10 text-slate-300 hover:border-amber-500/50'}`}>{lvl}</button>)}</div><button onClick={() => { if (!requireAccount()) return; setShowPlacement(true); }} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary hover:opacity-90 px-5 py-3.5 text-sm font-bold uppercase tracking-[0.12em] shadow-lg shadow-primary/20 transition-all"><TrendingUp className="w-5 h-5" /> Түвшин тогтоох тест дахин өгөх</button>{profile?.placementEn && <p className="text-[11px] text-slate-500 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Сүүлийн тест: {profile.placementEn.level} ({profile.placementEn.totalCorrect}/{profile.placementEn.totalQuestions})</p>}</div>}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 block-shadow"><h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 font-space">Хичээл рүү шилжих</h3><div className="grid grid-cols-2 gap-2"><QuickBtn label="Reading" onClick={() => onNavigate?.('read')} /><QuickBtn label="Listening" onClick={() => onNavigate?.('listen')} /><QuickBtn label="Vocabulary" onClick={() => onNavigate?.('vocab')} primary /><QuickBtn label="Tests" onClick={() => onNavigate?.('tests')} /></div></div>
        </div>
      </section>
      <EnglishLeaderboard />
    </div>
  );
}

function TodayCell({ skill, title, onGo }: { skill: EnSkill; title?: string; onGo: () => void }) {
  if (!title) return <div className="flex items-center p-4 bg-white/5 border border-white/5 opacity-55 rounded-xl"><span className="p-2.5 bg-slate-800 text-slate-500 rounded-lg shrink-0 mr-3">{SKILL_ICON[skill]}</span><div><p className="text-[10px] text-slate-500 font-bold uppercase font-space">{SKILL_LABEL[skill]}</p><p className="text-xs text-slate-400 font-medium">Бүгд дууссан</p></div></div>;
  return <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-amber-500/30 transition-all"><div className="flex items-center gap-3 overflow-hidden mr-2"><span className={`p-2.5 rounded-lg shrink-0 ${SKILL_TONE[skill]}`}>{SKILL_ICON[skill]}</span><div className="overflow-hidden"><p className={`text-[10px] font-bold uppercase font-space ${skill === 'read' || skill === 'write' ? 'text-teal-400' : 'text-amber-400'}`}>{SKILL_LABEL[skill]}</p><p className="text-sm font-bold text-white truncate">{title}</p></div></div><button onClick={onGo} className="px-4 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs cursor-pointer hover:opacity-90 shrink-0">Эхлэх</button></div>;
}

function StatCard({ icon: Icon, label, value, sub, tone }: { icon: React.ElementType; label: string; value: string; sub?: string; tone: 'orange' | 'teal' }) {
  const color = tone === 'orange' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-teal-500/10 border-teal-500/30 text-teal-400';
  const subColor = tone === 'orange' ? 'text-orange-300' : 'text-teal-300';
  return <div className="bg-white/5 border border-white/10 rounded-2xl p-6 block-shadow flex items-center gap-4"><div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${color}`}><Icon className="w-6 h-6" /></div><div className="min-w-0"><p className="text-xs text-slate-400 font-bold uppercase font-space">{label}</p><h3 className="text-xl font-black">{value}</h3>{sub && <p className={`text-[11px] font-bold truncate ${subColor}`}>{sub}</p>}</div></div>;
}

function QuickBtn({ label, onClick, primary }: { label: string; onClick: () => void; primary?: boolean }) {
  return <button onClick={onClick} className={`py-2.5 px-3 text-center text-xs font-bold rounded-lg cursor-pointer transition-colors border ${primary ? 'bg-amber-500 hover:bg-amber-400 border-amber-500 text-white' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:border-amber-500/50'}`}>{label}</button>;
}
