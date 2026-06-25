import React from 'react';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 font-normal font-serif tracking-tight text-xl hover:opacity-80 transition-opacity">
      <img src="/favicon.svg" alt="" className="w-7 h-7" />
      <span>
        <span className="text-paper">Vivid</span> <span className="text-paper-2">Lingua</span>
      </span>
    </a>
  );
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="bg-ink text-paper font-sans min-h-dvh w-full overflow-x-hidden relative selection:bg-paper selection:text-ink">
      {/* Ambient depth */}
      <div className="absolute top-[-10%] left-1/5 w-[600px] h-[600px] bg-paper/[0.03] rounded-full blur-[170px] pointer-events-none" />

      {/* Header nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-ink/80 border-b border-ink-line/60">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center">
          <Logo />
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-light font-serif tracking-tight mb-8 text-paper">
          {title}
        </h1>

        {/* Prose content — dark-theme readable styles applied here */}
        <div className="
          space-y-6 text-paper-2 leading-relaxed
          [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:font-serif [&_h2]:tracking-tight [&_h2]:text-paper [&_h2]:mt-12 [&_h2]:mb-4
          [&_h3]:text-xs [&_h3]:font-medium [&_h3]:uppercase [&_h3]:tracking-[0.18em] [&_h3]:text-paper-3 [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:text-sm [&_p]:md:text-base [&_p]:text-paper-2
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-sm [&_ul]:md:text-base [&_ul]:text-paper-2 [&_ul]:marker:text-paper-3
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:text-sm [&_ol]:md:text-base [&_ol]:text-paper-2 [&_ol]:marker:text-paper-3
          [&_a]:text-paper [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-ink-line-2 [&_a]:hover:text-paper-2 [&_a]:transition-colors
          [&_strong]:text-paper [&_strong]:font-medium
          [&_hr]:border-ink-line [&_hr]:my-8
        ">
          {children}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-ink-line">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-paper-2 hover:text-paper transition-colors"
          >
            ← Нүүр хуудас руу буцах
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ink-line/60 mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-paper-3">© {new Date().getFullYear()} Vivid Lingua</p>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.18em] text-paper-2">
            <a href="/terms" className="hover:text-paper transition-colors">Үйлчилгээний нөхцөл</a>
            <a href="/privacy" className="hover:text-paper transition-colors">Нууцлал</a>
            <a href="/contact" className="hover:text-paper transition-colors">Холбоо барих</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
