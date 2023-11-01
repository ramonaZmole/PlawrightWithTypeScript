import { Locator, Page, expect } from "@playwright/test";

export default class AdminHeaderPage {

    readonly #page: Page

    readonly #logoutButton: Locator;

    constructor(page: Page) {
        this.#page = page;

        this.#logoutButton = page.getByText('Logout');
    }

    async isLogoutButtonDisplayed(): Promise<boolean> {
        return await this.#logoutButton.isVisible();
    }
}