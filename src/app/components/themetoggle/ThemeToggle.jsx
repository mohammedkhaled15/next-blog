"use client"
import { useContext } from "react"
import styles from "./themeToggle.module.css"
import Image from "next/image"
import { ThemeContext } from "@/context/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext)
  console.log(theme)
  return (
    <div className={styles.container} onClick={toggle} style={theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }}>
      <Image src="/moon.png" alt="moon" width={14} height={14} />
      <div className={styles.ball} style={theme === "light" ? { right: "1px", backgroundColor: "white" } : { left: "1px", backgroundColor: "#0f172a" }}></div>
      <Image src="/sun.png" alt="sun" width={14} height={14} />
    </div>
  )
}
