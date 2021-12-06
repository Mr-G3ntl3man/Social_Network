import React from "react";
import s from "./user.module.scss";
import {followSuccess, unFollowSuccess, UserType} from "../../redux/reducer/users-reducer";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import {Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../redux/redux-store";
import avatar from '../../image/defaultAvatar.jpg'

export const Users: React.FC = (props) => {
   const isFetching = useSelector<AppRootStateT, boolean>(state => state.usersPage.isFetching)
   const users = useSelector<AppRootStateT, UserType[]>(state => state.usersPage.users)
   const followingInProgress = useSelector<AppRootStateT, number[]>(state => state.usersPage.followingInProgress)

   const dispatch = useDispatch()

   const defaultAvatar = (src: string | null) => src ? src : avatar

   const finalClassName = isFetching ? `${s.userMain} ${s.fetching}` : s.userMain

   const onClickUnFollowHandler = (id: number) => dispatch(unFollowSuccess(id))

   const onClickFollowHandler = (id: number) => dispatch(followSuccess(id))

   return (
      <div className={finalClassName}>
         {
            users.map(el => <div className={s.usersWrap} key={el.id}>
               <div className={s.userControl}>
                  <span style={el.photos.small ? {} : {border: '2px solid #7e7e7e'}} className={s.avatar}>
                     <NavLink to={`/profile/${el.id}`}>
                        <img
                           src={defaultAvatar(el.photos.small)}
                           alt="avatar"/>
                     </NavLink>

               </span>

                  {el.followed
                     ? <Button
                        disabled={followingInProgress.some(id => id === el.id)}
                        variant="contained"
                        color="secondary"
                        onClick={() => onClickUnFollowHandler(el.id)}>UnFollow</Button>
                     : <Button
                        disabled={followingInProgress.some(id => id === el.id)}
                        variant="contained"
                        color="primary"
                        onClick={() => onClickFollowHandler(el.id)}>Follow</Button>}
               </div>

               <div className={s.userContent}>
                  <Paper className={s.paperContent} elevation={8}>
                     <div className={s.userInfo}>
                        <span className={s.userName}>{el.name}</span>
                        <p className={s.userStatus}><span>Status:</span> {el.status || 'No status specified'}</p>
                     </div>
                     <div className={s.userLocation}>
                   <span className={s.userCountry}>
                     {el.location?.country || 'Country not specified'}</span>
                        <span className={s.userCity}>{el.location?.city || 'City not specified'}</span>
                     </div>
                  </Paper>
               </div>
            </div>)
         }
      </div>
   )
}