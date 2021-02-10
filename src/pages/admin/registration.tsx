import React,{useState, useEffect} from "react"
import { Table, Card, Spin } from 'antd'
import QueueCard from "@src/components/molecules/queue-card"
import {getServices} from '@src/methods/layanan'
import {useQueues} from '@src/hooks/queue'

const RegistrationPage : React.FC<any> = ({}) => {
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
  const [queues] = useQueues("pendaftaran", 20)
  const layananValues = layanan.map((_lay: any) => ({value: _lay.key, text: _lay.name}))
  return(
    <div style={{display: 'flex'}}>
      {queues ? queues.map((_que: any) => (
        <QueueCard key={_que.key} queue={_que} services={layananValues} ></QueueCard>
      )) : <Spin></Spin>}
    </div>
  )
} 


export default RegistrationPage