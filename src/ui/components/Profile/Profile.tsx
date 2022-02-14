import React, {useEffect} from "react";
import s from './Profile.module.css'
import {ProfileDesc} from "./ProfileInfo/ProfileDesc";
import {Preloader} from "../common/Preloader/Preloader";
import {connect} from "react-redux";
import {getStatus, ProfileType, savePhoto, setUserProfile, updateStatus} from "../../../bll/reducer/profile-reducer";
import {AppRootStateT} from "../../../bll/redux-store";
import {getAuthorizedUserId, getProfile, getProfileStatus} from "../../../bll/selectors/profile-selector";
import {useNavigate, useParams} from "react-router-dom";
import {MyPosts} from "./MyPosts/MyPosts";
import {PATH} from "../../router/Routes";


export type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType

export const Profile: React.FC<ProfileContainerType> = (props) => {
   const {authorizedUserId, setUserProfile, profile, getStatus} = props

   const finalClassName = !profile ? `${s.main} ${s.fetching}` : s.main

   const navigate = useNavigate()
   const {userId} = useParams()

   useEffect(() => {
      let id = isNaN(Number(userId)) ? authorizedUserId : Number(userId)

      if (!id) return navigate(PATH.LOGIN)

      setUserProfile(id)
      getStatus(id)
   }, [userId, setUserProfile, getStatus, authorizedUserId, navigate])


   if (!props.profile) {
      return <Preloader/>
   }

   return (
      <main className={finalClassName}>
         <ProfileDesc authorizedProfile={Number(userId) === authorizedUserId} {...props} />
         <MyPosts authorizedProfile={Number(userId) === authorizedUserId}/>
      </main>
   )
}

export type MapStateToPropsType = {
   profile: ProfileType | null
   status: string
   authorizedUserId: number
}

type MapDispatchToPropsType = {
   setUserProfile: (id: number) => void
   getStatus: (id: number) => void
   updateStatus: (status: string) => void
   savePhoto: (file: File) => void
}

const mapStateToProps = (state: AppRootStateT): MapStateToPropsType => {
   return {
      profile: getProfile(state),
      status: getProfileStatus(state),
      authorizedUserId: getAuthorizedUserId(state)
   }
}

export const ProfileContainer = connect(mapStateToProps, {
   savePhoto,
   setUserProfile,
   getStatus,
   updateStatus
})(Profile)

export default ProfileContainer