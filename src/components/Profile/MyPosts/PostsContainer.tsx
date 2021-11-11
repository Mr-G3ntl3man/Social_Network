import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfilePageType} from "../../redux/DataTyping";
import {Dispatch} from "redux";
import {MyPosts} from "./MyPosts/MyPosts";
import {addPostAC, changeTextAC} from "../../redux/reducer/profile-reducer";


type MapStateToPropsType = {
   profilePage: ProfilePageType
}

type MapDispatchToPropsType = {
   onClickForNewPosts: () => void
   onChangeFromTextArea: (value: string) => void
}

export type PostsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
   return {
      profilePage: state.profilePage
   }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
   return {
      onClickForNewPosts() {
         dispatch(addPostAC())
      },
      onChangeFromTextArea(value) {
         dispatch(changeTextAC(value))
      }
   }
}

export const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)