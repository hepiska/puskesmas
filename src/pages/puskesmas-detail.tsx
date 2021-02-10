import React, {useEffect, useState} from "react"
import { Layout, Menu, Breadcrumb, Image , Typography, Card, Spin, Carousel , Button} from 'antd'
import UserLayout from "@src/components/layout/user-layout"
import {useParams} from 'react-router-dom'
import {getPuskesmas} from '@src/methods/puskesmas'
import {getServices, userGetServices} from '@src/methods/layanan'

import AddqueueModal from "@src/components/organisms/add-queue-modal"
import { EditOutlined, EllipsisOutlined, SettingOutlined, CompassOutlined, WhatsAppOutlined } from '@ant-design/icons'


const {Title, Text} = Typography

const { Meta } = Card

const { Header, Content, Footer } = Layout

const MainPage : React.FC<any>= ({ history}) => {
  const [puskesmas, setPuskesmas] =  useState(null) as any
  const [services, setServices] =  useState(null) as any
  const [selectedServices, setSelectedServices] = useState("")
 
  const [queueModalOpen, setQueueModal] = useState(false)
  const {id} = useParams() as any
  useEffect(() => {
    getPuskesmas(id).then(_data => {
      setPuskesmas(_data)
    })
    userGetServices(id).then(_data => {
      setServices(_data)
    })
  },[id])

  return (
    <UserLayout style={{padding: 0}}>
      {queueModalOpen && <AddqueueModal isOpen={queueModalOpen} onClose={() => setQueueModal(false)} problems={puskesmas && puskesmas.problems} puskesmasKey={id} />}
      {puskesmas? (<div style={{width: '100%'}}>
        {puskesmas.baners && (
          <Carousel>
            {puskesmas.baners.map((baner:any) => {
              return <Image src={baner}  key={baner} alt={"gambar puskesmas"} width="100%"></Image>
            })}
          </Carousel>
        )}  

        <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', padding: 8, alignItems: 'center', margin:"16px 0px"}}>
          <h2>{puskesmas.name}</h2>
          <Text type="secondary" style={{textAlign:"center",}}>{puskesmas.description}</Text>
        </div>

        <div style={{ padding: 8, alignItems: 'center', margin:"16px 0px", justifyContent: 'center', flexDirection: 'column' ,display: 'flex',}}>
          <Button type="primary" shape="round" size="large" onClick={() => setQueueModal(true)} >Daftar Layanan</Button>
          <Button shape="round" 
            size="large" style={{marginTop: 16} }
            onClick={() => window.open(`https://wa.me/${puskesmas.phone}?text=halo ${puskesmas.name}`)} 
            icon={ <WhatsAppOutlined />} >Wa</Button>

        </div>


      </div>): <Spin style={{margin: "auto", alignSelf: "center"}} />   }
    </UserLayout>
  )
}

export default MainPage