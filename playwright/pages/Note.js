/**
 * @class Note
 * @description Represents the note page and provides methods to interact with it.
 * @param {Page} page - The Playwright page instance.
 */

export class Note {
    
    constructor(page) {
        this.page = page;
    }   

    async getNoteTitle() {
        return this.page.getByRole('heading').first();
    }

    async getAllNoteParagraphs() {
        const articleBody = this.page.locator('[class="cuerpo__nota"]');
        const paragraphs = await articleBody.locator('p').all();
        return paragraphs;
    }
}