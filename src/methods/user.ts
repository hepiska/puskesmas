import {auth, db} from '@src/utils/firebase'
import firebase from "firebase"
import { string } from 'prop-types'



const isEmail = (email:any) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(emailRegEx)) return true
  else return false
}

export const validateSignUpData = (data: any) => {
  const errors: any = {}

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty"
  } else if (!isEmail(data.email)) {
    errors.email = "Must be valid email address"
  }

  if (isEmpty(data.name)) errors.name = "Must not be empty"
  if (isEmpty(data.password)) errors.password = "Must not be empty"
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passowrds must be the same"
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}



interface loginInput {
  email: string,
  password: string
}


export const login = async ({email, password}: loginInput) : Promise<firebase.auth.UserCredential>  => {
  try {
    const token = await auth.signInWithEmailAndPassword(email, password)

    return token
  } catch (error) {
    throw error
  }
}



const isEmpty = (string: any) => {
  if (string.trim() === "") return true
  else return false
}


export const createUser = async (newUser: createUserType) :  Promise<userType> => {
  try {
    const puskesmas =  localStorage.getItem("puskesmas")  || ""

    if(!auth.currentUser) {
      throw new Error("tidak boleh melakukan aksi ini")
    }

    const {valid} = validateSignUpData(newUser)

    if(!valid) {
      throw new Error("data yang di maukan tidak salah")
    }

    const user = await db.collection("users").doc(newUser.email).get().then((doc) => doc)
    if (user.exists) {
      throw new Error("user already exists")
    }


    const  currentInfos = await db.collection("users").where("puskesmas","==" , puskesmas).get().then(docs => {
      const data : Array<any>= []
      docs.forEach(doc => {
        data.push(doc.data())
      })
      return data
    })

    if(currentInfos.length > 7){
      throw new Error("sudah melewati jumlah user yang diijinkan")
    }



    const newUserCreated = await auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(async (data) => {
      const token = await data.user?.getIdToken()
      return {userId: data.user?.uid, token}
    })

    const newUSerUpdated =  {...newUser} as any

    await db.doc("/users/"+newUser.email).set({...newUSerUpdated,userId:  newUserCreated.userId})
    return {
      userId: newUserCreated.userId || '',
      email: newUser.email
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const getusers = async ({key, limit = 100, last, direction}: tablePageInput ) : Promise<any> => {
  try {
    const userDb = db.collection('users')
    const puskesmas = localStorage.getItem("puskesmas") || ""
    let usersCol = userDb.where("puskesmas","==", puskesmas)
    if(key){
      usersCol = usersCol.where("email","==",key).where("puskesmas","==", puskesmas).orderBy("email")
    }

    if(direction === 'forward' && last?.length){
      usersCol = usersCol.orderBy("email", 'asc').orderBy("name","asc")
        .startAt(last[last.length - 1].email)
    }else if(last?.length){
      usersCol = usersCol.orderBy("email", 'asc').orderBy("name","asc").endAt(last[0].email)
    }

    // usersCol.limit(limit)

    const users =  await usersCol.limit(limit).get().then((snapshot: any) => {
      const data : Array<userType> = []
      snapshot.forEach((doc: any) =>{
        data.push(doc.data())
        return doc.data()
      } )
      return data
    })

    return users
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteUser = async (key: string) :  Promise<MessageResponseType>  => {
  try {
    const userDb = db.collection('users')
    await userDb.doc(key).delete()
    return {
      message: "berhasil menghapus data info"
    }
  }catch (err) {
    throw err
  }
}

// export const getusers = async ()