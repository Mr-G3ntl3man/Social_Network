import React from "react";
import s from './ProfileInfo.module.css'
import {ProfileContainerType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";

export const ProfileInfo: React.FC<ProfileContainerType> = (props) => {
   const defaultAvatar = (src: string | null | undefined) => src ? src : 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'

   if (!props.profile) {
      return <div>No profile, error!!!</div>
   }

   return (
      <div className={s.profileWrap}>
         <span className={s.profileBackground}> <img
            src="https://img5.goodfon.ru/original/1920x1200/c/38/soprotivlenie-vendetta-maska-tekstura-nadpisi-politsiia-zapr.jpg"
            alt="logo"/> </span>
         <div className={s.profileDesc}>
            <div className={s.profileAvatar}>
               <img src={defaultAvatar(props.profile?.photos.large)} alt="avatar"/>
            </div>

            <div className={s.profileInfo}>
               <ProfileStatus updateStatus={props.updateStatus} status={props.status}/>

               <div className={s.profileAbout}>
               <span
                  className={s.fullName}>Full name: <span
                  className={s.spanDefault}>{props.profile.fullName ? props.profile.fullName : 'Data not filled'}</span> </span>

                  <span
                     className={s.aboutMe}> About me: <span
                     className={s.spanDefault}>{props.profile.aboutMe ? props.profile.aboutMe : 'Data not filled'}</span> </span>

                  <span
                     className={s.lookingForAJob}>Looking for a job: <span
                     className={s.spanDefault}>{props.profile.lookingForAJob ? 'Yes' : 'No'}</span> </span>

                  <span
                     className={s.lookingForAJobDescription}>Looking for a job description: <span
                     className={s.spanDefault}>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : 'Data not filled'}</span> </span>

               </div>

               <div className={s.profileContact}>
                  <span className={s.contactTitle}>My Contact</span>
                  <ul className={s.profileContactList}>
                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.facebook ? props.profile.contacts.facebook : '#'}
                           className={props.profile.contacts.facebook ? `${s.linkFacebook} ${s.defaultLink}` : ` ${s.defaultLink} ${s.linkFacebook} ${s.linkNone}`}> </a>
                     </li>

                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.vk ? props.profile.contacts.vk : '#'}
                           className={props.profile.contacts.vk ? `${s.linkVk} ${s.defaultLink}` : `${s.linkVk} ${s.defaultLink} ${s.linkNone}`}> </a>
                     </li>

                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.twitter ? props.profile.contacts.twitter : '#'}
                           className={props.profile.contacts.twitter ? `${s.linkTwitter} ${s.defaultLink}` : `${s.linkTwitter} ${s.defaultLink} ${s.linkNone}`}> </a>
                     </li>

                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.instagram ? props.profile.contacts.instagram : '#'}
                           className={props.profile.contacts.instagram ? `${s.linkInstagram} ${s.defaultLink}` : `${s.linkInstagram} ${s.defaultLink} ${s.linkNone}`}> </a>
                     </li>

                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.youtube ? props.profile.contacts.youtube : '#'}
                           className={props.profile.contacts.youtube ? `${s.linkYoutube} ${s.defaultLink}` : `${s.linkYoutube} ${s.defaultLink} ${s.linkNone}`}> </a>
                     </li>

                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.github ? props.profile.contacts.github : '#'}
                           className={props.profile.contacts.github ? `${s.linkGithub} ${s.defaultLink}` : `${s.linkGithub} ${s.defaultLink} ${s.linkNone}`}> </a>
                     </li>

                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.mainLink ? props.profile.contacts.mainLink : '#'}
                           className={props.profile.contacts.mainLink ? `${s.linkMainLink} ${s.defaultLink}` : `${s.linkMainLink} ${s.defaultLink} ${s.linkNone}`}> </a>
                     </li>

                     <li className={s.profileContactItem}>
                        <a target='blank'
                           href={props.profile.contacts.website ? props.profile.contacts.website : '#'}
                           className={props.profile.contacts.website ? ` ${s.linkWebsite} ${s.defaultLink}` : `${s.linkWebsite} ${s.defaultLink} ${s.linkNone}`}> </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}