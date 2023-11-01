import { type Locator, type Page } from "@playwright/test";

export default class BasePage {
    readonly #page: Page;

    readonly #errorMessages: string;

    constructor(page: Page) {
        this.#page = page;

        // this.#errorMessages = page.locator(".alert.alert-danger p");
        this.#errorMessages = ".alert.alert-danger p";
    }

    // async getErrorMessages(): Promise<string[]> {
    //     return await this.#errorMessages.allTextContents();
    // }

    // async isErrorMessageDisplayed(): Promise<boolean> {
    //     let errorMessages = await this.#errorMessages.all();
    //     return errorMessages.every(x => x.isVisible());
    // }

    async getErrorMessages(): Promise<string[]> {
        return await this.#page.locator(this.#errorMessages).allTextContents();
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        let errorMessages = await this.#page.locator(this.#errorMessages).all();
        return errorMessages.every(x => x.isVisible());
    }
}