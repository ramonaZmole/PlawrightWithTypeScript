import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

class RoomsPage extends BasePage {

  readonly #page: Page;

  readonly #createButton: Locator;
  //  readonly #errorMessages: Locator;

  constructor(page: Page) {
    super(page);
    this.#page = page;

    this.#createButton = page.locator("#createRoom");
    //  this.#errorMessages = page.locator(".alert.alert-danger p");
  }

  async createRoom() {
    await this.#createButton.click();
    await this.#page.waitForResponse(response => response.url().includes("/room/")
      && response.request().method() === "POST");
  }


  // async getErrorMessages(): Promise<string[]> {
  //     // WaitHelpers.ExplicitWait();
  //     //let errorMessages =
  //     //let t = errorMessages.map(x => x.allTextContents());
  //     //let rr=typeof t;
  //     //  return errorMessages.map(x => x.textContent);
  //     return await this.#errorMessages.allTextContents();
  // }
}
export default RoomsPage;