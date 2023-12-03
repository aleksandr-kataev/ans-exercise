import { useEffect, useState } from 'react';
import './App.css';
import CurrenciesList from './components/CurrenciesList';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [currencies, setCurrencies] = useState<Currencies | null>(null)
  const [view, setView] = useState<View>("LIST")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://blockchain.info/ticker');
        const result = await response.json();
        setCurrencies(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleView = () => view === "LIST" ? setView("CONV") : setView("LIST")
  return (
    <div className="App">
      <div>
        {currencies ? (
          <div>
            <button onClick={toggleView}>Switch view</button>
            {view === "LIST" ? <CurrenciesList currencies={currencies} /> : <CurrencyConverter currencies={currencies} />}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export interface Currencies {
  [currencyCode: string]: {
    '15m': number;
    last: number;
    buy: number;
    sell: number;
    symbol: string;
  };
}

type View = "LIST" | "CONV"

export default App;
