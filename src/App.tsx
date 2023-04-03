import { DealerProvider } from './util/context/context/dealerContext';
import { BettingProvider } from './util/context/context/bettingContext';
import { DeterminingProvider } from './util/context/context/determiningContext';
import { Home } from './pages/home';

export const App = (): JSX.Element => {
  return (
    <main className="App">
      <BettingProvider>
        <DealerProvider>
          <DeterminingProvider>
            <Home />
          </DeterminingProvider>
        </DealerProvider>
      </BettingProvider>
    </main>
  );
};