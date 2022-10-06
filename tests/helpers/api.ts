import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { API_SERVER } from '../support';

export const apiHelper = {

    addPet: async (apiContext: APIRequestContext, reqUrl: string, petData: {}): Promise<APIResponse> => {
        const res = await apiContext.post(`${API_SERVER}/${reqUrl}`, {
            data: petData
        });
        
        return res;
    },

    findPetById: async (apiContext: APIRequestContext, reqUrl: string): Promise<APIResponse> => {
        const res = await apiContext.get(`${API_SERVER}/${reqUrl}`);
        //expect(res.ok()).toBeTruthy();
        return res;
    },
    updatePetName: async (
        apiContext: APIRequestContext,
        reqUrl: string,
        petData: {}
    ): Promise<APIResponse> => {
        const res = await apiContext.put(`${API_SERVER}/${reqUrl}`, {
            data: petData,
        });
        return res;
    },
    deletePet: async (apiContext: APIRequestContext, reqUrl: string): Promise<APIResponse> => {
        const res = await apiContext.delete(`${API_SERVER}/${reqUrl}`);
        return res;
    },
};
