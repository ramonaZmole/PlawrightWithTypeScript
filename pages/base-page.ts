import { type Locator, type Page } from '@playwright/test'

export default class BasePage {
  readonly #page: Page

  readonly #errorMessages: Locator

  constructor (page: Page) {
    this.#page = page

    this.#errorMessages = page.locator('#contact p, .alert.alert-danger p')
  }

  async getErrorMessages (): Promise<string[]> {
    return await this.#errorMessages.allTextContents()
  }

  async isErrorMessageDisplayed (): Promise<boolean> {
    const errorMessages = await this.#errorMessages.all()
    return errorMessages.length > 0 &&
            (await Promise.all(errorMessages.map(async errorMessage => await errorMessage.isVisible()))).every(Boolean)
  }
}
