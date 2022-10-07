/**
 * 
 * @param obj 
 * @param key 
 * @returns 
 */
export const getKeyValue = function <T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
};

export const API_SERVER = 'https://petstore.swagger.io/v2';

export async function getRandomNumber(maxValue: number): Promise<number> {
    const randomId = Math.floor(Math.random() * maxValue)
    return randomId;
}
