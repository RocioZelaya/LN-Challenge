import { Page } from "playwright";

/**
 * @class Homepage
 * @description Represents the homepage and provides methods to interact with it.
 */
export class Homepage {
    /**
     * @param {Page} page - The Playwright page instance.
     */
    constructor(page) {
        this.page = page;
    }

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
    async Overallheader() {
        this.page.locator('[class="common-header-container mt-50 mt-0_m"]');  
    }

    /**
     * Retrieves the href and value of a specific dollar type in the header.
     * @param {"Dólar oficial" | "Dólar blue" | Dólar tarjeta | "Dólar CCL" | "Dólar MEP"} titleValue - The title of the dollar type.
     * @returns {Promise<{dollarHref: string, dollarValue: string}>} An object containing the href and value.
     */
    async HeaderDollarValueAndHREF(titleValue) {
        if (!this.dollarTitleValues.includes(titleValue)) {
            throw new Error(`Invalid title value: ${titleValue}. Expected one of: ${this.dollarTitleValues.join(", ")}`);
        }
        const dollarLocator = Overallheader.locator(`a${titleValue}`);
        const dollarHref = await dollarLocator.getAttribute("href");
        const dollarValue = await dollarLocator.locator("span").innerText(); 
        return { dollarHref, dollarValue }; 
    }
}