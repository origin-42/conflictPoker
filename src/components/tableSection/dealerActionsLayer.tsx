import React, { useRef } from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; 
import { useBettingContext } from '../../util/context/context/bettingContext';
import { useDealerContext } from '../../util/context/context/dealerContext';

export const DealerActions: React.FC = function () {
    const nodeRef = React.useRef(null);

    const bettingData = useBettingContext();
    const { setBetInfo, bettingInfo } = bettingData;
    const { dealPhase } = bettingInfo;

    const { dealerInfo } = useDealerContext();
    const { playerHand, flop, turn, river } = dealerInfo;


    return (
        <div className="flex justify-center z-10 font-bold">
            <div>
                <DraggableCore>
                    <Draggable nodeRef={nodeRef}>
                        <div className='hover:cursor-move flex flex-col items-center' ref={nodeRef}>
                            {dealPhase && <div>{"<<>>"}</div>}
                            {dealPhase === "playerPhase" && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "betting" })}>Start Betting</button>}
                            {dealPhase === "flop" && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "betting" })}>Start Betting</button>}
                            {dealPhase === "turn" && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "betting" })}>Start Betting</button>}
                            {dealPhase === "river" && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "roundStart" })}>Start Betting</button>}

                            {dealPhase === "roundStart" && river.length === 0 && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "playerPhase" })}>Deal Cards</button>}
                            {dealPhase === "betting" && playerHand.length > 0 && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "flop" })}>Deal Flop</button>}
                            {dealPhase === "betting" && flop.length > 0 && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "turn" })}>Deal Turn</button>}
                            {dealPhase === "betting" && turn.length > 0 && <button className='hover:cursor-pointer' onClick={() => setBetInfo({ ...bettingInfo, dealPhase: "river" })}>Deal River</button>}
                        </div>
                    </Draggable>
                </DraggableCore>
            </div>
        </div>
    );
};