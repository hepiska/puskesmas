import React  from "react"
import { Table, Typography, Divider } from 'antd'
import { useQueues} from '@src/hooks/queue'
import {hidetext} from '@src/utils/helpers'

const {Title, Text} = Typography




const QueuTable: React.FC<any> = ({service, limit, title, showPhoneNumber, style, hideName}) => {
  const [queues] = useQueues(service, limit)
  const columns = [
    {title: 'Nomor', dataIndex:"code", key: "code", render: (text: string) => <p style={{fontSize:"18px", margin:0}}>{text}</p> },
    {title: 'Nama', dataIndex:"name", key: "name", render: (text: string) => <p style={{fontSize:"18px", margin:0}}>{text}</p> },
  ]
  if(hideName){
    columns.pop()
  }
  if(showPhoneNumber){
    columns.push(    {title: 'Nomor Hp', dataIndex:"phone", key: "phone", 
      render: (text: string) => <p style={{fontSize:"18px", margin:0}}>{hidetext(text, 5)}</p> })
  }
  return(
    <div style={{width: '23%', 
      display: 'block',
      padding: "8px",
      margin:"0px 24px 0px 0px", 
      alignItems: 'center',
      minHeight: 480,
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      ...style
    }}>
      {title && <Title style={{alignSelf: 'center', textAlign:"center", margin:0}} level={2}>{title}</Title>}
      <Divider style={{margin:"8px "}}></Divider>
      <Table columns={columns} dataSource={queues} 
        rowClassName={(_,index: number) =>  index ===0 ? "current-queues-table":""}
        pagination={false} bordered />
    </div>
  )
}


export default QueuTable