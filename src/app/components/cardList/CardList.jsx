import Pagination from "../pagination/Pagination"
import styles from "./cardList.module.css"
import Card from "../card/Card"

const getData = async (page, cat) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts?page=${page || 1}&cat=${cat || ""}`, { cache: "no-store" })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

const CardList = async ({ page, cat }) => {
  const { posts, count, POSTS_PER_PAGE } = await getData(page, cat)

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