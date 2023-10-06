import Image from "next/image"
import Menu from "../../components/menu/Menu"
import styles from "./singlePage.module.css"
import Comments from "../../components/comments/Comments"
import UserStamp from "../../components/userStamp/UserStamp"

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/posts/${slug}`, {
    cache: "no-store"
  })
  if (!res.ok) {
    throw new Error("Failed")
  }
  return res.json()
}

const postPage = async ({ params }) => {

  const { slug } = params

  const post = await getData(slug)

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post.title}</h1>
          <UserStamp username={post.userEmail} postDate={post.createdAt} imageUrl={post.img} />
        </div>
        {post.img && <div className={styles.imageContainer}>
          <Image src={post.img} alt="" fill className={styles.image} />
        </div>}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.desc}>
            <p >{post.desc}</p>
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

export default postPage