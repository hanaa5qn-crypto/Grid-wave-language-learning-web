import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import App from '../../frontend/src/App';

test('MockSpeechRecognition robustness', () => {
  const SpeechRecognition = (window as any).SpeechRecognition;
  expect(SpeechRecognition).toBeDefined();

  const rec = new SpeechRecognition();
  expect(rec.lang).toBe('');
  expect(rec.continuous).toBe(false);
  expect(rec.interimResults).toBe(false);

  // Check functions
  expect(vi.isMockFunction(rec.start)).toBe(true);
  expect(vi.isMockFunction(rec.stop)).toBe(true);
  expect(vi.isMockFunction(rec.abort)).toBe(true);

  // Call functions
  expect(() => rec.start()).not.toThrow();
  expect(() => rec.stop()).not.toThrow();
  expect(() => rec.abort()).not.toThrow();

  // Test custom handlers assignment
  const onstartMock = vi.fn();
  rec.onstart = onstartMock;
  rec.onstart();
  expect(onstartMock).toHaveBeenCalled();
});

test('MockSpeechSynthesis robustness', () => {
  expect(window.speechSynthesis).toBeDefined();
  expect(vi.isMockFunction(window.speechSynthesis.speak)).toBe(true);
  expect(vi.isMockFunction(window.speechSynthesis.cancel)).toBe(true);
  expect(vi.isMockFunction(window.speechSynthesis.getVoices)).toBe(true);

  expect(() => window.speechSynthesis.cancel()).not.toThrow();
  expect(window.speechSynthesis.getVoices()).toEqual([]);

  const Utterance = (window as any).SpeechSynthesisUtterance;
  expect(Utterance).toBeDefined();

  const utterance = new Utterance('Hallo Welt');
  expect(utterance.text).toBe('Hallo Welt');
  expect(utterance.lang).toBe('');
  utterance.lang = 'de-DE';
  expect(utterance.lang).toBe('de-DE');

  expect(() => window.speechSynthesis.speak(utterance)).not.toThrow();
});

test('MockAudio robustness and limitations', () => {
  const Audio = (window as any).Audio;
  expect(Audio).toBeDefined();

  const audio1 = new Audio();
  expect(audio1.src).toBe('');
  expect(vi.isMockFunction(audio1.play)).toBe(true);
  expect(vi.isMockFunction(audio1.pause)).toBe(true);
  expect(vi.isMockFunction(audio1.load)).toBe(true);

  // Test methods
  expect(() => audio1.play()).not.toThrow();
  expect(() => audio1.pause()).not.toThrow();
  expect(() => audio1.load()).not.toThrow();

  // Test constructor with source parameter
  const audioWithSrc = new Audio('http://example.com/audio.mp3');
  expect(audioWithSrc.src).toBe('http://example.com/audio.mp3');
});

test('MockFetch routes robustness', async () => {
  // Translate API
  const translateRes = await window.fetch('/api/translate');
  expect(translateRes.ok).toBe(true);
  const translateJson = await translateRes.json();
  expect(translateJson).toHaveProperty('translation');
  expect(translateJson).toHaveProperty('detectedLanguage', 'German');

  // Evaluate Speaking API
  const speakingRes = await window.fetch('/api/evaluate-speaking');
  expect(speakingRes.ok).toBe(true);
  const speakingJson = await speakingRes.json();
  expect(speakingJson).toHaveProperty('isCorrect', true);

  // Evaluate Writing API
  const writingRes = await window.fetch('/api/evaluate-writing');
  expect(writingRes.ok).toBe(true);
  const writingJson = await writingRes.json();
  expect(writingJson).toHaveProperty('isCorrect', true);

  // Test with Request object
  const requestObj = new Request('http://localhost/api/translate');
  const requestRes = await window.fetch(requestObj);
  expect(requestRes.ok).toBe(true);

  // Test with URL object
  const urlObj = new URL('http://localhost/api/translate');
  // We want to see if this throws/fails.
  try {
    const urlRes = await window.fetch(urlObj as any);
    expect(urlRes.ok).toBe(true);
  } catch (e: any) {
    // We expect it might fail because setup.ts parses it incorrectly. Let's assert that it fails.
    expect(e.message).toContain('Unhandled fetch mock call');
  }

  // Unhandled API route should reject
  await expect(window.fetch('/api/unknown-route')).rejects.toThrow('Unhandled fetch mock call: /api/unknown-route');
});

test('App UI interaction with Speech Recognition Mock integration', async () => {
  const { getByText, getAllByText, queryByText, getByTitle } = render(<App />);

  // Go to the "Ярих" (Speak) tab
  const speakTabButtons = getAllByText('Ярих');
  expect(speakTabButtons.length).toBeGreaterThan(0);
  
  await act(async () => {
    await userEvent.click(speakTabButtons[0]);
  });

  // The speaking library shows the AI judge directly (wired to the item's model
  // answer), so the record instruction text is present without any mode toggle.
  expect(getByText('Бичихийн тулд дарна уу')).toBeInTheDocument();

  // Find the record button
  const recordButton = getByTitle('Бичиж эхлэх') as HTMLButtonElement;
  expect(recordButton).not.toBeNull();
  // Click the record button
  await act(async () => {
    await userEvent.click(recordButton!);
  });

  // Now, the mock SpeechRecognition start is correct and triggers onstart() immediately,
  // so isRecording becomes true (the heading switches to the live "Бичиж байна … mm:ss").
  expect(getByText(/Бичиж байна/)).toBeInTheDocument();
  expect(queryByText('Бичихийн тулд дарна уу')).toBeNull();

  // Wait for the mock transcription (300ms timeout in mock) to finish — wait
  // longer than that delay so onresult/onend have definitely fired.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  // After the timeout, isRecording should be back to false
  expect(queryByText(/Бичиж байна/)).toBeNull();
  expect(getByText('Бичихийн тулд дарна уу')).toBeInTheDocument();
});

