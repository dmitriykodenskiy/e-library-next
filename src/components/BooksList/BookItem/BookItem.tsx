'use client';

import Link from 'next/link';
import Image from 'next/image';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { Book } from '@/types/book.types';
import styles from './BookItem.module.css';

interface BookItemProps {
  bookData: Book;
}

export default function BookItem({ bookData }: BookItemProps) {
  const {
    title,
    rating,
    imageConnection,
    authorrefConnection,
    short_description,
    number_of_pages,
    system: { uid },
  } = bookData;

  let starRatingPosition;
  switch (rating) {
    case 1:
      starRatingPosition = '-230px';
      break;
    case 2:
      starRatingPosition = '-180px';
      break;
    case 3:
      starRatingPosition = '-123px';
      break;
    case 4:
      starRatingPosition = '-70px';
      break;

    case 5:
      starRatingPosition = '-15px';
      break;

    default:
      break;
  }
  const imageUrl = imageConnection?.edges[0]?.node?.url;
  const author = authorrefConnection?.edges[0]?.node;
  const authorId = author?.system.uid;

  return (
    <li className={styles.bookItem}>
      <figure>
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
          </div>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.bookInfo}>
          {author && (
              <Link 
                  href={`/Authors/${authorId}`} 
                  className={styles.author}
              >
                  {author.title}
              </Link>
          )}
          <div className={styles.shortDesc}>
            <ReactReadMoreReadLess
              charLimit={200}
              readMoreText={'Read more'}
              readLessText={'Read less'}
              readMoreClassName='readMore'
              readLessClassName='readLess'
            >
              {short_description}
            </ReactReadMoreReadLess>
          </div>
          {rating ? (
            <div
              className={styles.rating}
              style={{ backgroundPositionY: starRatingPosition }}
            ></div>
          ) : null}
          <div className={styles.pageCount}>Pages: {number_of_pages}</div>
        </div>
      </figure>
    </li>
  );
}
