import { test, expect } from "@playwright/test";
import { Footer } from "../../pages/Footer";
import { Common } from "../../pages/Common";

test.beforeEach(async ({ page }) => {
    const common = new Common(page);
    await page.goto("/",{ waitUntil: "domcontentloaded" });
    await common.validateResourceRequests();
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
    await common.ifAdThenClose();
});

test("Homepage - Footer", async ({ page }) => {

    const footer = new Footer(page);

    await footer.scrollToFooter();
    await footer.validateFooterLinks();
});