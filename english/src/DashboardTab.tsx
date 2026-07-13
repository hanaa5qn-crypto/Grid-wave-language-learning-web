// =============================================================================
// English track — Dashboard tab (German-parity).
// -----------------------------------------------------------------------------
// The English equivalent of the German Profile/Dashboard (frontend/tabs/
// ProfileTab.tsx): a welcome hero, "Today's Session", the mistake log, stat
// cards (streak / progress / covered), the subscription plans card (Pro = Max
// price + promo codes), a study-hours chart, the personalized lesson path +
// advice, and the weekly leaderboard. Driven by the English learning engine and
// the English-only profile fields, plus an adaptive CEFR placement on first run.
// =============================================================================
import React, { useMemo, useState } from 'react';
import {
  Flame, Clock, CalendarCheck, Settings, LogIn, LogOut, Target, Zap, XCircle,
  CheckCircle, Award, BookOpen, Headphones, Edit3, Mic, RotateCcw, Gauge,
  Lightbulb, Shield, Check, ArrowRight, TrendingUp, Sparkles, GraduationCap,
} from 'lucide-react';
import { useEnglishStats } from './stats';
import EnglishLeaderboard from './EnglishLeaderboard';
import EnglishPlacementTest from './EnglishPlacementTest';
import { BillingCard } from '../../frontend/src/components/BillingCard';
import { GoldBillingCard } from '../../frontend/src/components/GoldBillingCard';
import { AuroraBillingCard } from '../../frontend/src/components/AuroraBillingCard';
import { useTheme } from '../../frontend/src/lib/theme';
import { useEnglishPayments } from './useEnglishPayments';
import { canAccessAllContent, effectivePlan, isFounder, type PlanId } from '../../frontend/src/plans';
import type { UserProfile } from '../../frontend/src/profiles';
import {
  buildEnglishToday, resolveEnglishMistakes, englishProgressPercent, EN_TRACKABLE_TOTAL,
  buildEnglishUnits, enUnitProgress, enUnitPassed, enUnitUnlocked, EN_UNIT_PASS_RATIO,
  buildEnglishCurve, englishSuggestions, EN_LEVEL_ORDER,
} from './englishLearning';
import type { EnSkill } from './englishLearning';

export type DashDest = 'read' | 'listen' | 'write' | 'speak' | 'vocab' | 'tests';

const SKILL_ICON: Record<EnSkill, React.ReactNode> = {
  read: <BookOpen className="w-5 h-5" />,
  listen: <Headphones className="w-5 h-5" />,
  write: <Edit3 className="w-5 h-5" />,
  speak: <Mic className="w-5 h-5" />,
};
const SKILL_LABEL: Record<EnSkill, string> = {
  read: 'READING', listen: 'LISTENING', write: 'WRITING', speak: 'SPEAKING',
};

export default function DashboardTab({ onNavigate }: { onNavigate?: (dest: DashDest) => void }) {
  // Gold theme renders the original "Atelier Press" billing markup.
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  const PlanBillingCard = uiTheme === 'gold' ? GoldBillingCard : uiTheme === 'aurora' ? AuroraBillingCard : BillingCard;
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
    <div className={gold || aurora ? "w-full max-w-5xl mx-auto px-4 py-6 pb-24 space-y-8 text-on-surface" : "w-full max-w-5xl mx-auto px-4 py-6 pb-24 space-y-8 text-paper"}>
      {/* Welcome hero */}
      <section className={gold || aurora ? "relative overflow-hidden bg-surface-container border border-on-background rounded-3xl p-6 md:p-8" : "relative overflow-hidden bg-ink-raise border border-ink-line rounded-3xl p-6 md:p-8"}>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className={gold || aurora ? "w-20 h-20 rounded-full overflow-hidden border border-outline-variant shrink-0 bg-surface-container-high" : "w-20 h-20 rounded-full overflow-hidden border border-ink-line-2 shrink-0 bg-ink-2"}>
            {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : null}
          </div>
          <div className="text-center lg:text-left space-y-1">
            <span className={gold || aurora ? "inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-on-background text-[10px] font-medium rounded-full uppercase tracking-[0.18em] text-on-surface-variant" : "inline-flex items-center gap-1.5 px-3 py-1 bg-ink-2 border border-ink-line text-[10px] font-medium rounded-full uppercase tracking-[0.18em] text-paper-2"}>
              <GraduationCap className="w-3.5 h-3.5" /> Англи хэл · IELTS / SAT
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-light tracking-tight">
              <span className={gold || aurora ? "text-on-surface" : "text-paper"}>Тавтай морил,</span> <span className={gold || aurora ? "text-on-surface-variant" : "text-paper-2"}>{name}!</span>
            </h1>
            <p className={gold || aurora ? "text-sm text-on-surface-variant max-w-xl leading-relaxed" : "text-sm text-paper-2 max-w-xl leading-relaxed"}>
              Англи хэлний сургалтын хувийн танхим. Таны түвшин, өнөөдрийн даалгавар, явц энд нэгтгэгдэв.
            </p>
          </div>
          <div className="lg:ml-auto flex items-center gap-3 shrink-0">
            <div className={gold || aurora ? "text-center bg-surface-container border border-on-background rounded-xl px-4 py-3" : "text-center bg-ink-raise border border-ink-line rounded-xl px-4 py-3"}>
              <span className={gold || aurora ? "text-[10px] font-medium text-outline uppercase tracking-[0.18em] block mb-0.5" : "text-[10px] font-medium text-paper-3 uppercase tracking-[0.18em] block mb-0.5"}>Түвшин</span>
              <p className={gold || aurora ? "text-2xl font-space font-light text-on-surface" : "text-2xl font-serif font-light text-paper"}>{targetLevel}</p>
            </div>
            {enabled && (
              <button
                onClick={openSettings}
                className={gold || aurora ? "px-4 py-3 bg-transparent hover:bg-surface-container-high border border-on-background hover:border-paper/60 text-on-surface-variant hover:text-on-surface text-xs font-medium uppercase tracking-[0.15em] rounded-xl flex items-center gap-1.5" : "px-4 py-3 bg-transparent hover:bg-ink-raise border border-ink-line hover:border-paper/60 text-paper-2 hover:text-paper text-xs font-medium uppercase tracking-[0.15em] rounded-xl flex items-center gap-1.5"}
              >
                <Settings className="w-4 h-4" /> Тохиргоо
              </button>
            )}
            <button
              onClick={logout}
              className={gold || aurora ? "px-4 py-3 bg-transparent hover:bg-surface-container-high border border-on-background hover:border-paper/60 text-on-surface-variant hover:text-on-surface text-xs font-medium uppercase tracking-[0.15em] rounded-xl flex items-center gap-1.5" : "px-4 py-3 bg-transparent hover:bg-ink-raise border border-ink-line hover:border-paper/60 text-paper-2 hover:text-paper text-xs font-medium uppercase tracking-[0.15em] rounded-xl flex items-center gap-1.5"}
            >
              <LogOut className="w-4 h-4" /> Гарах
            </button>
          </div>
        </div>
      </section>

      {/* Guests: nudge to sign up so progress is saved. */}
      {!enabled && (
        <section className={gold || aurora ? "rounded-2xl bg-surface-container border border-on-background p-5 flex items-center gap-3" : "rounded-2xl bg-ink-raise border border-ink-line p-5 flex items-center gap-3"}>
          <LogIn className={gold || aurora ? "w-5 h-5 text-on-surface-variant shrink-0" : "w-5 h-5 text-paper-2 shrink-0"} />
          <p className={gold || aurora ? "text-sm text-on-surface-variant" : "text-sm text-paper-2"}>
            Бүртгүүлбэл streak, явц, оноо чинь хадгалагдаж, түвшин тогтоох тест өгөн хичээлийн зам гарна.
          </p>
        </section>
      )}

      {/* Today's Session + Mistakes */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={gold || aurora ? "lg:col-span-8 bg-surface-container border border-on-background rounded-2xl p-6 md:p-8 space-y-4" : "lg:col-span-8 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-4"}>
          <div className="flex items-center gap-2">
            <Zap className={gold || aurora ? "w-5 h-5 text-on-surface-variant" : "w-5 h-5 text-paper-2"} />
            <h2 className={gold || aurora ? "text-xl font-space font-light text-on-surface" : "text-xl font-serif font-light text-paper"}>Өнөөдрийн даалгавар</h2>
          </div>
          <p className={gold || aurora ? "text-on-surface-variant text-xs leading-relaxed" : "text-paper-2 text-xs leading-relaxed"}>Өнөөдөр санал болгож буй дасгалууд:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <TodayCell skill="read" title={today.reading?.title} onGo={() => onNavigate?.('read')} />
            <TodayCell skill="listen" title={today.listening?.title} onGo={() => onNavigate?.('listen')} />
            <TodayCell skill="write" title={today.writing?.title} onGo={() => onNavigate?.('write')} />
            <TodayCell skill="speak" title={today.speaking?.title} onGo={() => onNavigate?.('speak')} />
            {/* Vocab review */}
            <div className={gold || aurora ? "flex items-center justify-between p-4 bg-surface-container border border-on-background rounded-xl hover:border-outline-variant transition-all md:col-span-2" : "flex items-center justify-between p-4 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2 transition-all md:col-span-2"}>
              <div className="flex items-center gap-3 overflow-hidden mr-2">
                <span className={gold || aurora ? "p-2.5 bg-surface-container-high border border-on-background text-on-surface-variant rounded-lg shrink-0" : "p-2.5 bg-ink-2 border border-ink-line text-paper-2 rounded-lg shrink-0"}><RotateCcw className="w-5 h-5" /></span>
                <div className="overflow-hidden">
                  <p className={gold || aurora ? "text-[10px] text-outline font-medium uppercase tracking-[0.18em]" : "text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]"}>VOCABULARY</p>
                  <p className={gold || aurora ? "text-sm font-bold text-on-surface truncate" : "text-sm font-bold text-paper truncate"}>{today.vocabCount} үг ({targetLevel}) сурах</p>
                </div>
              </div>
              <button onClick={() => onNavigate?.('vocab')} className={gold || aurora ? "px-4 py-2 bg-secondary text-white font-medium uppercase tracking-[0.15em] rounded-full text-xs hover:bg-secondary/90 shrink-0" : "px-4 py-2 bg-paper text-ink font-medium uppercase tracking-[0.15em] rounded-full text-xs hover:bg-paper-bright shrink-0"}>Эхлэх</button>
            </div>
          </div>
        </div>

        {/* Mistakes */}
        <div className={gold || aurora ? "lg:col-span-4 bg-surface-container border border-on-background rounded-2xl p-6 md:p-8 space-y-4" : "lg:col-span-4 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-4"}>
          <div className="flex items-center gap-2">
            <XCircle className={gold || aurora ? "w-5 h-5 text-on-surface-variant" : "w-5 h-5 text-paper-2"} />
            <h2 className={gold || aurora ? "text-xl font-space font-light text-on-surface" : "text-xl font-serif font-light text-paper"}>Миний алдаанууд</h2>
          </div>
          <p className={gold || aurora ? "text-on-surface-variant text-xs leading-relaxed" : "text-paper-2 text-xs leading-relaxed"}>Дахин давтах алдаатай дасгалууд:</p>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {mistakes.length > 0 ? mistakes.map((m, i) => (
              <div key={i} className={gold || aurora ? "flex items-center justify-between p-3 bg-surface-container border border-on-background rounded-xl hover:border-outline-variant" : "flex items-center justify-between p-3 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2"}>
                <div className="overflow-hidden mr-2">
                  <span className={gold || aurora ? "text-[9px] bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded border border-on-background uppercase tracking-[0.18em] font-medium" : "text-[9px] bg-ink-2 text-paper-2 px-1.5 py-0.5 rounded border border-ink-line uppercase tracking-[0.18em] font-medium"}>{m.skill === 'read' ? 'Reading' : 'Listening'}</span>
                  <p className={gold || aurora ? "text-xs font-bold text-on-surface truncate mt-1" : "text-xs font-bold text-paper truncate mt-1"}>{m.title}</p>
                </div>
                <button onClick={() => onNavigate?.(m.skill)} className={gold || aurora ? "px-3 py-1.5 bg-transparent border border-on-background hover:border-paper/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-medium uppercase tracking-[0.15em] rounded-lg text-[10px] shrink-0" : "px-3 py-1.5 bg-transparent border border-ink-line hover:border-paper/60 hover:bg-ink-2 text-paper-2 hover:text-paper font-medium uppercase tracking-[0.15em] rounded-lg text-[10px] shrink-0"}>Засах</button>
              </div>
            )) : (
              <div className={gold || aurora ? "text-center py-6 text-outline text-xs font-medium" : "text-center py-6 text-paper-3 text-xs font-medium"}>✨ Тэмдэглэгдсэн алдаа байхгүй. Сайн байна!</div>
            )}
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Flame} label="Streak" value={`${streak} өдөр дараалан`} sub="Өдөр бүр хичээллээрэй!" />
        <div className={gold || aurora ? "bg-surface-container border border-on-background rounded-2xl p-6 flex items-center gap-4" : "bg-ink-raise border border-ink-line rounded-2xl p-6 flex items-center gap-4"}>
          <div className={gold || aurora ? "w-12 h-12 rounded-xl bg-surface-container-high border border-on-background flex items-center justify-center text-on-surface-variant" : "w-12 h-12 rounded-xl bg-ink-2 border border-ink-line flex items-center justify-center text-paper-2"}><CheckCircle className="w-6 h-6" /></div>
          <div className="flex-grow">
            <p className={gold || aurora ? "text-xs text-outline font-medium uppercase tracking-[0.18em]" : "text-xs text-paper-3 font-medium uppercase tracking-[0.18em]"}>Прогресс</p>
            <h3 className={gold || aurora ? "text-xl font-space font-light text-on-surface" : "text-xl font-serif font-light text-paper"}>{progress}% дууссан</h3>
            <p className={gold || aurora ? "text-[11px] text-on-surface-variant font-medium" : "text-[11px] text-paper-2 font-medium"}>{completedCount}/{EN_TRACKABLE_TOTAL} дасгал</p>
            <div className={gold || aurora ? "w-full h-1.5 bg-surface-container-high rounded-full mt-1.5 overflow-hidden" : "w-full h-1.5 bg-ink-2 rounded-full mt-1.5 overflow-hidden"}><div className={gold || aurora ? "h-full bg-secondary rounded-full" : "h-full bg-paper rounded-full"} style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
        <StatCard icon={Award} label="Судалсан" value={`${completedCount} дасгал`} sub={lastDay ? `Сүүлд: ${lastDay}` : 'Эхний дасгалаа эхлүүлээрэй'} />
      </section>

      {/* Subscription plans — Pro = Max price + promo (signed-in only) */}
      {enabled && profile && (
        <PlanBillingCard
          currentUser={profile}
          billingInterval={pay.billingInterval}
          setBillingInterval={pay.setBillingInterval}
          bylCheckout={pay.bylCheckout}
          setBylCheckout={pay.setBylCheckout}
          checkBylPaymentStatus={pay.checkBylPaymentStatus}
          dummyInvoice={pay.dummyInvoice}
          payDummyInvoice={pay.payDummyInvoice}
          manualPromoCode={pay.manualPromoCode}
          setManualPromoCode={pay.setManualPromoCode}
          manualPromoError={pay.manualPromoError}
          manualPromoLoading={pay.manualPromoLoading}
          handleRedeemManualPromo={pay.handleRedeemManualPromo}
          handleRemoveMyPromo={pay.handleRemoveMyPromo}
          myPromo={pay.myPromo}
          paymentActionLoading={pay.paymentActionLoading}
          paymentMessage={pay.paymentMessage}
          setPaymentMessage={pay.setPaymentMessage}
          paymentMethods={pay.paymentMethods}
          paymentMethodsLoading={pay.paymentMethodsLoading}
          paymentStatusLoading={pay.paymentStatusLoading}
          startCheckout={pay.startCheckout}
          founderAccess={founderAccess}
          userPlan={userPlan}
        />
      )}

      {/* Goal + study-hours chart + lesson path | advice */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={gold || aurora ? "lg:col-span-8 bg-surface-container border border-on-background rounded-2xl p-6 md:p-8 space-y-6" : "lg:col-span-8 bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-6"}>
          {profile?.learningGoal && (
            <div>
              <h2 className={gold || aurora ? "text-xl font-space font-light flex items-center gap-2 text-on-surface mb-2" : "text-xl font-serif font-light flex items-center gap-2 text-paper mb-2"}><Target className={gold || aurora ? "w-5 h-5 text-on-surface-variant" : "w-5 h-5 text-paper-2"} /> Суралцах гол зорилго</h2>
              <div className={gold || aurora ? "bg-surface-container border border-on-background rounded-xl p-4 text-sm font-medium text-on-surface-variant leading-relaxed" : "bg-ink-raise border border-ink-line rounded-xl p-4 text-sm font-medium text-paper-2 leading-relaxed"}>"{profile.learningGoal}"</div>
            </div>
          )}

          {/* Study-hours chart */}
          <div className="space-y-3">
            <h3 className={gold || aurora ? "text-base font-space font-light flex items-center gap-2 text-on-surface" : "text-base font-serif font-light flex items-center gap-2 text-paper"}><Gauge className={gold || aurora ? "w-5 h-5 text-on-surface-variant" : "w-5 h-5 text-paper-2"} /> Хичээллэсэн цаг (энэ долоо хоног)</h3>
            <p className={gold || aurora ? "text-on-surface-variant text-xs leading-relaxed" : "text-paper-2 text-xs leading-relaxed"}>Долоо хоногийн өдрөөр тооцсон хичээллэсэн цагийн график.</p>
            <div className={gold || aurora ? "bg-surface border border-on-background rounded-xl p-4 overflow-x-auto" : "bg-ink border border-ink-line rounded-xl p-4 overflow-x-auto"}>
              <svg className="w-full min-w-[500px] h-[220px]" viewBox="0 0 600 200">
                {gridLines.map((line, i) => (
                  <g key={i}>
                    <line x1="40" y1={line.y} x2="560" y2={line.y} stroke="#262626" strokeDasharray="4 4" />
                    <text x="10" y={line.y + 4} fill="#66635e" className="text-[10px] font-serif font-bold">{line.label}</text>
                  </g>
                ))}
                <path d={`M ${points[0].x} 160 ${linePath} L ${points[points.length - 1].x} 160 Z`} fill="url(#en-chart-glow)" className="opacity-20" />
                <path d={linePath} fill="none" stroke="#ededeb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {points.map((p, i) => (
                  <g key={i}>
                    <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#9b9893" className="text-[11px] font-serif font-bold">{p.hours}ц</text>
                    <circle cx={p.x} cy={p.y} r="6" fill="#ededeb" stroke="#0a0a0a" strokeWidth="2" />
                    <text x={p.x} y="182" textAnchor="middle" fill="#9b9893" className="text-[11px] font-bold">{p.day}</text>
                  </g>
                ))}
                <defs>
                  <linearGradient id="en-chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ededeb" />
                    <stop offset="100%" stopColor="#ededeb" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Lesson path */}
          <div className={gold || aurora ? "space-y-4 pt-6 border-t border-on-background" : "space-y-4 pt-6 border-t border-ink-line"}>
            <h3 className={gold || aurora ? "text-xl font-space font-light flex items-center gap-2 text-on-surface" : "text-xl font-serif font-light flex items-center gap-2 text-paper"}><Shield className={gold || aurora ? "w-5 h-5 text-on-surface-variant" : "w-5 h-5 text-paper-2"} /> Сургалтын зам ({targetLevel})</h3>
            <p className={gold || aurora ? "text-on-surface-variant text-xs leading-relaxed" : "text-paper-2 text-xs leading-relaxed"}>Хэсэг бүрийг {Math.round(EN_UNIT_PASS_RATIO * 100)}%-иас дээш дуусгаснаар дараагийнх нээгдэнэ.</p>
            <div className="space-y-4">
              {units.map((unit, idx) => {
                const unlocked = enUnitUnlocked(units, idx, completedSet);
                const prog = enUnitProgress(unit, completedSet);
                const passed = enUnitPassed(unit, completedSet);
                const percent = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0;
                return (
                  <div key={idx} className={gold || aurora ? `rounded-2xl border p-5 ${unlocked ? (passed ? 'bg-surface-container-high border-outline-variant' : 'bg-surface-container border-on-background') : 'bg-surface border-on-background opacity-40'}` : `rounded-2xl border p-5 ${unlocked ? (passed ? 'bg-ink-2 border-ink-line-2' : 'bg-ink-raise border-ink-line') : 'bg-ink border-ink-line opacity-40'}`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={gold || aurora ? `w-8 h-8 rounded-full flex items-center justify-center font-space text-sm border ${unlocked ? (passed ? 'bg-secondary border-secondary text-white' : 'bg-surface-container-high border-outline-variant text-on-surface') : 'bg-surface-container border-on-background text-outline'}` : `w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm border ${unlocked ? (passed ? 'bg-paper border-paper text-ink' : 'bg-ink-2 border-ink-line-2 text-paper') : 'bg-ink-raise border-ink-line text-paper-3'}`}>{idx + 1}</span>
                        <div>
                          <h4 className={gold || aurora ? "font-space font-light text-on-surface text-base" : "font-serif font-light text-paper text-base"}>{unit.title}{passed && ' (Дууссан)'}</h4>
                          <p className={gold || aurora ? "text-xs text-on-surface-variant" : "text-xs text-paper-2"}>{prog.done}/{prog.total} дасгал ({percent}%)</p>
                        </div>
                      </div>
                      <span className={gold || aurora ? `text-[11px] px-3 py-1 rounded-full border font-medium uppercase tracking-[0.15em] ${unlocked ? (passed ? 'bg-secondary text-white border-secondary' : 'bg-transparent text-on-surface border-outline-variant') : 'bg-surface-container text-outline border-on-background'}` : `text-[11px] px-3 py-1 rounded-full border font-medium uppercase tracking-[0.15em] ${unlocked ? (passed ? 'bg-paper text-ink border-paper' : 'bg-transparent text-paper border-ink-line-2') : 'bg-ink-raise text-paper-3 border-ink-line'}`}>{unlocked ? (passed ? 'Дууссан' : 'Идэвхтэй') : 'Түгжээтэй'}</span>
                    </div>
                    {unlocked && (
                      <>
                        <div className={gold || aurora ? "w-full h-2 bg-surface-container-high border border-on-background rounded-full overflow-hidden mb-4" : "w-full h-2 bg-ink-2 border border-ink-line rounded-full overflow-hidden mb-4"}><div className={gold || aurora ? "h-full bg-secondary" : "h-full bg-paper"} style={{ width: `${percent}%` }} /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {unit.activities.map((act, aIdx) => {
                            const done = completedSet.has(act.activityId);
                            return (
                              <button key={aIdx} onClick={() => { if (!requireAccount()) return; onNavigate?.(act.skill); }} className={gold || aurora ? `flex items-center justify-between text-left p-3 rounded-xl border text-xs font-bold transition-colors ${done ? 'bg-surface-container-high border-outline-variant text-on-surface-variant' : 'bg-surface-container border-on-background text-on-surface hover:border-outline-variant'}` : `flex items-center justify-between text-left p-3 rounded-xl border text-xs font-bold transition-colors ${done ? 'bg-ink-2 border-ink-line-2 text-paper-2' : 'bg-ink-raise border-ink-line text-paper hover:border-ink-line-2'}`}>
                                <div className="flex items-center gap-2 overflow-hidden mr-2">
                                  <span className={gold || aurora ? `p-1.5 rounded-lg shrink-0 ${done ? 'bg-secondary text-white' : 'bg-surface-container-high text-on-surface-variant'}` : `p-1.5 rounded-lg shrink-0 ${done ? 'bg-paper text-ink' : 'bg-ink-2 text-paper-2'}`}>{SKILL_ICON[act.skill]}</span>
                                  <div className="overflow-hidden">
                                    <p className={gold || aurora ? "text-[10px] text-outline uppercase tracking-[0.18em]" : "text-[10px] text-paper-3 uppercase tracking-[0.18em]"}>{SKILL_LABEL[act.skill]}</p>
                                    <p className={gold || aurora ? "font-bold truncate max-w-[180px] text-on-surface" : "font-bold truncate max-w-[180px] text-paper"}>{act.title}</p>
                                  </div>
                                </div>
                                {done ? <Check className={gold || aurora ? "w-4 h-4 text-on-surface shrink-0" : "w-4 h-4 text-paper shrink-0"} /> : <ArrowRight className={gold || aurora ? "w-4 h-4 text-outline shrink-0" : "w-4 h-4 text-paper-3 shrink-0"} />}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personalized advice + level + quick actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className={gold || aurora ? "bg-surface-container border border-on-background rounded-2xl p-6 md:p-8 space-y-4" : "bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-4"}>
            <h2 className={gold || aurora ? "text-xl font-space font-light flex items-center gap-2 text-on-surface" : "text-xl font-serif font-light flex items-center gap-2 text-paper"}><Lightbulb className={gold || aurora ? "w-5 h-5 text-on-surface-variant" : "w-5 h-5 text-paper-2"} /> Хувийн зөвлөмж</h2>
            <p className={gold || aurora ? "text-on-surface-variant text-xs leading-relaxed" : "text-paper-2 text-xs leading-relaxed"}>Таны түвшин, зорилгод тулгуурласан зөвлөмжүүд:</p>
            <div className="space-y-4">
              {suggestions.map((s, i) => (
                <div key={i} className={gold || aurora ? "flex gap-3 items-start bg-surface-container p-4 rounded-xl border border-on-background" : "flex gap-3 items-start bg-ink-raise p-4 rounded-xl border border-ink-line"}>
                  <span className={gold || aurora ? "w-6 h-6 rounded-full bg-surface-container-high border border-on-background flex items-center justify-center shrink-0 text-on-surface-variant text-xs mt-0.5 font-space" : "w-6 h-6 rounded-full bg-ink-2 border border-ink-line flex items-center justify-center shrink-0 text-paper-2 text-xs mt-0.5 font-serif"}>{i + 1}</span>
                  <p className={gold || aurora ? "text-sm font-medium text-on-surface-variant leading-relaxed" : "text-sm font-medium text-paper-2 leading-relaxed"}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Level chooser / placement (settings choice, per the goal) */}
          {enabled && (
            <div className={gold || aurora ? "bg-surface-container border border-on-background rounded-2xl p-6 space-y-4" : "bg-ink-raise border border-ink-line rounded-2xl p-6 space-y-4"}>
              <h3 className={gold || aurora ? "text-base font-space font-light flex items-center gap-2 text-on-surface" : "text-base font-serif font-light flex items-center gap-2 text-paper"}><Target className={gold || aurora ? "w-5 h-5 text-on-surface-variant" : "w-5 h-5 text-paper-2"} /> Миний түвшин</h3>
              <p className={gold || aurora ? "text-on-surface-variant text-xs leading-relaxed" : "text-paper-2 text-xs leading-relaxed"}>Түвшингээ гараар сонгох эсвэл түвшин тогтоох тест дахин өгөх.</p>
              <div className="grid grid-cols-6 gap-1.5">
                {EN_LEVEL_ORDER.map((lvl) => (
                  <button key={lvl} onClick={() => setEnglishLevel(lvl)} className={gold || aurora ? `py-2 rounded-lg text-xs font-black border transition-all ${targetLevel === lvl ? 'bg-secondary text-white border-secondary' : 'bg-surface-container border-on-background text-on-surface hover:border-paper/60'}` : `py-2 rounded-lg text-xs font-black border transition-all ${targetLevel === lvl ? 'bg-paper text-ink border-paper' : 'bg-ink-raise border-ink-line text-paper hover:border-paper/60'}`}>{lvl}</button>
                ))}
              </div>
              <button onClick={() => { if (!requireAccount()) return; setShowPlacement(true); }} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary hover:brightness-110 px-5 py-3.5 text-sm font-bold uppercase tracking-[0.12em] shadow-lg shadow-primary/20 transition-all">
                <TrendingUp className="w-5 h-5" /> Түвшин тогтоох тест дахин өгөх
              </button>
              {profile?.placementEn && (
                <p className={gold || aurora ? "text-[11px] text-outline flex items-center gap-1.5" : "text-[11px] text-paper-3 flex items-center gap-1.5"}><Sparkles className="w-3.5 h-3.5" /> Сүүлийн тест: {profile.placementEn.level} ({profile.placementEn.totalCorrect}/{profile.placementEn.totalQuestions})</p>
              )}
            </div>
          )}

          {/* Quick actions */}
          <div className={gold || aurora ? "bg-surface-container border border-on-background rounded-2xl p-6" : "bg-ink-raise border border-ink-line rounded-2xl p-6"}>
            <h3 className={gold || aurora ? "text-xs font-medium text-outline uppercase tracking-[0.18em] mb-3" : "text-xs font-medium text-paper-3 uppercase tracking-[0.18em] mb-3"}>Хичээл рүү шилжих</h3>
            <div className="grid grid-cols-2 gap-2">
              <QuickBtn label="Reading" onClick={() => onNavigate?.('read')} />
              <QuickBtn label="Listening" onClick={() => onNavigate?.('listen')} />
              <QuickBtn label="Vocabulary" onClick={() => onNavigate?.('vocab')} primary />
              <QuickBtn label="Tests" onClick={() => onNavigate?.('tests')} />
            </div>
          </div>
        </div>
      </section>

      {/* Weekly leaderboard */}
      <EnglishLeaderboard />
    </div>
  );
}

function TodayCell({ skill, title, onGo }: { skill: EnSkill; title?: string; onGo: () => void }) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  if (!title) {
    return (
      <div className={gold || aurora ? "flex items-center p-4 bg-surface-container border border-on-background opacity-40 rounded-xl" : "flex items-center p-4 bg-ink-raise border border-ink-line opacity-40 rounded-xl"}>
        <span className={gold || aurora ? "p-2.5 bg-surface-container-high text-outline rounded-lg shrink-0 mr-3" : "p-2.5 bg-ink-2 text-paper-3 rounded-lg shrink-0 mr-3"}>{SKILL_ICON[skill]}</span>
        <div>
          <p className={gold || aurora ? "text-[10px] text-outline font-medium uppercase tracking-[0.18em]" : "text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]"}>{SKILL_LABEL[skill]}</p>
          <p className={gold || aurora ? "text-xs text-on-surface-variant font-medium" : "text-xs text-paper-2 font-medium"}>Бүгд дууссан</p>
        </div>
      </div>
    );
  }
  return (
    <div className={gold || aurora ? "flex items-center justify-between p-4 bg-surface-container border border-on-background rounded-xl hover:border-outline-variant transition-all" : "flex items-center justify-between p-4 bg-ink-raise border border-ink-line rounded-xl hover:border-ink-line-2 transition-all"}>
      <div className="flex items-center gap-3 overflow-hidden mr-2">
        <span className={gold || aurora ? "p-2.5 bg-surface-container-high border border-on-background text-on-surface-variant rounded-lg shrink-0" : "p-2.5 bg-ink-2 border border-ink-line text-paper-2 rounded-lg shrink-0"}>{SKILL_ICON[skill]}</span>
        <div className="overflow-hidden">
          <p className={gold || aurora ? "text-[10px] text-outline font-medium uppercase tracking-[0.18em]" : "text-[10px] text-paper-3 font-medium uppercase tracking-[0.18em]"}>{SKILL_LABEL[skill]}</p>
          <p className={gold || aurora ? "text-sm font-bold text-on-surface truncate" : "text-sm font-bold text-paper truncate"}>{title}</p>
        </div>
      </div>
      <button onClick={onGo} className={gold || aurora ? "px-4 py-2 bg-secondary text-white font-medium uppercase tracking-[0.15em] rounded-full text-xs hover:bg-secondary/90 shrink-0" : "px-4 py-2 bg-paper text-ink font-medium uppercase tracking-[0.15em] rounded-full text-xs hover:bg-paper-bright shrink-0"}>Эхлэх</button>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  return (
    <div className={gold || aurora ? "bg-surface-container border border-on-background rounded-2xl p-6 flex items-center gap-4" : "bg-ink-raise border border-ink-line rounded-2xl p-6 flex items-center gap-4"}>
      <div className={gold || aurora ? "w-12 h-12 rounded-xl bg-surface-container-high border border-on-background flex items-center justify-center text-on-surface-variant shrink-0" : "w-12 h-12 rounded-xl bg-ink-2 border border-ink-line flex items-center justify-center text-paper-2 shrink-0"}><Icon className="w-6 h-6" /></div>
      <div className="min-w-0">
        <p className={gold || aurora ? "text-xs text-outline font-medium uppercase tracking-[0.18em]" : "text-xs text-paper-3 font-medium uppercase tracking-[0.18em]"}>{label}</p>
        <h3 className={gold || aurora ? "text-xl font-space font-light text-on-surface" : "text-xl font-serif font-light text-paper"}>{value}</h3>
        {sub && <p className={gold || aurora ? "text-[11px] text-on-surface-variant font-medium truncate" : "text-[11px] text-paper-2 font-medium truncate"}>{sub}</p>}
      </div>
    </div>
  );
}

function QuickBtn({ label, onClick, primary }: { label: string; onClick: () => void; primary?: boolean }) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  return (
    <button
      onClick={onClick}
      className={gold || aurora ? `py-2.5 px-3 text-center text-xs font-medium uppercase tracking-[0.15em] rounded-lg border transition-colors ${primary ? 'bg-secondary hover:bg-secondary/90 border-secondary text-white' : 'bg-transparent hover:bg-surface-container-high border-on-background hover:border-paper/60 text-on-surface-variant hover:text-on-surface'}` : `py-2.5 px-3 text-center text-xs font-medium uppercase tracking-[0.15em] rounded-lg border transition-colors ${primary ? 'bg-paper hover:bg-paper-bright border-paper text-ink' : 'bg-transparent hover:bg-ink-2 border-ink-line hover:border-paper/60 text-paper-2 hover:text-paper'}`}
    >
      {label}
    </button>
  );
}
