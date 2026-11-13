import { Page, Locator } from '@playwright/test';

export class CustomsGatePage {
  readonly page: Page;
  readonly clearanceStatusBadge: Locator;
  readonly approveCustomsButton: Locator;
  readonly gatewayErrorBanner: Locator;
  readonly retrySyncButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.clearanceStatusBadge = page.locator('[data-testid="clearance-status"]');
    this.approveCustomsButton = page.locator('[data-testid="btn-approve-customs"]');
    this.gatewayErrorBanner = page.locator('[data-testid="alert-gateway-error"]');
    this.retrySyncButton = page.locator('[data-testid="btn-retry-sync"]');
  }

  async gotoShipment(shipmentId: string): Promise<void> {
    await this.page.goto(`/shipments/${shipmentId}/customs`);
  }

  async approveClearance(): Promise<void> {
    await this.approveCustomsButton.click();
  }
}
