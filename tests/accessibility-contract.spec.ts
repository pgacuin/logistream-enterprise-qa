import { test, expect } from '../src/fixtures/baseFixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('LogiStream Accessibility & API Contract Compliance (TEST & QUAS)', () => {

  test('TEST-05: Dispatch dashboard passes automated WCAG accessibility scan', async ({ page }) => {
    await page.goto('/dashboard');

    // TODO FOR LEARNER: Initialize AxeBuilder, analyze page, and assert zero accessibility violations
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('QUAS-05: Validates shipment API response contract matches required schema structure', async ({ request }) => {
    const response = await request.get('/api/shipments/manifests');
    expect(response.status()).toBe(200);
    const body = await response.json();

    // TODO FOR LEARNER: Assert that body is an array and contains required contract fields (id, origin, destination, status)
    expect(Array.isArray(body)).toBeTruthy();
    if (body.length > 0) {
      expect(body[0]).toHaveProperty('id');
      expect(body[0]).toHaveProperty('origin');
      expect(body[0]).toHaveProperty('destination');
      expect(body[0]).toHaveProperty('status');
    }
  });

});
