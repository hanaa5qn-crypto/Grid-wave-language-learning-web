// =============================================================================
// English track — Dashboard tab.
// -----------------------------------------------------------------------------
// The English equivalent of the German Profile/Dashboard: a welcome header with
// a Settings entry, English-specific stat cards (streak, this-week minutes,
// total study days — all from the English-only profile fields), and the English
// weekly leaderboard. Account-level editing lives behind the Settings button
// (the shared AccountScreen overlay, hosted by the stats provider).
// =============================================================================
import React from 'react';
import { Flame, Clock, CalendarCheck, Settings, LogIn, Target } from 'lucide-react';
import { localDateKey } from '../../frontend/src/learning';
import { useEnglishStats } from './stats';
import EnglishLeaderboard from './EnglishLeaderboard';

// Minutes studied this week (Mon–Sun) from the English seconds map. Mirrors the
// backend weekMinutes (socialLogic.ts) day-for-day — Monday of the current week
// plus 7 days — so the card and the leaderboard always agree.
function weekMinutesEn(map: Record<string, number> | undefined): number {
  if (!map) return 0;
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Даваа=1 → 0, Ням=0 → 6
  let seconds = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    seconds += map[localDateKey(d)] ?? 0;
  }
  return Math.round(seconds / 60);
}

function StatCard({
  icon: Icon, label, value, sub,
}: {
  icon: React.ElementType; label: string; value: string; sub?: string;
}) {
  return (
    <div className="rounded-2xl bg-ink-raise border border-ink-line p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-ink-2 border border-ink-line flex items-center justify-center text-paper-2 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-paper-3 font-medium uppercase tracking-[0.18em]">{label}</p>
        <h3 className="text-xl font-serif font-light text-paper">{value}</h3>
        {sub && <p className="text-[11px] text-paper-2 font-medium truncate">{sub}</p>}
      </div>
    </div>
  );
}

export default function DashboardTab() {
  const { profile, streak, enabled, openSettings } = useEnglishStats();

  const name = profile?.name || 'Зочин';
  const avatar = profile?.avatar || '';
  const totalDays = profile?.studyDaysEn?.length ?? 0;
  const weekMinutes = weekMinutesEn(profile?.studySecondsByDateEn);
  const dailyGoal = profile?.dailyGoalMinutes ?? 15;
  const lastDay = (profile?.studyDaysEn ?? []).slice().sort().at(-1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Welcome header */}
      <section className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-ink-2 border border-ink-line shrink-0">
            {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : null}
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] font-medium text-paper-3">Англи хэл · IELTS / SAT</p>
            <h1 className="text-2xl sm:text-3xl font-serif font-light tracking-tight text-paper">
              Тавтай морил, {name}!
            </h1>
          </div>
        </div>
        {enabled && (
          <button
            onClick={openSettings}
            className="inline-flex items-center gap-2 rounded-full bg-ink-raise border border-ink-line px-4 py-2 text-sm font-semibold text-paper-2 hover:text-paper hover:bg-ink-2"
          >
            <Settings className="w-4 h-4" /> Тохиргоо
          </button>
        )}
      </section>

      {/* Guests: nudge to sign up so progress is saved. */}
      {!enabled && (
        <section className="rounded-2xl bg-ink-raise border border-ink-line p-5 flex items-center gap-3">
          <LogIn className="w-5 h-5 text-paper-2 shrink-0" />
          <p className="text-sm text-paper-2">
            Бүртгүүлбэл streak, явц, оноо чинь хадгалагдаж, найзуудтайгаа өрсөлдөнө.
          </p>
        </section>
      )}

      {/* Stat cards — English-only metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${streak} өдөр`}
          sub="Өдөр бүр хичээллээрэй!"
        />
        <StatCard
          icon={Clock}
          label="Энэ долоо хоног"
          value={`${weekMinutes} мин`}
          sub={`Өдрийн зорилго: ${dailyGoal} мин`}
        />
        <StatCard
          icon={CalendarCheck}
          label="Нийт хичээлсэн"
          value={`${totalDays} өдөр`}
          sub={lastDay ? `Сүүлд: ${lastDay}` : 'Эхний дасгалаа эхлүүлээрэй'}
        />
      </section>

      {/* Learning goal, if set */}
      {profile?.learningGoal && (
        <section className="rounded-2xl bg-ink-raise border border-ink-line p-5 flex items-start gap-3">
          <Target className="w-5 h-5 text-paper-2 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-paper-3 font-medium uppercase tracking-[0.18em] mb-1">Зорилго</p>
            <p className="text-sm text-paper">{profile.learningGoal}</p>
          </div>
        </section>
      )}

      {/* Weekly leaderboard */}
      <EnglishLeaderboard />
    </div>
  );
}
