import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, ProfileType, setUserProfile, updateStatus} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {getAuthorizedUserId, getProfile, getProfileStatus} from "../../redux/selectors/profile-selector";

type  WithRouterType = {
   userId: string
}

type ProfilePropsType = RouteComponentProps<WithRouterType>

export type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType


class ProfileApiContainer extends React.Component<ProfileContainerType & ProfilePropsType> {
   componentDidMount() {
      let userId = Number(this.props.match.params.userId)

      if (!userId) {
         userId = this.props.authorizedUserId

         if (!userId) this.props.history.push('/login')
      }

      this.props.setUserProfile(userId)
      this.props.getStatus(userId)
   }

   render() {
      return (
         <Profile {...this.props} />
      )
   }
}

export type MapStateToPropsType = {
   profile: null | ProfileType
   status: string
   authorizedUserId: number
}

type MapDispatchToPropsType = {
   setUserProfile: (id: number) => void
   getStatus: (id: number) => void
   updateStatus: (status: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
   return {
      profile: getProfile(state),
      status: getProfileStatus(state),
      authorizedUserId: getAuthorizedUserId(state)
   }
}


export const ProfileContainer = compose(
   connect(mapStateToProps, {setUserProfile, getStatus, updateStatus})
)(withRouter(ProfileApiContainer))

