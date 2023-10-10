"use client"
import { signIn, useSession } from "next-auth/react"
import styles from "./login.module.css"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const { data, status } = useSession()

  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  if (status === "loading") {
    return <div className={styles.loading}>Loading . . .</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.social}>
          <div className={styles.socialButton} onClick={() => signIn("google", { callbackUrl: from })}>Sign in with Google</div>
          <div className={styles.socialButton} onClick={() => signIn("github", { callbackUrl: from })}>Sign in with Github</div>
          {/* <div className={styles.socialButton}>Sign in with Facebook</div> */}
        </div>
      </div>
    </div>
  )
}
