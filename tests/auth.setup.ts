import { test as setup, expect } from '@playwright/test';
import { AUTH_FILE } from '../playwright.config';

setup('Authenticate as Dispatcher and persist storageState', async ({ page, request }) => {
  // TODO FOR LEARNER: Send a POST request to '/api/auth/login' with JSON body:
  // { email: 'dispatcher@logistream.io', password: 'Dispatch#2026' }
  
  // TODO FOR LEARNER: Assert that the API response status is 200

  await page.goto('/');
  
  // TODO FOR LEARNER: Save browser storage state to AUTH_FILE using page.context().storageState({ path: AUTH_FILE })
});
