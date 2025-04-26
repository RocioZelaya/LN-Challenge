export const playwrightConfig = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first'
  }
}