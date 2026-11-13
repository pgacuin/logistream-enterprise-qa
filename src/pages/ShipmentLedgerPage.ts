import { Page, Locator } from '@playwright/test';

export class ShipmentLedgerPage {
  readonly page: Page;
  readonly ledgerStateIndicator: Locator;
  readonly advanceStateButton: Locator;
  readonly telemetryLogPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO FOR LEARNER: Initialize locators using data-testid attributes:
    // ledger-state, btn-advance-state, telemetry-panel
    this.ledgerStateIndicator = page.locator('');
    this.advanceStateButton = page.locator('');
    this.telemetryLogPanel = page.locator('');
  }

  async gotoShipmentLedger(shipmentId: string): Promise<void> {
    // TODO FOR LEARNER: Navigate to `/shipments/${shipmentId}/ledger`
  }

  async advanceState(): Promise<void> {
    // TODO FOR LEARNER: Click the advanceStateButton
  }
}
