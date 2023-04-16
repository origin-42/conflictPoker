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
let compareHands: (playerHighCard: Card[], jimsHighCard: Card[]) => void;
let calculateOdds: (cards: Card[]) => number;
let getRemainingCards: (cards: Card[]) => Card[];
let makeDecision: (cards: Card[]) => void;

export interface DeterminingContextValues {
  determineByHighCard: (playerHighCard: Card[], jimsHighCard: Card[]) => string;
  compareHands: (playerHighCard: Card[], jimsHighCard: Card[]) => void;
  calculateOdds: (cards: Card[]) => number;
  getRemainingCards: (cards: Card[]) => Card[];
  makeDecision: (cards: Card[]) => void;
}

export const DeterminingProvider: FC<any> = ({ children }) => {
  const bettingContextInfo: any = useBettingContext();
  const { bettingInfo, setBetInfo, makeRaise, makeBet, call, check, fold } = bettingContextInfo;

  const dealInfo = useDealerContext();
  const { dealerInfo } = dealInfo;

  // Make Jim make a move whenever the turn switches to him
  useEffect(() => {
    if (bettingInfo.playerMove === "jim" && bettingInfo.dealPhase === "betting") {
      setTimeout(() => {
        makeDecision(dealerInfo.jimsHand);
      }, 1000);
    }
  }, [bettingInfo]);

  determineByHighCard = function (playerHighCard: Card[], jimsHighCard: Card[]): string {
    for (let i = 0; i < playerHighCard.length; i++)
    if (playerHighCard[i].value > jimsHighCard[i].value) return "player";
    else if (playerHighCard[i].value < jimsHighCard[i].value) return "jim";
    
    return "draw";
  };

  // Compare hands to decide a winner
  compareHands = function () {
    const playerHandValue: number = getBestPokerHand(dealerInfo.playerHand);
    const playerHighCard: Card[] = checkHighCard(dealerInfo.playerHand);
    const jimHandValue: number = getBestPokerHand(dealerInfo.jimsHand);
    const jimsHighCard: Card[] = checkHighCard(dealerInfo.jimsHand);

    if (playerHandValue === jimHandValue) return determineByHighCard(playerHighCard, jimsHighCard);

    let roundWinner = playerHandValue > jimHandValue? "jim":"player";

    setBetInfo({ ...bettingInfo, roundWinner });
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
      console.log("JIMS MAKIN A MOVE")
      // calculate odds of winning with current hand as a percentage.
      const { playerBet, playerRaise, jimsBet, jimsRaise, potSize, blinds } = bettingInfo;
      const odds = calculateOdds(cards);

      const firstToAct = playerBet + playerRaise === 0 && !jimsRaise && !jimsBet || playerBet + playerRaise === blinds;
      const playerChecks = playerBet + playerRaise === 0;
      const preFLop = !potSize;
      const playerBets = playerBet > 0;
      const playerRaises = playerRaise > 0;
      let previousPlayerRaise = 0;
    
      if (firstToAct) {
        if (preFLop) { 
          if (odds >= 50) makeRaise("jim", bettingInfo.blinds + jimsBet);
          else if (odds >= 60) check("jim"); 
          else if (odds >= 70) makeRaise("jim", playerBet * 2);
          else if (odds >= 80) makeRaise("jim", playerBet * 5);
          else if (odds >= 90) check("jim"); 
          else check("jim"); 

        } else {
          if (odds >= 50) makeBet("jim", bettingInfo.blinds + playerBet);
          else if (odds >= 60) call("jim"); 
          else if (odds >= 70) makeBet("jim", playerBet * 2);
          else if (odds >= 80) makeBet("jim", playerBet * 5);
          else if (odds >= 90) call("jim"); 
          else call("jim"); 
        };

        return;
      }
      
      if (playerChecks) { 
        if (preFLop) {
          if (odds >= 50) makeRaise("jim", bettingInfo.blinds + jimsBet);
          else if (odds >= 60) check("jim"); 
          else if (odds >= 70) makeRaise("jim", playerBet * 2);
          else if (odds >= 80) makeRaise("jim", playerBet * 5);
          else if (odds >= 90) check("jim"); 
          else check("jim"); 

        } else {
          if (odds >= 50) makeBet("jim", bettingInfo.blinds + playerBet);
          else if (odds >= 60) call("jim"); 
          else if (odds >= 70) makeBet("jim", playerBet * 2);
          else if (odds >= 80) makeBet("jim", playerBet * 5);
          else if (odds >= 90) call("jim"); 
          else call("jim"); 
        };

      } else if (playerBets) {
        if (playerBet === jimsBet + jimsRaise) {


        } else {
          if (odds >= 50) fold("player");
          else if (odds >= 60 && playerBet + playerRaise <= jimsBet * 2) call("jim");
          else if (odds >= 70 && playerBet + playerRaise <= jimsBet * 5) call("jim");
          else if (odds >= 80 && playerBet + playerRaise <= jimsBet * 10) call("jim");
          else if (odds >= 90 && playerBet + playerRaise <= jimsBet * 2) call("jim");
          else call("jim");
          previousPlayerRaise = playerBet;
        }

      } else if (playerRaises) {
        if (odds >= 50) fold("player");
        else if (odds >= 60 && playerBet + playerRaise <= jimsBet * 2) call("jim");
        else if (odds >= 70 && playerBet + playerRaise <= jimsBet * 5) call("jim");
        else if (odds >= 80 && playerBet + playerRaise <= jimsBet * 10) call("jim");
        else if (odds >= 90) makeRaise(playerBet + playerRaise * 2);
        else call("jim");
        previousPlayerRaise = playerRaise;

      } else if (jimsBet === previousPlayerRaise && playerRaise > previousPlayerRaise) {
        if (odds >= 50) fold("player");
        else if (odds >= 60 && playerBet + playerRaise <= jimsBet * 2) call("jim");
        else if (odds >= 70 && playerBet + playerRaise <= jimsBet * 5) call("jim");
        else if (odds >= 80 && playerBet + playerRaise <= jimsBet * 10) call("jim");
        else if (odds >= 90) makeRaise(playerBet + playerRaise * 2);
        else call("jim");
    };
    
  };
  

  return (
    <DeterminingContext.Provider value={{ determineByHighCard, compareHands, calculateOdds, getRemainingCards, makeDecision }}>
      {children}
    </DeterminingContext.Provider>
  );
};


  






