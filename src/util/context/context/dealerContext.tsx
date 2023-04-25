import React, { FC, createContext, useContext, useState, useRef, useEffect } from 'react';
import { fetchNewDeck, takeNewCard, shuffleDeck } from '../contextHelpers/dealing';
import { NewDeck, NewCard, Card, GameStart } from '../contextTypes/contextTypes';
import cardBack from "../../../assets/tableImgs/Cards/CardBack/cardBack.png";
import { useBettingContext, BettingContextValues } from './bettingContext';
import { roundStart } from './bettingContext';

import { pullRandom } from '../../helpers';
import { DeterminingContextValues, useDeterminingContext } from './determiningContext';

const DealerContext = createContext<DealerContextValues | null>(null);

export const useDealerContext = () => {
  const context = useContext(DealerContext) as DealerContextValues;
  if (!context) {
    throw new Error('useDealerContext must be used within a DealerContextProvider');
  }
  return context;
};

let dealCards: (deck_id: string, placement: string) => Promise<void>;
let dealToPlayers: (deck_id: string) => void;
let shuffleTheDeck: (deck_id: string) => Promise<NewDeck>;
let restartGame: (deck_id: string) => Promise<NewDeck>;
let endGame: (deck_id: string) => void;
let startGame: () => Promise<NewDeck>;
let restartRound: (deck_id: string) => void;

export interface DealerContextValues {
  dealerInfo: GameStart;
  setDealerInfo: React.Dispatch<React.SetStateAction<GameStart>>;
  dealCards: (deck_id: string, placement: string) => void;
  dealToPlayers: (deck_id: string) => void;
  shuffleTheDeck: (deck_id: string) => Promise<NewDeck>;
  restartGame: (deck_id: string) => Promise<NewDeck>;
  endGame: (deck_id: string) => void;
  startGame: () => Promise<NewDeck>;
  restartRound: (deck_id: string) => void;
}

export const gameStart: GameStart = {
  deck_id: '',
  button: '',
  gameWinner: '',
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
    const memoRef = useRef<GameStart>(dealerInfo);

    const bettingData: BettingContextValues = useBettingContext();
    const { bettingInfo, setBetInfo } = bettingData;

    // useEffect(() => {
    //   // Add an index signature to the State interface
    //   interface StateWithIndex extends GameStart {
    //     [key: string]: unknown;
    //   }
  
    //   // Compare current state with memoized state
    //   const prevMemo = memoRef.current;
    //   const keys = Object.keys(dealerInfo);
    //   const changes: { [key: string]: { prevValue: unknown, newValue: unknown } } = {};
    //   let hasChanged = false;
    //   for (const key of keys) {
    //     if ((dealerInfo as StateWithIndex)[key] !== (prevMemo as StateWithIndex)[key]) {
    //       changes[key] = { prevValue: (prevMemo as StateWithIndex)[key], newValue: (dealerInfo as StateWithIndex)[key] };
    //       hasChanged = true;
    //     }
    //   }
  
    //   // Log any changes and update memoized state
    //   if (hasChanged) {
    //     console.log('Dealing State:', changes);
    //     memoRef.current = { ...dealerInfo };
    //   }
    //   console.log("Dealer Logged")
    // }, [dealerInfo]);

    dealCards = async function (deck_id, placement) {
      let numCardsToDeal = 1; // default number of cards to deal
    
      // determine the number of cards to deal based on the placement
      if (placement === 'players') {
        numCardsToDeal = 4;
      } else if (placement === 'flop') {
        numCardsToDeal = 3;
      }
    
      let newCard: NewCard = await takeNewCard(deck_id, numCardsToDeal);
  
      if (placement === 'players' || placement === 'burn') {
        const removedCards = newCard.cards.splice(0, 2);
        
        newCard.cards.forEach(card => {
          card.images.blank = cardBack;
        });
        newCard.cards = [...newCard.cards, ...removedCards]
      }
      if (placement === 'players') {
        let jimsHand = [newCard.cards[0], newCard.cards[1]];
        let playerHand = [newCard.cards[2], newCard.cards[3]];
        
        return setDealerInfo({ ...dealerInfo, jimsHand, playerHand });
      } else if (placement === 'flop') {
        return setDealerInfo({ ...dealerInfo, flop: [...newCard.cards] });
      } else if (placement === 'turn') {
        return setDealerInfo({ ...dealerInfo, turn: [...newCard.cards] });
      } else if (placement === 'river') {
        return setDealerInfo({ ...dealerInfo, river: [...newCard.cards] });
      } else if (placement === 'burn') {
        return setDealerInfo({ ...dealerInfo, burn: [...newCard.cards] });
      } else {
        console.log("invalid entry");
      }
    };

    shuffleTheDeck = async function (deck_id) {
      const shuffledDeck: NewDeck = await shuffleDeck(deck_id);
      return shuffledDeck;
    };

    restartGame = async function (deck_id) {
      const button = pullRandom(["player", "jim"]);
      const shuffledDeck: NewDeck = await shuffleTheDeck(deck_id);

      const gameState = { ...gameStart, deck_id: shuffledDeck.deck_id, button, timer: true };
      const roundState = { ...roundStart, playerStack: 3000, jimsStack: 3000, dealPhase: "roundStart" };

      
      setDealerInfo({ ...gameState });
      setBetInfo({ ...roundState });
      
      return shuffledDeck;
    };

    endGame = function (deck_id) {
      setDealerInfo({ ...gameStart, deck_id });
      setBetInfo({ ...roundStart });
    };

    startGame = async function () {
      const newDeck: NewDeck = await fetchNewDeck();

      return restartGame(newDeck.deck_id);
    };

    restartRound = async function (deck_id) {
      const shuffledDeck: NewDeck = await shuffleTheDeck(deck_id);
      const players = ["player", "jim"];
      const button = pullRandom(players);

      setBetInfo({ ...roundStart, playerStack: 3000, jimsStack: 3000, dealPhase: "roundStart" });

      const startRound = { ...gameStart, deck_id, timer: dealerInfo.timer, button };

      setDealerInfo({ ...startRound });
      return shuffledDeck;
    }

    return (
        <DealerContext.Provider value={{ dealerInfo, restartRound, setDealerInfo, dealCards, dealToPlayers, shuffleTheDeck, restartGame, endGame, startGame }}>
            {children}
        </DealerContext.Provider>
    );
};