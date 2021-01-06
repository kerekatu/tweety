import { query as q } from 'faunadb'
import { guestClient } from '@/lib/fauna'
import { serializeAuthCookie } from '@/lib/auth'
import nc from 'next-connect'
import cors from 'cors'
import { userSchema } from '@/lib/yup'

const handler = nc().use(cors())

handler.post(async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).send({
      success: false,
      message: 'Email, password and username must be provided',
    })
  }

  try {
    const isBodyValid = await userSchema.isValid({
      isUsernameRequired: true,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    })

    if (isBodyValid) {
      const existingEmail = await guestClient.query(
        q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email)))
      )
      const existingUsername = await guestClient.query(
        q.Exists(
          q.Match(q.Index('user_by_username'), q.Casefold(req.body.username))
        )
      )

      if (existingEmail || existingUsername) {
        return res.status(400).send({
          success: false,
          message: 'User already exists',
        })
      }

      const user = await guestClient.query(
        q.Create(q.Collection('User'), {
          credentials: { password: req.body.password }, // handles bcrypt hash on its own
          data: { email: req.body.email, username: req.body.username },
        })
      )

      if (!user.ref)
        return res
          .status(400)
          .send({ success: false, message: 'There is no user reference' })

      const login = await guestClient.query(
        q.Login(user.ref, {
          password: req.body.password,
        })
      )

      if (!login.secret)
        return res
          .status(400)
          .send({ success: false, message: 'Login secret is missing' })

      serializeAuthCookie(res, login.secret)

      res.status(200).send({ success: true, message: 'Successfully signed up' })
    } else {
      userSchema
        .validate({
          isUsernameRequired: true,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        })
        .catch((error) => {
          return res.status(400).send({ success: false, message: error })
        })
    }
  } catch (error) {
    res
      .status(400)
      .send({
        success: false,
        error,
        message: 'Something went wrong, please try again later',
      })
  }
})

export default handler
