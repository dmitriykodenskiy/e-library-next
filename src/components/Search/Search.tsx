'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './Search.module.css'

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') || '')
  
  const debouncedSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }
    router.push(`/?${params.toString()}`)
  }, 500)

  const handleSearch = useCallback((term: string) => {
    setValue(term)
    debouncedSearch(term)
  }, [debouncedSearch])

  return (
    <div className={styles.searchWrapper}>
      <input
        type="search"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search books..."
        className={styles.searchInput}
      />
    </div>
  )
} 