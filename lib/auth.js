import { serialize, parse } from 'cookie'

const TOKEN_AUTH_NAME = 'example/tweety'
const MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export const serializeAuthCookie = (res, token) => {
  const cookie = serialize(TOKEN_AUTH_NAME, token, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
    httpOnly: true,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export const removeAuthCookie = (res) => {
  const cookie = serialize(TOKEN_AUTH_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export const getAuthCookie = (req) => {
  if (req.cookies) return req.cookies[TOKEN_AUTH_NAME]

  // parse for pages, above works only with API routes
  const cookies = parse(req.header?.cookie || '')
  return cookies[TOKEN_AUTH_NAME]
}
