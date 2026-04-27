import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storageState.json',
    headless: true,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  timeout: 60000,

  projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.js/,
  },
  {
    name: 'chromium',
    use: {
      storageState: 'storageState.json',
    },
    dependencies: ['setup'],
  },
],
});