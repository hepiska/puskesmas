import {useState, useEffect} from "react"
import {getBlogs, deleteBlog} from '@src/methods/blogs'


export const useBlogs = ( isSnapShot?: boolean, puskesmas?: string ,limit?: number | undefined) => {
  const [blogs, setBlogs] = useState(null) as any
  const [loading, setLoading] = useState(false) 
  useEffect(() => {
    let getData = getBlogs(puskesmas)
    if(limit){
      getData = getData.limit(limit)
    }

    if(isSnapShot){
      setLoading(true)
      getData.onSnapshot((_snapshot: any) => {
        const data : Array<any> = []
        _snapshot.forEach((_doc: any) => {
          data.push({..._doc.data(), key: _doc.id})
        })
        setBlogs(data)
        setLoading(false)

      })
    }else{
      setLoading(true)
      getData.get().then((_snapshot: any) => {
        const data : Array<any> = []
        _snapshot.forEach((_doc: any) => {
          data.push({..._doc.data(), key: _doc.id})
        })
        setLoading(false)
        setBlogs(data)
      })
    }

  },[puskesmas, isSnapShot, limit])


  const deleteBlogAction = async (blogkey: string) => {
    setLoading(true)
    await deleteBlog(blogkey)
    setLoading(false)
  }

  return [{loading, blogs},{ deleteBlogAction }]
}