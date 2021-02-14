import React , {useEffect }from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import MainPage from "./main"
import {useDispatch, useSelector } from 'react-redux'
import AdminPages from "./admin"
import {LOGIN, LOGOUT} from '@src/modules/auth'
import {auth, db} from '@src/utils/firebase'
import LoginPage from "./login"
import AntrianPage from "./antrian"
import Fasilitas from "./puskesmas-detail"
import InfoPage from "./info"


const userDb = db.collection("users")

const App : React.FC= () => {
  const dispatch = useDispatch()
  const setUserAuth = async (user: any) => {
    if(user && user.email){
      const userData = await userDb.doc(user.email).get().then(doc => {
        if(doc.exists){
          return doc.data()
        }
        return null
      })
      if(userData){
        dispatch(LOGIN(userData))
      }
    }
  }
  useEffect(() => {
    const unSubcription = auth.onAuthStateChanged(res => {
      if(res){
        const user = auth.currentUser
        setUserAuth(user)
      }else{
        dispatch(LOGOUT())
      }
    })
    return () => {
      unSubcription()
    }
  }, [])

  return (
    <Switch>
      <Route
        path="/admin"
        component={AdminPages}
      />
      <Route
        exact
        path="/login"
        component={LoginPage}
      />
      <Route
        exact
        path="/fasilitas/:id"
        component={Fasilitas}
      />
      <Route
        exact
        path="/antrian"
        component={AntrianPage}
      />
      <Route
        exact
        path="/info/:type"
        component={InfoPage}
      />
      <Route
        exact
        path="/"
        component={MainPage}
      />
    </Switch>
    
  )
}

export default App