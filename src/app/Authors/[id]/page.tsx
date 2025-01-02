import { SingleAuthor } from "@/components/SingleAuthor/SingleAuthor"

export default async function AuthorPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    return <SingleAuthor uid={id} />
}