import { MetadataRoute } from 'next'
import { getClient } from '@/apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from '@/apollo/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dmitriykodenskiy.github.io/e-library-next'

  // Fetch all books
  const { data: booksData } = await getClient().query({
    query: ALL_BOOKS,
    variables: { limit: 100, skip: 0 }
  })

  // Fetch all authors
  const { data: authorsData } = await getClient().query({
    query: ALL_AUTHORS,
    variables: { limit: 100, skip: 0 }
  })

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Dynamic book routes
  const bookRoutes = booksData?.all_book?.items.map((book) => ({
    url: `${baseUrl}/Books/${book.system.uid}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || []

  // Dynamic author routes
  const authorRoutes = authorsData?.all_author?.items.map((author) => ({
    url: `${baseUrl}/Authors/${author.system.uid}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || []

  return [...routes, ...bookRoutes, ...authorRoutes]
} 