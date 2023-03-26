import { GiCard2Clubs, GiCard3Clubs, GiCard4Clubs, GiCard5Clubs, GiCard6Clubs, GiCard7Clubs, GiCard8Clubs, GiCard9Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs, GiCardKingClubs, GiCardAceClubs } from 'react-icons/gi';
import { IconType } from 'react-icons';

export type Clubs = {
    [key: string]: IconType;
}
  
export const clubs: Clubs = {
    two: GiCard2Clubs,
    three: GiCard3Clubs,
    four: GiCard4Clubs,
    five: GiCard5Clubs,
    six: GiCard6Clubs,
    seven: GiCard7Clubs,
    eight: GiCard8Clubs,
    nine: GiCard9Clubs,
    ten: GiCard10Clubs,
    jack: GiCardJackClubs,
    queen: GiCardQueenClubs,
    king: GiCardKingClubs,
    ace: GiCardAceClubs
};