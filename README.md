# LN-Challenge

La Nacion Technical Chalenge

## Project Overview

This project is a Playwright-based end-to-end testing framework designed to validate the functionality of the La Nacion application. It includes tests for various pages and components, ensuring a seamless user experience.

## Project Structure

## Key Files and Directories

- **`playwright.config.js`**: Configures Playwright settings such as browsers, timeouts, and test directories.
- **`playwright/pages/`**: Contains Page Object Models (POMs) for modular and reusable test code.
  - `Common.js`: Shared utilities and selectors.
  - `Homepage.js`: Interactions and validations for the homepage.
  - `Note.js`: Interactions and validations for the note page.
- **`playwright/tests/`**: Contains test cases organized by feature.
  - `homepage/`: Tests for homepage functionality.
  - `note/`: Tests for note-related functionality.
- **`playwright-report/`**: Stores HTML reports generated after test execution.
- **`.github/workflows/playwright.yml`**: Automates test execution in CI/CD pipelines.

## Running the Tests

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright:

   ```bash
   npx playwright install
   ```

3. Set up the `.env` file:

   Ask the repository administrator for the `.env` file.

4. Run the tests:

   ```bash
   npx playwright test
   ```

   Or run the tests with the UI:

   ```bash
   npx playwright test --ui
   ```
