import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/Homepage";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.lanacion.com.ar/");
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
});

test("Homepage - Main Note", async ({ page }) => {

    const contentLocator = page.locator('[data-section="apertura"]');
    const mainNote = contentLocator.locator('[data-type="article"]').first();
    const mainNoteTitle = mainNote.locator('[data-type="title"]');
    const mainNoteImage = mainNote.locator('[data-type="image"]');

    await expect(mainNote).toBeVisible();
    await expect(mainNoteTitle).toBeVisible();
    await expect(mainNoteTitle).toHaveAttribute("href", /https:\/\/www.lanacion.com.ar\/.+/);
    await expect(mainNoteImage).toBeVisible();

});