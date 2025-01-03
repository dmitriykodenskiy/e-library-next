import { Metadata } from 'next'
import HomePage from '@/app/home'
import { BASE_KEYWORDS } from '@/const/metadata'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Browse Books',
  description: 'Explore our collection of digital books',
  keywords: [...BASE_KEYWORDS, 'book catalog', 'digital library'],
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'E-Library Book Collection',
    description: 'Browse our extensive collection of digital books',
    url: 'https://dmitriykodenskiy.github.io/e-library-next',
    publisher: {
      '@type': 'Organization',
      name: 'E-Library',
      url: 'https://dmitriykodenskiy.github.io/e-library-next'
    }
  }

  return (
    <>
      <Script
        id="home-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <HomePage />
    </>
  )
}
