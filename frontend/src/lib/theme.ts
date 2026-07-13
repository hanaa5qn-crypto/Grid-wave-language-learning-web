// Theme switching: sets a theme class on <html>, which flips every CSS
// custom property redefined under the matching html.<theme> block in
// index.css. 'dark' is the default ("Aurora Atelier" monochrome) and has
// no class; 'light' and 'gold' add their class.
// No context/provider — a settings control can just call setTheme() directly.
import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light' | 'gold' | 'aurora';

const STORAGE_KEY = 'theme';
const listeners = new Set<() => void>();

function subscribeTheme(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Reactive theme — re-renders the consumer when setTheme() is called.
    Lets components swap markup per theme (e.g. the gold dashboard). */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, getTheme, () => 'dark' as Theme);
}
const THEME_COLOR = {
  dark: '#0c0b09',
  light: '#fdfcfa',
  gold: '#0c0b09',
  aurora: '#060512',
} as const;

export function getTheme(): Theme {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === 'light' || t === 'gold' || t === 'aurora' ? t : 'dark';
  } catch {
    return 'dark';
  }
}

export function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ponytail: private-mode/quota localStorage failures shouldn't block theming
  }
  document.documentElement.classList.remove('light', 'gold', 'aurora');
  if (theme !== 'dark') document.documentElement.classList.add(theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[theme]);

  listeners.forEach((cb) => cb());
}
