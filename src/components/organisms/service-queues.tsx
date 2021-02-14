import React, {useEffect, useState} from "react"
import {useQueues} from '@src/hooks/queue'
import { Table, Card, Spin, Typography,  } from 'antd'
import QueueCard from "@src/components/molecules/queue-card"
import {getServices} from '@src/methods/layanan'


const {Title} = Typography


const ServiceQueue : React.FC<any> = ({service_key}) => {
  const [layanan, setLayanan] = useState([]) as any
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

  return (
    <div style={{ margin:"0px 20px"}}>
      <Title level={4} style={{ margin:"0px 16px 16px"}}>Antrian</Title>

      <div style={{height: "75vh" , width: "100%", overflow: "scroll"}}>
        {queues && 
        queues.map((_que: any, index: number) => (<QueueCard 
          key={_que.key} 
          hideButton={index !== 0}
          width="70%" queue={_que} 
          services={layananValues} />))}
      </div>
    </div>
  )
}


export default ServiceQueue