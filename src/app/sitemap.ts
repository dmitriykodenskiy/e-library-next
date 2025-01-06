import { MetadataRoute } from 'next'
import { getClient } from '@/apollo/client'
import { ALL_BOOKS_SITEMAP, ALL_AUTHORS_SITEMAP } from '@/apollo/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://e-library-next-git-cmsintegration-dmitriykodenskiys-projects.vercel.app?_vercel_share=VYPwuyIPVpn3juSyTuKgZ2bLXrmwqkrt'

  try {
    // Fetch all books
    const { data: booksData } = await getClient().query({
      query: ALL_BOOKS_SITEMAP,
      variables: { limit: 100, skip: 0 }
    })

    // Fetch all authors
    const { data: authorsData } = await getClient().query({
      query: ALL_AUTHORS_SITEMAP
    })

    // Static routes
    const routes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ]

    // Dynamic book routes
    const bookRoutes = (booksData?.all_book?.items || []).map((book: any) => ({
      url: `${baseUrl}/Books/${book.system.uid}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Dynamic author routes
    const authorRoutes = (authorsData?.all_author?.items || []).map((author: any) => ({
      url: `${baseUrl}/Authors/${author.system.uid}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...routes, ...bookRoutes, ...authorRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the home page if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
    ]
  }
} 