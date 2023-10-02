import Link from "next/link"
import styles from "./menu.module.css"
import Image from "next/image"

export default function Menu() {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>What&apos;s hot</h2>
      <h1>Most Popular</h1>
      <div className={styles.items}>
        <Link href="/" className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src="/p1.jpeg" alt="image" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles.travel}`}>Travel</span>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit..</h3>
            <div className={styles.detail}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
