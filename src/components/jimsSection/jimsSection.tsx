import { FC } from 'react';
import { useDealerContext, DealerContextValues } from '../../util/context/context/dealerContext';
import { Timer } from '../tableSection/Timer';

export const JimsSection: FC = () => {
    const dealersInfo: DealerContextValues = useDealerContext();
    const { dealerInfo, setDealerInfo, dealACard, shuffleTheDeck, restartGame, startGame } = dealersInfo;

    return (
        <section id='jimsSection' className='bg-gray-200 h-3/10'>
            <section className='flex justify-between'>
                <Timer />
                <div className='bg-white'>
                    {dealerInfo.deck_id? (
                        <h3 onClick={() => restartGame(dealerInfo.deck_id)} className='font-bold p-2'>Restart Game</h3>
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