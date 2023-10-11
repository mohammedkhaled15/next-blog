"use client"
import styles from "./comments.module.css"
import Link from "next/link"
import UserStamp from "../userStamp/UserStamp"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Comments({ post }) {

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: comments, mutate, isLoading } = useSWR(`/api/comments?postSlug=${post?.slug}`, fetcher)

  const { status } = useSession()
  const pathName = usePathname()

  const [desc, setDesc] = useState("")
  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug: post.slug }),
    })
    setDesc("")
    mutate()
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {
        status === "authenticated"
          ? (
            <div className={styles.writeComment}>
              <textarea
                placeholder="Write a comment... "
                className={styles.input}
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              ></textarea>
              <button className={styles.button} onClick={handleSubmit}>Send</button>
            </div>
          )
          : <Link href={`/login?from=${pathName}`} className={styles.loginLink} >Login to write a comment</Link>
      }
      <div className={styles.comments}>
        {
          isLoading ? "Loading..." : comments?.map(comment => {
            return (
              <div className={styles.comment} key={comment._id}>
                <UserStamp position={"comment"} username={comment?.user?.name} postDate={comment.createdAt} imageUrl={comment?.user?.image} />
                <p className={styles.desc}>{comment.desc}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
