export default function Home() {
  return (
    <section className="flex flex-col items-center h-full w-full">
      <h1 className="text-2xl my-10">Профиль</h1>
      <div className="w-[600px] grid grid-cols-2 gap-5 items-center bg-white rounded-2xl shadow-sm p-5">
        <div>Новый пароль:</div>
        <div>
          <input className="default-input" type="text"/>
        </div>
        <div>Подтвердить пароль:</div>
        <div>
          <input className="default-input" type="text"/>
        </div>
        <div></div>
        <button className="btn-primary">Сохранить</button>
      </div>
    </section>
  );
}