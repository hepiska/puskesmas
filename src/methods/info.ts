import {db} from '@src/utils/firebase'


interface InfoType {
  type: string
  text?: string
  url?: string
}

const infoDB = db.collection("infos")


export const addInfo = async (data: InfoType): Promise<MessageResponseType> => {
  const puskesmas =  localStorage.getItem("puskesmas")  || ""
  try {

    const  currentInfos = await infoDB.where("puskesmas","==" , puskesmas).get().then(docs => {
      const data : Array<any>= []
      docs.forEach(doc => {
        data.push(doc.data())
      })
      return data
    })

    if(currentInfos.length > 30){
      throw new Error("sudah melewati jumlah informasi yang diijinkan")
    }


    await infoDB.doc().set({...data, puskesmas})
    return {
      message: "berhasil menambahkan info"
    }
  }catch (err) {
    throw err
  }

}


export const deleteInfo = async (key: string): Promise<MessageResponseType> => {
  try {
    await infoDB.doc(key).delete()
    return {
      message: "berhasil menghapus data info"
    }
  }catch (err) {
    throw err
  }

}

export const getInfos =  (type?: string, puskesmasKey?: string): any => {
  const puskesmas = puskesmasKey || localStorage.getItem("puskesmas")  || ""
  let InfosAccess = infoDB.where("puskesmas","==", puskesmas)
  if(type){
    InfosAccess= InfosAccess.where("type","==", type)
  }
  return InfosAccess
}