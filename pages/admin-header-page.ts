import { Locator, Page } from "@playwright/test";

class AdminHeaderPage {

    readonly page: Page

    private readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.logoutButton = page.getByText('Logout');
    }

    async isLogoutButtonDisplayed(): Promise<boolean> {
        return this.logoutButton.isVisible();
    }
}
export default AdminHeaderPage;