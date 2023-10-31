import { APIRequestContext, expect, test } from '@playwright/test';
import { ADMIN_URL } from '../../helpers/constants';
import LoginPage from '../../pages/login-page';
import RoomsPage from '../../pages/rooms-page';
import { Room } from '../../helpers/models/room';
import RoomType from '../../helpers/models/enums/room-type';
import { URL } from '../../helpers/constants';

let loginPage: LoginPage;
let roomsPage: RoomsPage;

let apiContext: APIRequestContext;

//test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, playwright }) => {

    let apiContext: APIRequestContext;

    apiContext = await playwright.request.newContext({
        baseURL: URL,
        extraHTTPHeaders: {
            // Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            Accept: 'application/json',
        },
    });

   var t= await apiContext["post"]("/auth/login", { data: { username: "admin", password: "password" } });

    loginPage = new LoginPage(page);
    roomsPage = new RoomsPage(page)
});

const testCases = [
    { roomType: RoomType.Double },
    { roomType: RoomType.Family },
    { roomType: RoomType.Single },
    { roomType: RoomType.Suite },
    { roomType: RoomType.Twin },
];

for (const { roomType } of testCases)
    test(`${RoomType[roomType]} room can be created`, async ({ page }) => {
        await page.goto(ADMIN_URL);
        await loginPage.login();

        await roomsPage.createRoom();
        expect(await roomsPage.isErrorMessageDisplayed()).toBeTruthy();

        let errorMessages = await roomsPage.getErrorMessages();
        expect(errorMessages).toContain("Room name must be set")
        expect(errorMessages).toContain("must be greater than or equal to 1")
        let room = new Room();
        room.type = RoomType[roomType];

        await roomsPage.insertRoomDetails(room);
        await roomsPage.createRoom();
        expect(await roomsPage.getLastRoomDetails()).toEqual(room);
    });

test.afterEach(async ({ page, playwright }) => {
    await page.close();

    let apiContext: APIRequestContext;

    apiContext = await playwright.request.newContext({
        baseURL: URL,
        extraHTTPHeaders: {
            // Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            Accept: 'application/json',
        },
    });

   var t= await apiContext["post"]("/auth/login", { data: { username: "admin", password: "password" } });
});