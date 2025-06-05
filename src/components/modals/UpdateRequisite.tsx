"use client"
import CurrenciesList from "../ui/select/CurrenciesList";
import PaymentsList from "../ui/select/PaymentsList";
import BankList from "../ui/select/BanksList";
import GroupList from "../ui/select/GroupList";
import DeviceList from "../ui/select/DeviceList";
import { useAlertStore, AlertStatus } from "../../store/alert";
import { useActionState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { updateRequisites } from "@/actions/requisitesAction";
import { useRouter } from "next/navigation";
import { useModalStore, ModalTypes } from "@/store/modal";

import type { Requisite } from "../RequisiteItem";

import type { 
	currency, 
	bank_name, 
	payment_method, 
	Group, 
	Device 
} from "@prisma/client";

type UpdateRequisitesProps = {
	currencies: currency[];
	banks: bank_name[];
	paymentMethod: payment_method[];
	groups: Group[];
	devices: Device[];
}

const initialState = {
	status: '',
}

export default function UpdateRequisite(
	{ currencies, banks, paymentMethod, groups, devices }: 
UpdateRequisitesProps) {
	const { hide, isVisible, type, data } = useModalStore();
	const show = useAlertStore(state => state.show);
	const router = useRouter();
	const [state, formAction, pending] = useActionState(updateRequisites, initialState);
	const requisiteData = data as Requisite;
	
	useEffect(() => {
		if (state.status === 'success') {
			hide();
			router.refresh();
			show(AlertStatus.SUCCESS, "Реквизиты успешно обновлены");
		}else if (state.status === 'error') {
			show(AlertStatus.ERROR, "Ошибка при обновлении реквизитов");
		}else{
			return;
		}
	}, [state.status]);

	return(
		<>
		{isVisible && type === ModalTypes.UPDATE_REQUISITE && (
		<div className="modal-box">
			<form
				action={formAction} 
				className="modal-content-lg">
				<input type="hidden" name="id" defaultValue={requisiteData.id} />
				<div className="w-full flex items-center justify-between border-b-2 border-gray-200 p-4">
					<h4 className="text-lg text-gray-600 font-semibold">Новые реквизиты</h4>
					<IoMdClose onClick={hide} className="text-lg text-gray-600 cursor-pointer hover:text-gray-900"/>
				</div>
				<div className="w-full grid grid-cols-4 gap-4 p-4">
					<div>Валюта</div>
					<div className="col-span-3">
						<CurrenciesList currencies={currencies} value={requisiteData.currency.id} />
					</div>
					<div>Способ оплаты</div>
					<div className="col-span-3">
						<PaymentsList payments={paymentMethod} value={requisiteData.paymentMethod.id}/>
					</div>
					<div>Банк</div>
					<div className="col-span-3">
						<BankList banks={banks} value={requisiteData.bankName.id} />
					</div>
					<div>Номер счета</div>
					<div className="col-span-3">
						<input name="card_number" type="text" className="default-input" defaultValue={requisiteData.cardNumber} />
					</div>
					<div>Имя владельца</div>
					<div className="col-span-3">
						<input name="owner_name" type="text" className="default-input" defaultValue={requisiteData.cardOwner} />
					</div>
					<div>Реквизиты</div>
					<div className="col-span-3">
						<input name="card" type="text" className="default-input" defaultValue={requisiteData.card} />
					</div>
					<div>Группа</div>
					<div className="col-span-3">
						<GroupList groups={groups} value={requisiteData.group?.id} />
					</div>
					<div>Устройство</div>
					<div className="col-span-3">
						<DeviceList devices={devices} value={requisiteData.device?.id} />
					</div>
					<h4 className="col-span-4 text-center text-lg my-2">Лимиты</h4>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Мин. сумма сделки</div>
						<input name="min_order" type="text" className="default-input" defaultValue={`${requisiteData?.minOrder}`}/>
					</div>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Макс. сумма сделки</div>
						<input name="max_order" type="text" className="default-input" defaultValue={`${requisiteData?.maxOrder}`} />
					</div>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Сумма (день)</div>
						<input name="day_limit" type="text" className="default-input" defaultValue={`${requisiteData?.dayLimit}`}/>
					</div>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Сумма (месяц)</div>
						<input name="month_limit" type="text" className="default-input" defaultValue={`${requisiteData?.monthLimit}`}/>
					</div>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Кол. (день)</div>
						<input name="day_quantity" type="text" className="default-input" defaultValue={`${requisiteData?.dayQuantity}`}/>
					</div>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Кол. (месяц)</div>
						<input name="month_quantity" type="text" className="default-input" defaultValue={`${requisiteData?.monthLimit}`}/>
					</div>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Одновременных сделок</div>
						<input name="concurrent_order" type="text" className="default-input" defaultValue={`${requisiteData?.concurrentOrder}`} />
					</div>
					<div className="col-span-2 w-full grid grid-cols-2">
						<div>Задержка, минут</div>
						<input name="minutes_delay" type="text" className="default-input" defaultValue={`${requisiteData?.minutesDelay}`}/>
					</div>
				</div> 
				<div className="w-full flex items-center justify-end gap-x-5 border-t-2 border-gray-200 p-4">
					<button onClick={hide} type="button" className="btn-secondary">Отменить</button>
					<button disabled={pending} type="submit" className="btn">Сохранить</button>
				</div>
			</form>
		</div>
		)}
		</>
	)
}