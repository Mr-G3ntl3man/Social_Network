import React from "react";
import s from './homePage.module.scss'
import {NeonBtn} from "../common/NeonBtn/NeonBtn";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../redux/redux-store";
import {UserDataType} from "../../redux/reducer/auth-reducer";
import {Navigate} from "react-router-dom";
import rocket from '../../image/rocket.png'
import {PATH} from "../../Router/Routes";

const code = new URLSearchParams(window.location.search).get("code")

export const StartPage: React.FC = () => {
   const isAuth = useSelector<AppRootStateT, boolean>(state => state.auth.isAuth)
   const authorizedUser = useSelector<AppRootStateT, UserDataType | null>(state => state.auth.userData)

   if (code) return <Navigate replace to={PATH.SPOTIFY_MUSIC}/>

   if (isAuth) return <Navigate replace to={`/Social_Network/profile/${authorizedUser?.id}`}/>

   return (
      <div className={s.wrap}>

         <h1 className={s.mainTitle}>Social Network <span><img src={rocket} alt="rocket"/></span></h1>

         <p className={s.desc}>
            Yo stranger, this is SPA a small social network, a pet project on which a juniors developer trains.
         </p>
         <p className={s.desc}>
            To see the entire stack that I have used go to my
            <a target='blank' href="https://github.com/MrGentelman/Social_network_React_Redux">GitHub</a>
         </p>
         <div className={s.descTeh}>
            <span>To test the application, register or log in!</span>
            {/*<div className={s.accountCredentials}>*/}
            {/*   <span>Email: free@samuraijs.com</span>*/}
            {/*   <span>Password: free</span>*/}
            {/*</div>*/}
            <div className={s.btnGroup}>
               <NeonBtn goAnotherSite={true} link={'https://social-network.samuraijs.com/signUp'} name={'Register'}/>
               <NeonBtn goAnotherSite={false} link={PATH.LOGIN} name={'Login'}/>
            </div>
         </div>
      </div>
   )
}