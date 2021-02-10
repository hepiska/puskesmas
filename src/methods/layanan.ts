import puskesmas from '@src/pages/admin/puskesmas'
import firebaseApp, {auth, db} from '@src/utils/firebase'
import { string } from 'prop-types'
import firebase from "firebase"


const servicesDb = db.collection("layanan")



interface ServiceType {
  name: string,
  author: string,
  description: string
  isOpenAcess: boolean
}


export const addService = async (name: string) : Promise<MessageResponseType> => {
  const puskesmas = localStorage.getItem("puskesmas")
  const key = `${puskesmas}_${name.replace(" ","").toLowerCase()}`
  await servicesDb.doc(key).set({name, puskesmas, key})
  return {
    message:"menambahkan layaan berhasil"
  }
}

export const editService = async (key: string, data: ServiceType) : Promise<MessageResponseType> => {
  const puskesmas = localStorage.getItem("puskesmas")

  await servicesDb.doc(key).set({...data, key, puskesmas})
  return {
    message:"menambahkan layaan berhasil"
  }
}

export const getServices =  () : any => {
  const puskesmas = localStorage.getItem("puskesmas") || ""
  return servicesDb.where("puskesmas","==", puskesmas)

}

export const updateService =  async (key: string, data: any) : Promise<MessageResponseType> => {
  await servicesDb.doc(key).update({...data})
  return {
    message:"menambahkan layaan berhasil"
  }
}

export const incServiceCounter = async(key: string): Promise<MessageResponseType> => {
  const inc = firebase.firestore.FieldValue.increment(1)
  await servicesDb.doc(key).update({counter: inc})
  return {
    message:"menambahkan layaan berhasil"
  }
}

export const userGetServices = (puskesmas: string) : Promise<any> => {
  return servicesDb.where("puskesmas","==", puskesmas).get().then(docs => {
    const data : Array<any>   = []
    docs.forEach(doc => {
      data.push(doc.data())
    })
    return data
  })
}


export const deleteService =  (key: string) : any => {
  return servicesDb.doc(key).delete()

}


export const getService =  (key: string) : any => {
  return servicesDb.doc(key)
}