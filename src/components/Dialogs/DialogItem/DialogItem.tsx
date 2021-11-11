import React from "react";
import { NavLink } from "react-router-dom";
import s from '../Dialogs.module.css'


export const DialogPerson:  React.FC<{name:string, id: string}> = (props) => {
   return(
      <div className={s.dialogs__person}>
         <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
      </div>
   )
}


