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
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Vivid</span> Lingua
      </span>
    </a>
  );
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="bg-background text-white font-sans min-h-dvh w-full overflow-x-hidden relative selection:bg-purple-500/30">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Header nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center">
          <Logo />
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black font-space mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          {title}
        </h1>

        {/* Prose content — dark-theme readable styles applied here */}
        <div className="
          space-y-6 text-slate-300 leading-relaxed
          [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:font-space [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3
          [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-purple-300 [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:text-sm [&_p]:md:text-base [&_p]:text-slate-300
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-sm [&_ul]:md:text-base
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:text-sm [&_ol]:md:text-base
          [&_a]:text-purple-400 [&_a]:underline [&_a]:hover:text-purple-300
          [&_strong]:text-white [&_strong]:font-semibold
          [&_hr]:border-white/10 [&_hr]:my-8
        ">
          {children}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Нүүр хуудас руу буцах
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Vivid Lingua</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/terms" className="hover:text-white transition-colors">Үйлчилгээний нөхцөл</a>
            <a href="/privacy" className="hover:text-white transition-colors">Нууцлал</a>
            <a href="/contact" className="hover:text-white transition-colors">Холбоо барих</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
