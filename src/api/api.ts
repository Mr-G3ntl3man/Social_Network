import axios from "axios";
import {ProfileEditFormType} from "../redux/reducer/profile-reducer";
import {FormDataType} from "../redux/reducer/auth-reducer";

const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': '8a6c9bcc-f079-4ea2-9d93-e56079db7d79'
   }
})

export const usersAPI = {
   getUsers(currentPage: number, pageSize: number) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => response.data)
   },
   followUser(id: number) {
      return instance.post(`follow/${id}`)
         .then(response => response.data)
   },
   unFollow(id: number) {
      return instance.delete(`follow/${id}`)
         .then(response => response.data)
   }
}

export const profileAPI = {
   getProfile(userId: number) {
      return instance.get(`profile/${userId}`)
         .then(response => response.data)
   },
   getStatus(userID: number) {
      return instance.get(`profile/status/${userID}`)
   },
   updateStatus(status: string) {
      return instance.put(`profile/status`, {status: status})
   },
   savePhoto(photoFile: File) {
      const formData = new FormData()
      formData.append('image', photoFile)

      return instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
         .then(response => response.data)
   },
   saveProfile(profile: ProfileEditFormType) {
      return instance.put(`profile`, profile)
   }
}


export const authAPI = {
   getUserData() {
      return instance.get(`auth/me`)
         .then(response => response.data)
   },
   login(date: FormDataType) {
      return instance.post(`auth/login`, {...date})
         .then(response => response.data)
   },
   logout() {
      return instance.delete(`auth/login`)
   }
}

export const securityApi = {
   getCaptchaUrl() {
      return instance.get(`security/get-captcha-url`)
   }
}