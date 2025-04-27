import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/Homepage";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.lanacion.com.ar/");
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
});

test("Homepage - Footer", async ({ page }) => {

    const homepage = new Homepage(page);

    const footer = page.locator('[class="footer-container --no-app"]');
    
    await expect(footer).toBeVisible();
    await expect(page.locator('footer section a[href="https://www.lanacion.com.ar/"]')).toBeVisible();

    const footerLinks = [
        "Últimas noticias", "Política", "Economía", "El Mundo", "Sociedad", "Opinión", "Deportes", "Lifestyle",
        "Espectáculos", "Edición impresa", "LN+", "Club LA NACION", "OHLALÁ!", "¡HOLA!", "LIVING", "JARDÍN", 
        "LUGARES", "ROLLING STONE", "Bonvivir", "Colecciones", "Máster en periodismo", "Fundación LA NACION", 
        "Mapa del sitio", "Ayuda", "Atención al socio", "Términos y condiciones", "¿Cómo anunciar?", 
        "Suscribirse al diario impreso"
    ];

    for (const link of footerLinks) {
        const footerLink = footer.getByRole('link', { name: link, exact: true });
        await expect(footerLink).toBeVisible();
    }

});