import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {StartPage} from "../components/StartPage/StartPage";
import LoginFormContainer from "../components/Login/LoginForm";
import {ProfileContainer} from "../components/Profile/Profile";
import {NotFound} from "../components/common/NotFound/NotFound";
import {Preloader} from "../components/common/Preloader/Preloader";
import {Music} from "../components/SpotifyMusic/Music";

const UsersContainer = React.lazy(() => import('../components/Users/UsersContainer'));
const GeneralChat = React.lazy(() => import('../components/GeneralChat/Chat'));

enum PATH {
   LOGIN = '/login',
   PROFILE_USER = '/profile/:userId',
   CHAT = '/chat',
   USERS = '/users',
   SPOTIFY_MUSIC = '/spotifyMusic',
}

export const Routers = () => {
   return (
      <Suspense fallback={<Preloader/>}>
         <Routes>
            <Route index element={<StartPage/>}/>
            <Route path={PATH.LOGIN} element={<LoginFormContainer/>}/>
            <Route path={PATH.PROFILE_USER} element={<ProfileContainer/>}/>
            <Route path={PATH.CHAT} element={<GeneralChat/>}/>
            <Route path={PATH.USERS} element={<UsersContainer/>}/>
            <Route path={PATH.SPOTIFY_MUSIC} element={<Music/>}/>
            <Route path={'*'} element={<NotFound/>}/>
         </Routes>
      </Suspense>
   )
}