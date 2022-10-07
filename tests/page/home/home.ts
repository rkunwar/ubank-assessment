import { Page } from '@playwright/test';
import { getKeyValue } from '../../support/common';

const homePageSelectors = {
    navSelector: {
        'Home': 'span:has-text("Home")',
        'Saved': '.saved:has-text("Saved")',
        'Electronics': '[data-currenttabindex="0"]:has-text("Electronics")',
        'Motors': '[data-currenttabindex="1"]:has-text("Motors")',
    },
    buttons: {
        search: '#gh-btn >> text=Search',
    },
    inputs: {
        searchAnything: '[aria-label="Search for anything"]'
    },
};


export class Home {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async returnHomeSelectors(selectorType: keyof typeof homePageSelectors){
        return getKeyValue(homePageSelectors, selectorType)
    }

   async searchItems(item:string): Promise<void> {
    await this.page.fill(homePageSelectors.inputs.searchAnything, item)
    await this.page.click(homePageSelectors.buttons.search)
   }

   async hoverMenuItems(item:string): Promise<void> {
    await this.page.hover(homePageSelectors.navSelector.Home)
   }




}
