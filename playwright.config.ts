// playwright.config.ts
import { PlaywrightTestConfig } from "@playwright/test";

require('dotenv').config()

const config: PlaywrightTestConfig = {
 
  workers: 1, // Set it to 1 unless we want to start parllelising tests.
  reporter: process.env.CI ? 'line' :'html',
  
  retries: 0,
  use: {
    trace: 'on',
  },
  projects: [
    {
      name: 'Chrome Stable',
      use: {
        baseURL:'https://www.ebay.com.au', 
        channel: 'chrome',
        headless: true,
        viewport : {
          width: 1280,
          height: 720
        }, 
      }, 
      timeout: 30 * 1000 // 30 seconds timeout option,
    },
  ],
};
export default config;
