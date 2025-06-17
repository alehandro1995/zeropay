import {prisma} from "../../../../prisma/client";
import DealsFilter from "@/components/DealsFilter";
import { cookies } from 'next/headers';
import DealsItem from "@/components/DealsItem";
import DealsList from "@/components/DealsList";

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
      <DealsList />
    </section>
  );
}