import React from "react"
import s from '../style/Nav.module.css'

export const Nav = () => {
   return(
      <nav className={s.nav}>
         <ul className={s.list}>
            <li className="list__item"><a href="#" className="list__link">Profile</a></li>
            <li className="list__item"><a href="#" className="list__link">Messages</a></li>
            <li className="list__item"><a href="#" className="list__link">News</a></li>
            <li className="list__item"><a href="#" className="list__link">Music</a></li>
            <li className="list__item"><a href="#" className="list__link">Settings</a></li>
         </ul>
      </nav>
   )
}