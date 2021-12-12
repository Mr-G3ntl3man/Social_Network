import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {addMessageAC, changeMessageAC, DialogsPageType} from "../../redux/reducer/dialog-reducer";
import {AppRootStateT} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {WithAuthRedirect} from "../Hoc/WithAuthRedirect";
import {getDialogPage} from "../../redux/selectors/dialog-selector";


type MapStateToPropsType = {
   dialogsPage: DialogsPageType
}
type MapDispatchToPropsType = {
   changeText: (value: string) => void
   addMessage: () => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateT): MapStateToPropsType => {
   return {
      dialogsPage: getDialogPage(state)
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

export const DialogsContainer = compose(
   connect(mapStateToProps, mapDispatchToProps)
)(WithAuthRedirect(Dialogs))

export default DialogsContainer
