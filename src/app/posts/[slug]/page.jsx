import Image from "next/image"
import Menu from "../../components/menu/Menu"
import styles from "./singlePage.module.css"
import Comments from "../../components/comments/Comments"
import UserStamp from "../../components/userStamp/UserStamp"
import parse from 'html-react-parser';
import { getSinglePost } from "@/lib/postsActions"

// const getData = async (slug) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/posts/${slug.replaceAll("%20", " ")}`, {
//       cache: "no-store"
//     })
//     return res.json()
//   } catch (error) {
//     console.log(error)
//     throw new Error(error)
//   }
// }

const PostPage = async ({ params }) => {

  const { slug } = params
  console.log("slugFromPage=> ", slug)

  const post = await getSinglePost(slug)
  console.log("post=> ", post)

  return (
    <div className={styles.container}>
      {post?.title &&
        <>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{post.title}</h1>
              <UserStamp position={"post"} username={post?.user?.name} postDate={post?.createdAt} imageUrl={post?.user?.image} />
              <span className={styles.views}>Views: {post.views}</span>
            </div>
            {post.img && <div className={styles.imageContainer}>
              <Image src={post.img} alt="" fill className={styles.image} />
            </div>}
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              {/* <div className={styles.desc} dangerouslySetInnerHTML={{ __html: post.desc }} /> */}
              <div className={styles.desc}  >
                {parse(post.desc)}
              </div>
              <div className={styles.comment}>
                <Comments post={post} />
              </div>
            </div>
            <Menu />
          </div>
        </>
      }
    </div>
  )
}

export default PostPage