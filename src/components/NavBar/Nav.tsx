import React from "react"
import {NavLink} from "react-router-dom"
import s from './Nav.module.css'

export const Navigation = () => {
   return (
      <nav className={s.nav}>
         <ul className={s.list}>
            <li className={s.list__item}>
               <NavLink
                  to="/profile"
                  activeClassName={s.list__link_active}
                  className={s.list__link}>Profile</NavLink></li>

            <li className={s.list__item}>
               <NavLink
                  to="/messages"
                  activeClassName={s.list__link_active}
                  className={s.list__link}>Messages</NavLink></li>

            <li className={s.list__item}>
               <NavLink
                  to='/users'
                  activeClassName={s.list__link_active}
                  className={s.list__link}>Users</NavLink></li>
         </ul>
      </nav>
   )
}