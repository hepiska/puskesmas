import React, {useEffect, useState} from "react"
import { Row, Col, Divider, Button,DatePicker, Modal, Input, Form, Select, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {addQueue} from '@src/methods/queue'
import {getServices} from '@src/methods/layanan'



const { Option } = Select

const initalForm = {}

const AddServiceModal : React.FC<any> = ({isOpen, onClose, problems, puskesmasKey, showService, sucessCallback }) => {
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Array<any>| null>(null)

  useEffect(() => {
    if(showService){
      getServices().get().then((docs: any) =>{
        const data : Array<any>= []
        docs.forEach((doc: any) => {
          data.push({...doc.data(), key: doc.id})
        })
        setServices(data)
      }) 
    }
  },[showService])


  const onFinish = async (values: any) => {
    try {
      const data ={...values}
      data.puskesmas =  puskesmasKey
      data.service = "pendaftaran"
      if(data.birth_date){
        data.birth_date = data.birth_date.toISOString()
      }
      setLoading(true)
      const res = await addQueue(data)
      message.success(res.message)
      onClose()
      setLoading(false)
      if(sucessCallback){
        sucessCallback(res.key)
      }

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
        {services && (
          <Form.Item label="layanan" name="service">
            <Select 
              style={{width: "100%", margin:"5px 0px"}}>
              {services.map((_ser: any) => (
                <Option key={_ser.key}  value={_ser.key}> {_ser.name}</Option>
              ))}
              <Option key="selesai"  value="selesai"> Selesai</Option>
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