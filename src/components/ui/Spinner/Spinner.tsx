'use client'

import styles from './Spinner.module.css'

export default function Spinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  )
} 