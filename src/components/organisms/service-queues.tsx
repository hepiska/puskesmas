import React, {useEffect, useState} from "react"
import {useQueues} from '@src/hooks/queue'
import { Table, Card, Spin, Typography, Button , Modal} from 'antd'
import QueueCard from "@src/components/molecules/queue-card"
import {getServices, getService} from '@src/methods/layanan'
import { addNewVoice } from "@src/methods/voice-queue"
import {skipQueue, removeServiceQueue , } from '@src/methods/queue'
import dayjs from "dayjs"


const {Title} = Typography


const ServiceQueue : React.FC<any> = ({service_key}) => {
  const [layanan, setLayanan] = useState([]) as any
  const [service, setService] = useState(null) as any


  useEffect(() => {
    getServices().get().then((docs: any) =>{
      const data : Array<any>= []
      docs.forEach((doc: any) => {
        data.push(doc.data())
      })
      setLayanan(data)
    }) 
    getService(service_key).onSnapshot((_snap:any) => {
      if(_snap.exists){
        setService(_snap.data())
      }
    })

  },[])
  const [queues] = useQueues(service_key, 10)
  const layananValues = layanan.map((_lay: any) => ({value: _lay.key, text: _lay.name}))


  const callNext = () => {
    const currentQueue = queues && queues[1]  as any | null
    const cardService = layanan.find((data: any) => data.key === currentQueue.service)

    const voiceData = {
      text: `nomor antrian ${currentQueue.code} harap masuk ke ruang ${cardService.name}`,
      service: cardService.key,
    }
    if(service && service.isVoiceOn){
      addNewVoice(voiceData)
    }
  }

  const onSkip = (data: any) =>{
    const moveTo = Math.min(queues.length - 1, 2)
    const newDate = dayjs(queues[moveTo].updatedAt).add(2,"second").toISOString()
    skipQueue(data.key, newDate)
  }

  const confirmModal = () => {
    Modal.confirm({
      title: 'Menghapus semua antrian',
      content: 'Melakukan aksi ini akan mengapus semua antrian di layanan ini apakah anda yakin?',
      okText: 'ya',
      onOk: () => {
        removeServiceQueue(service_key)
      },
      cancelText: 'batal',
    })
  }
  console.log("===service",service)

  return (
    <div style={{ margin:"0px 20px"}}>
      <div style={{display: 'flex', justifyContent:"space-between"}}>
        <Title level={4} style={{ margin:"0px 16px 16px", alignItems: 'center'}}>Antrian</Title>
        <Button type="primary"  danger style={{ margin:"5px 0px"}} onClick={confirmModal} > Reset antrian </Button>

      </div>

      <div style={{height: "75vh" , width: "100%", overflow: "scroll"}}>
        {queues && 
        queues.map((_que: any, index: number) => (<QueueCard 
          key={_que.key} 
          onSkip={() => {onSkip(_que)}}
          showCall
          hideButton={index !== 0}
          onSuccess={callNext}
          width="70%" queue={_que} 
          services={layananValues} />))}
      </div>
    </div>
  )
}


export default ServiceQueue