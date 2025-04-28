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

test("Homepage - Header - Logotype", async ({ page }) => {
    const homepage = new Homepage(page);

    const headerLogotype = await homepage.getHeaderLogotype();
    await expect(headerLogotype).toBeVisible();
    await expect(headerLogotype).toHaveAttribute("href", "https://www.lanacion.com.ar/");
});

test("Homepage - Header - Sections Side Panel", async ({ page }) => {
    const homepage = new Homepage(page);

    const headerSections = await homepage.expandSectionsDropdown();
    await expect(headerSections).toBeVisible();

    const allSectionTitles = [
        "Últimas noticias", "Política", "Economía", "El Mundo", "Sociedad", "Opinión", "Deportes", "Lifestyle",
        "Espectáculos", "Edición Impresa", "Revistas", "LN Juegos", "Suscriptores", "Mis notas", "Club LA NACION",
        "canchallena", "Foodit", "Bonvivir", "LN 104.9 + Música NUEVO", "LN+", "Kiosco LA NACION"
    ];

    for (const section of allSectionTitles) {
        const sectionLocator = section === "LN Juegos" ? headerSections.getByTitle(section, { exact: true }) : headerSections.getByRole('link', { name: section, exact: true });
        await expect(sectionLocator).toBeVisible();
    }
});

test("Homepage - Header - Search Icon", async ({ page }) => {
    const homepage = new Homepage(page);

    await Promise.all([
        homepage.clickOnSearchIcon(),
        page.waitForSelector('[id="queryly_searchcontainer"]', { state: 'visible' })
    ]);
    const searchInput = page.locator('#queryly_search_header').getByPlaceholder('Buscar...');
    await expect(searchInput).toBeVisible();

});

test("Homepage - Header - Dollars", async ({ page }) => {
    const homepage = new Homepage(page);

    const dollarOfficial = await homepage.getHeaderDollarValueAndHREF("Dólar oficial");
    const dollarBlue = await homepage.getHeaderDollarValueAndHREF("Dólar blue");
    const dollarCard = await homepage.getHeaderDollarValueAndHREF("Dólar tarjeta");
    const dollarCCL = await homepage.getHeaderDollarValueAndHREF("Dólar CCL");
    const dollarMEP = await homepage.getHeaderDollarValueAndHREF("Dólar MEP");

    expect(dollarOfficial.dollarValue && dollarBlue.dollarValue && dollarCard.dollarValue && dollarCCL.dollarValue && dollarMEP.dollarValue).toMatch(/\S+/);

    expect(dollarOfficial.dollarHref).toBe("https://www.lanacion.com.ar/dolar-hoy/");
    expect(dollarBlue.dollarHref).toBe("https://www.lanacion.com.ar/tema/dolar-blue-tid67294/");
    expect(dollarCard.dollarHref).toBe("https://www.lanacion.com.ar/tema/dolar-tarjeta-tid50462/");
    expect(dollarCCL.dollarHref).toBe("https://www.lanacion.com.ar/tema/dolar-ccl/");
    expect(dollarMEP.dollarHref).toBe("https://www.lanacion.com.ar/tema/dolar-mep/");
});

test("Homepage - Header - Notification Bell", async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.clickOnNotificationBell();

    const popUpPanel = page.locator('[data-id="campanita-notifications-drawer"]');
    await expect(popUpPanel).toBeVisible();
});

test("Homepage - Header - Login", async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.clickOnLoginButton();

    const loginPage = page.locator('[class="container-login"]');
    await expect(loginPage).toBeVisible();

    const pageURL = page.url();
    expect(pageURL).toMatch(/login\.lanacion\.com\.ar/);
});

test("Homepage - Header - Subscription", async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.clickOnSubscriptionButton();

    const subscriptionHeaderLocator = page.locator('[class="wall-encabezado"]');
    const subscriptionTitle = await subscriptionHeaderLocator.locator('[class="title"]').textContent();

    await expect(subscriptionHeaderLocator).toBeVisible();
    expect(subscriptionTitle).toMatch(/Suscribite a LA NACION/);

    const pageURL = page.url();
    expect(pageURL).toMatch(/suscripciones\.lanacion\.com\.ar/);
});

test("Homepage - Header - LN Games", async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.clickOnLNGamesButton();

    const gamesPage = page.getByRole('img', { name: 'LN Juegos' });
    await expect(gamesPage).toBeVisible();

    const pageURL = page.url();
    expect(pageURL).toBe("https://www.lanacion.com.ar/juegos/");
});

test("Homepage - Header - Subscriptors", async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.clickOnSubscriptorsButton();

    const subscriptorsPage = page.getByRole('img', { name: 'Suscriptores', exact: true });
    await expect(subscriptorsPage).toHaveAttribute("alt", "Suscriptores");

    const pageURL = page.url();
    expect(pageURL).toBe("https://www.lanacion.com.ar/suscriptores/");
});

test("Homepage - Header - Newsletters", async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.clickOnNewsletterButton();

    const newslettersPage = page.getByRole('heading', { name: 'Newsletters', exact: true });
    await expect(newslettersPage).toBeVisible();

    const pageURL = page.url();
    expect(pageURL).toMatch(/newsletter\.lanacion\.com\.ar/);
});