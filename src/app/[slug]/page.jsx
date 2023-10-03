import Image from "next/image"
import Menu from "../components/menu/Menu"
import styles from "./singlePage.module.css"
import Comments from "../components/comments/Comments"
import UserStamp from "../components/userStamp/UserStamp"

export default function page() {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
          <UserStamp username="John Doe" postDate="01.05.1990" imageUrl="/p1.jpeg" />
        </div>
        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.desc}>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere necessitatibus, ipsa recusandae repudiandae harum ducimus error, itaque dicta culpa dolorum, reprehenderit autem soluta. Iste obcaecati itaque voluptatibus voluptates, ut dignissimos?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo corrupti dolor accusantium! Ex saepe mollitia laborum, aspernatur delectus ullam. Eum dolores voluptate pariatur molestias quisquam? Dolorum quas maiores optio quidem?</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam sunt sit unde! Eaque aliquid odio at provident magni eius tenetur modi maiores quas! Enim itaque ad, hic ducimus optio pariatur?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit exercitationem fugit veniam. Ratione asperiores cupiditate tempore, quas nulla laudantium. Inventore ex fuga amet tenetur, laudantium iste assumenda fugiat repellat!</p>
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  )
}
