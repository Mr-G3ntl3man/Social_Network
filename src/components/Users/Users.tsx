import React from "react";
import {UserType} from "../../redux/reducer/users-reducer";
import s from "./user.module.css";


type UserPropsType = {
   users: UserType[]
}

export const User: React.FC<UserPropsType> = (props) => {

   return (
      <div className={s.userMain}>
         <div>
            {pages.map(el => <span
                  onClick={() => this.onClickSetPageHandler(el)}
                  className={this.props.userPage.currentPage === el ? `${s.selectedPage} ${s.defaultCount}` : s.defaultCount}
               >{el}</span>
            )}
         </div>


         {
            this.props.userPage.users.map(el => <div className={s.usersWrap} key={el.id}>
               <div className={s.userControl}>
                  <span className={s.avatar}>
                        <img
                           src={this.defaultAvatar(el.avatar)}
                           alt="avatar"/>
                     </span>

                  {el.followed ? <button onClick={() => this.onClickFollow(el.id)}>UnFollow</button> : <button
                     onClick={() => this.onClickFollow(el.id)}>Follow</button>}
               </div>

               <div className={s.userContent}>
                  <div className={s.userInfo}>
                     <span className={s.userName}>{el.name}</span>
                     <p className={s.userStatus}>{el.status}</p>
                  </div>
                  <div className={s.userLocation}>
                     <span className={s.userCountry}>{'el.location.country'}</span>
                     <span className={s.userCity}>{'el.location.city'}</span>
                  </div>
               </div>
            </div>)
         }
      </div>
   )
)
}