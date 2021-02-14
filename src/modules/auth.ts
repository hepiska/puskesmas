const type = {
  LOGIN: 'auth/LOGIN_REQUEST',
  LOGOUT: 'auth/LOGOUT',
}

interface AuthType {
  user: any | null
  isAuth: boolean
}
  
const user = localStorage.getItem("user")

const initialState: AuthType  = {
  user: user && JSON.parse(user),
  isAuth: user? true : false,
}


const AuthReducer  = (state = initialState, action: any): AuthType => {
  let newState = { ...state }
  switch (action.type) {
    case type.LOGIN:
      if (action.payload === null) {
        return initialState
      }
      localStorage.setItem("puskesmas", action.payload.puskesmas)
      localStorage.setItem("user", JSON.stringify(action.payload))

      newState = action.payload
      return {user: action.payload, isAuth:true}
    case type.LOGOUT:
      return {
        user: null,
        isAuth: false,
      }
    default:
      return state
  }
}

export default  AuthReducer
 

export const LOGIN = (authData: any) => ({
  type: type.LOGIN,
  payload: authData,
})

export const LOGOUT = () => ({
  type: type.LOGOUT,
  payload: ''
})
