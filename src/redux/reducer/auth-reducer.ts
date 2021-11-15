import {Dispatch} from "redux";
import {authAPI} from "../../api/api";

export enum ACTION_TYPE_AUTH {
   SET_USER_DATA = 'SET_USER_DATA',
   SET_RESULT_STATUS = 'SET_RESULT_STATUS'
}

export type FormDataType = {
   email: string,
   password: string,
   remember: boolean
}

type UserDataType = {
   id: number
   email: string
   login: string
}

export type AuthStateType = {
   userData: UserDataType | null
   isAuth: boolean
   statusMessages: string
   resultStatusMessage: boolean
}

type ActionType = ReturnType<typeof setUserDataAC> | ReturnType<typeof setStatusMessAC>

const initialState: AuthStateType = {
   userData: null,
   isAuth: false,
   statusMessages: '',
   resultStatusMessage: false
}

export const authReducer = (state = initialState, action: ActionType): AuthStateType => {
   switch (action.type) {
      case ACTION_TYPE_AUTH.SET_USER_DATA:
         return {...state, userData: action.userData, isAuth: action.isAuth}

      case ACTION_TYPE_AUTH.SET_RESULT_STATUS:
         return {
            ...state,
            statusMessages: action.message,
            resultStatusMessage: action.resultStatusMessage
         }

      default:
         return {...state}
   }
}

export const setUserDataAC = (userData: UserDataType | null, isAuth: boolean) => {
   return {
      type: ACTION_TYPE_AUTH.SET_USER_DATA,
      userData,
      isAuth,
   } as const
}

export const setStatusMessAC = (message: string, resultStatusMessage: boolean) => ({
   type: ACTION_TYPE_AUTH.SET_RESULT_STATUS,
   message,
   resultStatusMessage
} as const)

export const getUserData = (): (dispatch: Dispatch) => void => {
   return (dispatch) => {
      return authAPI.getUserData()
         .then(data => {
            data.resultCode === 0 && dispatch(setUserDataAC(data.data, true))
         })
   }
}

export const login = (data: FormDataType): (dispatch: Dispatch | any) => void => {
   return (dispatch) => {
      authAPI.login(data.email, data.password, data.remember)
         .then(data => {
            data.resultCode !== 0 && dispatch(setStatusMessAC(data.messages[0], false))

            if (data.resultCode === 0) {
               dispatch(getUserData())
               dispatch(setStatusMessAC('Successful login', true))
            }
         })
   }
}

export const logout = (): (dispatch: Dispatch) => void => {
   return (dispatch) => {
      authAPI.logout()
         .then(response => {
            response.data.resultCode === 0 && dispatch(setUserDataAC(null, false))
         })
   }
}
