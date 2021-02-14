import {
  useLocation
} from "react-router-dom"


export const  useQuery = () =>  {
  const queries =  new URLSearchParams(useLocation().search)
  return [queries]
}