import {useState, useEffect} from "react"
import {getQueues} from '@src/methods/queue'



export const useQueues  = (service: string, limit?: number | undefined): [queues: any] => {
  const [queues, setQueues] = useState(null) as any
  useEffect(() => {
    let getData = getQueues(service).orderBy("updatedAt","asc")

    if(limit){
      getData = getData.limit(limit)
    }

    getData.onSnapshot((_snapshot: any) => {
      const data : Array<any> = []
      _snapshot.forEach((_doc: any) => {
        data.push(_doc.data())
      })
      setQueues(data)
    })
  },[service, limit])

  return [queues]
}