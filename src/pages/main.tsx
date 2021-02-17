import React, {useEffect, useState} from "react"
import { Layout, Menu, Breadcrumb, Image , Typography, Card, Spin, Button} from 'antd'
import UserLayout from "@src/components/layout/user-layout"
import {getPuskesmases} from '@src/methods/puskesmas'
import { HomeOutlined, FileTextOutlined } from '@ant-design/icons'
import AddqueueModal from "@src/components/organisms/add-queue-modal"

const {Title} = Typography


const { Meta } = Card
const { Header, Content, Footer } = Layout

const MainPage : React.FC<any>= ({ history}) => {
  const [puskesmas, setPuskesmas] =  useState(null) as any
  const [selectedPuskesmas, setSelectedPuskesmas] = useState<any| null>(null)

  useEffect(() => {
    getPuskesmases().then(_data => {
      setPuskesmas(_data)
    })
  },[])


  return (
    <UserLayout>
      {selectedPuskesmas && <AddqueueModal isOpen={selectedPuskesmas} onClose={() => setSelectedPuskesmas(null)} problems={puskesmas && puskesmas.problems} puskesmasKey={puskesmas.key} />}

      {puskesmas? puskesmas.map((_pus: any) => {
        const coverIdx=  Math.floor(Math.random() * _pus.baners.length)
        const cover = _pus.baners[coverIdx]

        return(
          <Card key={_pus.key} 
            onClick={() => {history.push('/fasilitas/'+ _pus.key)}}
            actions={[
              <FileTextOutlined  key="daftar" onClick={() => setSelectedPuskesmas(_pus) }/>,
              <HomeOutlined  key="detail" onClick={() => history.push('/fasilitas/'+ _pus.key)}/>
            ]}
            cover={<img alt={_pus.name} src={cover}/>}>
            <Meta title={_pus.name} description={_pus.description} />
          </Card>
        )
      }): <Spin style={{margin: "auto", alignSelf: "center"}} />   }
    </UserLayout>
  )
}

export default MainPage