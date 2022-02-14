import React from "react";
import s from './ProfileInfo.module.scss'
import {ProfileType} from "../../../../bll/reducer/profile-reducer";
import {Button} from "@material-ui/core";
import {ProfileContact} from "./ProfileContact";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoType = {
   profile: ProfileType
   authorizedProfile: boolean
   setEditMode: (value: boolean) => void
   updateStatus: (status: string) => void
   status: string
}

export const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
   const setEditModeHandler = () => props.setEditMode(true)

   return (
      <div className={s.wrap}>
         {props.authorizedProfile
            ? <ProfileStatus updateStatus={props.updateStatus} status={props.status}/>
            : <div className={s.statusUser}>Status: <span>{props.status || 'No status specified'}</span></div>}

         <ul className={s.profileContent}>
            <li className={s.fullName}>
               Full name:
               <span
                  className={s.spanDefault}>{props.profile.fullName ? props.profile.fullName : 'Data not filled'}</span>
            </li>
            <li className={s.aboutMe}>
               About me:
               <span
                  className={s.spanDefault}>{props.profile.aboutMe ? props.profile.aboutMe : 'Data not filled'}</span>
            </li>
            <li className={s.lookingForAJob}>
               Looking for a job:
               <span
                  className={s.spanDefault}>{props.profile.lookingForAJob ? 'Yes' : 'No'}</span>
            </li>
            <li className={s.lookingForAJobDescription}>
               Looking for a job description:
               <span
                  className={s.spanDefault}>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : 'Data not filled'}</span>
            </li>
         </ul>

         <div className={s.contactsWrap}>
            <ProfileContact contacts={props.profile.contacts}/>

            {props.authorizedProfile &&
            <Button
               style={{fontFamily: `Mochiy Pop P One, sans-serif`, letterSpacing: '2px'}}
               fullWidth
               variant="contained"
               color="primary"
               onClick={setEditModeHandler}>Edit Profile Info</Button>}
         </div>
      </div>

   )
}



