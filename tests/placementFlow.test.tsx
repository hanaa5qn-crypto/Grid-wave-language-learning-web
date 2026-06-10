import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PlacementTest from '../frontend/src/PlacementTest';
import {
  PLACEMENT_QUESTION_INDEX, PLACEMENT_TOTAL_QUESTIONS, PlacementQuestion, PlacementRecord,
} from '../frontend/src/placement';

// Дэлгэцэн дээрх одоогийн асуултыг data-question-id-аар олж буцаана.
function currentQuestion(): PlacementQuestion {
  const wrapper = document.querySelector('[data-question-id]');
  expect(wrapper, 'quiz question should be on screen').not.toBeNull();
  const q = PLACEMENT_QUESTION_INDEX.get(wrapper!.getAttribute('data-question-id')!);
  expect(q).toBeTruthy();
  return q!;
}

// Одоогийн асуултад зөв/буруу хариулаад "Дараах" дарна.
function answerCurrent(correctly: boolean) {
  const q = currentQuestion();
  const idx = correctly ? q.correctIndex : (q.correctIndex + 1) % q.choices.length;
  fireEvent.click(screen.getByText(q.choices[idx]));
  fireEvent.click(screen.getByText('Дараах'));
}

function answerAll(correctly: boolean) {
  for (let i = 0; i < PLACEMENT_TOTAL_QUESTIONS; i++) answerCurrent(correctly);
}

describe('PlacementTest adaptive flow', () => {
  // Тест бүр цэвэр localStorage-тэй эхэлнэ (явц хадгалах боломж нэмэгдсэн).
  beforeEach(() => localStorage.clear());

  it('hides the price until the test is finished, then asks 5000₮ to reveal', () => {
    const onFinish = vi.fn();
    render(<PlacementTest isFounder={false} onFinish={onFinish} onSkip={() => {}} />);

    // Танилцуулга 40–50 минутын тестийг тайлбарлах ёстой ч үнэ дурдахгүй.
    expect(screen.getByText(/40–50 минут/)).toBeTruthy();
    expect(screen.queryByText(/5,?000₮/)).toBeNull();
    fireEvent.click(screen.getByText('Тест эхлүүлэх'));
    expect(screen.queryByText(/5,?000₮/)).toBeNull();

    answerAll(true);

    // Тест дууссаны дараа л үнэ харагдана; түвшин түгжээтэй хэвээр.
    expect(screen.getByText('Тест дууслаа! 🎉')).toBeTruthy();
    expect(screen.getAllByText(/5,?000₮/).length).toBeGreaterThan(0);
    expect(screen.queryByText('Таны түвшин')).toBeNull();

    // Үр дүнг нээлгүй гарахад unlocked=false бичлэгтэй дуусна.
    fireEvent.click(screen.getByText(/Үр дүнг нээлгүй үргэлжлүүлэх/));
    expect(onFinish).toHaveBeenCalledTimes(1);
    const record = onFinish.mock.calls[0][0] as PlacementRecord;
    expect(record.unlocked).toBe(false);
    expect(record.totalQuestions).toBe(PLACEMENT_TOTAL_QUESTIONS);
    expect(record.level).toBe('C2');
    cleanup();
  });

  it('escalates difficulty after consecutive correct answers', () => {
    render(<PlacementTest isFounder={true} onFinish={() => {}} onSkip={() => {}} />);
    fireEvent.click(screen.getByText('Тест эхлүүлэх'));

    // Эхний асуулт A1; 2 дараалсан зөвийн дараа гурав дахь асуулт A2 болно.
    expect(currentQuestion().level).toBe('A1');
    answerCurrent(true);
    answerCurrent(true);
    expect(currentQuestion().level).toBe('A2');

    // Буруу хариулбал буцаад хөнгөрнө.
    answerCurrent(false);
    expect(currentQuestion().level).toBe('A1');
    cleanup();
  });

  it('unlocks the result for founder accounts without payment', () => {
    const onFinish = vi.fn();
    render(<PlacementTest isFounder={true} onFinish={onFinish} onSkip={() => {}} />);

    fireEvent.click(screen.getByText('Тест эхлүүлэх'));
    answerAll(true);

    // Төлбөрийн шат алгасагдаж, үр дүн шууд нээгдэнэ.
    expect(screen.getByText(/Founder — төлбөргүй нээгдлээ/)).toBeTruthy();
    expect(screen.getByText('Таны түвшин')).toBeTruthy();
    expect(screen.getByText('C2')).toBeTruthy();

    fireEvent.click(screen.getByText(/түвшнээс суралцаж эхлэх/));
    const record = onFinish.mock.calls[0][0] as PlacementRecord;
    expect(record.unlocked).toBe(true);
    expect(record.unlockedBy).toBe('founder');
    cleanup();
  });

  it('keeps a struggling learner at A1 after a full all-wrong run', () => {
    const onFinish = vi.fn();
    render(<PlacementTest isFounder={true} onFinish={onFinish} onSkip={() => {}} />);

    fireEvent.click(screen.getByText('Тест эхлүүлэх'));
    answerAll(false);

    fireEvent.click(screen.getByText(/түвшнээс суралцаж эхлэх/));
    const record = onFinish.mock.calls[0][0] as PlacementRecord;
    expect(record.level).toBe('A1');
    expect(record.totalQuestions).toBe(PLACEMENT_TOTAL_QUESTIONS);
    cleanup();
  });

  it('restores an in-progress quiz after a remount (browser refresh)', () => {
    render(<PlacementTest isFounder={true} onFinish={() => {}} onSkip={() => {}} />);
    fireEvent.click(screen.getByText('Тест эхлүүлэх'));
    answerCurrent(true);
    answerCurrent(true);
    answerCurrent(true);
    const questionBeforeRefresh = currentQuestion();
    cleanup(); // refresh-ийг дуурайна

    render(<PlacementTest isFounder={true} onFinish={() => {}} onSkip={() => {}} />);
    // Танилцуулга дээр үргэлжлүүлэх санал гарна.
    fireEvent.click(screen.getByText(/Дуусгаагүй тест байна — 3\/60/));
    // Яг өмнөх асуултаас, тоолуур 4/60-аас үргэлжилнэ.
    expect(currentQuestion().id).toBe(questionBeforeRefresh.id);
    expect(screen.getByText(`4 / ${PLACEMENT_TOTAL_QUESTIONS}`)).toBeTruthy();
    cleanup();
  });

  it('restores the finished paywall after a refresh so answers are not lost', () => {
    render(<PlacementTest isFounder={false} onFinish={() => {}} onSkip={() => {}} />);
    fireEvent.click(screen.getByText('Тест эхлүүлэх'));
    answerAll(true);
    expect(screen.getByText('Тест дууслаа! 🎉')).toBeTruthy();
    cleanup(); // refresh-ийг дуурайна

    const onFinish = vi.fn();
    render(<PlacementTest isFounder={false} onFinish={onFinish} onSkip={() => {}} />);
    expect(screen.getByText('Тест дууслаа! 🎉')).toBeTruthy();
    fireEvent.click(screen.getByText(/Үр дүнг нээлгүй үргэлжлүүлэх/));
    const record = onFinish.mock.calls[0][0] as PlacementRecord;
    expect(record.level).toBe('C2');
    // Дууссаны дараа хадгалсан явц устсан байна.
    expect(localStorage.getItem('vivid-placement-progress-v1')).toBeNull();
    cleanup();
  });

  it('asks for confirmation before quitting and keeps progress for later', () => {
    const onSkip = vi.fn();
    render(<PlacementTest isFounder={true} onFinish={() => {}} onSkip={onSkip} />);
    fireEvent.click(screen.getByText('Тест эхлүүлэх'));
    answerCurrent(true);

    // Гарах товч баталгаажуулалт шаардана; "Үргэлжлүүлэх" дарвал тест үргэлжилнэ.
    fireEvent.click(screen.getByLabelText('Тестээс гарах'));
    expect(screen.getByText('Тестээс гарах уу?')).toBeTruthy();
    fireEvent.click(screen.getByText('Үргэлжлүүлэх'));
    expect(screen.queryByText('Тестээс гарах уу?')).toBeNull();
    expect(onSkip).not.toHaveBeenCalled();

    // Дахин дараад "Гарах" дарвал гарна; явц хадгалагдсан хэвээр.
    fireEvent.click(screen.getByLabelText('Тестээс гарах'));
    fireEvent.click(screen.getByText('Гарах'));
    expect(onSkip).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('vivid-placement-progress-v1')).not.toBeNull();
    cleanup();
  });
});
