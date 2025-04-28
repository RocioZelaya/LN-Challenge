/**
 * @class Homepage
 * @description Represents the homepage and provides methods to interact with it.
 * @param {Page} page - The Playwright page instance.
 */

export class Homepage {
    
    constructor(page) {
        this.page = page;
    }    
    
   //header

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
            const sectionLocator = this.page.locator('[class="nav"]').locator(`a[title="${section}"]`);
            await sectionLocator.click();
    }

    async clickOnSearchIcon() {
        const searchIcon = this.page.locator('[title="Ir al buscador"]');
        await searchIcon.click();
    }

    async getHeaderLogotype() {
       return this.page.getByRole('contentinfo').getByTitle('Ir a la página principal');
    }

    async clickOnNotificationBell() {
        const notificationBell = this.page.locator('[title="Abrir Notificaciones"]');
        await notificationBell.click();
    }

    async clickOnLoginButton() {
        const loginButton = this.page.getByRole('button', { name: 'INICIAR SESIÓN' });
        await loginButton.click();
    }

    async clickOnSubscriptionButton() {
        const subscriptionButton = this.page.locator('[id="btnsuscribite"]');
        await subscriptionButton.click();
    }

    async clickOnLNGamesButton() {
        const lnButton = this.page.getByRole('link', { name: 'LN Juegos', exact: true });
        await lnButton.click();
    }

    async clickOnSubscriptorsButton() {
        const subscriptorsButton = this.page.getByRole('link', { name: 'Suscriptores', exact: true });
        await subscriptorsButton.click();
    }

    async clickOnNewsletterButton() {
        const newsletterButton = this.page.getByRole('link', { name: 'Newsletters' });
        await newsletterButton.click();
    }

    async getExpandSectionsButton() {
        return this.page.getByRole('button', { name: 'SECCIONES' });
    }

    async getSearchButton() {
        return this.page.locator('[title="Ir al buscador"]');
    }

    async getNotificationBellButton() {
        return this.page.locator('[title="Abrir Notificaciones"]');
    }
    
    async getLoginButton() {
        return this.page.getByRole('button', { name: 'INICIAR SESIÓN' });
    }

    async getSubscriptionButton() {
        return this.page.locator('[id="btnsuscribite"]')
    }
    
    //Main Note

    async getMainNote() {

        const contentLocator = await this.page.locator('[class="ln-opening-container"]');

        const mainNote = await contentLocator.getByRole('article').first();
        const mainNoteTitle = await mainNote.locator('h1.title');
        const mainNoteLink = await mainNote.getAttribute('data-mrf-link');

        const mainNoteImage = await mainNote.locator('picture img');
        const mainNoteVideo = await mainNote.locator('[class="ln-video"]');

        let mainNoteMedia = null;

        if (await mainNoteImage.isVisible()) {
            mainNoteMedia = await mainNoteImage;
        } else if (await mainNoteVideo.isVisible()) {
            mainNoteMedia = await mainNoteVideo;
        } else {
            throw new Error("No media found for the main note.");
        }

        return { mainNote, mainNoteLink, mainNoteTitle, mainNoteMedia };
    }

}