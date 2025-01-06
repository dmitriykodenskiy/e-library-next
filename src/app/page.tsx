import { Suspense } from 'react'
import { Metadata } from 'next'
import HomePage from '@/app/home'
import { BASE_KEYWORDS } from '@/const/metadata'
import Script from 'next/script'
import Spinner from '@/components/ui/Spinner/Spinner'

export const metadata: Metadata = {
  title: 'Browse Books',
  description: 'Explore our collection of digital books',
  keywords: [...BASE_KEYWORDS, 'book catalog', 'digital library'],
  robots: {
    index: true,
    follow: true,
  }
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'E-Library Book Collection',
    description: 'Browse our extensive collection of digital books',
    url: 'https://e-library-next-git-cmsintegration-dmitriykodenskiys-projects.vercel.app?_vercel_share=VYPwuyIPVpn3juSyTuKgZ2bLXrmwqkrt',
    publisher: {
      '@type': 'Organization',
      name: 'E-Library',
      url: 'https://e-library-next-git-cmsintegration-dmitriykodenskiys-projects.vercel.app?_vercel_share=VYPwuyIPVpn3juSyTuKgZ2bLXrmwqkrt'
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
      <Suspense fallback={<Spinner />}>
        <HomePage />
      </Suspense>
    </>
  )
}
