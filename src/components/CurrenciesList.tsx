import { Currencies } from "../App";

interface CurrenciesViewProps {
    currencies: Currencies
}

const CurrenciesView: React.FC<CurrenciesViewProps> = ({ currencies }) => {
    const format = (number: number, currency: string) => {
        const formatter = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
        });
        return formatter.format(number)
    }
    return (
        <ul>
            {Object.entries(currencies).map(([code, data]) => (
                <li key={code}>
                    <strong>{code}:</strong> {format(data.last, data.symbol)}
                </li>
            ))}
        </ul>

    );
}

export default CurrenciesView