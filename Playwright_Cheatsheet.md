🎭 The Senior QA's Playwright & Node.js Cheat Sheet
1. Node.js Architecture (The Engine) 🚂

Core Concept: Node.js is Single-Threaded and Non-Blocking.

    The "Head Chef" (Main Thread): Handles logic. If this gets blocked (e.g., heavy math), the whole app freezes.

    The "Prep Cooks" (Libuv): Handles I/O (File reading, Network requests, Database). These run in the background on a Thread Pool.

    The Event Loop: The traffic controller that moves finished tasks from the Callback Queue back to the Call Stack.

The Golden Rule: Always use await for I/O tasks to keep the Main Thread free.
JavaScript

// ✅ Correct (Non-blocking)
await page.goto('https://example.com');

// ❌ Incorrect (Blocking - theoretical example)
page.gotoSynchronous('https://example.com'); // This freezes the browser!

2. Smart Locators (The Strategy) 🎯

Goal: Write tests that survive design changes (Refactor-Resilient).
Type	Example	Resilience	Verdict
Semantic	page.getByRole('button', { name: 'Login' })	⭐⭐⭐⭐⭐	Preferred. Focuses on what the element is.
Text	page.getByText('Welcome')	⭐⭐⭐⭐	Good for non-interactive content.
Test ID	page.getByTestId('submit-btn')	⭐⭐⭐⭐⭐	Excellent, but requires dev code changes.
CSS	page.locator('div > .btn-primary')	⭐⭐	Avoid. Breaks if styles change.
XPath	page.locator('//*[@id="app"]/div[2]')	⭐	Avoid. Breaks if structure changes.
3. Essential CLI Commands 💻
Goal	Command
Run All Tests	npx playwright test
Run in "Headed" Mode (Visible Window)	npx playwright test --headed
Open UI Mode (Time Travel Debugging)	npx playwright test --ui
Run Specific File	npx playwright test tests/login.spec.ts
Run Specific Test Name	npx playwright test -g "should login"
Debug Trace	npx playwright show-report
4. Configuration Secrets (playwright.config.ts) ⚙️
TypeScript

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 1. Retry failed tests once to catch flakes
  retries: 1, 
  
  use: {
    // 2. Set a Base URL so tests work on localhost AND staging
    baseURL: 'http://localhost:3000',

    // 3. The "Black Box": Record video/network ONLY when a test fails
    trace: 'on-first-retry',
  },

  // 4. Test against different "Physical" devices
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
});

5. CI/CD Architecture (GitHub Actions) 🤖

Key Principle: "Fail Fast, but keep the evidence."

The playwright.yml Snippet:
YAML

name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npx playwright install --with-deps

      # The Execution
      - name: Run Playwright tests
        run: npx playwright test

      # The Safety Net
      - uses: actions/upload-artifact@v4
        if: always() # ⚠️ CRITICAL: Upload report even if tests fail!
        with:
          name: playwright-report
          path: playwright-report/

Senior Optimization Tips 🚀

    Sharding: Split 500 tests across 5 machines to run 5x faster.

        Command: npx playwright test --shard=1/5

    Strategic Testing: Run only the chromium project on Pull Requests for speed; run all browsers on Merge.