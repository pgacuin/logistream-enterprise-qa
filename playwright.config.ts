import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    // TODO FOR LEARNER: Configure trace to 'on-first-retry' and capture screenshot 'only-on-failure'
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
