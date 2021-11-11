import React from "react";
import s from './Post.module.css'

type PostPropsType = {
   message: string,
   likesCount: number,
   profileAvatar: string | null | undefined
}

export const Post: React.FC<PostPropsType> = (props) => {
   const defaultAvatar = (src: string | null | undefined) => src ? src : 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'

   return (
      <div className={s.post}>

         <span className={s.postAvatar}> <img src={defaultAvatar(props.profileAvatar)} alt="avatar"/> </span>

         <p className={s.desc}>
            {props.message}
         </p>

         <div className={s.likeControl}>
            <span className={s.dislike}> </span>
            <span className={s.like}> </span>
            <span className={s.likeCount}>{props.likesCount} </span>
         </div>

      </div>
   )
}