import React from 'react';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 font-black font-space tracking-tight text-xl hover:opacity-80 transition-opacity">
      <img src="/favicon.svg" alt="" className="w-7 h-7" />
      <span>
        <span className="text-primary">Vivid</span> Lingua
      </span>
    </a>
  );
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="bg-background text-on-background font-sans min-h-dvh w-full overflow-x-hidden relative selection:bg-primary/30 selection:text-on-primary">
      {/* Ambient warmth */}
      <div className="absolute top-[-10%] left-1/5 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-[40%] right-1/5 w-[500px] h-[500px] bg-secondary/[0.045] rounded-full blur-[160px] pointer-events-none" />

      {/* Header nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-outline-variant/60">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center">
          <Logo />
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black font-space mb-8 text-primary">
          {title}
        </h1>

        {/* Prose content — dark-theme readable styles applied here */}
        <div className="
          space-y-6 text-on-surface-variant leading-relaxed
          [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:font-space [&_h2]:text-on-surface [&_h2]:mt-10 [&_h2]:mb-3
          [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-primary [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:text-sm [&_p]:md:text-base [&_p]:text-on-surface-variant
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-sm [&_ul]:md:text-base
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:text-sm [&_ol]:md:text-base
          [&_a]:text-primary [&_a]:underline [&_a]:hover:text-surface-tint
          [&_strong]:text-on-surface [&_strong]:font-semibold
          [&_hr]:border-outline-variant [&_hr]:my-8
        ">
          {children}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-outline-variant">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            ← Нүүр хуудас руу буцах
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-outline-variant/60 mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-on-surface-variant/70">© {new Date().getFullYear()} Vivid Lingua</p>
          <div className="flex items-center gap-4 text-xs text-on-surface-variant">
            <a href="/terms" className="hover:text-primary transition-colors">Үйлчилгээний нөхцөл</a>
            <a href="/privacy" className="hover:text-primary transition-colors">Нууцлал</a>
            <a href="/contact" className="hover:text-primary transition-colors">Холбоо барих</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
