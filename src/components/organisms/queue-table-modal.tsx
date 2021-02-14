import React , { useState} from "react"
import {Modal, Select } from 'antd'
import QueuTable from "./queue-table"


const {Option} = Select


const QueuTableModal: React.FC<any> = ({isOpen, services, onClose,}) => {
  const [service, setSelectedService] =  useState("")
  return(
    <Modal visible={isOpen}  onOk={onClose} onCancel={onClose} title="Lihat antrian">
      <div >
        {services && <Select 
          placeholder="pilih layanan"
          value={service}
          onChange={(value: string) => {setSelectedService(value)}}
          style={{width: "100%", margin:"5px 0px"}}>
          {services.map((_ser: any) => (
            <Option key={_ser.key}  value={_ser.key}> {_ser.name}</Option>
          ))}
        </Select>}

      </div>

      {service && <QueuTable limit={10} service={service} style={{width: '100%'}} hideName  showPhoneNumber></QueuTable>}
    </Modal>
  )
}


export default QueuTableModal