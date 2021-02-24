import React from "react"
import { Layout, Menu, Breadcrumb, Image , Typography} from 'antd'
import "./layout.css"

const {Title} = Typography

const { Header, Content, Footer } = Layout

const UserLayout : React.FC<any>= ({children, name, style, action}) => {
  return (
    <Layout id="components-layout-demo-fixed">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' , backgroundColor: 'white', padding: 0, 
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.12)'}}  >
        <div style={{width: '100%', maxWidth: 680, margin: "0px auto", padding: "12px",}}>
          <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex',  alignItems: 'center'}}>
              <Image src="/logo.png" height={31} width={31}  />
              {!action &&  <Title level={3} style={{ margin: "0px 16px"}}>{name || "Antrian Puskesmas"}</Title> }
            </div>
            {action}
          </div>

        </div>
      </Header>
      <Content className="site-layout" style={{ margin:"64px auto 0px", width:"100%", maxWidth: 680, }}>
        <div className="site-layout-background" style={ { padding: "16px 8px 64px", minHeight: 480, width: "100%", display: "flex", flexDirection: "column",...style}}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>antri puskes ©2021 Created by FCT</Footer>
    </Layout>
  )
}

export default UserLayout