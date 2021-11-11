import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../Hoc/WithAuthRedirect";

type  WithRouterType = {
   userId: string
}

type ProfilePropsType = RouteComponentProps<WithRouterType>

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType


class ProfileApiContainer extends React.Component<ProfileContainerType & ProfilePropsType> {
   componentDidMount() {
      const userId = this.props.match.params.userId || '2'

      this.props.setUserProfile(+userId)
   }

   render() {
      return (
         <Profile {...this.props} />
      )
   }
}

export type MapStateToPropsType = {
   profile: null | ProfileType
}

type MapDispatchToPropsType = {
   setUserProfile: (id: number) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
   return {
      profile: state.profilePage.profile,
   }
}

const WithUrlDataContComponent = withRouter(ProfileApiContainer)

const withRedirect = WithAuthRedirect(WithUrlDataContComponent)

export const ProfileContainer = connect(mapStateToProps, {
   setUserProfile
})(withRedirect)