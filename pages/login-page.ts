import { Page, Locator } from '@playwright/test'
import { requireEnv } from '../helpers/env'
import apiPaths from '../helpers/api-paths'

export default class LoginPage {
  readonly #page: Page

  readonly #usernameInput: Locator
  readonly #passwordInput: Locator
  readonly #loginButton: Locator

  constructor (page: Page) {
    this.#page = page

    this.#usernameInput = page.locator('#username')
    this.#passwordInput = page.locator('#password')
    this.#loginButton = page.locator('#doLogin')
  }

  async login (username?: string, password?: string): Promise<void> {
    if (username === undefined || password === undefined) {
      await this.#usernameInput.fill(requireEnv('ADMIN_USERNAME'))
      await this.#passwordInput.fill(requireEnv('ADMIN_PASSWORD'))
    } else {
      await this.#usernameInput.fill(username)
      await this.#passwordInput.fill(password)
    }
    const loginResponse = this.#page.waitForResponse(
      response => response.url().includes(apiPaths.login) &&
                response.request().method() === 'POST'
    )
    await this.#loginButton.click()
    await loginResponse
  }
}
