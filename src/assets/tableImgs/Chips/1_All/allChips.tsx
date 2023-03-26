export type AllStacks = {
    large: string;
    midLarge: string;
    mid: string;
    midSmall: string;
    small: string;
}
  
export const allStacks: AllStacks = {
    large: require('./Large.png'),
    midLarge: require('./MidLarge.png'),
    mid: require('./Mid.png'),
    midSmall: require('./MidSmall.png'),
    small: require('./Small.png'),
};