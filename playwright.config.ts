import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export const AUTH_FILE = path.join(__dirname, 'playwright/.auth/dispatcher.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
        launchOptions: {
          executablePath: '/usr/bin/chromium',
        },
      },
      dependencies: ['setup'],
    },
  ],
});
