import { test, Browser, Page, chromium, expect } from '@playwright/test';
import { Home } from '../page/home/home';
import chance from 'chance';
import { hoverOver, isSelectorExists } from '../helpers/common';

// test.use({ storageState: 'playwright-auth.json' });

test.describe('Ebay Home Page Tests', async () => {
    let browser: Browser;
    let page: Page;
    const Chance = chance();

    test.beforeAll(async () => {
        console.log('Setting browser and page ...');
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        test.setTimeout(30000);
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('Assert Home page is displayed and Navigation Menu Items are present', async () => {
        const home = new Home(page);
        await page.goto('/');
        const navItems = await home.returnHomeSelectors('navSelector');
        for (const property in navItems) {
            expect(
                await isSelectorExists(page, navItems[property as keyof typeof navItems])
            ).toBeTruthy();
        }
        await page.screenshot({
            path: `verification/eBay/HomePage.png`,
            fullPage: true,
        });
    });

    test('Assert Electronic Sales Page is displayed successfully with use of hover over from Nav Item', async () => {
        const home = new Home(page);
        await page.goto('/');
        const navItems = await home.returnHomeSelectors('navSelector');
        await hoverOver(page, navItems['Electronics' as keyof typeof navItems]);
        await page.locator('a >> text=Electronic Sales').click();
        await expect(page.locator('.b-pageheader__text')).toHaveText('Electronics Sales');
        await page.screenshot({
            path: `verification/eBay/ElectronicsSales.png`,
            fullPage: true,
        });
    });

    test('Assert user can search for menu Items', async () => {
        const home = new Home(page);
        const searchString = 'cars';
        await page.goto('/');
        await home.searchItems(searchString);
        await expect(page.locator('h1')).toContainText(`results for ${searchString}`);
        await page.screenshot({
            path: `verification/eBay/search${searchString}.png`,
            fullPage: true,
        });
    });
});
