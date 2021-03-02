import {db} from '@src/utils/firebase'


interface InfoType {
  title: string
  content?: Array<string>
  image?: string
}

interface InfotypeEdit {
  title?: string
  content?: Array<string>
  image?: string
}

const blogDB = db.collection("blogs")


export const addBlog = async (data: InfoType): Promise<MessageResponseType> => {
  const puskesmas =  localStorage.getItem("puskesmas")  || ""
  try {

    const  currentInfos = await blogDB.where("puskesmas","==" , puskesmas).get().then(docs => {
      const data : Array<any>= []
      docs.forEach(doc => {
        data.push(doc.data())
      })
      return data
    })

    if(currentInfos.length > 30){
      throw new Error("sudah melewati jumlah blog yang diijinkan")
    }


    await blogDB.doc().set({...data, puskesmas})
    return {
      message: "berhasil menambahkan blog"
    }
  }catch (err) {
    throw err
  }

}


export const deleteBlog = async (key: string): Promise<MessageResponseType> => {
  try {
    await blogDB.doc(key).delete()
    return {
      message: "berhasil menghapus data blog"
    }
  }catch (err) {
    throw err
  }

}


export const getBlog = async  (key: string): Promise<any> => {
  return blogDB.doc(key).get().then((doc) => {
    console.log(doc.exists)
    if(doc.exists){
      console.log(doc.data())

      return {...doc.data(), key : doc.id}
    }
    return null
  })

} 

export const editBlog = async  (key: string, data:InfotypeEdit ): Promise<MessageResponseType> => {
  try {
    await blogDB.doc(key).update(data)
    return {
      message: "berhasil menghapus data blog"
    }   
  }catch (error){
    throw error
  }

} 

export const getBlogs =  (puskesmasKey?: string): any => {
  const puskesmas = puskesmasKey || localStorage.getItem("puskesmas")  || ""
  const blogAccess = blogDB.where("puskesmas","==", puskesmas)
  return blogAccess
}