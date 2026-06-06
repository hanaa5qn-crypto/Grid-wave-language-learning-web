import { expect, test, vi } from 'vitest';

test('SpeechRecognition stub is robust and doesn\'t throw', () => {
  const SpeechRecognition = (window as any).SpeechRecognition;
  expect(SpeechRecognition).toBeDefined();

  const instance = new SpeechRecognition();
  expect(instance.start).toBeDefined();
  expect(instance.stop).toBeDefined();
  expect(instance.abort).toBeDefined();

  // Test calling methods
  expect(() => instance.start()).not.toThrow();
  expect(() => instance.stop()).not.toThrow();
  expect(() => instance.abort()).not.toThrow();

  // Test webkitSpeechRecognition
  const webkitSpeechRecognition = (window as any).webkitSpeechRecognition;
  expect(webkitSpeechRecognition).toBe(SpeechRecognition);
});

test('speechSynthesis stub has expected methods and properties', () => {
  expect(window.speechSynthesis).toBeDefined();
  expect(typeof window.speechSynthesis.speak).toBe('function');
  expect(typeof window.speechSynthesis.cancel).toBe('function');
  expect(typeof window.speechSynthesis.getVoices).toBe('function');

  expect(() => window.speechSynthesis.speak({} as SpeechSynthesisUtterance)).not.toThrow();
  expect(() => window.speechSynthesis.cancel()).not.toThrow();
  expect(window.speechSynthesis.getVoices()).toEqual([]);
});

test('SpeechSynthesisUtterance stub supports construction and parameters', () => {
  const SpeechSynthesisUtterance = (window as any).SpeechSynthesisUtterance;
  expect(SpeechSynthesisUtterance).toBeDefined();

  const utterance = new SpeechSynthesisUtterance('Hallo Welt');
  expect(utterance.text).toBe('Hallo Welt');
  expect(utterance.lang).toBe('');
  expect(utterance.rate).toBe(1);

  // Check property assignment
  utterance.lang = 'de-DE';
  utterance.rate = 1.5;
  expect(utterance.lang).toBe('de-DE');
  expect(utterance.rate).toBe(1.5);
});

test('Audio stub constructor and methods are robust', () => {
  const MockAudio = (window as any).Audio;
  expect(MockAudio).toBeDefined();

  const audio = new MockAudio();
  expect(audio.play).toBeDefined();
  expect(audio.pause).toBeDefined();
  expect(audio.load).toBeDefined();

  expect(audio.play()).toBeInstanceOf(Promise);
  expect(() => audio.pause()).not.toThrow();
  expect(() => audio.load()).not.toThrow();
});

test('fetch mock returns correct structured data and rejects unhandled URLs', async () => {
  // Test translate
  const translateRes = await fetch('/api/translate');
  expect(translateRes.ok).toBe(true);
  const translateJson = await translateRes.json();
  expect(translateJson).toHaveProperty('translation');
  expect(translateJson).toHaveProperty('detectedLanguage');

  // Test evaluate-speaking
  const speakingRes = await fetch('/api/evaluate-speaking');
  expect(speakingRes.ok).toBe(true);
  const speakingJson = await speakingRes.json();
  expect(speakingJson).toHaveProperty('isCorrect');
  expect(speakingJson).toHaveProperty('feedbackMessage');

  // Test evaluate-writing
  const writingRes = await fetch('/api/evaluate-writing');
  expect(writingRes.ok).toBe(true);
  const writingJson = await writingRes.json();
  expect(writingJson).toHaveProperty('isCorrect');
  expect(writingJson).toHaveProperty('feedbackMessage');

  // Test unhandled URL
  await expect(fetch('/api/unknown-endpoint')).rejects.toThrow('Unhandled fetch mock call');
});
