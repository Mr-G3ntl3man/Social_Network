import {Dispatch} from "redux";
import {profileAPI} from "../../api/api";

export enum ACTION_TYPE_PROFILE {
   ADD_POST = 'ADD_POST',
   UPDATE_NEW_POST = 'UPDATE_NEW_POST',
   SET_USER_PROFILE = 'SET_USER_PROFILE',
   SET_STATUS = 'SET_STATUS'
}

type ActionType = ReturnType<typeof addPostAC>
   | ReturnType<typeof changeTextAC>
   | ReturnType<typeof setUserProfileAC>
   | ReturnType<typeof setStatusAC>

export type ProfilePageType = {
   posts: Array<PostsType>
   newPostText: string
   profile: null | ProfileType
   status: string
}
type PostsType = {
   id: number
   message: string
   likesCount: number
}

type ContactsType = {
   facebook: null | string
   github: null | string
   instagram: null | string
   mainLink: null | string
   twitter: null | string
   vk: null | string
   website: null | string
   youtube: null | string
}

type PhotoType = {
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
      {id: 1, message: 'My first post', likesCount: 11},
      {id: 2, message: 'Hi, how are you', likesCount: 20},
      {id: 3, message: 'Hi', likesCount: 20},
      {id: 4, message: 'how are you', likesCount: 20},
      {id: 5, message: 'you lorem', likesCount: 20},
   ],
   newPostText: '',
   profile: null,
   status: ''
}

export const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {
   switch (action.type) {
      case ACTION_TYPE_PROFILE.ADD_POST:
         const newPost: PostsType = {
            id: 5,
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

      default:
         return {...state}
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


export const updateStatus = (status: string): (dispatch: Dispatch) => void => (dispatch) => {
   profileAPI.updateStatus(status)
      .then(response => {
         response.data.resultCode === 0 && setStatusAC(status)
      })
}

