'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/types/book.types'
import styles from './BookItem.module.css'

interface BookItemProps {
    bookData: Book
}

export default function BookItem({ bookData }: BookItemProps) {
    const { 
        title, 
        rating, 
        imageConnection, 
        authorrefConnection,
        system: { uid }
    } = bookData

    const imageUrl = imageConnection?.edges[0]?.node?.url
    const author = authorrefConnection?.edges[0]?.node

    return (
        <li className={styles.bookItem}>
            <Link href={`/Books/${uid}`} className={styles.bookLink}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageUrl || '/placeholder.jpg'}
                        alt={title}
                        width={250}
                        height={350}
                        className={styles.bookImage}
                        priority
                    />
                    <div className={styles.rating}>{rating}</div>
                </div>
                <div className={styles.bookInfo}>
                    <h2 className={styles.title}>{title}</h2>
                    {/* {author && (
                        <Link 
                            href={`/Authors/${author.url}`} 
                            className={styles.author}
                        >
                            {author.title}
                        </Link>
                    )} */}
                </div>
            </Link>
        </li>
    )
}