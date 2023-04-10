import React, { FC, createContext, useContext, useState, useEffect } from 'react';
import { RoundStart } from '../contextTypes/contextTypes';
import button from "../../../assets/tableImgs/button.png";

const BettingContext = createContext<BettingContextValues | null>(null);

export const useBettingContext = () => {
    const context = useContext(BettingContext) as BettingContextValues;
    if (!context) {
      throw new Error('useBettingContext must be used within a BettingContextProvider');
    }
    return context;
};

export let setBlind: (blinds: number) => void;
let makeBet: (player: string, bet: number) => void;
let makeRaise: (player: string, raise: number) => void;
let call: (player: string) => void;
let addToPot: () => void;
let dispersePot: (winner: string) => void;
let fold: (winner: string) => void;

export interface BettingContextValues {
    bettingInfo: RoundStart;
    setBetInfo: React.Dispatch<React.SetStateAction<RoundStart>>;
    setBlind: (blinds: number) => void;
    makeBet: (player: string, bet: number) => void;
    makeRaise: (player: string, raise: number) => void;
    call: (player: string) => void;
    addToPot: () => void;
    dispersePot: (winner: string) => void;
    fold: (winner: string) => void;
}

export const roundStart: RoundStart = {
    potSize: 0,
    buttonImg: button,
    playerMove: "",
    dealPhase: "",
    blindsLevel: 0,
    blinds: 0,
    interval: 0,
    playerBet: 0,
    playerRaise: 0,
    playerStack: 0,
    jimsBet: 0,
    jimsRaise: 0,
    jimsStack: 0,
}

export const BettingProvider: FC<any> = function ({ children }) {
    const [bettingInfo, setBetInfo] = useState<RoundStart>(roundStart);

    useEffect(() => {
        console.log(bettingInfo)
    }, [bettingInfo])
    
    makeBet = function (player: string, bet: number) {
        
        // A player makes a bet
        if (player === "player") {
            let allInOrBet = bettingInfo.playerStack <= bet? bettingInfo.playerStack: bet;
            const playerBet = bettingInfo.playerBet + allInOrBet;
            
            if (bettingInfo.playerStack <= bet) return setBetInfo({ ...bettingInfo, playerStack: 0, playerMove: "jim" });
            else return setBetInfo({ ...bettingInfo, playerBet, playerMove: "jim" });
        };
        
        if (player === "jim") {
            let allInOrBet = bettingInfo.jimsStack <= bet? bettingInfo.jimsStack: bet;
            const jimsBet = bettingInfo.jimsBet + allInOrBet;
            
            if (bettingInfo.jimsStack <= bet) return setBetInfo({ ...bettingInfo, jimsStack: 0, playerMove: "player" });
            else return setBetInfo({ ...bettingInfo, jimsBet, playerMove: "player" });
        };
    };
    
    makeRaise = function (player: string, raise: number) {
        // A player raises a bet
        if (player === "player") {
            let allInOrRaise = bettingInfo.playerStack <= raise? bettingInfo.playerStack: raise;
            let playerRaise = bettingInfo.playerBet + allInOrRaise;
            
            if (bettingInfo.jimsStack <= raise) return setBetInfo({ ...bettingInfo, playerStack: 0, playerMove: "jim" });
            else return setBetInfo({ ...bettingInfo, playerRaise, playerBet: 0, playerMove: "jim" });
        };
        
        if (player === "jim") {
            let allInOrRaise = bettingInfo.jimsStack <= raise? bettingInfo.jimsStack: raise;
            let jimsRaise = bettingInfo.jimsBet + allInOrRaise;
            
            if (bettingInfo.jimsStack <= raise) return setBetInfo({ ...bettingInfo, jimsStack: 0, playerMove: "player" });
            else setBetInfo({ ...bettingInfo, jimsRaise, jimsBet: 0, playerMove: "player" });
        };
    };
    
    call = function (player: string) {
        // A Player Calls another players bet
        if (player === "player") {
            let playerTotalStack = bettingInfo.playerStack + bettingInfo.playerBet + bettingInfo.playerRaise;
            let jimsTotalStack = bettingInfo.jimsStack + bettingInfo.jimsBet + bettingInfo.jimsRaise;
            let isAllIn = playerTotalStack <= jimsTotalStack;

            let call = isAllIn? playerTotalStack: bettingInfo.jimsRaise + bettingInfo.jimsBet;
            
            if (isAllIn) return setBetInfo({ ...bettingInfo, playerStack: 0, playerMove: "jim" });
            else return setBetInfo({ ...bettingInfo, playerBet: call | call, playerRaise: 0, playerMove: "jim" });
        };
        
        if (player === "jim") {
            let playerTotalStack = bettingInfo.playerStack + bettingInfo.playerBet + bettingInfo.playerRaise;
            let jimsTotalStack = bettingInfo.jimsStack + bettingInfo.jimsBet + bettingInfo.jimsRaise;
            let isAllIn = jimsTotalStack <= playerTotalStack;

            let call = isAllIn? jimsTotalStack: bettingInfo.playerRaise + bettingInfo.playerBet;
            
            if (isAllIn) return setBetInfo({ ...bettingInfo, jimsStack: 0, playerMove: "player" });
            else setBetInfo({ ...bettingInfo, jimsBet: call, jimsRaise: 0, playerMove: "player" });
        };
    };
    
    addToPot = function () {
        // The dealer commits all bets to the pot
        let totalPot: number = bettingInfo.playerBet + bettingInfo.playerRaise + bettingInfo.jimsBet + bettingInfo.jimsRaise;
        let playerStack: number = bettingInfo.playerStack - (bettingInfo.playerBet + bettingInfo.playerRaise);
        let jimsStack: number = bettingInfo.jimsStack - (bettingInfo.jimsBet + bettingInfo.jimsRaise);
        setBetInfo({ ...bettingInfo, potSize: totalPot, playerBet: 0, playerRaise: 0, jimsBet: 0, jimsRaise: 0, playerStack, jimsStack });
    };
    
    dispersePot = function (winner) {
        // The dealer disperses the pot to one or both players on a draw
        if (winner === "draw") {
            let drawings = bettingInfo.potSize / 2;
            return setBetInfo({ ...bettingInfo, playerStack: drawings, jimsStack: drawings });
        };

        if (winner === "player") return setBetInfo({ ...bettingInfo, playerStack: bettingInfo.potSize });
        if (winner === "jim") return setBetInfo({ ...bettingInfo, jimsStack: bettingInfo.potSize });

        setBetInfo({ ...bettingInfo, potSize: 0 });
    };
    
    fold = function (winner: string) {
        // A player folds their hand
        addToPot();
        dispersePot(winner);
    };

    return (
      <BettingContext.Provider value={{ bettingInfo, setBetInfo, setBlind, makeBet, makeRaise, call, addToPot, dispersePot, fold }}>
        {children}
      </BettingContext.Provider>
    );
};


