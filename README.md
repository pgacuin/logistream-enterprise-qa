# 🎯 Mission 02: Multi-Role UAT, API State Seeding & Network Fault Injection (`BPTS` & `TEST`)

## 📋 Scenario & Objective
At **LogiStream Enterprise**, freight manifests move across distinct business acceptance gates before leaving the port. Relying solely on happy-path UI flows leaves critical gaps in **User Acceptance Testing (`BPTS`)**—especially when customs clearance APIs degrade or return transient `503 Service Unavailable` errors.

In this mission, you will move beyond basic UI checks to validate end-to-end business acceptance criteria by:
1. **Seeding Complex Business State via API (`APIRequestContext`):** Bypass slow multi-step UI forms by seeding a pending customs manifest directly through `/api/shipments/seed` before opening the browser.
2. **Validating Business Acceptance Criteria (`BPTS`):** Verify that customs clearance rules (weight thresholds, hazard flags, and broker approval states) behave accurately against business requirements.
3. **Injecting Network Faults (`page.route`):** Intercept live API calls to simulate a `503 Service Unavailable` gateway failure and verify that the UI gracefully displays a retry banner instead of crashing.

---

## 🚀 Step 1: Accessing the `mission-02` Branch in GitHub Codespaces

1. Navigate to **`logistream-enterprise-qa`** on GitHub.
2. Switch to the **`mission-02`** branch using the branch dropdown.
3. Open your existing Codespace (or create a new one on `mission-02`).
4. In your terminal, install packages and start the LogiStream server in a separate terminal tab:
   ```bash
   npm install
   npm start
