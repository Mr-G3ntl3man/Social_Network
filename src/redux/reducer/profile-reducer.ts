import {Dispatch} from "redux";
import {v1} from "uuid";
import {profileAPI} from "../../api/api";
import {AppStateType} from "../redux-store";
import {installCaughtError} from "./app-reducer";
import {setAuthorizedUserPhoto} from "./auth-reducer";

export enum ACTION_TYPE_PROFILE {
   ADD_POST = 'social_network/profile/ADD_POST',
   UPDATE_NEW_POST = 'social_network/profile/UPDATE_NEW_POST',
   SET_USER_PROFILE = 'social_network/profile/SET_USER_PROFILE',
   SET_STATUS = 'social_network/profile/SET_STATUS',
   SAVE_PHOTO = 'social_network/profile/SAVE_PHOTO',
   SET_LIKE = 'social_network/profile/SET_LIKE',
   DELETE_POST = 'social_network/profile/DELETE_POST',
}

type ActionType = ReturnType<typeof addPostAC>
   | ReturnType<typeof changeTextAC>
   | ReturnType<typeof setUserProfileAC>
   | ReturnType<typeof setStatusAC>
   | ReturnType<typeof savePhotoSuccess>
   | ReturnType<typeof setLike>
   | ReturnType<typeof deletePost>

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
   posts: [
      {id: v1(), message: 'My first post', likesCount: 0},
   ],
   newPostText: '',
   profile: null,
   status: ''
}

export const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {
   switch (action.type) {
      case ACTION_TYPE_PROFILE.ADD_POST:
         const newPost: PostsType = {
            id: v1(),
            message: state.newPostText,
            likesCount: 0,
         }

         return {...state, posts: [...state.posts, newPost], newPostText: ''}

      case ACTION_TYPE_PROFILE.UPDATE_NEW_POST:
         return {...state, newPostText: action.newText}

      case ACTION_TYPE_PROFILE.SET_USER_PROFILE:
         return {...state, profile: action.profile}

      case ACTION_TYPE_PROFILE.SET_STATUS:
         return {...state, status: action.status}

      case ACTION_TYPE_PROFILE.SAVE_PHOTO:
         return {...state, profile: state.profile && {...state.profile, ...action.photos}}

      case ACTION_TYPE_PROFILE.SET_LIKE:
         return {...state, posts: state.posts.map(p => p.id === action.id ? {...p, likesCount: action.like} : p)}

      case ACTION_TYPE_PROFILE.DELETE_POST:
         return {...state, posts: state.posts.filter(p => p.id !== action.id)}

      default:
         return state
   }
}

export const addPostAC = () => {
   return {
      type: ACTION_TYPE_PROFILE.ADD_POST
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

export const setLikeSuccess = (like: number, id: string) => (dispatch: Dispatch) => {
   dispatch(setLike(like, id))
}

export const deletePostSuccess = (id: string) => (dispatch: Dispatch) => {
   dispatch(deletePost(id))
}

export const setUserProfile = (id: number): (dispatch: Dispatch) => void => {
   return (dispatch) => {
      profileAPI.getProfile(id)
         .then(data => {
            dispatch(setUserProfileAC(data))
         })
   }
}

export const getStatus = (id: number): (dispatch: Dispatch) => void => (dispatch) => {
   profileAPI.getStatus(id)
      .then(response => {
         dispatch(setStatusAC(response.data))
      })
}

export const updateStatus = (status: string): (dispatch: Dispatch | any) => void => (dispatch) => {
   profileAPI.updateStatus(status)
      .then(response => {
         response.data.resultCode === 0 && dispatch(setStatusAC(status))
         response.data.resultCode !== 0 && dispatch(installCaughtError(response.data.messages, 'warning'))
      })
}

export const savePhoto = (file: File): (dispatch: Dispatch | any) => void => async (dispatch) => {
   const response = await profileAPI.savePhoto(file)

   response.resultCode === 0 && dispatch(savePhotoSuccess(response.data))
   response.resultCode !== 0 && dispatch(installCaughtError(response.messages, 'warning'))
}

export const saveProfile = (profile: ProfileEditFormType): (dispatch: Dispatch | any, getState: () => AppStateType) => void => async (dispatch, getState) => {
   const userId = getState().auth.userData?.id
   const response = await profileAPI.saveProfile(profile)

   response.data.resultCode === 0 && userId && dispatch(setUserProfile(userId))
   response.data.resultCode !== 0 && dispatch(installCaughtError(response.data.messages, 'warning'))
}
