import { graphQLClient } from '@/lib/graphql'
import { gql } from 'graphql-request'

export const createAPost = async (token, user, body) => {
  const mutation = gql`
    mutation CreateAPost($body: String!, $owner: ID!, $username: String!) {
      createPost(
        data: { body: $body, owner: { connect: $owner }, username: $username }
      ) {
        body
        owner {
          _id
        }
        username
      }
    }
  `

  const vars = {
    body,
    owner: user && user.id,
    username: user && user.username,
  }

  try {
    const response = await graphQLClient(token).request(mutation, vars)
    return { success: true, response }
  } catch (error) {
    return { success: false, error: JSON.stringify(error) }
  }
}

export const getPost = async (id) => {
  const query = gql`
    query getPost($id: ID!) {
      findPostByID(id: $id) {
        body
        _ts
        owner {
          _id
        }
      }
    }
  `

  const vars = {
    id,
  }

  try {
    const response = await graphQLClient().request(query, vars)
    return { success: true, response }
  } catch (error) {
    return { success: false, error: JSON.stringify(error) }
  }
}
