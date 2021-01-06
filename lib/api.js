import { graphQLClient } from '@/lib/graphql'
import { gql } from 'graphql-request'

export const createAPost = async (token, user, body) => {
  const mutation = gql`
    mutation CreateAPost($body: String!, $owner: ID!) {
      createPost(data: { body: $body, owner: { connect: $owner } }) {
        body
        owner {
          _id
        }
      }
    }
  `

  const vars = {
    body,
    owner: user && user.id,
  }

  try {
    const response = await graphQLClient(token).request(mutation, vars)
    return { success: true, response }
  } catch (error) {
    return { success: false, error: JSON.stringify(error) }
  }
}
