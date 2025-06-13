import StatisticFilter from "@/components/StatisticFilter";
import {prisma} from "../../../../prisma/client";
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
			<StatisticFilter 
				banks={banks} 
				paymentMethod={paymentMethod} 
				devices={devices}
			/>
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