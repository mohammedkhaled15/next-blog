import Link from "next/link"
import styles from "./categoryList.module.css"
import Image from "next/image"


const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed")
  }
  return res.json()
}

const CategoryList = async () => {
  const categories = await getData()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories?.map(cat => (
          <Link key={cat._id} href="/blog?cat=style" className={`${styles.category} ${styles[cat.title]}`}>
            {cat.img && <Image src={cat.img} alt="category image" width={32} height={32} className={styles.image} />}
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList