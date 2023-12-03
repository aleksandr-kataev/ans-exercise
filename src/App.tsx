import { useEffect, useState } from 'react';
import './App.css';
import CurrenciesList from './components/CurrenciesList';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [currencies, setCurrencies] = useState<Currencies | null>(null)
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
  return (
    <div className="App">
      <div>
        {currencies ? (
          <div> <CurrenciesList currencies={currencies} /> <CurrencyConverter currencies={currencies} /></div>
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

export default App;
