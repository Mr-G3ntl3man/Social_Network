import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {StartPage} from "../components/StartPage/StartPage";
import LoginFormContainer from "../components/Login/LoginForm";
import {ProfileContainer} from "../components/Profile/Profile";
import {NotFound} from "../components/common/NotFound/NotFound";
import {Preloader} from "../components/common/Preloader/Preloader";
import {Music} from "../components/SpotifyMusic/Music";

const ProfileContainerTest = React.lazy(() => import('../components/Profile/Profile'));
const UsersContainer = React.lazy(() => import('../components/Users/UsersContainer'));
const GeneralChat = React.lazy(() => import('../components/GeneralChat/Chat'));

export const Routers = () => {
   return (
      <Suspense fallback={<Preloader/>}>
         <Routes>
            <Route path={'/'} element={<StartPage/>}/>
            <Route path={'/login'} element={<LoginFormContainer/>}/>
            <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
            <Route path={'/chat'} element={<GeneralChat/>}/>
            <Route path={'/users'} element={<UsersContainer/>}/>
            <Route path={'/music'} element={<Music/>}/>
            <Route path={'*'} element={<NotFound/>}/>
         </Routes>
      </Suspense>
   )
}