import React, {useEffect, useState} from "react"
import 'react-quill/dist/quill.snow.css'
import { Divider,Form, message,Upload, Button, Input,Typography } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import { upload} from '@src/methods/uploads'
import RichText from "@src/components/atoms/rich-text"
import {
  useParams
} from "react-router-dom"
import { addBlog, getBlog, editBlog} from "@src/methods/blogs"

const { Title } = Typography

const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const AdminBlogDetail  : React.FC<any> = ({ history, location }) => {
  const [loading, setLoading] =  useState(false)
  const [blog, setBlog] = useState(null)
  const { id } = useParams() as any
  useEffect(() => {
    if(id!== "new"){
      getBlog(id).then((_blog) => {
        _blog.baners = _blog.baners?.map((_data : any) => {
          const newData: any = {} 
          newData.uid = _data
          newData.xhr=_data
          newData.url=_data
          return newData
        }) as any
        setBlog(_blog)
      })
    }
  }, [id])

  const onFinish = async (values: any) => {
    values.baners = values.baners.map((_data: any) => _data.xhr)
    try {
      setLoading(true)
      if(id === "new"){
        await addBlog(values)

      }else{
        await editBlog(id,values)
      }
      setLoading(false)
      history.goBack()
    } catch (error) {
      setLoading(false)
      message.error({content: error.message, style:{marginTop: '20vh'}})
    }
  }
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return id === "new" || blog ? (
    <div>
      <Title>Blog {id ? "baru" : ""}</Title>
      <Divider></Divider>
      <Form           
        {...layout}
        onFinish={onFinish}
        layout="vertical"
        initialValues={blog || undefined}
      >
        <Form.Item
          label="Judul"
          name="title"
          rules={[{ required: true, message: 'masukan nama!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Baner"
        >
          <Form.Item name="baners"
            rules={[{ required: true, message: 'masukan baners!' }]}
            valuePropName="fileList"  
            getValueFromEvent={normFile} noStyle>
            <Upload
              listType="picture-card"
              customRequest={async({file, onError, onSuccess}) => { 
                try {
                  const res = await upload(`blogs/image/${file.name}`,file) as any
                  const xhrs : any = res  || ''
                  if(onSuccess)
                    onSuccess({url: res || ''}, xhrs )
                }catch(err){
                  if(onError)
                    onError(err )
                }
                
              }}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Kontent"
          name="content"
          rules={[{ required: true, message: 'masukan kontent!' }]}
        >
          <RichText />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" loading={loading} htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>      
    </div>
  ) : null
}

export default AdminBlogDetail