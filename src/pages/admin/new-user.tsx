import React from "react"
import { Form, Input, Button, Checkbox, Avatar, message, Divider , Typography} from 'antd'
import {createUser} from '@src/methods/user'
import { useSelector } from 'react-redux'

const { Title } = Typography

const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const NewUserpage : React.FC<any> = ({ history }) => {
  const puskesmas = useSelector((state: any )=> state?.auth?.user?.puskesmas)
  const onFinish = async(values: any) => {
    try {
      await  createUser({...values, puskesmas})
      history.goBack()
    } catch (error) {
      message.error({content: error.message, style:{marginTop: '20vh'}})
    }
  }
  return (
    <div>
      <Title>Admin baru</Title>
      <Divider></Divider>
      <Form           
        {...layout}
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
          label="Email"
          name="email"
          rules={[{ required: true, message: 'masukan  email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'masukan password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Ulang Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'masukan ulang password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}


export default NewUserpage