'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_BOOK_BY_ID } from '@/apollo/queries';
import parse from 'html-react-parser';
import { Book } from '@/types/book.types';
import styles from './SingleBook.module.css';
import Spinner from '@/components/ui/Spinner/Spinner';

export default function BookDetails({ id }: { id: string }) {
  const router = useRouter();
  const imageWidth = 400;

  const { data, loading, error } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
    pollInterval: 300000,
  });

  if (loading) return <Spinner />;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;
  if (!data?.all_book?.items[0]) return <div>Book not found</div>;

  const {
    number_of_pages: pages,
    short_description: desc,
    title,
    link,
    imageConnection: {
      edges: [{ node: { url } }]
    }
  } = data.all_book.items[0] as Book;

  return (
    <main className={styles.singleBookPage}>
      <button className={styles.backHome} onClick={() => router.push('/')}>
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
          sizes="(max-width: 768px) 300px, 400px"
        />
        <div className={styles.bookDesc}>
          <h1 className={`${styles.bookTitle} ${styles.bookPageTitle}`}>{title}</h1>
          <div className={styles.shorDesc}>{parse(desc)}</div>
          <div className={styles.pageCount}>Pages: {pages}</div>
          <a className={styles.getLink} href={link.href}>
            {link.title}
          </a>
        </div>
      </section>
    </main>
  );
}
