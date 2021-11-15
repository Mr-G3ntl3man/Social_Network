import React from "react";
import s from "./user.module.css";
import {UsersType} from "../../redux/reducer/users-reducer";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";


type UsersPropsType = {
   userPage: UsersType
   unFollowSuccess: (userId: number) => void
   followSuccess: (userId: number) => void
}

export const Users: React.FC<UsersPropsType> = (props) => {
   const defaultAvatar = (src: string | null) => src ? src : 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'

   const pagesCount = Math.ceil(props.userPage.totalUserCount / props.userPage.pageSize)

   const pages = []

   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }
   const finalClassName = props.userPage.isFetching ? `${s.userMain} ${s.fetching}` : s.userMain

   const onClickUnFollowHandler = (id: number) => {
      props.unFollowSuccess(id)
   }

   const onClickFollowHandler = (id: number) => {
      props.followSuccess(id)
   }

   return (
      <div className={finalClassName}>
         {
            props.userPage.users.map(el => <div className={s.usersWrap} key={el.id}>
               <div className={s.userControl}>
                  <span className={s.avatar}>
                     <NavLink to={`/profile/${el.id}`}>
                        <img
                           src={defaultAvatar(el.photos.small)}
                           alt="avatar"/>
                     </NavLink>

               </span>

                  {el.followed
                     ? <Button
                        disabled={props.userPage.followingInProgress.some(id => id === el.id)}
                        variant="contained"
                        color="secondary"
                        onClick={() => onClickUnFollowHandler(el.id)}>UnFollow</Button>
                     : <Button
                        disabled={props.userPage.followingInProgress.some(id => id === el.id)}
                        variant="contained"
                        color="primary"
                        onClick={() => onClickFollowHandler(el.id)}>Follow</Button>}
               </div>

               <div className={s.userContent}>
                  <div className={s.userInfo}>
                     <span className={s.userName}>{el.name}</span>
                     <p className={s.userStatus}>{el.status || 'No status specified'}</p>
                  </div>
                  <div className={s.userLocation}>
                   <span className={s.userCountry}>
                     {el.location?.country || 'Country not specified'}</span>
                     <span className={s.userCity}>{el.location?.city || 'City not specified'}</span>
                  </div>
               </div>
            </div>)
         }
      </div>
   )
}