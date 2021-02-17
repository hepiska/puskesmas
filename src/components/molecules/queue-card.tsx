import React , {useState} from "react"
import { Card, Select, Button, message} from 'antd'
import {editQueue} from '@src/methods/queue'
import Dayjs from 'dayjs'
import { addNewVoice } from "@src/methods/voice-queue"
import card from "antd/lib/card"

const { Meta } = Card
const {Option} = Select


const QueueCard : React.FC<any>= ({queue, services, onSkip, width, hideButton, onSuccess, showCall}) => {
  const [selectedServices, setSelectedServices] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const onClick = async () => {
    try {
      setLoading(true)
      await editQueue(queue.key || queue.phone, {service: selectedServices as string})
      setLoading(false)
      if(onSuccess){
        onSuccess()
      }
    } catch (error) {
      message.error(error.message)
    }

  }

  const onCall = () => {
    const cardService = services.find((data: any) => data.value === queue.service)
    const voiceData = {
      text: `nomor antrian ${queue.code} harap masuk ke ruang ${cardService.text}`,
      service: queue.key,
    }
    addNewVoice(voiceData)
  }

  return(
    <Card
      hoverable
      style={{width: width|| 320, minWidth: 320, margin:"16px"}}
    >
      <p>Nama:  {queue.name}</p>
      <p>Nomor Hp:  {queue.phone}</p>
      <p>Keluhan:  {queue.problem}</p>
      <p>umur:  {queue.age}</p>
      <p>Tanggal Lahir:  {Dayjs(queue.birth_date).format("DD/MM/YY")}</p>
      <p>Nomor RM:  {queue.rm_number}</p>


      {!hideButton  && showCall && (<Button  style={{ margin:"5px 0px"}} onClick={onCall} block loading={loading}>Panggil</Button>)}
      <Select 
        value={selectedServices || queue.service}
        disabled={hideButton}
        onChange={(value: string) => {setSelectedServices(value)}}
        style={{width: "100%", margin:"5px 0px"}}>
        {services.map((_ser: any) => (
          <Option key={_ser.value}  value={_ser.value}> {_ser.text}</Option>
        ))}
        <Option key="selesai"  value="selesai"> Selesai</Option>
      </Select>
      {!hideButton && ( <>
        <Button type="primary" style={{ margin:"5px 0px"}} onClick={onClick}  block loading={loading}>Simpan</Button>
        {onSkip && (<Button type="primary"  danger style={{ margin:"5px 0px"}} onClick={onSkip} block loading={loading}>Lewatkan</Button>
        )}
      </>)}
    </Card>
  )
}


export default QueueCard