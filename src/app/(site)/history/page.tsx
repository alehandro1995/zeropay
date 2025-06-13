import HistoryFilter from "@/components/HistoryFilter";

export default function Page() {

  return (
    <section className="page">
      <HistoryFilter />
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