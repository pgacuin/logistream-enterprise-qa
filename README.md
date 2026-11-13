# 🎯 Mission 06: CI/CD Resilience, Sharded Parallel Execution & Artifact Archiving (`PRTS`)

## 📋 Scenario & Objective
At **LogiStream Enterprise**, running a full suite of automated tests sequentially takes too long for fast-moving CI/CD pipelines. To scale delivery, senior automation engineers (**SFIA Level 4 - `PRTS`**) configure **parallel test sharding** across multiple runner nodes and ensure that failure artifacts (such as screenshots, trace files, and HTML reports) are automatically archived for forensic debugging.

In this mission, you will:
1. **Configure CI Workflow Sharding:** Set up GitHub Actions workflow parameters to shard test runs across parallel nodes (e.g., `--shard=1/3`, `--shard=2/3`).
2. **Optimize Playwright Configuration for CI:** Configure test retries, trace retention (`on-first-retry`), and html report output directories.
3. **Validate Test Artifact Archiving:** Ensure failure logs and traces are correctly captured and uploaded as pipeline artifacts.

---

## 🚀 Step 1: Accessing the `mission-06` Branch in GitHub Codespaces

1. Go to your **`logistream-enterprise-qa`** repository on GitHub and switch to the **`mission-06`** branch.
2. Open your Codespace and ensure your environment is ready:
   ```bash
   npm install
