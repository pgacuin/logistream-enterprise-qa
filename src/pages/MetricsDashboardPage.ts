import { Page, Locator } from '@playwright/test';

export class MetricsDashboardPage {
  readonly page: Page;
  readonly analyticsGrid: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO FOR LEARNER: Initialize locator for analytics-grid
    this.analyticsGrid = page.locator('');
  }

  async gotoAnalytics(): Promise<void> {
    // TODO FOR LEARNER: Navigate to `/analytics/dashboard`
  }

  async getPageLoadMetrics() {
    // TODO FOR LEARNER: Use page.evaluate(() => performance.timing) or performance.getEntriesByType('navigation')
    return await this.page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.startTime,
        loadEvent: timing.loadEventEnd - timing.startTime
      };
    });
  }
}
