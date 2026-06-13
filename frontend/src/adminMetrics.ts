// Pure revenue/metric helpers for the admin dashboard. Extracted from
// AdminDashboard.tsx so the money math can be unit-tested in isolation.
//
// Revenue rule: dummy (simulated) and voided payments NEVER count. Dev/preview
// dummy tests write to the same Firestore the prod dashboard reads, so the
// exclusion is by data shape (provider/voided), not by environment.
import type { UserProfile } from './profiles';

export interface PaymentRecord {
  amount?: number;
  amountCents?: number;
  total?: number;
  totalCents?: number;
  priceCents?: number;
  currency?: string;
  status?: string;
  createdAt?: unknown;
  customerEmail?: string;
  userId?: string;
  plan?: string;
  provider?: string;
  voided?: boolean;
}

export function paymentAmountCents(payment: PaymentRecord): number {
  if (typeof payment.amountCents === 'number') return payment.amountCents;
  if (typeof payment.totalCents === 'number') return payment.totalCents;
  if (typeof payment.priceCents === 'number') return payment.priceCents;
  if (typeof payment.amount === 'number') return Math.round(payment.amount * 100);
  if (typeof payment.total === 'number') return Math.round(payment.total * 100);
  return 0;
}

export function isPaidPayment(payment: PaymentRecord): boolean {
  if (payment.voided) return false; // test/reset payments never count as revenue
  if (payment.provider === 'dummy') return false; // simulated payments are not revenue
  const status = (payment.status ?? '').toLowerCase();
  return ['paid', 'succeeded', 'complete', 'completed'].includes(status);
}

export function monthlyValueCents(profile: UserProfile): number {
  const billing = profile.billing;
  if (billing?.provider === 'dummy') return 0; // dummy access carries no MRR
  const status = (billing?.status ?? '').toLowerCase();
  if (!['active', 'trialing', 'paid'].includes(status)) return 0;
  return billing?.monthlyAmountCents ?? 0;
}

export function lifetimeValueCents(profile: UserProfile): number {
  if (profile.billing?.provider === 'dummy') return 0; // dummy access carries no revenue
  return profile.billing?.lifetimeValueCents ?? 0;
}
