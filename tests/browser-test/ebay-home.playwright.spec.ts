import { test, Browser, Page, chromium, expect } from '@playwright/test';
import { Home } from '../page/home/home';
import chance from 'chance';


// test.use({ storageState: 'playwright-auth.json' });

test.describe('Ebay Home Page Tests', async () => {
    let browser: Browser;
    let page: Page;
    const Chance = chance();

    test.beforeAll(async () => {
        console.log('Setting browser and page');
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        test.setTimeout(60000);
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('Assert Home page is displayed and asserty on Menus', async () => {
        const home = new Home(page);
        const searchString = 'cars'
        await page.goto('/');
        await home.searchItems(searchString)
        await expect(page.locator ('h1')).toContainText(`results for ${searchString}`)
        await page.screenshot({
            path: `verification/eBay/search${searchString}.png`,
            fullPage: true,
        });
    });
});
