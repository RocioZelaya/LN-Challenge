import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/Homepage";
import { Common } from "../../pages/Common";

test.beforeEach(async ({ page }) => {
    const common = new Common(page);
    await page.goto("/",{ waitUntil: "domcontentloaded" });
    await common.validateResourceRequests();
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
    await common.ifAdThenClose();
});

test("Homepage - Main Note", async ({ page }) => {
    
    const homepage = new Homepage(page);

    const mainNote = await homepage.getMainNote();

    await expect(mainNote.mainNote).toBeVisible();
    await expect(await mainNote.mainNoteLink).toMatch(/https:\/\/www.lanacion.com.ar\/\S+/);
    await expect(mainNote.mainNoteTitle).toBeVisible();
    await expect(mainNote.mainNoteMedia).toBeVisible();

});