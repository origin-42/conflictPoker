import { NewDeck, NewCard } from '../contextTypes/contextTypes';

export const fetchNewDeck = async function (): Promise<NewDeck> {
    try {
      const response: any = await fetch("https://www.deckofcardsapi.com/api/deck/new/");
      if (!response.ok) throw new Error(`Failed to fetch new deck: ${response.status} ${response.statusText}`);
  
      const data: NewDeck = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(`Failed to fetch new deck: ${error.message}`);
    }
};

// takes a string as a deck ID and returns NewDeck if the call to the API is successful
export const takeNewCard = async function (deckId: string): Promise<NewCard> {
    try {
        const response: any = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/`);
    
        if (!response.ok) throw new Error(`Failed to retrieve card from deck ${deckId}: ${response.status} ${response.statusText}`);
    
        const data: NewCard = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(`Failed to retrieve card from deck ${deckId}: ${error.message}`);
    }
}

export const shuffleDeck = async function (deckId: string): Promise<NewDeck> {
    try {
        // Return cards to deck
        const returnResponse: any = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/return/`);
        if (!returnResponse.ok) throw new Error(`Failed to return cards to deck ${deckId}: ${returnResponse.status} ${returnResponse.statusText}`);
    
        // Shuffle deck
        const shuffleResponse: any = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        if (!shuffleResponse.ok) throw new Error(`Failed to shuffle deck ${deckId}: ${shuffleResponse.status} ${shuffleResponse.statusText}`);
    
        const data: NewDeck = await shuffleResponse.json();
        return data;
    } catch (error: any) {
        throw new Error(`Failed to shuffle deck ${deckId}: ${error.message}`);
    }
}
