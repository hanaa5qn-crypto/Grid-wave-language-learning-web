// =============================================================================
// English track — weekly minutes leaderboard (independent from German).
// -----------------------------------------------------------------------------
// Ranks friends by English study minutes this week via
// fetchLeaderboard('en') → studySecondsByDateEn. Same monochrome design as the
// German board; self-hides for guests / when the social backend is unavailable.
// =============================================================================
import React, { useEffect, useState } from 'react';
import { Loader2, Trophy } from 'lucide-react';
import { fetchLeaderboard, LeaderboardRow } from '../../frontend/src/social';
import { useTheme } from '../../frontend/src/lib/theme';
import { useEnglishStats } from './stats';

export default function EnglishLeaderboard() {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  const { profile, enabled } = useEnglishStats();
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [boardAvailable, setBoardAvailable] = useState(true);

  useEffect(() => {
    if (!enabled) { setLoading(false); return; }
    let cancelled = false;
    void (async () => {
      try {
        const board = await fetchLeaderboard('en');
        if (cancelled) return;
        setLeaderboard(board.leaderboard);
        setBoardAvailable(true);
      } catch {
        if (!cancelled) setBoardAvailable(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [enabled, profile?.studySecondsByDateEn]);

  if (!enabled || !boardAvailable) return null;

  const showBoard = leaderboard.length > 1;

  return (
    <section className={gold || aurora ? "rounded-2xl bg-surface-container border border-on-background p-5 sm:p-6 space-y-3" : "rounded-2xl bg-ink-raise border border-ink-line p-5 sm:p-6 space-y-3"}>
      <div className="flex items-center justify-between">
        <h3 className={gold || aurora ? "text-xs font-medium text-outline uppercase tracking-[0.18em]" : "text-xs font-medium text-paper-3 uppercase tracking-[0.18em]"}>
          Найзуудын долоо хоногийн самбар (суралцсан минут)
        </h3>
        {loading && <Loader2 className={gold || aurora ? "w-4 h-4 animate-spin text-on-surface-variant" : "w-4 h-4 animate-spin text-paper-2"} />}
      </div>

      {showBoard ? (
        <div className="space-y-1.5">
          {leaderboard.map((row, i) => (
            <div
              key={`${row.name}-${i}`}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 border ${
                row.isMe ? (gold || aurora ? 'bg-surface-container-high border-on-background' : 'bg-ink-2 border-ink-line-2') : (gold || aurora ? 'bg-surface-container border-on-background' : 'bg-ink-raise border-ink-line')
              }`}
            >
              <span className={gold || aurora ? "w-6 text-center font-space font-light text-sm text-on-surface-variant" : "w-6 text-center font-serif font-light text-sm text-paper-2"}>{i + 1}</span>
              {row.avatar ? (
                <img src={row.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className={gold || aurora ? "w-8 h-8 rounded-full bg-surface-container-high" : "w-8 h-8 rounded-full bg-ink-2"} />
              )}
              <span className={gold || aurora ? "text-sm font-medium text-on-surface truncate flex-1" : "text-sm font-medium text-paper truncate flex-1"}>
                {row.isMe ? `${row.name} (та)` : row.name}
              </span>
              <span className={gold || aurora ? "text-sm font-space font-light text-on-surface" : "text-sm font-serif font-light text-paper"}>{row.minutes} мин</span>
              {i === 0 && row.minutes > 0 && <Trophy className={gold || aurora ? "w-4 h-4 text-on-surface" : "w-4 h-4 text-paper"} />}
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className={gold || aurora ? "text-xs text-outline leading-relaxed" : "text-xs text-paper-3 leading-relaxed"}>
            Найз урих эсвэл хамт сурснаар найзуудын долоо хоногийн самбар энд гарч ирнэ.
          </p>
        )
      )}
    </section>
  );
}
