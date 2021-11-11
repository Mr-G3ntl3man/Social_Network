import React from "react";
import {NavLink} from "react-router-dom";
import s from './Header.module.css'

export const Header = () => {
   return (
      <header className={s.header}>
         <span className={s.logo}><img
            src={'https://c4.wallpaperflare.com/wallpaper/891/59/630/fsociety-mr-robot-logo-4k-wallpaper-preview.jpg'}
            alt={'logo'}/></span>

         <div className={s.loginBlock}>
            <NavLink to={'/login'}>Login</NavLink>
         </div>
      </header>
   )
}