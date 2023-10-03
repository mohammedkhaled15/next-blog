import Image from "next/image"
import styles from "./userStamp.module.css"

export default function UserStamp({ username, postDate, imageUrl }) {
  return (
    <div className={styles.user}>
      <div className={styles.userImageContainer}>
        <Image src={imageUrl} alt="" fill className={styles.avatar} />
      </div>
      <div className={styles.userTextContainer}>
        <span className={styles.name}>{username}</span>
        <span className={styles.date}>{postDate}</span>
      </div>
    </div>
  )
}
