'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '@/apollo/queries'
import { Book } from '@/types/book.types'
import BooksList from '@/components/BooksList/BooksList'
import Search from '@/components/Search/Search'
import Spinner from '@/components/ui/Spinner/Spinner'
import styles from './page.module.css'

export default function HomePage() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('q')?.toLowerCase() || ''

  const { loading, error, data, fetchMore } = useQuery(ALL_BOOKS, {
    variables: {
      limit: 8,
      skip: 0,
    },
    pollInterval: 30000,
  })

  const filteredBooks = useMemo(() => {
    if (!data?.all_book?.items) return []
    if (!searchTerm) return data.all_book.items

    return data.all_book.items.filter((book: Book) => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.short_description.toLowerCase().includes(searchTerm) ||
      book.authorrefConnection?.edges[0]?.node?.title.toLowerCase().includes(searchTerm)
    )
  }, [data?.all_book?.items, searchTerm])

  if (loading) return <Spinner />
  if (error) return <div className={styles.error}>Error: {error.message}</div>

  return (
    <main className={styles.main}>
      <Search />
      {filteredBooks && (
        <BooksList 
          books={filteredBooks} 
          total={data?.all_book?.total || 0} 
          loadMore={variables => fetchMore({ variables })} 
        />
      )}
    </main>
  )
} 