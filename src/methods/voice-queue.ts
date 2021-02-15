import {db} from '@src/utils/firebase'


interface Voicequeue {
  text: string
  service: string
}

const voicequeueDb = db.collection("voicequeue")


export const addNewVoice  = async (data: Voicequeue):  Promise<MessageResponseType>  => {
  try {
    const puskesmas =  localStorage.getItem("puskesmas")  || ""
    const createdAt = new Date()
    await voicequeueDb.doc().set({...data, puskesmas, createdAt: createdAt.toISOString()})

    return {
      message: "ubah data berhasil"
    }
  } catch (error) {
    throw error
  }
}

export const deleteVoice  = async (key: string):  Promise<MessageResponseType>  => {
  try {
    await voicequeueDb.doc(key).delete()

    return {
      message: "ubah data berhasil"
    }
  } catch (error) {
    throw error
  }
}

export const getVoices = (layanan?: string, limit?: number) => {
  try {
    const puskesmas =  localStorage.getItem("puskesmas")  || ""
    let getDataQuery = voicequeueDb.where("puskesmas","==", puskesmas)
    if(layanan){
      getDataQuery = getDataQuery.where("service", "==", layanan)
    }
    
    return getDataQuery
  } catch (error) {
    throw error
  }
}