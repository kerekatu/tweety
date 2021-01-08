import { query as q } from 'faunadb'
import { authClient } from '@/lib/fauna'
import { getAuthCookie } from '@/lib/auth'
import nc from 'next-connect'
import cors from 'cors'

const handler = nc().use(cors())

handler.get(async (req, res) => {
  try {
    const token = getAuthCookie(req)

    if (!token)
      return res
        .status(400)
        .send({ success: false, message: 'Auth token not found' })

    const { ref, data } = await authClient(token).query(
      q.Get(q.CurrentIdentity())
    )

    res.status(200).json({ success: true, ...data, id: ref.id })
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
      message: 'Something went wrong, try again later',
    })
  }
})

export default handler
