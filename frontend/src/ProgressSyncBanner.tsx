import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { PROGRESS_SYNC_ISSUE_EVENT, retryProfileLoad, subscribeToProfileUpdates } from './auth';

// Non-blocking toast for the two progress-sync failure modes (audit §4.2 #1/#3):
// the login-time profile read failed (a blank fallback profile is active and
// ledger writes are refused), or a progress write failed. Both fire the
// PROGRESS_SYNC_ISSUE_EVENT from auth.ts. Retry re-runs the profile load; on
// success the fresh server profile re-seeds every subscriber and clears the
// fallback flag. Mounted once in LanguageGate so both tracks are covered.
export default function ProgressSyncBanner() {
  const [visible, setVisible] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const wasFallback = useRef(false);

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener(PROGRESS_SYNC_ISSUE_EVENT, show);
    // A fallback → non-fallback transition on the update channel means the
    // profile recovered (retry here, or a re-fired auth event elsewhere):
    // hide the banner. A banner raised by a failed WRITE stays until the user
    // retries or dismisses — a later unrelated save succeeding doesn't prove
    // the lost write recovered.
    const unsub = subscribeToProfileUpdates((profile) => {
      if (profile?.isFallback) {
        wasFallback.current = true;
        setVisible(true);
      } else if (wasFallback.current) {
        wasFallback.current = false;
        setVisible(false);
      }
    });
    return () => {
      window.removeEventListener(PROGRESS_SYNC_ISSUE_EVENT, show);
      unsub();
    };
  }, []);

  if (!visible) return null;

  const retry = async () => {
    setRetrying(true);
    try {
      if (await retryProfileLoad()) setVisible(false);
    } catch {
      // Still offline — keep the banner up for another try.
    }
    setRetrying(false);
  };

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] flex max-w-[92vw] items-center gap-3 rounded-xl border border-ink-line bg-ink-raise px-4 py-3 text-sm text-paper shadow-[0_0_30px_rgba(0,0,0,0.4)]"
    >
      <span>Ахиц дэвшил ачаалагдаж чадсангүй — дахин оролдоно уу</span>
      <button
        onClick={retry}
        disabled={retrying}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-ink-line bg-ink-2 px-3 py-1.5 font-bold text-paper-2 transition-colors hover:text-paper cursor-pointer disabled:opacity-50"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${retrying ? 'animate-spin' : ''}`} />
        Дахин оролдох
      </button>
      <button
        onClick={() => setVisible(false)}
        aria-label="Хаах"
        className="shrink-0 text-paper-3 transition-colors hover:text-paper cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
