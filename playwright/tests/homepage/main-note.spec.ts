import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/Homepage";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.lanacion.com.ar/");
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
});

test("Homepage - Main Note", async ({ page }) => {

});