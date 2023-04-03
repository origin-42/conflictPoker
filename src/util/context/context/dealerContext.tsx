import React, { FC, createContext, useContext, useState, useEffect } from 'react';
import { fetchNewDeck, takeNewCard, shuffleDeck } from '../contextHelpers/dealing';
import { NewDeck, NewCard, Card, GameStart } from '../contextTypes/contextTypes';
import cardBack from "../../../assets/tableImgs/Cards/CardBack/cardBack.png";
import { useBettingContext, BettingContextValues } from './bettingContext';
import { roundStart } from './bettingContext';

import { pullRandom } from '../../helpers';

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
let endGame: (deck_id: string) => void;
let startGame: () => Promise<NewDeck>;

export interface DealerContextValues {
  dealerInfo: GameStart;
  setDealerInfo: React.Dispatch<React.SetStateAction<GameStart>>;
  dealACard: (deck_id: string, placement: string) => void;
  shuffleTheDeck: (deck_id: string) => Promise<NewDeck>;
  restartGame: (deck_id: string) => Promise<NewDeck>;
  endGame: (deck_id: string) => void;
  startGame: () => Promise<NewDeck>;
}

const gameStart: GameStart = {
  deck_id: '',
  playerTurn: '',
  timer: false,
  flop: [] as Card[],
  turn: [] as Card[],
  river: [] as Card[],
  burn: [] as Card[],
  playerHand: [] as Card[],
  jimsHand: [] as Card[],
};

export const DealerProvider: FC<any> = ({ children }) => {
    const [dealerInfo, setDealerInfo] = useState<GameStart>(gameStart);

    const bettingData: BettingContextValues = useBettingContext();
    const { bettingInfo, setBetInfo } = bettingData;

    dealACard = async function (deck_id, placement) {
      const newCard: NewCard = await takeNewCard(deck_id);
      if (placement === 'jim' || placement === 'burn') newCard.cards[0].images.blank = cardBack;

      if (placement === 'jim') return setDealerInfo({ ...dealerInfo, jimsHand: [...dealerInfo.jimsHand, ...newCard.cards] });
      if (placement === 'player') return setDealerInfo({ ...dealerInfo, playerHand: [...dealerInfo.playerHand, ...newCard.cards] });
      if (placement === 'flop') return setDealerInfo({ ...dealerInfo, flop: [...dealerInfo.flop, ...newCard.cards] });
      if (placement === 'turn') return setDealerInfo({ ...dealerInfo, turn: [...newCard.cards] });
      if (placement === 'river') return setDealerInfo({ ...dealerInfo, river: [...newCard.cards] });
      if (placement === 'burn') return setDealerInfo({ ...dealerInfo, burn: [...newCard.cards] });
    };

    useEffect(() => {
      console.log(dealerInfo)
    }, [dealerInfo])

    shuffleTheDeck = async function (deck_id) {
      const shuffledDeck: NewDeck = await shuffleDeck(deck_id);
      return shuffledDeck;
    };

    restartGame = function (deck_id) {
      const playerTurn = pullRandom(["player", "jim"]);
      const shuffledDeck: Promise<NewDeck> = shuffleTheDeck(deck_id);

      setDealerInfo({ ...gameStart, playerTurn, deck_id, timer: true });
      setBetInfo({ ...bettingInfo, playerStack: 3000, jimsStack: 3000 });
      
      return shuffledDeck;
    };

    endGame = function (deck_id) {
      setDealerInfo({ ...gameStart, deck_id });
      setBetInfo({ ...roundStart });
    };

    startGame = async function () {
      const newDeck: NewDeck = await fetchNewDeck();
      const playerTurn = pullRandom(["player", "jim"]);
      const startGame = { ...gameStart, deck_id: newDeck.deck_id, playerTurn, timer: true };

      setBetInfo({ ...bettingInfo, playerStack: 3000, jimsStack: 3000 });
      setDealerInfo({ ...startGame });
      return newDeck;
    };

    return (
        <DealerContext.Provider value={{ dealerInfo, setDealerInfo, dealACard, shuffleTheDeck, restartGame, endGame, startGame }}>
            {children}
        </DealerContext.Provider>
    );
};