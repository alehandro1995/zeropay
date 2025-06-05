"use client"
import { useState } from "react";
import { useAlertStore, AlertStatus } from "../store/alert";
import { useUserStore } from "../store/user";

const LIMIT = parseFloat(process.env.NEXT_PUBLIC_LIMIT || "500");

export default function Toggle({text}: {text: string}) {
  const {isVisible, show, hide} = useAlertStore();
  const balance = useUserStore(state => state.balance);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    if (balance > LIMIT){
      setIsActive(!isActive);     
    }else {
      if (!isVisible) {
        setIsActive(!isActive);
      
        setTimeout(() => {
          show(AlertStatus.ERROR, 'Недостаточно средств!');
          setIsActive(false);
        }, 800);
        setTimeout(() => {
          hide();
        }, 5000);
      }
    }
  }

  return (
    <div className="h-full flex items-center gap-x-1">
      <div className={`text-white px-2 py-1 rounded-md text-xs font-bold
        ${isActive ? 'bg-green-700' : 'bg-red-500'}`}>
        <span className="leading-0 relative bottom-[1px]">{text}</span>
      </div>
      <div
        onClick={toggle} 
        className="flex items-center gap-x-2">
        <div className={`relative w-[40px] h-[21px] rounded-2xl flex items-center px-[2px] cursor-pointer
          ${isActive ? 'justify-end bg-green-700' : 'justify-start bg-red-500'}
        `}>
          <div className="w-[17px] h-[17px] bg-white rounded-full"></div>
        </div>
		  </div>
    </div>
  );
}