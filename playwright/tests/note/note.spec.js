import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/politica/tras-la-caida-de-la-moratoria-la-oposicion-desafia-al-gobierno-impulsa-una-jubilacion-proporcional-a-nid25032025/");
    await expect(page).toHaveTitle(/ /);
  });

test("has title", async ({ page }) => {
  
});
