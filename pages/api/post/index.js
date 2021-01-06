import { query as q } from 'faunadb'
import { authClient } from '@/lib/fauna'
import nc from 'next-connect'
import cors from 'cors'
import { postSchema } from '@/lib/yup'

const handler = nc().use(cors())

handler.get()

handler.post()
