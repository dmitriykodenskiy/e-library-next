import { Metadata } from 'next'
import HomePage from '@/app/home'
import { BASE_KEYWORDS } from '@/const/metadata'

export const metadata: Metadata = {
  title: 'Browse Books',
  description: 'Explore our collection of digital books',
  keywords: [...BASE_KEYWORDS, 'book catalog', 'digital library'],
}

export default function Page() {
  return <HomePage />
}
