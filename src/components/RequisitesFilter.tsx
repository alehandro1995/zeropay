"use client";
import {useState} from "react";
import { ImSpinner2 } from "react-icons/im";
import PaymentsList from "@/components/ui/select/PaymentsList";
import BanksList from "@/components/ui/select/BanksList";
import CurrenciesList from "@/components/ui/select/CurrenciesList";
import GroupList from "@/components/ui/select/GroupList";
import { currency, bank_name, payment_method, Group } from "@prisma/client";

type DialsFilterProps = {
	currencies: currency[];
	banks: bank_name[];
	paymentMethod: payment_method[];
	groups: Group[];
};


function RequisitesFilter({currencies, banks, paymentMethod, groups}: DialsFilterProps) {
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
				<CurrenciesList currencies={currencies} />
				<BanksList banks={banks} />
				<PaymentsList payments={paymentMethod} />
        <select name="status" className="default-input">
          <option value={""}>Статус</option>
          <option value={"1"}>активный</option>
          <option value={"0"}>неактивный</option>
        </select>
				<GroupList groups={groups} />
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

export default RequisitesFilter;