import React, {useState, useEffect} from "react"
import {Switch} from 'antd'
import { deleteVoice, getVoices } from '@src/methods/voice-queue'



const textToVoice = (text: string, voices: any) => {
  if(window.speechSynthesis){
    const audio = new Audio('ding.wav')
    audio.play()
    
    const timeout = setTimeout(() => {
      const msg = new SpeechSynthesisUtterance()
      msg.text = text
      msg.pitch = 1
      msg.rate = 0.8
      msg.voice = voices[6]
      window.speechSynthesis.speak(msg)
      return () => clearTimeout(timeout)
    }, 4000)
  }

}

const VoiceComponent : React.FC<any> = ({style, soundOn, soundChange}) => {
  const [curentVoice, setCurrentVoice] = useState<any| null>(null)
  let voices = window.speechSynthesis.getVoices()


  useEffect(() => {
    const timeout = setTimeout(() => {
      voices = window.speechSynthesis.getVoices()
    },100)
    getVoices().orderBy("createdAt","asc").limit(1).onSnapshot(docs => {
      const data : Array<any> = []
      docs.forEach(doc => {
        data.push({...doc.data(), key: doc.id})
      })
      setCurrentVoice(data[0])
    })
    return () => {
      if(timeout){
        clearTimeout(timeout)
      }
    }
  },[])

  useEffect(() =>{ 
    let timeout : any
    console.log("curentVoice",curentVoice)

    if(soundOn && curentVoice) {
      timeout =  setTimeout(() =>{ 
        textToVoice(curentVoice.text, voices)
        deleteVoice(curentVoice.key)
      }, 3000)
    }


    return () => {
      if(timeout){
        clearTimeout(timeout)
      }
    }  
  },[soundOn, curentVoice && curentVoice.text])

  
  return(
    <div style={style}>
      <span style={{margin:"0px 5px"}}>Nyalakan suara</span>
      <Switch  checked={soundOn} onChange={() =>{
        if(soundChange){
          soundChange()
        }
      }}   />
    </div>
  )
}


export default VoiceComponent