import Link from 'next/link'
import { Home, Play, Peoples } from '@icon-park/react'

const Sidebar = ({ sidebarProfile, isLoggedIn, user, currentUser }) => {
  const handleFollowUser = async () => {
    if (!user || !currentUser) return

    try {
      const res = await fetch('/api/relationship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          follower: currentUser.username,
          following: user.username,
        }),
      })

      if (res.ok) {
        console.log('todo: do something after follow')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <aside className="col-span-5 md:col-span-1">
      {sidebarProfile && (
        <div className="static flex flex-col items-center justify-center bg-gray-800 rounded-b-lg py-6 md:sticky md:top-0">
          <p className="font-bold text-lg break-all px-6 text-center leading-5">
            {user && user.username}
          </p>
          {currentUser && user && currentUser.username !== user.username && (
            <button
              role="button"
              className="bg-blue-600 py-1 px-4 mt-4 rounded-lg hover:bg-blue-500 transition-colors"
              onClick={handleFollowUser}
            >
              Follow
            </button>
          )}
        </div>
      )}

      {isLoggedIn && (
        <ul className="fixed justify-around left-0 py-2 px-6 w-full bg-gray-800 bottom-0 flex gap-2 font-bold text-lg md:my-6 md:flex-col md:static md:min-w-min md:bg-transparent md:p-0">
          <li>
            <Link href="/">
              <a
                className="flex items-center gap-3 hover:text-blue-500 transition-colors"
                title="Home"
              >
                <Home theme="outline" size="22" fill="#fff" />
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/explore">
              <a
                className="flex items-center gap-3 hover:text-blue-500 transition-colors"
                title="Explore"
              >
                <Play theme="outline" size="22" fill="#fff" />
                Explore
              </a>
            </Link>
          </li>
          <li>
            <Link href="/followers">
              <a
                className="flex items-center gap-3 hover:text-blue-500 transition-colors"
                title="Followers"
              >
                <Peoples theme="outline" size="22" fill="#fff" />
                Followers
              </a>
            </Link>
          </li>
        </ul>
      )}
    </aside>
  )
}

export default Sidebar
