"use client";
import { payment_method as Payment } from '@prisma/client';

type PaymentsListProps = {
	payments: Payment[];
	value?: number;
}

function PaymentsList({payments, value}: PaymentsListProps) {
	
	return ( 
		<select
			defaultValue={value || 0} 
			name="payment" 
			className="default-input">
    	<option value={0}>Тип оплаты</option>
			{payments.length > 0 && payments.map((payment) => (
				<option key={payment.id} value={payment.id}>
					{payment.name}
				</option>
			))}      
    </select>
	);
}

export default PaymentsList;