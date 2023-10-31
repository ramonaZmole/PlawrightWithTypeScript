import { Page, Locator } from '@playwright/test';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../helpers/constants';

class LoginPage {
    readonly #page: Page;

    readonly #usernameInput: Locator;
    readonly #passwordInput: Locator;
    readonly #loginButton: Locator;

    constructor(page: Page) {
        this.#page = page;

        this.#usernameInput = page.getByPlaceholder("Username")
        this.#passwordInput = page.getByPlaceholder("Password");
        this.#loginButton = page.locator("#doLogin");
    }


    async login(username?: string, password?: string) {

        if (typeof username == 'undefined' || typeof password == 'undefined') {
            await this.#usernameInput.fill(ADMIN_USERNAME);
            await this.#passwordInput.fill(ADMIN_PASSWORD);
        }
        else {
            await this.#usernameInput.fill(username);
            await this.#passwordInput.fill(password);
        }
        await this.#loginButton.click();
        await this.#page.waitForLoadState('domcontentloaded');
        await this.#page.waitForResponse(x => x.url().includes('/auth/login'))
    }
}

export default LoginPage;