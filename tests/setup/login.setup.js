import { test as setup, expect } from '@playwright/test';

setup('login once', async ({ page }) => {

  // 👉 dùng URL full cho chắc
  await page.goto('https://www.saucedemo.com');

  // 👉 wait page load
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();

  // 👉 login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');

  await page.click('[data-test="login-button"]');

  // 👉 verify login thành công
  await page.waitForURL(/inventory/);

  // 👉 lưu session
  await page.context().storageState({
    path: 'storageState.json',
  });
});