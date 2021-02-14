import {db} from '@src/utils/firebase'
import firebase from "firebase"


interface QueueType {
  name: string
  phone: string
  problems: string
  puskesmas: string
  rm_number?: string
  age?: string
  service?: string
  birth_date?: string
  updatedAt?: Date | string
}
interface QueueEditType{
  name?: string
  phone?: string
  problems?: string
  puskesmas?: string
  service?: string
  rm_number?: string
  age?: string
  birth_date?: string
  updatedAt?: Date | string
}

const queueDb = db.collection("queues")
const layananDb = db.collection("layanan")

export const addQueue = async (data: QueueType) => {
  try {
    const exitsQueue = await queueDb.doc(data.phone).get().then(doc => {
      if(doc.exists){
        return doc.data()
      }
      return null
    })

    if(exitsQueue){
      throw new Error("sudah ada antrian dengan nomor hp ini")
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

export const getQueues = (service: string, puskesmasKey?: string) : any => {
  const puskesmas = puskesmasKey || localStorage.getItem("puskesmas")  || ""
  return queueDb.where("puskesmas","==", puskesmas).where("service","==", service)
}



export const editQueue = async (key: string, data: QueueEditType) => {
  try {

    data.updatedAt = new Date().toISOString()
    const inc = firebase.firestore.FieldValue.increment(1)
    await layananDb.doc(data.service).update({count: inc})
    const layanan = await layananDb.doc(data.service).get().then(doc => {
      if(doc.exists){
        return doc.data()
      }
      return null
    })
    if(!layanan){
      throw new Error("layanan tidak tersedia")
    }
    await queueDb.doc(key).update({...data, code:  layanan.initial  + "-"+ layanan.count})

    return {
      message: "update data berhasil berhasil"
    }
  } catch (error) {
    throw error
  }
}