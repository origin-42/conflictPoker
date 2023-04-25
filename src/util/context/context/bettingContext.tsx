import React, { FC, createContext, useContext, useState, useEffect, useRef } from 'react';
import { RoundStart, PlayerAction } from '../contextTypes/contextTypes';
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
let check: () => void;

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
    check: () => void;
}

const playerActions: PlayerAction[] = [];

export const roundStart: RoundStart = {
  potSize: 0,
  buttonImg: button,
  roundWinner: "",
  playerMove: "",
  playerActions: playerActions,
  action: "",
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
};

export const BettingProvider: FC<any> = function ({ children }) {
    const [bettingInfo, setBetInfo] = useState<RoundStart>(roundStart);
    const memoRef = useRef<RoundStart>(bettingInfo);

    // Assign actions
    useEffect(() => {
        let playerMove = "";
        if (bettingInfo.playerMove === "jim") {
            playerMove = "player";
        } else if (bettingInfo.playerMove === "player") {
            playerMove = "jim";
        }
    
        const updatedPlayerActions = bettingInfo.playerActions.map(playerAction => {
            if (playerAction.player === bettingInfo.playerMove) {
                return { ...playerAction, action: bettingInfo.action };
            }
            return playerAction;
        });
    
        setBetInfo({ 
            ...bettingInfo, 
            playerMove,
            playerActions: updatedPlayerActions
        });
    }, [bettingInfo.action]);
    

    // useEffect(() => {
    //     // Add an index signature to the State interface
    //     interface StateWithIndex extends RoundStart {
    //       [key: string]: unknown;
    //     }
    
    //     // Compare current state with memoized state
    //     const prevMemo = memoRef.current;
    //     const keys = Object.keys(bettingInfo);
    //     const changes: { [key: string]: { prevValue: unknown, newValue: unknown } } = {};
    //     let hasChanged = false;
    //     for (const key of keys) {
    //       if ((bettingInfo as StateWithIndex)[key] !== (prevMemo as StateWithIndex)[key]) {
    //         changes[key] = { prevValue: (prevMemo as StateWithIndex)[key], newValue: (bettingInfo as StateWithIndex)[key] };
    //         hasChanged = true;
    //       }
    //     }
    
    //     // Log any changes and update memoized state
    //     if (hasChanged) {
    //       console.log('Betting State:', changes);
    //       memoRef.current = { ...bettingInfo };
    //     }
    //     console.log("Betting Logged")
    // }, [bettingInfo]);
    
    makeBet = function (player: string, bet: number) {
        
        // A player makes a bet
        if (player === "player") {
            let playerBet = bettingInfo.playerStack <= bet? bettingInfo.playerStack: bet;
            let playerStack = bettingInfo.playerStack - playerBet;

            const changes = { playerBet, playerStack, action: "bet" };
          
            return setBetInfo({ ...bettingInfo, ...changes });
        };
        
        if (player === "jim") {
            let jimsBet = bettingInfo.jimsStack <= bet? bettingInfo.jimsStack: bet;
            let jimsStack = bettingInfo.jimsStack - jimsBet;

            const changes = { jimsBet, jimsStack, action: "bet" };
            
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

            const changes = { playerBet, playerRaise, playerStack, action: "raise" };
         
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

            const changes = { jimsBet, jimsRaise, jimsStack, action: "raise" }
         
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
        
            const changes = { playerBet, playerRaise, playerStack, action: "call" };

            return setBetInfo({ ...bettingInfo, ...changes });
        };

        if (player === "jim") {
            let playerBet = bettingInfo.playerBet + bettingInfo.playerRaise;

            let jimsBet = bettingInfo.jimsStack <= playerBet? bettingInfo.jimsStack: playerBet;
            let jimsRaise = 0;
            let jimsStack = bettingInfo.jimsStack - jimsBet;

            const changes = { jimsBet, jimsRaise, jimsStack, action: "call" };

            return setBetInfo({ ...bettingInfo, ...changes });
        };
    };

    check = function () {
        setBetInfo({ ...bettingInfo, action: "check" });
    };

    fold = function (player: string) {
        // A player folds their hand
        // Push remaining chips in play to the pot, send those chips to the winner, then reset the round
        addToPot();
        dispersePot();
   
        const roundStart = { ...bettingInfo, dealPhase: "roundStart", action: "fold" };
        setBetInfo({ ...roundStart });
    };
    
    addToPot = function () {
        // The dealer commits all bets to the pot
        let potSize: number = bettingInfo.playerBet + bettingInfo.playerRaise + bettingInfo.jimsBet + bettingInfo.jimsRaise;

        const changes = { potSize, playerBet: 0, playerRaise: 0, jimsBet: 0, jimsRaise: 0, betting: false };

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


