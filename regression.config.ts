import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000, // 60-second timeout for tests
  retries: 0, // No retries
  testDir: 'tests/regression', // Directory for regression tests
  use: {
    headless: true, // Run in headless mode
    viewport: { width: 1280, height: 720 }, // Standard viewport size
    actionTimeout: 10000, // Maximum time for actions like clicks or waits
    ignoreHTTPSErrors: true, // Ignore HTTPS certificate errors
    video: 'off', // Disable video recording
    screenshot: 'off', // Disable screenshots
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default config;
