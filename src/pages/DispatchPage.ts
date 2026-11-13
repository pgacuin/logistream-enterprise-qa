import { Page, Locator } from '@playwright/test';

export class DispatchPage {
  readonly page: Page;
  readonly manifestTable: Locator;
  readonly newShipmentButton: Locator;
  readonly roleBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO FOR LEARNER: Initialize locators using data-testid attributes:
    // manifest-table, btn-new-shipment, user-role-badge
    this.manifestTable = page.locator('');
    this.newShipmentButton = page.locator('');
    this.roleBadge = page.locator('');
  }

  async goto(): Promise<void> {
    // TODO FOR LEARNER: Navigate to '/dashboard'
  }

  async getManifestCount(): Promise<number> {
    // TODO FOR LEARNER: Return the count of rows inside manifestTable ('tbody tr')
    return 0;
  }
}
