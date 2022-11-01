import { test, expect, request, APIRequestContext } from '@playwright/test';
import { apiHelper } from '../helpers/api';
import { BorrowerStatus, BUTN_SERVER, getRandomNumber } from '../support';
import chance from 'chance';


const Chance = chance();

test.describe('API Tests', async () => {
    let apiContext: APIRequestContext;
    let aggregatorId: number = await getRandomNumber(1000);
    let borrowerExternalID: number = Chance.integer();

    test.beforeAll(async () => {
        test.setTimeout(30000);

        apiContext = await request.newContext({
            // All requests in this test we send go to this API endpoint.
            baseURL: BUTN_SERVER!,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer abcDefGHIJHKLS' // Use of the constant here which instead could be get from the Auth endpoint
            },
        });
        // The method will populate request cookies from the context and update context cookies from the response.
    });

    test.afterAll(async () => {});

    // Assumptions on this test is the aggregator Id and borrower Id is 1234
    // Apex Rest endpoint to query whether a Borrower is Registered to transact on the Butn Platform and get status
    test('Assert whether a Borrower is Registered to transact on the Butn Platform and returns one of the code', async () => {
        const response = await apiHelper.getBorrower(apiContext, `/services/apexrest/v3/borrower/status/?aggregatorId=${aggregatorId}&borrowerExternalID=${borrowerExternalID}`);
        expect(response.ok()).toBeTruthy();
        const borrowerStatus = await response.json();
        const code = await borrowerStatus.code
        expect (Object.values(BorrowerStatus).includes(code)).toBeTruthy();
    });

    //Call the APEX rest endpoint with empty aggregator Id and borrowerExternalId
    test('Assert We get a 400 error code when we supply incorrect borrower id or aggregator Id', async () => {
        const response = await apiHelper.getBorrower(apiContext, `/services/apexrest/v3/borrower/status/?aggregatorId=&borrowerExternalID=`);
        expect(response.ok()).toBeFalsy();
        const errorCodes = await response.json();
        expect(await errorCodes.errorCode).toBe('BAD_REQUEST');
        expect(await errorCodes.message).toBe('Param: Aggregator ID or Borrower External ID was blank.')
    });
});

