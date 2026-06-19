import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  timeout: 60000,

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
    reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
      use: {
        storageState: undefined,
      },
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },
  ],
});