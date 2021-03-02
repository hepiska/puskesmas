import React, {useEffect, useState, useMemo} from "react"
import { Row, Col, Divider, message, Button, Image} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {useBlogs} from "@src/hooks/blogs"
import { Table, Tag, Space } from 'antd'


const AdminBlogs  : React.FC<any> = ({ history }) => {
  const [{loading, blogs},{deleteBlogAction}] =  useBlogs(true)
  const columns = useMemo(() => [{title: 'Judul', dataIndex:"title", key: "title", render:(text: string, record:any) => <a href={`/admin/blogs/${record.key}`}>{record.title}</a>},  
    {title: 'Baners', dataIndex:"baners", key: "baners", render:(text: string, record:any) => <Image src={record.baners[0]} width={75}/>}, 
    {title:"Tindakan", dataIndex:"action", render: (text: string, record: any) =>(
      <div>
        <Button danger type="link" onClick={() =>{deleteBlogAction && deleteBlogAction(record.key)}}>Hapus</Button>
      </div>
    )}],[])

  return (
    <div>
      <Row>
        <Col span={16} />
        <Col span={8} >
          <div style={{display: "flex",justifyContent: "flex-end", marginBottom:20}}>
            <Button onClick={() => history.push("/admin/blogs/new")} type="primary" icon={<PlusOutlined />} >Blog baru</Button>
          </div>
        </Col>
      </Row>
      <Table columns={columns} dataSource={blogs}
        loading={loading} 
        pagination={false}
      >
      </Table>
    </div>
  )
}

export default AdminBlogs