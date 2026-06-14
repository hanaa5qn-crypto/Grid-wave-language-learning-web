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

// Who currently holds a 3-day free Pro trial, and WHY. A trial is any account
// whose billing.status is 'trialing'; the reason is encoded in billing.provider:
//   'signup'   → granted automatically on a new account (/api/account/ensure-trial)
//   'referral' → granted when the user redeemed an invite (/api/social referral)
// Dummy/test access is excluded. `active` means the trial window has not expired
// yet (still has access); expired rows linger with status 'trialing' until the
// next billing read flips them to free, so we surface days-left and an active flag.
export type TrialReason = 'signup' | 'referral' | 'other';

export interface TrialInfo {
  reason: TrialReason;
  reasonLabel: string;
  provider: string;
  endsAt: Date | null;
  daysLeft: number; // 0 once expired or when no end date is stored
  active: boolean;  // end date is still in the future → access is live
}

// Whether the account currently holds real, paid full access (Pro/Max). Trials
// (status 'trialing') and dummy/test access do NOT count — only a genuine
// purchase or a promo/legacy 'active'|'paid' subscription does.
export function hasPaidAccess(profile: UserProfile): boolean {
  const billing = profile.billing;
  if (!billing) return false;
  if (billing.provider === 'dummy') return false;
  const status = (billing.status ?? '').toLowerCase();
  return status === 'active' || status === 'paid';
}

// Paying customers AND promo-code users in one view. `paid` = bought full
// access (see hasPaidAccess); `usedPromo` = redeemed a teacher promo code
// (profile.promo). Returns null for accounts that are neither, so the admin
// list can show only the people who paid or used a code.
export interface PaidPromoInfo {
  paid: boolean;
  usedPromo: boolean;
  plan: string;
  provider: string;
  promoCode: string | null;
  teacherName: string | null;
  discountPercent: number | null;
  firstPaymentDone: boolean | null;
  ltvCents: number;
}

export function paidPromoInfo(profile: UserProfile): PaidPromoInfo | null {
  const paid = hasPaidAccess(profile);
  const promo = profile.promo;
  const usedPromo = !!promo?.code;
  if (!paid && !usedPromo) return null;
  return {
    paid,
    usedPromo,
    plan: profile.billing?.plan ?? '',
    provider: (profile.billing?.provider ?? '').toLowerCase(),
    promoCode: promo?.code ?? null,
    teacherName: promo?.teacherName ?? null,
    discountPercent: promo?.discountPercent ?? null,
    firstPaymentDone: promo?.firstPaymentDone ?? null,
    ltvCents: lifetimeValueCents(profile),
  };
}

export function trialInfo(profile: UserProfile): TrialInfo | null {
  const billing = profile.billing;
  if (!billing) return null;
  if ((billing.status ?? '').toLowerCase() !== 'trialing') return null;
  if (billing.provider === 'dummy') return null;

  const provider = (billing.provider ?? '').toLowerCase();
  const reason: TrialReason =
    provider === 'signup' ? 'signup' : provider === 'referral' ? 'referral' : 'other';
  const reasonLabel =
    reason === 'signup' ? 'New signup' : reason === 'referral' ? 'Invited (referral)' : 'Other';

  const endMs = Date.parse(billing.currentPeriodEnd ?? '');
  const hasEnd = Number.isFinite(endMs);
  const active = hasEnd && endMs > Date.now();
  const daysLeft = active ? Math.max(0, Math.ceil((endMs - Date.now()) / 86_400_000)) : 0;

  return { reason, reasonLabel, provider, endsAt: hasEnd ? new Date(endMs) : null, daysLeft, active };
}
