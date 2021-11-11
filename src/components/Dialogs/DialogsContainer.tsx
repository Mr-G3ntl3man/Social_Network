import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {DialogsPageType} from "../../redux/DataTyping";
import {addMessageAC, changeMessageAC} from "../../redux/reducer/dialog-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {WithAuthRedirect} from "../Hoc/WithAuthRedirect";


type MapStateToPropsType = {
   dialogsPage: DialogsPageType
}
type MapDispatchToPropsType = {
   changeText: (value: string) => void
   addMessage: () => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
   return {
      dialogsPage: state.dialogsPage,
   }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
   return {
      changeText(value: string) {
         dispatch(changeMessageAC(value))

      },
      addMessage() {
         dispatch(addMessageAC())
      }
   }
}

const withRedirect = WithAuthRedirect(Dialogs)

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withRedirect)
