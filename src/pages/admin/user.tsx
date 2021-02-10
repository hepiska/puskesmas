import React, {useEffect, useState} from "react"
import { Row, Col, Divider, Button, Pagination} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {getusers} from '@src/methods/user'
import { Table, Tag, Space } from 'antd'


const columns = [{title: 'Nama', dataIndex:"name", key: "name"}, {title: 'Email', dataIndex:"email", key: "email"}]


const UserPage : React.FC = () => {

  const [users, setusers] = useState([])
  const [page, setPage] =  useState([])
  const [direction, setDirection] = useState("forward")

  const onpageChange = (val: any) => {
    if(val > page){
      setDirection("forward")
      setPage(val)
    }else{
      setDirection("backward")
      setPage(val)

    }
  }

  const populateUsers = async () => {

    const newUsers = await getusers({ direction , last: users })
    setusers(newUsers)
  }

  useEffect(() =>{
    populateUsers()
  },[page])


  return (
    <div>
      <Row>
        <Col span={16} />
        <Col span={8} >
          <div style={{display: "flex",justifyContent: "flex-end"}}>
            <Button href="/admin/pengguna/baru" type="primary" icon={<PlusOutlined />}> admin baru</Button>
          </div>
        </Col>
      </Row>
      <Table columns={columns} dataSource={users} 
        pagination={false}
      >
      </Table>
      <Pagination style={{marginTop: "20px"}} simple defaultCurrent={0} total={100}  onChange={onpageChange} />
    </div>
  )
}


export default UserPage