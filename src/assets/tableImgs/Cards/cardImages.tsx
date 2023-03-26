import { clubs, Clubs } from './Clubs/clubs';
import { diamonds, Diamonds } from './Diamonds/diamonds';
import { hearts, Hearts } from './Hearts/hearts';
import { spades, Spades } from './Spades/spades';

export interface Cards {
    clubs: Clubs;
    diamonds: Diamonds;
    hearts: Hearts;
    spades: Spades;
};

export const allCards: Cards = {
    clubs,
    diamonds,
    hearts,
    spades
};
