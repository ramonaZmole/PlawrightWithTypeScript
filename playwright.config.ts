import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

const testEnv = process.env.test_env
if (testEnv !== undefined && testEnv.length > 0) {
  dotenv.config({
    path: `.env.${testEnv}`,
    override: true
  })
} else {
  dotenv.config()
}

const isCi = process.env.CI === 'true'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCi,
  /* Retry on CI only */
  retries: isCi ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCi ? 3 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
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
          args: ['--start-maximized']
        }
      }
    }

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ]
})
