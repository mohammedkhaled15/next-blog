"use client"
import styles from "./comments.module.css"
import Link from "next/link"
import UserStamp from "../userStamp/UserStamp"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { redirect } from "next/dist/server/api-utils"
import { usePathname, useRouter } from "next/navigation"

// onClick={() => router.push({ pathName: "/login", query: { from: router.pathName } })}

export default function Comments({ post }) {

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: comments, error, isLoading } = useSWR(`/api/comments?postSlug=${post?.slug}`, fetcher)

  const { status } = useSession()

  const router = useRouter()
  const pathName = usePathname()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {
        status === "authenticated"
          ? (
            <div className={styles.writeComment}>
              <textarea placeholder="Write a comment... " className={styles.input}></textarea>
              <button className={styles.button}>Send</button>
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
