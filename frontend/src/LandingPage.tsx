import {
  BookOpen, Headphones, Mic, Edit3, Languages, Sparkles, GraduationCap, Swords,
  ArrowRight, Check, Target, Globe, Bot, Star, Play,
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

const SKILLS = [
  { icon: BookOpen, title: 'Унших', desc: 'Монгол тайлбартай түвшний бичвэрүүд, ойлголтын асуултууд.', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { icon: Headphones, title: 'Сонсох', desc: 'Жинхэнэ герман дуудлага, удаашруулах, давтах боломжтой.', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { icon: Mic, title: 'Ярих', desc: 'AI дуут багш дуудлагыг чинь үнэлж, шууд зөвлөмж өгнө.', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { icon: Edit3, title: 'Бичих', desc: 'Эссэ, өгүүлбэрээ AI-аар дүрмийн засвар, оноотой шалгуул.', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { icon: Languages, title: 'Үгийн сан', desc: 'A1–C2 хүртэлх флаш карт, давталтын ухаалаг систем (SRS).', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' },
  { icon: Bot, title: 'AI орчуулагч', desc: 'Хүссэн өгүүлбэрээ орчуулж, дүрмийн тайлбар авах.', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  { icon: GraduationCap, title: 'TestDaF шалгалт', desc: 'Жинхэнэ шалгалтын загвараар бэлтгэл хийх симуляци.', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  { icon: Swords, title: 'Тулаан', desc: 'Найзтайгаа герман хэлээр өрсөлдөж, хамт суралц.', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
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
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Vivid</span> Lingua
      </span>
    </span>
  );
}

export default function LandingPage({ onGetStarted, onLogin, onTryGuest }: LandingPageProps) {
  return (
    <div className="bg-background text-white font-sans min-h-dvh w-full overflow-x-hidden relative selection:bg-purple-500/30">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[150px] pointer-events-none" />

      {/* ---------- Nav ---------- */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={onLogin}
              className="px-3 md:px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Нэвтрэх
            </button>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 text-sm font-bold rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border border-white/10 transition-all cursor-pointer"
            >
              Эхлэх
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <header className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Монголчуудад зориулсан герман хэлний платформ
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-space tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Герман хэлээ{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">монголоороо</span>{' '}
          ухаалгаар сур
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Унших, сонсох, ярих, бичих дасгал, AI багш, TestDaF загвар шалгалт, үгийн сан — бүгд нэг
          дор, монгол хэл дээрх тайлбартай. A1-ээс C2 хүртэл.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onTryGuest}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-base border border-white/10 shadow-[0_8px_30px_rgba(168,85,247,0.35)] transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5" /> Үнэгүй туршаад үзэх
          </button>
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-base border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Бүртгүүлэх <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-500 font-semibold">
          Картын мэдээлэл шаардахгүй · Бүртгэлгүйгээр шууд эхэл · Бүртгүүлбэл 3 өдрийн Pro бэлэгтэй
        </p>
      </header>

      {/* ---------- Skills grid ---------- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black font-space text-center mb-3">Нэг апп — таван чадвар</h2>
        <p className="text-slate-400 text-center text-sm md:text-base mb-10 max-w-xl mx-auto">
          Хэлний бүх талыг хамарсан дасгалууд, ухаалаг хэрэгслүүд.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((s) => (
            <div
              key={s.title}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/40 hover:bg-white/[0.07] transition-all"
            >
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-1">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Value props ---------- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="text-center md:text-left">
              <div className="inline-flex w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 items-center justify-center text-purple-300 mb-4">
                <v.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold mb-2">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black font-space text-center mb-10">Хэрхэн ажилладаг вэ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-black font-space">
                {step.n}
              </div>
              <h3 className="font-bold text-base mb-1">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-purple-500/50" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black font-space text-center mb-3">Үнэ — өөртөө тохируул</h2>
        <p className="text-slate-400 text-center text-sm md:text-base mb-10">
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
                    ? 'bg-purple-950/30 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.2)] md:scale-[1.03]'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" /> Түгээмэл сонголт
                  </span>
                )}
                <h3 className="text-lg font-extrabold font-space">{plan.nameMn}</h3>
                <p className="text-slate-400 text-xs mb-4 mt-0.5">{plan.taglineMn}</p>
                <div className="mb-5">
                  {plan.defaultAmountMnt === 0 ? (
                    <span className="text-3xl font-black font-space">Үнэгүй</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black font-space">₮{formatMnt(plan.defaultAmountMnt)}</span>
                      <span className="text-slate-400 text-sm font-semibold"> /сар</span>
                    </>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {plan.featuresMn.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    popular
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border border-white/10'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/15'
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
        <div className="rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 p-8 md:p-12 text-center backdrop-blur-sm">
          <h2 className="text-2xl md:text-4xl font-black font-space mb-3">Германаа өнөөдөр эхэл</h2>
          <p className="text-slate-300 text-sm md:text-base mb-8 max-w-lg mx-auto">
            Бүртгэлгүйгээр шууд туршиж үзээд, таалагдвал бүртгүүлээрэй. Эхний 3 өдөр Pro эрх бэлэгтэй.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onTryGuest}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold border border-white/10 shadow-[0_8px_30px_rgba(168,85,247,0.35)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5" /> Үнэгүй туршаад үзэх
            </button>
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Бүртгүүлэх <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 border-t border-white/5 mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-5 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Үйлчилгээний нөхцөл</a>
            <a href="#" className="hover:text-white transition-colors">Нууцлал</a>
            <a href="#" className="hover:text-white transition-colors">Холбоо барих</a>
          </div>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Vivid Lingua</p>
        </div>
      </footer>
    </div>
  );
}
