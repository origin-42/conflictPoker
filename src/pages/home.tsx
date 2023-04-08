import { FC, useContext, useState } from 'react';

import { JimsSection } from "../components/jimsSection/jimsSection";
import { TableSection } from "../components/tableSection/tableSection";

import { useBettingContext } from '../util/context/context/bettingContext';
import { useDeterminingContext } from '../util/context/context/determiningContext';
import { useDealerContext } from '../util/context/context/dealerContext';

export const Home: FC = () => {
    const { bettingInfo, setBetInfo, setBlind, makeBet, makeRaise, call, addToPot, dispersePot, fold } = useBettingContext();
    const { determineByHighCard, compareHands, calculateOdds, getRemainingCards, makeDecision } = useDeterminingContext();
    const { dealerInfo, setDealerInfo, dealCards, shuffleTheDeck, restartGame, startGame } = useDealerContext();

    const [ betting, setBetting ] = useState({
        
    });

    return (
        <section className="grid grid-rows-[45%,55%] h-screen">
            
            <JimsSection />
            <TableSection />

        </section>
    );
};