import { test, expect } from '@playwright/test';

const LOCALHOST = 'http://localhost:5173';

test('app shows minimun data in homepage', async ({ page }) => {
  await page.goto(LOCALHOST);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/wordle-react/);

  // check header
  const header = page.locator('header');
  await expect(header).toBeVisible();

  const headerH1 = header.locator('h1');
  await expect(headerH1).toHaveText(/^Wordle in React/);

  const description = header.locator('p');
  await expect(description).toHaveText(/^Guess the 5-letter word/);

  // check main
  const main = page.locator('main');
  await expect(main).toBeVisible();
  const wordleGame = main.locator('div', { hasText: 'Wordle Game' });
});


