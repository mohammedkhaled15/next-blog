import Pagination from "../pagination/Pagination"
import styles from "./cardList.module.css"
import Card from "../card/Card"
import { getAllPosts } from "@/lib/postsActions"

// const getData = async (page, cat) => {
//   try {
//     const res = await fetch(`/api/posts?page=${page || 1}&cat=${cat || ""}`, { cache: "no-store" })
//     return res.json()
//   } catch (error) {
//     console.log(error)
//     throw new Error(error)
//   }
// }

const CardList = async ({ page, cat }) => {
  const { posts, count, POSTS_PER_PAGE } = await getAllPosts(page, cat)
  // console.log("posts=>", posts)
  const hasNext = POSTS_PER_PAGE * (page - 1) + POSTS_PER_PAGE < count
  const hasPrev = POSTS_PER_PAGE * (page - 1) > 0
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        <Card posts={posts} />
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  )
}
export default CardList
