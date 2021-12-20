import {Button, makeStyles} from "@material-ui/core";
import React from "react";
import {useNavigate} from "react-router-dom";
import s from './Header.module.scss'
import {Avatar, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AuthStateType, logout} from "../../redux/reducer/auth-reducer";
import {AppRootStateT} from "../../redux/redux-store";
import {PhotoType} from "../../redux/reducer/profile-reducer";
import {PATH} from "../../Router/Routes";


export const Header: React.FC = () => {
   const navigate = useNavigate()

   const dispatch = useDispatch()

   const authDate = useSelector<AppRootStateT, AuthStateType>(state => state.auth)

   const avatar = useSelector<AppRootStateT, PhotoType | null>(state => state.auth.photo)

   const onClickHandlerLogout = () => {

      dispatch(logout())

      setTimeout(() => navigate(PATH.HOME), 100)
   }

   const onClickHandlerLogin = () => navigate(PATH.LOGIN)

   const style = makeStyles(() => ({
      default: {
         marginLeft: '20px',
         fontFamily: `Mochiy Pop P One, sans-serif`
      }
   }))

   return (
      <Layout.Header className={s.header}>
         <Avatar src={avatar?.small} size={'large'}/>

         {authDate.userData?.login
            ? <div className={s.loginBlock}>
               Welcome {authDate.userData?.login}
               <Button
                  className={style().default}
                  onClick={onClickHandlerLogout}
                  variant={"contained"}
                  color="primary">Logout</Button>
            </div>
            : <div className={s.loginBlock}>
               <Button
                  className={style().default}
                  onClick={onClickHandlerLogin}
                  variant={"contained"}
                  color="primary">Login</Button>
            </div>}
      </Layout.Header>
   )
}

