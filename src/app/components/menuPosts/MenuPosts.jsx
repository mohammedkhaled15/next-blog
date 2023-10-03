import Link from "next/link"
import styles from "./MenuPosts.module.css"
import Image from "next/image"

export default function MenuPosts({ withImages }) {
  return (
    <>
      <h2 className={styles.subtitle}>Chosen By Editor</h2>
      <h1 className={styles.title}>Editor&apos;s Pick</h1>
      <div className={styles.items}>
        <Link href="/" className={styles.item}>
          {withImages && <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="image" fill className={styles.image} />
          </div>}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.travel}`}>Travel</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit..</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
        <Link href="/" className={styles.item}>
          {withImages && <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="image" fill className={styles.image} />
          </div>}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.culture}`}>culture</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit..</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
        <Link href="/" className={styles.item}>
          {withImages && <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="image" fill className={styles.image} />
          </div>}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.food}`}>food</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit..</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
        <Link href="/" className={styles.item}>
          {withImages && <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="image" fill className={styles.image} />
          </div>}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.fashion}`}>fashion</span>
            <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit..</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
