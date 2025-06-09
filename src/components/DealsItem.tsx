"use client";
import { HiOutlineArrowDownCircle } from "react-icons/hi2";
import { changeTransactionStatus } from "@/actions/changeTransactionStatus";

type DealsItemProps = {
	id: number;
	num: string;
	createdAt: Date;
	status: string;
	amount: number;
	symbol: string;
	bankName: string;
	paymentMethod: string;
	cardOwner: string;
};

function DealsItem({id, num, createdAt, status, amount, symbol, bankName, paymentMethod, cardOwner} : DealsItemProps) {
	
	return ( 
		<div  
			className={`grid grid-cols-6 items-center p-2 
			${id % 2 === 0 ? 'bg-gray-100' : ''}`}>
			<div className="flex items-center gap-x-1">
				<HiOutlineArrowDownCircle className="text-blue-600 text-lg" />
				<div>
					<p>{num}</p>
					<p className="text-gray-400 text-xs">{new Date(createdAt).toLocaleString()}</p>
				</div>
			</div>
			<div>
				<p>{status.toUpperCase()}</p>
				<p className="text-gray-400 text-xs">{new Date(createdAt).toLocaleString()}</p>
			</div>
			<div>92.00</div>
			<div>
				<p>{amount} {symbol}</p>
				<p className="text-gray-400 text-xs">55,978260 USDT</p>
			</div>
			<div className="flex flex-col">
				<span className="text-gray-400 text-[12px] font-semibold ellipsis pr-2">
					{bankName} - {paymentMethod}
				</span>
				<span>{cardOwner}</span>
			</div>
			<button 
				onClick={() => changeTransactionStatus(id)}
				className="btn-secondary ml-auto">
				Подтвердить
			</button>
		</div>
	);
}

export default DealsItem;