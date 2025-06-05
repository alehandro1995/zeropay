"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdPhoneIphone } from "react-icons/md";
import AddDeviceModal from "./modals/AddDeviceModal";
import AddGroupModal from "./modals/AddGroupModal";
import AddRequisitesModal from "./modals/AddRequisites";
import type { 
	currency, 
	bank_name, 
	payment_method, 
	Group, 
	Device 
} from "@prisma/client";

type CreateRequisitesProps = {
	currencies: currency[];
	banks: bank_name[];
	paymentMethod: payment_method[];
	groups: Group[];
	devices: Device[];
}

function CreateRequisites(
	{ currencies, banks, paymentMethod, groups, devices }: 
CreateRequisitesProps) {
	const [isOpenDevice, setIsOpenDevice] = useState(false);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [isOpenRequisites, setIsOpenRequisites] = useState(false);

	return ( 
		<>
			<div className="flex gap-5 mb-5">
				<button
					onClick={() => setIsOpenDevice(true)} 
					className="btn-secondary">
					<MdPhoneIphone />
					<span>Устройства</span>
				</button>
				<button 
					onClick={() => setIsOpenGroup(true)}
					className="btn-secondary">
					Группы
				</button>
				<button 
					onClick={() => setIsOpenRequisites(true)}
					className="btn-secondary ml-auto">
					<FaPlus />
					<span>Создать</span>
				</button>
			</div>
			{isOpenDevice && <AddDeviceModal />}
    	{isOpenGroup && <AddGroupModal />}
    	{isOpenRequisites && 
				<AddRequisitesModal 
					currencies={currencies}
					banks={banks}
					paymentMethod={paymentMethod}
					groups={groups}
					devices={devices}
				/>
			}
		</>
	);
}

export default CreateRequisites;