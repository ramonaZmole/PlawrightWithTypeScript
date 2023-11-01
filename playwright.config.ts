import { defineConfig, devices } from '@playwright/test';

//require('dotenv').config();

if (process.env.test_env) {
  require('dotenv').config({
    path: `.env.${process.env.test_env}`,
    override: true,
  });
} else {
  require('dotenv').config();
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true
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

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: null,

        launchOptions: {
          args: ["--start-maximized"]
        }
      },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
