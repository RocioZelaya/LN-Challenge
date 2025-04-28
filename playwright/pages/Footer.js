import { Page } from "playwright";
import { expect } from '@playwright/test';

export class Footer {

    /**
     * @class Footer
     * @description Represents the footer section of the page.
     * @param {Page} page - The Playwright page instance.
     */

    constructor(page) {
        this.page = page;
        this.footer = page.locator('[class="footer-container --no-app"]');
        this.footerLinks = [
            "Últimas noticias", "Política", "Economía", "El mundo", "Sociedad", "Opinión", "Deportes", "Lifestyle",
            "Espectáculos", "Edición impresa", "LN+", "Club LA NACION", "OHLALÁ!", "¡HOLA!", "LIVING", "JARDÍN", 
            "LUGARES", "ROLLING STONE", "Bonvivir", "Colecciones", "Máster en periodismo", "Fundación LA NACION", 
            "Mapa del sitio", "Ayuda", "Atención al socio", "Términos y condiciones", "¿Cómo anunciar?", 
            "Suscribirse al diario impreso"
        ];
    }

    async scrollToFooter() {
        await this.footer.scrollIntoViewIfNeeded();
        await expect(this.footer).toBeVisible();
    }

    normalizeLink(link) {
        let normalizedLink = link.replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const specialCases = {
            "edicion-impresa": "edicionimpresa",
            "ln+": "lnmas",
            "club-la-nacion": "club",
            "ohlala!": "ohlala",
            "¡hola!": "hola",
            "jardín": "jardin",
            "fundacion-la-nacion": "fundacionlanacion",
            "terminos-y-condiciones": "tyc",
            "suscribirse-al-diario-impreso": "suscripciones",
            "rolling-stone": "rollingstone"
        };
        return specialCases[normalizedLink] || normalizedLink;
    }

    async validateFooterLinks() {
        for (const link of this.footerLinks) {
            const footerLink = this.footer.getByRole('link', { name: link, exact: true });
            await expect(footerLink).toBeVisible();

            const normalizedLink = this.normalizeLink(link);
            const href = await footerLink.getAttribute('href');

            const regexPatterns = [
                `https://www\\.lanacion\\.com\\.ar/${normalizedLink}/.*`,
                `https://${normalizedLink}\\.lanacion\\.com\\.ar.*`,
                `https://www\\.somos${normalizedLink}\\.com/.*`,
                `https://${normalizedLink}\\.com/.*`,
                `https://www\\.utdt\\.edu/ver_contenido\\.php\\?id_contenido=1111&id_item_menu=2327.*`,
                `https://${normalizedLink}\\.org\\.ar/.*`,
                `https://www\\.contacto\\.lanacion\\.com\\.ar/${normalizedLink}.*`,
                `https://club\\.lanacion\\.com\\.ar/ayuda/.*`,
                `https://www\\.contacto\\.lanacion\\.com\\.ar/${normalizedLink}.*`,
                `https://www\\.lanacion\\.in/.*`,
                `https://${normalizedLink}\\.lanacion\\.com\\.ar/suscribirme.*`,
                `https://www\\.lanacion\\.com\\.ar/revista-${normalizedLink}/.*`,
                `https://es\\.${normalizedLink}\\.com/arg/.*`
            ];

            const match = regexPatterns.some(pattern => new RegExp(pattern).test(href));
            console.log(match ? `PASS: ${normalizedLink} has a valid href: ${href}` : `FAIL: ${normalizedLink} has invalid href: ${href}`);
            expect(match).toBe(true);
        }
    }
}