import React, {useEffect, useRef, useState} from "react";
import s from './chat.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/redux-store";
import {
   ChatMessageT,
   startMessagesListening,
   stopMessagesListening,
   WS_STATUS
} from "../../../bll/reducer/chat-reducer";
import {Message} from "./Message";
import {SendMessageForm} from "./SendMessageForm";
import {Tooltip} from "../common/Tooltip/Tooltip";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../router/Routes";

export const Chat: React.FC = () => {
   const wsStatus = useSelector<AppRootStateT, WS_STATUS>(state => state.chat.status)
   const messages = useSelector<AppRootStateT, ChatMessageT[]>(state => state.chat.messages)
   const wsError = useSelector<AppRootStateT, boolean>(state => state.chat.error)
   const isAuth = useSelector<AppRootStateT, boolean>(state => state.auth.isAuth)

   const [autoScroll, setAutoScroll] = useState<boolean>(false)
   const [startScroll, setStartScroll] = useState<boolean>(false)

   const usersMessages = messages.map((user) => <Message key={user.id} user={user}/>)

   const messagesDivRef = useRef<HTMLDivElement>(null)

   const dispatch = useDispatch()

   const navigate = useNavigate()


   useEffect(() => {
      if (!isAuth) return navigate(PATH.HOME)

      dispatch(startMessagesListening())

      return () => {
         dispatch(stopMessagesListening())
      }
   }, [dispatch])


   useEffect(() => {
      const target = messagesDivRef.current

      if (startScroll) {

         if (autoScroll) {
            target && target.scrollBy({
               top: target.scrollHeight,
               behavior: 'smooth'
            })
         }

      } else {
         target && (target.scrollTop = target.scrollHeight)
      }

      return () => {
         setStartScroll(false)
      }
   }, [messages])


   const onScrollHandler = () => {
      const target = messagesDivRef.current

      if (target) {
         const clientHeight = target.clientHeight
         const scrollDistance = Math.floor(target.scrollHeight - target.scrollTop)

         if (clientHeight >= scrollDistance) {
            !autoScroll && setAutoScroll(true)
            setStartScroll(true)
         } else {
            autoScroll && setAutoScroll(false)
         }
      }
   }

   return (
      <>
         {wsStatus === WS_STATUS.ERROR &&
         <Tooltip
            messages={'Something went wrong, please reload the page!!!'}
            severity={'error'} open={wsError}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>}

         <div className={s.mainWrap}>
            <div ref={messagesDivRef} onScroll={onScrollHandler} className={s.messageWrap}>
               {usersMessages}
            </div>

            <SendMessageForm/>
         </div>
      </>
   )
}

export default Chat