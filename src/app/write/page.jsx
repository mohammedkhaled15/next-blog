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
  const [selectOptions, setSelectOptions] = useState([])
  const [newCats, setNewCats] = useState([])

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: cats, mutate, isLoading } = useSWR(`/api/comments`, fetcher)

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
    skills && setSelectOptions(cats)
  }, [cats])

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
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$]+/g, "")

  const handleSubmit = async () => {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title)
      })
    })
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
        <CreatableSelect
          menuPortalTarget={window.document.body}
          id="cats"
          styles={{
            container: (base, state) => ({ ...base, width: "100%", minHeight: "30px", border: "none" }),
            control: (base) => ({ ...base, minHeight: "25px", backgroundColor: "transparent", color: "white" }),
            input: (base) => ({ ...base, color: "white" }),
            menu: (base) => ({ ...base, borderRadius: "10px" }),
            menuList: (base) => ({ ...base, backgroundColor: "#1F1F38", overflow: "scroll" }),
            option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "#4DB5FF" : "", fontSize: "12px" }),
            multiValueLabel: (base) => ({ ...base, backgroundColor: "#4DB5FF", color: "white", padding: "3px", width: "fit-content" }),
          }}
          options={selectOptions}
          components={animatedComponents}
          isMulti={true}
          closeMenuOnSelect
          onChange={handleSelectChange}
          placeholder="Select Or Create new Category..."
          value={selectedOptions}
        />
        <label htmlFor="cats">Select Categories</label>
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
                style={{ display: none }} />
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
