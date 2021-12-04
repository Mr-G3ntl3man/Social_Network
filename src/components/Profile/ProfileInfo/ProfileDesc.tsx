import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.scss'
import {ProfileContainerType} from "../Profile";
import {ProfileInfo} from "./ProfileInfo";
import {ProfileInfoEditForm} from "./ProfileInfoEditForm";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Button} from "@material-ui/core";
import {Avatar, Image} from 'antd';

type ProfileInfoType = {
   authorizedProfile: boolean
}


export const ProfileDesc: React.FC<ProfileContainerType & ProfileInfoType> = (props) => {
   const defaultAvatar = (src: string | null | undefined) => src ? src : 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'
   const uploadPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.files && props.savePhoto(e.target.files[0])
   }

   const [editMode, setEditMode] = useState<boolean>(false)

   if (!props.profile) {
      return <div>No profile, error!!!</div>
   }

   return (
      <div className={s.profileWrap}>
         <span className={s.profileBackground}> <img
            src='https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
            alt="logo"/> </span>
         <div className={s.profileDesc}>
            <div className={s.flexLeft}>
               <div className={s.profileAvatar}>
                  <Avatar size={300} shape={'square'} src={<Image src={defaultAvatar(props.profile?.photos.large)}/>}/>
               </div>
               {props.authorizedProfile &&
               <label htmlFor="contained-button-file">
                  <input onChange={uploadPhotoHandler}
                         style={{display: "none"}}
                         id="contained-button-file"
                         accept="image/*"
                         multiple type="file"/>
                  <Button style={{fontFamily: `Mochiy Pop P One, sans-serif`, fontSize: '12px'}}
                          color={'primary'}
                          variant="contained"
                          component="span">
                     Click to Upload
                     <AddPhotoAlternateIcon/>
                  </Button>
               </label>

               }
            </div>

            <div className={s.profileInfo}>

               {editMode
                  ? <ProfileInfoEditForm
                     setEditMode={setEditMode}
                     profile={props.profile}/>
                  : <ProfileInfo
                     updateStatus={props.updateStatus}
                     status={props.status}
                     setEditMode={setEditMode}
                     authorizedProfile={props.authorizedProfile}
                     profile={props.profile}/>}
            </div>
         </div>
      </div>
   )
}



