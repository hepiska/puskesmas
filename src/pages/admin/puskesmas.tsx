import React, {useEffect, useState} from "react"
import { Form, Input, Button,  message, Divider ,
  Spin,Typography, Upload, } from 'antd'
import { useSelector } from 'react-redux'
import {getPuskesmas, editPuskesmas}  from '@src/methods/puskesmas'
import { PlusOutlined } from '@ant-design/icons'
import { upload} from '@src/methods/uploads'
import Tags from "@src/components/atoms/tags"

const { Title } = Typography


const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const PuskesmasPage : React.FC = () => {
  const puskesmaskey = useSelector((state: any )=> state?.auth?.user?.puskesmas)
  const [puskesmas, setPuskesmas] =  useState(null)  as any
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(puskesmaskey){
      getPuskesmas(puskesmaskey).then(puskesmas => {
        puskesmas.baners = puskesmas.baners?.map((_data : any) => {
          const newData: any = {} 
          newData.uid = _data
          newData.xhr=_data
          newData.url=_data
          return newData
        }) as any
        setPuskesmas(puskesmas)
      })
    }
 

  },[puskesmaskey])
  
  const onFinish = async (values: any) => {
    values.baners = values.baners.map((_data: any) => _data.xhr)
    values.problems = puskesmas.problems
    try {
      setLoading(true)
      await editPuskesmas(puskesmaskey, values)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error({content: error.message, style:{marginTop: '20vh'}})
    }
  }

  const handleNewTag = (value: string) => {
    setPuskesmas((_data: any) => {
      _data.problems.push(value)
      return {..._data}
    })
  }

  const deleteTag = ({value, text}: any) => {
    setPuskesmas((_data: any) => {
      _data.problems = _data.problems.filter((_t: string) => _t !== value)
      return {..._data}
    })
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
  if(!puskesmas)return <Spin></Spin>

  return (
    <div>
      <Title>{puskesmas.name}</Title>
      <Divider></Divider>
      <Form           
        {...layout}
        initialValues={puskesmas}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: 'masukan nama!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nomor Telpon"
          name="phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Keterangan"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Lokasi"
          name="location"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Keluhan">
          <Tags items={puskesmas.problems.map((prob: string) => ({value: prob, text: prob}))} 
            onDelete={deleteTag} addTag={handleNewTag}></Tags>
        </Form.Item>
        <Form.Item label="Baner">
          <Form.Item name="baners" valuePropName="fileList"  
            getValueFromEvent={normFile} noStyle>
            <Upload
              listType="picture-card"
              customRequest={async({file, onError, onSuccess}) => { 
                try {
                  const res = await upload(`baner/image/${file.name}`,file) as any
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

        <Form.Item {...tailLayout}>
          <Button type="primary" loading={loading} htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}


export default PuskesmasPage