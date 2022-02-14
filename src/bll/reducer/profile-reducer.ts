import {Dispatch} from "redux";
import {v1} from "uuid";
import {profileAPI, RESULT_CODE} from "../../dal/api";
import {AppRootStateT} from "../redux-store";
import {installCaughtError} from "./app-reducer";
import {restoreState, saveState} from "./localStorage/localStorage";
import {ThunkAction} from "redux-thunk";

export enum ACTION_TYPE_PROFILE {
   ADD_POST = 'social_network/profile/ADD_POST',
   UPDATE_NEW_POST = 'social_network/profile/UPDATE_NEW_POST',
   SET_USER_PROFILE = 'social_network/profile/SET_USER_PROFILE',
   SET_STATUS = 'social_network/profile/SET_STATUS',
   SAVE_PHOTO = 'social_network/profile/SAVE_PHOTO',
   SET_LIKE = 'social_network/profile/SET_LIKE',
   DELETE_POST = 'social_network/profile/DELETE_POST',
   GET_USER_POST = 'social_network/profile/GET_USER_POST',
}

type ActionType = ReturnType<typeof addPostAC>
   | ReturnType<typeof changeTextAC>
   | ReturnType<typeof setUserProfileAC>
   | ReturnType<typeof setStatusAC>
   | ReturnType<typeof savePhotoSuccess>
   | ReturnType<typeof setLike>
   | ReturnType<typeof deletePost>
   | ReturnType<typeof getUserPost>

type ThunkActionT = ThunkAction<void, AppRootStateT, unknown, ActionType>

export type ProfileEditFormType = {
   aboutMe: string
   fullName: string
   lookingForAJob: boolean
   lookingForAJobDescription: string
   contacts: {
      github: string
      vk: string
      facebook: string
      instagram: string
      twitter: string
      website: string
      youtube: string
      mainLink: string
   }
}

export type ProfilePageType = {
   posts: PostsType[] | []
   newPostText: string
   profile: null | ProfileType
   status: string
}
type PostsType = {
   id: string
   message: string
   likesCount: number
}

export type ContactsType = {
   facebook: string
   github: string
   instagram: string
   mainLink: string
   twitter: string
   vk: string
   website: string
   youtube: string
}

export type PhotoType = {
   small: string | null
   large: string | null
}

export type ProfileType = {
   aboutMe: string
   contacts: ContactsType
   fullName: string
   lookingForAJob: boolean
   lookingForAJobDescription: string
   photos: PhotoType
   userId: number
}


const initialState: ProfilePageType = {
   profile: null,
   posts: [],
   newPostText: '',
   status: ''
}

export const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {
   switch (action.type) {
      case ACTION_TYPE_PROFILE.ADD_POST: {
         const stateCopy = {
            ...state,
            newPostText: '',
            posts: [{
               id: v1(),
               message: state.newPostText,
               likesCount: 0,
            }, ...state.posts]
         }

         saveState<PostsType[]>(`userPosts:${stateCopy.profile?.userId}`, [...stateCopy.posts])

         return stateCopy
      }

      case ACTION_TYPE_PROFILE.UPDATE_NEW_POST:
         return {...state, newPostText: action.newText}

      case ACTION_TYPE_PROFILE.SET_USER_PROFILE:
         return {...state, profile: action.profile}

      case ACTION_TYPE_PROFILE.SET_STATUS:
         return {...state, status: action.status}

      case ACTION_TYPE_PROFILE.SAVE_PHOTO:
         return {...state, profile: state.profile && {...state.profile, ...action.photos}}

      case ACTION_TYPE_PROFILE.SET_LIKE: {
         const stateCopy = {
            ...state,
            posts: state.posts.map(p => p.id === action.id ? {...p, likesCount: action.like} : p)
         }

         saveState<PostsType[]>(`userPosts:${stateCopy.profile?.userId}`, [...stateCopy.posts])

         return stateCopy
      }

      case ACTION_TYPE_PROFILE.GET_USER_POST:
         return {...state, posts: action.post}

      case ACTION_TYPE_PROFILE.DELETE_POST: {
         const stateCopy = {...state, posts: state.posts.filter(p => p.id !== action.id)}

         saveState<PostsType[]>(`userPosts:${stateCopy.profile?.userId}`, [...stateCopy.posts])

         return stateCopy
      }

      default:
         return state
   }
}

export const addPostAC = () => {
   return {
      type: ACTION_TYPE_PROFILE.ADD_POST
   } as const
}

export const getUserPost = (post: PostsType[]) => {
   return {
      type: ACTION_TYPE_PROFILE.GET_USER_POST,
      post
   } as const
}

export const changeTextAC = (newText: string) => {
   return {
      type: ACTION_TYPE_PROFILE.UPDATE_NEW_POST,
      newText: newText
   } as const
}

export const setUserProfileAC = (profile: ProfileType) => {
   return {
      type: ACTION_TYPE_PROFILE.SET_USER_PROFILE,
      profile
   } as const
}

export const setStatusAC = (status: string) => {
   return {
      type: ACTION_TYPE_PROFILE.SET_STATUS,
      status
   } as const
}

export const savePhotoSuccess = (photos: PhotoType) => {
   return {
      type: ACTION_TYPE_PROFILE.SAVE_PHOTO,
      photos
   } as const
}
export const setLike = (like: number, id: string) => {
   return {
      type: ACTION_TYPE_PROFILE.SET_LIKE,
      like,
      id
   } as const
}

export const deletePost = (id: string) => {
   return {
      type: ACTION_TYPE_PROFILE.DELETE_POST,
      id
   } as const
}

export const setLikeSuccess = (like: number, id: string) => (dispatch: Dispatch<ActionType>) => {
   dispatch(setLike(like, id))
}

export const deletePostSuccess = (id: string) => (dispatch: Dispatch<ActionType>) => {
   dispatch(deletePost(id))
}

export const setUserProfile = (id: number) => {
   return async (dispatch: Dispatch<ActionType>) => {
      const data = await profileAPI.getProfile(id)

      dispatch(setUserProfileAC(data))
      dispatch(getUserPost(restoreState<PostsType[]>(`userPosts:${id}`, [])))
   }
}

export const getStatus = (id: number) => (dispatch: Dispatch<ActionType>) => {
   profileAPI.getStatus(id)
      .then(response => {
         dispatch(setStatusAC(response.data))
      })
}

export const updateStatus = (status: string): ThunkActionT => (dispatch) => {
   profileAPI.updateStatus(status)
      .then(response => {
         response.data.resultCode === RESULT_CODE.SUCCESSFULLY && dispatch(setStatusAC(status))
         response.data.resultCode !== RESULT_CODE.SUCCESSFULLY && dispatch(installCaughtError(response.data.messages[0], 'warning'))
      })
}

export const savePhoto = (file: File): ThunkActionT => async (dispatch) => {
   const response = await profileAPI.savePhoto(file)

   response.resultCode === RESULT_CODE.SUCCESSFULLY && dispatch(savePhotoSuccess(response.data))
   response.resultCode !== RESULT_CODE.SUCCESSFULLY && dispatch(installCaughtError(response.messages[0], 'warning'))
}

export const saveProfile = (profile: ProfileEditFormType): ThunkActionT => async (dispatch, getState) => {
   const userId = getState().auth.userData?.id
   const response = await profileAPI.saveProfile(profile)

   response.data.resultCode === RESULT_CODE.SUCCESSFULLY && userId && await dispatch(setUserProfile(userId))
   response.data.resultCode !== RESULT_CODE.SUCCESSFULLY && dispatch(installCaughtError(response.data.messages[0], 'warning'))
}
