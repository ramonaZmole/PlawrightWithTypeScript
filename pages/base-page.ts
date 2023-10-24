import { type Locator, type Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;

    private readonly errorMessages: Locator;

    constructor(page: Page) {
        this.page = page;

        this.errorMessages = page.locator(".alert.alert-danger p");
    }

    // function async List<string> GetErrorMessages()
    // {
    //     WaitHelpers.ExplicitWait();
    //     return _errorMessages.GetElements().Select(x => x.Text).ToList();
    // }

    isErrorMessageDisplayed() { return this.errorMessages.isVisible; }
}