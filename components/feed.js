import PostCard from '@/components/post-card'
import AddPost from '@/components/add-post'

const Feed = ({ feedData, currentUser, token }) => {
  return (
    <div className="flex flex-col gap-y-8 mb-10">
      <AddPost user={currentUser} token={token} />

      <ul className="flex flex-col gap-y-6">
        {feedData?.data.length === 0 && (
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold mb-2 text-gray-200">Empty? :(</h2>
            <p className="text-lg">No posts to be seen here...</p>
          </div>
        )}

        {feedData?.data.length > 1
          ? feedData.data
              .sort((a, b) => b.ts - a.ts)
              .map((post) => (
                <li key={post?.id} className="w-full">
                  <PostCard post={post} />
                </li>
              ))
          : feedData?.data.length === 1 && <PostCard post={feedData.data[0]} />}
      </ul>
    </div>
  )
}

export default Feed
