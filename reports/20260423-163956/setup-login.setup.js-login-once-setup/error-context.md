# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: setup\login.setup.js >> login once
- Location: tests\setup\login.setup.js:3:6

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | 
  3  | setup('login once', async ({ page }) => {
  4  | 
  5  |   // 👉 dùng URL full cho chắc
> 6  |   await page.goto('https://www.saucedemo.com');
     |              ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  7  | 
  8  |   // 👉 wait page load
  9  |   await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  10 | 
  11 |   // 👉 login
  12 |   await page.fill('[data-test="username"]', 'standard_user');
  13 |   await page.fill('[data-test="password"]', 'secret_sauce');
  14 | 
  15 |   await page.click('[data-test="login-button"]');
  16 | 
  17 |   // 👉 verify login thành công
  18 |   await page.waitForURL(/inventory/);
  19 | 
  20 |   // 👉 lưu session
  21 |   await page.context().storageState({
  22 |     path: 'storageState.json',
  23 |   });
  24 | });
```