import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import App from '../../frontend/src/App';

test('renders App and switches tabs successfully', async () => {
  const { getByText, getAllByText } = render(<App />);

  // Check that the app starts on the "Read" tab ("Унших")
  // The word "Унших" should be present on the sidebar and active tab indicator.
  const readTabButtons = getAllByText('Унших');
  expect(readTabButtons.length).toBeGreaterThan(0);

  // Click on the "Сонсох" (Listen) tab
  const listenTabButtons = getAllByText('Сонсох');
  expect(listenTabButtons.length).toBeGreaterThan(0);
  
  await act(async () => {
    await userEvent.click(listenTabButtons[0]);
  });

  // Verify that the "Сонсох" tab has been activated (listening library reader is shown)
  expect(getByText(/Бичлэгийг сонсохын тулд дарна уу/i)).toBeInTheDocument();

  // Click on "Үгсийн сан" (Vocab) tab
  const vocabTabButtons = getAllByText('Үгсийн сан');
  expect(vocabTabButtons.length).toBeGreaterThan(0);
  
  await act(async () => {
    await userEvent.click(vocabTabButtons[0]);
  });

  // Under Vocab tab, "Дасгал" (Exercise) button is rendered.
  expect(getByText('Дасгал')).toBeInTheDocument();
  expect(getByText('Толь бичиг')).toBeInTheDocument();
});
