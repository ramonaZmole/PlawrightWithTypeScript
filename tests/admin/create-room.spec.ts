import { expect, test } from '@playwright/test';
import LoginPage from '../../pages/login-page';
import RoomsPage from '../../pages/rooms-page';
import { Room } from '../../helpers/models/room';
import RoomType from '../../helpers/models/enums/room-type';
import { deleteRoom } from '../../helpers/api-helpers'
import Env from "../../helpers/env"

let loginPage: LoginPage;
let roomsPage: RoomsPage;
let room: Room;

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
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
        await page.goto(Env.ADMIN_URL!);
        await loginPage.login();

        await roomsPage.createRoom();
        expect(await roomsPage.isErrorMessageDisplayed()).toBeTruthy();

        let errorMessages = await roomsPage.getErrorMessages();
        expect(errorMessages).toContain("Room name must be set")
        expect(errorMessages).toContain("must be greater than or equal to 1")
        room = new Room();
        room.type = RoomType[roomType];

        await roomsPage.insertRoomDetails(room);
        await roomsPage.createRoom();
        expect(await roomsPage.getLastRoomDetails()).toEqual(room);
    });

test.afterEach(async ({ page }) => {
    await page.close();
    await deleteRoom(Number(room.roomName));
});
