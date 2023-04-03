import React, { FC, useState, useEffect } from 'react';
import { chipsImages } from './tableImages';
import { useBettingContext } from '../../util/context/context/bettingContext';
import { BettingContextValues } from '../../util/context/context/bettingContext';


export const ChipsLayer: FC = () => {
    const betData: BettingContextValues = useBettingContext();
    const { bettingInfo } = betData;

    const [chipValues, setValues] = useState({
        pot: "",
        player: "",
        playerStack: "",
        jim: "", 
        jimsStack: ""
    });

    const setChips = (chips: number, level: number): string => {
        let image: string;
        if (chips > 5500) image = chipsImages[level].large;
        else if (chips > 3250) image = chipsImages[level].midLarge;
        else if (chips > 2750) image = chipsImages[level].mid;
        else if (chips > 500) image = chipsImages[level].midSmall;
        else if (chips > 0) image = chipsImages[level].small;
        else image = '';
        return image;
    };

    useEffect(() => {
        if (bettingInfo) {
            if (bettingInfo?.playerBet || bettingInfo?.playerRaise) playerBet = bettingInfo.playerBet? bettingInfo.playerBet:bettingInfo.playerRaise;
            if (bettingInfo?.jimsBet || bettingInfo?.jimsRaise) jimBet = bettingInfo.jimsBet? bettingInfo.jimsBet:bettingInfo.jimsRaise;
            const level = bettingInfo.blindsLevel;

            setValues({ ...chipValues, 
                pot: setChips(bettingInfo.potSize, level),
                player: setChips(playerBet, level),
                playerStack: setChips(bettingInfo.playerStack, level),
                jim: setChips(jimBet, level),
                jimsStack: setChips(bettingInfo.jimsStack, level)
            })
        }
    }, [bettingInfo]);

    let playerBet: number = 0;
    let jimBet: number = 0;


    return (
        <section id='tableSection' className='absolute grid grid-cols-7 grid-rows-3 h-full justify-between gap-4'>
            <div></div>
            <div id='jimsStack' className="relative w-full h-full">
                {chipValues.jimsStack? <img src={chipValues.jimsStack} alt='Jims Stack' className='w-full h-full object-cover'></img>: <div></div>}
                {bettingInfo.jimsStack? (
                    <div className="absolute inset-0 flex items-end justify-center">
                        <div className="bg-white px-4 py-2 rounded-lg">
                            <p className="text-lg font-medium">{bettingInfo.jimsStack}</p>
                        </div>
                    </div>
                ):<div></div>}
            </div>
            <div></div>
            <div></div>
            <div id='jimsBet' className="relative w-full h-full">
                {chipValues.jim? <img src={chipValues.jim} alt='jims Bet or Raise' className='w-full h-full object-cover'></img>: <div></div>}
                {bettingInfo.jimsBet || bettingInfo.jimsRaise? (
                    <div className="absolute inset-0 flex items-end justify-center">
                        <div className="bg-white px-4 py-2 rounded-lg">
                            <p className="text-lg font-medium">{bettingInfo.jimsBet? bettingInfo.jimsBet:bettingInfo.jimsRaise}</p>
                        </div>
                    </div>
                ):<div></div>}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id='currentPot' className="relative w-full h-full">
                {chipValues.pot? <img src={chipValues.pot} alt='The current pot' className='w-full h-full object-cover'></img>: <div></div>}
                {bettingInfo.potSize? (
                    <div className="absolute inset-0 flex items-end justify-center">
                        <div className="bg-white px-4 py-2 rounded-lg">
                            <p className="text-lg font-medium">{bettingInfo.potSize}</p>
                        </div>
                    </div>
                ): <div></div>}
            </div>
            <div></div>
            <div></div>
            <div id='yourStack' className="relative w-full h-full">
                {chipValues.playerStack? <img src={chipValues.playerStack} alt='Your stack' className='w-full h-full object-cover'></img>: <div></div>}
                {bettingInfo.playerStack? (
                    <div className="absolute inset-0 flex items-end justify-center">
                        <div className="bg-white px-4 py-2 rounded-lg">
                            <p className="text-lg font-medium">{bettingInfo.playerStack}</p>
                        </div>
                    </div>
                ): <div></div>}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div id='yourBet' className="relative w-full h-full">
                {chipValues.player? <img src={chipValues.player} alt='Your bet or raise' className='w-full h-full object-cover'></img>: <div></div>}
                {bettingInfo.playerRaise || bettingInfo.playerBet ? (
                    <div className="absolute inset-0 flex items-end justify-center">
                        <div className="bg-white px-4 py-2 rounded-lg">
                            <p className="text-lg font-medium">{bettingInfo.playerRaise? bettingInfo.playerRaise:bettingInfo.playerBet}</p>
                        </div>
                    </div>
                ): <div></div>}
            </div>
            <div></div>
        </section>
    );
};