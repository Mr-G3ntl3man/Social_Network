import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {StartPage} from "../components/StartPage/StartPage";
import LoginFormContainer from "../components/Login/LoginForm";
import {ProfileContainer} from "../components/Profile/Profile";
import {NotFound} from "../components/common/NotFound/NotFound";
import {Preloader} from "../components/common/Preloader/Preloader";

const DialogsContainer = React.lazy(() => import('../components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('../components/Users/UsersContainer'));

export const Routers = () => {

   return (
      <Suspense fallback={<Preloader/>}>
         <Routes>
            <Route index element={<StartPage/>}/>
            <Route path={'/login'} element={<LoginFormContainer/>}/>
            <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
            <Route path={'/messages'} element={<DialogsContainer/>}/>
            <Route path={'/users'} element={<UsersContainer/>}/>
            <Route path={'*'} element={<NotFound/>}/>
         </Routes>
      </Suspense>
   )
}