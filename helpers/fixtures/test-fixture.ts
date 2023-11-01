import { test as baseTest } from '@playwright/test';
import LoginPage from '../../pages/login-page';
import AdminHeaderPage from '../../pages/admin-header-page';
import Homepage from '../../pages/homepage';
import RoomsPage from '../../pages/rooms-page';

type Fixtures = {
    loginPage: LoginPage;
    adminHeaderPage: AdminHeaderPage;
    homepage: Homepage;
    roomsPage: RoomsPage;
};

const test = baseTest.extend<Fixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
        { scope: 'test' }
        await page.close();
    },
    adminHeaderPage: async ({ page }, use) => {
        await use(new AdminHeaderPage(page))
        { scope: 'test' }
        await page.close();
    },
    homepage: async ({ page }, use) => {
        await use(new Homepage(page))
        { scope: 'test' }
        await page.close();
    },
    roomsPage: async ({ page }, use) => {
        await use(new RoomsPage(page))
        { scope: 'test' }
        await page.close();
    }
})

export default test
export { expect } from '@playwright/test'