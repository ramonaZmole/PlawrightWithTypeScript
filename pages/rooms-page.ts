import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { Room } from "../helpers/models/room";
import RoomType from "../helpers/models/enums/room-type";

class RoomsPage extends BasePage {
  readonly #page: Page;

  readonly #createButton: Locator;
  readonly #roomNumberInput: Locator;
  readonly #typeDropdown: Locator;
  readonly #accessibleDropdown: Locator;
  readonly #roomPriceInput: Locator;
  readonly #roomDetailsLabels: Locator;
  readonly #lastRoomDetails: Locator;

  constructor(page: Page) {
    super(page);
    this.#page = page;

    this.#createButton = page.locator("#createRoom");
    this.#roomNumberInput = page.locator("#roomName");
    this.#typeDropdown = page.locator("#type");
    this.#accessibleDropdown = page.locator("#accessible");
    this.#roomPriceInput = page.locator("#roomPrice");
    this.#roomDetailsLabels = page.locator(".form-check-label");
    this.#lastRoomDetails = page.locator("#root > div:nth-child(2) div:nth-last-child(2) .row.detail div");
  }

  async createRoom() {
    await this.#createButton.click();
    await this.#page.waitForResponse(response => response.url().includes("/room/")
      && response.request().method() === "POST");
    await this.#page.waitForEvent("requestfinished");
    await this.#page.waitForTimeout(300)
  }

  async insertRoomDetails(room: Room) {
    await this.#roomNumberInput.fill(room.roomName);
    await this.#typeDropdown.selectOption(room.type);
    await this.#accessibleDropdown.selectOption(room.accessible);
    await this.#roomPriceInput.fill(room.price);
    await this.#roomDetailsLabels.filter({ hasText: room.roomDetails }).click();
  }

  async getLastRoomDetails(): Promise<Room> {
    let roomDetails = await this.#lastRoomDetails.all();

    const room: Room = {
      roomName: await roomDetails[0].textContent() as string,
      type: await roomDetails[1].textContent() as string,
      accessible: await roomDetails[2].textContent() as string,
      price: await roomDetails[3].textContent() as string,
      roomDetails: await roomDetails[4].textContent() as string,
    };
    return room;
  }

}
export default RoomsPage;