import React, {useEffect, useCallback} from 'react';
import {HashRouter} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {initializedApp, installCaughtError, SeverityTooltipType} from "./redux/reducer/app-reducer";
import {Tooltip} from "./components/common/Tooltip/Tooltip";
import 'antd/dist/antd.css';
import {Layout, Breadcrumb} from 'antd';
import {Routers} from "./Router/Routes";
import {Sidebar} from "./components/Sidebar/Sidebar";
import s from './App.module.scss'
import {Header} from "./components/Header/Header";

const App: React.FC<AppPropsType> = (props) => {
   const {initializedApp, initialized, catchError, installCaughtError} = props

   const {Content, Footer,} = Layout;

   const catchUnhandledRejection = useCallback((e: PromiseRejectionEvent) => {
      installCaughtError(e.reason.message, 'error')
   }, [installCaughtError])

   useEffect(() => {
      initializedApp()
   }, [initializedApp])

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
                     <div className="site-layout-background" style={{padding: 10, minHeight: 360}}>
                        <Routers/>
                     </div>
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

type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

type MapStateToPropsType = {
   initialized: boolean
   catchError: {
      error: boolean
      messageError: string | null
      severity: SeverityTooltipType
   }
}

type MapDispatchToPropsType = {
   initializedApp: () => void
   installCaughtError: (message: string, severity: SeverityTooltipType) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
   initialized: state.app.initialized,
   catchError: state.app.catchError
})

export default connect(mapStateToProps, {initializedApp, installCaughtError})(App)