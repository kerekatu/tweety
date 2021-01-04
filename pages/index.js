import { getAuthCookie } from '@/lib/auth'
import Layout from '@/containers/layout'

export async function getServerSideProps(req, res) {
  const token = getAuthCookie(req)

  return {
    props: {
      token: token || null,
    },
  }
}

const HomePage = () => {
  return <Layout>dupa</Layout>
}

export default HomePage
