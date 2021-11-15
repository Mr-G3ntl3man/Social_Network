import {TextField} from "@material-ui/core";
import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css'


type ProfileStatusType = {
   status: string
   updateStatus: (status: string) => void
}
type StateType = {
   editMode: boolean
   status: string

}


export class ProfileStatus extends React.Component<ProfileStatusType, StateType> {
   state: StateType = {
      editMode: false,
      status: this.props.status,

   }

   componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<StateType>) {
      prevProps.status !== this.props.status && this.setState({status: this.props.status})
   }


   onActivateEditMode = () => {
      this.setState({
         editMode: true
      })
   }

   offActivateEditMode = () => {
      this.setState({
         editMode: false
      })
      this.props.updateStatus(this.state.status)
   }

   onChangeStatusInput = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({
         status: e.currentTarget.value
      })
   }

   render() {
      return (
         <div className={s.statusUser}>
            <span className={s.status}>Status: </span>

            {this.state.editMode
               ? <div className={s.editBlock}>
                  <TextField autoFocus
                             onBlur={this.offActivateEditMode}
                             onChange={this.onChangeStatusInput}
                             value={this.state.status}/>
               </div>
               : <div className={s.editBlock}>
                  <span onClick={this.onActivateEditMode}> {this.state.status || 'No status specified'}</span>
               </div>}
         </div>
      )
   }


}
