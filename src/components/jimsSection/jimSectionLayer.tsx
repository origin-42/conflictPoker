import { FC, useEffect } from 'react';
import { useDealerContext, DealerContextValues } from '../../util/context/context/dealerContext';
import { Timer } from '../tableSection/Timer';

export const JimsSectionLayer: FC = () => {
    const dealersInfo: DealerContextValues = useDealerContext();
    const { dealerInfo, dealACard, restartGame, endGame, startGame } = dealersInfo;

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
                <div className='flex flex-col items-start font-bold text-white'>
                    <button className='hover:text-white' onClick={() => dealACard("f1wqxop85g4i", "jim")}>Deal a Card</button>
                </div>
            </section>
        </section>
    );
};