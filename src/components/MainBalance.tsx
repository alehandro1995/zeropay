"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ModalSend from "@/components/ModalSend";
import ModalReceive from "@/components/ModalReceive";
import { useUserStore } from '@/store/user';

import { 
  MdFormatListBulleted, 
  MdOutlineFileDownload, 
  MdOutlineFileUpload 
} from "react-icons/md";

const LIMIT = parseFloat(process.env.NEXT_PUBLIC_LIMIT || "500");

function MainBalance() {
	const [isOpenSend, setIsOpenSend] = useState(false);
  const [isOpenReceive, setIsOpenReceive] = useState(false);
  const balance = useUserStore(state => state.balance); 

	console.log(LIMIT);

  const currentBalance = useMemo(() => {
    if (balance !== 0 && balance > LIMIT) {
      return balance - LIMIT;
    }
    return 0;
  }, [balance]);

  const insuranceLimit = useMemo(() => {
    if (balance > LIMIT) {
      return LIMIT;
    }

    return balance;
  }, [balance]);

	return ( 
		<>
		<div className="w-full bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center gap-x-3">
        <Image src="/tether.png" width={50} height={50} alt="Tether"/>
				<div>
					<h4 className="text-xl font-semibold">{currentBalance > 0 ? currentBalance.toFixed(8) : '0.00000000'} USDT</h4>
      		<h4 className="text-sm text-red-500">Страховой лимит: {balance > 0 ? insuranceLimit : '0.00000000'} USDT</h4>
      		<h4 className="text-sm text-blue-600">Заблокировано: 0.00000000 USDT</h4>
				</div>
      </div>
			<div className="flex items-center gap-x-5 mt-2"> 
        <Link href="/history" className="btn-secondary">
          <MdFormatListBulleted />
          <span className="text-[12px] font-semibold">История</span>
        </Link>
        <button 
          onClick={() => setIsOpenSend(true)}
          className="btn-secondary">
          <MdOutlineFileUpload />
          <span className="text-[12px] font-semibold">Вывести</span>
        </button>
        <button 
          onClick={() => setIsOpenReceive(true)}
          className="btn-secondary">
          <MdOutlineFileDownload />
          <span className="text-[12px] font-semibold">Пополнить</span>
        </button>
      </div>
    </div>
		{isOpenSend && <ModalSend close={()=>setIsOpenSend(false)}/>}
    {isOpenReceive && <ModalReceive close={()=>setIsOpenReceive(false)}/>}
		</>
	);
}

export default MainBalance;