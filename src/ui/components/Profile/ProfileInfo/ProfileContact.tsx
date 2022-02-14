import React from "react";
import s from './ProfileInfo.module.scss'

import {ContactsType} from "../../../../bll/reducer/profile-reducer";

type ProfileContactType = {
   contacts: ContactsType
}


export const ProfileContact: React.FC<ProfileContactType> = (props) => {

   return (
      <div className={s.profileContact}>
         <span className={s.contactTitle}>My Contact</span>
         <ul className={s.profileContactList}>
            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.facebook ? props.contacts.facebook : '#'}
                  className={props.contacts.facebook ? `${s.linkFacebook} ${s.defaultLink}` : ` ${s.defaultLink} ${s.linkFacebook} ${s.linkNone}`}> </a>
            </li>

            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.vk ? props.contacts.vk : '#'}
                  className={props.contacts.vk ? `${s.linkVk} ${s.defaultLink}` : `${s.linkVk} ${s.defaultLink} ${s.linkNone}`}> </a>
            </li>

            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.twitter ? props.contacts.twitter : '#'}
                  className={props.contacts.twitter ? `${s.linkTwitter} ${s.defaultLink}` : `${s.linkTwitter} ${s.defaultLink} ${s.linkNone}`}> </a>
            </li>

            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.instagram ? props.contacts.instagram : '#'}
                  className={props.contacts.instagram ? `${s.linkInstagram} ${s.defaultLink}` : `${s.linkInstagram} ${s.defaultLink} ${s.linkNone}`}> </a>
            </li>

            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.youtube ? props.contacts.youtube : '#'}
                  className={props.contacts.youtube ? `${s.linkYoutube} ${s.defaultLink}` : `${s.linkYoutube} ${s.defaultLink} ${s.linkNone}`}> </a>
            </li>

            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.github ? props.contacts.github : '#'}
                  className={props.contacts.github ? `${s.linkGithub} ${s.defaultLink}` : `${s.linkGithub} ${s.defaultLink} ${s.linkNone}`}> </a>
            </li>

            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.mainLink ? props.contacts.mainLink : '#'}
                  className={props.contacts.mainLink ? `${s.linkMainLink} ${s.defaultLink}` : `${s.linkMainLink} ${s.defaultLink} ${s.linkNone}`}> </a>
            </li>

            <li className={s.profileContactItem}>
               <a target='blank'
                  href={props.contacts.website ? props.contacts.website : '#'}
                  className={props.contacts.website ? ` ${s.linkWebsite} ${s.defaultLink}` : `${s.linkWebsite} ${s.defaultLink} ${s.linkNone}`}> </a>
            </li>
         </ul>
      </div>

   )
}



