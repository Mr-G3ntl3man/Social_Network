import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AuthStateType, logout} from "../../redux/reducer/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
   authDate: AuthStateType
}

type MapDispatchToPropsType = {
   logout: () => void
}

export type HeaderContainerType = MapStateToPropsType & MapDispatchToPropsType

export class HeaderContainerApi extends React.Component<HeaderContainerType> {


   render() {
      return <Header {...this.props}/>
   }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
   return {
      authDate: state.auth
   }
}

export const HeaderContainer = connect(mapStateToProps, {logout})(HeaderContainerApi)