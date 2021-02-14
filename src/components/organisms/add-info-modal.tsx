import React, {useEffect, useState, useMemo} from "react"
import { Row, Col, Divider, Button, Pagination, Modal, Input, Switch,Upload, Form, Select, message} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {addInfo} from '@src/methods/info'
import { upload} from '@src/methods/uploads'



const initalForm = {
  type: "running_text"
}
const {Option} = Select


const infoTypes = [{value:"running_text", text:"Running text"},
  {value: "image", text:"Gambar"},
  {value:"video", text:"Video"}]

const AddInfoModal: React.FC<any> = ({isOpen, onClose}) => {
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType]= useState("running_text")
  const onFinish = async (values: any) => {
    try {
      const data ={...values}
      if(data.image_url){
        data.url = data.image_url[0].response.url
        delete data.image_url
      }
      const res = await addInfo(data)
      onClose()
      setLoading(false)

    } catch (error) {
      setLoading(false)
      message.error(error.message)
    }
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const getData = useMemo(() => {
    switch (selectedType) {
      case "image": 
        return(
          <Form.Item name="image_url" label="Gambar" valuePropName="fileList"  
            getValueFromEvent={normFile} noStyle>
            <Upload
              listType="picture"
              maxCount={1}
              customRequest={async({file, onError, onSuccess}) => { 
                try {
                  const res = await upload(`info/image/${file.name}`,file) as any
                  const xhrs : any = res  || ''
                  if(onSuccess)
                    onSuccess({url: res || ''}, xhrs )
                }catch(err){
                  if(onError)
                    onError(err )
                }
              
              }}
            >
              <Button icon={<UploadOutlined />}>Click Untuk Upload Gambar</Button>
            </Upload>
          </Form.Item>
        )
      case "video":
        return(
          <Form.Item
            label="Url"
            name="url"
          >
            <Input />
          </Form.Item>
        )

      default:
        return(
          <Form.Item
            label="Text"
            name="text"
          >
            <Input />
          </Form.Item>
        )
    }

  },[selectedType])

  return(
    <Modal visible={isOpen} onCancel={onClose} title="Masukan Data" footer={[
      <Button key="batal" onClick={onClose} loading={loading}>Batal</Button>,
      <Button key="ok" form="adduserForm" type="primary" loading={loading} htmlType="submit">Simpan</Button>

    ]} >
      <Form id="adduserForm"         
        onFinish={onFinish}
        labelAlign="right"
        initialValues={initalForm}
      >
        <Form.Item label="Tipe" name="type" >
          <Select
            onChange={(value: string) => {setSelectedType(value)}}
          >
            {infoTypes.map((data: any) => <Option 
              key={data.value} 
              value={data.value}> {data.text}</Option>
            )}
          </Select>
        </Form.Item>
        {getData}
      </Form>

    </Modal>
  )
}

export default AddInfoModal