import React from "react";
import s from './homePage.module.scss'
import {NeonBtn} from "../common/NeonBtn/NeonBtn";

export const StartPage: React.FC = () => {
   return (
      <div className={s.wrap}>

         <h1 className={s.mainTitle}>Social Network 🚀</h1>
         <p className={s.desc}>
            Yo stranger, this is SPA a small social network, a pet project on which a juniors developer trains.
         </p>
         <p className={s.desc}>
            To see the entire stack that I have used go to my
            <a target='blank' href="https://github.com/MrGentelman/Social_network_React_Redux">GitHub</a>
         </p>
         <div className={s.descTeh}>
            <span>To test the application, you need to register or log in.</span>
            <div className={s.btnGroup}>
               <NeonBtn goAnotherSite={true} link={'https://social-network.samuraijs.com/signUp'} name={'Register'}/>
               <NeonBtn goAnotherSite={false} link={'/login'} name={'Login'}/>
            </div>
         </div>
      </div>
   )
}