import styles from "./menu.module.css"
import MenuPosts from "../menuPosts/MenuPosts"
import MenuCategories from "../menuCategories/MenuCategories"

export default function Menu() {
  return (
    <div className={styles.container}>
      <MenuPosts withImages={false} />
      <MenuCategories />
      <MenuPosts withImages={true} />
    </div>
  )
}
