"use client"
import styles from "./comments.module.css"
import Link from "next/link"
import UserStamp from "../userStamp/UserStamp"
import { useSession } from "next-auth/react"
import useSWR from "swr"

export default function Comments({ post }) {

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: comments, error, isLoading } = useSWR(`/api/comments?postSlug=${post?.slug}`, fetcher)
  console.log(comments)

  const { status } = useSession()
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
        {
          comments?.map(comment => {
            return (
              <div className={styles.comment} key={comment._id}>
                <UserStamp username={comment?.user?.name} postDate={comment.createdAt} imageUrl={comment?.user?.image} />
                <p className={styles.desc}>{comment.desc}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
