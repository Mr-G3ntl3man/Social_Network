import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/Profile";
import {PostsContainer} from "./MyPosts/PostsContainer";
import {MapStateToPropsType} from "./ProfileContainer";
import {Preloader} from "../common/Preloader/Preloader";


export const Profile: React.FC<MapStateToPropsType> = (props) => {
   const finalClassName = !props.profile ? `${s.main} ${s.fetching}` : s.main

   if (!props.profile) {
      return <Preloader/>
   }

   return (
      <main className={finalClassName}>
         <ProfileInfo {...props} />
         <PostsContainer/>
      </main>
   )
}