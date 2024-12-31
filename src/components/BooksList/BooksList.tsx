'use client'

import { Book as BookType } from '@/types/book.types'
import { LoadMoreVariables } from '@/types/common.types'
import BookItem from './BookItem/BookItem'
import styles from './BooksList.module.css'

interface BooksListProps {
  books: BookType[]
  total: number
  loadMore: (variables: LoadMoreVariables) => void
}

export default function BooksList({ books, total, loadMore }: BooksListProps) {
    const variables: LoadMoreVariables = { 
        limit: 8,
        skip: books?.length || 0
    }
    
    return (
        <main className={styles.booksListContainer}>
            <h1 className={styles.title}>Books</h1>
            <section className={styles.booksSection}>
                <div className={styles.booksWrapper}>
                    <ul className={styles.booksList}>
                        {books?.map((book: BookType) => (
                            <BookItem 
                                bookData={book} 
                                key={book.system.uid}
                            />
                        ))}
                    </ul>
                    {books?.length < total && (
                        <button 
                            className={styles.loadMore} 
                            onClick={() => loadMore(variables)}
                        >
                            Load More
                        </button>
                    )}
                </div>
            </section>
        </main>
    )
}