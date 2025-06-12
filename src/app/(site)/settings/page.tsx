"use client";
import { useActionState, useEffect } from "react";
import { GoAlertFill } from "react-icons/go";
import { BsTelegram } from "react-icons/bs";
import { useAlertStore, AlertStatus } from "@/store/alert";
import { changePassword } from "@/actions/createUser";

const initialState = {
	message: "",
}

export default function Home() {
	const show = useAlertStore((state) => state.show);
	const [state, formAction, pending] = useActionState(changePassword, initialState);

	useEffect(() => {
		if (state.message === "success") {
			show(AlertStatus.SUCCESS, "Пароль успешно изменен");
		} else if (state.message === "error") {
			show(AlertStatus.ERROR, "Пароли не совпадают");
		}
	}, [state]);

  return (
    <section className="flex flex-col items-center h-full w-full">
			<h1 className="text-2xl my-10">Двухфакторная аутентификация</h1>
			<div className="w-[800px] grid grid-cols-2 gap-5 items-center bg-white rounded-2xl shadow-sm p-5">
				<div>Статус:</div>
				<div className="flex items-center gap-x-2">
					<div className="text-green-400 flex items-center gap-x-1  w-[280px]">
						<GoAlertFill className="text-xl" />
						<span className="text-sm">отключено</span>
					</div>
					<button onClick={() =>show(AlertStatus.ERROR, "Аккаунт не активен")} className="btn-primary">Включить</button>
				</div>
			</div>
			<h1 className="text-2xl my-10">Telegram</h1>
			<div className="w-[800px] grid grid-cols-2 gap-5 items-center bg-white rounded-2xl shadow-sm p-5">
				<div>Бот уведомлений:</div>
				<div className="flex items-center gap-x-2">
					<div className="text-green-400 flex items-center gap-x-1 w-[280px]">
						<GoAlertFill className="text-xl" />
						<span className="text-sm">не привязан</span>
					</div>
					<button
						onClick={() =>show(AlertStatus.ERROR, "Аккаунт не активен")} 
						className="btn-primary flex items-center justify-center gap-x-2">
						<BsTelegram className="text-2xl" />
						<span>Связать аккаунт</span>
					</button>
				</div>
			</div>
      <h1 className="text-2xl my-10">Изменение пароля</h1>
      <form 
				action={formAction}
				className="w-[800px] grid grid-cols-2 gap-5 items-center bg-white rounded-2xl shadow-sm p-5">
        <div>Новый пароль:</div>
        <div>
          <input name="password" className="default-input" type="text" required/>
        </div>
        <div>Подтвердить пароль:</div>
        <div>
          <input name="confirm" className="default-input" type="text" required/>
        </div>
        <button 
					type="submit" 
					className="btn-primary">
					Сохранить
				</button>
      </form>
    </section>
  );
}