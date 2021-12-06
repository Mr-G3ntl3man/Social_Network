import {TextField} from "@material-ui/core";
import React, {ChangeEvent, useEffect, useState} from "react";
import s from './ProfileInfo.module.scss'

type ProfileStatusType = {
   status: string
   updateStatus: (status: string) => void
}

type StateType = {
   editMode: boolean
   status: string

}

export const ProfileStatus: React.FC<ProfileStatusType> = (props) => {
   const {status, updateStatus} = props

   const [state, setState] = useState<StateType>({
      editMode: false,
      status: status,
   })

   useEffect(() => {
      setState(state => ({...state, status: status}))
   }, [status])

   const onActivateEditMode = () => setState(state => ({...state, editMode: true}))

   const offActivateEditMode = () => {
      setState(state => ({...state, editMode: false}))
      updateStatus(state.status)
   }

   const onChangeStatusInput = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value.length < 310 && setState(state => ({...state, status: e.target.value}))
   }

   return (
      <div className={s.statusUser}>
         Status:
         {state.editMode
            ? <span className={s.editBlock}>
               <TextField autoFocus
                          multiline
                          minRows={1}
                          maxRows={15}
                          fullWidth
                          onBlur={offActivateEditMode}
                          onChange={onChangeStatusInput}
                          value={state.status}/>
            </span>
            : <span className={s.editBlock}>
               <span className={s.stateStatus}
                     onClick={onActivateEditMode}> {state.status || 'No status specified'}</span>
            </span>}
      </div>
   )
}
