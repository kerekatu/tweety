import { query as q } from 'faunadb'
import { authClient } from '@/lib/fauna'
import { getAuthCookie, removeAuthCookie } from '@/lib/auth'

export default async (req, res) => {
  try {
    const token = getAuthCookie(req)
    if (!token) return res.status(200).end()

    await authClient(token).query(q.Logout(false))
    removeAuthCookie(res)
    res.status(200).send({ success: true, message: 'Successfully logged out' })
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, error, message: 'Could not log you out' })
  }
}
