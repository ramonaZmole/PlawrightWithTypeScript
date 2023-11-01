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
        await page.close();
        { scope: 'test' }
    },
    adminHeaderPage: async ({ page }, use) => {
        await use(new AdminHeaderPage(page))
        await page.close();
        { scope: 'test' }
    },
    homepage: async ({ page }, use) => {
        await use(new Homepage(page))
        
        await page.close();
        { scope: 'test' }
    },
    roomsPage: async ({ page }, use) => {
        await use(new RoomsPage(page))
        await page.close();
        { scope: 'test' }
    }
})

export default test
export { expect } from '@playwright/test'