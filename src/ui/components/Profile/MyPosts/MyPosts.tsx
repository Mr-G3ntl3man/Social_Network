import React, {ChangeEvent} from "react";
import s from './MyPosts.module.scss'
import {Post} from "./Post/Post";

import {Button, Paper, TextField} from "@material-ui/core";
import {addPostAC, changeTextAC, ProfilePageType} from "../../../../bll/reducer/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../../bll/redux-store";

type MyPostsPropsT = {
   authorizedProfile: boolean
}

export const MyPosts: React.FC<MyPostsPropsT> = React.memo((props) => {
   const profilePage = useSelector<AppRootStateT, ProfilePageType>(state => state.profilePage)
   const dispatch = useDispatch()

   const postElem = profilePage.posts.length
      ? profilePage.posts.map(el => <Post
         authorizedProfile={props.authorizedProfile}
         id={el.id}
         profileAvatar={profilePage.profile?.photos.small}
         key={el.id} message={el.message}
         likesCount={el.likesCount}/>)
      : <Paper style={{padding: '20px'}} elevation={2}>
         <div style={{fontFamily: `Mochiy Pop P One, sans-serif`, fontSize: '18px', letterSpacing: '1px'}}>
            There are no posts
         </div>
      </Paper>

   const onClickForNewPosts = () => dispatch(addPostAC())

   const onChangeFromTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => dispatch(changeTextAC(e.currentTarget.value))

   return (
      <div className={s.main}>
         <h3>My post</h3>

         {props.authorizedProfile &&
         <div className={s.addPost}>
            <div className={s.textFieldWrap}>
               <TextField
                  className={s.textFieldWrap}
                  value={profilePage.newPostText}
                  onChange={onChangeFromTextArea}
                  label="You news..."
                  variant="outlined"/>
            </div>

            <div className={s.btnWrap}>
               <Button
                  style={{
                     color: 'white',
                     fontFamily: `Mochiy Pop P One, sans-serif`
                  }}
                  className={s.addPostBtn}
                  onClick={onClickForNewPosts}
                  variant="contained"> Add post</Button>
            </div>
         </div>}
         {postElem}
      </div>
   )
})


