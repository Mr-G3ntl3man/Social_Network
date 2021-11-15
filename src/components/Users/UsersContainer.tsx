import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
   followSuccess,
   getUsers, setSettingsOfPages,
   showUsersPageNum, toggleFollowingProgress, unFollowSuccess,
   UsersType
} from "../../redux/reducer/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {PagesNumber} from "./Pages";
import s from "./user.module.css";
import {compose} from "redux";
import {getUserPage} from "../../redux/selectors/user-selectors";


class UsersPageApiComponent extends React.Component<UsersPropsType> {
   componentDidMount() {
      this.props.getUsers(this.props.userPage.currentPage, this.props.userPage.pageSize)
   }

   onClickSetPageHandler = (page: number) => {
      this.props.getUsers(page, this.props.userPage.pageSize)
   }

   render() {
      return (
         <div className={s.usersMainWrap}>
            {this.props.userPage.isFetching && <Preloader/>}

            <PagesNumber
               setPages={this.props.setSettingsOfPages}
               onClickShowUsersPage={this.props.showUsersPageNum}
               onClickSetPageHandler={this.onClickSetPageHandler}
               userPage={this.props.userPage}/>

            <Users
               userPage={this.props.userPage}
               unFollowSuccess={this.props.unFollowSuccess}
               followSuccess={this.props.followSuccess}
            />

         </div>
      )
   }
}


export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapStateToPropsType = {
   userPage: UsersType
}

type MapDispatchToPropsType = {
   followSuccess: (userId: number) => void
   unFollowSuccess: (userId: number) => void
   showUsersPageNum: (value: number) => void
   setSettingsOfPages: (startPage: number, lastPage: number) => void
   toggleFollowingProgress: (following: boolean, userId: number) => void
   getUsers: (currentPage: number, pageSize: number) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
   userPage: getUserPage(state)
})


export const UsersContainer = compose(
   connect(mapStateToProps, {
      followSuccess, unFollowSuccess, showUsersPageNum,
      setSettingsOfPages, toggleFollowingProgress, getUsers
   })
)(UsersPageApiComponent)


