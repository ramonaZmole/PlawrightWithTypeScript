import { expect, test } from '@playwright/test';
import LoginPage from '../../pages/login-page';
import AdminHeaderPage from '../../pages/admin-header-page'
import Env from '../../helpers/env';

let loginPage: LoginPage;
let adminHeaderPage: AdminHeaderPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    adminHeaderPage = new AdminHeaderPage(page);
});

const testCases = [
    { username: Env.ADMIN_USERNAME, password: Env.ADMIN_PASSWORD, isLoggedIn: true },
    { username: 'invalidUser', password: 'invalidPassword', isLoggedIn: false },
];

for (const { username, password, isLoggedIn } of testCases)
    test(`Login as user ${username}`, async ({ page }) => {
        await page.goto(Env.ADMIN_URL!);
        await loginPage.login(username, password);
        await expect(await adminHeaderPage.isLogoutButtonDisplayed()).toBe(isLoggedIn);
    });

test.afterEach(async ({ page }) => {
    await page.close();
});