import {useState, useEffect} from "react"
import {getServices} from '@src/methods/layanan'


export const useGetServices = () => {
  const [layanan, setLayanan] = useState<Array<any>>([]) 

  useEffect(() => {
    getServices().get().then((docs: any) =>{
      const data : Array<any>= []
      docs.forEach((doc: any) => {
        data.push(doc.data())
      })
      setLayanan(data)
    }) 

  },[])
  return[layanan]
}


