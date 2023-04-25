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

    const { bettingInfo, setBetInfo, makeBet, makeRaise, call, check, addToPot, dispersePot, fold } = useBettingContext();
    const { playerBet, playerRaise, playerStack, jimsBet, jimsRaise, dealPhase, blinds } = bettingInfo;

    const playersTotal = playerBet + playerRaise + betAmount.bet + betAmount.raise;
    const jimsTotal = jimsBet + jimsRaise;

    const playerCanCheck = button === "player" && jimsTotal <= playersTotal;
    const playerCanCall = jimsTotal > playersTotal;
    const playerCanBet = jimsTotal < playersTotal;
    const playerCanRaise = jimsTotal > playersTotal;

    const playerAllIn = jimsTotal > playersTotal + playerStack;

    return (
        <section id='optionsSection' className='absolute flex flex-col gap-2 left-0 top-1/2 transform -translate-y-1/2'>
                {dealPhase === "betting" && (
                    <>
                        {/* Make Bet */}
                        {playerCanBet && (
                            <div className='flex flex-col'>
                                <label htmlFor="bettingAmount" className='bg-white px-4 py-2 rounded' onClick={() => makeBet("player", betAmount.bet)}>Bet {betAmount.bet}{playerAllIn && ", all in!"}</label>
                                <input type="number" id="bettingAmount" value={betAmount.bet} min={blinds} onChange={e => setBetAmount({ ...betAmount, raise: 0, bet: parseInt(e.target.value) })} max={bettingInfo.playerStack} />
                            </div>
                        )}

                        {/* Make Raise */}
                        {playerCanRaise && (
                            <div className='flex flex-col'>
                                <label htmlFor="bettingAmount" className='bg-white px-4 py-2 rounded' onClick={() => makeRaise("player", betAmount.raise)}>Raise {betAmount.raise}{playerAllIn && ", all in!"}</label>
                                <input type="number" id="bettingAmount" value={betAmount.raise} min={blinds} onChange={e => setBetAmount({ ...betAmount, bet: 0, raise: parseInt(e.target.value) })} max={bettingInfo.playerStack} />
                            </div>
                        )}

                        {/* Make Check */}
                        {playerCanCheck && <button className='bg-white px-4 py-2 rounded' onClick={() => check()}>Check</button>}

                        {/* Make Call */}
                        {playerCanCall && <button className='bg-white px-4 py-2 rounded' onClick={() => call("player", false)}>Call {jimsTotal}{playerAllIn && ", all in!"}</button>}

                        {/* Fold Cards */}
                        <button className='bg-white px-4 py-2 rounded' onClick={() => fold("jim")}>Fold</button>
                    </>
                )}
                
        </section> 
    )
}