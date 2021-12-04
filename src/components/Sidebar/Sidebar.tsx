import React, {createRef, RefObject, useState} from "react"
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {UserDataType} from "../../redux/reducer/auth-reducer";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import {MessageOutlined, ProfileOutlined, UserOutlined} from "@ant-design/icons";
import {ButtonBurger} from "../common/ButtonBurger/ButtonBurger";
import s from './Sidebar.module.scss'

export const Sidebar = () => {
   const authorizedUser = useSelector<AppStateType, UserDataType | null>(state => state.auth.userData)
   const [collapsed, setCollapsed] = useState<boolean>(false)
   const [scrollDistance, setScrollDistance] = useState<boolean>(false)

   const onClickHandler = () => setCollapsed(state => !state)

   window.addEventListener('scroll', () => {
      let scrollDistance = window.scrollY
      scrollDistance > 80 ? setScrollDistance(true) : setScrollDistance(false)
   })

   window.addEventListener('resize', () => {
      if (window.innerWidth < 750) setCollapsed(state => false)
   })

   const fixedSideBarClassName = collapsed
      ? `${s.fixedSideBar} ${scrollDistance ? s.fixed : ''}`
      : `${s.fixedSideBar} ${s.open} ${scrollDistance ? s.fixed : ''}`

   return (
      <Layout.Sider
         trigger={null}
         collapsible
         className={collapsed ? s.layoutHidden : `${s.layoutHidden} ${s.open}`}
         collapsed={collapsed}
         onCollapse={onClickHandler}>
         <div className={fixedSideBarClassName}>
            <div className={collapsed ? s.sideBarTrigger : `${s.sideBarTrigger} ${s.open}`}>
               <ButtonBurger toggleOpenMenu={onClickHandler}/>
            </div>
            <Menu theme="dark" mode="inline">
               <Menu.Item key="1" icon={<ProfileOutlined/>}>
                  <Link to={authorizedUser ? `/profile/${authorizedUser.id}` : '/login'}>Profile</Link>
               </Menu.Item>
               <Menu.Item key="2" icon={<MessageOutlined/>}>
                  <Link to="/messages">Messages</Link>
               </Menu.Item>
               <Menu.Item key="3" icon={<UserOutlined/>}>
                  <Link to="/users">Users</Link>
               </Menu.Item>
            </Menu>
         </div>

      </Layout.Sider>
   )
}