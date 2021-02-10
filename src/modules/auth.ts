const type = {
  LOGIN: 'auth/LOGIN_REQUEST',
  LOGOUT: 'auth/LOGOUT',
}

interface AuthType {
  user: any | null
  isAuth: boolean
}
  
const initialState: AuthType  = {
  user: null,
  isAuth: false,
}


const AuthReducer  = (state = initialState, action: any): AuthType => {
  let newState = { ...state }
  switch (action.type) {
    case type.LOGIN:
      if (action.payload === null) {
        return initialState
      }
      localStorage.setItem("puskesmas", action.payload.puskesmas)
      newState = action.payload
      return {user: action.payload, isAuth:true}
    case type.LOGOUT:
      return {
        user: '',
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
