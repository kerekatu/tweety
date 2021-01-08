import { query as q } from 'faunadb'
import { guestClient } from '@/lib/fauna'
import nc from 'next-connect'
import cors from 'cors'

const handler = nc().use(cors())

handler.get(async (req, res) => {
  const { query } = req

  try {
    const { ref: userRef, data: userData } = await guestClient.query(
      q.Get(q.Match(q.Index('user_by_username'), query.username))
    )
    delete userData.email

    // weird bug with lambda variables
    const userPosts = await guestClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('posts_by_user'), userRef)),
        q.Lambda(['body', 'ref', 'ts', 'username'], {
          body: q.Var('ts'),
          id: q.Var('ref'),
          ts: q.Var('body'),
          username: q.Var('username'),
        })
      )
    )

    res.status(200).json({
      success: true,
      ...userData,
      id: userRef.id,
      userPosts,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
      message: 'Something went wrong, try again later',
    })
  }
})

export default handler
