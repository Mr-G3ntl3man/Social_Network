import {connect} from "react-redux";
import {Users} from "./Users";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {setUsersAC, toggleFollowAC, UsersType, UserType} from "../../redux/reducer/users-reducer";

type MapStateToPropsType = {
   users: UsersType
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
   return {
      users: state.usersPage
   }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
   return {
      toggleFollow(userId: number) {
         dispatch(toggleFollowAC(userId))
      },
      setUsers(users: UserType[]) {
         dispatch(setUsersAC(users))
      }
   }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)