import React, { useEffect, useState } from 'react';
import {
  ArrowRight, BookOpen, Headphones, Mic, PenLine, Languages, Swords,
  Mail, Phone, GraduationCap, Menu, X,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// HeroPage — the signed-out landing, in the "Velorah" cinematic-minimalist
// style: deep graphite void, Instrument Serif display type, Inter body, and
// luminous "liquid glass" surfaces. It carries Vivid Lingua's real brand info
// and funnels every CTA into login / signup (handled by AuthGate).
// ─────────────────────────────────────────────────────────────────────────────

interface HeroPageProps {
  onLogin: () => void;
  onSignup: () => void;
  onGuest?: () => void;
}

const serif = { fontFamily: '"Instrument Serif", Georgia, "Times New Roman", serif' } as const;

const SKILLS = [
  { icon: BookOpen, title: 'Reading', desc: 'Graded texts with Mongolian glosses.' },
  { icon: Headphones, title: 'Listening', desc: 'Native audio you can slow and replay.' },
  { icon: Mic, title: 'Speaking', desc: 'Speak aloud, get instant AI feedback.' },
  { icon: PenLine, title: 'Writing', desc: 'Compositions corrected line by line.' },
  { icon: Languages, title: 'Vocabulary', desc: 'A1–C2 flashcards with smart review.' },
  { icon: Swords, title: 'Duels', desc: 'Race a friend through the same ten words.' },
];

export default function HeroPage({ onLogin, onSignup, onGuest }: HeroPageProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV = [
    { label: 'Home', href: '#top' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Reach us', href: '#contact' },
  ];

  return (
    <div
      id="top"
      className="relative min-h-screen w-full overflow-x-hidden bg-[#141313] text-[#e5e2e1] antialiased selection:bg-white selection:text-[#141313]"
      style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
    >
      {/* Self-contained motion + glass styles (scoped to the hero) */}
      <style>{`
        @keyframes vlRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .vl-rise   { animation: vlRise 1s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .vl-rise-1 { animation: vlRise 1s cubic-bezier(0.16,1,0.3,1) .15s forwards; opacity: 0; }
        .vl-rise-2 { animation: vlRise 1s cubic-bezier(0.16,1,0.3,1) .30s forwards; opacity: 0; }
        .vl-rise-3 { animation: vlRise 1s cubic-bezier(0.16,1,0.3,1) .45s forwards; opacity: 0; }
        .vl-glass {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.10);
        }
        @media (prefers-reduced-motion: reduce) {
          .vl-rise, .vl-rise-1, .vl-rise-2, .vl-rise-3 { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Atmospheric glows — cinematic depth without an external video */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[40vh] w-[40vh] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      {/* ── Top navigation ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ${
          scrolled ? 'vl-glass border-white/10' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 md:px-16 md:py-6">
          <a href="#top" className="text-2xl tracking-tight text-white transition-opacity hover:opacity-80 md:text-3xl" style={serif}>
            Vivid&nbsp;Lingua<sup className="ml-0.5 text-xs align-super">®</sup>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#c4c7c8] transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </div>

          <button
            onClick={onLogin}
            className="vl-glass group hidden items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10 md:inline-flex"
          >
            Log in
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button onClick={() => setMenuOpen((v) => !v)} className="p-2 text-white md:hidden" aria-label="Menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="vl-glass border-t border-white/10 px-5 pb-6 pt-2 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[#c4c7c8] hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onLogin(); }}
              className="mt-2 w-full rounded-full border border-white/15 py-3 text-[12px] font-medium uppercase tracking-[0.18em] text-white"
            >
              Log in
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero fold ──────────────────────────────────────────────────── */}
      <header className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center md:px-16">
        <p className="vl-rise mb-7 text-[11px] font-medium uppercase tracking-[0.35em] text-[#8e9192]">
          German&nbsp;·&nbsp;English&nbsp;·&nbsp;Built for Mongolia
        </p>

        <h1 className="vl-rise-1 mb-8 max-w-4xl text-[2.6rem] leading-[1.05] tracking-tight text-white md:text-[88px]" style={serif}>
          Where fluency <em className="not-italic text-[#9a9d9e]">rises</em>
          <br className="hidden md:block" /> through the <em className="not-italic text-[#9a9d9e]">silence.</em>
        </h1>

        <p className="vl-rise-2 mb-3 max-w-2xl text-lg leading-relaxed text-[#c4c7c8]">
          German and English, crafted for Mongolian learners — read, write, listen,
          and speak your way to a new language, without the noise.
        </p>
        <p className="vl-rise-2 mb-12 text-sm text-[#8e9192]">
          Монголчуудад зориулсан герман, англи хэлний платформ.
        </p>

        <div className="vl-rise-3 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={onSignup}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#141313] transition-all duration-300 hover:bg-[#e2e2e2]"
          >
            Begin journey
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={onLogin}
            className="vl-glass inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
          >
            I already have an account
          </button>
        </div>

        {onGuest && (
          <button
            onClick={onGuest}
            className="vl-rise-3 mt-6 text-[12px] uppercase tracking-[0.2em] text-[#8e9192] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Just browse — no account
          </button>
        )}

        <div className="vl-rise-3 absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center opacity-60 md:flex">
          <span className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[#8e9192]">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </header>

      {/* ── Tracks ─────────────────────────────────────────────────────── */}
      <section id="tracks" className="relative z-10 mx-auto max-w-[1280px] px-5 py-24 md:px-16 md:py-32">
        <h2 className="mb-3 text-center text-3xl tracking-tight text-white md:text-5xl" style={serif}>
          Two languages. One quiet place to learn.
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-[#8e9192]">
          Pick a track after you sign in — your progress is saved across both.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="vl-glass rounded-xl border border-white/10 p-8 transition-colors hover:bg-white/[0.04]">
            <div className="mb-4 text-4xl" aria-hidden="true">🇩🇪</div>
            <h3 className="mb-2 text-2xl text-white" style={serif}>German</h3>
            <p className="text-[#c4c7c8]">
              A1–C2 with Mongolian explanations, an AI tutor, and TestDaF / Goethe-style
              model exams across all five skills.
            </p>
          </div>
          <div className="vl-glass rounded-xl border border-white/10 p-8 transition-colors hover:bg-white/[0.04]">
            <div className="mb-4 text-4xl" aria-hidden="true">🇬🇧</div>
            <h3 className="mb-2 text-2xl text-white" style={serif}>English</h3>
            <p className="text-[#c4c7c8]">
              A dedicated IELTS and SAT track — full practice tests, targeted vocabulary,
              and AI review written back in Mongolian.
            </p>
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10 mx-auto max-w-[1280px] px-5 py-24 md:px-16 md:py-32">
        <h2 className="mb-3 text-center text-3xl tracking-tight text-white md:text-5xl" style={serif}>
          One app — every skill.
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-[#8e9192]">
          Reading, listening, speaking, writing, vocabulary, and friendly competition —
          all in a single, distraction-free flow.
        </p>

        <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#141313] p-8 transition-colors hover:bg-[#1c1b1b]">
              <Icon className="mb-4 h-6 w-6 text-white" strokeWidth={1.5} />
              <h3 className="mb-1.5 text-xl text-white" style={serif}>{title}</h3>
              <p className="text-sm leading-relaxed text-[#8e9192]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About / mission ────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center md:px-16 md:py-32">
        <GraduationCap className="mx-auto mb-8 h-8 w-8 text-white/70" strokeWidth={1.25} />
        <blockquote className="text-2xl leading-snug text-[#e5e2e1] md:text-[34px]" style={serif}>
          “Монгол хэлтэй суралцагчдад зориулсан платформ байхгүй байсан — бүх зүйл англиар
          дамждаг байлаа. Тэр цоорхойг бөглөхийн тулд Vivid Lingua-г бүтээсэн. Дуусаагүй
          боловч үнэнч.”
        </blockquote>
        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8e9192]">
          Khansumber Altankhuyag — Founder, Vivid Lingua
        </p>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 mx-auto max-w-[1280px] px-5 pb-8 md:px-16">
        <div className="vl-glass rounded-xl border border-white/10 p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="mb-3 text-3xl text-white md:text-4xl" style={serif}>Reach us</h2>
              <p className="max-w-md text-[#c4c7c8]">
                Questions, feedback, or partnership ideas? We reply within 1–2 business days
                (Mon–Fri). Асуудлаа доорх хаягаар илгээнэ үү.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hanaa5qn@gmail.com"
                className="vl-glass group inline-flex items-center gap-3 rounded-lg border border-white/10 px-5 py-3.5 text-white transition-colors hover:bg-white/10"
              >
                <Mail className="h-4 w-4 text-[#c4c7c8]" />
                <span className="text-sm tracking-wide">hanaa5qn@gmail.com</span>
              </a>
              <a
                href="tel:+97672109647"
                className="vl-glass group inline-flex items-center gap-3 rounded-lg border border-white/10 px-5 py-3.5 text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-[#c4c7c8]" />
                <span className="text-sm tracking-wide">+976 7210&#8209;9647</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 py-24 text-center md:px-16 md:py-28">
        <h2 className="mb-8 text-4xl tracking-tight text-white md:text-6xl" style={serif}>
          Start today.
        </h2>
        <button
          onClick={onSignup}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#141313] transition-all duration-300 hover:bg-[#e2e2e2]"
        >
          Create your account
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-5 py-8 text-[#8e9192] md:flex-row md:px-16">
          <span className="text-xl text-white" style={serif}>Vivid&nbsp;Lingua<sup className="ml-0.5 text-[10px] align-super">®</sup></span>
          <span className="text-xs tracking-wide">© {new Date().getFullYear()} Vivid Lingua · Khansumber Altankhuyag</span>
        </div>
      </footer>
    </div>
  );
}
