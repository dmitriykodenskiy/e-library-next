'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_BOOK_BY_ID } from '@/apollo/queries'
import { Book } from '@/types/book.types'
import styles from './SingleBook.module.css'

export default function BookDetails({ id }: { id: string }) {
    const router = useRouter()
    const imageWidth = 400
    
    const { data, loading, error } = useQuery(GET_BOOK_BY_ID, {
        variables: { id }
    })
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if (!data?.all_book?.items || data?.all_book?.items.length === 0) return <p>No book found</p>

    const { number_of_pages: pages, short_description: desc, title, link, imageConnection: { edges: [{ node: { url } }] } } = data.all_book.items[0] as Book

    return (
        <main className={styles.singleBookPage}>
            <button 
                className={styles.backHome} 
                onClick={() => router.push('/')}
            >
                Home
            </button>
            <section className={styles.singleBookSection}>
                <Image 
                    className={styles.singleBookImg}
                    src={`${url}?width=${imageWidth}`}
                    alt={title}
                    width={imageWidth}
                    height={600}
                    priority
                />
                <div className={styles.bookDesc}>
                    <div className={`${styles.bookTitle} ${styles.bookPageTitle}`}>
                        {title}
                    </div>
                    <div className={styles.shorDesc}>{desc}</div>
                    <div className={styles.pageCount}>Pages: {pages}</div>
                    <a className={styles.getLink} href={link.href}>
                        {link.title}
                    </a>
                </div>
            </section>
        </main>
    )
} 