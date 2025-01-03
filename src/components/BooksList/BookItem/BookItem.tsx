'use client';

import Link from 'next/link';
import Image from 'next/image';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { Book } from '@/types/book.types';
import styles from './BookItem.module.css';

interface BookItemProps {
  bookData: Book;
  isPriority?: boolean;
}

export default function BookItem({ bookData, isPriority = false }: BookItemProps) {
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
  const plainDescription = short_description?.replace(/<[^>]+>/g, '') || '';

  return (
    <li className={styles.bookItem}>
      <figure>
        <div className={styles.imageWrapper}>
          <Link href={`/Books/${uid}`} className={styles.imageLink}>
            {imageUrl && (
              <Image
                src={`${imageUrl}?width=250`}
                alt={title}
                width={250}
                height={375}
                loading={isPriority ? 'eager' : 'lazy'}
                priority={isPriority}
                sizes="(max-width: 768px) 100vw, 250px"
                className={styles.bookImage}
              />
            )}
          </Link>
        </div>
        <figcaption className={styles.bookInfo}>
          <Link href={`/Books/${uid}`} className={styles.titleLink}>
            <h2 className={styles.title}>{title}</h2>
          </Link>
          {author && (
            <Link 
              href={`/Authors/${author.system.uid}`}
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
              {plainDescription}
            </ReactReadMoreReadLess>
          </div>
          {rating ? (
            <div 
              className={styles.rating} 
              style={{ backgroundPositionY: starRatingPosition }}
              aria-label={`Rating: ${rating} out of 5`}
            />
          ) : null}
          <div className={styles.pageCount}>Pages: {number_of_pages}</div>
        </figcaption>
      </figure>
    </li>
  );
}
