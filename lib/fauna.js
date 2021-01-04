import faunadb from 'faunadb'

export const guestClient = new faunadb.Client({
  secret: process.env.FAUNA_GUEST_SECRET,
})

export const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

// handles authenticated requests
export const authClient = (secret) => {
  return new faunadb.Client({
    secret,
  })
}
