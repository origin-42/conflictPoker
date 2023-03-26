import { GiCard2Spades, GiCard3Spades, GiCard4Spades, GiCard5Spades, GiCard6Spades, GiCard7Spades, GiCard8Spades, GiCard9Spades, GiCard10Spades, GiCardJackSpades, GiCardQueenSpades, GiCardKingSpades, GiCardAceSpades } from 'react-icons/gi';
import { IconType } from 'react-icons';

export type Spades = {
    [key: string]: IconType;
}
  
export const spades: Spades = {
    two: GiCard2Spades,
    three: GiCard3Spades,
    four: GiCard4Spades,
    five: GiCard5Spades,
    six: GiCard6Spades,
    seven: GiCard7Spades,
    eight: GiCard8Spades,
    nine: GiCard9Spades,
    ten: GiCard10Spades,
    jack: GiCardJackSpades,
    queen: GiCardQueenSpades,
    king: GiCardKingSpades,
    ace: GiCardAceSpades
};