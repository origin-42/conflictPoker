import { FC } from 'react';
import { useDealerContext, DealerContextValues } from '../../util/context/context/dealerContext';
import { JimsSectionLayer } from './jimSectionLayer';

export const JimsSection: FC = () => {
    const dealersInfo: DealerContextValues = useDealerContext();
    const { dealerInfo, setDealerInfo, dealACard, shuffleTheDeck, restartGame, startGame } = dealersInfo;

    return (
        <section id='jimsSection' className='relative bg-gray-200 h-3/10'>
            <JimsSectionLayer />
        </section>
    );
};