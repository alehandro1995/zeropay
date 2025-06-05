import { useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form"

interface Inputs {
  amount: string;
  wallet: string;
}

export default function ModalSend({close}: {close: () => void}) {
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = () => setIsSubmit(true);
  return(
    <div className="modal-box">
      <div className="modal-content">
        <div className="w-full flex items-center justify-between border-b-2 border-gray-200 p-4">
          <h4 className="text-lg text-gray-600 font-semibold">Вывод</h4>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col items-center p-4">
            <div className="relative w-full pb-5">
              <label>Сумма: 0.000000</label>
              <input 
                className="w-full border border-gray-600 rounded-sm p-2" type="text" 
                {...register("amount", { required: true })}
              />
              <span>комиссия за вывод составляет 5.00 USDT</span>
              {errors.amount && <span className="error">Обязательное поле</span>}
              {isSubmit && <span className="error">Недостаточно средств</span>}
            </div>
            <div className="relative w-full pb-5">
              <label>Адрес кошелька (USDT TRC20)</label>
              <input 
                className="w-full border border-gray-600 rounded-sm p-2" type="text" 
                {...register("wallet", { required: true })}
              />
              {errors.wallet && <span className="error">Обязательное поле</span>}
            </div>
          </div>
          <div className="w-full flex items-center justify-between border-t-2 border-gray-200 p-4">
            <button onClick={close} type="button" className="btn-secondary">Отменить</button>
            <button type="submit" className="btn">Вывести</button>
          </div>
        </form>
      </div>
    </div>
  )
}