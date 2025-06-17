"use client";
import { useEffect, useState } from "react";
import DealsItem from "./DealsItem";
import { ImSpinner2 } from "react-icons/im";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { useDealStore } from "@/store/deal";

function DealsList() {
	const status = useDealStore((state) => state.status);
	const type = useDealStore((state) => state.type);
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDeals = async () => {
    setLoading(true);
    const params = new URLSearchParams({ status });
    if (type) params.append("type", type);
    const res = await fetch(`/api/deals?${params.toString()}`);
    const data = await res.json();
    setDeals(data.transactions);
    setLoading(false);
  };

  useEffect(() => {
    fetchDeals();
  }, [status, type]);

  if (loading) {
		return (
			<div className="modal-box">
        <ImSpinner2  className="animate-spin text-8xl text-amber-50 my-auto"/>
      </div>
		);
	}

  return (
    <div className="flex flex-col p-5 bg-white shadow-sm rounded-2xl mt-8 text-sm">
      <div className="grid grid-cols-6 items-end border-b-[1px] border-gray-900 p-2 font-semibold">
        <div>ID/Дата</div>
        <div>Статус</div>
        <div>Курс</div>
        <div>Сумма</div>
        <div>Реквизиты</div>
      </div>

      {deals.map((transaction) => (
        <DealsItem
          key={transaction.id}
          id={transaction.id}
          num={transaction.num}
          createdAt={transaction.createdAt}
          status={transaction.status}
          amount={transaction.amount}
          symbol={transaction.requisites.currency.symbol}
          bankName={transaction.requisites.bankName.name}
          paymentMethod={transaction.requisites.paymentMethod.name}
          cardOwner={transaction.requisites.cardOwner}
        />
      ))}
    </div>
  );
}

export default DealsList;
