import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Stub window.scrollTo
window.scrollTo = vi.fn();

// Stub SpeechRecognition
class MockSpeechRecognition {
  lang = '';
  continuous = false;
  interimResults = false;
  onstart: (() => void) | null = null;
  onresult: ((e: any) => void) | null = null;
  onerror: ((e: any) => void) | null = null;
  onend: (() => void) | null = null;

  private _timer: any = null;

  start = vi.fn().mockImplementation(() => {
    if (this.onstart) {
      this.onstart();
    }
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._timer = setTimeout(() => {
      if (this.onresult) {
        this.onresult({
          results: [[{ transcript: 'Hallo, wie geht es dir?' }]]
        });
      }
      if (this.onend) {
        this.onend();
      }
    }, 50);
  });

  stop = vi.fn().mockImplementation(() => {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    if (this.onend) {
      this.onend();
    }
  });

  abort = vi.fn().mockImplementation(() => {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    if (this.onend) {
      this.onend();
    }
  });
}

(window as any).SpeechRecognition = MockSpeechRecognition;
(window as any).webkitSpeechRecognition = MockSpeechRecognition;

// Stub speechSynthesis
const mockSpeechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn().mockReturnValue([]),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  onvoiceschanged: null,
  paused: false,
  pending: false,
  speaking: false,
};

Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
  writable: true,
});

class MockSpeechSynthesisUtterance {
  text = '';
  lang = '';
  voice = null;
  volume = 1;
  rate = 1;
  pitch = 1;
  onstart = null;
  onend = null;
  onerror = null;
  constructor(text?: string) {
    this.text = text || '';
  }
}
(window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

// Stub Audio
class MockAudio {
  src = '';
  constructor(src?: string) {
    if (src) {
      this.src = src;
    }
  }
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  load = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
}
(window as any).Audio = MockAudio;
(global as any).Audio = MockAudio;

// Mock relative fetch calls
window.fetch = vi.fn().mockImplementation((url) => {
  let urlStr = '';
  if (typeof url === 'string') {
    urlStr = url;
  } else if (url && typeof url === 'object') {
    if ('href' in url) {
      urlStr = (url as any).href;
    } else if ('url' in url) {
      urlStr = (url as any).url;
    } else if (typeof url.toString === 'function') {
      urlStr = url.toString();
    }
  }

  if (urlStr.includes('/api/translate')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        translation: 'Сайн байна уу?',
        detectedLanguage: 'German',
        pronunciation: 'Хало!',
        grammarExplanation: 'Герман хэлний мэндчилгээ.',
        words: [
          { word: 'Hallo', baseForm: 'Hallo', partOfSpeech: 'Interjection', translation: 'Сайн уу', explanation: 'Мэндчилгээ.' }
        ],
        examples: [
          { german: 'Hallo!', mongolian: 'Сайн уу!' }
        ]
      })
    } as Response);
  }

  if (urlStr.includes('/api/evaluate-speaking')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        isCorrect: true,
        analysis: 'Сайн байна. Дуудлага зөв.',
        feedbackMessage: 'Маш сайн байна!'
      })
    } as Response);
  }

  if (urlStr.includes('/api/evaluate-writing')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        isCorrect: true,
        corrected: 'Sie trinkt jeden Morgen Kaffee.',
        explanation: 'Энэ өгүүлбэр нь зөв байна.',
        feedbackMessage: 'Маш сайн! Зөв байна.'
      })
    } as Response);
  }

  return Promise.reject(new Error(`Unhandled fetch mock call: ${urlStr}`));
});
