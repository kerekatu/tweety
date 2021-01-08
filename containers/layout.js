import Header from '@/containers/header'
import Sidebar from '@/containers/sidebar'

const Layout = ({
  children,
  includeSidebar = false,
  sidebarProfile = false,
  isLoggedIn,
  user,
  currentUser,
}) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="grid grid-cols-5 gap-y-10 mx-auto max-w-5xl px-10 md:gap-5 lg:gap-10">
        {includeSidebar && (
          <Sidebar
            sidebarProfile={sidebarProfile}
            isLoggedIn={isLoggedIn}
            user={user}
            currentUser={currentUser}
          />
        )}
        <div
          className={
            includeSidebar
              ? 'col-span-5 md:col-span-4 lg:col-span-3'
              : 'col-span-full'
          }
        >
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
