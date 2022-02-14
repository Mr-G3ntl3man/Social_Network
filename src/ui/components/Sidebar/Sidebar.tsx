import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/redux-store";
import {UserDataType} from "../../../bll/reducer/auth-reducer";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import {CommentOutlined, CustomerServiceOutlined, ProfileOutlined, UserOutlined} from "@ant-design/icons";
import {ButtonBurger} from "../common/ButtonBurger/ButtonBurger";
import s from './Sidebar.module.scss'
import {PATH} from "../../router/Routes";

export const Sidebar = () => {
   const authorizedUser = useSelector<AppRootStateT, UserDataType | null>(state => state.auth.userData)
   const [collapsed, setCollapsed] = useState<boolean>(false)
   const [scrollDistance, setScrollDistance] = useState<boolean>(false)

   const onClickHandler = () => setCollapsed(state => !state)

   const listenerScroll = () => {
      let scrollDistance = window.scrollY
      scrollDistance > 80 ? setScrollDistance(true) : setScrollDistance(false)
   }
   const listenerResize = () => {
      if (window.innerWidth < 750) setCollapsed(false)
   }

   const fixedSideBarClassName = collapsed
      ? `${s.fixedSideBar} ${scrollDistance ? s.fixed : ''}`
      : `${s.fixedSideBar} ${s.open} ${scrollDistance ? s.fixed : ''}`


   useEffect(() => {
      window.addEventListener('scroll', listenerScroll)
      window.addEventListener('resize', listenerResize)

      return () => {
         window.removeEventListener('scroll', listenerScroll)
         window.removeEventListener('resize', listenerResize)
      }
   }, [])

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
                  <Link to={authorizedUser ? `/Social_Network/profile/${authorizedUser.id}` : PATH.HOME}>Profile</Link>
               </Menu.Item>

               <Menu.Item key="2" icon={<UserOutlined/>}>
                  <Link to={PATH.USERS}>Users</Link>
               </Menu.Item>

               <Menu.Item key="3" icon={<CommentOutlined/>}>
                  <Link to={PATH.CHAT}>General Chat</Link>
               </Menu.Item>

               <Menu.Item key="4" icon={<CustomerServiceOutlined/>}>
                  <Link to={PATH.SPOTIFY_MUSIC}>Spotify Music</Link>
               </Menu.Item>
            </Menu>
         </div>
      </Layout.Sider>
   )
}