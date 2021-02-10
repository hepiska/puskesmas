import {db} from '@src/utils/firebase'


interface QueueType {
  name: string
  phone: string
  problems: string
  puskesmas: string
  service?: string
  updatedAt?: Date | string
}
interface QueueEditType{
  name?: string
  phone?: string
  problems?: string
  puskesmas?: string
  service?: string
  updatedAt?: Date | string
}

const queueDb = db.collection("queues")

export const addQueue = async (data: QueueType) => {
  try {
    const exitsQueue = await queueDb.doc(data.phone).get().then(doc => {
      if(doc.exists){
        return doc.data()
      }
      return null
    })

    if(exitsQueue){
      throw new Error("sudah ada antrian dengan nomor ini")
    }
    data.updatedAt = new Date().toISOString()

    await queueDb.doc(data.phone).set({...data, key:data.phone})

    return {
      message: "pendaftaran berhasil"
    }

  }catch (error) {
    throw error
  }
}

export const getQueues = (service: string) : any => {
  const puskesmas = localStorage.getItem("puskesmas") || ""
  return queueDb.where("puskesmas","==", puskesmas).where("service","==", service)
}



export const editQueue = async (key: string, data: QueueEditType) => {
  try {

    data.updatedAt = new Date().toISOString()
    await queueDb.doc(key).update({...data})

    return {
      message: "update data berhasil berhasil"
    }
  } catch (error) {
    throw error
  }
}