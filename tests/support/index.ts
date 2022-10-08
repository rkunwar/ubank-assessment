/**
 *
 * @param obj
 * @param key
 * @returns object that matches the key value
 */
export const getKeyValue = function <T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
};

export const API_SERVER = 'https://petstore.swagger.io/v2';

/**
 *
 * @param maxValue integer value to specify the maximum number upto which the random number can be generated to
 * @returns random integer value
 */
export async function getRandomNumber(maxValue: number): Promise<number> {
    const randomId = Math.floor(Math.random() * maxValue);
    return randomId;
}
