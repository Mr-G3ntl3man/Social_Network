import {Dispatch} from "redux";
import {authAPI} from "../../api/api";

export enum ACTION_TYPE_AUTH {
   SET_USER_DATA = 'SET_USER_DATA',
}

export type AuthStateType = {
   id: null | number
   email: null | string
   login: null | string
   isAuth: boolean
}


type ActionType = ReturnType<typeof setUserDataAC>

const initialState: AuthStateType = {
   id: null,
   email: null,
   login: null,
   isAuth: false
}


export const authReducer = (state = initialState, action: ActionType): AuthStateType => {
   switch (action.type) {
      case ACTION_TYPE_AUTH.SET_USER_DATA:
         return {...state, ...action.data, isAuth: true}

      default:
         return {...state}
   }
}


export const setUserDataAC = (data: AuthStateType) => {
   return {
      type: ACTION_TYPE_AUTH.SET_USER_DATA,
      data: data
   }
}


export const getUserData = (): (dispatch: Dispatch) => void => {
   return (dispatch) => {
      authAPI.getUserData()
         .then(data => {
            data.resultCode === 0 && dispatch(setUserDataAC(data.data))
         })
   }
}


