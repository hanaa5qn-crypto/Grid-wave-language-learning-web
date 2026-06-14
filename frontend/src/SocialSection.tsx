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
  if (duel.status !== 'finished') return { text: 'Хүлээгдэж байна', tone: 'text-amber-300 bg-amber-500/10 border-amber-500/20' };
  if (duel.draw) return { text: 'Тэнцсэн', tone: 'text-blue-300 bg-blue-500/10 border-blue-500/20' };
  if (duel.iWon) return { text: 'Ялсан', tone: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' };
  return { text: 'Ялагдсан', tone: 'text-slate-400 bg-white/5 border-white/10' };
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
    <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md block-shadow space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-extrabold flex items-center gap-2 text-purple-300">
          <Swords className="w-5 h-5" /> Тэмцээн ба урилга
        </h2>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-slate-500" />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Урилгын карт */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" /> Найзаа урих
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Линкээр тань бүртгүүлсэн шинэ найз <b className="text-purple-300">3 өдрийн Pro эрх</b>,
            та хоёулаа <b className="text-cyan-300">+1 Streak Freeze</b> авна.
          </p>
          {referral && (
            <p className="text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 rounded-lg px-3 py-2 break-all">
              {referralLink(referral.code)}
            </p>
          )}
          {referral && (
            <div className="flex items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <span className="text-xs text-slate-400 font-bold">
                Таны Player ID:{' '}
                <span className="text-base font-space font-black text-white tracking-widest select-all">{referral.code}</span>
              </span>
              <button
                onClick={copyPlayerId}
                aria-label="Player ID хуулах"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-white border border-white/10 hover:bg-white/10 rounded-lg px-2.5 py-1.5 transition-all cursor-pointer whitespace-nowrap"
              >
                {idCopied ? <><Check className="w-3.5 h-3.5" /> Хуулагдлаа</> : <><Copy className="w-3.5 h-3.5" /> Хуулах</>}
              </button>
            </div>
          )}
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Найздаа энэ ID-г өгөөрэй — тэр таныг тулаанд шууд сорьж чадна.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={shareInvite}
              disabled={!referral}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold rounded-lg py-2.5 px-4 hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {copied ? <><Check className="w-4 h-4" /> Хуулагдлаа</> : <><Share2 className="w-4 h-4" /> Линк хуваалцах</>}
            </button>
            <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
              Урьсан: <span className="text-white font-space">{referral?.invitesCount ?? 0}</span>
            </span>
          </div>
        </div>

        {/* Шинэ тулаан */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Swords className="w-4 h-4 text-purple-400" /> Шинэ тулаан эхлүүлэх
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            10 ижил асуултад найзтайгаа өрсөлдөнө — ялагч <b className="text-cyan-300">+1 Streak Freeze</b> авна.
            Найзынхаа <b className="text-purple-300">Player ID</b>-аар шууд сорь, эсвэл линк үүсгээд илгээ
            (шинээр бүртгүүлсэн найз <b className="text-purple-300">3 өдрийн Pro</b> авна).
          </p>
          <div className="flex items-center gap-2">
            {LEVELS.map((lv) => (
              <button
                key={lv}
                onClick={() => setDuelLevel(lv)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-space border transition-all cursor-pointer ${
                  duelLevel === lv
                    ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-purple-500/40'
                }`}
              >
                {lv}
              </button>
            ))}
          </div>
          {/* Player ID-аар шууд сорих */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Найзынхаа Player ID-аар сорих</label>
            <div className="flex items-center gap-2">
              <input
                value={opponentId}
                onChange={(e) => setOpponentId(e.target.value.toUpperCase())}
                onKeyDown={(e) => { if (e.key === 'Enter') void challengeOpponent(); }}
                placeholder="ж: 7Q2K9X"
                maxLength={16}
                className="flex-1 bg-white/5 border border-white/10 focus:border-purple-500 rounded-lg px-3 py-2.5 text-sm font-space font-bold text-white tracking-widest outline-none transition-all placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-sans"
              />
              <button
                onClick={() => void challengeOpponent()}
                disabled={challengeLoading || !opponentId.trim()}
                className="bg-purple-500/20 border border-purple-500 text-purple-100 text-sm font-bold rounded-lg py-2.5 px-4 hover:bg-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {challengeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Swords className="w-4 h-4" />}
                Сорих
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] text-slate-500 font-bold">эсвэл</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <button
            onClick={() => void startDuel()}
            disabled={startLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold rounded-lg py-2.5 px-4 hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {startLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            Линкээр нээлттэй тулаан үүсгэх
          </button>
          {message && <p className="text-xs font-bold text-red-400">{message}</p>}
        </div>
      </div>

      {/* Сүүлийн тулаанууд */}
      {duels.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-space">Сүүлийн тулаанууд</h3>
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
                  className="w-full flex items-center justify-between gap-3 bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-xl px-4 py-3 transition-all cursor-pointer text-left"
                >
                  <span className="text-sm font-bold text-slate-200 truncate">
                    {opponentName}
                    <span className="block text-[11px] text-slate-500 font-space font-normal">
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
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-space">
            Найзуудын долоо хоногийн самбар (суралцсан минут)
          </h3>
          <div className="space-y-1.5">
            {leaderboard.map((row, i) => (
              <div
                key={`${row.name}-${i}`}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 border ${
                  row.isMe ? 'bg-purple-950/40 border-purple-500/40' : 'bg-white/5 border-white/10'
                }`}
              >
                <span className="w-6 text-center font-black font-space text-sm text-slate-400">{i + 1}</span>
                {row.avatar ? (
                  <img src={row.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                )}
                <span className="text-sm font-bold text-slate-200 truncate flex-1">
                  {row.isMe ? `${row.name} (та)` : row.name}
                </span>
                <span className="text-sm font-black font-space text-white">{row.minutes} мин</span>
                {i === 0 && row.minutes > 0 && <Trophy className="w-4 h-4 text-amber-400" />}
              </div>
            ))}
          </div>
        </div>
      )}
      {leaderboard.length <= 1 && !loading && (
        <p className="text-xs text-slate-500 leading-relaxed">
          Найз урих эсвэл тулаанд оролцсоноор найзуудын долоо хоногийн самбар энд гарч ирнэ.
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold border rounded-full px-3 py-1.5 ${
              badge.earned
                ? 'text-amber-300 bg-amber-500/10 border-amber-500/30'
                : 'text-slate-600 bg-white/5 border-white/10'
            }`}
          >
            {badge.icon} {badge.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-300/80 ml-auto">
          <Snowflake className="w-3.5 h-3.5" /> Шагнал: Streak Freeze + badge
        </span>
      </div>
    </div>
  );
}
