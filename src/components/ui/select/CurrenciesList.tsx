'use client'
import { currency } from '@prisma/client';

type CurrenciesListProps = {
	currencies: currency[];
	value?: number;
}

function CurrenciesList({currencies, value}: CurrenciesListProps) {

	return ( 
		<select
			defaultValue={value || 0} 
			name="currency" 
			className="default-input">
      <option value={0}>Валюты</option>
			{currencies.length > 0 && currencies.map((currency) => (
				<option key={currency.id} value={currency.id}>
					{currency.name} - {currency.symbol}
				</option>
			))}
    </select>
	);
}

export default CurrenciesList;