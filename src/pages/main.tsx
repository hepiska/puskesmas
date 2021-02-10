import React, {useEffect, useState} from "react"
import { Layout, Menu, Breadcrumb, Image , Typography, Card, Spin} from 'antd'
import UserLayout from "@src/components/layout/user-layout"
import {getPuskesmases} from '@src/methods/puskesmas'
import { EditOutlined, EllipsisOutlined, SettingOutlined, CompassOutlined, WhatsAppOutlined } from '@ant-design/icons'


const {Title} = Typography

const { Meta } = Card

const { Header, Content, Footer } = Layout

const MainPage : React.FC<any>= ({ history}) => {
  const [puskesmas, setPuskesmas] =  useState(null) as any

  useEffect(() => {
    getPuskesmases().then(_data => {
      setPuskesmas(_data)
    })
  },[])


  return (
    <UserLayout>
      {puskesmas? puskesmas.map((_pus: any) => {
        const coverIdx=  Math.floor(Math.random() * _pus.baners.length)
        const cover = _pus.baners[coverIdx]

        return(
          <Card key={_pus.key} 
            onClick={() => {history.push('/fasilitas/'+ _pus.key)}}
            actions={[
              <WhatsAppOutlined  key="wa" onClick={() => window.open(`https://wa.me/${_pus.phone}?text=halo ${_pus.name}`)}/>,
              <CompassOutlined  key="map" onClick={() => window.open(_pus.location)}/>
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