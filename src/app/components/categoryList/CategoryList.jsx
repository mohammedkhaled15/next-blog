import Link from "next/link"
import styles from "./categoryList.module.css"
import Image from "next/image"
import { getCategories } from "@/lib/categoriesActions"


// const getData = async () => {
//   try {
//     const res = await fetch("/api/categories", { cache: "no-store" })
//     return res.json()

//   } catch (error) {
//     throw new Error(error)
//   }
// }

const CategoryList = async () => {
  const categories = await getCategories()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories?.map(cat => (
          <Link key={cat._id} href={`/blog?cat=${cat.slug}`} className={`${styles.category} ${styles[cat.title]}`}>
            {cat.img && <Image src={cat.img} alt="category image" width={32} height={32} className={styles.image} />}
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
