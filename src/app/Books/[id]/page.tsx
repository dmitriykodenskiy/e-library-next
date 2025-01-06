import { Metadata } from 'next'
import { getClient } from '@/apollo/client'
import { GET_BOOK_BY_ID } from '@/apollo/queries'
import { BASE_KEYWORDS } from '@/const/metadata'
import BookDetails from '@/components/SingleBook/SingleBook'
import Script from 'next/script'

export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params
    .then(({ id }) => {
      return getClient().query({
        query: GET_BOOK_BY_ID,
        variables: { id },
      });
    })
    .then(({ data }) => {
      const book = data?.all_book?.items[0];
      if (!book) {
        return { title: 'Book Not Found' };
      }
      return {
        title: book.title,
        description: book.short_description,
        keywords: [...BASE_KEYWORDS, book.title, 'book details'],
      };
    });
}

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  return params
    .then(({ id }) => {
      return getClient().query({
        query: GET_BOOK_BY_ID,
        variables: { id },
      }).then(({ data }) => ({ id, data }));
    })
    .then(({ id, data }) => {
      const book = data?.all_book?.items[0];
      if (!book) return null;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: book.title,
        description: book.short_description,
        numberOfPages: book.number_of_pages,
        author: {
          '@type': 'Person',
          name: book.authorrefConnection?.edges[0]?.node?.title,
        },
        image: book.imageConnection?.edges[0]?.node?.url,
        url: `https://dmitriykodenskiy.github.io/e-library-next/Books/${id}`,
      };

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
      );
    });
}

