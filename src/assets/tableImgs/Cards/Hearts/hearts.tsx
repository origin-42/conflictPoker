import { GiCard2Hearts, GiCard3Hearts, GiCard4Hearts, GiCard5Hearts, GiCard6Hearts, GiCard7Hearts, GiCard8Hearts, GiCard9Hearts, GiCard10Hearts, GiCardJackHearts, GiCardQueenHearts, GiCardKingHearts, GiCardAceHearts } from 'react-icons/gi';
import { IconType } from 'react-icons';

export type Hearts = {
    [key: string]: IconType;
}
  
export const hearts: Hearts = {
    two: GiCard2Hearts,
    three: GiCard3Hearts,
    four: GiCard4Hearts,
    five: GiCard5Hearts,
    six: GiCard6Hearts,
    seven: GiCard7Hearts,
    eight: GiCard8Hearts,
    nine: GiCard9Hearts,
    ten: GiCard10Hearts,
    jack: GiCardJackHearts,
    queen: GiCardQueenHearts,
    king: GiCardKingHearts,
    ace: GiCardAceHearts
};