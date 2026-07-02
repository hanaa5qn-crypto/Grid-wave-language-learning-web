// =============================================================================
// Shared Byl / dummy payment checkout + invoice-polling hook.
// -----------------------------------------------------------------------------
// One copy of the paywall checkout flow used by both tracks (German App.tsx and
// english/src/useEnglishPayments.ts). Talks to the same backend endpoints:
// Byl (real — QPay/SocialPay/Pocket hosted checkout, confirmed by polling),
// dummy (dev/preview one-click simulation) and the 100%-off teacher-code free
// grant. Billing is server-owned, so confirmed updates flow back through the
// injected `applyBilling` (merged into local state only — never re-saved).
// =============================================================================
import { useEffect, useRef, useState } from 'react';
import { getAuthInstance, isFirebaseConfigured } from './firebase';
import { PLANS, type BillingInterval } from './plans';
import type { UserProfile } from './profiles';
import type {
  PaymentMethodsResponse, DummyCheckoutResponse, BylCheckoutResponse,
} from './types';

export type PaymentMessage = { type: 'info' | 'success' | 'error'; text: string } | null;

export interface UseBylCheckoutDeps {
  /** Merge a billing object returned by the payments API into local profile state. */
  applyBilling: (billing: NonNullable<UserProfile['billing']>) => void;
  /** Monthly vs annual pricing toggle — injected into the checkout POST bodies. */
  billingInterval: BillingInterval;
  /** Called after a 100%-off free grant so the caller can re-read its promo. */
  onFreeGrant?: () => void;
}

export function useBylCheckout({ applyBilling, billingInterval, onFreeGrant }: UseBylCheckoutDeps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsResponse | null>(null);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);
  const [paymentActionLoading, setPaymentActionLoading] = useState(false);
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<PaymentMessage>(null);
  const [bylCheckout, setBylCheckout] = useState<BylCheckoutResponse | null>(null);
  const [dummyInvoice, setDummyInvoice] = useState<DummyCheckoutResponse | null>(null);

  const getCurrentIdToken = async () => {
    if (!isFirebaseConfigured) throw new Error('Firebase тохиргоо дутуу байна.');
    const user = getAuthInstance().currentUser;
    if (!user) throw new Error('Төлбөр эхлүүлэхийн тулд дахин нэвтэрнэ үү.');
    return user.getIdToken();
  };

  const loadPaymentMethods = async () => {
    setPaymentMethodsLoading(true);
    try {
      const response = await fetch('/api/payments/methods');
      if (!response.ok) throw new Error('Could not load payment methods.');
      const data = await response.json();
      setPaymentMethods(data);
    } catch (err) {
      console.warn('Payment methods load failed:', err);
      setPaymentMessage({ type: 'error', text: 'Төлбөрийн сонголтуудыг ачаалж чадсангүй.' });
    } finally {
      setPaymentMethodsLoading(false);
    }
  };

  // 100%-off teacher code: the server granted the subscription for free and
  // returns billing with no checkout `url`. Reuse the exact billing-refresh path
  // the paid success flow uses (applyBilling), close the paywall panels, and
  // notify the caller so it can re-read the promo (its firstPaymentDone flips).
  // Returns true if it handled a free grant (caller should stop).
  const handleFreeGrant = (data: any): boolean => {
    if (!data || data.free !== true || data.url) return false;
    if (data.billing) applyBilling(data.billing);
    setBylCheckout(null);
    setDummyInvoice(null);
    setPaymentMessage({ type: 'success', text: 'Урамшууллын кодоор танд үнэгүй эрх нээгдлээ 🎉' });
    onFreeGrant?.();
    return true;
  };

  const startBylCheckout = async (planId: 'pro' | 'max') => {
    setPaymentActionLoading(true);
    setPaymentMessage(null);
    setDummyInvoice(null);
    try {
      const token = await getCurrentIdToken();
      const response = await fetch('/api/payments/byl/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planId, interval: billingInterval }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Төлбөр эхлүүлэхэд алдаа гарлаа.');

      // 100%-off teacher code: server already granted access (no URL to open) —
      // refresh billing the same way the paid success path does and close out.
      if (handleFreeGrant(data)) return;

      setBylCheckout(data);
      // Pop the hosted checkout right away; the panel keeps a link in case the
      // browser blocked the popup.
      if (data.url) window.open(data.url, '_blank', 'noopener');
      setPaymentMessage({ type: 'info', text: 'Төлбөрийн хуудас нээгдлээ. QPay, SocialPay эсвэл Pocket-оор төлнө үү.' });
    } catch (err: any) {
      setPaymentMessage({ type: 'error', text: err?.message || 'Төлбөр эхлүүлэхэд алдаа гарлаа.' });
    } finally {
      setPaymentActionLoading(false);
    }
  };

  // Dummy provider: creates a pending invoice, then "Төлбөр төлөх (туршилт)"
  // simulates the bank confirmation and activates the plan — same Firestore
  // billing flow live Byl uses, minus the real money.
  const startDummyCheckout = async (planId: 'pro' | 'max') => {
    setPaymentActionLoading(true);
    setPaymentMessage(null);
    setBylCheckout(null);
    try {
      const token = await getCurrentIdToken();
      const response = await fetch('/api/payments/dummy/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: planId, interval: billingInterval }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Туршилтын нэхэмжлэл үүсгэхэд алдаа гарлаа.');

      // 100%-off teacher code path also short-circuits the dummy flow.
      if (handleFreeGrant(data)) return;

      setDummyInvoice(data);
      setPaymentMessage({ type: 'info', text: 'Туршилтын нэхэмжлэл үүслээ. "Төлбөр төлөх (туршилт)" товчоор баталгаажуулна уу.' });
    } catch (err: any) {
      setPaymentMessage({ type: 'error', text: err?.message || 'Туршилтын нэхэмжлэл үүсгэхэд алдаа гарлаа.' });
    } finally {
      setPaymentActionLoading(false);
    }
  };

  const payDummyInvoice = async () => {
    if (!dummyInvoice) return;
    setPaymentStatusLoading(true);
    setPaymentMessage(null);
    try {
      const token = await getCurrentIdToken();
      const response = await fetch(`/api/payments/dummy/invoices/${encodeURIComponent(dummyInvoice.senderInvoiceNo)}/pay`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Туршилтын төлбөр амжилтгүй боллоо.');

      if (data.billing) applyBilling(data.billing);
      setDummyInvoice(null);
      setPaymentMessage({ type: 'success', text: `Туршилтын төлбөр амжилттай. ${PLANS[dummyInvoice.plan].name} багц идэвхтэй боллоо!` });
    } catch (err: any) {
      setPaymentMessage({ type: 'error', text: err?.message || 'Туршилтын төлбөр амжилтгүй боллоо.' });
    } finally {
      setPaymentStatusLoading(false);
    }
  };

  // Byl if the merchant token is live, otherwise the dummy simulator.
  const startCheckout = (planId: 'pro' | 'max') => {
    if (paymentMethods?.byl.status === 'ready') return startBylCheckout(planId);
    return startDummyCheckout(planId);
  };

  // Polls one Byl checkout; returns true once Byl reports it paid. Used by the
  // manual "Одоо шалгах" button (silent=false) and the auto-poll loop below
  // (silent=true — no "not yet paid" noise every few seconds).
  const bylCheckoutRef = useRef<BylCheckoutResponse | null>(null);
  bylCheckoutRef.current = bylCheckout;
  const bylPollBusyRef = useRef(false);
  const pollBylInvoice = async (silent: boolean): Promise<boolean> => {
    const checkout = bylCheckoutRef.current;
    if (!checkout || bylPollBusyRef.current) return false;
    bylPollBusyRef.current = true;
    if (!silent) {
      setPaymentStatusLoading(true);
      setPaymentMessage(null);
    }
    try {
      const token = await getCurrentIdToken();
      const response = await fetch(`/api/payments/byl/invoices/${encodeURIComponent(checkout.senderInvoiceNo)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Төлбөрийн төлөв шалгахад алдаа гарлаа.');

      if (data.paid || data.status === 'paid') {
        if (data.billing) applyBilling(data.billing);
        setBylCheckout(null);
        setPaymentMessage({ type: 'success', text: 'Төлбөр баталгаажлаа. Эрх идэвхтэй боллоо! 🎉' });
        return true;
      }
      if (!silent) {
        setPaymentMessage({ type: 'info', text: 'Төлбөр хараахан баталгаажаагүй байна. Төлбөрийн хуудсан дээр төлснөөс хойш хэдхэн секундэд автоматаар баталгаажна.' });
      }
      return false;
    } catch (err: any) {
      if (!silent) setPaymentMessage({ type: 'error', text: err?.message || 'Төлбөрийн төлөв шалгахад алдаа гарлаа.' });
      return false;
    } finally {
      bylPollBusyRef.current = false;
      if (!silent) setPaymentStatusLoading(false);
    }
  };
  const checkBylPaymentStatus = () => pollBylInvoice(false);

  // While a Byl checkout is open, auto-confirm: the learner pays on the hosted
  // page, Byl clears it, and the plan activates here without any clicking.
  // Polls every 4s for up to 15 minutes (then the manual button still works).
  useEffect(() => {
    if (!bylCheckout) return;
    const startedAt = Date.now();
    const timer = setInterval(async () => {
      if (Date.now() - startedAt > 15 * 60 * 1000) { clearInterval(timer); return; }
      const paid = await pollBylInvoice(true);
      if (paid) clearInterval(timer);
    }, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bylCheckout?.senderInvoiceNo]);

  return {
    paymentMethods, paymentMethodsLoading, loadPaymentMethods,
    bylCheckout, setBylCheckout,
    dummyInvoice,
    paymentActionLoading, paymentStatusLoading,
    paymentMessage, setPaymentMessage,
    handleFreeGrant,
    startCheckout, startBylCheckout, startDummyCheckout, payDummyInvoice,
    checkBylPaymentStatus,
  };
}
