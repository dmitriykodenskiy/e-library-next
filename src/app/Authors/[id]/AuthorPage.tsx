'use client'

import { SingleAuthor } from "@/components/SingleAuthor/SingleAuthor"

export default function AuthorPage({ id }: { id: string }) {
  return <SingleAuthor uid={id} />
} 