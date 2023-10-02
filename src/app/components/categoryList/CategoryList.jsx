import Link from "next/link"
import styles from "./categoryList.module.css"
import Image from "next/image"

const cats = ["style", "coding", "travel", "food", "fashion"]

export default function CategoryList() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {cats.map(cat => (
          <Link key={cat} href="/blog?cat=style" className={`${styles.category} ${styles[cat]}`}>
            <Image src={`/${cat}.png`} alt="category image" width={32} height={32} className={styles.image} />
            {cat}
          </Link>
        ))}
      </div>
    </div>
  )
}
