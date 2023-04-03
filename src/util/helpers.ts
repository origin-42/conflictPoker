export const pullRandom = (arr: Array<any>) => {
    const randomIndex: number = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};