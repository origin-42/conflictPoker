import React, { FC, useEffect, useState } from 'react';
import { useDealerContext, DealerContextValues } from '../../util/context/context/dealerContext';
import { useBettingContext, BettingContextValues } from '../../util/context/context/bettingContext';
import { gameStart } from '../../util/context/context/dealerContext';
import { GameStart } from '../../util/context/contextTypes/contextTypes';

export const CardsLayer: FC = () => {
    const [cards, setCards] = useState<GameStart>(gameStart);

    const dealerData: DealerContextValues = useDealerContext();
    const { dealerInfo } = dealerData;

    const bettingData: BettingContextValues = useBettingContext();
    const { bettingInfo } = bettingData;

    useEffect(() => {
        setCards(dealerInfo)
    }, [dealerInfo])

    return (
        <section id='cardsSection' className='absolute grid grid-cols-7 grid-rows-3 h-full justify-between gap-4'>
            <div></div>
            <div></div>
            <div></div>
            <div className='flex justify-center gap-2'>
                {dealerInfo.button === "jim" && (
                    <img className='w-1/3 object-contain' src={bettingInfo.buttonImg} alt={`button`}></img>
                )}
                {cards.jimsHand.map(card => (
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
                {cards.burn.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.blank} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
                {cards.flop.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.png} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
                {cards.turn.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.png} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
                {cards.river.map(card => (
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
                {cards.button === "player" && (
                    <img className='w-1/3 object-contain' src={bettingInfo.buttonImg} alt={`button`}></img>
                )}
                {cards.playerHand.map(card => (
                    <img className='w-1/3 object-contain' src={card.images.png} alt={`${card.suit} ${card.value}`} key={card.code}></img>
                ))}
            </div>
            <div></div>
        </section>
    );
};