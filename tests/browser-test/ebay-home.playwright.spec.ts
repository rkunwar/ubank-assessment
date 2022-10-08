import { test, expect } from '@playwright/test';
import { Home } from '../page/home/home';
import { hoverOver, isSelectorExists } from '../helpers/common';

test.describe('Ebay Home Page Tests', async () => {
    test.beforeAll(async () => {
        console.log('Setting browser and page ...');
        test.setTimeout(30000);
    });

    test('Assert Home page is displayed and Navigation Menu Items are present', async ({
        page,
    }) => {
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

    test('Assert Electronic Sales Page is displayed successfully with use of hover over from Nav Item', async ({
        page,
    }) => {
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

    test('Assert user can search for menu Items', async ({ page }) => {
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
