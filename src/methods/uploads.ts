import {storage} from '@src/utils/firebase'
import firebase from "firebase"

const storageRef = storage.ref()

export const upload = async (ref: string, file: File):  Promise<string> => {
  try {
    const imageref =  storageRef.child(ref).put(file)

    const imageRes = new Promise((resolve, reject) => {
      return imageref.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          console.log("====")
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          return reject(error)
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          imageref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            return resolve(downloadURL)
          })
        }
      )
    }) as any
    return imageRes
  }catch (error){
    throw error
  }
}