import React from "react"
import { Form, Input, Button, Checkbox, Avatar, message, Divider , Typography, Row, Col} from 'antd'
import {createUser} from '@src/methods/user'
import { useSelector } from 'react-redux'
import ServiceInfoSection from "../../components/organisms/service-info-sections"
import ServiceQueue from '@src/components/organisms/service-queues'
import {
  useParams
} from "react-router-dom"
const { Title } = Typography

const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const ServiceDetailPage : React.FC<any> = ({ history }) => {
  const puskesmas = useSelector((state: any )=> state?.auth?.user?.puskesmas)
  const { id } = useParams() as any

  return (
    <div>
      <Title>Detail Layanan</Title>
      <Divider ></Divider>
      <Row >
        <Col  lg={12} md={24}>
          <ServiceInfoSection ></ServiceInfoSection>
        </Col>
        <Col  lg={12} md={24}>
          <ServiceQueue service_key={id} />
        </Col>
      </Row>
    </div>
  )
}


export default ServiceDetailPage