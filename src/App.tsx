import React, {useEffect, useCallback} from 'react';
import {HashRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {AppStateType, initializedApp, installCaughtError} from "./redux/reducer/app-reducer";
import {Tooltip} from "./components/common/Tooltip/Tooltip";
import 'antd/dist/antd.css';
import {Layout, Breadcrumb} from 'antd';
import {Routers} from "./Router/Routes";
import {Sidebar} from "./components/Sidebar/Sidebar";
import s from './App.module.scss'
import {Header} from "./components/Header/Header";

const App: React.FC = (props) => {
   const {initialized, catchError} = useSelector<AppRootStateT, AppStateType>(state => state.app)

   const dispatch = useDispatch()

   const {Content, Footer,} = Layout;

   const catchUnhandledRejection = useCallback((e: PromiseRejectionEvent) => {
      dispatch(installCaughtError(e.reason.message, 'error'))
   }, [dispatch])

   useEffect(() => {
      dispatch(initializedApp())
   }, [dispatch])

   useEffect(() => {
      window.addEventListener('unhandledrejection', catchUnhandledRejection)

      return () => {
         window.removeEventListener('unhandledrejection', catchUnhandledRejection)
      }
   }, [catchUnhandledRejection])

   if (!initialized) {
      return <Preloader/>
   }

   return (
      <HashRouter>
         <Layout>
            <Header/>
            <Layout className={s.layoutSider} style={{minHeight: '100vh', margin: '15px 0 0 0'}}>
               <Sidebar/>
               <Layout className={s.siteLayout}>

                  <Content className={s.content}>
                     {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                     {/*   <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                     {/*   <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                     {/*</Breadcrumb>*/}

                     <Routers/>

                  </Content>
                  <Footer className={s.footer}>Small Developer ©2021 Created by Mr. Nobody</Footer>
               </Layout>
            </Layout>
         </Layout>

         {catchError.error &&
         <Tooltip
            messages={catchError.messageError}
            severity={catchError.severity} open={catchError.error}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>}
      </HashRouter>
   )
}

export default App