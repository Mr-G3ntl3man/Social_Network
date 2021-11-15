import React from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/Profile";
import {PostsContainer} from "./MyPosts/PostsContainer";
import {Preloader} from "../common/Preloader/Preloader";
import {ProfileContainerType} from "./ProfileContainer";


export const Profile: React.FC<ProfileContainerType> = (props) => {
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