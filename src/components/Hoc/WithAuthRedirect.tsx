import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
   isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({isAuth: state.auth.isAuth})

export const WithAuthRedirect = (Component: React.FC<any> | React.ComponentClass<any>) => {

   const RedirectComponent: React.FC<MapStateToPropsType> = (props) => {
      if (!props.isAuth) return <Redirect to={'/login'}/>

      return <Component {...props}/>
   }
   return connect(mapStateToProps)(RedirectComponent)

}