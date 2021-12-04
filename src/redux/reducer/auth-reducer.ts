import {Dispatch} from "redux";
import {authAPI, profileAPI, securityApi} from "../../api/api";
import {installCaughtError} from "./app-reducer";
import {PhotoType} from "./profile-reducer";

export enum ACTION_TYPE_AUTH {
   SET_USER_DATA = 'social_network/auth/SET_USER_DATA',
   SET_RESULT_STATUS = 'social_network/auth/SET_RESULT_STATUS',
   GET_CAPTCHA_SUCCESS = 'social_network/auth/GET_CAPTCHA_SUCCESS',
   SET_PHOTO = 'social_network/auth/SET_PHOTO',
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
   statusMessages: string
   resultStatusMessage: boolean
   captchaUrl: string | null
}

type ActionType = ReturnType<typeof setUserDataAC>
   | ReturnType<typeof setStatusMessAC>
   | ReturnType<typeof getCaptchaUrlSuccess>
   | ReturnType<typeof setAuthorizedUserPhoto>

const initialState: AuthStateType = {
   userData: null,
   isAuth: false,
   photo: null,
   statusMessages: '',
   resultStatusMessage: false,
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

export const setStatusMessAC = (message: string, resultStatusMessage: boolean) => ({
   type: ACTION_TYPE_AUTH.SET_RESULT_STATUS,
   message,
   resultStatusMessage
} as const)

export const getUserData = (): (dispatch: Dispatch) => void => {
   return async (dispatch) => {
      const response = await authAPI.getUserData()
      response.resultCode === 0 && dispatch(setUserDataAC(response.data, true))

      const authUserProfile = await profileAPI.getProfile(response.data.id)
      dispatch(setAuthorizedUserPhoto(authUserProfile.photos))
   }
}

export const getCaptchaUrlSuccess = (url: string) => ({
   type: ACTION_TYPE_AUTH.GET_CAPTCHA_SUCCESS,
   url
} as const)

export const setAuthorizedUserPhoto = (photo: PhotoType) => ({
   type: ACTION_TYPE_AUTH.SET_PHOTO,
   photo
} as const)

export const login = (data: FormDataType): (dispatch: Dispatch | any) => void => {
   return async (dispatch) => {
      const response = await authAPI.login(data)

      // получить профиль залогиненого юзера и загрузить фото
      // console.log(response)

      response.resultCode !== 0 && dispatch(setStatusMessAC(response.messages[0], false))
      response.resultCode === 10 && dispatch(getCaptchaUrl())

      if (response.resultCode === 0) {
         dispatch(getUserData())
         dispatch(setStatusMessAC('Successful login', true))
      }
   }
}

export const logout = () => {
   return async (dispatch: Dispatch | any) => {
      const response = await authAPI.logout()

      response.data.resultCode === 0 && dispatch(setUserDataAC(null, false))
      response.data.resultCode !== 0 && dispatch(installCaughtError(response.data.messages, 'warning'))
   }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
   const response = await securityApi.getCaptchaUrl()

   dispatch(getCaptchaUrlSuccess(response.data.url))
}