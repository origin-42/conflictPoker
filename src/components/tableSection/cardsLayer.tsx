import React, { FC, useEffect } from 'react';
import { useDealerContext, DealerContextValues } from '../../util/context/context/dealerContext';
import { useBettingContext, BettingContextValues } from '../../util/context/context/bettingContext';

export const CardsLayer: FC = () => {
    const dealerData: DealerContextValues = useDealerContext();
    const { dealerInfo } = dealerData;

    const bettingData: BettingContextValues = useBettingContext();
    const { bettingInfo } = bettingData;

    


    return (
        <section id='cardsSection' className='absolute grid grid-cols-7 grid-rows-3 h-full justify-between gap-4'>
            <div></div>
            <div></div>
            <div></div>
            <div className='flex justify-center gap-2'>
                {dealerInfo.playerTurn === "jim" && (
                    <img className='w-1/3 object-contain' src={bettingInfo.button} alt={`button`}></img>
                )}
                {dealerInfo.jimsHand.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.blank} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className='flex justify-center gap-2'>
                {dealerInfo.burn.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.blank} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
                {dealerInfo.flop.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.png} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
                {dealerInfo.turn.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.png} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
                {dealerInfo.river.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.png} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className='flex justify-center gap-2'>
                {dealerInfo.playerTurn === "player" && (
                    <img className='w-1/3 object-contain' src={bettingInfo.button} alt={`button`}></img>
                )}
                {dealerInfo.playerHand.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.png} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
            </div>
            <div></div>
        </section>
    );
};