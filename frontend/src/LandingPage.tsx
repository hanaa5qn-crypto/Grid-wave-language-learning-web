import {
  BookOpen, Headphones, Mic, Edit3, Languages, Sparkles, GraduationCap, Swords,
  ArrowRight, Check, Target, Globe, Bot, Star, Play,
  Shield, BookMarked, MessageSquare, FileText, CreditCard,
} from 'lucide-react';
import { PLANS, PLAN_ORDER, type PlanId } from './plans';

interface LandingPageProps {
  /** Visitor wants an account (sign up). */
  onGetStarted: () => void;
  /** Returning user wants to log in. */
  onLogin: () => void;
  /** Visitor wants to try the app with no account (guest mode). */
  onTryGuest: () => void;
}

// Color consistency lock: one accent (antique gold) across every skill chip,
// with the icon glyph carrying the meaning instead of a rainbow of hues.
const SKILLS = [
  { icon: BookOpen, title: 'Унших', desc: 'Монгол тайлбартай түвшний бичвэрүүд, ойлголтын асуултууд.', color: 'text-primary bg-primary/10 border-primary/25' },
  { icon: Headphones, title: 'Сонсох', desc: 'Жинхэнэ герман дуудлага, удаашруулах, давтах боломжтой.', color: 'text-primary bg-primary/10 border-primary/25' },
  { icon: Mic, title: 'Ярих', desc: 'AI дуут багш дуудлагыг чинь үнэлж, шууд зөвлөмж өгнө.', color: 'text-secondary bg-secondary/10 border-secondary/25' },
  { icon: Edit3, title: 'Бичих', desc: 'Эссэ, өгүүлбэрээ AI-аар дүрмийн засвар, оноотой шалгуул.', color: 'text-primary bg-primary/10 border-primary/25' },
  { icon: Languages, title: 'Үгийн сан', desc: 'A1–C2 хүртэлх флаш карт, давталтын ухаалаг систем (SRS).', color: 'text-primary bg-primary/10 border-primary/25' },
  { icon: Bot, title: 'AI орчуулагч', desc: 'Хүссэн өгүүлбэрээ орчуулж, дүрмийн тайлбар авах.', color: 'text-secondary bg-secondary/10 border-secondary/25' },
  { icon: GraduationCap, title: 'TestDaF шалгалт', desc: 'Жинхэнэ шалгалтын загвараар бэлтгэл хийх симуляци.', color: 'text-primary bg-primary/10 border-primary/25' },
  { icon: Swords, title: 'Тулаан', desc: 'Найзтайгаа герман хэлээр өрсөлдөж, хамт суралц.', color: 'text-tertiary bg-tertiary/10 border-tertiary/25' },
];

const VALUE_PROPS = [
  { icon: Globe, title: 'Монгол хэл дээр', desc: 'Бүх тайлбар, орчуулга монголоор. Англиар дамжуулахгүй — шууд ойлгоно.' },
  { icon: Bot, title: 'AI багш дотроо', desc: 'Ярих, бичих чадварыг тань хүн шиг үнэлж, юу засахыг чинь хэлнэ.' },
  { icon: Target, title: 'Шалгалтад бэлддэг', desc: 'Goethe, TestDaF зорилготой бол түвшин бүрийн сан, загвар шалгалттай.' },
];

const STEPS = [
  { n: '1', title: 'Түвшингээ тогтоо', desc: 'Богино тестээр одоогийн түвшнээ мэдээд эхэлнэ.' },
  { n: '2', title: 'Өдөр бүр дасгал', desc: 'Чамд тохирсон өдрийн жижиг даалгавруудыг гүйцэтгэ.' },
  { n: '3', title: 'Ахицаа хар', desc: 'Streak, оноо, түвшингийн ахицаа график дээр хянана.' },
];

function formatMnt(amount: number): string {
  return amount.toLocaleString('mn-MN');
}

function Logo() {
  return (
    <span className="flex items-center gap-2 font-black font-space tracking-tight text-xl">
      <img src="/favicon.svg" alt="" className="w-7 h-7" />
      <span>
        <span className="text-primary">Vivid</span> Lingua
      </span>
    </span>
  );
}

export default function LandingPage({ onGetStarted, onLogin, onTryGuest }: LandingPageProps) {
  return (
    <div className="bg-background text-on-background font-sans min-h-dvh w-full overflow-x-hidden relative selection:bg-primary/30 selection:text-on-primary">
      {/* Ambient warmth — gold dawn over a graphite studio, kept whisper-low */}
      <div className="absolute top-[-10%] left-1/5 w-[620px] h-[620px] bg-primary/[0.07] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-[38%] right-1/5 w-[520px] h-[520px] bg-secondary/[0.05] rounded-full blur-[160px] pointer-events-none" />

      {/* ---------- Nav ---------- */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-outline-variant/60">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={onLogin}
              className="px-3 md:px-4 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Нэвтрэх
            </button>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 text-sm font-bold rounded-xl bg-primary text-on-primary hover:bg-surface-tint transition-colors cursor-pointer"
            >
              Эхлэх
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <header className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-surface-container border border-outline-variant text-xs font-bold text-on-primary-container">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Монголчуудад зориулсан герман хэлний платформ
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-space tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Герман хэлээ{' '}
          <span className="text-primary">монголоороо</span>{' '}
          ухаалгаар сур
        </h1>

        <p className="mt-6 text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed">
          Унших, сонсох, ярих, бичих дасгал, AI багш, TestDaF загвар шалгалт, үгийн сан — бүгд нэг
          дор, монгол хэл дээрх тайлбартай. A1-ээс C2 хүртэл.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onTryGuest}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-primary text-on-primary font-bold text-base shadow-[0_10px_30px_-8px_rgba(230,184,92,0.55)] transition-all hover:bg-surface-tint hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5" /> Үнэгүй туршаад үзэх
          </button>
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-base border border-outline-variant transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Бүртгүүлэх <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-xs text-on-surface-variant font-semibold">
          Картын мэдээлэл шаардахгүй · Бүртгэлгүйгээр шууд эхэл · Бүртгүүлбэл 3 өдрийн Pro бэлэгтэй
        </p>
      </header>

      {/* ---------- Skills grid ---------- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black font-space text-center mb-3">Нэг апп — бүх чадвар нэг дор</h2>
        <p className="text-on-surface-variant text-center text-sm md:text-base mb-10 max-w-xl mx-auto">
          Хэлний бүх талыг хамарсан дасгалууд, ухаалаг хэрэгслүүд.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((s) => (
            <div
              key={s.title}
              className="p-5 rounded-2xl bg-surface-container border border-outline-variant hover:border-primary/45 hover:bg-surface-container-high transition-all"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-on-surface text-base mb-1">{s.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Value props ---------- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="text-center md:text-left">
              <div className="inline-flex w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 items-center justify-center text-primary mb-4">
                <v.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold mb-2">{v.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black font-space text-center mb-10">Хэрхэн ажилладаг вэ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative p-6 rounded-2xl bg-surface-container border border-outline-variant text-center">
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-primary text-on-primary flex items-center justify-center font-black font-space">
                {step.n}
              </div>
              <h3 className="font-bold text-base mb-1">{step.title}</h3>
              <p className="text-on-surface-variant text-sm">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-primary/50" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-black font-space text-center mb-6 text-on-surface">
            Яагаад Vivid Lingua вэ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-high border border-outline-variant">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-on-surface font-bold text-sm mb-1">A1–C2 бүрэн хамрах</p>
              <p className="text-on-surface-variant text-xs leading-relaxed">Эхлэгчээс дээд түвшин хүртэлх агуулга нэг дор</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-high border border-outline-variant">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-3">
                <BookMarked className="w-5 h-5" />
              </div>
              <p className="text-on-surface font-bold text-sm mb-1">Bolor-toli толь бичиг</p>
              <p className="text-on-surface-variant text-xs leading-relaxed">Үгийн орчуулга машинаар биш, Bolor-toli-аас</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-high border border-outline-variant">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-on-surface font-bold text-sm mb-1">AI засвар, үнэлгээ</p>
              <p className="text-on-surface-variant text-xs leading-relaxed">AI багш ярих, бичих чадварыг үнэлж, засаж өгнө</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-high border border-outline-variant">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-on-surface font-bold text-sm mb-1">TestDaF загвар шалгалт</p>
              <p className="text-on-surface-variant text-xs leading-relaxed">Жинхэнэ шалгалтын форматаар бэлтгэл хий</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-surface-container-high border border-outline-variant">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary mb-3">
                <CreditCard className="w-5 h-5" />
              </div>
              <p className="text-on-surface font-bold text-sm mb-1">Карт шаардахгүй</p>
              <p className="text-on-surface-variant text-xs leading-relaxed">Бүртгэлгүйгээр шууд туршиж болно</p>
            </div>
          </div>
          <div className="border-t border-outline-variant pt-5 text-center">
            <p className="text-on-surface text-sm leading-relaxed max-w-2xl mx-auto italic">
              "Монгол хэлтэй суралцагчдад зориулсан платформ байхгүй байсан — бүх зүйл англиар дамждаг байлаа. Тэр цоорхойг бөглөхийн тулд Vivid Lingua-г бүтээсэн. Дуусаагүй боловч үнэнч."
            </p>
            <p className="text-on-surface-variant text-xs mt-2 font-semibold">— Vivid Lingua-г бүтээгч</p>
          </div>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black font-space text-center mb-3">Үнэ — өөртөө тохируул</h2>
        <p className="text-on-surface-variant text-center text-sm md:text-base mb-10">
          Үнэгүй эхэл. Жилээр төлбөл 2 сар үнэгүй.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {PLAN_ORDER.map((id: PlanId) => {
            const plan = PLANS[id];
            const popular = id === 'pro';
            return (
              <div
                key={id}
                className={`relative flex flex-col p-6 rounded-2xl border transition-all ${
                  popular
                    ? 'bg-primary-container/30 border-primary/60 shadow-[0_0_0_1px_rgba(230,184,92,0.18),0_18px_40px_-18px_rgba(0,0,0,0.7)] md:scale-[1.03]'
                    : 'bg-surface-container border-outline-variant'
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" /> Түгээмэл сонголт
                  </span>
                )}
                <h3 className="text-lg font-extrabold font-space">{plan.nameMn}</h3>
                <p className="text-on-surface-variant text-xs mb-4 mt-0.5">{plan.taglineMn}</p>
                <div className="mb-5">
                  {plan.defaultAmountMnt === 0 ? (
                    <span className="text-3xl font-black font-space">Үнэгүй</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black font-space">₮{formatMnt(plan.defaultAmountMnt)}</span>
                      <span className="text-on-surface-variant text-sm font-semibold"> /сар</span>
                    </>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {plan.featuresMn.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-on-surface">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    popular
                      ? 'bg-primary text-on-primary hover:bg-surface-tint'
                      : 'bg-surface-container-high hover:bg-surface-variant text-on-surface border border-outline-variant'
                  }`}
                >
                  {id === 'free' ? 'Үнэгүй эхлэх' : 'Сонгох'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-16">
        <div className="rounded-3xl bg-surface-container border border-primary/25 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/[0.08] rounded-full blur-[140px] pointer-events-none" />
          <h2 className="relative text-2xl md:text-4xl font-black font-space mb-3">Германаа өнөөдөр эхэл</h2>
          <p className="relative text-on-surface-variant text-sm md:text-base mb-8 max-w-lg mx-auto">
            Бүртгэлгүйгээр шууд туршиж үзээд, таалагдвал бүртгүүлээрэй. Эхний 3 өдөр Pro эрх бэлэгтэй.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onTryGuest}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-primary text-on-primary font-bold shadow-[0_10px_30px_-8px_rgba(230,184,92,0.55)] transition-all hover:bg-surface-tint hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5" /> Үнэгүй туршаад үзэх
            </button>
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-bold border border-outline-variant transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Бүртгүүлэх <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 border-t border-outline-variant/60 mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-5 text-sm text-on-surface-variant">
            <a href="/terms" className="hover:text-primary transition-colors">Үйлчилгээний нөхцөл</a>
            <a href="/privacy" className="hover:text-primary transition-colors">Нууцлал</a>
            <a href="/contact" className="hover:text-primary transition-colors">Холбоо барих</a>
          </div>
          <p className="text-xs text-on-surface-variant/70">© {new Date().getFullYear()} Vivid Lingua</p>
        </div>
      </footer>
    </div>
  );
}
