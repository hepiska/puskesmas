import React, {useEffect, useState} from "react"
import { Layout, Image , Typography, Card, Spin, Carousel , Button, Input} from 'antd'
import UserLayout from "@src/components/layout/user-layout"
import {useParams} from 'react-router-dom'
import {getPuskesmas} from '@src/methods/puskesmas'
import {getServices, userGetServices} from '@src/methods/layanan'
import QueuTableModal from "@src/components/organisms/queue-table-modal"
import AddqueueModal from "@src/components/organisms/add-queue-modal"

import { EditOutlined, EllipsisOutlined, UnorderedListOutlined, FileTextOutlined, CompassOutlined, WhatsAppOutlined , SearchOutlined} from '@ant-design/icons'

const {Title, Text} = Typography

const { Meta } = Card

const { Header, Content, Footer } = Layout

const MainPage : React.FC<any>= ({ history}) => {
  const [puskesmas, setPuskesmas] =  useState(null) as any
  const [services, setServices] =  useState(null) as any
  const [selectedServices, setSelectedServices] = useState("")
 
  const [queueModalOpen, setQueueModal] = useState(false)
  const [QueuTableModalOpen, setTableModal] = useState(false)

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
    <UserLayout style={{padding: "0px 0px 64px"}} action={<Input suffix={<SearchOutlined />} onFocus={() => history.push("/search")}  placeholder="Cari antrian saya" style={{ width: '50%' }} />} >
      {queueModalOpen && <AddqueueModal isOpen={queueModalOpen} onClose={() => setQueueModal(false)} problems={puskesmas && puskesmas.problems} puskesmasKey={id} />}
      {QueuTableModalOpen && <QueuTableModal isOpen={QueuTableModalOpen} 
        services={services} onClose={() => setTableModal(false)} ></QueuTableModal>}
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

        <div style={{ padding: 16,maxWidth: 360, alignItems: 'center', margin:"16px auto", justifyContent: 'center', flexDirection: 'column' ,display: 'flex',}}>
          <Button type="primary"
            shape="round" 
            size="large" 
            block icon={<FileTextOutlined/>} 
            onClick={() => setTableModal(true)} >Lihat Antrian</Button>
          <Button  
            style={{marginTop: 16} } 
            type="primary" 
            block shape="round" 
            icon={<UnorderedListOutlined />}
            size="large" onClick={() => setQueueModal(true)} >Daftar Layanan</Button>
          <Button  
            style={{marginTop: 16} } 
            block shape="round" 
            size="large" onClick={() => history.push(`/blogs/${puskesmas.key}`)} >Program dan Berita</Button>
          <Button shape="round" 
            block
            size="large" style={{marginTop: 16} }
            onClick={() => window.open(`https://wa.me/${puskesmas.phone}?text=halo ${puskesmas.name}`)} 
            icon={ <WhatsAppOutlined />} >Hubungi</Button>
        </div>
        <div style={{ padding: "0px 8px", margin:"16px 0px"}}>
          <h2 style={{textAlign: "center", }}>Lokasi</h2>
          <div style={{width: "100%",}} className="map-responsive">
            <div  dangerouslySetInnerHTML={{__html: puskesmas.location}} />

          </div>
        </div>



      </div>): <Spin style={{margin: "auto", alignSelf: "center"}} />   }
    </UserLayout>
  )
}

export default MainPage