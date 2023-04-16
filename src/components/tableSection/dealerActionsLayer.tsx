import React, { useRef } from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; 
import { useBettingContext } from '../../util/context/context/bettingContext';
import { useDealerContext } from '../../util/context/context/dealerContext';

export const DealerActions: React.FC = function () {
    const nodeRef = React.useRef(null);

    const bettingData = useBettingContext();
    const { setBetInfo, makeBet, bettingInfo } = bettingData;
    const { dealPhase, blinds, betting } = bettingInfo;

    const { dealerInfo } = useDealerContext();
    const { playerHand, flop, turn, river, button } = dealerInfo;

    const startRound = (dealPhase: string) => {
        const players = ["player", "jim"];
        const playerMove = button === players[0]? players[1]: players[0];
        setBetInfo({ ...bettingInfo, dealPhase, playerMove, betting: false });
    };

    const initialBetting = (dealPhase: string) => {
        let playerBet: number = 0;
        let jimsBet: number = 0;
        if (button === "jim") {
            jimsBet = blinds;
            playerBet = blinds/2;
        } else if (button === "player") {
            jimsBet = blinds/2;
            playerBet = blinds;
        };

        setBetInfo({ ...bettingInfo, dealPhase, playerBet, jimsBet, betting: true });
    }

    return (
        <div className="flex justify-center z-10 font-bold">
            <div>
                <DraggableCore>
                    <Draggable nodeRef={nodeRef}>
                        <div className='hover:cursor-move flex flex-col items-center' ref={nodeRef}>
                            {dealPhase === "playerPhase" && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => initialBetting("betting")}>Start Betting</button>
                                </>
                            )}
                            {dealPhase === "flop" && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "betting", betting: true })}>Start Betting</button>
                                </>
                            )}
                            {dealPhase === "turn" && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "betting", betting: true })}>Start Betting</button>
                                </>
                            )}
                            {dealPhase === "river" && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "roundStart", betting: true })}>Start Betting</button>
                                </>
                            )}

                            
                            {dealPhase === "roundStart" && river.length === 0 && !betting && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => startRound("playerPhase")}>Deal Cards</button>
                                </>
                            )}
                            {dealPhase === "betting" && playerHand.length > 0 && !betting && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "flop", betting: false })}>Deal Flop</button>
                                </>
                            )}
                            {dealPhase === "betting" && flop.length > 0 && !betting && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "turn", betting: false })}>Deal Turn</button>
                                </>
                            )}
                            {dealPhase === "betting" && turn.length > 0 && !betting && (
                                <>
                                    <div>{"<<>>"}</div>
                                    <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "river", betting: false })}>Deal River</button>
                                </>
                            )}
                        </div>
                    </Draggable>
                </DraggableCore>
            </div>
        </div>
    );
};