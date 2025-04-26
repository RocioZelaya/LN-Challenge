import { test, expect } from "@playwright/test";
import { Homepage } from "../Pages/Homepage.js";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.lanacion.com.ar/");
    await expect(page).toHaveTitle(/Últimas noticias de Argentina y el mundo - LA NACION/);
    }
);

test("Homepage - Header", async ({ page }) => {

    const homepage = new Homepage(page);

    const dollarOfficial = await homepage.HeaderDollarValueAndHREF("djidhwd");
    const dollarBlue = await Homepage.HeaderDollarValueAndHREF("Dólar blue");
    const dollarCard = await Homepage.HeaderDollarValueAndHREF("Dólar tarjeta");
    const dollarCCL = await Homepage.HeaderDollarValueAndHREF("Dólar CCL");
    const dollarMEP = await Homepage.HeaderDollarValueAndHREF("Dólar MEP");

    expect(dollarOfficial.dollarHref).toBe("./dolar-hoy/");
    expect(dollarOfficial.dollarValue).toBeTruthy();

    expect(dollarBlue.dollarHref).toBe("./tema/dolar-blue-tid67294/");
    expect(dollarBlue.dollarValue).toBeTruthy();

    expect(dollarCard.dollarHref).toBe("./tema/dolar-tarjeta-tid50462/");
    expect(dollarCard.dollarValue).toBeTruthy();

    expect(dollarCCL.dollarHref).toBe("./tema/dolar-ccl/");
    expect(dollarCCL.dollarValue).toBeTruthy();

    expect(dollarMEP.dollarHref).toBe("./tema/dolar-mep/");
    expect(dollarMEP.dollarValue).toBeTruthy();

});

test("Homepage - Footer", async ({ page }) => {

});

test("Homepage - Principal Note", async ({ page }) => {

});

test("Homepage - Requests", async ({ page }) => {

});
