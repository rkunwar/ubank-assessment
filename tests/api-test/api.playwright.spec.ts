import { test, expect, request, APIRequestContext } from '@playwright/test';
import { petData } from '../data/test-data';

import { apiHelper } from '../helpers/api';
import { getRandomNumber } from '../support';
import chance from 'chance';
import { API_SERVER } from '../support';

const Chance = chance();
//test.use({ baseURL: 'https://petstore.swagger.io' });

test.describe('API Tests', async () => {
    let apiContext: APIRequestContext;
    let petId: number = await getRandomNumber(1000);
    let petName: string = Chance.last();

    test.beforeAll(async () => {
        test.setTimeout(30000);

        apiContext = await request.newContext({
            // All requests in this test we send go to this API endpoint.
            baseURL: API_SERVER!,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
            },
        });
        // The method will populate request cookies from the context and update context cookies from the response.
    });

    test.afterAll(async () => {});

    // Add a pet to the petStore and assert response is successful.
    test('Assert Pet can be added successfully', async () => {
        const response = await apiHelper.addPet(apiContext, `pet`, {
            ...petData,
            id: petId,
            name: `Labrador ${petName}`,
        });
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
    });

    // Make an API Call to find pet by Id.
    test('Assert find Pet by Id call can be made', async () => {
        const response = await apiHelper.findPetById(apiContext, `pet/${petId}`);
        expect(response.ok()).toBeTruthy();
        const petDetails = await response.json();
        expect(await petDetails.id).toBe(petId);
        expect(await petDetails.name).toBe(`Labrador ${petName}`);
    });

    test('Assert PetName can be updated successfully', async () => {
        let updatedName: string = Chance.last();
        const response = await apiHelper.addPet(apiContext, `pet`, {
            ...petData,
            id: petId,
            name: `Labrador ${updatedName}`,
        });
        expect(response.ok()).toBeTruthy();
        const petDetails = await response.json();
        console.log(petDetails);
        expect(await petDetails.name).toBe(`Labrador ${updatedName}`);
    });

    test('Assert pet can be deleted successfully', async () => {
        const response = await apiHelper.deletePet(apiContext, `pet/${petId}`);
        expect(response.ok()).toBeTruthy();

        const missingPetResponse = await apiHelper.findPetById(apiContext, `pet/${petId}`);
        expect(missingPetResponse.ok()).toBeFalsy();
        const missingPetMessage = await missingPetResponse.json();
        expect(await missingPetMessage.message).toBe('Pet not found');
    });
});
