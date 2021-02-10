import {db} from '@src/utils/firebase'


interface puskesmasType {
  baners?: Array<string>
  name: string
  description?: string
  location?: string
  phone?: string
}

const puskesmasDb = db.collection("puskesmas")

export const editPuskesmas  = async (key: string, puskesmasData:puskesmasType) :  Promise<MessageResponseType>=> {
  try {
    await puskesmasDb.doc(key).set({...puskesmasData, key}, {merge: true})
    return {
      message: "ubah data berhasil"
    }
  } catch (error) {
    throw error
  }
}

interface puskesmasTypeWithKey extends puskesmasType {
  key: string
}

export const getPuskesmas  = async (key: string, ) :  Promise<puskesmasTypeWithKey>=> {
  try {
    const puskesmas = await puskesmasDb.doc(key).get().then(doc => {
      if(doc.exists){
        return doc.data()
      }
      return null
    }) as puskesmasTypeWithKey
    if(!puskesmas) throw new Error("no data")

    return puskesmas 

  } catch (error) {
    throw error
  }
}

export const getPuskesmases  = async ( ) :  Promise<Array<puskesmasTypeWithKey>>=> {
  try {
    const puskesmases = await puskesmasDb.get().then(docs => {
      const data : any = []
      docs.forEach(doc => {
        data.push(doc.data())
      })
      return data 
    }) as Array<puskesmasTypeWithKey>

    return puskesmases 

  } catch (error) {
    throw error
  }
}