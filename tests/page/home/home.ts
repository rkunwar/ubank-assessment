import { expect, Page } from '@playwright/test';

const homePageSelectors = {
    navSelector: {
        'Home': 'span:has-text("Home")',
        'Saved': '.saved:has-text("Saved")',
        'Electronics': '[data-currenttabindex="0"]:has-text("Electronics")',
        'Motors': 'data-currenttabindex="0"]:has-text("Motors")',
    },
    buttons: {
        search: '#gh-btn >> text=Search',
    },
    inputs: {
        searchAnything: '[aria-label="Search for anything"]'
    },
};

type TABS = 'Default mode network' | 'Salience network' | 'Custom object 1';

export class Home {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

   async searchItems(item:string): Promise<void> {
    await this.page.fill(homePageSelectors.inputs.searchAnything, item)
    await this.page.click(homePageSelectors.buttons.search)
   }


}
