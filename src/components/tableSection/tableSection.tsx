import { FC, useContext, useState } from 'react';
import { ChipsLayer } from './chipsLayer';
import { CardsLayer } from './cardsLayer';
import { PlayerActions } from './playerActionsLayer';

import { useBettingContext } from '../../util/context/context/bettingContext';
import { DealerActions } from './dealerActionsLayer';


export const TableSection: FC = () => {

    const { bettingInfo } = useBettingContext();
    const { playerMove } = bettingInfo;

    return (
        <section id='tableSection' className='flex flex-row justify-center relative bg-cyan-600 h-6/10 border-y-32 border-gray-600 shadow-upper'>

        
            {/* All in? */}

            <ChipsLayer />
            <CardsLayer />

            {/* Available player actions */}
            {playerMove === "player" && (
                <PlayerActions />
            )}

            <DealerActions />
            
        </section>
    );
};