import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostsPropsType} from "./PostsContainer";
import {Button, TextField} from "@material-ui/core";


export const MyPosts: React.FC<PostsPropsType> = (props) => {
   const postElem = props.profilePage.posts.map(el => <Post profileAvatar={props.profilePage.profile?.photos.small}
                                                            key={el.id} message={el.message}
                                                            likesCount={el.likesCount}/>)

   const onClickForNewPosts = () => props.onClickForNewPosts()

   const onChangeFromTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => props.onChangeFromTextArea(e.currentTarget.value)


   return (
      <div className={s.main}>
         <h3>My post</h3>

         <div className={s.addPost}>
            <div className={s.textFieldWrap}>
               <TextField
                  className={s.textFieldWrap}
                  value={props.profilePage.newPostText}
                  onChange={onChangeFromTextArea}
                  label="You news..."
                  variant="outlined"/>
            </div>

            <div className={s.btnWrap}>
               <Button
                  className={s.addPostBtn}
                  onClick={onClickForNewPosts}
                  variant="contained"> Send</Button>
            </div>
         </div>
         {postElem}
      </div>
   )
}