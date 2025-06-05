"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ModalSend from "../../components/ModalSend";
import ModalReceive from "../../components/ModalReceive";
import { useUserStore } from '../../store/user';

import { 
  MdFormatListBulleted, 
  MdOutlineFileDownload, 
  MdOutlineFileUpload 
} from "react-icons/md";

const LIMIT = parseFloat(process.env.NEXT_PUBLIC_LIMIT || "500");

export default function Home() {
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
    <section className="flex justify-center h-full w-full">
      <div className="w-[600px] flex flex-col items-center gap-y-5 mt-5">
        <div className="w-full bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-lg mb-2">Торговое вознаграждение</h3>
          <h4 className="font-semibold">Приём</h4>
          <h4><span className="uppercase">гемблинг, беттинг</span>: <b>7.5%</b></h4>
					<h4><span className="uppercase">обменники</span>: <b>8%</b></h4>
          <h4 className="font-semibold">Выплата</h4>
					<h4><span className="uppercase">гемблинг, беттинг</span>: <b>2.5%</b></h4>
					<h4><span className="uppercase">обменники</span>: <b>4%</b></h4>
        </div>
        <h1 className="text-2xl ">Аккаунты:</h1>
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
      </div>
    </section>
    {isOpenSend && <ModalSend close={()=>setIsOpenSend(false)}/>}
    {isOpenReceive && <ModalReceive close={()=>setIsOpenReceive(false)}/>}
    </>
  );
}
