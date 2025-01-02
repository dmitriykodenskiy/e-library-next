'use client'

import { jsonToHtml } from "@contentstack/json-rte-serializer";
import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';
import { useAuthor } from './SingleAuthor.hooks'

import styles from './SingleAuthor.module.css'

export const SingleAuthor = ({ uid }: { uid: string }) => {
    const router = useRouter()
    const { loading, error, authorsData } = useAuthor({ uid })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if (!authorsData) return <p>No author found</p>

    const { 
        title, 
        imageConnection,
        description: { json },
        additional_sections = []
    } = authorsData

    const imgUrl = imageConnection.edges[0]?.node?.url ? imageConnection.edges[0]?.node?.url : 'https://images.contentstack.io/v3/assets/blt774c40ef55b77751/blt4d8d45db95fb81f5/642ed050c29b521140116ba4/no_image_icon.png'
    const description = parse(jsonToHtml(json))
    
    return (
        <main className={styles.authorPage}>
            <button className={styles.backHome} onClick={() => router.push('/')}>
                Home
            </button>
            <section className={styles.authorSection}>
                <img className={styles.authorImage} src={imgUrl} alt={title}/>
                <div className={styles.authorDesc}>
                    <div className={styles.authorName}>{title}</div>
                    <div className={styles.shortDesc}>
                        {description}
                    </div>
                </div>
            </section>
        </main>
    )
}
