import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
   return(
      <main className={s.main}>
      <MyPosts/>
      </main>
   )
}