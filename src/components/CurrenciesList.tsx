import { useEffect, useState } from "react";

const CurrenciesView = () => {
    const [currencies, setCurrencies] = useState<Currency | null>(null)
    const format = (number: number, currency: string) => {
        const formatter = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
        });
        return formatter.format(number)
    }
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
        <div>
            {currencies ? (
                <ul>
                    {Object.entries(currencies).map(([code, data]) => (
                        <li key={code}>
                            <strong>{code}:</strong> {format(data.last, data.symbol)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

interface Currency {
    [currencyCode: string]: {
        '15m': number;
        last: number;
        buy: number;
        sell: number;
        symbol: string;
    };
}

export default CurrenciesView