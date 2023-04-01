import { FC } from 'react';
import { useDealerContext, DealerContextValues } from '../../util/context/context/dealerContext';
import { Timer } from '../tableSection/Timer';

export const JimsSectionLayer: FC = () => {
    const dealersInfo: DealerContextValues = useDealerContext();
    const { dealerInfo, setDealerInfo, dealACard, shuffleTheDeck, restartGame, startGame } = dealersInfo;

    return (
        <section className='absolute h-full w-full flex flex-col justify-between'>
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
                <div className='flex flex-col items-start font-bold text-white'>
                    <button className='hover:text-white' onClick={() => dealACard("f1wqxop85g4i", "player")}>Deal a Card</button>
                    <button className='hover:text-white' onClick={() => shuffleTheDeck("f1wqxop85g4i")}>Shuffle</button>
                    <button className='hover:text-white' onClick={() => startGame()}>Start Game</button>
                    <button className='hover:text-white' onClick={() => restartGame("f1wqxop85g4i")}>Restart Game</button>
                </div>
            </section>
        </section>
    );
};