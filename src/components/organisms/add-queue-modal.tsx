import React, {useEffect, useState} from "react"
import { Row, Col, Divider, Button, Pagination,DatePicker, Modal, Input, Switch, Form, Select, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {addQueue} from '@src/methods/queue'


const { Option } = Select

const initalForm = {}

const AddServiceModal : React.FC<any> = ({isOpen, onClose, problems, puskesmasKey}) => {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    try {
      const data ={...values}
      data.puskesmas =  puskesmasKey
      data.service = "pendaftaran"
      data.birth_date = data.birth_date.toISOString()
      setLoading(true)
      const res = await addQueue(data)
      message.success(res.message)
      onClose()
      setLoading(false)

    } catch (error) {
      setLoading(false)
      message.error(error.message)
    }
  }
  return(
    <Modal visible={isOpen} onCancel={onClose} title="Masukan Data" footer={[
      <Button key="batal" onClick={onClose} loading={loading}>Batal</Button>,
      <Button key="ok" form="adduserForm" type="primary" loading={loading} htmlType="submit">Daftar</Button>

    ]} >
      <Form id="adduserForm"         
        onFinish={onFinish}
        labelAlign="right"
        initialValues={initalForm}
      >
        <Form.Item
          label="Nama Lengkap"
          name="name"
          rules={[{ required: true, message: 'masukan nama!' }]}
        >
          <Input/>
        </Form.Item>
    
        <Form.Item
          label="Nomor handphone"
          name="phone"
          rules={[{ required: true, message: 'masukan nomor handphone!' }]}
        >
          <Input  type="number"/>
        </Form.Item>
        {problems && (
          <Form.Item
            label="Keluhan"
            name="problem"
            rules={[{ required: true, message: 'masukan keluhan!' }]}
          >
            <Select allowClear>
              {problems.map((_prob: string) => {
                return ( <Option value={_prob} key={_prob}>{_prob}</Option>
                )
              })}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          label="Nomor Kartu Berobat"
          name="rm_number"
          rules={[{  message: 'masukan nama!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Umur"
          name="age"
          rules={[{  message: 'umur!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name="birth_date" label="Tanggal lahir">
          <DatePicker style={{width: '100%'}} placeholder="Tanggal" />
        </Form.Item>
      </Form>


    </Modal>
  )
}


export default AddServiceModal