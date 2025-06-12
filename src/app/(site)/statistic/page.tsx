import {prisma} from "../../../../prisma/client";
import PaymentsList from "@/components/ui/select/PaymentsList";
import BankList from "@/components/ui/select/BanksList";
import DeviceList from "@/components/ui/select/DeviceList"; 
import DealStatus from "@/components/ui/select/DealStatus";
import { cookies } from 'next/headers';

export default async function Home() {
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

	const banks = await prisma.bank_name.findMany();
	const paymentMethod = await prisma.payment_method.findMany();
	const devices = await prisma.device.findMany({
		where: {
			userId: user.id
		}
	});
  
  return (
    <section className="page">
      <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5">
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-5">
          <input className="default-input" type="text" placeholder="От даты" />
          <input className="default-input" type="text" placeholder="До даты" />
          <DealStatus />
					<BankList banks={banks} />
          <PaymentsList payments={paymentMethod} />
          <DeviceList devices={devices} />
        </div>
        <div className="flex gap-x-2">
          <button className="btn">Применить</button>
          <button className="btn-secondary">Сбросить</button>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-white shadow-sm rounded-2xl mt-10 text-sm">
        <div className="w-full h-10 flex items-center justify-center bg-gray-600">
          <span className="text-white font-semibold">Всего</span>
        </div>
        <div className="w-full h-10 flex items-center justify-center border-l-[1px] border-r-[1px] border-gray-300">
          <span className="font-semibold">Приём</span>
        </div>
        <div className="w-full h-10 flex items-end border-t-[1px] border-r-[1px] border-l-[1px] border-gray-300 bg-gray-100">
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Статус</span> 
          </div>
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Кол.</span> 
          </div>
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Сумма сделок</span> 
          </div>
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Отправлено (Трейдеры)</span> 
          </div>
          <div className="w-1/5 p-2">
            <span className="font-semibold">Вознаграждение</span> 
          </div>
        </div>
        <div className="w-full h-10 flex items-center justify-center border-t-[1px] border-l-[1px] border-r-[1px] border-gray-300">
          <span className="font-semibold">Выплата</span>
        </div>
        <div className="w-full h-10 flex items-end border-[1px] border-gray-300 bg-gray-100">
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Статус</span> 
          </div>
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Кол.</span> 
          </div>
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Сумма сделок</span> 
          </div>
          <div className="w-1/5 border-r-[1px] border-gray-300 p-2">
            <span className="font-semibold">Отправлено (Трейдеры)</span> 
          </div>
          <div className="w-1/5 p-2">
            <span className="font-semibold">Вознаграждение</span> 
          </div>
        </div>
      </div>
    </section>
  );
}