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
let call: (player: string, check: boolean) => void;
let addToPot: () => void;
let dispersePot: () => void;
let fold: (player: string) => void;
let check: (player: string) => void;

export interface BettingContextValues {
    bettingInfo: RoundStart;
    setBetInfo: React.Dispatch<React.SetStateAction<RoundStart>>;
    setBlind: (blinds: number) => void;
    makeBet: (player: string, bet: number) => void;
    makeRaise: (player: string, raise: number) => void;
    call: (player: string, check: boolean) => void;
    addToPot: () => void;
    dispersePot: () => void;
    fold: (player: string) => void;
    check: (player: string) => void;
}

export const roundStart: RoundStart = {
    potSize: 0,
    buttonImg: button,
    roundWinner: "",
    playerMove: "",
    dealPhase: "",
    betting: false,
    blindsLevel: 0,
    blinds: 0,
    playerBet: 0,
    playerRaise: 0,
    playerStack: 0,
    jimsBet: 0,
    jimsRaise: 0,
    jimsStack: 0,
}

export const BettingProvider: FC<any> = function ({ children }) {
    const [bettingInfo, setBetInfo] = useState<RoundStart>(roundStart);

    // useEffect(() => {
    //     console.log(bettingInfo);
    // }, [bettingInfo])
    
    makeBet = function (player: string, bet: number) {
        
        // A player makes a bet
        if (player === "player") {
            let playerBet = bettingInfo.playerStack <= bet? bettingInfo.playerStack: bet;
            let playerStack = bettingInfo.playerStack - playerBet;

            const changes = { playerBet, playerStack, playerMove: "jim" };
          
            return setBetInfo({ ...bettingInfo, ...changes });
        };
        
        if (player === "jim") {
            let jimsBet = bettingInfo.jimsStack <= bet? bettingInfo.jimsStack: bet;
            let jimsStack = bettingInfo.jimsStack - jimsBet;

            const changes = { jimsBet, jimsStack, playerMove: "player" };
            
            return setBetInfo({ ...bettingInfo, ...changes });
        };
    };
    
    makeRaise = function (player: string, raise: number) {
        // A player raises a bet
        if (player === "player") {
            let totalRaise = raise + bettingInfo.playerBet;
            let playerBet = 0;
            if (totalRaise === bettingInfo.playerStack) {
                return call("player", false);
            }

            let playerRaise = bettingInfo.playerStack <= totalRaise? bettingInfo.playerStack: totalRaise;
            let playerStack = bettingInfo.playerStack - playerRaise;

            const changes = { playerBet, playerRaise, playerStack, playerMove: "jim" };
         
            return setBetInfo({ ...bettingInfo, ...changes });
        };
        
        if (player === "jim") {
            let totalRaise = raise + bettingInfo.jimsBet;
            let jimsBet = 0;
            if (totalRaise === bettingInfo.jimsStack) {
                return call("jim", false);
            }

            let jimsRaise = bettingInfo.jimsStack <= totalRaise? bettingInfo.jimsStack: totalRaise;
            let jimsStack = bettingInfo.jimsStack - jimsRaise;

            const changes = { jimsBet, jimsRaise, jimsStack, playerMove: "player" }
         
            return setBetInfo({ ...bettingInfo, ...changes });
        };
    };
    
    call = function (player: string) {
        // A Player Calls another players bet
        if (player === "player") {
            let jimsBet = bettingInfo.jimsBet + bettingInfo.jimsRaise;

            let playerBet = bettingInfo.playerStack <= jimsBet? bettingInfo.playerStack: jimsBet;
            let playerRaise = 0;
            let playerStack = bettingInfo.playerStack - playerBet;

            const changes = { playerBet, playerRaise, playerStack, playerMove: "jim" };

            return setBetInfo({ ...bettingInfo, ...changes });
        };

        if (player === "jim") {
            let playerBet = bettingInfo.playerBet + bettingInfo.playerRaise;

            let jimsBet = bettingInfo.jimsStack <= playerBet? bettingInfo.jimsStack: playerBet;
            let jimsRaise = 0;
            let jimsStack = bettingInfo.jimsStack - jimsBet;

            const changes = { jimsBet, jimsRaise, jimsStack, playerMove: "player" };

            return setBetInfo({ ...bettingInfo, ...changes });
        };
    };

    check = function (player: string) {
        if (player === "player") setBetInfo({ ...bettingInfo, playerMove: "jim" });
        else setBetInfo({ ...bettingInfo, playerMove: "player" });
    };

    fold = function (player: string) {
        // A player folds their hand
        // Push remaining chips in play to the pot, send those chips to the winner, then reset the round
        addToPot();
        dispersePot();

        const roundStart = { ...bettingInfo, dealPhase: "roundStart", playerMove: "" };
        setBetInfo({ ...roundStart });
    };
    
    addToPot = function () {
        // The dealer commits all bets to the pot
        let potSize: number = bettingInfo.playerBet + bettingInfo.playerRaise + bettingInfo.jimsBet + bettingInfo.jimsRaise;

        const changes = { potSize, playerBet: 0, playerRaise: 0, jimsBet: 0, jimsRaise: 0, betting: false, playerMove: "" };

        setBetInfo({ ...bettingInfo, ...changes });
    };
    
    dispersePot = function () {
        // The dealer disperses the pot to one or both players on a draw
        if (bettingInfo.roundWinner === "draw") {
            let drawings = bettingInfo.potSize / 2;
            return setBetInfo({ ...bettingInfo, playerStack: drawings, jimsStack: drawings });
        };

        if (bettingInfo.roundWinner === "player") return setBetInfo({ ...bettingInfo, playerStack: bettingInfo.potSize });
        if (bettingInfo.roundWinner === "jim") return setBetInfo({ ...bettingInfo, jimsStack: bettingInfo.potSize });

        setBetInfo({ ...bettingInfo, potSize: 0 });
    };


    return (
      <BettingContext.Provider value={{ bettingInfo, setBetInfo, setBlind, makeBet, makeRaise, call, addToPot, dispersePot, fold, check }}>
        {children}
      </BettingContext.Provider>
    );
};


