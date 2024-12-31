import { ApolloClient, InMemoryCache } from '@apollo/client'
import { typePolicies } from './typePolicies'
const APP_API_KEY = process.env.NEXT_PUBLIC_APIKEY
const DELIVERY_TOKEN = process.env.NEXT_PUBLIC_DELIVERY_TOKEN
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT

if (!DELIVERY_TOKEN) {
  throw new Error('DELIVERY_TOKEN environment variable is required');
}

const client = new ApolloClient({
    uri: `https://graphql.contentstack.com/stacks/${APP_API_KEY}?environment=${ENVIRONMENT}`,
    headers: {
      access_token: DELIVERY_TOKEN || '',
    },
    cache: new InMemoryCache({ typePolicies }),
})

export default client