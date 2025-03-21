import Link from 'next/link';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='pl-[240px]'>
      <aside className='w-[240px] fixed inset-y-0 left-0 z-50 bg-gray-100'>
        <div className='text-center font-bold text-lg/none py-6 border-b'>
          <Link href='/'>
            Next.js Playground
          </Link>
        </div>
        <ul className='space-y-2 p-4'>
          <li>
            <Link href='/sample/suspense_fetch' className='underline'>
              Suspense Data Fetching
            </Link>
          </li>
        </ul>
      </aside>
      <main className='p-6'>
        {children}
      </main>
    </div>
  )
}
