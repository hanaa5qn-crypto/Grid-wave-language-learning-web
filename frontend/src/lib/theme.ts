// Theme switching: toggles the `light` class on <html>, which flips every
// CSS custom property redefined under the `html.light` block in index.css.
// No context/provider — a settings toggle can just call setTheme() directly.
export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const THEME_COLOR = { dark: '#0c0b09', light: '#fdfcfa' } as const;

export function getTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
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
  document.documentElement.classList.toggle('light', theme === 'light');

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[theme]);
}
