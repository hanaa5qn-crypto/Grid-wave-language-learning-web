import { describe, it, expect } from 'vitest';
import {
  paymentAmountCents,
  isPaidPayment,
  monthlyValueCents,
  lifetimeValueCents,
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
