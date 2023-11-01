import { Locator, Page, expect } from "@playwright/test";

export default class AdminHeaderPage {

    readonly #page: Page

    readonly #logoutButton: string;

    constructor(page: Page) {
        this.#page = page;

        //this.#logoutButton = page.getByText('Logout');
        this.#logoutButton = "Logout";
    }

    async isLogoutButtonDisplayed(): Promise<boolean> {
        return await this.#page.getByText(this.#logoutButton).isVisible();
    }
}