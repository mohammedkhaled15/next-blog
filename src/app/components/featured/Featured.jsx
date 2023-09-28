import styles from "./featured.module.css"
import Image from "next/image"

export default function Featured() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b>It's Me, Mohammed Khaled </b>Discover All My great Ideas and Stories</h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="hero" fill />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nulla.</h1>
          <p className={styles.postDesc}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa tenetur recusandae nihil nostrum reprehenderit earum non placeat accusamus similique velit consectetur quis quam eaque quasi, in exercitationem voluptates sint! Recusandae!</p>
          <button>Read More</button>
        </div>
      </div>
    </div>
  )
}
