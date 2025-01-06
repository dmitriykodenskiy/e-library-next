import { Metadata } from 'next'
import { getClient } from '@/apollo/client'
import { GET_AUTHOR_BY_ID } from '@/apollo/queries'
import { BASE_KEYWORDS } from '@/const/metadata'
import AuthorPage from './AuthorPage'
import Script from 'next/script'

export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params
    .then(({ id }) => {
      return getClient().query({
        query: GET_AUTHOR_BY_ID,
        variables: { uid: id }
      });
    })
    .then(({ data }) => {
      const author = data?.all_author?.items[0];
      if (!author) {
        return { title: 'Author Not Found' };
      }

      return {
        title: author.title,
        description: `Books and information about ${author.title}`,
        keywords: [...BASE_KEYWORDS, author.title, 'author', 'writer']
      };
    });
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return params
    .then(({ id }) => {
      return getClient().query({
        query: GET_AUTHOR_BY_ID,
        variables: { uid: id }
      }).then(({ data }) => ({ id, data }));
    })
    .then(({ id, data }) => {
      const author = data?.all_author?.items[0];
      if (!author) return null;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.title,
        description: author.description?.json,
        image: author.imageConnection?.edges[0]?.node?.url,
        url: `https://dmitriykodenskiy.github.io/e-library-next/Authors/${id}`
      };

      return (
        <>
          <Script
            id="author-schema"
            type="application/ld+json"
            strategy="beforeInteractive"
          >
            {JSON.stringify(jsonLd)}
          </Script>
          <AuthorPage id={id} />
        </>
      );
    });
}
