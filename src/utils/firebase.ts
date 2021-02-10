import firebase from 'firebase'


export const firebaseConfig = {
  apiKey: process.env.CONF_API_KEY,
  authDomain: "puskesmas-belitung.firebaseapp.com",
  projectId: "puskesmas-belitung",
  storageBucket: "puskesmas-belitung.appspot.com",
  messagingSenderId: process.env.CONF_MESSAGING_SENDER_ID,
  appId:process.env.CONF_APP_ID,
  measurementId: "G-LZ54P4MKKC"
}


const firebaseApp = firebase.initializeApp(firebaseConfig)

export  const auth = firebaseApp.auth()
export  const db = firebaseApp.firestore()

export  const storage = firebase.storage()

export default firebaseApp