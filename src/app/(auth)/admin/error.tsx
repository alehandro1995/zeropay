'use client' // Error boundaries must be Client Components
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='min-h-screen w-full'>
			<div className='w-1/3 bg-white rounded-xl shadow-sm p-4 mx-auto mt-10'>
      <h2 className='mb-2 text-2xl font-semibold text-center'>{error.message} - to admin page!</h2>
			<div className='w-full flex items-center justify-around'>
				<button onClick={reset} className='btn-secondary'>Перезагрузить</button>
				<Link href="/admin" className='btn-secondary'>Список пользователей</Link>
			</div>
			</div>
    </div>
  )
}