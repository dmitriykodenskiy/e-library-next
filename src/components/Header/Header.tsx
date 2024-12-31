'use client'

import { useQuery } from '@apollo/client'
import { HEADER } from '@/apollo/queries'
import Link from 'next/link'
import styles from './Header.module.css'

interface HeaderData {
  all_header: {
    items: [{
      title: string;
      home_link: {
        href: string;
      };
    }];
  };
}

export default function Header() {
    const { loading, error, data } = useQuery<HeaderData>(HEADER)
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    
    const headerData = data?.all_header.items[0]
    if (!headerData) return null

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link className={styles.logo} href="/">
                    {headerData.title}
                </Link>
            </div>
        </header>
    )
}