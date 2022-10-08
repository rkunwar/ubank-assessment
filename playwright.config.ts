// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";

require('dotenv').config()

const config: PlaywrightTestConfig = {
 
  workers: process.env.CI ? 1: undefined, // Set it to 1 unless we want to start parllelising tests.
  reporter: 'html',
  retries: 0,
  use: {
    trace: 'on',
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        baseURL:'https://www.ebay.com.au', 
        headless: true,
        viewport : {
          width: 1280,
          height: 720
        }, 
      }, 
      timeout: 30 * 1000 // 30 seconds timeout option,
    },
    {
      name: 'firefox',
      use: {
      browserName: 'firefox',
      baseURL:'https://www.ebay.com.au', 
      headless: true,
      viewport : {
        width: 1280,
        height: 720
      },
     },
    },
  ],

};
export default config;
