import { getAuthCookie } from '@/lib/auth'
import Layout from '@/containers/layout'
import AddPost from '@/components/add-post'
import useSWR from 'swr'

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req)

  return {
    props: {
      token: token || null,
    },
  }
}

const HomePage = ({ token }) => {
  const { data: user } = useSWR('/api/auth/user')

  return (
    <Layout includeSidebar>
      {token && <AddPost user={user} token={token} />}
    </Layout>
  )
}

export default HomePage
