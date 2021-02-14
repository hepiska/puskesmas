import React , {useEffect, useState} from "react"
import { Table, Tag, Space, Select } from 'antd'
import PuskesmasLayout from "@src/components/layout/puskes-layout"
import QueuTable from "@src/components/organisms/queue-table"
import {useSelector} from 'react-redux'
import {useGetServices} from '@src/hooks/services'
import {useQuery} from '@src/hooks/routers'
import RunningText from "@src/components/organisms/running-text"
import {
  useLocation
} from "react-router-dom"

const {Option} = Select






const AntrianPage : React.FC<any> = ({ history }) => {
  const [services] = useGetServices()
  const isAuth = useSelector((state: any) => state.auth.isAuth)

  const [queries] = useQuery()
  const location = useLocation()
  const viewServices = queries.get("services")
  const addService= (value: string) => {
    const newServices = viewServices ?  viewServices.includes(value) ? viewServices : viewServices+ "," + value : value
    queries.set("services", newServices)
    history.replace({
      pathname: location.pathname,
      search: queries.toString()
    })
  }

  const deleteServiceView = (item: string) =>  {
    const newServices = viewServices && viewServices.split(",").filter(service => service !== item).join(",")
    if(newServices ){
      queries.set("services", newServices)
      history.replace({
        pathname: location.pathname,
        search: queries.toString()
      })
    }
  }
  const servicesstr = services.map(service => ({value: service.key , text: service.name}))

  if(!isAuth){
    history.replace("/login")
  }

  return(
    <PuskesmasLayout>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Select 
          onChange={(value: string) => {addService(value)}}
          style={{width: "200px", margin:"5px 0px"}}>
          {servicesstr.map((_ser: any) => (
            <Option key={_ser.value}  value={_ser.value}> {_ser.text}</Option>
          ))}
        </Select>
        <div style={{margin:'0px 16px'}}>
          {viewServices && viewServices.split(",")
            .map((service: string) => <Tag closable onClose={() => {deleteServiceView(service)}} key={service}>{servicesstr.find(key => key.value === service)?.text}</Tag>)
          }

        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', margin:"24px 0px"}}>
        {viewServices && viewServices.split(",").map(service => <QueuTable 
          service={service} 
          key={service} limit={10} 
          title={servicesstr.find(key => key.value === service)?.text} />)}
      </div>
      <RunningText></RunningText>
    </PuskesmasLayout>
  )
}


export default AntrianPage