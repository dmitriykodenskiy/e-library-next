'use client'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '@/apollo/queries'

import { LoadMoreVariables } from '@/types/common.types'

import BooksList from '@/components/BooksList/BooksList'

import styles from "./page.module.css";

export default function Home() {
  const { loading, error, data, fetchMore } = useQuery(ALL_BOOKS, {
      variables: {
          limit: 8,
          skip: 0
      }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  const booksData = data?.all_book?.items

  if (!booksData) {
      return <div>No books available</div>
  }
  
  const loadMore = (variables: LoadMoreVariables) => {
      fetchMore({ variables })
  }

  return (
      <main className={styles.main}>
        <BooksList books={booksData} total={data?.all_book?.total} loadMore={loadMore} />
      </main>
  )
}
