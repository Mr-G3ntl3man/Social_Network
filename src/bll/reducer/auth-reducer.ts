import {Dispatch} from "redux";
import {authAPI, profileAPI, RESULT_CODE, securityApi} from "../../dal/api";
import {installCaughtError} from "./app-reducer";
import {PhotoType} from "./profile-reducer";
import {ThunkAction} from "redux-thunk";
import {AppRootStateT} from "../redux-store";

export enum ACTION_TYPE_AUTH {
   SET_USER_DATA = 'social_network/auth/SET_USER_DATA',
   SET_RESULT_STATUS = 'social_network/auth/SET_RESULT_STATUS',
   GET_CAPTCHA_SUCCESS = 'social_network/auth/GET_CAPTCHA_SUCCESS',
   SET_PHOTO = 'social_network/auth/SET_PHOTO',
   SET_LOGOUT = 'social_network/auth/SET_LOGOUT',
}

export type FormDataType = {
   email: string,
   password: string,
   remember: boolean
   captcha: string
}

export type UserDataType = {
   id: number
   email: string
   login: string
}

export type AuthStateType = {
   userData: UserDataType | null
   photo: PhotoType | null
   isAuth: boolean
   logout: boolean
   statusMessages: string
   resultStatusMessage: boolean
   captchaUrl: string | null
}

type ActionType = ReturnType<typeof setUserDataAC>
   | ReturnType<typeof setStatusMessAC>
   | ReturnType<typeof getCaptchaUrlSuccess>
   | ReturnType<typeof setAuthorizedUserPhoto>
   | ReturnType<typeof setLogout>

type ThunkActionT = ThunkAction<void, AppRootStateT, unknown, ActionType>

const initialState: AuthStateType = {
   userData: null,
   isAuth: false,
   logout: false,
   photo: null,
   statusMessages: '',
   resultStatusMessage: true,
   captchaUrl: null
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
      case ACTION_TYPE_AUTH.GET_CAPTCHA_SUCCESS:
         return {...state, captchaUrl: action.url}

      case ACTION_TYPE_AUTH.SET_PHOTO:
         return {...state, photo: action.photo}

      case ACTION_TYPE_AUTH.SET_LOGOUT:
         return {...state, logout: action.logout}

      default:
         return state
   }
}

export const setUserDataAC = (userData: UserDataType | null, isAuth: boolean) => {
   return {
      type: ACTION_TYPE_AUTH.SET_USER_DATA,
      userData,
      isAuth,
   } as const
}

const setLogout = (logout: boolean) => {
   return {
      type: ACTION_TYPE_AUTH.SET_LOGOUT, logout
   } as const
}

export const setStatusMessAC = (message: string, resultStatusMessage: boolean) => ({
   type: ACTION_TYPE_AUTH.SET_RESULT_STATUS,
   message,
   resultStatusMessage
} as const)

export const getUserData = () => {
   return async (dispatch: Dispatch<ActionType>) => {
      const response = await authAPI.getUserData()

      if (response.resultCode === 0) {
         dispatch(setUserDataAC(response.data, true))

         const authUserProfile = await profileAPI.getProfile(response.data.id)
         dispatch(setAuthorizedUserPhoto(authUserProfile.photos))
      }

      response.resultCode !== 0 && dispatch(setStatusMessAC(response.messages[0], false))
   }
}

export const getCaptchaUrlSuccess = (url: string) => ({
   type: ACTION_TYPE_AUTH.GET_CAPTCHA_SUCCESS,
   url
} as const)

export const setAuthorizedUserPhoto = (photo: PhotoType | null) => ({
   type: ACTION_TYPE_AUTH.SET_PHOTO,
   photo
} as const)

export const login = (data: FormDataType): ThunkActionT => {
   return async (dispatch) => {
      const response = await authAPI.login(data)

      response.resultCode !== RESULT_CODE.SUCCESSFULLY && dispatch(setStatusMessAC(response.messages[0], false))
      response.resultCode === RESULT_CODE.CAPTCHA && await dispatch(getCaptchaUrl())

      if (response.resultCode === RESULT_CODE.SUCCESSFULLY) {
         dispatch(setStatusMessAC('Successful login', true))

         dispatch(setLogout(false))

         await dispatch(getUserData())
      }
   }
}

export const logout = (): ThunkActionT => {
   return async (dispatch) => {
      const response = await authAPI.logout()

      if (response.data.resultCode === RESULT_CODE.SUCCESSFULLY) {
         dispatch(setUserDataAC(null, false))
         dispatch(setAuthorizedUserPhoto(null))
         dispatch(setLogout(true))
      }

      response.data.resultCode !== RESULT_CODE.SUCCESSFULLY && dispatch(installCaughtError(response.data.messages[0], 'warning'))
   }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch<ActionType>) => {
   const response = await securityApi.getCaptchaUrl()

   dispatch(getCaptchaUrlSuccess(response.data.url))
}