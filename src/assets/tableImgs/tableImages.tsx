import { button, Button } from './button';
import { allCards, Cards } from './Cards/cardImages';
import { pokerStacks, PokerStacks } from './Chips/chipStacks';

export interface TableImages {
    button: Button;
    cards: Cards;
    stacks: PokerStacks;
};

export const tableImages: TableImages = {
    button,
    cards: allCards,
    stacks: pokerStacks,
};