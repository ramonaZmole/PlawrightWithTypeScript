import { Page, Locator } from '@playwright/test';
import Env from "../helpers/env"

export default class LoginPage {
    readonly #page: Page;

    readonly #usernameInput: string;
    readonly #passwordInput: string;
    readonly #loginButton: string;

    constructor(page: Page) {
        this.#page = page;

        // this.#usernameInput = page.getByPlaceholder("Username")
        // this.#passwordInput = page.getByPlaceholder("Password");
        // this.#loginButton = page.locator("#doLogin");
        this.#usernameInput = "Username";
        this.#passwordInput = "Password";
        this.#loginButton = "#doLogin";
    }


    // async login(username?: string, password?: string) {

    //     if (typeof username == 'undefined' || typeof password == 'undefined') {
    //         await this.#usernameInput.fill(Env.ADMIN_USERNAME!);
    //         await this.#passwordInput.fill(Env.ADMIN_PASSWORD!);
    //     }
    //     else {
    //         await this.#usernameInput.fill(username);
    //         await this.#passwordInput.fill(password);
    //     }
    //     await this.#loginButton.click();
    //     await this.#page.waitForLoadState('domcontentloaded');
    //     await this.#page.waitForResponse(x => x.url().includes('/auth/login'))
    // }


    async login(username?: string, password?: string) {

        if (typeof username == 'undefined' || typeof password == 'undefined') {
            await this.#page.getByPlaceholder(this.#usernameInput).fill(Env.ADMIN_USERNAME!);
            await this.#page.getByPlaceholder(this.#passwordInput).fill(Env.ADMIN_PASSWORD!);
        }
        else {
            await this.#page.getByPlaceholder(this.#usernameInput).fill(username);
            await this.#page.getByPlaceholder(this.#passwordInput).fill(password)
        }
        await this.#page.locator(this.#loginButton).click();
        await this.#page.waitForLoadState('domcontentloaded');
        await this.#page.waitForResponse(x => x.url().includes('/auth/login'))
    }
}
