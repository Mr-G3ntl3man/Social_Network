import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {DialogsPageType} from "../../redux/store";
import {addMessageAC, changeMessageAC} from "../../redux/reducer/dialog-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


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
      dialogsPage: state.dialogsPage
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

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
