import { GiCard2Diamonds, GiCard3Diamonds, GiCard4Diamonds, GiCard5Diamonds, GiCard6Diamonds, GiCard7Diamonds, GiCard8Diamonds, GiCard9Diamonds, GiCard10Diamonds, GiCardJackDiamonds, GiCardQueenDiamonds, GiCardKingDiamonds, GiCardAceDiamonds } from 'react-icons/gi';
import { IconType } from 'react-icons';

export type Diamonds = {
    [key: string]: IconType;
}
  
export const diamonds: Diamonds = {
    two: GiCard2Diamonds,
    three: GiCard3Diamonds,
    four: GiCard4Diamonds,
    five: GiCard5Diamonds,
    six: GiCard6Diamonds,
    seven: GiCard7Diamonds,
    eight: GiCard8Diamonds,
    nine: GiCard9Diamonds,
    ten: GiCard10Diamonds,
    jack: GiCardJackDiamonds,
    queen: GiCardQueenDiamonds,
    king: GiCardKingDiamonds,
    ace: GiCardAceDiamonds
};