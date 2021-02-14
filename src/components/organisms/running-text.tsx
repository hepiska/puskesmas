import React from "react"
import {useInfos} from '@src/hooks/infos'
import Ticker from 'react-ticker'
import {Typography} from "antd"
const { Title } = Typography


const RunningText: React.FC<any>= () => {
  const [infos] = useInfos("running_text")
  if(!infos || !infos.length){
    return null
  }
  const infosStr = infos.reduce((acc: string, item: any) => {return `${acc}     |    ${item.text}` },"")
  return(
    <div style={{width: "100%", position:"absolute", zIndex: 2, bottom: 0, padding:"16px 0px", backgroundColor:"white"}}>
      <Ticker>
        {() => (<>
          <Title level={3} style={{whiteSpace:"pre-wrap"}}>{infosStr}</Title>
        </>)}
      </Ticker>
    </div>

  )
}

export default RunningText