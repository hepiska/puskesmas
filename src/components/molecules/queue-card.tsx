import React , {useState} from "react"
import { Card, Select, Button, message} from 'antd'
import {editQueue} from '@src/methods/queue'

const { Meta } = Card
const {Option} = Select


const QueueCard : React.FC<any>= ({queue, services, showSkipButton, onSkip, width, hideButton}) => {
  const [selectedServices, setSelectedServices] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const onClick = async () => {
    try {
      setLoading(true)
      console.log("queue", queue.key)
      await editQueue(queue.key || queue.phone, {service: selectedServices as string})
      setLoading(false)
    } catch (error) {
      message.error(error.message)
    }

  }

  return(
    <Card
      hoverable
      style={{width: width|| 320, minWidth: 320, margin:"16px"}}
    >
      <p>Nama:  {queue.name}</p>
      <p>Nomor Hp:  {queue.phone}</p>
      <p>Keluhan:  {queue.problem}</p>
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
        <Button style={{ margin:"5px 0px"}} onClick={onClick} block loading={loading}>Simpan</Button>
        {showSkipButton && (<Button style={{ margin:"5px 0px"}} onClick={showSkipButton} block loading={loading}>Lewatkan</Button>
        )}
      </>)}
    </Card>
  )
}


export default QueueCard