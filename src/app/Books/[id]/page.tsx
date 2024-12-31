import BookDetails from '@/components/SingleBook/SingleBook'

type BookPageProps = {
  params: { id: string }
}

export default async function BookPage({ params }: BookPageProps) {
    const { id } = await params;
    return <BookDetails id={id} />
}
