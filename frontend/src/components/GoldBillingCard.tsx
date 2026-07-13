import React from 'react';
import {
  CreditCard, Crown, Clock, Check, X, Loader2, QrCode, ExternalLink,
} from 'lucide-react';
import {
  PLANS, PLAN_ORDER, PlanId, applyPromoDiscount, type BillingInterval,
} from '../plans';
import { UserProfile } from '../profiles';
import { type MyPromo } from '../promo';
import { formatMnt } from '../utils/paymentUtils';
import {
  PaymentMethodsResponse, DummyCheckoutResponse, BylCheckoutResponse,
} from '../types';

interface GoldBillingCardProps {
  currentUser: UserProfile | null;
  billingInterval: BillingInterval;
  setBillingInterval: (iv: BillingInterval) => void;
  bylCheckout: BylCheckoutResponse | null;
  setBylCheckout: (v: BylCheckoutResponse | null) => void;
  checkBylPaymentStatus: () => void;
  dummyInvoice: DummyCheckoutResponse | null;
  payDummyInvoice: () => void;
  manualPromoCode: string;
  setManualPromoCode: (v: string) => void;
  manualPromoError: string | null;
  manualPromoLoading: boolean;
  handleRedeemManualPromo: (e: React.FormEvent) => void;
  handleRemoveMyPromo: () => void;
  myPromo: MyPromo | null;
  paymentActionLoading: boolean;
  paymentMessage: { type: 'info' | 'success' | 'error'; text: string } | null;
  setPaymentMessage: (v: { type: 'info' | 'success' | 'error'; text: string } | null) => void;
  paymentMethods: PaymentMethodsResponse | null;
  paymentMethodsLoading: boolean;
  paymentStatusLoading: boolean;
  startCheckout: (planId: 'pro' | 'max') => void;
  founderAccess: boolean;
  userPlan: PlanId | 'founder';
}

export function GoldBillingCard({
  currentUser,
  billingInterval,
  setBillingInterval,
  bylCheckout,
  setBylCheckout,
  checkBylPaymentStatus,
  dummyInvoice,
  payDummyInvoice,
  manualPromoCode,
  setManualPromoCode,
  manualPromoError,
  manualPromoLoading,
  handleRedeemManualPromo,
  handleRemoveMyPromo,
  myPromo,
  paymentActionLoading,
  paymentMessage,
  setPaymentMessage,
  paymentMethods,
  paymentMethodsLoading,
  paymentStatusLoading,
  startCheckout,
  founderAccess,
  userPlan,
}: GoldBillingCardProps) {
    if (!currentUser) return null;

    const bylReady = paymentMethods?.byl.status === 'ready';
    // Server-configured price wins; the local catalog is only the fallback.
    const planPriceMnt = (id: 'pro' | 'max') => {
      const server = paymentMethods?.plans?.[id];
      return billingInterval === 'year'
        ? server?.yearAmountMnt ?? PLANS[id].defaultYearAmountMnt
        : server?.amountMnt ?? PLANS[id].defaultAmountMnt;
    };
    const monthlyPriceMnt = (id: 'pro' | 'max') => paymentMethods?.plans?.[id]?.amountMnt ?? PLANS[id].defaultAmountMnt;
    const currentPlanLabel = founderAccess ? 'FOUNDER' : PLANS[userPlan as PlanId]?.name?.toUpperCase() ?? userPlan.toUpperCase();

    // Signup grants a 3-day Pro trial (billing.status = 'trialing'). Surface the
    // countdown so users know the access is temporary and how long is left.
    // Gate on userPlan !== 'free': an EXPIRED trial keeps status 'trialing' in
    // the stored doc but effectivePlan already reverts it to free, so the trial
    // banner/label must not linger once access is gone.
    const billing = currentUser.billing ?? {};
    const isTrial = !founderAccess && userPlan !== 'free' && (billing.status ?? '').toLowerCase() === 'trialing';
    const trialEndMs = Date.parse(billing.currentPeriodEnd ?? '');
    const trialDaysLeft = isTrial && Number.isFinite(trialEndMs)
      ? Math.max(0, Math.ceil((trialEndMs - Date.now()) / 86_400_000))
      : null;

    // Teacher-promo discount applies to the student's FIRST paid subscription
    // only. Display the cut price here; the server remains authoritative.
    const promoActive = !!myPromo && !myPromo.firstPaymentDone && myPromo.discountPercent > 0;
    const promoPct = myPromo?.discountPercent ?? 0;
    const isFreeCode = promoActive && promoPct >= 100;

    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 block-shadow space-y-6">
        {/* Header: current plan */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300">
            <CreditCard className="w-5 h-5" />
          </span>
          <div>
            <p className="text-xs text-slate-400 font-black uppercase font-space">Багц / Subscription</p>
            <h2 className="text-xl font-extrabold text-white">
              {founderAccess
                ? 'Founder — бүх эрх нээлттэй'
                : userPlan === 'free'
                  ? 'Багцаа сонгоод эрхээ нээгээрэй'
                  : isTrial
                    ? `${PLANS[userPlan as PlanId].name} туршилт`
                    : `${PLANS[userPlan as PlanId].name} багц идэвхтэй`}
            </h2>
          </div>
          <span className={`lg:ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border ${
            founderAccess
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : userPlan !== 'free'
                ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                : 'bg-white/5 border-white/10 text-slate-300'
          }`}>
            {founderAccess && <Crown className="w-3.5 h-3.5" />}
            {currentPlanLabel}
          </span>
        </div>

        {founderAccess && (
          <p className="text-[12px] text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 font-semibold leading-relaxed">
            Та үүсгэн байгуулагчийн эрхтэй тул бүх контент болон AI боломжууд төлбөргүйгээр үргэлж нээлттэй.
          </p>
        )}

        {/* Signup trial countdown — Pro access is temporary; show days left. */}
        {trialDaysLeft !== null && (
          <div className="flex items-start gap-3 text-[12px] text-teal-100 bg-teal-500/10 border border-teal-400/30 rounded-xl p-3 font-semibold leading-relaxed">
            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-teal-300" />
            <span>
              {trialDaysLeft > 0
                ? <>Үнэгүй <b>{PLANS[userPlan as PlanId].name}</b> туршилт: бүх контент <b>{trialDaysLeft}</b> хоног нээлттэй. Туршилт дуусахад эрх үнэгүй багц руу шилжинэ — үргэлжлүүлэхийн тулд багцаа аваарай.</>
                : <>Туршилтын хугацаа өнөөдөр дуусч байна. Эрхээ хадгалахын тулд Pro эсвэл Max багц аваарай.</>}
            </span>
          </div>
        )}

        {/* Monthly / annual toggle — annual ≈ 2 months free */}
        <div className="flex items-center justify-center gap-2">
          {(['month', 'year'] as BillingInterval[]).map((iv) => (
            <button
              key={iv}
              onClick={() => setBillingInterval(iv)}
              className={`px-4 py-2 rounded-full text-xs font-black border transition-colors cursor-pointer ${
                billingInterval === iv
                  ? 'bg-white text-slate-950 border-white'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {iv === 'month' ? 'Сараар' : 'Жилээр'}
              {iv === 'year' && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px]">2 сар үнэгүй</span>}
            </button>
          ))}
        </div>

        {/* Plan tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLAN_ORDER.map((id) => {
            const info = PLANS[id];
            const isCurrent = !founderAccess && userPlan === id;
            const price = id === 'free' ? 0 : planPriceMnt(id);
            const highlight = id === 'max';
            return (
              <div key={id} className={`relative flex flex-col rounded-2xl p-5 border ${
                highlight ? 'bg-amber-500/10 border-amber-400/40' : 'bg-slate-950/50 border-white/10'
              } ${isCurrent ? 'ring-2 ring-teal-400/60' : ''}`}>
                {highlight && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase">Хамгийн эрэлттэй</span>
                )}
                <div className="flex items-center justify-between mb-1">
                  <p className="text-base font-black text-white font-space">{info.name}</p>
                  {isCurrent && <span className="text-[10px] font-black text-teal-300 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full">ИДЭВХТЭЙ</span>}
                </div>
                <p className="text-[11px] text-slate-400 font-bold mb-3">{info.taglineMn}</p>
                {/* Teacher-promo discount applies to paid plans on the first subscription. */}
                {price !== 0 && promoActive ? (
                  <>
                    <p className="text-xl font-black text-white mb-1 flex items-baseline gap-2 flex-wrap">
                      <span className="text-[13px] text-slate-500 font-bold line-through decoration-red-400/70">{formatMnt(price)}</span>
                      {isFreeCode ? (
                        <span className="text-teal-300">Үнэгүй</span>
                      ) : (
                        <span>
                          {formatMnt(applyPromoDiscount(price, promoPct))}
                          <span className="text-[11px] text-slate-400 font-bold"> / {billingInterval === 'year' ? 'жил' : 'сар'}</span>
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-teal-300 font-bold mb-3">
                      {myPromo?.teacherName ? `${myPromo.teacherName}` : 'Урамшууллын код'} · {isFreeCode ? 'үнэгүй эрх' : `-${promoPct}% хямдрал`} · эхний төлбөрт
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-black text-white mb-1">
                      {price === 0 ? '0₮' : formatMnt(price)}
                      {price !== 0 && <span className="text-[11px] text-slate-400 font-bold"> / {billingInterval === 'year' ? 'жил' : 'сар'}</span>}
                    </p>
                    {price !== 0 && billingInterval === 'year' ? (
                      <p className="text-[11px] text-teal-300 font-bold mb-3">
                        ≈ {formatMnt(Math.round(price / 12))} / сар · {formatMnt(monthlyPriceMnt(id as 'pro' | 'max') * 12 - price)} хэмнэнэ
                      </p>
                    ) : (
                      <div className="mb-3" />
                    )}
                  </>
                )}
                <ul className="space-y-1.5 mb-2">
                  {info.featuresMn.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-slate-200 font-semibold">
                      <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                {info.missingMn.length > 0 && (
                  <ul className="space-y-1.5 mb-2 opacity-70">
                    {info.missingMn.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-slate-400 font-semibold">
                        <X className="w-3.5 h-3.5 text-red-400/70 shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-3">
                  {id === 'free' ? (
                    <div className="w-full text-center px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-slate-400">
                      {isCurrent ? 'Одоогийн багц' : 'Үндсэн эрх'}
                    </div>
                  ) : (
                    <button
                      onClick={() => startCheckout(id)}
                      disabled={paymentActionLoading || isCurrent || founderAccess}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm cursor-pointer disabled:cursor-not-allowed transition-colors border ${
                        highlight
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-300/40 disabled:bg-white/10 disabled:text-slate-500'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950 border-teal-300/40 disabled:bg-white/10 disabled:text-slate-500'
                      }`}
                    >
                      {paymentActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                      {founderAccess
                        ? 'Founder эрхтэй'
                        : isCurrent
                          ? 'Идэвхтэй'
                          : isFreeCode
                            ? 'Үнэгүй эхлүүлэх'
                            : `${info.name} авах`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkout / status panel */}
        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 space-y-4">
          {!bylReady && !paymentMethodsLoading && (
            <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
              Byl merchant token хараахан тохируулаагүй тул одоогоор <b className="text-slate-200">туршилтын төлбөрийн систем (симуляци)</b> ажиллана.
              Live болгохын тулд сервер дээр BYL_TOKEN, BYL_PROJECT_ID болон Firebase Admin credentials-ийг тохируулна.
            </p>
          )}

          {paymentMethodsLoading && (
            <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Төлбөрийн тохиргоо уншиж байна...
            </p>
          )}

          {paymentMessage && (
            <div className={`border rounded-xl p-3 text-[12px] font-bold leading-relaxed ${
              paymentMessage.type === 'success'
                ? 'bg-teal-500/10 border-teal-500/30 text-teal-200'
                : paymentMessage.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-200'
                  : 'bg-teal-500/10 border-teal-500/30 text-teal-200'
            }`}>
              {paymentMessage.text}
            </div>
          )}

          {/* Dummy invoice: one click simulates the bank confirming payment. */}
          {dummyInvoice && (
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] text-slate-500 font-black uppercase font-space mb-1">Туршилтын нэхэмжлэл</p>
                <p className="text-sm font-extrabold text-white">
                  {PLANS[dummyInvoice.plan].name} багц ({dummyInvoice.interval === 'year' ? 'жилээр' : 'сараар'}) — {formatMnt(dummyInvoice.amountMnt)}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{dummyInvoice.senderInvoiceNo}</p>
              </div>
              <button
                onClick={payDummyInvoice}
                disabled={paymentStatusLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-500 hover:bg-teal-400 disabled:bg-white/10 disabled:text-slate-500 text-slate-950 border border-teal-300/40 rounded-xl font-black text-sm cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                {paymentStatusLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                Төлбөр төлөх (туршилт)
              </button>
            </div>
          )}

          {bylCheckout && (
            <div className="space-y-4">
              {/* Invoice summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] text-slate-500 font-black uppercase font-space mb-1">Төлбөрийн нэхэмжлэл</p>
                <p className="text-sm font-extrabold text-white">
                  {PLANS[bylCheckout.plan as 'pro' | 'max']?.name ?? bylCheckout.plan} багц ({bylCheckout.interval === 'year' ? 'жилээр' : 'сараар'}) — {formatMnt(bylCheckout.amountMnt)}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">{bylCheckout.senderInvoiceNo}</p>
              </div>

              {/* Hosted checkout: QPay QR, SocialPay and Pocket all live on Byl's page */}
              <a
                href={bylCheckout.url}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 border border-teal-300/40 rounded-xl font-black text-sm transition-colors"
              >
                Төлбөрийн хуудас нээх <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-slate-400 text-center font-semibold">
                Нээгдсэн хуудсан дээр QPay QR уншуулах, SocialPay эсвэл Pocket-оор төлөх боломжтой.
              </p>

              {/* Auto-confirmation status */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-teal-300/90 font-bold">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Төлбөрийг автоматаар шалгаж байна — төлсний дараа эрх шууд идэвхжинэ.
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={checkBylPaymentStatus}
                  disabled={paymentStatusLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 rounded-xl text-xs font-black text-teal-200 disabled:opacity-60 cursor-pointer"
                >
                  {paymentStatusLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Одоо шалгах
                </button>
                <button
                  onClick={() => { setBylCheckout(null); setPaymentMessage(null); }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black text-slate-300 cursor-pointer"
                >
                  Болих
                </button>
              </div>
            </div>
          )}

          {paymentMethods?.alternatives?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paymentMethods.alternatives.map((method) => (
                <div key={method.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm font-extrabold text-slate-100">{method.name}</p>
                  <p className="text-[11px] text-slate-400 font-semibold mt-1">{method.note}</p>
                  <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">{method.supports.join(' / ')}</p>
                </div>
              ))}
            </div>
          ) : null}

          {/* Promo code entry */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <p className="text-xs text-slate-400 font-black uppercase font-space">Урамшууллын код / Promo Code</p>
            {myPromo && (
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-teal-400 font-bold">Холбогдсон код: <span className="font-mono font-black tracking-wide text-teal-300">{myPromo.code}</span></p>
                    <p className="text-[11px] text-slate-300 mt-1 font-semibold">
                      {myPromo.teacherName} · {myPromo.discountPercent}% хямдрал эхний захиалгад
                    </p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    myPromo.firstPaymentDone
                      ? 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                      : 'bg-teal-500/10 border-teal-500/30 text-teal-300 animate-pulse'
                  }`}>
                    {myPromo.firstPaymentDone ? 'АШИГЛАСАН' : 'ИДЭВХТЭЙ'}
                  </span>
                </div>
                {/* Same semantics as the monochrome BillingCard: unused code is
                    released, used code is cleared from view (stays spent). */}
                <button
                  type="button"
                  onClick={handleRemoveMyPromo}
                  disabled={manualPromoLoading}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-red-400 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  {manualPromoLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                  Кодыг устгах
                </button>
              </div>
            )}
            {(
              <form onSubmit={handleRedeemManualPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={myPromo ? 'Өөр код холбох' : 'Код оруулах'}
                    value={manualPromoCode}
                    onChange={(e) => setManualPromoCode(e.target.value.toUpperCase())}
                    disabled={manualPromoLoading}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2 text-xs text-white font-extrabold uppercase placeholder:normal-case font-space placeholder:text-slate-500"
                  />
                  {manualPromoError && (
                    <p className="text-[11px] text-red-300 bg-red-950/20 border border-red-500/20 rounded-lg px-2 py-1 mt-1 font-semibold">
                      {manualPromoError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={manualPromoLoading || !manualPromoCode.trim()}
                  className="bg-amber-500 hover:bg-amber-400 disabled:bg-white/10 disabled:text-slate-500 text-slate-950 px-5 py-2 rounded-xl text-xs font-black cursor-pointer disabled:cursor-not-allowed transition-colors border border-amber-300/40 disabled:border-transparent shrink-0 h-[38px] flex items-center justify-center"
                >
                  {manualPromoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Холбох'}
                </button>
              </form>
            )}
            {myPromo && !myPromo.firstPaymentDone && (
              <p className="text-[11px] text-slate-500 font-semibold">Өөр код холбовол одоогийн кодыг солино.</p>
            )}
          </div>
        </div>
      </div>
    );
}
