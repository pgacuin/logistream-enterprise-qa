# 🎯 Mission 03: Process State Machine Verification, Event Tracking & API Mocking (`PRTS` & `NFTS`)

## 📋 Scenario & Objective
At **LogiStream Enterprise**, global freight shipments move through a deterministic **Process State Machine (`PRTS`)**: `PENDING_DISPATCH` ➔ `IN_TRANSIT` ➔ `CUSTOMS_HOLD` ➔ `OUT_FOR_DELIVERY` ➔ `DELIVERED`. 

When backend ledger services or telemetry event streams lag, automated tests must verify that UI state transitions and analytics dispatch events remain perfectly synchronized without causing UI deadlocks or silent failures (**Non-Functional Testing - `NFTS`**).

In this mission, you will:
1. **Verify Process State Transitions (`PRTS`):** Assert that sequential shipment states update correctly across UI dashboard components.
2. **Intercept and Validate Telemetry Event Traces (`NFTS`):** Use Playwright's `page.route()` to spy on asynchronous metrics and analytics payloads (`/api/telemetry/events`) during state changes.
3. **Mock Ledger Responses:** Simulate delayed or asynchronous backend updates to ensure robust test execution timing.

---

## 🚀 Step 1: Accessing the `mission-03` Branch in GitHub Codespaces

1. Go to your **`logistream-enterprise-qa`** repository on GitHub and switch to the **`mission-03`** branch.
2. Open your Codespace and ensure your application server is running:
   ```bash
   npm install
   npm start
