import React, {useEffect, useState} from "react"
import { Row, Col, Divider, message, Button, Pagination, Modal, Input, Switch, } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {addService, getServices, deleteService} from '@src/methods/layanan'

import { Table, Tag, Space } from 'antd'


const AddServiceModal : React.FC<any> = ({isOpen, onClose}) => {
  const [serviceName, setServiceName] = useState("")

  const modalOk = async () => {
    try{
      await addService(serviceName)
      onClose()
    } catch(error ){
      message.error(error.message)
    }
  
  }

  return(
    <Modal visible={isOpen} title="Tambah layanan Baru" onOk={modalOk} onCancel={onClose} >
      <label htmlFor="service-name">Nama Layanan</label>
      <Input name="name" id="service-name" value={serviceName} onChange={(e) => {setServiceName(e.target.value)}}></Input>
    </Modal>
  )
}

const columns = [{title: 'Nama', dataIndex:"name", key: "name", render:(text: string, record:any) => <a href={`/admin/layanan/${record.key}`}>{record.name}</a>},
  {title:"Penangung Jawab", dataIndex:"author", key: "author"}, 
  {title:"Akses Keluar", dataIndex:"isOpenAcess", key: "isOpenAcess", render :(text: any, record: any) =><Switch disabled checked={record.isOpenAcess}></Switch> },
  {title:"Tindakan", dataIndex:"action", render: (text: string, record: any) =>(
    <div>
      <Button danger type="link" onClick={() =>{deleteService(record.key)}}>Hapus</Button>
    </div>
  )},]



const ServicePage : React.FC<any> = ({history}) => {
  const [snap, setSnap] = useState({}) as any


  useEffect(() => {
    getServices().onSnapshot((snapshots: any) => {  
      const last = snapshots.docs[snapshots.docs.length - 1]
      const first = snapshots.docs[0]
      const data : Array<any> = []
      snapshots.forEach((snap: any) => {
        data.push(snap.data())
      })
      setSnap({last, first, data})
      return {last, first, data}
    })
  },[])


  const [isAddModalOpen, setAddMddal] = useState(false)
  return (
    <div>
      <AddServiceModal isOpen={isAddModalOpen} onClose={() => setAddMddal(false)} />
      <Row>
        <Col span={16} />
        <Col span={8} >
          <div style={{display: "flex",justifyContent: "flex-end"}}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddMddal(true)}> Layanan Baru</Button>
          </div>
        </Col>
      </Row>
      <Table columns={columns} dataSource={snap.data} 
        pagination={false}
      >
      </Table>
    </div>
  )
}


export default ServicePage