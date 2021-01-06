import Layout from '@/containers/layout'
import { getAuthCookie } from '@/lib/auth'
import { gql } from 'graphql-request'
import { graphQLClient } from '@/lib/graphql'
import useSWR from 'swr'
import AddPost from '@/components/add-post'

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req)

  return {
    props: {
      token: token || null,
    },
  }
}

const Profile = ({ token }) => {
  const fetcher = async (query) => await graphQLClient(token).request(query)

  const { data: user, mutate: mutateUser } = useSWR('/api/auth/user')
  const { data: userPosts, error, mutate } = useSWR(
    gql`
      {
        allPosts {
          data {
            _id
            body
            owner {
              _id
            }
          }
        }
      }
    `,
    fetcher
  )

  if (!userPosts) return <div>Loading...</div>

  console.log(userPosts)

  return (
    <Layout includeSidebar>
      <div className="flex flex-col gap-y-8">
        <AddPost user={user} token={token} />
        <ul className="flex gap-y-6">
          {userPosts.allPosts.data.map((post) => (
            <li
              className="border p-6 rounded-lg w-full border-gray-700 bg-gray-800"
              key={post._id}
            >
              <div>{post.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Profile
