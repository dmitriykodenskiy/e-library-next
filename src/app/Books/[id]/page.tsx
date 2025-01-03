import type { Metadata } from 'next'
import BookDetails from '@/components/SingleBook/SingleBook';
import { getClient } from '@/apollo/client'
import { GET_BOOK_BY_ID } from '@/apollo/queries'
import { BASE_KEYWORDS } from '@/const/metadata';

type BookPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await getClient().query({
    query: GET_BOOK_BY_ID,
    variables: { id },
  })

  const book = data?.all_book?.items[0]

  if (!book) {
    return {
      title: 'Book Not Found'
    }
  }
  
  return {
    title: book.title,
    description: book.short_description,
    keywords: [...BASE_KEYWORDS, book.authorrefConnection?.edges[0]?.node?.title]
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  return <BookDetails id={id} />;
}
