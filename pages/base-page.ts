import { type Locator, type Page } from "@playwright/test";

export class BasePage {
    readonly #page: Page;

    readonly #errorMessages: Locator;

    constructor(page: Page) {
        this.#page = page;

        this.#errorMessages = page.locator(".alert.alert-danger p");
    }

    async getErrorMessages(): Promise<string[]> {
        // WaitHelpers.ExplicitWait();
        //let errorMessages =
        //let t = errorMessages.map(x => x.allTextContents());
        //let rr=typeof t;
        //  return errorMessages.map(x => x.textContent);
        return await this.#errorMessages.allTextContents();
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        let errorMessages = await this.#errorMessages.all();
        return errorMessages.every(x => x.isVisible());
    }
}