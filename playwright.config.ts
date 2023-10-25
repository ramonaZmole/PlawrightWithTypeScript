import { defineConfig, devices } from '@playwright/test';

// require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: false
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chromium'],
        viewport: null,

        launchOptions: {
          args: ["--start-maximized"]
        }
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
