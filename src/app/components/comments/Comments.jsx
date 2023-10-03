import Image from "next/image"
import styles from "./comments.module.css"
import Link from "next/link"
import UserStamp from "../userStamp/UserStamp"

export default function Comments() {
  const status = "authinticated"
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {
        status === "authinticated"
          ? (
            <div className={styles.writeComment}>
              <textarea placeholder="Write a comment... " className={styles.input}></textarea>
              <button className={styles.button}>Send</button>
            </div>
          )
          : <Link href="/login">Login to write a comment</Link>
      }
      <div className={styles.comments}>
        <div className={styles.comment}>
          <UserStamp username="John Doe" postDate="01.05.1990" imageUrl="/p1.jpeg" />
          <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut vel quam! Nihil temporibus ut veritatis rem hic ipsa vel eum laborum beatae, incidunt adipisci ratione ex, quo, deleniti necessitatibus!</p>
        </div>
        <div className={styles.comment}>
          <UserStamp username="John Doe" postDate="01.05.1990" imageUrl="/p1.jpeg" />
          <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut vel quam! Nihil temporibus ut veritatis rem hic ipsa vel eum laborum beatae, incidunt adipisci ratione ex, quo, deleniti necessitatibus!</p>
        </div>
        <div className={styles.comment}>
          <UserStamp username="John Doe" postDate="01.05.1990" imageUrl="/p1.jpeg" />
          <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut vel quam! Nihil temporibus ut veritatis rem hic ipsa vel eum laborum beatae, incidunt adipisci ratione ex, quo, deleniti necessitatibus!</p>
        </div>
        <div className={styles.comment}>
          <UserStamp username="John Doe" postDate="01.05.1990" imageUrl="/p1.jpeg" />
          <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut vel quam! Nihil temporibus ut veritatis rem hic ipsa vel eum laborum beatae, incidunt adipisci ratione ex, quo, deleniti necessitatibus!</p>
        </div>
      </div>
    </div>
  )
}
