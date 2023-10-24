import { Page, Locator } from '@playwright/test';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../helpers/constants';

class LoginPage {
    readonly page: Page;

    private readonly _usernameInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this._usernameInput = page.getByPlaceholder("Username")
        this._passwordInput = page.getByPlaceholder("Password");
        this._loginButton = page.locator("#doLogin");
    }


    async login(username?: string, password?: string) {

        if (typeof username == 'undefined' || typeof password == 'undefined') {
            await this._usernameInput.fill(ADMIN_USERNAME);
            await this._passwordInput.fill(ADMIN_PASSWORD);
        }
        else {
            await this._usernameInput.fill(username);
            await this._passwordInput.fill(password);
        }
        await this._loginButton.click();
    }
}

export default LoginPage;