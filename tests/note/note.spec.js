import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(
    "/politica/tras-la-caida-de-la-moratoria-la-oposicion-desafia-al-gobierno-impulsa-una-jubilacion-proporcional-a-nid25032025/"
  );

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
