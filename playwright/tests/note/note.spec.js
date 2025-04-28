import { test, expect } from "@playwright/test";
import { Footer } from "../../pages/Footer";
import { Homepage } from "../../pages/Homepage";
import { Common } from "../../pages/Common";
import { Note } from "../../pages/Note";

test.beforeEach(async ({ page }) => {

  const common = new Common(page);
  await page.goto("/politica/tras-la-caida-de-la-moratoria-la-oposicion-desafia-al-gobierno-impulsa-una-jubilacion-proporcional-a-nid25032025/",{ waitUntil: "domcontentloaded" });
  await common.validateResourceRequests();
  const articleTitle = (await page.getByRole('heading').first().textContent()).split('|').pop().trim();
  await expect(page).toHaveTitle(`${articleTitle} - LA NACION`);
  await common.ifAdThenClose();

});

test("Note - Header", async ({ page }) => {
    const homepage = new Homepage(page);

    const headerLogotype = await homepage.getHeaderLogotype();
    await expect(headerLogotype).toBeVisible();

    const headerSections = await homepage.getExpandSectionsButton();
    await expect(headerSections).toBeVisible();

    const searchButton = await homepage.getSearchButton();
    await expect(searchButton).toBeVisible();

    const notificationBell = await homepage.getNotificationBellButton();
    await expect(notificationBell).toBeVisible();

    const loginButton = await homepage.getLoginButton();
    await expect(loginButton).toBeVisible();

    const subscriptionButton = await homepage.getSubscriptionButton();
    await expect(subscriptionButton).toBeVisible();

});

test("Note - Title and Paragraph", async ({ page }) => {

  const note = new Note(page);

    const articleTitle = await note.getNoteTitle();
    await expect(articleTitle).toBeVisible();
    await expect(articleTitle).toHaveText(/Tras la caída de la moratoria | La oposición desafía al Gobierno: impulsa una jubilación proporcional a los años de aportes/);

    const paragraphs = await note.getAllNoteParagraphs();
    expect(paragraphs.length).toBeGreaterThanOrEqual(1);

    for (const p of paragraphs) {
      await expect(p).toBeVisible();
    }

});

slow.test("Note - Footer", async ({ page }) => {

    const footer = new Footer(page);

    await footer.scrollToFooter();    
    await footer.validateFooterLinks();

});
