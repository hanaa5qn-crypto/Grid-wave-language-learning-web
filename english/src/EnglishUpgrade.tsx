// =============================================================================
// English track — upgrade / paywall modal.
// -----------------------------------------------------------------------------
// Reuses the German track's plan catalogue (PLANS) and the SAME payment backend
// (/api/payments/methods + Byl checkout, with the dummy simulator as the dev
// fallback). One subscription unlocks BOTH tracks, so a learner who upgrades
// here gets German Pro/Max too. Pricing shown is the display default; the
// authoritative charge is set server-side at checkout.
// =============================================================================
import React, { useEffect, useState } from 'react';
import { X, Check, Loader2, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { PLANS, type EffectivePlan, type PlanId } from '../../frontend/src/plans';
import { getIdToken } from './access';

type Interval = 'month' | 'year';

const fmtMnt = (mnt: number) => mnt.toLocaleString('en-US') + '₮';

export default function EnglishUpgrade({
  open,
  onClose,
  currentPlan,
}: {
  open: boolean;
  onClose: () => void;
  currentPlan: EffectivePlan;
}) {
  const [interval, setIntervalState] = useState<Interval>('month');
  const [bylReady, setBylReady] = useState(false);
  const [busy, setBusy] = useState<PlanId | null>(null);
  const [msg, setMsg] = useState<{ type: 'info' | 'error' | 'success'; text: string } | null>(null);

  // Probe which payment provider is live whenever the modal opens.
  useEffect(() => {
    if (!open) return;
    setMsg(null);
    setBusy(null);
    fetch('/api/payments/methods')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setBylReady(d?.byl?.status === 'ready'))
      .catch(() => setBylReady(false));
  }, [open]);

  if (!open) return null;

  const alreadyMax = currentPlan === 'max' || currentPlan === 'founder';

  async function upgrade(plan: PlanId) {
    setBusy(plan);
    setMsg(null);
    try {
      const token = await getIdToken();
      if (!token) {
        setMsg({ type: 'error', text: 'Эхлээд бүртгэлдээ нэвтэрнэ үү.' });
        return;
      }
      const path = bylReady ? '/api/payments/byl/checkout' : '/api/payments/dummy/checkout';
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan, interval }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Төлбөр эхлүүлэхэд алдаа гарлаа.');

      if (bylReady) {
        if (data.url) {
          window.open(data.url, '_blank', 'noopener');
          setMsg({ type: 'info', text: 'Төлбөрийн хуудас нээгдлээ. QPay/SocialPay/Pocket-оор төлж, дараа нь хуудсаа шинэчилнэ үү.' });
        } else {
          // 100%-off promo: the server already granted access, no URL to open.
          setMsg({ type: 'success', text: 'Эрх нээгдлээ 🎉 Хуудсаа шинэчилнэ үү.' });
        }
      } else {
        // Dummy simulator (dev/preview only): create then pay the invoice so the
        // plan activates immediately — same Firestore billing flow Byl uses.
        const no = data.senderInvoiceNo;
        const pay = await fetch(`/api/payments/dummy/invoices/${encodeURIComponent(no)}/pay`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!pay.ok) {
          const pd = await pay.json().catch(() => ({}));
          throw new Error(pd.error || 'Туршилтын төлбөр амжилтгүй боллоо.');
        }
        setMsg({ type: 'success', text: `${PLANS[plan].name} багц идэвхжлээ! Хуудсаа шинэчилнэ үү.` });
      }
    } catch (e: any) {
      setMsg({ type: 'error', text: e?.message || 'Алдаа гарлаа.' });
    } finally {
      setBusy(null);
    }
  }

  const PAID: PlanId[] = ['pro', 'max'];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-ink-raise p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-ink-2 p-2 text-paper-2 hover:text-paper"
          aria-label="Хаах"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-serif font-light tracking-tight text-paper">Бүх эрхийг нээ</h2>
        </div>
        <p className="mt-1 text-paper-2">
          Нэг захиалга — Англи (IELTS/SAT) ба Герман хоёуланд. Бүх дасгал шалгалт, бүх үгийн сан, Max дээр хязгааргүй AI.
        </p>

        {/* Month / year toggle */}
        <div className="mt-5 inline-flex rounded-full border border-ink-line bg-ink p-1">
          {(['month', 'year'] as Interval[]).map((iv) => (
            <button
              key={iv}
              onClick={() => setIntervalState(iv)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                interval === iv ? 'bg-primary text-on-primary' : 'text-paper-2 hover:text-paper'
              }`}
            >
              {iv === 'month' ? 'Сараар' : 'Жилээр · 2 сар үнэгүй'}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {PAID.map((id) => {
            const plan = PLANS[id];
            const price = interval === 'year' ? plan.defaultYearAmountMnt : plan.defaultAmountMnt;
            const isCurrent = currentPlan === id || (id === 'pro' && alreadyMax);
            return (
              <div key={id} className="flex flex-col rounded-2xl border border-ink-line bg-ink p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-paper">{plan.nameMn}</h3>
                  {id === 'max' && (
                    <span className="rounded-full bg-primary-container px-2.5 py-0.5 text-[10px] font-bold uppercase text-on-primary-container">
                      Хязгааргүй AI
                    </span>
                  )}
                </div>
                <p className="mt-1 text-2xl font-serif font-light text-paper">
                  {fmtMnt(price)}
                  <span className="text-sm text-paper-2">/{interval === 'year' ? 'жил' : 'сар'}</span>
                </p>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {plan.featuresMn.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-paper-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => upgrade(id)}
                  disabled={busy !== null || isCurrent}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-on-primary transition-colors hover:opacity-90 disabled:opacity-40"
                >
                  {busy === id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {isCurrent ? 'Идэвхтэй' : `${plan.name} авах`}
                </button>
              </div>
            );
          })}
        </div>

        {msg && (
          <div
            className={`mt-5 rounded-xl p-3 text-sm ${
              msg.type === 'error'
                ? 'bg-ink-2 text-paper'
                : msg.type === 'success'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-ink-2 text-paper-2'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{msg.text}</span>
              {msg.type !== 'error' && (
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-on-primary"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Шинэчлэх
                </button>
              )}
            </div>
          </div>
        )}

        {!bylReady && (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-paper-3">
            <ExternalLink className="h-3.5 w-3.5" /> Туршилтын горим: бэкенд төлбөрийн систем идэвхжээгүй үед симуляци ажиллана.
          </p>
        )}
      </div>
    </div>
  );
}
