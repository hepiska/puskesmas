import React from "react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


interface IRichTextProps{
  value: string
  onChange: (value: string) => void
}

const RichText : React.FC<any>= ({onChange, value }) => {
  return( 
    <ReactQuill theme="snow" value={value ||"<p></p>"} onChange={onChange} />
  )
}

export default RichText

