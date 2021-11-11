import React from "react";
import { NavLink } from "react-router-dom";
import s from './Dialogs.module.css'
import {DialogMess} from "./Message/Message";


const DialogPerson:  React.FC<{name:string, id: string}> = (props) => {
   return(
      <div className={s.dialogs__person}>
         <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
      </div>
   )
}


export const Dialogs = () => {
   const dialogData = [
      {id: 1, name: 'Name1'},
      {id: 2, name: 'Name2'},
      {id: 3, name: 'Name3'},
      {id: 4, name: 'Name5'},
   ]

   const messageData = [
      {id: 1, message: 'lorem Yo'},
      {id: 2, message: 'lorem Yo'},
      {id: 3, message: 'lorem Yo'},
      {id: 4, message: 'lorem Yo'},
   ]

   return(
      <div className={s.dialogs}>
            <div className={s.dialogs__name}>
               {dialogData.map(el => <DialogPerson name={`${el.name}`} id={`${el.id}`}/>)}
            </div>
            <div className={s.dialogs__mess}>
               {messageData.map(el => <DialogMess message={`${el.message}`}/>)}
            </div>
      </div>
   )
}