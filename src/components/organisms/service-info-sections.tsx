import React, {useEffect, useState} from "react"
import { Form, Input, Button, message,Spin,  Divider , Typography, Switch} from 'antd'
import {getService,editService} from '@src/methods/layanan'
const { Title } = Typography

import {
  useParams
} from "react-router-dom"


const { TextArea } = Input

const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const ServiceInfoSection : React.FC<any>= ({key}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [data, setData] = useState(null) as any

  const { id } = useParams() as any

  useEffect(() => {
    getService(id).onSnapshot((snap: any) => {
      setData({...snap.data()})
    })
  },[id])

  const _handleFinish = async (values: any) => {
    try {
      await editService(id, values)
      setIsEdit(false)
    } catch (error) {
      message.error({content: error.message, style:{marginTop: '20vh'}})
    }
  }

  if(!data)return <Spin></Spin>

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Title level={3} style={{margin: 0}}>Info</Title>
        <Button type="link" onClick={() => {setIsEdit(!isEdit)}}>{isEdit? "Batal" : "Ubah"}</Button>
      </div>
      <Divider plain style={{margin:"10px 0px"}}></Divider>
      <Form {...layout}
        initialValues={data}
        onFinish={_handleFinish}>
        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: 'masukan nama!' }]}
        >
          <Input disabled={!isEdit}/>
        </Form.Item>
        <Form.Item
          label="Petugas Aktif"
          name="author"
          rules={[{ required: true, message: 'masukan Petugas Aktif!' }]}
        >
          <Input disabled={!isEdit} />
        </Form.Item>
        <Form.Item
          label="Initial layanan"
          name="initial"
          rules={[{ required: true, message: 'masukan Petugas Aktif!' }]}
        >
          <Input disabled={!isEdit} />
        </Form.Item>
        <Form.Item
          label="Deskripsi"
          name="description"
          rules={[{  message: 'masukan deskirpsi!' }]}
        >
          <TextArea disabled={!isEdit}  rows={4}/>

        </Form.Item>
        <Form.Item label="Nyalakan suara" name="isVoiceOn">
          <Switch disabled={!isEdit} defaultChecked={data.isVoiceOn}/>
        </Form.Item>
        {isEdit&& <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
          Simpan
          </Button>
        </Form.Item> }

      </Form>
    </div>
  )
}

export default ServiceInfoSection