import Link from 'next/link'
import { fromUnixTime, format } from 'date-fns'

const PostCard = ({ post, username }) => {
  return (
    <Link href={`/${username}/post/${post.id}`}>
      <a className="block border py-4 px-6 rounded-lg w-full border-gray-700 bg-gray-800 hover:border-gray-500 hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-3 w-full">
          <div className="block rounded-full p-6 bg-gray-700"></div>
          <div>
            <p className="font-bold text-md text-gray-100">@{username}</p>
            <p className="text-sm text-gray-400">
              {format(
                fromUnixTime(post.ts / 1000000),
                'MMM dd, yyyy - hh:mm a'
              )}
            </p>
          </div>
        </div>

        <div>{post.body}</div>
      </a>
    </Link>
  )
}

export default PostCard
