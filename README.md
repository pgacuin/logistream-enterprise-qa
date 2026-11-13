# 🎯 Mission 04: Performance Metrics & Non-Functional Load Thresholds (`QUAS`)

## 📋 Scenario & Objective
At **LogiStream Enterprise**, cargo dispatch speeds and API response times directly impact international customs clearance windows. In senior-level Quality Engineering (**SFIA Level 4 - `QUAS`**), functional correctness is not enough—you must also enforce non-functional performance budgets and resource utilization metrics.

In this mission, you will:
1. **Measure Core Web Vitals & Navigation Timings:** Use Playwright's `page.evaluate()` and performance timing APIs to measure DOM content loaded and network idle times.
2. **Enforce Non-Functional Performance Budgets (`QUAS`):** Assert that dashboard load times and manifest list rendering remain strictly below threshold limits (e.g., `< 1500ms`).
3. **Analyze API Latency under Load:** Verify that backend search and filtering endpoints respond within acceptable SLA limits during high-throughput queries.

---

## 🚀 Step 1: Accessing the `mission-04` Branch in GitHub Codespaces

1. Go to your **`logistream-enterprise-qa`** repository on GitHub and switch to the **`mission-04`** branch.
2. Open your Codespace and make sure your server is running:
   ```bash
   npm install
   npm start
