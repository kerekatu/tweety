import { getAuthCookie } from '@/lib/auth'
import Layout from '@/containers/layout'
import AddPost from '@/components/add-post'
import useSWR from 'swr'
import Link from 'next/link'
import Feed from '@/components/feed'

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req)

  return {
    props: {
      token: token || null,
    },
  }
}

const HomePage = ({ token }) => {
  const { data: currentUser } = useSWR('/api/auth/user')
  const { data: feedData } = useSWR(() => `api/feed/${currentUser.username}`)

  return (
    <Layout includeSidebar isLoggedIn={token && true}>
      {token ? (
        <section className="flex flex-col gap-10">
          <Feed
            feedData={feedData && feedData.feed}
            currentUser={currentUser}
            token={token}
          />
        </section>
      ) : (
        <section className="text-center mt-10">
          <h2 className="text-lg font-bold mb-2">
            <Link href="/signup">
              <a
                className="underline text-blue-500 hover:opacity-75 transition-opacity"
                title="Go to Sign up Page"
              >
                Sign up
              </a>
            </Link>{' '}
            or{' '}
            <Link href="/login">
              <a
                className="underline text-blue-500 hover:opacity-75 transition-opacity"
                title="Go to Login Page"
              >
                login
              </a>
            </Link>{' '}
            to view feed and access all features
          </h2>
          <p>
            <ul>
              Missing Features/Things to fix:
              <li>- Email valitation</li>
              <li>- Update follow button after following (+ add unfollow)</li>
              <li>- Add feedback to actions</li>
              <li>- Add username to post schema</li>
              <li>- Explore page should at least show all available posts</li>
              <li>
                - Add limit to number of relationship with the same values
              </li>
              <li>- Comment & Like System</li>
              <li>- Better RWD for mobile</li>
              <li>- List of followers (+ count)</li>
              <li>- A way to delete posts & fetch data on post/[id]</li>
              <li>- Captcha & Limit Rate</li>
              <li>- Abstrations? Maybe?</li>
            </ul>
          </p>
        </section>
      )}
    </Layout>
  )
}

export default HomePage
