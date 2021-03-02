import React ,{useMemo} from "react"
import {message, Typography, Card, Spin, Button, Input} from 'antd'
import UserLayout from "@src/components/layout/user-layout"
import {useBlogs} from "@src/hooks/blogs"
import {
  useParams
} from "react-router-dom"

const { Meta } = Card
const {Title} = Typography


const BlogsPage: React.FC<any> =({history}) => {
  const { puskes_id } = useParams() as any
  const [{loading, blogs},{deleteBlogAction}] =  useBlogs(false,puskes_id)

  const Cards = useMemo(() => {

    return(
      <div >
        {blogs && blogs.map((_blog: any) => {
          const coverIdx=  Math.floor(Math.random() * _blog.baners.length)
          const cover = _blog.baners[coverIdx]
          return(
            <Card
              onClick={() => {history.push('/blogs-detail/'+ _blog.key)}}
              style={{margin:"24px 8px", padding:"1px"}}
              key={_blog.key}
              actions={[
                <h4  key="detail" style={{margin:0}}>Baca detail </h4>
              ]}
              cover={<img  alt={_blog.title} src={cover} />}
            >
              <Meta
                title={<Title level={3} style={{margin:0}}> {_blog.title} </Title>}></Meta>
            </Card>
          )})}
      </div>
    )
  } , [blogs])

  return(
    <UserLayout name="Program dan Berita">
      {loading ? <Spin></Spin>: Cards}
    </UserLayout>
  )
}

export default BlogsPage