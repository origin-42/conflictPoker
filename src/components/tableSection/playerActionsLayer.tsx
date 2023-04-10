import { FC, useContext, useState } from 'react';

import { useBettingContext } from '../../util/context/context/bettingContext';
import { useDealerContext } from '../../util/context/context/dealerContext';

export const PlayerActions = () => {
    const [betAmount, setBetAmount] = useState({
        bet: 0,
        raise: 0
    });

    const { dealerInfo } = useDealerContext();
    const { button } = dealerInfo;

    const { bettingInfo, setBetInfo, makeBet, makeRaise, call, addToPot, dispersePot, fold } = useBettingContext();
    const { playerBet, playerRaise, playerStack, jimsBet, jimsRaise } = bettingInfo;

    const playersTotal = playerBet + playerRaise + betAmount.bet + betAmount.raise;
    const jimsTotal = jimsBet + jimsRaise;

    const playerCanCheck = button === "player" && jimsTotal <= playersTotal;
    const playerCanCall = jimsTotal > playersTotal;
    const playerCanBet = jimsTotal < playersTotal;
    const playerCanRaise = jimsTotal > playersTotal;

    const playerAllIn = jimsTotal > playersTotal + playerStack;

    const setCheck = function () {
        setBetInfo({ ...bettingInfo, playerMove: "jim" });
    };

    return (
        <section id='optionsSection' className='absolute flex flex-col gap-2 left-0 top-1/2 transform -translate-y-1/2'>
                {playerCanCheck && <button className='bg-white px-4 py-2 rounded' onClick={() => setCheck()}>Check</button>}
                {playerCanCall && <button className='bg-white px-4 py-2 rounded' onClick={() => call("player")}>Call {jimsTotal}{playerAllIn && ", all in!"}</button>}
                {playerCanBet && (
                    <div>
                        <input type="number" id="bettingAmount" value={betAmount.bet} onChange={e => setBetAmount({ ...betAmount, raise: 0, bet: parseInt(e.target.value) })} />
                        <label htmlFor="bettingAmount" className='bg-white px-4 py-2 rounded' onClick={() => makeBet("player", betAmount.bet)}>Bet {betAmount.bet}{playerAllIn && ", all in!"}</label>
                    </div>
                )}
                {playerCanRaise && (
                    <div>
                        <input type="number" id="bettingAmount" value={betAmount.raise} onChange={e => setBetAmount({ ...betAmount, bet: 0, raise: parseInt(e.target.value) })} />
                        <label htmlFor="bettingAmount" className='bg-white px-4 py-2 rounded' onClick={() => makeRaise("player", betAmount.raise)}>Raise {betAmount.raise}{playerAllIn && ", all in!"}</label>
                    </div>
                )}
                <button className='bg-white px-4 py-2 rounded' onClick={() => fold("jim")}>Fold</button>
        </section> 
    )
}