import { expect } from "@playwright/test";
/**
 * @class Common
 * @description Represents common functionalities for the application.
 * @param {Page} page - The Playwright page instance.
 */

export class Common {
    
    constructor(page) {
        this.page = page;
    }   

    async ifAdThenClose() {
        const adLocator = this.page.locator('[class="ln-banner-container --comercial_dsk --comercial --no-app"]');
        const adCloseButton = this.page.getByRole('button', { name: 'CERRAR' });

        if (await adLocator.isVisible()) {
            await adCloseButton.click();
        }
    }

    async scrollTo(selector) {
        const element = this.page.locator(selector);
        await this.page.evaluate((el) => el.scrollIntoView(), element);
    }

    async validateResourceRequests() {
        
        const failedRequests = [];

        await this.page.route(`**/*.lanacion.com.ar/**`, async (route) => {
          const response = await route.fetch();
          if (!response.ok()) {
            failedRequests.push({ url: response.url(), status: response.status() });
          }
          await route.fulfill({ response });
        });

        expect(failedRequests).toHaveLength(0);

        if (failedRequests.length > 0) {
            console.log('Failed requests were found.');
            failedRequests.forEach((request) => {
              console.log(`  URL: ${request.url}`);
              console.log(`  Status: ${request.status} ${request.statusText}`);
            });
          } else {
            console.log('All requests were successful!');
          }
    }
}