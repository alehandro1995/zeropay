import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 mt-40 bg-white text-gray-800 w-1/2 p-5 rounded-2xl shadow-md mx-auto">
      <h2 className='text-2xl'>Ошибка 404</h2>
			<h4 className='text-lg'>Страница удалена или не существует!</h4>
			<Link href="/" className="btn-secondary">Вернутся на главну</Link>
    </div>
  )
}