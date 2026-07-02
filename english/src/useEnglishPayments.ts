// =============================================================================
// English track — payments hook.
// -----------------------------------------------------------------------------
// Thin wrapper over the SHARED useBylCheckout hook (frontend/src/useBylCheckout)
// so the English dashboard can render the shared <BillingCard> with full parity:
// the (now equal) Pro/Max prices, the monthly/annual toggle, teacher promo
// codes, and Byl / dummy checkout with auto-confirmation. This file only keeps
// the English-local billing-interval toggle and teacher-promo state; the whole
// checkout + invoice-polling flow lives in the shared hook.
// =============================================================================
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { getMyPromo, redeemPromoCode, removeMyPromo, type MyPromo } from '../../frontend/src/promo';
import { type BillingInterval } from '../../frontend/src/plans';
import type { UserProfile } from '../../frontend/src/profiles';
import { useBylCheckout } from '../../frontend/src/useBylCheckout';

export function useEnglishPayments(
  currentUser: UserProfile | null,
  applyBilling: (billing: NonNullable<UserProfile['billing']>) => void,
) {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [myPromo, setMyPromo] = useState<MyPromo | null>(null);
  const [manualPromoCode, setManualPromoCode] = useState('');
  const [manualPromoError, setManualPromoError] = useState<string | null>(null);
  const [manualPromoLoading, setManualPromoLoading] = useState(false);

  const loadMyPromo = useCallback(async () => {
    try {
      const { promo } = await getMyPromo();
      setMyPromo(promo);
    } catch {
      setMyPromo(null);
    }
  }, []);

  const {
    paymentMethods, paymentMethodsLoading, loadPaymentMethods,
    bylCheckout, setBylCheckout,
    dummyInvoice,
    paymentActionLoading, paymentStatusLoading,
    paymentMessage, setPaymentMessage,
    startCheckout, payDummyInvoice, checkBylPaymentStatus,
  } = useBylCheckout({ applyBilling, billingInterval, onFreeGrant: loadMyPromo });

  useEffect(() => {
    if (!currentUser || currentUser.isGuest) return;
    loadPaymentMethods();
    loadMyPromo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email, currentUser?.billing?.plan, currentUser?.isGuest, loadMyPromo]);

  const handleRedeemManualPromo = async (e: FormEvent) => {
    e.preventDefault();
    if (!manualPromoCode.trim()) return;
    setManualPromoLoading(true);
    setManualPromoError(null);
    setPaymentMessage(null);
    try {
      const res = await redeemPromoCode(manualPromoCode.trim());
      if (res.redeemed) {
        setPaymentMessage({
          type: 'success',
          text: `Багш ${res.teacherName || ''}-ийн код холбогдлоо. (${res.discountPercent}% хямдрал эхний төлбөрт ажиллана.)`,
        });
        setManualPromoCode('');
        await loadMyPromo();
      } else if (res.already) {
        setManualPromoError('Энэ код аль хэдийн таны дансанд холбогдсон байна.');
      } else {
        setManualPromoError('Код холбож чадсангүй.');
      }
    } catch (err: any) {
      setManualPromoError(err?.message || 'Код холбоход алдаа гарлаа.');
    } finally {
      setManualPromoLoading(false);
    }
  };

  // Холбосон promo-гоо салгаж, өөр код холбох боломж нээнэ.
  const handleRemoveMyPromo = async () => {
    setManualPromoLoading(true);
    setManualPromoError(null);
    setPaymentMessage(null);
    try {
      await removeMyPromo();
      setMyPromo(null);
      setManualPromoCode('');
      setPaymentMessage({ type: 'info', text: 'Код салгагдлаа. Одоо өөр код холбож болно.' });
    } catch (err: any) {
      setManualPromoError(err?.message || 'Код салгаж чадсангүй.');
    } finally {
      setManualPromoLoading(false);
    }
  };

  return {
    paymentMethods, paymentMethodsLoading,
    billingInterval, setBillingInterval,
    bylCheckout, setBylCheckout,
    dummyInvoice, payDummyInvoice,
    paymentActionLoading, paymentStatusLoading,
    paymentMessage, setPaymentMessage,
    myPromo, manualPromoCode, setManualPromoCode,
    manualPromoError, manualPromoLoading, handleRedeemManualPromo, handleRemoveMyPromo,
    startCheckout, checkBylPaymentStatus,
  };
}
