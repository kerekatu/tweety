import Link from 'next/link'
import { useRouter } from 'next/router'
import { Down } from '@icon-park/react'

const Navbar = ({ user, mutateUser }) => {
  const router = useRouter()

  const handleLogout = async () => {
    const res = await fetch('api/auth/logout')

    if (res.ok) {
      mutateUser(null)
      router.push('/login')
    }
  }

  return (
    <nav>
      {user && user.success ? (
        <ul className="flex items-center gap-6">
          <li>
            <Link href={`/${user?.username}`}>
              <a className="flex items-center gap-1 font-bold">
                {user?.username}
                <Down size="20" fill="#fff" strokeLinecap="butt" />
              </a>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/login">
              <a className="py-1">Login</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a className="rounded-full bg-blue-600 px-5 py-2 hover:bg-blue-500 transition-colors">
                Sign Up
              </a>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
