"use client";
import { useActionState } from "react";
import { createUser } from "../../../../actions/createUser";
import Link from "next/link";

const initialState = {
  message: '',
}

function Page() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return ( 
    <div className="flex justify-center relative min-w-[1200px]">
      <Link href="/admin" className="btn absolute right-5 top-2">Список пользователей</Link>
      <div className="w-1/3 bg-white mx-auto rounded-2xl shadow-sm p-4 mt-20">
        <h3 className="text-2xl font-bold">Добавить пользователя</h3>
				<span className="text-red-500 my-2">{state?.message}</span>
        <form action={formAction}>
          <div className="flex flex-col relative pb-5">
            <label htmlFor="email" className="block mt-4">Email</label>
            <input type="email" name="email" className="input" style={{"width": "300px"}} />
          </div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Balance</label>
						<input type="text" name="balance" className="input" style={{"width": "300px"}} />
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-In-Gambling</label>
						<input type="text" name="payInGambling" className="input" style={{"width": "300px"}} />
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-In-Exchangers</label>
						<input type="text" name="payInExchangers" className="input" style={{"width": "300px"}} />
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-Out-Gambling</label>
						<input type="text" name="payOutGambling" className="input" style={{"width": "300px"}} />
					</div>
					<div className="flex flex-col relative pb-5">
						<label htmlFor="email" className="block mt-4">Pay-Out-Exchangers</label>
						<input type="text" name="payOutExchangers" className="input" style={{"width": "300px"}} />
					</div>
          <button 
            type="submit" 
            className="btn mt-4"
            disabled={pending} 
            style={{"width": "300px"}} >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;