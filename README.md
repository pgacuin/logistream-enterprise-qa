# 🎯 Mission 05: Automated Accessibility & API Contract Compliance Testing (`TEST` & `QUAS`)

## 📋 Scenario & Objective
At **LogiStream Enterprise**, enterprise applications must comply with international accessibility standards (WCAG 2.1 AA) for dispatchers using assistive technologies (**`TEST`**), while backend microservices must maintain strict OpenAPI schema contracts to prevent integration breaks across cross-border customs gateways (**`QUAS`**).

In this mission, you will:
1. **Automate Accessibility Audits (`axe-core`):** Integrate `@axe-core/playwright` into your test suite to automatically scan the dispatch dashboard for accessibility violations (e.g., missing ARIA labels, low color contrast, improper heading hierarchies).
2. **Validate API Response Contracts:** Enforce strict JSON schema validation on shipment and customs response payloads to ensure zero breaking changes in downstream microservices.

---

## 🚀 Step 1: Accessing the `mission-05` Branch in GitHub Codespaces

1. Go to your **`logistream-enterprise-qa`** repository on GitHub and switch to the **`mission-05`** branch.
2. Open your Codespace and ensure your application server is running:
   ```bash
   npm install
   npm start
