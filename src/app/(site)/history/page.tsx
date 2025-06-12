export default function Page() {

  return (
    <section className="page">
      <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5">
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-5">
          <input className="default-input" type="text" placeholder="Номер счёта" />
          <input className="default-input" type="text" placeholder="От даты" />
          <input className="default-input" type="text" placeholder="До даты" />
          <select className="default-input">
            <option>Тип</option>
						<option value="deposit">Приём</option>
						<option value="withdraw">Выплата</option>
          </select>
        </div>
        <div className="flex gap-x-2">
          <button className="btn">Применить</button>
          <button className="btn-secondary">Сбросить</button>
        </div>
      </div>
      <div className="flex flex-col p-5 bg-white shadow-sm rounded-2xl mt-8 text-sm">
        <div className="grid grid-cols-6 items-end border-b-[1px] border-gray-900 p-2 font-semibold">
          <div>Дата</div>
          <div>Валюта</div>
          <div>Сумма</div>
          <div>Тип</div>
          <div>Баланс до</div>
          <div>Баланс после</div>
        </div>
        <div className="h-5"></div>
      </div>
    </section>
  );
}