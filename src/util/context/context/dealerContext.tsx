import React, { FC, createContext, useContext, useState } from 'react';
import { fetchNewDeck, takeNewCard, shuffleDeck } from '../contextHelpers/dealing';
import { NewDeck, NewCard, Card, GameStart } from '../contextTypes/contextTypes';

const DealerContext = createContext<DealerContextValues | null>(null);

export const useDealerContext = () => {
  const context = useContext(DealerContext) as DealerContextValues;
  if (!context) {
    throw new Error('useDealerContext must be used within a DealerContextProvider');
  }
  return context;
};

let dealACard: (deck_id: string, placement: string) => Promise<void>;
let shuffleTheDeck: (deck_id: string) => Promise<NewDeck>;
let restartGame: (deck_id: string) => Promise<NewDeck>;
let startGame: () => Promise<NewDeck>;

export interface DealerContextValues {
  dealerInfo: GameStart;
  setDealerInfo: React.Dispatch<React.SetStateAction<GameStart>>;
  dealACard: (deck_id: string, placement: string) => void;
  shuffleTheDeck: (deck_id: string) => Promise<NewDeck>;
  restartGame: (deck_id: string) => Promise<NewDeck>;
  startGame: () => Promise<NewDeck>;
}

const gameStart: GameStart = {
  deck_id: '',
  timer: false,
  flop: [] as Card[],
  turn: [] as Card[],
  river: [] as Card[],
  playerHand: [] as Card[],
  jimsHand: [] as Card[],
};

export const DealerProvider: FC<any> = ({ children }) => {
    const [dealerInfo, setDealerInfo] = useState<GameStart>(gameStart);

    dealACard = async function (deck_id, placement) {
        const newCard: NewCard = await takeNewCard(deck_id);

        if (placement === 'jim') return setDealerInfo({ ...dealerInfo, jimsHand: [...dealerInfo.jimsHand, ...newCard.cards] });
        if (placement === 'player') return setDealerInfo({ ...dealerInfo, playerHand: [...dealerInfo.playerHand, ...newCard.cards] });
        if (placement === 'flop') return setDealerInfo({ ...dealerInfo, flop: [...dealerInfo.flop, ...newCard.cards] });
        if (placement === 'turn') return setDealerInfo({ ...dealerInfo, turn: [...newCard.cards] });
        if (placement === 'river') return setDealerInfo({ ...dealerInfo, river: [...newCard.cards] });
    };

    shuffleTheDeck = async function (deck_id) {
        const shuffledDeck: NewDeck = await shuffleDeck(deck_id);
        return shuffledDeck;
    };

    restartGame = function (deck_id) {
        setDealerInfo(gameStart);
        const shuffledDeck: Promise<NewDeck> = shuffleTheDeck(deck_id);
        return shuffledDeck;
    };

     startGame = async function () {
        const newDeck: NewDeck = await fetchNewDeck();
        setDealerInfo({ ...gameStart, deck_id: newDeck.deck_id });
        return newDeck;
    }

    return (
        <DealerContext.Provider value={{ dealerInfo, setDealerInfo, dealACard, shuffleTheDeck, restartGame, startGame }}>
            {children}
        </DealerContext.Provider>
    );
};