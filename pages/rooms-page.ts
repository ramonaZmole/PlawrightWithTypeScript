import { Locator, Page } from "@playwright/test";
import { Room } from "../helpers/models/room";
import BasePage from "./base-page";
import apiPaths from "../helpers/api-paths";

export default class RoomsPage extends BasePage {
  readonly #page: Page;

  readonly #createButton: Locator;
  readonly #roomNumberInput: Locator;
  readonly #typeDropdown: Locator;
  readonly #accessibleDropdown: Locator;
  readonly #roomPriceInput: Locator;
  readonly #roomDetailsLabels: Locator;
  readonly #roomListings: Locator;

  constructor(page: Page) {
    super(page);
    this.#page = page;

    this.#createButton = page.locator("#createRoom");
    this.#roomNumberInput = page.locator("#roomName");
    this.#typeDropdown = page.locator("#type");
    this.#accessibleDropdown = page.locator("#accessible");
    this.#roomPriceInput = page.locator("#roomPrice");
    this.#roomDetailsLabels = page.locator(".form-check-label");
    this.#roomListings = page.getByTestId("roomlisting");
  }

  async createRoom() {
    const response = this.#page.waitForResponse(response => response.url().includes(apiPaths.room)
      && response.request().method() === "POST");
    await this.#createButton.click();
    await response;
  }

  async insertRoomDetails(room: Room) {
    await this.#roomNumberInput.fill(room.roomName);
    await this.#typeDropdown.selectOption(room.type);
    await this.#accessibleDropdown.selectOption(room.accessible);
    await this.#roomPriceInput.fill(room.price);
    
    if (room.roomDetails === "") return;
    await this.#roomDetailsLabels.filter({ hasText: room.roomDetails }).click();
  }

  async getRoomDetails(roomName: string): Promise<Room> {
    const listing = this.#roomListings.filter({
      has: this.#page.getByText(roomName, { exact: true })
    });
    await listing.waitFor({ state: "visible" });
    const roomDetails = await listing.locator("p").allTextContents();
    if (roomDetails.length !== 5) {
      throw new Error(`Expected 5 room detail fields, received ${roomDetails.length}`);
    }

    const room: Room = {
      roomName: roomDetails[0],
      type: roomDetails[1],
      accessible: roomDetails[2],
      price: roomDetails[3],
      roomDetails: roomDetails[4],
    };
    return room;
  }

}
