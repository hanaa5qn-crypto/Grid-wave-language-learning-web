import { describe, it, expect } from 'vitest';
import {
  paymentAmountCents,
  isPaidPayment,
  monthlyValueCents,
  lifetimeValueCents,
  trialInfo,
  hasPaidAccess,
  paidPromoInfo,
  type PaymentRecord,
} from '../frontend/src/adminMetrics';
import type { UserProfile } from '../frontend/src/profiles';

function profileWith(billing: UserProfile['billing']): UserProfile {
  return {
    email: 'student@example.com',
    name: 'Сурагч',
    avatar: '',
    role: '',
    targetLevel: 'A1',
    streak: 0,
    progress: 0,
    completedLessons: 0,
    billing,
  } as UserProfile;
}

describe('isPaidPayment', () => {
  it('counts a real paid Byl payment', () => {
    const p: PaymentRecord = { provider: 'byl', status: 'paid', amountCents: 3990000 };
    expect(isPaidPayment(p)).toBe(true);
  });

  it('never counts a dummy payment even when status is paid', () => {
    const p: PaymentRecord = { provider: 'dummy', status: 'paid', amountCents: 3990000 };
    expect(isPaidPayment(p)).toBe(false);
  });

  it('never counts a voided payment', () => {
    const p: PaymentRecord = { provider: 'byl', status: 'paid', voided: true, amountCents: 3990000 };
    expect(isPaidPayment(p)).toBe(false);
  });

  it('ignores non-paid statuses', () => {
    expect(isPaidPayment({ provider: 'byl', status: 'pending' })).toBe(false);
    expect(isPaidPayment({ provider: 'byl', status: '' })).toBe(false);
  });

  it('accepts the other paid synonyms', () => {
    for (const status of ['succeeded', 'complete', 'completed']) {
      expect(isPaidPayment({ provider: 'byl', status })).toBe(true);
    }
  });
});

describe('monthlyValueCents (MRR contribution)', () => {
  it('returns the monthly amount for an active real subscriber', () => {
    expect(monthlyValueCents(profileWith({ provider: 'byl', status: 'active', monthlyAmountCents: 3990000 }))).toBe(3990000);
  });

  it('returns 0 for dummy provider even when active with an amount', () => {
    expect(monthlyValueCents(profileWith({ provider: 'dummy', status: 'active', monthlyAmountCents: 3990000 }))).toBe(0);
  });

  it('returns 0 when not active/trialing/paid', () => {
    expect(monthlyValueCents(profileWith({ provider: 'byl', status: 'inactive', monthlyAmountCents: 3990000 }))).toBe(0);
  });

  it('returns 0 when there is no billing', () => {
    expect(monthlyValueCents(profileWith(undefined))).toBe(0);
  });
});

describe('lifetimeValueCents', () => {
  it('returns the stored lifetime value for real providers', () => {
    expect(lifetimeValueCents(profileWith({ provider: 'byl', lifetimeValueCents: 5980000 }))).toBe(5980000);
  });

  it('returns 0 for dummy provider regardless of stored value', () => {
    expect(lifetimeValueCents(profileWith({ provider: 'dummy', lifetimeValueCents: 5980000 }))).toBe(0);
  });
});

describe('trialInfo — who has 3-day free Pro access and why', () => {
  const inDays = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString();

  it('labels a new-signup trial as such with days left', () => {
    const info = trialInfo(profileWith({ plan: 'pro', status: 'trialing', provider: 'signup', currentPeriodEnd: inDays(2) }));
    expect(info).not.toBeNull();
    expect(info!.reason).toBe('signup');
    expect(info!.reasonLabel).toBe('New signup');
    expect(info!.active).toBe(true);
    expect(info!.daysLeft).toBe(2);
  });

  it('labels a referral trial as invited', () => {
    const info = trialInfo(profileWith({ plan: 'pro', status: 'trialing', provider: 'referral', currentPeriodEnd: inDays(3) }));
    expect(info!.reason).toBe('referral');
    expect(info!.reasonLabel).toBe('Invited (referral)');
  });

  it('marks an expired trial inactive with 0 days left', () => {
    const info = trialInfo(profileWith({ plan: 'pro', status: 'trialing', provider: 'signup', currentPeriodEnd: inDays(-1) }));
    expect(info!.active).toBe(false);
    expect(info!.daysLeft).toBe(0);
  });

  it('falls back to "other" for an unknown provider', () => {
    const info = trialInfo(profileWith({ plan: 'pro', status: 'trialing', currentPeriodEnd: inDays(1) }));
    expect(info!.reason).toBe('other');
  });

  it('ignores non-trial and dummy accounts', () => {
    expect(trialInfo(profileWith({ plan: 'pro', status: 'active', provider: 'byl' }))).toBeNull();
    expect(trialInfo(profileWith({ status: 'trialing', provider: 'dummy', currentPeriodEnd: inDays(2) }))).toBeNull();
    expect(trialInfo(profileWith(undefined))).toBeNull();
  });
});

describe('hasPaidAccess / paidPromoInfo — bought full access or used a promo code', () => {
  const promo = { code: 'TEACHER10', teacherName: 'Bat', discountPercent: 10, commissionPercent: 5, firstPaymentDone: true };
  const withPromo = (billing: UserProfile['billing']) =>
    ({ ...profileWith(billing), promo } as UserProfile);

  it('counts a real active/paid subscriber as paid access', () => {
    expect(hasPaidAccess(profileWith({ provider: 'byl', status: 'active', plan: 'max' }))).toBe(true);
    expect(hasPaidAccess(profileWith({ provider: 'byl', status: 'paid', plan: 'pro' }))).toBe(true);
  });

  it('does not count trials or dummy/free access as paid', () => {
    expect(hasPaidAccess(profileWith({ provider: 'signup', status: 'trialing', plan: 'pro' }))).toBe(false);
    expect(hasPaidAccess(profileWith({ provider: 'dummy', status: 'active', plan: 'max' }))).toBe(false);
    expect(hasPaidAccess(profileWith(undefined))).toBe(false);
  });

  it('returns paid info for a paying customer', () => {
    const info = paidPromoInfo(profileWith({ provider: 'byl', status: 'active', plan: 'max', lifetimeValueCents: 3990000 }));
    expect(info).not.toBeNull();
    expect(info!.paid).toBe(true);
    expect(info!.usedPromo).toBe(false);
    expect(info!.ltvCents).toBe(3990000);
  });

  it('returns promo info for a code redeemer who has not paid', () => {
    const info = paidPromoInfo(withPromo(undefined));
    expect(info).not.toBeNull();
    expect(info!.paid).toBe(false);
    expect(info!.usedPromo).toBe(true);
    expect(info!.promoCode).toBe('TEACHER10');
    expect(info!.teacherName).toBe('Bat');
    expect(info!.discountPercent).toBe(10);
  });

  it('flags a customer who both paid and used a promo code', () => {
    const info = paidPromoInfo(withPromo({ provider: 'byl', status: 'active', plan: 'pro' }));
    expect(info!.paid).toBe(true);
    expect(info!.usedPromo).toBe(true);
  });

  it('returns null for a plain free user with no promo', () => {
    expect(paidPromoInfo(profileWith(undefined))).toBeNull();
    expect(paidPromoInfo(profileWith({ provider: 'signup', status: 'trialing', plan: 'pro' }))).toBeNull();
  });
});

describe('paymentAmountCents', () => {
  it('prefers amountCents, then falls back through the alternatives', () => {
    expect(paymentAmountCents({ amountCents: 100 })).toBe(100);
    expect(paymentAmountCents({ totalCents: 200 })).toBe(200);
    expect(paymentAmountCents({ priceCents: 300 })).toBe(300);
    expect(paymentAmountCents({ amount: 4 })).toBe(400);
    expect(paymentAmountCents({ total: 5 })).toBe(500);
    expect(paymentAmountCents({})).toBe(0);
  });
});
