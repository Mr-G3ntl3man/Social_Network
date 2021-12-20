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
   HOME = "/Social_Network",
   LOGIN = '/Social_Network/login',
   PROFILE_USER = '/Social_Network/profile/:userId',
   CHAT = '/Social_Network/chat',
   USERS = '/Social_Network/users',
   SPOTIFY_MUSIC = '/Social_Network/spotifyMusic',
}

export const Routers = () => {
   return (
      <Suspense fallback={<Preloader/>}>
         <Routes>
            <Route path={PATH.HOME} element={<StartPage/>}/>
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