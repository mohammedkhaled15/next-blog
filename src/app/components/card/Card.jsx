import Link from "next/link"
import styles from "./card.module.css"
import Image from "next/image"

export default function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={`/p1.jpeg`} alt="post image" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>11.82.2023 - </span>
          <span className={styles.category}>Culture</span>
        </div>
        <Link href="/">
          <h1>Lorem ipsum dolor sit amet consectetur?</h1>
        </Link>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rem sunt vitae, non nam expedita eius quas doloribus sint, minima minus eligendi.</p>
        <Link href="/" className={styles.link}>Read More</Link >
      </div>
    </div>
  )
}
