import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Down } from '@icon-park/react'
import useOnClickOutside from '@/hooks/useOnClickOutside'

const Navbar = ({ user, mutateUser }) => {
  const dropdownRef = useRef(null)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false)
  })

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
        <div className="flex items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            <div
              className={`${
                isOpen ? 'bg-gray-800 rounded-t-lg' : 'rounded-lg'
              } flex items-center gap-1 font-bold cursor-pointer hover:bg-gray-800 py-2 px-4`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {user?.username}
              <Down size="20" fill="#fff" strokeLinecap="butt" />
            </div>
            <ul
              className={`${
                isOpen ? 'flex' : 'hidden'
              } absolute top-10 left-0 flex flex-col bg-gray-800 py-3 px-4 w-full rounded-b-lg z-10 border-t border-gray-700 shadow-md`}
            >
              <li className="py-1 text-gray-300 transition-colors hover:text-white">
                <Link href={`/${user?.username}`}>
                  <a>Profile</a>
                </Link>
              </li>
              <li className="py-1 text-gray-300 transition-colors hover:text-white">
                <button role="button" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
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
