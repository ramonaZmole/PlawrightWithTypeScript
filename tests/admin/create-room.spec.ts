import test, { expect } from "../../helpers/fixtures/test-fixture";
import { Room } from '../../helpers/models/room';
import RoomType from '../../helpers/models/enums/room-type';
import { deleteRoom } from '../../helpers/api-helpers'
import Env from "../../helpers/env"

let room: Room = new Room();

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(Env.ADMIN_URL!);
    await loginPage.login();

});

const testCases = [
    { roomType: RoomType.Double },
    { roomType: RoomType.Family },
    { roomType: RoomType.Single },
    { roomType: RoomType.Suite },
    { roomType: RoomType.Twin },
];

for (const { roomType } of testCases)
    test(`${RoomType[roomType]} room can be created`, async ({ roomsPage }) => {
        await roomsPage.createRoom();
        expect(await roomsPage.isErrorMessageDisplayed()).toBeTruthy();

        let errorMessages = await roomsPage.getErrorMessages();
        expect(errorMessages).toContain("Room name must be set")
        expect(errorMessages).toContain("must be greater than or equal to 1")

        room.type = RoomType[roomType];

        await roomsPage.insertRoomDetails(room);
        await roomsPage.createRoom();
        expect(await roomsPage.getLastRoomDetails()).toEqual(room);
    });


test(`Create room with no features`, async ({ roomsPage }) => {
    room.roomDetails = "";

    await roomsPage.insertRoomDetails(room);
    await roomsPage.createRoom();
    expect((await roomsPage.getLastRoomDetails()).roomDetails).toEqual("No features added to the room");
});
test.afterEach(async () => {
    await deleteRoom(Number(room.roomName));
});
