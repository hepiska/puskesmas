import {useState, useEffect} from "react"
import {getInfos} from '@src/methods/info'



export const useInfos  = (type?: string, limit?: number | undefined): [queues: any] => {
  const [infos, setInfos] = useState(null) as any
  useEffect(() => {
    let getData = getInfos(type)
    if(limit){
      getData = getData.limit(limit)
    }

    getData.onSnapshot((_snapshot: any) => {
      const data : Array<any> = []
      _snapshot.forEach((_doc: any) => {
        data.push({..._doc.data(), key: _doc.id})
      })
      setInfos(data)
    })
  },[type, limit])

  return [infos]
}