import React, {useEffect, useState, useRef, useMemo} from "react"
import {message, Typography, Card, Spin, Button, Input} from 'antd'
import UserLayout from "@src/components/layout/user-layout"
import {getPuskesmas} from '@src/methods/puskesmas'
import {getQueue} from '@src/methods/queue'
import {getService} from '@src/methods/layanan'
import {  FormOutlined , SearchOutlined} from '@ant-design/icons'
import search from "antd/lib/transfer/search"
const {Title}  =Typography
const EmtyState = () => {
  return (
    <div style={{margin: "32px 0px", width: "100%", display: "flex", justifyContent: 'center', flexDirection: 'column'}}>
      <FormOutlined style={{fontSize: 100, color:"#f0f2f5", margin:"16px 0px"}} />
      <Title style={{textAlign: "center",}} type="secondary" level={3}>Cari antrian mengunakan nomor HP</Title>
    </div>
  )
}

const NotFoundComponent = () => {
  return (
    <div style={{margin: "32px 0px", width: "100%", display: "flex", justifyContent: 'center', flexDirection: 'column'}}>
      <SearchOutlined style={{fontSize: 100, color:"#f0f2f5", margin:"16px 0px"}} />
      <Title style={{textAlign: "center",}} type="secondary" level={3}>Nomor HP yang anda input tidak terdpat dalam antrian</Title>
    </div>
  )
}

const SearchCard = ({data}: any) => {
  const [puskesmas, setPuskesmas] = useState(null) as any
  const [layanan, setLayanan] = useState(null) as any

  useEffect(() => {
    getPuskesmas(data.puskesmas).then((_pus) => {
      setPuskesmas(_pus)
      
    })
    getService(data.service).get().then((_doc: any) => {
      if(_doc.exists){
        setLayanan(_doc.getData())
      }
    })
  }, [data])
  if(data.service !== "pendaftaran"){
    return(
      <Card title={data.code}  style={{ width: "100%" }}>
        <p>Puskesmas: {puskesmas?.name}</p>
        <p>Ruang: {layanan?.name} </p>
      </Card>
    )
  }
  return(
    <Card title="Pendaftaran"  style={{ width: "100%" }}>
      <p>Data anda masih di pendaftaran belum masuk antrian mana pun di {puskesmas?.name}</p>
    </Card>
  )

}

let timeout: any = null

const SeachPage : React.FC<any>= ({ history}) => {
  const [searchKey, setSearchKey] =  useState("") as any
  const [queue, setQueue] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const input =  useRef<Input| null>(null)
  useEffect(() => {
    if(input.current){
      input.current.focus()
    }
    
  },[])

  const fetchData = async(key:string) => {
    try {
      setLoading(true)
      const resQueue = await getQueue(key)
      setQueue(resQueue)
      setLoading(false)
      timeout =  null
    }catch (error) {
      message.error(error.message)
      setLoading(false)
      timeout =  null

    }
  }
  

  const getData = ({target}:React.ChangeEvent<HTMLInputElement> ) => {
    setSearchKey(target.value)
    if(!timeout){
      timeout = setTimeout(() => {
        fetchData(target.value)
        return () =>  clearTimeout(timeout)
      }, 700)
    }
   
  }

  const _renderData = useMemo(() => {
    if(!searchKey){
      return <EmtyState />
    }
    if(loading){
      return   <Spin size="large" />
    }

    if(search && !queue){
      return <NotFoundComponent />
    }

    return <SearchCard data={queue} ></SearchCard>

  },[searchKey, loading, queue])

  // const [selectedPuskesmas, setSelectedPuskesmas] = useState<any| null>(null)

  return (
    <UserLayout>
      <Input 
        ref={input}
        onChange={getData}
        suffix={<SearchOutlined />}  
        placeholder="Masukan nomor HP" style={{ width: '100%' }} />
      <div style={{marginTop:"24px", justifyContent: 'center', flexDirection: 'column'}}>
        {_renderData}

      </div>
    
    </UserLayout>
  )
}

export default SeachPage