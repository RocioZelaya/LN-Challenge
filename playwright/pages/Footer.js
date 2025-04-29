import { expect } from '@playwright/test';

export class Footer extends Common {

    /**
     * @class Footer
     * @description Represents the footer section of the page.
     * @param {Page} page - The Playwright page instance.
     */

    constructor(page) {
        this.page = page;
        this.footer = page.locator('[class="footer-container --no-app"]');
        
        this.footerConfig = {
            "Últimas noticias": { pattern: "https://www.lanacion.com.ar/ultimas-noticias/" },
            "Política": { pattern: "https://www.lanacion.com.ar/politica/" },
            "Economía": { pattern: "https://www.lanacion.com.ar/economia/" },
            "El mundo": { pattern: "https://www.lanacion.com.ar/el-mundo/" },
            "Sociedad": { pattern: "https://www.lanacion.com.ar/sociedad/" },
            "Opinión": { pattern: "https://www.lanacion.com.ar/opinion/" },
            "Deportes": { pattern: "https://www.lanacion.com.ar/deportes/" },
            "Lifestyle": { pattern: "https://www.lanacion.com.ar/lifestyle/" },
            "Espectáculos": { pattern: "https://www.lanacion.com.ar/espectaculos/" },
            "Edición impresa": { pattern: "https://edicionimpresa.lanacion.com.ar/" },
            "LN+": { pattern: "https://lnmas.lanacion.com.ar/" },
            "Club LA NACION": { pattern: "https://club.lanacion.com.ar/" },
            "OHLALÁ!": { pattern: "https://www.somosohlala.com/" },
            "¡HOLA!": { pattern: "https://www.lanacion.com.ar/revista-hola/" },
            "LIVING": { pattern: "https://www.lanacion.com.ar/revista-living" },
            "JARDÍN": { pattern: "https://www.lanacion.com.ar/revista-jardin" },
            "LUGARES": { pattern: "https://www.lanacion.com.ar/revista-lugares" },
            "ROLLING STONE": { pattern: "https://es.rollingstone.com/arg/" },
            "Bonvivir": { pattern: "https://bonvivir.com/" },
            "Colecciones": { pattern: "https://colecciones.lanacion.com.ar" },
            "Máster en periodismo": { pattern: `https://www\\.utdt\\.edu/ver_contenido\\.php\\?id_contenido=1111&id_item_menu=2327.*` },
            "Fundación LA NACION": { pattern: "https://fundacionlanacion.org.ar/" },
            "Mapa del sitio": { pattern: "https://www.lanacion.com.ar/mapa-del-sitio/" },
            "Ayuda": { pattern: "https://www.contacto.lanacion.com.ar/ayuda" },
            "Atención al socio": { pattern: "https://club.lanacion.com.ar/ayuda/" },
            "Términos y condiciones": { pattern: `https://www\\.contacto\\.lanacion\\.com\\.ar/tyc*` },
            "¿Cómo anunciar?": { pattern: "https://www.lanacion.in/" },
            "Suscribirse al diario impreso": { pattern: "https://suscripciones.lanacion.com.ar/suscribirme" }
        };
    }

    async scrollToFooter() {
        await this.scrollTo(this.footer);
        await expect(this.footer).toBeVisible();
    }

    async validateFooterLinks() {
        for (const [linkText, config] of Object.entries(this.footerConfig)) {
            const footerLink = this.footer.getByRole('link', { name: linkText, exact: true });
            await expect(footerLink).toBeVisible();

            const href = await footerLink.getAttribute('href');
            expect(href).toMatch(new RegExp(config.pattern));
        }
    }
}