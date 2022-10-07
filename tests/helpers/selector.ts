import { Page } from "@playwright/test";

export async function isSelectorExists(page: Page, selector: string) {
    return await page.$(selector).catch(() => null) !== null;
}
