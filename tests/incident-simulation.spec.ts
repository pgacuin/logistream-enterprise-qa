import { test, expect } from '../src/fixtures/baseFixtures';

test.describe('LogiStream Production Incident Simulation & Forensics (TEST & BPTS)', () => {

  test('INCIDENT-07: Simulates cascading gateway failure and validates APM error log correlation', async ({ page, request }) => {
    // 1. Seed a high-priority dispatch order via API
    const seedRes = await request.post('/api/shipments/seed', {
      data: { origin: 'Cebu Port', destination: 'Manila Hub', weightKg: 8500, status: 'DISPATCH_QUEUED' }
    });
    expect(seedRes.status()).toBe(201);
    const { shipmentId } = await seedRes.json();

    // 2. Intercept dispatch execution and inject cascading 500 error
    await page.route(`**/api/shipments/${shipmentId}/dispatch`, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ errorCode: 'CASCADING_GATEWAY_FAILURE', timestamp: Date.now() })
      });
    });

    // 3. Navigate to dispatch control and trigger action
    await page.goto(`/shipments/${shipmentId}/control`);
    
    // TODO FOR LEARNER: Click the dispatch execution button and assert that the incident alert banner is visible
    // TODO FOR LEARNER: Verify that error telemetry is captured correctly
  });

});
