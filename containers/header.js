import Link from 'next/link'
import Navbar from '@/components/navbar'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Header = () => {
  const { data: user, mutate: mutateUser } = useSWR('/api/auth/user', fetcher)

  return (
    <header className="border-b border-gray-800 h-20">
      <div className="mx-auto max-w-5xl flex justify-between items-center h-full px-10">
        <div className="text-2xl font-bold">
          <Link href="/">
            <a>Tweety</a>
          </Link>
        </div>
        {user && <Navbar user={user} mutateUser={mutateUser} />}
      </div>
    </header>
  )
}

export default Header
