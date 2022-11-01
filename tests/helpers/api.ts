import { APIRequestContext, APIResponse } from '@playwright/test';
import { API_SERVER, BUTN_SERVER } from '../support';

export const apiHelper = {
    /**
     *
     * @param apiContext API Context
     * @param reqUrl Request Url
     * @param petData Pet Data to add to the store
     * @returns API Response
     */
    addPet: async (
        apiContext: APIRequestContext,
        reqUrl: string,
        petData: {}
    ): Promise<APIResponse> => {
        const res = await apiContext.post(`${API_SERVER}/${reqUrl}`, {
            data: petData,
        });

        return res;
    },
    /**
     *
     * @param apiContext API Context
     * @param reqUrl Request URL with PetID
     * @returns API Response
     */
    findPetById: async (apiContext: APIRequestContext, reqUrl: string): Promise<APIResponse> => {
        const res = await apiContext.get(`${API_SERVER}/${reqUrl}`);
        return res;
    },
    /**
     *
     * @param apiContext API Context
     * @param reqUrl Request URL
     * @param petData Pet Data with the updated details
     * @returns API Response
     */
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
    /**
     *
     * @param apiContext API Context
     * @param reqUrl Request URL with PetID
     * @returns API Response
     */
    deletePet: async (apiContext: APIRequestContext, reqUrl: string): Promise<APIResponse> => {
        const res = await apiContext.delete(`${API_SERVER}/${reqUrl}`);
        return res;
    },

    getBorrower:async (apiContext:APIRequestContext,reqUrl:string): Promise<APIResponse> => {
        const res = await apiContext.get(`${BUTN_SERVER}/${reqUrl}`);
        return res;
    }
};
