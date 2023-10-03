import Link from 'next/link'
import styles from "./menuCategories.module.css"

export default function MenuCategories() {
  return (
    <>
      <h2 className={styles.subtitle}>discover By Topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.categoryList}>
        <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.fashion}`}>fashion</Link>
        <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.travel}`}>travel</Link>
        <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.culture}`}>culture</Link>
        <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.food}`}>food</Link>
        <Link href="/blog?cat=style" className={`${styles.categoryItem} ${styles.coding}`}>coding</Link>
      </div>
    </>
  )
}
