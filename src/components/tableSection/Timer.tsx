import React, { useState, useEffect } from 'react';
import { useBettingContext } from '../../util/context/context/bettingContext';
import { useDealerContext } from '../../util/context/context/dealerContext';

export const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [blindsText, setBlindsText] = useState('Game not started');
  const [totalTime, setTotalTime] = useState('00:00:00');
  const bettingContextInfo = useBettingContext();
  const dealingContextInfo = useDealerContext();
  const { bettingInfo, setBetInfo, setBlind } = bettingContextInfo;
  const { dealerInfo, setDealerInfo } = dealingContextInfo;

  // Setup incrementation ffor blinds amount and blinds level to be provided to user and game state.
  const BLINDS_AMOUNTS = [50, 100, 200, 400, 600, 1000, 2000, 3000];
  const MAX_BLINDS_LEVEL = BLINDS_AMOUNTS.length - 1;

  useEffect(() => {
    const currentBlindsLevel = Math.floor(seconds / 600); // 10 minutes in seconds
    const currentBlinds = BLINDS_AMOUNTS[currentBlindsLevel];

    if (dealerInfo.timer && bettingInfo.blinds < 50) {
      setBetInfo({ ...bettingInfo, blinds: 50 });
    }

    if (bettingInfo.blindsLevel !== currentBlindsLevel && currentBlindsLevel <= MAX_BLINDS_LEVEL) {
      setBetInfo({ ...bettingInfo, blinds: currentBlinds, blindsLevel: currentBlindsLevel });
    }

    if (currentBlindsLevel === MAX_BLINDS_LEVEL) {
      setBlindsText(`Blinds: ${BLINDS_AMOUNTS[MAX_BLINDS_LEVEL]}`);
    } else {
      const nextBlindsLevel = currentBlindsLevel + 1;
      const nextBlindsAmount = BLINDS_AMOUNTS[nextBlindsLevel];
      const secondsUntilNextBlinds = 600 - (seconds % 600);
      setBlindsText(`Blinds: ${currentBlinds / 2}/${currentBlinds}, Blinds increase to ${nextBlindsAmount / 2}/${nextBlindsAmount} in ${secondsUntilNextBlinds} seconds`);
    }
  }, [seconds, setBetInfo, bettingInfo, BLINDS_AMOUNTS, MAX_BLINDS_LEVEL]);


  // Keeps incrementing seconds until a threshholds is reached and stops game
  useEffect(() => {
    let interval: any;

    if (dealerInfo.timer) {
      if (seconds < 5400) { // 1 hour and 30 minutes in seconds
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (seconds === 5400) {
        setSeconds(5401); // Finish last incrementation to MAX_BLINDS_LEVEL
        setBlindsText('Blind increase finished');
      }
    } else {
      setSeconds(0);
      setBlindsText('Game not started');
      setTotalTime('00:00:00');
    }

    return () => clearInterval(interval);
  }, [seconds, dealerInfo.timer]);

  // function to return a formatted time.
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  // Returns formatted time to variable to displayu opn change
  useEffect(() => {
    setTotalTime(formatTime(seconds));
  }, [seconds]);

  return (
    <div className='text-white'>
      <p className='font-bold'>Total time: {totalTime}</p>
      <p className='font-bold'>{blindsText}</p>
    </div>
  );
};
