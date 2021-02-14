import React,{useState, useEffect} from "react"
import { Table, Card, Spin , Button, Typography} from 'antd'
import QueueCard from "@src/components/molecules/queue-card"
import {getServices} from '@src/methods/layanan'
import AddqueueModal from "@src/components/organisms/add-queue-modal"
import {useQueues} from '@src/hooks/queue'
import {getPuskesmas} from '@src/methods/puskesmas'


const {Title} = Typography


const RegistrationPage : React.FC<any> = ({}) => {
  const [layanan, setLayanan] = useState([]) as any
  const [isAddModaOpen, setIsModalOpen] = useState(false)
  const [puskesmas, setPuskesmas] =  useState(null) as any
  const puskesID = localStorage.getItem("puskesmas") as string

  useEffect(() => {
    getServices().get().then((docs: any) =>{
      const data : Array<any>= []
      docs.forEach((doc: any) => {
        data.push(doc.data())
      })
      
      setLayanan(data)
    }) 
    getPuskesmas(puskesID).then(_data => {
      setPuskesmas(_data)
    })

  },[puskesID])
  const [queues] = useQueues("pendaftaran", 20)
  const layananValues = layanan.map((_lay: any) => ({value: _lay.key, text: _lay.name}))
  return(
    <div>
      <AddqueueModal
        isOpen={isAddModaOpen} 
        puskesmasKey={puskesID}
        onClose={() => setIsModalOpen(false)}
        problems={puskesmas && puskesmas.problems}/>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Title level={3}>Daftar antrian Masuk</Title>
        <Button  onClick={() => setIsModalOpen(true)}type="primary">Tambah antrian</Button>
      </div>
      <div style={{display: 'flex'}}>
        {queues ? queues.map((_que: any) => (
          <QueueCard key={_que.key} queue={_que} services={layananValues} ></QueueCard>
        )) : <Spin></Spin>}
      </div>
    </div>

  )
} 


export default RegistrationPage