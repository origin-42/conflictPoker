import { FC, useContext } from 'react';

import { Navbar } from "../components/navbar/navbar";
import { JimsSection } from "../components/jimsSection/jimsSection";
import { TableSection } from "../components/tableSection/tableSection";

import { useBettingContext } from '../util/context/context/bettingContext';
import { useDeterminingContext } from '../util/context/context/determiningContext';
import { useDealerContext } from '../util/context/context/dealerContext';

export const Home: FC = () => {
    const { bettingInfo, setBetInfo, setBlind, makeBet, makeRaise, call, addToPot, dispersePot, fold } = useBettingContext();
    const { determineByHighCard, compareHands, calculateOdds, getRemainingCards, makeDecision } = useDeterminingContext();
    const { dealerInfo, setDealerInfo, dealACard, shuffleTheDeck, restartGame, startGame } = useDealerContext();

    return (
        <section className="grid grid-rows-[10%,35%,55%] h-screen">
            
            <Navbar />
            <JimsSection />
            <TableSection />

        </section>
    )
}