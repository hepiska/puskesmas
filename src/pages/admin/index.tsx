import React , {useState , memo} from "react"
import { Layout, Menu, Breadcrumb,  } from 'antd'
import { RouteComponentProps, Switch , Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import "./admin.css"
import 'react-quill/dist/quill.snow.css'
import { RouteItems } from './routes'
import {LOGOUT} from '@src/modules/auth'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu


interface AdminPagesProps  extends RouteComponentProps {
  test?:boolean
}
 

const AdminPages: React.FC <AdminPagesProps>= ({ history }) =>{
  const [collapsed, setIsCollapsed] = useState(false)
  const pos = history.location.pathname.split('/')
  const user = useSelector((state: any )=> state?.auth?.user)

  if(!user){
    history.replace("/")
  }

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[pos[2] || "puskesmas"]}>
          {RouteItems.filter(item => !item.hideSidebar).map((item) => {
            return (
              <Menu.Item key={item.key} icon={item.icon} onClick={() => {history.push(item.url)}}>
                {item.name}
              </Menu.Item>
            )
          })}
        </Menu>

      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick:() => setIsCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            {RouteItems.map(item => (<Route {...item} key={item.key}/> ))}
          </Switch>
        </Content>
      </Layout>

    </Layout>
  )
} 

export default memo(AdminPages)