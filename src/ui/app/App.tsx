import React, {useEffect, useCallback, FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../bll/redux-store";
import {Preloader} from "../components/common/Preloader/Preloader";
import {AppStateType, initializedApp, installCaughtError} from "../../bll/reducer/app-reducer";
import {Tooltip} from "../components/common/Tooltip/Tooltip";
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {Routers} from "../router/Routes";
import {Sidebar} from "../components/Sidebar/Sidebar";
import s from './App.module.scss'
import {Header} from "../components/Header/Header";

const App: FC = () => {
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

   const errorHandler = catchError.error &&
      <Tooltip
         open={catchError.error}
         severity={catchError.severity}
         messages={catchError.messageError}
         anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>

   if (!initialized) {
      return <Preloader/>
   }

   return (
      <>
         <Layout>
            <Header/>

            <Layout className={s.layoutSider} style={{minHeight: '100vh', margin: '15px 0 0 0'}}>
               <Sidebar/>

               <Layout className={s.siteLayout}>
                  <Content className={s.content}>
                     <Routers/>
                  </Content>

                  <Footer className={s.footer}> &copy; {new Date().getFullYear()} Mr.G3ntl3man. All rights
                     reserved.</Footer>
               </Layout>

            </Layout>
         </Layout>

         {errorHandler}
      </>
   )
}

export default App