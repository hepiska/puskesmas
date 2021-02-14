import React from "react"
import { Form, Input, Button, Checkbox, Avatar, message } from 'antd'
import { Typography } from 'antd'
import { RouteComponentProps} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {login} from '@src/methods/user'

const { Title } = Typography


interface AdminPagesProps  extends RouteComponentProps {
  test?:boolean
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const LoginPage : React.FC<AdminPagesProps> = ({history}) => {
  const isAuth = useSelector((state: any) => state.auth.isAuth)

  const onFinish = async(values: any) => {
    try {

      await login(values)
    } catch (error) {
      message.error({content: error.message, style:{marginTop: '20vh'}})
    }
  }
  if(isAuth){
    history.replace("/admin")
  }


  return(
    <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: '100%',  maxWidth: "480px", margin:"10% 0px 0px", }} >
        <div style={{marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img
            style={{width: '64px'}}
            src="/logo.png"
          />
          <Title style={{marginLeft: 20}}>Login</Title>
        </div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
    </div>
  )
}

export default LoginPage