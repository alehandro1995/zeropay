"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Toggle from "./Toggle";
import { useUserStore } from '../store/user';
import { deleteSession } from '../actions/clearSession';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const email = useUserStore(state => state.email);
	const createUser = useUserStore(state => state.createUser);
  useEffect(() => {
    fetch("/api/current-user")
      .then(res => res.json())
      .then(data => createUser(data.email, data.balance))
      .catch(() => router.push("/login"));
  },[])

  return (
    <header className="flex h-16 bg-white shadow-sm px-4">
      <Link href="/" className="flex items-center border-r border-gray-300 pr-4 h-full cursor-pointer">
        <Image src="/logo.png" width={20} height={20} alt="logo" />
        <span className="text-lg font-bold ml-2">GeoTransfer</span>
      </Link>
      <nav className="h-full flex items-center gap-x-5 pl-4">
        <Link href="/" className={`${pathname === "/" ? "link active" : "link"}`}>Главная</Link>
        <Link href="/statistic" className={`${pathname === "/statistic" ? "link active" : "link"}`}>Статистика</Link>
        <Link href="/history" className={`${pathname === "/history" ? "link active" : "link"}`}>История операций</Link>
        <Link href="/deals" className={`${pathname === "/deals" ? "link active" : "link"}`}>Сделки</Link>
        <Link href="/requisites" className={`${pathname === "/requisites" ? "link active" : "link"}`}>Реквизиты</Link>
        <Link href="/settings" className={`${pathname === "/settings" ? "link active" : "link"}`}>Настройки</Link>
      </nav>
			<div className='flex items-center ml-auto gap-x-4'>
				<Toggle text={"приём"}/>
				<Toggle text={"выплата"}/>
			</div>
      <div className="h-full flex items-center ml-10">
        <button
          onClick={() => {
            deleteSession();
            router.push("/login");
          }} 
          className="link">
          Выйти ({email})
        </button>
      </div>
    </header>
  )
}