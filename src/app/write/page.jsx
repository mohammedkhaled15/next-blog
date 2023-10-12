"use client"
import Image from "next/image"
import styles from "./write.module.css"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.bubble.css"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import useSWR from "swr"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase"

//Dynamic import cause this library needs document from browser
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const storage = getStorage(app);

export default function WritePage() {


  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [media, setMedia] = useState("")
  const [title, setTitle] = useState("")

  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectOptions, setSelectOptions] = useState({})
  const [newCats, setNewCats] = useState([])

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: cats, mutate, isLoading } = useSWR(`/api/categories`, fetcher)

  const { status } = useSession()
  const router = useRouter()
  const pathName = usePathname()

  const handleSelectChange = (options, actionMeta) => {
    if (actionMeta.action === "create-option") {
      // when action is create we will create new skills array to update the db with it
      setNewCats((prev) => [...prev, actionMeta.option])
    }
    setSelectedOptions(options)
  }

  useEffect(() => {
    cats && setSelectOptions(cats.map(cat => ({ value: cat.title, label: cat.title, optionIsNew: false })))
  }, [cats])
  console.log("options=>", selectOptions)

  useEffect(() => {
    const uploadFile = () => {

      const uniqueFileName = new Date().getTime() + file.name

      const storageRef = ref(storage, uniqueFileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
          });
        }
      );
    }
    file && uploadFile()
  }, [file])

  const slugify = str =>
    str.toLowerCase()
      .trim()
      // .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$]+/g, "")

  const handleSubmit = async () => {
    if (selectedOptions.optionIsNew === true) {
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ slug: selectedOptions.value, title: selectedOptions.value })
      })
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: slugify(selectedOptions.value)
      })
    })
    console.log("selected=>", selectedOptions)
    console.log("res=>", res.data)
  }

  if (status === "loading") {
    return <div className={styles.loading}>Loading . . .</div>
  }

  if (status === "unauthenticated") {
    router.push(`/login?from=${pathName}`)
  }

  const animatedComponents = makeAnimated();// for animation of selected labels in select input "from docs"

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input} onChange={(e) => setTitle(e.target.value)} />
      <div className={styles.select}>
        <label className={styles.selectLabel} htmlFor="cats">Select Categories</label>
        <CreatableSelect
          // menuPortalTarget={window.document.body}
          id="cats"
          styles={{
            container: (base, state) => ({ ...base, marginTop: "20px", marginBottom: "20px", width: "200px", minHeight: "30px", border: "none" }),
            control: (base) => ({ ...base, minHeight: "25px", backgroundColor: "transparent" }),
            input: (base) => ({ ...base, color: "var(--textColor)" }),
            menu: (base) => ({ ...base, borderRadius: "10px" }),
            singleValue: (base) => ({ ...base, color: "var(--textColor)" }),
            menuList: (base) => ({
              ...base, backgroundColor: "var(--bg)", overflow: "scroll", "::-webkit-scrollbar": {
                width: "4px",
                height: "0px",
              },
              "::-webkit-scrollbar-track": {
                background: "#f1f1f1"
              },
              "::-webkit-scrollbar-thumb": {
                background: "#888"
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#555"
              }
            }),
            option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "var(--softBg)" : "", fontSize: "12px", color: "--var(--textColor)" }),
            multiValueLabel: (base) => ({ ...base, backgroundColor: "#4DB5FF", color: "white", padding: "3px", width: "fit-content" }),
          }}
          options={selectOptions}
          components={animatedComponents}
          closeMenuOnSelect
          onChange={handleSelectChange}
          value={selectedOptions}
        />
      </div>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {
          open && (
            <div className={styles.add}>
              <input
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }} />
              <button className={styles.addButton}>
                <label htmlFor="image">
                  <Image src="/image.png" alt="" width={16} height={16} />
                </label>
              </button>
              <button className={styles.addButton}>
                <Image src="/external.png" alt="" width={16} height={16} />
              </button>
              <button className={styles.addButton}>
                <Image src="/video.png" alt="" width={16} height={16} />
              </button>
            </div>
          )
        }
        <ReactQuill className={styles.textArea} theme="bubble" value={value} onChange={setValue} placeholder="Tell Your Story" />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
}
