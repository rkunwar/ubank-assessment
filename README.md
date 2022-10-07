# Playwright

Playwright enables reliable end-to-end testing for modern web apps.

## Installation

Playwright has its own test runner for end-to-end tests, they call it Playwright Test.

```bash
yarn install
```


## Install Playwright Browser Binaries

```bash
yarn add playwright
```

## Running API Tests

Run your tests with the assumption that all test files are in the `tests` directory. Below command will run api tests. 

```bash
yarn run test:api 
```

## Running Browser Tests

Run your tests with the assumption that all test files are in the `tests` directory. Below command will run tests in headless mode.

```bash
yarn run test:browser 
```

To run test in headed browser:

```bash
yarn run playwright test:browser --headed
```

## Environment Variables

.env file holds the data required to run the tests locally. 


## Reports
Currently repository have the html reporter type configured for the tests. Once the tests are complete, reports are stored on `playwright-report` folder. Reports can be viewed with the command below: 
```bash
yarn run playwright show-report
```

## Test Code Structure

### Pages 


 TODO: Update here for description of Page Object Model and how I have implemented this. 

### Test Specs
Each test specs are named with their appropriate naming postfixed by .playwright.spec.ts. 

## GITHUB ACTIONS
GITHUB  CI Pipeline has been setup with two different steps one for API Tests and 1 for browser tests to keep the tests separation. 



