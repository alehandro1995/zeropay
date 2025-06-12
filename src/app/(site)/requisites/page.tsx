import {prisma} from "../../../../prisma/client";
import { FaPlus } from "react-icons/fa6";
import { MdPhoneIphone } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import CurrenciesList from "@/components/ui/select/CurrenciesList";
import BanksList from "@/components/ui/select/BanksList";
import PaymentsList from "@/components/ui/select/PaymentsList";
import GroupList from "@/components/ui/select/GroupList";
import RequisiteItem from "@/components/RequisiteItem";
import RemoveRequisite from "@/components/modals/RemoveRequisite";
import AddDeviceModal from "@/components/modals/AddDeviceModal";
import AddGroupModal from "@/components/modals/AddGroupModal";
import AddRequisitesModal from "@/components/modals/AddRequisites";
import UpdateRequisite from "@/components/modals/UpdateRequisite";
import ModalControl from "@/components/ui/button/ModalControl";
import { cookies } from 'next/headers';
import { ModalTypes } from "@/store/modal";

export default async function Page() {
	const cookie = await cookies();
	const email = cookie.get('email')?.value;
	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	});

	if (!user) {
		throw new Error('User not found');
	}

	const currencies = await prisma.currency.findMany();
	const banks = await prisma.bank_name.findMany();
	const paymentMethod = await prisma.payment_method.findMany();

	const groups = await prisma.group.findMany({
		where: {
			userId: user.id
		}
	});

	const devices = await prisma.device.findMany({
		where: {
			userId: user.id
		}
	});

	
	const requisites = await prisma.requisites.findMany({
		where: {
			userId: user.id
		},
		include: {
			device: true,
			group: true,
			currency: true,
			bankName: true,
			paymentMethod: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

  return (
		<>
		<section className="page">
      <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5">
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
          <button className="btn">Применить</button>
          <button className="btn-secondary">Сбросить</button>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-white shadow-sm rounded-2xl mt-8 text-sm">
				<div className="flex gap-5 mb-5">
					<ModalControl icon={<MdPhoneIphone />} text={"Устройства"} type={ModalTypes.ADD_DEVICE} />
					<ModalControl icon={<MdGroupAdd />} text={"Группы"} type={ModalTypes.ADD_GROUP} />
					<ModalControl icon={<FaPlus />} text={"Создать"} type={ModalTypes.ADD_REQUISITE} classes="ml-auto" />
	
				</div>
        <div className="grid grid-cols-12 items-end border-b-[1px] border-gray-900 p-4 font-semibold">
          <div>Устройство</div>
          <div className="col-span-2">Реквизиты</div>
          <div>Группа</div>
          <div>Валюта</div>
          <div className="col-span-2">Лимиты по суммам</div>
          <div>По объему</div>
          <div>По кол.</div>
          <div>Одноврем.</div>
          <div>Статус</div>
        </div>
				{requisites.length > 0 && requisites.map((item, index) => (
					<RequisiteItem key={item.id} item={item} index={index} />
				))}
      </div>
    </section>
		<RemoveRequisite />
		<AddDeviceModal />
		<AddGroupModal />
		<AddRequisitesModal 
			currencies={currencies}
			banks={banks}
			paymentMethod={paymentMethod}
			groups={groups}
			devices={devices}
		/>
		<UpdateRequisite
			currencies={currencies}
			banks={banks}
			paymentMethod={paymentMethod}
			groups={groups}
			devices={devices}
		/>
		</>
  );
}