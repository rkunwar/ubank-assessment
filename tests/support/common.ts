export async function getRandomNumber(maxValue: number): Promise<number> {
    const randomId = Math.floor(Math.random() * maxValue)
    return randomId;
}
