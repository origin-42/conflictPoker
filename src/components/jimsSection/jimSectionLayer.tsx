import { FC, useEffect } from 'react';
import { BettingContextValues, useBettingContext } from '../../util/context/context/bettingContext';
import { useDealerContext, DealerContextValues } from '../../util/context/context/dealerContext';
import { Timer } from '../tableSection/Timer';

export const JimsSectionLayer: FC = () => {
    const dealersInfo: DealerContextValues = useDealerContext();
    const { dealerInfo, dealCards, restartGame, endGame, startGame } = dealersInfo;

    const betInfo: BettingContextValues = useBettingContext();
    const { bettingInfo, setBetInfo } = betInfo;

    // Rotate phases
    useEffect(() => {
        if (bettingInfo.dealPhase === "playerPhase") dealCards(dealerInfo.deck_id, "players");
        else if (bettingInfo.dealPhase === "flop") dealCards(dealerInfo.deck_id, "flop");
        else if (bettingInfo.dealPhase === "turn") dealCards(dealerInfo.deck_id, "turn");
        else if (bettingInfo.dealPhase === "river") dealCards(dealerInfo.deck_id, "river");
    }, [bettingInfo.dealPhase])

    let gameCycle;
    dealerInfo.timer? 
    gameCycle = <h3 onClick={() => endGame(dealerInfo.deck_id)} className='font-bold p-2'>End Game</h3>:
    gameCycle = <h3 onClick={() => restartGame(dealerInfo.deck_id)} className='font-bold p-2'>Restart Game</h3>

    return (
        <section className='absolute h-full w-full flex flex-col justify-between'>
            <section className='flex justify-between'>
                <Timer />
                <div className='bg-white'>
                    {dealerInfo.deck_id? (
                        gameCycle
                    ): (
                        <h3 onClick={() => startGame()} className='font-bold p-2'>Start Game</h3>
                    )}
                </div>
            </section>
            <section>
                
            </section>
        </section>
    );
};