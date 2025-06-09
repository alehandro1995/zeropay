"use client"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import StatusToggle from "./ui/toggle/StatusToggle";
import { useModalStore, ModalTypes } from "../store/modal";
import type { 
	Group, 
	Device, 
	currency, 
	bank_name, 
	payment_method 
} from "@prisma/client";

export interface Requisite {
	id: number;
	card: string;
	cardOwner: string;
	cardNumber: string;
	minOrder: number | null;
	maxOrder: number | null;
	dayLimit: number | null;
	monthLimit: number | null;
	dayQuantity: number | null;
	monthQuantity: number | null;
	concurrentOrder: number | null;
	minutesDelay: number | null;
	status: boolean;
	device?: Device | null;
	group?: Group | null;
	currency: currency;
	bankName: bank_name;
	paymentMethod: payment_method;
}

function RequisiteItem({ item, index }: { item: Requisite; index: number }) {
	const { show } = useModalStore();
	return ( 
		<div 
			className={`grid grid-cols-12 items-center justify-center p-4 ${index % 2 !== 0 ? "bg-transparent" : "bg-gray-50"}`}>
				<div className="flex flex-col">
					{item?.device
						? 
						<>
							<span>{item.device.name}</span>
							<span className="text-gray-400 text-[12px] font-semibold">{item.device.deviceId.substr(0, 8)}</span>
						</>
						: "n/a"
					}
				</div>
				<div className="flex flex-col col-span-2">
					<span className="text-gray-400 text-[12px] font-semibold ellipsis pr-2">
						{item?.bankName.name} - {item?.paymentMethod.name}
					</span>
					<span>{item.card}</span>
					<span>{item.cardOwner}</span>
				</div>
				<div>
					{item.group ? item.group.name : "n/a"}	
				</div>
				<div>{item.currency.symbol}</div>
				<div className="flex flex-col col-span-2">
					<span>{item.minOrder ? "от " + item.minOrder + " " + item.currency.symbol : "---"}</span>
					<span>{item.maxOrder ? "до " + item.maxOrder + " " + item.currency.symbol : "---"}</span>
				</div>
				<div>
					<div className="p-2 bg-cyan-100 rounded-md text-xs flex w-fit gap-x-1">
						<span>{item.dayLimit ? item.dayLimit : "---"}</span> \ <span>{item.monthLimit ? item.monthLimit : "---"}</span>
					</div>
				</div>
				<div>
					<div className="p-2 bg-cyan-100 rounded-md text-xs flex w-fit gap-x-1">
						<span>{item.dayQuantity ? item.dayQuantity : "---"}</span> \ <span>{item.monthQuantity ? item.monthQuantity : "---"}</span>
					</div>
				</div>
				<div>
					{item.concurrentOrder ? item.concurrentOrder : "---"}
				</div>
				<div>
					<StatusToggle id={item.id} isActive={item.status} />
				</div>
				<div className="flex gap-x-2 justify-end">
					<button
						onClick={() => show(ModalTypes.UPDATE_REQUISITE, item)} 
						className="btn-secondary">
						<FaPencil />
					</button>
					<button 
						onClick={(e) => {e.stopPropagation(); show(ModalTypes.REMOVE_REQUISITE, item.id)}}
						className="btn-secondary">
						<FaRegTrashCan />
					</button>
				</div>
		</div>
	);
}

export default RequisiteItem;