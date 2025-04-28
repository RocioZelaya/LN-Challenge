import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { playwrightConfig } from './config';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: playwrightConfig.testDir,
  fullyParallel: playwrightConfig.fullyParallel,
  forbidOnly: playwrightConfig.forbidOnly,
  retries: playwrightConfig.retries,
  workers: playwrightConfig.workers,
  reporter: playwrightConfig.reporter,
  use: {
    baseURL: playwrightConfig.use.baseUrl,
    trace: playwrightConfig.use.trace,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
});

