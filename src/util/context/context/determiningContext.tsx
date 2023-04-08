import React, { FC, createContext, useContext, useEffect } from 'react';

import { Card } from '../contextTypes/contextTypes';
import { getBestPokerHand, checkHighCard } from '../contextHelpers/pokerHands';
import { useBettingContext } from "./bettingContext";
import { useDealerContext } from './dealerContext';

const DeterminingContext = createContext<DeterminingContextValues | null>(null);

export const useDeterminingContext = () => {
  const context = useContext(DeterminingContext) as DeterminingContextValues;
  if (!context) {
    throw new Error('useDeterminingContext must be used within a DeterminingContextProvider');
  }
  return context;
};

let determineByHighCard: (playerHighCard: Card[], jimsHighCard: Card[]) => string;
let compareHands: (playerHighCard: Card[], jimsHighCard: Card[]) => string;
let calculateOdds: (cards: Card[]) => number;
let getRemainingCards: (cards: Card[]) => Card[];
let makeDecision: (cards: Card[]) => void;

export interface DeterminingContextValues {
  determineByHighCard: (playerHighCard: Card[], jimsHighCard: Card[]) => string;
  compareHands: (playerHighCard: Card[], jimsHighCard: Card[]) => string;
  calculateOdds: (cards: Card[]) => number;
  getRemainingCards: (cards: Card[]) => Card[];
  makeDecision: (cards: Card[]) => void;
}

export const DeterminingProvider: FC<any> = ({ children }) => {
  const bettingContextInfo: any = useBettingContext();

  const betInfo = useBettingContext();
  const { bettingInfo } = betInfo;

  const dealInfo = useDealerContext();
  const { dealerInfo } = dealInfo;

  // Make Jim make a move whenever the turn switches to him
  useEffect(() => {
    if (bettingInfo.playerMove === "jim") {
      makeDecision(dealerInfo.jimsHand);
    }
  }, [bettingInfo]);

  determineByHighCard = function (playerHighCard: Card[], jimsHighCard: Card[]): string {
    for (let i = 0; i < playerHighCard.length; i++)
    if (playerHighCard[i].value > jimsHighCard[i].value) return "player";
    else if (playerHighCard[i].value < jimsHighCard[i].value) return "jim";
    
    return "draw";
  };

  // Compare hands to decide a winner
  compareHands = function (playerHand: Card[], jimsHand: Card[]): string {
    const playerHandValue: number = getBestPokerHand(playerHand);
    const playerHighCard: Card[] = checkHighCard(playerHand);
    const jimHandValue: number = getBestPokerHand(jimsHand);
    const jimsHighCard: Card[] = checkHighCard(jimsHand);

    if (playerHandValue === jimHandValue) return determineByHighCard(playerHighCard, jimsHighCard);

    let winner = playerHandValue > jimHandValue? "jim":"player";

    return winner;
  }; 

  // Calculate the odds of winning based on your hand.
  calculateOdds = function (cards: Card[]): number {
    const remainingCards = getRemainingCards(cards);
    let winCount = 0;
    let totalHands = 0;
  
    // Iterate over all possible combinations of remaining cards
    for (let i = 0; i < remainingCards.length - 1; i++) 
      for (let j = i + 1; j < remainingCards.length; j++) {
        const newHand = cards.concat([remainingCards[i], remainingCards[j]]);
        const handStrength = getBestPokerHand(newHand);
        totalHands++;
  
        // If the new hand is stronger than the original hand, increment winCount
        if (handStrength >= getBestPokerHand(cards)) winCount++;
      };
  
    // Calculate and return the odds of winning as a percentage
    return (winCount / totalHands) * 100;
  };

  getRemainingCards = function (cards: Card[]): Card[] {
    const allCards: Card[] = [];
  
    // Generate all possible cards
    for (let i = 2; i <= 14; i++) 
      for (const suit of ["Hearts", "Diamonds", "Clubs", "Spades"]) allCards.push({ suit, value: i.toString() } as Card);
  
    // Remove cards that are already in the hand
    for (const card of cards) {
      const index = allCards.findIndex((c) => c.suit === card.suit && c.value === card.value);
      allCards.splice(index, 1);
    };
  
    return allCards;
  };

  // Make Jim make a decision of whether the check, raise or bet.
  makeDecision = function (cards: Card[]) {
    // calculate odds of winning with current hand as a percentage.
    const { bettingInfo, makeBet, makeRaise, call, fold } = bettingContextInfo;
      const { playerBet, playerRaise, jimsBet } = bettingInfo;
      const odds = calculateOdds(cards);
    
      const playerChecks = playerBet === 0 && playerRaise === 0;
      const playerBets = playerBet > 0 && playerRaise === 0;
      const playerRaises = playerRaise > 0;
      let previousPlayerRaise = 0;
    
      if (playerChecks) {
        if (odds >= 50) makeRaise("jim", bettingInfo.bigBlind);
        else if (odds >= 60) call("jim", 0);
        else if (odds >= 70) makeBet("jim", playerBet * 2);
        else if (odds >= 80) makeBet("jim", playerBet * 5);
        else if (odds >= 90) call("jim", 0);
        else call("jim", 0);

      } else if (playerBets) {
        if (odds >= 50) fold("player");
        else if (odds >= 60 && playerBet + playerRaise <= jimsBet * 2) call("jim", playerBet + playerRaise);
        else if (odds >= 70 && playerBet + playerRaise <= jimsBet * 5) call("jim", playerBet + playerRaise);
        else if (odds >= 80 && playerBet + playerRaise <= jimsBet * 10) call("jim", playerBet + playerRaise);
        else if (odds >= 90 && playerBet + playerRaise <= jimsBet * 2) call("jim", playerBet + playerRaise);
        else call("jim", 0);
        previousPlayerRaise = playerBet;

      } else if (playerRaises) {
        if (odds >= 50) fold("player");
        else if (odds >= 60 && playerBet + playerRaise <= jimsBet * 2) call("jim", playerBet + playerRaise);
        else if (odds >= 70 && playerBet + playerRaise <= jimsBet * 5) call("jim", playerBet + playerRaise);
        else if (odds >= 80 && playerBet + playerRaise <= jimsBet * 10) call("jim", playerBet + playerRaise);
        else if (odds >= 90) makeRaise(playerBet + playerRaise * 2);
        else call("jim", 0);
        previousPlayerRaise = playerRaise;

      } else if (jimsBet === previousPlayerRaise && playerRaise > previousPlayerRaise) {
        if (odds >= 50) fold("player");
        else if (odds >= 60 && playerBet + playerRaise <= jimsBet * 2) call("jim", playerBet + playerRaise);
        else if (odds >= 70 && playerBet + playerRaise <= jimsBet * 5) call("jim", playerBet + playerRaise);
        else if (odds >= 80 && playerBet + playerRaise <= jimsBet * 10) call("jim", playerBet + playerRaise);
        else if (odds >= 90) makeRaise(playerBet + playerRaise * 2);
        else call("jim", 0);
    };
  };
  

  return (
    <DeterminingContext.Provider value={{ determineByHighCard, compareHands, calculateOdds, getRemainingCards, makeDecision }}>
      {children}
    </DeterminingContext.Provider>
  );
};


  






