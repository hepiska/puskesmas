import React, {useEffect, useState} from "react"
import {useQueues} from '@src/hooks/queue'
import { Table, Card, Spin, Typography,  } from 'antd'
import QueueCard from "@src/components/molecules/queue-card"
import {getServices} from '@src/methods/layanan'
import { addNewVoice } from "@src/methods/voice-queue"
import {skipQueue} from '@src/methods/queue'
import dayjs from "dayjs"


const {Title} = Typography


const ServiceQueue : React.FC<any> = ({service_key}) => {
  const [layanan, setLayanan] = useState([]) as any
  const [startWork, setStartWork] = useState(false)
  useEffect(() => {
    getServices().get().then((docs: any) =>{
      const data : Array<any>= []
      docs.forEach((doc: any) => {
        data.push(doc.data())
      })
      setLayanan(data)
    }) 

  },[])
  const [queues] = useQueues(service_key, 10)
  const layananValues = layanan.map((_lay: any) => ({value: _lay.key, text: _lay.name}))


  const callNext = () => {
    const currentQueue = queues && queues[1]  as any | null
    const cardService = layanan.find((data: any) => data.key === currentQueue.service)

    const voiceData = {
      text: `nomor antrian ${currentQueue.code} atas nama ${currentQueue.name} harap masuk ke ruang ${cardService.name}`,
      service: cardService.key,
    }
    addNewVoice(voiceData)
  }

  const onSkip = (data: any) =>{
    const moveTo = Math.min(queues.length - 1, 2)
    const newDate = dayjs(queues[moveTo].updatedAt).add(2,"second").toISOString()
    skipQueue(data.key, newDate)
  }

  return (
    <div style={{ margin:"0px 20px"}}>
      <Title level={4} style={{ margin:"0px 16px 16px"}}>Antrian</Title>

      <div style={{height: "75vh" , width: "100%", overflow: "scroll"}}>
        {queues && 
        queues.map((_que: any, index: number) => (<QueueCard 
          key={_que.key} 
          onSkip={() => {onSkip(_que)}}
          hideButton={index !== 0}
          onSuccess={callNext}
          width="70%" queue={_que} 
          services={layananValues} />))}
      </div>
    </div>
  )
}


export default ServiceQueue