import Image from "next/image"
import styles from "./footer.module.css"
import Link from "next/link"

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image className={styles.logoImage} src="/logo.png" alt="" width={50} height={50} />
          <h1 className={styles.logoText}>Mohammed Khaled Blog</h1>
        </div>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem odit nostrum animi ex minus perferendis tempora eius consequatur sequi corporis doloremque, quod saepe dolorem. Debitis quasi qui tenetur omnis cum.</p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">styles</Link>
          <Link href="/">fshion</Link>
          <Link href="/">coding</Link>
          <Link href="/">travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">facebook</Link>
          <Link href="/">instagram</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
      </div>
    </div>
  )
}
