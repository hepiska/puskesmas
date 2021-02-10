import React,{useState} from "react"
import { Tag, Input, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'



const Tags : React.FC<any>= ({items, onDelete, addTag}) => {
  const [newTag, setNewTag] = useState("")
  const addnewtag = () => {
    addTag(newTag)
    setNewTag("")
  }
  return(
    <> 
      {items && items.map((item: any) => {
        return( <Tag onClose={() => {onDelete(item)}} closable key={item.value}> {item.text}</Tag>)
      })}
      <Input style={{margin:"5px 0px"}} value={newTag} 
        onChange={({target}: any) => setNewTag(target.value) } 
        onPressEnter={addnewtag} /> 
    </>
  )
}


export default Tags