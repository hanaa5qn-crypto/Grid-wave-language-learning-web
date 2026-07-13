import { describe, it, expect } from 'vitest';
import { getTheme, setTheme } from '../frontend/src/lib/theme';

describe('theme', () => {
  it('defaults to dark and rejects unknown stored values', () => {
    localStorage.setItem('theme', 'neon');
    expect(getTheme()).toBe('dark');
  });

  it('round-trips gold/aurora/light and swaps html classes exclusively', () => {
    setTheme('gold');
    expect(getTheme()).toBe('gold');
    expect(document.documentElement.classList.contains('gold')).toBe(true);

    setTheme('aurora');
    expect(getTheme()).toBe('aurora');
    expect(document.documentElement.classList.contains('gold')).toBe(false);
    expect(document.documentElement.classList.contains('aurora')).toBe(true);

    setTheme('light');
    expect(getTheme()).toBe('light');
    expect(document.documentElement.classList.contains('aurora')).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(true);

    setTheme('dark');
    expect(getTheme()).toBe('dark');
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.documentElement.classList.contains('gold')).toBe(false);
  });
});
