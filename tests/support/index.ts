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
export const BUTN_SERVER = 'https://{base_url}'

/**
 *
 * @param maxValue integer value to specify the maximum number upto which the random number can be generated to
 * @returns random integer value
 */
export async function getRandomNumber(maxValue: number): Promise<number> {
    const randomId = Math.floor(Math.random() * maxValue);
    return randomId;
}


export enum BorrowerStatus
{
  Pending = 'Pending',
  Pending_Login_Created = 'Pending (Login Created)',
  Review = 'Review',
  Will_Not_Fund = 'Will not fund',
  Approved = 'Approved',
  Inactive_Ineligible = 'Inactive - Ineligible',
  Inactive_Suspended =  'Inactive - Suspended',
  Inactive_Unsubscribed = 'Inactive - Unsubscribed', 
  Not_Applicable = 'Not Applicable'
}