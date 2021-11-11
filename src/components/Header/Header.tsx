import React from "react";
import {NavLink} from "react-router-dom";
import s from './Header.module.css'
import {HeaderContainerType} from "./HeaderContainer";

export const Header: React.FC<HeaderContainerType> = (props) => {

   return (
      <header className={s.header}>
         <span className={s.logo}><img
            src={'https://c4.wallpaperflare.com/wallpaper/891/59/630/fsociety-mr-robot-logo-4k-wallpaper-preview.jpg'}
            alt={'logo'}/></span>

         <div className={s.loginBlock}>
            {props.authDate.login ? props.authDate.login : <NavLink to={'/Login'}>Login</NavLink>}
         </div>
      </header>
   )
}