import Layout from '@/containers/layout'
import { getAuthCookie } from '@/lib/auth'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Feed from '@/components/feed'

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req)

  return {
    props: {
      token: token || null,
    },
  }
}

const Profile = ({ token }) => {
  const router = useRouter()

  const { data: currentUser } = useSWR('/api/auth/user')
  const { data: visitedUser } = useSWR(`/api/user/${router.query.user}`)

  return (
    <Layout
      includeSidebar
      sidebarProfile
      isLoggedIn={token && true}
      user={visitedUser}
      currentUser={currentUser}
    >
      <Feed
        feedData={visitedUser?.userPosts}
        username={visitedUser?.username}
        currentUser={currentUser}
        token={token}
      />
    </Layout>
  )
}

export default Profile
