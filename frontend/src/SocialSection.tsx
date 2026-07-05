import React, { useEffect, useState } from 'react';
import {
  Check, Copy, Crown, Loader2, Medal, Share2, Snowflake, Swords, Trophy, Users,
} from 'lucide-react';
import {
  createDuel, challengeByPlayerId, ensureReferralCode, fetchLeaderboard, fetchMyDuels,
  referralLink, shareLink, DuelView, LeaderboardRow,
} from './social';

interface SocialSectionProps {
  targetLevel: string;
  // Тулаан тоглох overlay-г нээнэ (шинэ болон үргэлжилж буй).
  onPlayDuel: (duel: DuelView) => void;
  // Тулаан дууссаны дараа жагсаалтыг шинэчлэхэд өсдөг тоолуур.
  refreshKey: number;
}

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Badge-ууд нь зөвхөн харагдах урамшуулал: ялалт/урилгын тооноос тооцно.
function badgesFor(wins: number, invites: number): { label: string; icon: React.ReactNode; earned: boolean }[] {
  return [
    { label: 'Анхны ялалт', icon: <Trophy className="w-4 h-4" />, earned: wins >= 1 },
    { label: 'Тулаанч (5 ялалт)', icon: <Swords className="w-4 h-4" />, earned: wins >= 5 },
    { label: 'Аварга (10 ялалт)', icon: <Crown className="w-4 h-4" />, earned: wins >= 10 },
    { label: 'Найз урьсан', icon: <Users className="w-4 h-4" />, earned: invites >= 1 },
    { label: 'Элчин сайд (5 урилга)', icon: <Medal className="w-4 h-4" />, earned: invites >= 5 },
  ];
}

function duelStatusLabel(duel: DuelView): { text: string; tone: string } {
  if (duel.status !== 'finished') return { text: 'Хүлээгдэж байна', tone: 'text-paper-2 bg-ink-raise border-ink-line' };
  if (duel.draw) return { text: 'Тэнцсэн', tone: 'text-paper bg-ink-raise border-ink-line-2' };
  if (duel.iWon) return { text: 'Ялсан', tone: 'text-ink bg-paper border-paper' };
  return { text: 'Ялагдсан', tone: 'text-paper-3 bg-ink-raise border-ink-line' };
}

// Профайл табын "Тэмцээн ба урилга" хэсэг. Сервер дээр Firebase Admin
// тохируулагдаагүй (503) үед бүхэлдээ далд орж, апп бусад хэсгээрээ хэвийн
// ажиллана — төлбөрийн хэсгийн доройтолтой ижил зарчим.
export default function SocialSection({ targetLevel, onPlayDuel, refreshKey }: SocialSectionProps) {
  const [unavailable, setUnavailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [referral, setReferral] = useState<{ code: string; invitesCount: number } | null>(null);
  const [duels, setDuels] = useState<DuelView[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [duelLevel, setDuelLevel] = useState(LEVELS.includes(targetLevel) ? targetLevel : 'A1');
  const [startLoading, setStartLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [idCopied, setIdCopied] = useState(false);
  const [opponentId, setOpponentId] = useState('');
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [ref, mine, board] = await Promise.all([
          ensureReferralCode(),
          fetchMyDuels(),
          fetchLeaderboard(),
        ]);
        if (cancelled) return;
        setReferral(ref);
        setDuels(mine.duels);
        setLeaderboard(board.leaderboard);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        // 503 (Firebase Admin тохируулагдаагүй) болон бусад алдаанд хэсгийг
        // бүхэлд нь нууж, апп-ын үлдсэн хэсгийг хэвийн үлдээнэ.
        setUnavailable(true);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [refreshKey]);

  if (unavailable) return null;

  const startDuel = async () => {
    setStartLoading(true);
    setMessage('');
    try {
      const duel = await createDuel(duelLevel);
      onPlayDuel(duel);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Тулаан үүсгэж чадсангүй.');
    } finally {
      setStartLoading(false);
    }
  };

  // Player ID-аар шууд сорих: өрсөлдөгчийн тулаануудын жагсаалтад орж, та
  // эхний раундаа тоглоно.
  const challengeOpponent = async () => {
    const code = opponentId.trim();
    if (!code) return;
    setChallengeLoading(true);
    setMessage('');
    try {
      const duel = await challengeByPlayerId(duelLevel, code);
      setOpponentId('');
      onPlayDuel(duel);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Тулаан үүсгэж чадсангүй.');
    } finally {
      setChallengeLoading(false);
    }
  };

  const copyPlayerId = async () => {
    if (!referral) return;
    try {
      await navigator.clipboard.writeText(referral.code);
      setIdCopied(true);
      setTimeout(() => setIdCopied(false), 2500);
    } catch {
      /* clipboard байхгүй — үл тоомсорлоно */
    }
  };

  const shareInvite = async () => {
    if (!referral) return;
    const toClipboard = await shareLink(
      'Надтай хамт Vivid Lingua дээр герман хэл сурцгаая — бүртгүүлмэгц хоёулаа шагнал авна!',
      referralLink(referral.code),
    );
    if (toClipboard) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const wins = duels.filter((d) => d.status === 'finished' && d.iWon).length;
  const badges = badgesFor(wins, referral?.invitesCount ?? 0);

  return (
    <div className="bg-ink-raise border border-ink-line rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-serif font-light tracking-tight flex items-center gap-2 text-paper">
          <Swords className="w-5 h-5" /> Тэмцээн ба урилга
        </h2>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-paper-2" />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Урилгын карт */}
        <div className="bg-ink-raise border border-ink-line rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-paper-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-paper-2" /> Найзаа урих
          </h3>
          <p className="text-xs text-paper-2 leading-relaxed">
            Таны линк/Player ID-аар шинэ найз бүртгүүлбэл <b className="text-paper">та 3 өдрийн Pro эрх</b> авна
            (нэг бүрт нэмж). Шинэ найз бүртгэлдээ аль хэдийн 3 өдрийн Pro авдаг — хоёулаа
            <b className="text-paper"> +1 Streak Freeze</b> авна.
          </p>
          {referral && (
            <p className="text-xs font-mono text-paper-2 bg-ink-2 border border-ink-line rounded-lg px-3 py-2 break-all">
              {referralLink(referral.code)}
            </p>
          )}
          {referral && (
            <div className="flex items-center justify-between gap-2 bg-ink-2 border border-ink-line rounded-lg px-3 py-2">
              <span className="text-xs text-paper-2 font-medium uppercase tracking-[0.18em]">
                Таны Player ID:{' '}
                <span className="text-base font-serif font-light text-paper tracking-widest select-all">{referral.code}</span>
              </span>
              <button
                onClick={copyPlayerId}
                aria-label="Player ID хуулах"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-paper-2 hover:text-paper border border-ink-line hover:border-paper/60 hover:bg-ink-raise rounded-lg px-2.5 py-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                {idCopied ? <><Check className="w-3.5 h-3.5" /> Хуулагдлаа</> : <><Copy className="w-3.5 h-3.5" /> Хуулах</>}
              </button>
            </div>
          )}
          <p className="text-[11px] text-paper-3 leading-relaxed">
            Найздаа энэ ID-г өгөөрэй — тэр таныг тулаанд шууд сорьж чадна.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={shareInvite}
              disabled={!referral}
              className="flex-1 bg-paper text-ink text-xs font-medium uppercase tracking-[0.15em] rounded-lg py-2.5 px-4 hover:bg-paper-bright disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {copied ? <><Check className="w-4 h-4" /> Хуулагдлаа</> : <><Share2 className="w-4 h-4" /> Линк хуваалцах</>}
            </button>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-paper-2 whitespace-nowrap">
              Урьсан: <span className="text-paper font-serif">{referral?.invitesCount ?? 0}</span>
            </span>
          </div>
        </div>

        {/* Шинэ тулаан */}
        <div className="bg-ink-raise border border-ink-line rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-paper-2 flex items-center gap-2">
            <Swords className="w-4 h-4 text-paper-2" /> Шинэ тулаан эхлүүлэх
          </h3>
          <p className="text-xs text-paper-2 leading-relaxed">
            10 ижил асуултад найзтайгаа өрсөлдөнө — ялагч <b className="text-paper">+1 Streak Freeze</b> авна.
            Найзынхаа <b className="text-paper">Player ID</b>-аар шууд сорь, эсвэл линк үүсгээд илгээ
            (тань руу шинэ найз бүртгүүлбэл <b className="text-paper">та 3 өдрийн Pro</b> авна).
          </p>
          <div className="flex items-center gap-2">
            {LEVELS.map((lv) => (
              <button
                key={lv}
                onClick={() => setDuelLevel(lv)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium tracking-[0.15em] font-serif border transition-all cursor-pointer ${
                  duelLevel === lv
                    ? 'bg-paper border-paper text-ink'
                    : 'bg-ink-2 border-ink-line text-paper-2 hover:border-paper/60'
                }`}
              >
                {lv}
              </button>
            ))}
          </div>
          {/* Player ID-аар шууд сорих */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-widest text-paper-3">Найзынхаа Player ID-аар сорих</label>
            <div className="flex items-center gap-2">
              <input
                value={opponentId}
                onChange={(e) => setOpponentId(e.target.value.toUpperCase())}
                onKeyDown={(e) => { if (e.key === 'Enter') void challengeOpponent(); }}
                placeholder="ж: 7Q2K9X"
                maxLength={16}
                className="flex-1 bg-ink-2 border border-ink-line focus:border-paper/60 rounded-lg px-3 py-2.5 text-sm font-serif font-light text-paper tracking-widest outline-none transition-all placeholder:text-paper-3 placeholder:tracking-normal placeholder:font-sans"
              />
              <button
                onClick={() => void challengeOpponent()}
                disabled={challengeLoading || !opponentId.trim()}
                className="bg-transparent border border-ink-line text-paper text-xs font-medium uppercase tracking-[0.15em] rounded-lg py-2.5 px-4 hover:border-paper/60 hover:bg-ink-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {challengeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Swords className="w-4 h-4" />}
                Сорих
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-ink-line" />
            <span className="text-[11px] text-paper-3 font-medium uppercase tracking-[0.18em]">эсвэл</span>
            <span className="h-px flex-1 bg-ink-line" />
          </div>

          <button
            onClick={() => void startDuel()}
            disabled={startLoading}
            className="w-full bg-paper text-ink text-xs font-medium uppercase tracking-[0.15em] rounded-lg py-2.5 px-4 hover:bg-paper-bright disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {startLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            Линкээр нээлттэй тулаан үүсгэх
          </button>
          {message && <p className="text-xs font-medium text-paper-2">{message}</p>}
        </div>
      </div>

      {/* Сүүлийн тулаанууд */}
      {duels.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-paper-3 uppercase tracking-[0.18em]">Сүүлийн тулаанууд</h3>
          <div className="space-y-2">
            {duels.slice(0, 6).map((duel) => {
              const status = duelStatusLabel(duel);
              const opponentName = duel.challenger?.isMe
                ? (duel.opponent?.name ?? 'Хүлээгдэж буй өрсөлдөгч')
                : (duel.challenger?.name ?? 'Өрсөлдөгч');
              const me = duel.challenger?.isMe ? duel.challenger : duel.opponent;
              const them = duel.challenger?.isMe ? duel.opponent : duel.challenger;
              return (
                <button
                  key={duel.code}
                  onClick={() => onPlayDuel(duel)}
                  className="w-full flex items-center justify-between gap-3 bg-ink-2 border border-ink-line hover:border-ink-line-2 rounded-xl px-4 py-3 transition-all cursor-pointer text-left"
                >
                  <span className="text-sm font-medium text-paper truncate">
                    {opponentName}
                    <span className="block text-[11px] text-paper-3 font-serif font-normal">
                      {duel.level} · {me?.submitted ? `${me.score}/${me.total}` : '—'} vs {them?.submitted ? `${them.score}/${them.total}` : '—'}
                    </span>
                  </span>
                  <span className={`text-[11px] font-bold border rounded-full px-2.5 py-1 whitespace-nowrap ${status.tone}`}>
                    {status.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Долоо хоногийн самбар */}
      {leaderboard.length > 1 && (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-paper-3 uppercase tracking-[0.18em]">
            Найзуудын долоо хоногийн самбар (суралцсан минут)
          </h3>
          <div className="space-y-1.5">
            {leaderboard.map((row, i) => (
              <div
                key={`${row.name}-${i}`}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 border ${
                  row.isMe ? 'bg-ink-2 border-ink-line-2' : 'bg-ink-raise border-ink-line'
                }`}
              >
                <span className="w-6 text-center font-serif font-light text-sm text-paper-2">{i + 1}</span>
                {row.avatar ? (
                  <img src={row.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-ink-2" />
                )}
                <span className="text-sm font-medium text-paper truncate flex-1">
                  {row.isMe ? `${row.name} (та)` : row.name}
                </span>
                <span className="text-sm font-serif font-light text-paper">{row.minutes} мин</span>
                {i === 0 && row.minutes > 0 && <Trophy className="w-4 h-4 text-paper" />}
              </div>
            ))}
          </div>
        </div>
      )}
      {leaderboard.length <= 1 && !loading && (
        <p className="text-xs text-paper-3 leading-relaxed">
          Найз урих эсвэл тулаанд оролцсоноор найзуудын долоо хоногийн самбар энд гарч ирнэ.
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] border rounded-full px-3 py-1.5 ${
              badge.earned
                ? 'text-ink bg-paper border-paper'
                : 'text-paper-3 bg-ink-raise border-ink-line'
            }`}
          >
            {badge.icon} {badge.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-paper-2 ml-auto">
          <Snowflake className="w-3.5 h-3.5" /> Шагнал: Streak Freeze + badge
        </span>
      </div>
    </div>
  );
}
