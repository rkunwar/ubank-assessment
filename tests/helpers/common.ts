import { Page } from '@playwright/test';

export async function isSelectorExists(page: Page, selector: string): Promise<boolean> {
    return (await page.$(selector).catch(() => null)) !== null;
}

export async function hoverOver(page: Page, selector: string): Promise<void> {
    await page.hover(selector);
}
