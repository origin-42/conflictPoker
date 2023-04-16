export interface NewDeck {
    success: boolean;
    deck_id: string;
    remaining: number;
    shuffled: boolean;
}
  
export interface NewCard {
    success: boolean;
    deck_id: string;
    cards: Card[];
    remaining: number;
}
  
export interface Card {
    code: string;
    image: string;
    images: {
        svg: string;
        png: string;
        blank: string;
    };
    value: string;
    suit: string;
} 

// The details to hold the games values
export interface GameStart {
    deck_id: string;
    button: string;
    gameWinner: string;
    timer: boolean;
    flop: Card[];
    turn: Card[];
    river: Card[];
    burn: Card[];
    playerHand: Card[];
    jimsHand: Card[];
}
export interface RoundStart {
    potSize: number;
    blinds: number;
    roundWinner: string;
    playerMove: string;
    buttonImg: string;
    betting: boolean;
    dealPhase: string;
    blindsLevel: number;
    playerBet: number;
    playerRaise: number;
    playerStack: number;
    jimsBet: number;
    jimsRaise: number;
    jimsStack: number;
}

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';