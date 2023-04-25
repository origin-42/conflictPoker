import React, { FC, createContext, useContext, useEffect, useState } from 'react';

import { Card, PlayerAction } from '../contextTypes/contextTypes';
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
let compareHands: () => void;
let calculateOdds: (cards: Card[]) => number;
let getRemainingCards: (cards: Card[]) => Card[];
let makeDecision: (cards: Card[]) => void;

export interface DeterminingContextValues {
  determineByHighCard: (playerHighCard: Card[], jimsHighCard: Card[]) => string;
  compareHands: () => void;
  calculateOdds: (cards: Card[]) => number;
  getRemainingCards: (cards: Card[]) => Card[];
  makeDecision: (cards: Card[]) => void;
}

export const DeterminingProvider: FC<any> = ({ children }) => {

  const bettingContextInfo: any = useBettingContext();
  const { bettingInfo, setBetInfo, makeRaise, makeBet, call, check, fold, addToPot, playerActions, river } = bettingContextInfo;
  const { playerBet, playerRaise, playerStack, jimsBet, jimsRaise, jimsStack, blinds, potSize } = bettingInfo;

  const { dealerInfo, setDealerInfo } = useDealerContext();
  const { flop } = dealerInfo;

  // Make Jim make a move whenever the turn switches to him
  useEffect(() => {
    if (bettingInfo.playerMove === "jim" && bettingInfo.dealPhase === "betting") {
      console.log("JIMS MAKIN A MOVE")
      setTimeout(() => {
        makeDecision(dealerInfo.jimsHand);
      }, 1000);
    }
  }, [bettingInfo.dealPhase, bettingInfo.playerMove]);

  // Determine a round winner
  useEffect(() => {
    const playerFolded = playerActions.filter((player: PlayerAction) => player.action === "fold");
    
    if (!!playerFolded) {
      let roundWinner =  playerFolded.player === "jim"?"player":"jim";
      console.log(`${playerFolded.player} folded`);
      setBetInfo({ ...bettingInfo, roundWinner });
      return;
    };

    if (!!river[1]) {
      const playerCalled = playerActions.filter((player: PlayerAction) => player.action === "call");
      const bothChecked = playerActions.filter((player: PlayerAction) => player.action === "check");
      const betCalled = playerCalled && playerBet > 0 || playerCalled && jimsBet > 0;
      const raiseCalled = playerCalled && playerRaise > 0 || playerCalled && jimsRaise > 0;
      const allInCalled = betCalled && playerStack === 0 || betCalled && jimsStack === 0;

      if (allInCalled) compareHands();
      else if (!!bothChecked) compareHands();
      else if (betCalled) compareHands();
      else if (raiseCalled) compareHands();
      else return;
    };
    
  }, [playerActions]);

  // Determine game winner
  useEffect(() => {
    if (potSize === 0) {
      if (playerBet+playerRaise+playerStack === 0) setDealerInfo({ ...dealerInfo, gameWinner: "jim" });
      if (jimsBet+jimsRaise+jimsStack === 0) setDealerInfo({ ...dealerInfo, gameWinner: "player" });
    };
  }, [playerStack, jimsStack]);
  

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
      
      // calculate odds of winning with current hand as a percentage.
      const odds = calculateOdds(cards);

      let currentBlinds = blinds;
      const firstToAct: boolean = playerBet + playerRaise === 0 && !jimsRaise && !jimsBet || playerBet + playerRaise === blinds;
      const playerChecks: boolean = playerActions.every((player: PlayerAction) => player.player === "player" && player.action === "check");
      const preFLop: boolean = !flop[0];
      const playerBets: boolean = playerBet > 0;
      const playerRaises: boolean = playerRaise > 0;
      const playerCalls: boolean = playerBet === jimsBet + jimsRaise;
      let previousPlayerRaise = 0;

      if (playerCalls && playerBet !== currentBlinds) {
        console.log("Player calls bet or raise")
        return addToPot();
      };

      if (firstToAct) {
        if (preFLop) { 
          console.log("PreFlop")
          if (odds >= 50) makeRaise("jim", bettingInfo.blinds + jimsBet);
          else if (odds >= 60) check("jim"); 
          else if (odds >= 70) makeRaise("jim", playerBet * 2);
          else if (odds >= 80) makeRaise("jim", playerBet * 5);
          else if (odds >= 90) check("jim"); 
          else check("jim"); 

        } else {
          console.log("Not PreFlop")
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
        console.log("Player Checks")
        if (preFLop) {
          console.log("PreFlop")
          if (odds >= 50) makeRaise("jim", bettingInfo.blinds + jimsBet);
          else if (odds >= 60) check("jim"); 
          else if (odds >= 70) makeRaise("jim", playerBet * 2);
          else if (odds >= 80) makeRaise("jim", playerBet * 5);
          else if (odds >= 90) check("jim"); 
          else check("jim"); 

        } else {
          console.log("Not Pre Flop")
          if (odds >= 50) makeBet("jim", bettingInfo.blinds + playerBet);
          else if (odds >= 60) call("jim"); 
          else if (odds >= 70) makeBet("jim", playerBet * 2);
          else if (odds >= 80) makeBet("jim", playerBet * 5);
          else if (odds >= 90) call("jim"); 
          else call("jim"); 
        };

      } else if (playerBets) {
        console.log("Player Bets")
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
        console.log("Player Raises")
        if (odds >= 50) fold("player");
        else if (odds >= 60 && playerBet + playerRaise <= jimsBet * 2) call("jim");
        else if (odds >= 70 && playerBet + playerRaise <= jimsBet * 5) call("jim");
        else if (odds >= 80 && playerBet + playerRaise <= jimsBet * 10) call("jim");
        else if (odds >= 90) makeRaise(playerBet + playerRaise * 2);
        else call("jim");
        previousPlayerRaise = playerRaise;

      } else if (jimsBet === previousPlayerRaise && playerRaise > previousPlayerRaise) {
        console.log("Player reraises")
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


  






