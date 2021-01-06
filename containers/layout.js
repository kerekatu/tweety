import Header from '@/containers/header'
import Sidebar from '@/containers/sidebar'

const Layout = ({ children, includeSidebar = false }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="grid grid-cols-5 gap-10 mx-auto max-w-5xl px-10">
        {includeSidebar && <Sidebar />}
        <div className={includeSidebar ? 'col-span-3' : 'col-span-full'}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
