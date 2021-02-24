import React,{useState} from "react"
import { Table, Card, Spin , Button, Typography} from 'antd'
import AddInfoModal from "@src/components/organisms/add-info-modal"
const {Title} = Typography
import {useInfos,} from '@src/hooks/infos'
import {deleteInfo} from '@src/methods/info'



const columns = [
  {title: 'Tipe', dataIndex:"type", key: "type" },
  {title: 'Text', dataIndex:"text", key: "text"},
  {title: 'Link', dataIndex:"url", key: "url", render: (text: string, record: any) =>  record.url ?<a href={record.url} target="_blank" rel="noreferrer" >buka</a> : null},
  {title:"Tindakan", dataIndex:"action", render: (text: string, record: any) =>(
    <div>
      <Button danger type="link" onClick={() =>{deleteInfo(record.key)}}>Hapus</Button>
    </div>
  )}
]

const InfoPage : React.FC = () => {
  const [isAddModaOpen, setIsModalOpen] = useState(false)
  const [infos] = useInfos()
  return (
    <div>
      <AddInfoModal isOpen={isAddModaOpen} onClose={() => setIsModalOpen(false)}></AddInfoModal>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Title level={3}>Informasi</Title>
        <Button  onClick={() => setIsModalOpen(true)}type="primary">Tambah Informasi</Button>
      </div>
      <Table columns={columns} dataSource={infos} pagination={false}>
      </Table>
    </div>
  )
}


export default InfoPage