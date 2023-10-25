import { expect, test } from '@playwright/test';
import { ADMIN_URL } from '../../helpers/constants';
import LoginPage from '../../pages/login-page';
import RoomsPage from '../../pages/rooms-page';

let loginPage: LoginPage;
let roomsPage: RoomsPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    roomsPage = new RoomsPage(page)
});

// const testCases = [
//     { RoomType: RoomType.Double },
//     { RoomType: RoomType.Family },
//     { RoomType: RoomType.Single },
//     { RoomType: RoomType.Suite },
//     { RoomType: RoomType.Twin },
// ];

//for (const RoomType of testCases)
// test('Room can be created', async ({ page }) => {
//     await page.goto(ADMIN_URL);
//     await loginPage.login();
//     await roomsPage.createRoom();
//     await expect(await roomsPage.isErrorMessageDisplayed()).toBe(true);
// });

test('Room can be created', async ({ page }) => {
    await page.goto(ADMIN_URL);
    await loginPage.login();

    await roomsPage.createRoom();
    await expect(await roomsPage.isErrorMessageDisplayed()).toBeTruthy();

    let errorMessages = await roomsPage.getErrorMessages();
    expect(errorMessages).toContain("Room name must be set")
    expect(errorMessages).toContain("must be greater than or equal to 1")
});

test.afterEach(async ({ page }) => {
    await page.close();
});