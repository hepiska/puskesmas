import React ,{useMemo, useEffect, useState} from "react"
import {message, Typography, Card, Spin, Button,Image, Input, Carousel} from 'antd'
import UserLayout from "@src/components/layout/user-layout"
import {
  useParams
} from "react-router-dom"
import { addBlog, getBlog, editBlog} from "@src/methods/blogs"


const { Meta } = Card
const {Title} = Typography


const BlogsPage: React.FC<any> =({history}) => {
  const { id } = useParams() as any
  const [loading, setLoading] =  useState(false)
  const [blog, setBlog] = useState(null)
  useEffect(() => {
    setLoading(true)
    getBlog(id).then((_blog) => {
      setBlog(_blog)
      setLoading(false)

    })
    
  }, [id])
  return(
    <UserLayout name="Program dan Berita">
      {loading && <Spin /> }
      {blog ?  (<div style={{width: '100%', margin:"0px 0px 24px"}}>
        <Title level={3} style={{margin:"0px 8px 24px"}}>{blog.title}</Title>
        { blog.baners && (
          <Carousel>
            {blog.baners.map((baner:any) => {
              return <Image src={baner}  key={baner} alt={"gambar puskesmas"} width="100%"></Image>
            })}
          </Carousel>
        )}  
        <div style={{padding:"0px 8px", margin:"16px 0px"}} dangerouslySetInnerHTML={{__html: blog.content}} />  
      </div>) : loading ? null : <h3>Ada Masalah</h3>}
    </UserLayout>
  )
}

export default BlogsPage