export const playwrightConfig = {
  testDir: './playwright/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  use: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first'
  }
}