import { expect, test } from '@playwright/test';
import { ADMIN_URL } from '../../helpers/constants';
import LoginPage from '../../pages/login-page';
import AdminHeaderPage from '../../pages/admin-header-page'

let loginPage: LoginPage;
let adminHeaderPage: AdminHeaderPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    adminHeaderPage = new AdminHeaderPage(page);
});

const testCases = [
    { username: 'admin', password: `password` },
    { username: 'invalidUser', password: `invalidPassword` },
];


for (const { username, password } of testCases)
    test(`Login as admin ${username}`, async ({ page }) => {
        await page.goto(ADMIN_URL);
        await loginPage.login(username, password);
        await expect(adminHeaderPage.isLogoutButtonDisplayed).toBeTruthy;
    });


test.afterAll(async ({ page }) => {
    await page.close();
});