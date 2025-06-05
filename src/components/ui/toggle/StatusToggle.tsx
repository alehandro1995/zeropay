"use client"
import { useState } from "react";
import { changeStatus } from "@/actions/requisitesAction";
import { useAlertStore, AlertStatus } from "@/store/alert";

function StatusToggle({id, isActive} : {id: number, isActive: boolean}) {
	const [status, setStatus] = useState(isActive);
	const show = useAlertStore((state) => state.show);

	const handleToggle = async () => {
		const result = await changeStatus(id, !status);
		if (result.status === 'success') {
			setStatus(!status); // Update the status if the change was successful
		} else if (result.status === 'error') {
			setStatus(status); // Revert the status if there was an error
			show(AlertStatus.ERROR, 'Ошибка при изменении статуса реквизита');
		}
	};

	return ( 
		<div
			onClick={() => handleToggle()} 
			className="flex items-center gap-x-2">
      <div className={`relative w-[30px] h-[18px] rounded-2xl flex items-center px-[2px] cursor-pointer
        ${status ? 'justify-end bg-green-700' : 'justify-start bg-red-500'}
     	`}>
      <div className="w-[12px] h-[12px] bg-white rounded-full"></div>
      </div>
		</div>
	);
}

export default StatusToggle;