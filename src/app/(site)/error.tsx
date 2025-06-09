'use client' 
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Error({error, reset}: {error: Error & { digest?: string }, reset: () => void}) {
	const router = useRouter()
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center mt-40 bg-gray-100 text-gray-800">
      <h2 className='text-2xl'>Непредвиденная ошибка!!!</h2>
			<div className='flex gap-x-10 mt-5'>
				<button className="btn-secondary" onClick={reset}>
        	Перезагрузить страницу
      	</button>
				<button className="btn-secondary" onClick={() => router.push('/')}>
        	Вернутся на главную
      	</button>
			</div>
    </div>
  )
}