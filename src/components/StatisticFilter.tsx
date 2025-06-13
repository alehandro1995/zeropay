"use client";
import {useState} from "react";
import { ImSpinner2 } from "react-icons/im";
import PaymentsList from "@/components/ui/select/PaymentsList";
import BankList from "@/components/ui/select/BanksList";
import DeviceList from "@/components/ui/select/DeviceList"; 
import DealStatus from "@/components/ui/select/DealStatus";
import { bank_name, payment_method, Device } from "@prisma/client";

type StatisticFilterProps = {
	banks: bank_name[];
	paymentMethod: payment_method[];
	devices: Device[];
};

function StatisticFilter({banks, paymentMethod, devices}: StatisticFilterProps) {
	const [visible, setVisible] = useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 1200);
	}

	return ( 
		<>
		<form
			onSubmit={handleSubmit} 
			className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5">
      <div className="grid grid-cols-4 xl:grid-cols-5 gap-5">
        <input className="default-input" type="text" placeholder="От даты" />
        <input className="default-input" type="text" placeholder="До даты" />
        <DealStatus />
				<BankList banks={banks} />
        <PaymentsList payments={paymentMethod} />
        <DeviceList devices={devices} />
      </div>
      <div className="flex gap-x-2">
        <button type="submit" className="btn">Применить</button>
        <button type="reset" className="btn-secondary">Сбросить</button>
      </div>
    </form>
		{visible &&
			<div className="modal-box">
				<ImSpinner2  className="animate-spin text-8xl text-amber-50 my-auto"/>
			</div>
		}
		</>
	);
}

export default StatisticFilter;