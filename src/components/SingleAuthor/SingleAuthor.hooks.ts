'use client'

import { useMemo } from "react"
import { useQuery } from '@apollo/client'
import { GET_AUTHOR_BY_ID } from "@/apollo/queries"
import { Author } from "@/types/author.types"

interface UseAuthorProps {
  uid: string
}

interface UseAuthorReturn {
  loading: boolean
  error?: Error
  authorsData?: Author
}

export const useAuthor = ({ uid }: UseAuthorProps): UseAuthorReturn => {
    
    const { loading, error, data } = useQuery(GET_AUTHOR_BY_ID, {
        variables: {
            uid
        },
        pollInterval: 300 * 1000,
    })

    const authorsData = useMemo(() => {
        return data?.all_author?.items[0]
    }, [data])

    return { loading, error, authorsData }
}