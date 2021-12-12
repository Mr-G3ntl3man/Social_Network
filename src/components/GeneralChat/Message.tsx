import React from "react";
import s from "./chat.module.scss";
import {ChatMessageT} from "../../redux/reducer/chat-reducer";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../redux/redux-store";
import {Link} from "react-router-dom";
import {Avatar} from "antd";
import defaultAvatar from "../../image/defaultAvatar.jpg";

export const Message: React.FC<{ user: ChatMessageT }> = React.memo(({user}) => {
   const authorizedUserId = useSelector<AppRootStateT, number | undefined>(state => state.auth.userData?.id)

   const userMessage = <div className={s.userMess}>
      <div>
         <Link to={`/profile/${user.userId}`}>
            <Avatar style={user.photo ? {} : {border: '2px solid #7e7e7e'}} className={s.avatar}
                    src={user.photo || defaultAvatar} size={'large'}/>
         </Link>
      </div>

      <p className={s.userText}>
         <span>{user.userName}</span>
         {user.message}
      </p>
   </div>


   const ownerMessage = <div className={s.myMess}>
      <p className={s.myText}>
         {user.message}
      </p>
   </div>

   return (authorizedUserId === user.userId) ? ownerMessage : userMessage
})