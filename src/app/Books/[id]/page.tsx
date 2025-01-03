import { Metadata } from 'next'
import { getClient } from '@/apollo/client'
import { GET_BOOK_BY_ID } from '@/apollo/queries'
import { BASE_KEYWORDS } from '@/const/metadata'
import BookDetails from '@/components/SingleBook/SingleBook'
import Script from 'next/script'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params
  const { data } = await getClient().query({
    query: GET_BOOK_BY_ID,
    variables: { id }
  })

  const book = data?.all_book?.items[0]
  if (!book) return { title: 'Book Not Found' }

  return {
    title: book.title,
    description: book.short_description,
    keywords: [...BASE_KEYWORDS, book.title, 'book details']
  }
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const { data } = await getClient().query({
    query: GET_BOOK_BY_ID,
    variables: { id }
  })

  const book = data?.all_book?.items[0]
  if (!book) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    description: book.short_description,
    numberOfPages: book.number_of_pages,
    author: {
      '@type': 'Person',
      name: book.authorrefConnection?.edges[0]?.node?.title
    },
    image: book.imageConnection?.edges[0]?.node?.url,
    url: `https://dmitriykodenskiy.github.io/e-library-next/Books/${id}`
  }

  return (
    <>
      <Script
        id="book-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <BookDetails id={id} />
    </>
  )
}
