import { test, expect } from '@playwright/test';

test('login once', async ({ page }) => {

  // 1. đi tới login page (QUAN TRỌNG)
  await page.goto('https://www.saucedemo.com/');

  // 2. wait đúng element login
  await expect(page.locator('[data-test="login-button"]'))
    .toBeVisible({ timeout: 10000 });

  // 3. login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // 4. verify login success
  await expect(page).toHaveURL(/.*inventory/);

  // 5. save storage
  await page.context().storageState({
    path: 'storageState.json',
  });
});