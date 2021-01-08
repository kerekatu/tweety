import { query as q } from 'faunadb'
import { authClient } from '@/lib/fauna'
import nc from 'next-connect'
import cors from 'cors'
import { getAuthCookie } from '@/lib/auth'

const handler = nc().use(cors())

handler.get(async (req, res) => {
  try {
    const token = getAuthCookie(req)

    if (!token)
      return res
        .status(400)
        .send({ success: false, message: 'Auth token not found' })

    const feed = await authClient(token).query(
      q.Map(
        q.Paginate(
          q.Join(
            q.Match(
              q.Index('following_by_follower'),
              q.Call(q.Function('getUserRef'), req.query.username)
            ),
            q.Index('posts_by_user')
          )
        ),
        q.Lambda(['ts', 'body', 'ref', 'username'], {
          ts: q.Var('ts'),
          body: q.Var('ref'),
          id: q.Var('body'),
          username: q.Var('username'),
        })
      )
    )

    res
      .status(200)
      .send({ success: true, feed, message: 'Successfully fetched feed data' })
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
      message: 'Something went wrong, try again later',
    })
  }
})

export default handler
