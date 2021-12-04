import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
   followSuccess,
   getUsers, setPageSize,
   toggleFollowingProgress, unFollowSuccess,
   UsersType
} from "../../redux/reducer/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import s from "./user.module.css";
import {compose} from "redux";
import {getUserPage} from "../../redux/selectors/user-selectors";
import {Pagination} from 'antd';


class UsersPageApiComponent extends React.Component<UsersPropsType> {
   componentDidMount() {
      this.props.getUsers(this.props.userPage.currentPage, this.props.userPage.pageSize)
   }

   onChangeCurrentPage = (page: number, pageSize: number) => {
      if (page === 0) page = 1

      this.props.getUsers(page, pageSize)
   }

   render() {
      return (
         <div className={s.usersMainWrap}>
            {this.props.userPage.isFetching && <Preloader/>}

            <Pagination
               onChange={this.onChangeCurrentPage}
               defaultCurrent={1}
               defaultPageSize={this.props.userPage.pageSize}
               total={this.props.userPage.totalUserCount}/>

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
   toggleFollowingProgress: (following: boolean, userId: number) => void
   getUsers: (currentPage: number, pageSize: number) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
   userPage: getUserPage(state)
})


export const UsersContainer = compose(
   connect(mapStateToProps, {
      followSuccess, unFollowSuccess,
      toggleFollowingProgress, getUsers, setPageSize
   })
)(UsersPageApiComponent)


export default UsersContainer