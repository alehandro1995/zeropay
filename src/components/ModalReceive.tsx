import { useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileCopy, MdFileCopy } from "react-icons/md";

export default function ModalSend({close}: {close: () => void}) {
  const [copied, setCopied] = useState(false);
  const address = "TTEfvxtBFSmjy8uh6u3nb4AnEAZ1UHymM6"; // Укажи свой TRC20 адрес

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  
  return(
    <div className="modal-box">
      <div className="modal-content">
        <div className="w-full flex items-center justify-between border-b-2 border-gray-200 p-4">
          <h4 className="text-lg text-gray-600 font-semibold">Пополнение</h4>
          <IoMdClose onClick={close} className="text-lg text-gray-600 cursor-pointer hover:text-gray-900"/>
        </div>
        <div className="flex items-center gap-x-3">
          <Image src="/tether.png" width={50} height={50} alt="Tether"/>
          <div>
            <h4 className="text-xl font-semibold">0.00000000 USDT</h4>
            <h4 className="text-sm text-red-500">Страховой лимит: 0.00000000 USDT</h4>
            <h4 className="text-sm text-blue-600">Заблокировано: 0.00000000 USDT</h4>
          </div>
        </div>
        <div className="w-full flex flex-col items-center p-4">
          <h4 className="text-lg mb-2">Адрес кошелька (USDT TRC20)</h4>
          <div className="w-full h-12 flex items-center justify-center gap-x-2 bg-gray-800 rounded-md">
            <span className="text-lg text-white">{address}</span>
            <div className="relative">
              {copied && <div className="absolute -top-4 -left-5 text-[10px] text-sky-600">Скопировано</div>}
              {!copied 
                ?
                <MdOutlineFileCopy onClick={copyToClipboard} className="text-2xl text-white/90 hover:text-white cursor-pointer"/>
                :
                <MdFileCopy onClick={copyToClipboard} className="text-2xl text-white/90 hover:text-white cursor-pointer"/>
              }
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end border-t-2 border-gray-200 p-4">
          <button onClick={close} type="button" className="btn-secondary">Отменить</button>
        </div>
      </div>
    </div>
  )
}