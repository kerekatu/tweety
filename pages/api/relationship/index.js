import { query as q } from 'faunadb'
import { authClient } from '@/lib/fauna'
import nc from 'next-connect'
import cors from 'cors'
import { getAuthCookie } from '@/lib/auth'

const handler = nc().use(cors())

handler.post(async (req, res) => {
  try {
    const token = getAuthCookie(req)

    if (!token)
      return res
        .status(400)
        .send({ success: false, message: 'Auth token not found' })

    if (req.body.follower === req.body.following) {
      return res
        .status(400)
        .send({ success: false, message: 'You cannot follow yourself, dummy' })
    }

    // const userData = await authClient(token).query(q.Get(q.CurrentIdentity()))
    // const relationExists = await authClient(token).query(
    //   q.Paginate(
    //     q.Match(
    //       q.Index('following_by_follower'),
    //       q.Call(q.Function('getUserRef'), userData.data.username)
    //     )
    //   )
    // )
    // if (relationExists) {
    //   return res
    //     .status(400)
    //     .send({ success: false, message: 'Relation already exists' })
    // }

    const data = {
      follower: q.Call(q.Function('getUserRef'), req.body.follower),
      following: q.Call(q.Function('getUserRef'), req.body.following),
    }

    const relationship = await authClient(token).query(
      q.Create(q.Collection('Relationship'), { data })
    )

    res.status(200).send({
      success: true,
      relationship,
      message: 'You have successfully followed an user',
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
