"use client"
import { useMemo } from "react";


export default function Home() {
  const currentDate = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }, []);
  return (
    <section className="page">
      <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5">
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-5">
          <input className="default-input" type="text" defaultValue={currentDate} />
          <input className="default-input" type="text" placeholder="До даты" />
          <select className="default-input">
            <option>Статусы</option>
          </select>
          <select className="default-input">
            <option>Способы оплаты</option>
          </select>
          <select className="default-input">
            <option>Тип оплаты</option>
          </select>
          <select className="default-input">
            <option>Устройства</option>
          </select>
        </div>
        <div className="flex gap-x-2">
          <button className="btn">Применить</button>
          <button className="btn-secondary">Сбросить</button>
        </div>
      </div>
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