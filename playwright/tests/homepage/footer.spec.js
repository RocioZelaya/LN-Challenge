import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/Homepage";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.lanacion.com.ar/");
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
});

test("Homepage - Footer", async ({ page }) => {

    const homepage = new Homepage(page);

    const footer = page.locator('[class="footer-container --no-app"]');
    await footer.scrollIntoViewIfNeeded();
    
    await expect(footer).toBeVisible();
    await expect(page.locator('footer section a[href="https://www.lanacion.com.ar/"]')).toBeVisible();

    const footerLinks = [
        "Últimas noticias", "Política", "Economía", "El mundo", "Sociedad", "Opinión", "Deportes", "Lifestyle",
        "Espectáculos", "Edición impresa", "LN+", "Club LA NACION", "OHLALÁ!", "¡HOLA!", "LIVING", "JARDÍN", 
        "LUGARES", "ROLLING STONE", "Bonvivir", "Colecciones", "Máster en periodismo", "Fundación LA NACION", 
        "Mapa del sitio", "Ayuda", "Atención al socio", "Términos y condiciones", "¿Cómo anunciar?", 
        "Suscribirse al diario impreso"
    ];

    for (const link of footerLinks) {
        const footerLink = footer.getByRole('link', { name: link, exact: true });
        await expect(footerLink).toBeVisible();

        let normalizedLink = link.replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (normalizedLink === "edicion-impresa") {
            normalizedLink = "edicionimpresa";
        } else if (normalizedLink === "ln+") {
            normalizedLink = "lnmas";
        } else if (normalizedLink === "club-la-nacion") {
            normalizedLink = "club";
        } else if (normalizedLink === "ohlala!") {
            normalizedLink = "ohlala";
        } else if (normalizedLink === "¡hola!") {
            normalizedLink = "hola";
        } else if (normalizedLink === "jardín") {
            normalizedLink = "jardin";
        } else if (normalizedLink === "fundacion-la-nacion") {
            normalizedLink = "fundacionlanacion";
        } else if (normalizedLink === "terminos-y-condiciones") {
            normalizedLink = "tyc";
        }else if (normalizedLink === "suscribirse-al-diario-impreso") {
            normalizedLink = "suscripciones";
        } else if (normalizedLink === "rolling-stone") {
            normalizedLink = "rollingstone";
        }

        const href = await footerLink.getAttribute('href');

        const pathRegex = `https://www\\.lanacion\\.com\\.ar/${normalizedLink}/.*`;
        const subdomainRegex = `https://${normalizedLink}\\.lanacion\\.com\\.ar.*`;
        const ohlalaRegex = `https://www\\.somos${normalizedLink}\\.com/.*`;
        const bonvivirRegex = `https://${normalizedLink}\\.com/.*`;
        const utdtRegex = `https://www\\.utdt\\.edu/ver_contenido\\.php\\?id_contenido=1111&id_item_menu=2327.*`;
        const fundacionRegex = `https://${normalizedLink}\\.org\\.ar/.*`;
        const contactoAyudaRegex = `https://www\\.contacto\\.lanacion\\.com\\.ar/${normalizedLink}.*`;
        const clubAyudaRegex = `https://club\\.lanacion\\.com\\.ar/ayuda/.*`;
        const terminosCondicionesRegex = `https://www\\.contacto\\.lanacion\\.com\\.ar/${normalizedLink}.*`;
        const comoAnunciarRegex = `https://www\\.lanacion\\.in/.*`;
        const suscripcionesRegex = `https://${normalizedLink}\\.lanacion\\.com\\.ar/suscribirme.*`;
        const revistasRegex = `https://www\\.lanacion\\.com\\.ar/revista-${normalizedLink}/.*`;
        const rollingStoneRegex = `https://es\\.${normalizedLink}\\.com/arg/.*`;
    
    
        let match = false;
        if (
          new RegExp(pathRegex).test(href) ||
          new RegExp(subdomainRegex).test(href) ||
          new RegExp(ohlalaRegex).test(href) ||
          new RegExp(bonvivirRegex).test(href) ||
          new RegExp(utdtRegex).test(href) ||
          new RegExp(fundacionRegex).test(href) ||
          new RegExp(contactoAyudaRegex).test(href) ||
          new RegExp(clubAyudaRegex).test(href) ||
          new RegExp(terminosCondicionesRegex).test(href) ||
          new RegExp(comoAnunciarRegex).test(href) ||
          new RegExp(suscripcionesRegex).test(href) ||
          new RegExp(revistasRegex).test(href) ||
          new RegExp(rollingStoneRegex).test(href)
        ) {
          match = true;
          console.log(`PASS: ${normalizedLink} has a valid href: ${href}`);
        } else {
          console.log(`FAIL: ${normalizedLink} has invalid href: ${href}`);
        }
        expect(match).toBe(true);
    }
});