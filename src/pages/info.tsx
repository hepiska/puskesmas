import React , {useEffect, useState} from "react"
import { Table, Tag, Space, Select,Image, Typography, Carousel } from 'antd'
import PuskesmasLayout from "@src/components/layout/puskes-layout"
import QueuTable from "@src/components/organisms/queue-table"
import {useGetServices} from '@src/hooks/services'
import { useParams} from "react-router-dom"
import RunningText from "@src/components/organisms/running-text"
import ReactPlayer from 'react-player'
import {useInfos} from '@src/hooks/infos'


import {
  useLocation
} from "react-router-dom"

const {Option} = Select

const {Title} = Typography




const InfoPage : React.FC<any> = ({ history }) => {
  const {type} = useParams() as any
  const [infos] = useInfos(type)

  if(!infos || !infos.length ){
    return (
      <div style={{margin: "20vh auto"}}>
        <Title level={2} style={{textAlign: "center",}}>Tidak terdapat informasi untuk di tampilkan</Title>
      </div>
    )
  }
  console.log("infos", infos)

  if(type === "video"){
    const urls = infos.map((data: any) => data.url)
    return(
      <div style={{width: '100vw', height: '100vh'}}>
        <ReactPlayer url={urls}  
          loop
          playing
          width='100%'
          height='100%'/>
        <RunningText></RunningText>
      </div>
    )
  }

  if(type === "image"){
    const urls = infos.map((data: any) => data.url)
    return(
      <div style={{width: '100vw', height: '100vh',  backgroundColor: "black"}}>
        <Carousel autoplay autoplaySpeed={10000} >
          {urls.map ((url: string) => (
            <div style={{width: '100vw', height: '100vh',  backgroundColor: "black"}} key={url}>
              <img
                src={url}
                style={{height: '100vh', width: 'auto', margin:"0px auto"}}
              />

            </div>
          ))}

        </Carousel>
        <RunningText></RunningText>
      </div>
    )
  }

  return(
    <> 
      <RunningText></RunningText>
    </>
  )
}


export default InfoPage