
interface userType {
  name?: string
  email: string
  puskesmas?: string
  userId: string
}

interface createUserType  extends userType {
  password: string
  confirmPassword: string
}


interface routeComponentP extends RouteComponentProps{
  test: boolean
}


interface tablePageInput {
  key?: string
  limit?: number
  last?: Array<any> | null
  direction?: string
}

interface MessageResponseType {
  key?:string,
  message: string
}