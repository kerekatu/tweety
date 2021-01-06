import { query as q } from 'faunadb'
import { guestClient } from '@/lib/fauna'
import { serializeAuthCookie } from '@/lib/auth'
import nc from 'next-connect'
import cors from 'cors'
import { userSchema } from '@/lib/yup'

const handler = nc().use(cors())

handler.post(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ success: false, message: 'Missing email or password' })
  }

  try {
    const isBodyValid = await userSchema.isValid({
      email: req.body.email,
      password: req.body.password,
    })

    if (isBodyValid) {
      const login = await guestClient.query(
        q.Login(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email)), {
          password: req.body.password,
        })
      )

      if (!login.secret)
        return res
          .status(400)
          .send({ success: false, message: 'Login secret is missing' })

      serializeAuthCookie(res, login.secret)

      res.status(200).send({ success: true, message: 'Successfully logged in' })
    } else {
      userSchema
        .validate({
          email: req.body.email,
          password: req.body.password,
        })
        .catch((error) => {
          return res.status(400).send({ success: false, message: error })
        })
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
      message: 'Wrong email or password',
    })
  }
})

export default handler
