import React, {useState} from "react";
import s from './Post.module.scss'
import {IconButton, Paper} from "@material-ui/core";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useDispatch} from "react-redux";
import {deletePostSuccess, setLikeSuccess} from "../../../../redux/reducer/profile-reducer";
import ClearIcon from '@mui/icons-material/Clear';

type PostPropsType = {
   message: string,
   likesCount: number,
   profileAvatar: string | null | undefined
   id: string
   authorizedProfile: boolean
}

export const Post: React.FC<PostPropsType> = (props) => {
   const defaultAvatar = (src: string | null | undefined) => src ? src : 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'
   const [like, setLike] = useState<boolean>(false)

   const dispatch = useDispatch()

   const likePost = () => {
      setLike(state => !state)
      dispatch(setLikeSuccess(props.likesCount + 1, props.id))
   }

   const removeLikePost = () => {
      setLike(state => !state)
      dispatch(setLikeSuccess(props.likesCount - 1, props.id))
   }

   const deletePost = () => dispatch(deletePostSuccess(props.id))

   return (
      <div className={s.wrap}>
         <Paper style={{width: '100%'}} elevation={5}>
            <div className={s.post}>
               <div className={s.postWrap}>
                  <span className={s.postAvatar}><img src={defaultAvatar(props.profileAvatar)} alt="avatar"/></span>

                  <p className={s.desc}>
                     {props.message}
                  </p>

               </div>

               <div className={s.likeControl}>
                  {like
                     ? <IconButton color="primary"
                                   aria-label="like post"
                                   component="span"
                                   onClick={removeLikePost}
                                   size={'medium'}>
                        <FavoriteIcon fontSize={'medium'}/>
                     </IconButton>
                     : <IconButton color="primary"
                                   aria-label="like post"
                                   component="span"
                                   onClick={likePost}
                     >
                        <FavoriteBorderIcon fontSize={'medium'}/>
                     </IconButton>}
                  <span className={s.likeCount}>{props.likesCount} </span>

                  {props.authorizedProfile &&
                  <div className={s.clearIcon}>
                     <IconButton
                        color="primary"
                        aria-label="delete post"
                        component="span"
                        onClick={deletePost}>
                        <ClearIcon fontSize={'large'}/>
                     </IconButton>
                  </div>}
               </div>
            </div>
         </Paper>
      </div>
   )
}