import {db} from '@src/utils/firebase'
import firebase from "firebase"
import {removeNullData} from '@src/utils/helpers'



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

    const filteredObj = removeNullData(data)

    await queueDb.doc(data.phone).set({...filteredObj, key:data.phone})

    return {
      key: data.phone,
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

export const getQueue = (phone: string): any => {
  return queueDb.doc(phone).get().then((_doc) => {
    if(_doc.exists){
      return{..._doc.data(), key: _doc.id}
    }
    return null
  })
}


export const skipQueue = async  (key: string, updatedAt: string) => {
  try {

    await queueDb.doc(key).update({updatedAt})

    return {
      message: "update data berhasil berhasil"
    }
  } catch (error) {
    throw error
  }
}

export const removeServiceQueue = async  (service: string) => {
  try {
    const puskesmas =  localStorage.getItem("puskesmas")  || ""
    await queueDb.where("puskesmas","==", puskesmas).where("service","==", service).get().then(docs => {
      docs.forEach((doc: any) =>{
        doc.ref.delete()
      })
    })
    await layananDb.doc(service).update({count: 0})

    return {
      message: "delete data berhasil"
    }
  } catch (error) {
    throw error
  }
}


export const editQueue = async (key: string, data: QueueEditType) => {
  try {

    data.updatedAt = new Date().toISOString()
    const inc = firebase.firestore.FieldValue.increment(1)
    let layanan 


    if(data.service !== "selesai"){
      await layananDb.doc(data.service).update({count: inc})
      layanan = await layananDb.doc(data.service).get().then(doc => {
        if(doc.exists){
          return doc.data()
        }
        return null
      })
      if(!layanan){
        throw new Error("layanan tidak tersedia")
      }
    }

    const newData ={...data} as any
  
    if(layanan){
      newData.code = layanan.initial  + "-"+ layanan.count
    }

    if(data.service !== "selesai"){
      await queueDb.doc(key).update(newData)

    }else{
      queueDb.doc(key).delete()
    }


    return {
      message: "update data berhasil berhasil"
    }
  } catch (error) {
    throw error
  }
}