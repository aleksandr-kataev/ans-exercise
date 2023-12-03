import React, { useState } from 'react';
import { Currencies } from '../App';

interface CurrencyConverterProps {
    currencies: Currencies
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ currencies }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [convertedAmount, setConvertedAmount] = useState<string | null>(null);

    const convertToBTC = async () => {
        try {
            const res = await fetch(`https://blockchain.info/tobtc?currency=${selectedCurrency}&value=${amount}`)
            const text = await res.text()
            setConvertedAmount(text);
        } catch (e) {
            console.log(e)
        }

    }

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    return (
        <div>
            <label htmlFor="currency">Select Currency:</label>
            <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
                {Object.entries(currencies).map(([code, data]) => (
                    <option key={code} value={data.symbol}>
                        {code}
                    </option>
                ))}
            </select>
            <label htmlFor="amount">Enter Amount:</label>
            <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
            <button onClick={convertToBTC}>Convert to Bitcoin</button>
            {convertedAmount !== null && (
                <p>
                    {convertedAmount}
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;
