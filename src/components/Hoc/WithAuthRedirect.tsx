import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateT} from "../../redux/redux-store";


type MapStateToPropsType = {
   isAuth: boolean
}
const mapStateToProps = (state: AppRootStateT): MapStateToPropsType => ({isAuth: state.auth.isAuth})

export const WithAuthRedirect = (Component: React.FC<any> | React.ComponentClass<any>) => {

   const RedirectComponent: React.FC<MapStateToPropsType> = (props) => {
      if (!props.isAuth) return <Navigate replace to="/"/>

      return <Component {...props}/>
   }
   return connect(mapStateToProps)(RedirectComponent)

}