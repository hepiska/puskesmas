import React, { FC, ReactElement } from "react"
import {
  UserOutlined,
  AlertOutlined,
  HomeOutlined,
  FileImageOutlined,
  FormOutlined,
  BookOutlined
  
} from '@ant-design/icons'
import PuskesmasPage from "./puskesmas"
import UserPage from "./user"
import ServicePage from "./service"
import InfoPage from "./info"
import NewUserPage from "./new-user"
import ServiceDetailPage from "./services-detail"
import RegistrationPage from "./registration"
import BlogsPage from "./blogs"
import DetailBlogPage from "./blog-detail"



interface RouteItem {
  icon?: ReactElement,
  key: string
  name: string
  path: string 
  exact?: boolean
  hideSidebar?: boolean
  url: string
  component: FC
}

export const RouteItems:Array<RouteItem> = [
  {
    key: "puskesmas",
    name: "Puskesmas",
    exact: true,
    url: "/admin",
    path: "/admin",
    icon: <HomeOutlined />,
    component: PuskesmasPage
  },
  {
    key: "layanan",
    name: "Layanan",
    url: "/admin/layanan",
    path: "/admin/layanan",
    exact: true,
    icon: <AlertOutlined />,
    component: ServicePage
  },
  {
    key: "pendaftaran",
    name: "Pendaftaran",
    exact: true,
    icon: <BookOutlined />,
    url:"/admin/pendaftaran",
    path: "/admin/pendaftaran",
    component:RegistrationPage
  },
  {
    key:"info",
    name: "Informasi",
    component: InfoPage,
    url: "/admin/info",
    path: "/admin/info",
    icon: <FileImageOutlined />
  },
  {
    key: "blogs",
    name: "Blogs",
    url: "/admin/blogs",
    path: "/admin/blogs",
    icon: <FormOutlined />,
    exact: true,
    component: BlogsPage
  },
  {
    key: "pengguna",
    name: "Admin",
    url: "/admin/pengguna",
    path: "/admin/pengguna",
    exact: true,
    icon: <UserOutlined />,
    component: UserPage
  },
  {
    key: "admin-baru",
    name: "Admin Baru",
    hideSidebar: true,
    url: "/admin/pengguna/baru",
    path: "/admin/pengguna/baru",
    exact: true,
    component: NewUserPage
  },
  {
    key: "detail-layanan",
    name: "Detail layanan",
    hideSidebar: true,
    url: "/admin/layanan/:id",
    path: "/admin/layanan/:id",
    exact: true,
    component: ServiceDetailPage
  },
  {
    key: "detail-blog",
    name: "Detail Blog",
    hideSidebar: true,
    url: "/admin/blogs/:id",
    path: "/admin/blogs/:id",
    exact: true,
    component: DetailBlogPage
  },
  

]