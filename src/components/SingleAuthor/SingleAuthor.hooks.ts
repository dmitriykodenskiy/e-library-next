'use client'

import { useEffect, useMemo } from "react"
import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { GET_AUTHOR_BY_ID } from "@/apollo/queries"
import { initializeAuthorsData } from "@/store/reducers/authorsDataReducer"
import { AppDispatch } from "@/store/store"
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
    const dispatch = useDispatch<AppDispatch>()
    
    const { loading, error, data } = useQuery(GET_AUTHOR_BY_ID, {
        variables: {
            uid
        },
        pollInterval: 30000,
    })
    
    useEffect(() => {
        if (data) {
            dispatch(initializeAuthorsData(data))
        }
    }, [data, dispatch])

    const authorsData = useMemo(() => {
        return data?.all_author?.items[0]
    }, [data])

    return { loading, error, authorsData }
}