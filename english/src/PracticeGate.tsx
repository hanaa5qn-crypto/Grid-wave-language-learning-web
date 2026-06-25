// =============================================================================
// English track — practice paywall gate.
// -----------------------------------------------------------------------------
// Wraps a practice tab (Reading / Listening / Writing / Speaking / Math / full
// Tests). Free accounts and visitors see a lock panel instead of the content —
// full practice is a Pro feature. Vocabulary, the Dashboard, and the placement
// test stay free (gated separately). Paid / founder accounts pass through.
//
// Guests are a free plan with no billing, so they also land on the lock panel —
// they can SEE that practice exists (what a free account sees) but can't use it.
// =============================================================================
import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { canAccessAllContent } from '../../frontend/src/plans';
import { useEnglishStats } from './stats';

export default function PracticeGate({ children }: { children: React.ReactNode }) {
  const { profile, canInteract, openSettings, requireAccount } = useEnglishStats();

  if (canAccessAllContent(profile)) return <>{children}</>;

  const isGuest = !canInteract;
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="rounded-3xl border border-ink-line bg-ink-raise p-8 md:p-10 text-center space-y-5">
        <span className="inline-flex w-16 h-16 rounded-2xl bg-ink-2 border border-ink-line items-center justify-center text-paper-2">
          <Lock className="w-8 h-8" />
        </span>
        <h2 className="text-2xl font-serif font-light tracking-tight text-paper">
          {isGuest ? 'Бүртгүүлж үнэгүй эхэл' : 'Энэ нь Pro боломж'}
        </h2>
        <p className="text-paper-2 text-sm leading-relaxed max-w-md mx-auto">
          {isGuest
            ? 'Зочин горимд та зөвхөн үзэж болно. Дасгал, шалгалт ажиллуулахын тулд үнэгүй бүртгүүлээрэй — бүртгүүлэхэд 3 өдрийн бүх эрх нээгдэнэ.'
            : 'Бүрэн дасгал, загвар шалгалтууд Pro болон Max багцад нээлттэй. Үнэгүй эрхээр үгийн сан болон түвшин тогтоох тест ашиглах боломжтой.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isGuest ? (
            <button onClick={requireAccount}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-6 py-3 text-sm font-bold cursor-pointer hover:bg-white transition-colors">
              <Sparkles className="w-4 h-4" /> Бүртгүүлэх
            </button>
          ) : (
            <button onClick={openSettings}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-paper text-ink px-6 py-3 text-sm font-bold cursor-pointer hover:bg-white transition-colors">
              <Sparkles className="w-4 h-4" /> Багц харах
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
