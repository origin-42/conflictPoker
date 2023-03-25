import { Card, Suit } from '../contextTypes/contextTypes';

// Convert to numbers
const convertFaceCards = function (cards: Card[]): Card[] {
    const updatedCards = cards.map(card => {
        if (card.value === 'J') return { ...card, value: '11' };
        else if (card.value === 'Q') return { ...card, value: '12' };
        else if (card.value === 'K') return { ...card, value: '13' };
        else if (card.value === 'A') return { ...card, value: '14' };
        else { return card; };
    });
    return updatedCards;
};
  
// Check for a straight
const isStraight = function(cards: (Card)[]): boolean {
    let outcome: boolean = false;
    if (cards.length < 5 || cards.length > 7) false;

    // Change cards to 1-14
    let convertedFaceCards: Card[] = convertFaceCards(cards).sort((a, b) => Number(a) - Number(b)).slice(2, cards.length);

    // Check for straight
    let first: number = Number(convertedFaceCards[0]);
    let last: number = Number(convertedFaceCards.pop()) - 1;
    for (let i = 1; i < convertedFaceCards.length; i++)
        if (Number(convertedFaceCards[i]) !== first + i) {
            outcome = false;
            break;
        } else outcome = true;
    if (last !== Number(convertedFaceCards[convertedFaceCards.length - 1])) outcome = false;

    return outcome;
}

// Count highest suit
const countHighestSuit = function (cards: Card[]): string {
  
  // Get an array of suits all suits
  let suitArr: Suit[] = [];
  cards.every(card => {
    if (!suitArr.includes(card.suit as Suit)) suitArr = [...suitArr, card.suit as Suit];
  });

  interface Count {
    suit: string;
    count: number;
  }

  let highestCount: Count = {
    suit: "",
    count: 0,
  };
  for (let i = 0; i < suitArr.length; i++) {
    let suitCount: number = 0
    for (let j = 0; j < cards.length; j++)
      if (suitArr[i] === cards[j].suit) suitCount++;
  
    if (suitCount > highestCount.count) {
      highestCount.count = suitCount;
      highestCount.suit = suitArr[i];
    };
  };
  
  return highestCount.suit;
}

// Check if cards are suited
const isFlush = function (cards: Card[]): boolean {
    if (cards.length < 5 || cards.length > 7) return false;

    const suit = countHighestSuit(cards); 

    const numSameSuit = cards.filter(card => card.suit === suit);

    return numSameSuit.length >= 5;
}


const getBestPair = function (cards: Card[]): string {

    // Sort the cards in descending order of count, then value
    const convertedCards = convertFaceCards(cards).sort();
    const cardCounts: { [key: string]: number } = {};
    let pairs = 0;
    let threeOfAKind = false;
    let fourOfAKind = false;

    for (const card of convertedCards) {
        const value = card.value;
        if (cardCounts[value]) cardCounts[value]++;
        else cardCounts[value] = 1;
    }

    Object.values(cardCounts).forEach((count) => {
        if (count === 2) pairs++;
        else if (count === 3) threeOfAKind = true;
        else if (count === 4) fourOfAKind = true;
    });
   
    if (fourOfAKind) return "Four of a Kind";
    else if (threeOfAKind && pairs === 1) return "Full House";
    else if (threeOfAKind) return "Three of a Kind";
    else if (pairs === 2) return "Two Pair";
    else if (pairs === 1) return "One Pair";
    else return "No Pair";
}

export const getBestPokerHand = function (cards: Card[]): number {
    const flush = isFlush(cards);
    const straight = isStraight(cards);
    const straightFlush = flush && straight;
    const royalFlush = straightFlush && cards.some(card => card.value === 'ACE');
  
    if (royalFlush) return 9;
    else if (straightFlush) return 8;
    else if (getBestPair(cards) === 'Four of a Kind') return 7;
    else if (getBestPair(cards) === 'Full House') return 6;
    else if (flush) return 5;
    else if (straight) return 4;
    else if (getBestPair(cards) === 'Three of a Kind') return 3;
    else if (getBestPair(cards) === 'Two Pair') return 2;
    else if (getBestPair(cards) === 'One Pair') return 1;
    else return 0;
};

export const checkHighCard = (cards: Card[]): Card[] => {

  let convertedFaceCards: Card[] = convertFaceCards(cards).sort((a, b) => Number(a) - Number(b));

  return convertedFaceCards;
};