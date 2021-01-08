import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getAuthCookie } from '@/lib/auth'
import { getPost } from '@/lib/api'
import Layout from '@/containers/layout'

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req)

  return {
    props: {
      token: token || null,
    },
  }
}

const Post = ({ token }) => {
  const [post, setPost] = useState(null)
  const router = useRouter()

  return <Layout includeSidebar></Layout>
}

export default Post
