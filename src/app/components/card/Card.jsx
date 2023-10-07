import Link from "next/link"
import styles from "./card.module.css"
import Image from "next/image"

export default function Card({ posts }) {
  return posts?.map(post => (
    <div className={styles.container} key={post._id}>
      {post.img && <div className={styles.imageContainer}>
        <Image src={post.img} alt="post image" fill className={styles.image} />
      </div>}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{post.createdAt.substring(0, 10)} - </span>
          <span className={styles.category}>{post.catSlug}</span>
        </div>
        {console.log("from card", post.slug)}
        <Link href={`/posts/${post.slug.replaceAll("?", "%3F")}`}>
          <h1>{post.title}</h1>
        </Link>
        <p className={styles.desc}>{post.desc.substring(0, 200)}...</p>
        <Link href={`/posts/${post.slug}`} className={styles.link}>Read More</Link >
      </div>
    </div>
  ))
}
