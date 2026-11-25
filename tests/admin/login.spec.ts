import test, { expect } from "../../helpers/fixtures/test-fixture";
import Env from '../../helpers/env';

const testCases = [
    { username: Env.ADMIN_USERNAME, password: Env.ADMIN_PASSWORD, isLoggedIn: true },
    { username: 'invalidUser', password: 'invalidPassword', isLoggedIn: false },
];

for (const { username, password, isLoggedIn } of testCases)
    test(`Login as user ${username}`, async ({ page, loginPage }) => {
        await page.goto(Env.ADMIN_URL!);
        await loginPage.login(username, password);
        if (isLoggedIn) {
            await expect(page).toHaveURL(/\/admin\/rooms/);
        } else {
            await expect(page.getByText("Invalid credentials")).toBeVisible();
        }
    });
