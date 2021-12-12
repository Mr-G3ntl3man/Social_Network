import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import {DialogMess} from "./Message/Message";
import {DialogPerson} from "./DialogItem/DialogItem";
import {DialogsPropsType} from "./DialogsContainer";


export const Dialogs: React.FC<DialogsPropsType> = (props) => {
   const messages = props.dialogsPage.messages.map(el => <DialogMess key={el.id} message={`${el.message}`}/>)
   const dialogs = props.dialogsPage.dialogs.map(el => <DialogPerson name={`${el.name}`} id={`${el.id}`} key={el.id}/>)

   const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => props.changeText(e.currentTarget.value)

   const onClickAddMessHandler = () => props.addMessage()


   return (
      <div className={s.dialogs}>
         <div className={s.dialogsControl}>
            <textarea onChange={onChangeTextHandler} value={props.dialogsPage.newMessage}> </textarea>
            <button onClick={onClickAddMessHandler}>+</button>
         </div>

         <div className={s.dialogsContent}>
            <div className={s.dialogs__name}>
               {dialogs}
            </div>
            <div className={s.dialogs__mess}>
               {messages}
            </div>
         </div>

      </div>
   )
}

