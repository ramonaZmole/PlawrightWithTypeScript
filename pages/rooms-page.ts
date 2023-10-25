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

  constructor(page: Page) {
    super(page);
    this.#page = page;

    this.#createButton = page.locator("#createRoom");
    this.#roomNumberInput = page.locator("#roomName");
    this.#typeDropdown = page.locator("#type");
    this.#accessibleDropdown = page.locator("#accessible");
    this.#roomPriceInput = page.locator("#roomPrice");
    this.#roomDetailsLabels = page.locator(".form-check-label");


  }

  async createRoom() {
    await this.#createButton.click();
    await this.#page.waitForResponse(response => response.url().includes("/room/")
      && response.request().method() === "POST");
  }

  async insertRoomDetails(room: Room) {
    await this.#roomNumberInput.fill(room.roomName);
    await this.#typeDropdown.selectOption(room.type);
    await this.#accessibleDropdown.selectOption(room.accessible);
    await this.#roomPriceInput.fill(room.price);
    await this.#roomDetailsLabels.filter({ hasText: room.roomDetails }).click();
  }

}
export default RoomsPage;