import { GraphQLClient } from 'graphql-request'

const GRAPHQL_ENDPOINT = 'https://graphql.fauna.com/graphql'

export const graphQLClient = (token) => {
  const secret = token || process.env.NEXT_PUBLIC_FAUNA_GUEST_SECRET

  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `Bearer ${secret}`,
    },
  })
}
