import React from "react";
import s from '../Dialogs.module.css'



export const DialogMess: React.FC<{message: string}> = (props) => {
   return(
      <div className={s.dialogs__content}>{props.message}</div>
   )
}

