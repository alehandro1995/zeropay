import {prisma} from "../../../../prisma/client";
import DealsFilter from "@/components/DealsFilter";
import { cookies } from 'next/headers';
import DealsItem from "@/components/DealsItem";

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

	const transactions = await prisma.transaction.findMany({
		where: {
			userId: user.id,
			status: 'PENDING'
		},
		include: {
			requisites: {
				include: {
					device: true,
					group: true,
					currency: true,
					bankName: true,
					paymentMethod: true
				}
			}
		},
		orderBy: {
			num: 'asc'
		}
	});

	const currencies = await prisma.currency.findMany();
	const banks = await prisma.bank_name.findMany();
	const paymentMethod = await prisma.payment_method.findMany();

  return (
    <section className="page">
			<DealsFilter 
				currencies={currencies}
				banks={banks}
				paymentMethod={paymentMethod}
			/>
      <div className="flex flex-col p-5 bg-white shadow-sm rounded-2xl mt-8 text-sm">
        <div className="grid grid-cols-6 items-end border-b-[1px] border-gray-900 p-2 font-semibold">
          <div>ID/Дата</div>
          <div>Статус</div>
          <div>Курс</div>
          <div>Сумма</div>
          <div>Реквизиты</div>
        </div>

				{transactions.map((transaction) => (
				 	<DealsItem 
						key={transaction.id}
						id={transaction.id}
						num={transaction.num}
						createdAt={transaction.createdAt}
						status={transaction.status}
						amount={transaction.amount}
						symbol={transaction.requisites.currency.symbol}
						bankName={transaction.requisites.bankName.name}
						paymentMethod={transaction.requisites.paymentMethod.name}
						cardOwner={transaction.requisites.cardOwner}
				 	/>
				))}
				<div className="h-5"></div>
			</div>
    </section>
  );
}