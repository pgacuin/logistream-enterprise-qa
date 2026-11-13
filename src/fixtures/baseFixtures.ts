import { test as base } from '@playwright/test';
import { DispatchPage } from '../pages/DispatchPage';

type LogiStreamFixtures = {
  dispatchPage: DispatchPage;
};

// TODO FOR LEARNER: Extend 'base' with LogiStreamFixtures to instantiate and provide 'dispatchPage'
export const test = base.extend<LogiStreamFixtures>({
  dispatchPage: async ({ page }, use) => {
    // Instantiate DispatchPage and pass it to use()
  },
});

export { expect } from '@playwright/test';
