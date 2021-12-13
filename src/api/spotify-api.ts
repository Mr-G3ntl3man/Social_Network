import axios from "axios";
import {ProfileEditFormType} from "../redux/reducer/profile-reducer";
import {FormDataType} from "../redux/reducer/auth-reducer";

export enum RESULT_CODE {
   SUCCESSFULLY = 0,
   ERROR = 1,
   CAPTCHA = 10
}

type GeneralResponseT = {
   resultCode: RESULT_CODE
   messages: string[]
   data: any
}

type MeResponseT = {
   data: { id: number, email: string, login: string }
   resultCode: number
   messages: string[]
}

type ProfileResponseT = {
   aboutMe: string

   contacts: {
      facebook: string
      website: string
      vk: string
      twitter: string
      instagram: string
      youtube: string
      github: string
      mainLink: string
   }

   lookingForAJob: boolean
   lookingForAJobDescription: string
   fullName: string
   userId: number

   photos: {
      small: string
      large: string
   }
}

type UsersResponseT = {
   items: {
      name: string
      id: number
      photos: { small: string, large: string }
      status: string
      followed: boolean
   }[]
   totalCount: number
   error: string
}

type PhotoResponseT = {
   resultCode: RESULT_CODE
   messages: string[]
   data: { small: string, large: string }
}

type LoginResponseT = {
   resultCode: RESULT_CODE
   messages: string[]
   data: { userId: number }
}

type CaptchaResponseT = {
   url: string
}


const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': '8a6c9bcc-f079-4ea2-9d93-e56079db7d79'
   }
})

export const usersAPI = {
   getUsers(currentPage: number, pageSize: number) {
      return instance.get<UsersResponseT>(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => response.data)
   },
   followUser(id: number) {
      return instance.post<GeneralResponseT>(`follow/${id}`)
         .then(response => response.data)
   },
   unFollow(id: number) {
      return instance.delete<GeneralResponseT>(`follow/${id}`)
         .then(response => response.data)
   }
}

export const profileAPI = {
   getProfile(userId: number) {
      return instance.get<ProfileResponseT>(`profile/${userId}`)
         .then(response => response.data)
   },
   getStatus(userID: number) {
      return instance.get<string>(`profile/status/${userID}`)
   },
   updateStatus(status: string) {
      return instance.put<GeneralResponseT>(`profile/status`, {status: status})
   },
   savePhoto(photoFile: File) {
      const formData = new FormData()
      formData.append('image', photoFile)

      return instance.put<PhotoResponseT>(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
         .then(response => response.data)
   },
   saveProfile(profile: ProfileEditFormType) {
      return instance.put<GeneralResponseT>(`profile`, profile)
   }
}


export const authAPI = {
   getUserData() {
      return instance.get<MeResponseT>(`auth/me`)
         .then(response => response.data)
   },
   login(date: FormDataType) {
      return instance.post<LoginResponseT>(`auth/login`, {...date})
         .then(response => response.data)
   },
   logout() {
      return instance.delete<GeneralResponseT>(`auth/login`)
   }
}

export const securityApi = {
   getCaptchaUrl() {
      return instance.get<CaptchaResponseT>(`security/get-captcha-url`)
   }
}