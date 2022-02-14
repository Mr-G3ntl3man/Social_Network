import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./chat.module.scss";
import {Button, TextField} from "@material-ui/core";
import {sendMessage, WS_STATUS} from "../../../bll/reducer/chat-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/redux-store";

export const SendMessageForm: React.FC = () => {
   const [message, setMessage] = useState<string>('')

   const wsStatus = useSelector<AppRootStateT, WS_STATUS>(state => state.chat.status)

   const dispatch = useDispatch()

   const OnClickHandler = () => {
      if (message) {
         dispatch(sendMessage(message))
         setMessage('')
      }
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement> | KeyboardEvent<HTMLButtonElement>) => {
      if (wsStatus === WS_STATUS.READY) {
         if (e.key === 'Enter' && message) {
            dispatch(sendMessage(message))
            setMessage('')
         }
      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)

   return (
      <div className={s.addMess}>
         <TextField
            onKeyPress={onKeyPressHandler}
            value={message}
            onChange={onChangeHandler}
            fullWidth
            label={'Write message'}
            margin={"normal"}
            variant={'outlined'}
            multiline
            minRows={1}
            maxRows={10}
         />

         <Button
            style={{fontFamily: `Mochiy Pop P One, sans-serif`}}
            disabled={wsStatus !== WS_STATUS.READY}
            onClick={OnClickHandler}
            onKeyPress={onKeyPressHandler}
            variant={"contained"}
            color="primary"
         >Send message</Button>
      </div>
   )
}