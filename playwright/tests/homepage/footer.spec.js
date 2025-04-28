import { test, expect } from "@playwright/test";
import { Footer } from "../../pages/Footer";
import { Common } from "../../pages/Common";

test.beforeEach(async ({ page }) => {
    const common = new Common(page);
    await page.goto("https://www.lanacion.com.ar/",{ waitUntil: "domcontentloaded" });
    await common.validateResourceRequests();
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
    await common.ifAdThenClose();
});

test("Homepage - Footer", async ({ page }) => {

    const footer = new Footer(page);

    await footer.scrollToFooter();

    await footer.normalizeLink("edicion-impresa");
    await footer.normalizeLink("ln+");
    await footer.normalizeLink("club-la-nacion");
    await footer.normalizeLink("ohlala!");
    await footer.normalizeLink("¡hola!");
    await footer.normalizeLink("jardín");
    await footer.normalizeLink("fundacion-la-nacion");
    await footer.normalizeLink("terminos-y-condiciones");
    await footer.normalizeLink("suscribirse-al-diario-impreso");
    await footer.normalizeLink("rolling-stone");
    
    await footer.validateFooterLinks();
});