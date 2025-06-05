'use client'
import { bank_name as Bank } from '@prisma/client';

type BankListProps = {
	banks: Bank[];
	value?: number;
}
function BankList({banks, value}: BankListProps) {

	return ( 
		<select 
			defaultValue={value || 0}
			name="bank" 
			className="default-input">
    	<option value={0}>Способы оплаты</option>
      {banks.length > 0 && banks.map((bank) => (
				<option key={bank.id} value={bank.id}>
					{bank.name}
				</option>
			))}  
  	</select>
	);
}

export default BankList;