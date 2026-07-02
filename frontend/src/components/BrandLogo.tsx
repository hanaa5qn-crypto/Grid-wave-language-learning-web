export function BrandLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="brand-logo-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ededeb" />
          <stop offset="1" stopColor="#9b9893" />
        </linearGradient>
      </defs>
      <circle cx="13" cy="19" r="9" fill="url(#brand-logo-grad)" />
      <line x1="43" y1="16" x2="30" y2="48" stroke="url(#brand-logo-grad)" strokeWidth="18" strokeLinecap="round" />
    </svg>
  );
}
