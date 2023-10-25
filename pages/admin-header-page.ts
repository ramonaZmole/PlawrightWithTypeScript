import { Locator, Page, expect } from "@playwright/test";

class AdminHeaderPage {

    readonly page: Page

    private readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.logoutButton = page.getByText('Logout');
    }

    async isLogoutButtonDisplayed(): Promise<boolean> {
        return await this.logoutButton.isVisible();
    }
}
export default AdminHeaderPage;