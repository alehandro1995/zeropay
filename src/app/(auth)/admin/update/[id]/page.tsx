import { prisma } from "../../../../../../prisma/client";
import { updateUser } from "../../../../../actions/createUser";
import Link from "next/link";

async function Page({params}: {params: Promise<{id: string}>}) {
	const {id} = await params;
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(id)
		}
	});

	if (!user) {
		throw new Error("User not found");
	}

	return ( 
		<div className="w-full h-full">
			<Link href="/admin" className="btn absolute right-5 top-2">Список пользователей</Link>
			<div className="w-[600px] bg-white flex flex-col items-center gap-y-5 mt-15 mx-auto rounded-2xl shadow-sm p-5">
				<h4 className="text-2xl font-semibold">Редактировать ID: {id}</h4>
				<form action={updateUser}>
					<input type="hidden" name="id" value={user.id} />
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Balance</label>
						<input type="text" name="balance" className="input" style={{"width": "300px"}} defaultValue={user.balance}/>
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-In-Gambling</label>
						<input type="text" name="payInGambling" className="input" style={{"width": "300px"}} defaultValue={user.payInGambling}/>
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-In-Exchangers</label>
						<input type="text" name="payInExchangers" className="input" style={{"width": "300px"}} defaultValue={user.payInExchangers}/>
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-Out-Gambling</label>
						<input type="text" name="payOutGambling" className="input" style={{"width": "300px"}} defaultValue={user.payOutGambling}/>
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-Out-Exchangers</label>
						<input type="text" name="payOutExchangers" className="input" style={{"width": "300px"}} defaultValue={user.payOutExchangers}/>
					</div>
					<button 
						type="submit" 
						className="btn mt-4"
						style={{"width": "300px"}} >
						Создать
					</button>
				</form>
			</div>
		</div>
	);
}

export default Page;