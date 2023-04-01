import { FC, useContext } from 'react';
import { ChipsLayer } from './chipsLayer';
import { CardsLayer } from './cardsLayer';

export const TableSection: FC = () => {

    return (
        <section id='tableSection' className='flex flex-row justify-center relative bg-cyan-600 h-6/10 border-y-32 border-gray-600 shadow-upper'>
            

            <ChipsLayer />
            <CardsLayer />
        </section>
    );
};