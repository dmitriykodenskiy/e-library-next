import { Metadata } from 'next'
import { getClient } from '@/apollo/client'
import { GET_AUTHOR_BY_ID } from '@/apollo/queries'
import { BASE_KEYWORDS } from '@/const/metadata'
import AuthorPage from './AuthorPage'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await getClient().query({
    query: GET_AUTHOR_BY_ID,
    variables: { uid: id }
  })

  const author = data?.all_author?.items[0]

  if (!author) {
    return {
      title: 'Author Not Found'
    }
  }

  return {
    title: author.title,
    description: `Books and information about ${author.title}`,
    keywords: [...BASE_KEYWORDS, author.title, 'author', 'writer']
  }
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    return <AuthorPage id={id} />
}