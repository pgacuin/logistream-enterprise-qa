import { test as base } from '@playwright/test';
import { DispatchPage } from '../pages/DispatchPage';
import { CustomsGatePage } from '../pages/CustomsGatePage';

type LogiStreamFixtures = {
  dispatchPage: DispatchPage;
  customsGatePage: CustomsGatePage;
};

export const test = base.extend<LogiStreamFixtures>({
  dispatchPage: async ({ page }, use) => {
    await use(new DispatchPage(page));
  },
  customsGatePage: async ({ page }, use) => {
    await use(new CustomsGatePage(page));
  },
});

export { expect } from '@playwright/test';
