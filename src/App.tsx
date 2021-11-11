import React from 'react';
import './App.css';
import s from './App.module.css'
import {Navigation} from "./components/NavBar/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginPage} from "./components/Login/LoginPage";


const App: React.FC = (props) => {


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
                  <Route path='/login' render={() => <LoginPage/>}/>
               </div>

            </div>
         </div>
      </BrowserRouter>
   )
}

export default App;
