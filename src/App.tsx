import React, {useEffect} from 'react';
import s from './App.module.css'
import {Navigation} from "./components/NavBar/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginFormContainer} from "./components/Login/LoginForm";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {initializedApp} from "./redux/reducer/app-reducer";


const App: React.FC<AppPropsType> = (props) => {

   const {initializedApp, initialized} = props

   useEffect(() => {
      initializedApp()
   }, [])

   if (!initialized) {
      return <Preloader/>
   }

   return (
      <BrowserRouter>
         <div className={s.app}>
            <HeaderContainer/>
            <div className={s.flex}>
               <div className={s.flexItemLeft}>
                  <Navigation/>
               </div>
               <div className={s.flexItemRight}>
                  <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                  <Route path='/messages' render={() => <DialogsContainer/>}/>
                  <Route path='/users' render={() => <UsersContainer/>}/>
                  <Route path='/login' render={() => <LoginFormContainer/>}/>
               </div>
            </div>
         </div>
      </BrowserRouter>
   )
}

type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

type MapStateToPropsType = { initialized: boolean }

type MapDispatchToPropsType = { initializedApp: () => void }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
   initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializedApp})(App)