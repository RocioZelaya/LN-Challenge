import { Page } from "playwright";
import { expect } from "@playwright/test";

/**
 * @class Homepage
 * @description Represents the homepage and provides methods to interact with it.
 */

export class Homepage {
    
    constructor(page) {
        this.page = page;
    }    

    /**
     * @param {Page} page - The Playwright page instance.
    */
    

    dollarTitleValues = [
        "Dólar oficial",
        "Dólar blue",
        "Dólar tarjeta",
        "Dólar CCL",
        "Dólar MEP"
    ];

    /**
     * Locates the overall header on the page.
     * @returns {Promise<void>}
     */
    /**
     * @param {"Dólar oficial" | "Dólar blue" | Dólar tarjeta | "Dólar CCL" | "Dólar MEP"} titleValue
     * @returns {Promise<{dollarHref: string, dollarValue: string}>}
     */

    //header

    async getHeaderDollarValueAndHREF(titleValue) {

        if (!this.dollarTitleValues.includes(titleValue)) {
            throw new Error(`Invalid title value: ${titleValue}. Expected one of: ${this.dollarTitleValues.join(", ")}`);
        }

        const overallHeader = this.page.locator('[class="common-header-container mt-50 mt-0_m"]'); 
        const dollarLocator = overallHeader.locator(`[title="${titleValue}"]`, { exact: true });
        const dollarHref = await dollarLocator.getAttribute("href");
        const dollarValue = await dollarLocator.locator("span").innerText(); 
        return { dollarHref, dollarValue }; 
    }

    async expandSectionsDropdown() {
        await this.page.getByRole('button', { name: 'SECCIONES' }).click();
        return this.page.locator('[class="ln-dropdown"]');
    }

    async navigateToSection(section) {
        if (section) {
            const sectionLocator = this.page.locator('[class="nav"]').locator(`a[title="${navigateTo}"]`);
            await sectionLocator.click();
        }
        await sectionLocator.click();
    }

    async clickOnSearchIcon() {
        const searchIcon = this.page.locator('[title="Ir al buscador"]');
        await expect (searchIcon).toBeVisible();
        await searchIcon.click();
    }

    async getHeaderLogotype() {
       return this.page.getByRole('contentinfo').getByTitle('Ir a la página principal');
    }

    async clickOnNotificationBell() {
        const notificationBell = this.page.locator('[title="Abrir Notificaciones"]');
        expect(notificationBell).toBeVisible();
        await notificationBell.click();
    }

    async clickOnLoginButton() {
        const loginButton = this.page.getByRole('button', { name: 'INICIAR SESIÓN' });
        expect(loginButton).toBeVisible();
        await loginButton.click();
    }

    async clickOnSubscriptionButton() {
        const subscriptionButton = this.page.getByRole('button', { name: '¡La información clave a un' });
        expect(subscriptionButton).toBeVisible();
        await subscriptionButton.click();
    }

    async clickOnLNGamesButton() {
        const lnButton = this.page.getByRole('link', { name: 'LN Juegos', exact: true });
        expect(lnButton).toBeVisible();
        await lnButton.click();
    }

    async clickOnSubscriptorsButton() {
        const subscriptorsButton = this.page.getByRole('link', { name: 'Suscriptores', exact: true });
        expect(subscriptorsButton).toBeVisible();
        await subscriptorsButton.click();
    }

    async clickOnNewsletterButton() {
        const newsletterButton = this.page.getByRole('link', { name: 'Newsletters' });
        expect(newsletterButton).toBeVisible();
        await newsletterButton.click();
    }
    

    //footer


    //Main Note


}