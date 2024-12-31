import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where your tests are located
  timeout: 30 * 1000, // Maximum time for a single test (30 seconds)
  retries: 1, // Retry failed tests once
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000, // Maximum time for Playwright actions (5 seconds)
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],
});
