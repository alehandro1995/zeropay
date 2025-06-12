"use client";
import { useActionState, useEffect, useState } from "react";
import CurrenciesList from "@/components/ui/select/CurrenciesList";
import BanksList from "@/components/ui/select/BanksList";
import PaymentsList from "@/components/ui/select/PaymentsList";
import { paymentSetting } from "@/actions/paymentSetting";
import { IoMdClose } from "react-icons/io";
import { useAlertStore, AlertStatus } from "@/store/alert";

const initialState = {
	message: ""
}

function PaymentSetting({currencies, banks, paymentMethod, close}: any) {
	const [state, action, pending] = useActionState(paymentSetting, initialState);
	const [error, setError] = useState<string | null>(null);
	const show = useAlertStore((state) => state.show);

	useEffect(() => {
		setError(null);
		if (state.message === "success") {
			close();
			show(AlertStatus.SUCCESS, "Настройки выплат успешно сохранены.");
		}

		if (state.message === "error") {
			setError("Не удалось сохранить настройки выплат. Пожалуйста, заполните все поля корректно!");
		}
	}, [state]);

	return ( 
		<div
			onClick={close} 
			className="modal-box">
			<div
				onClick={(e) => e.stopPropagation()} 
				className="modal-content-lg">
				<IoMdClose 
					onClick={close} 
					className="absolute right-1 top-1 text-lg text-gray-600 cursor-pointer hover:text-gray-900"
				/>
				{ error &&
					<div className="text-red-500">
						{error}
					</div>
				}
				<form 
					action={action}
					className="w-full p-5">
					<div className="grid grid-cols-4 gap-4 border-b-[1px] border-gray-300 pb-5">
						<input name="min_order" type="text" className="default-input" placeholder="От суммы" />
						<input name="max_order" type="text" className="default-input" placeholder="До суммы" />
						<CurrenciesList currencies={currencies} />
						<div className="flex items-center gap-x-2">
							<input name="divisible" type="checkbox" />
							<label>Кратные 1000</label>
						</div>
						<BanksList banks={banks} />
						<PaymentsList payments={paymentMethod} />
						<div className="flex items-center gap-x-2">
							<input name="only_mir" type="checkbox" />
							<label>Только МИР</label>
						</div>
					</div>
					<div className="flex justify-end gap-x-2 mt-5">
						<button className="btn-secondary" onClick={close}>Отменить</button>
						<button disabled={pending} className="btn">Сохранить</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PaymentSetting;