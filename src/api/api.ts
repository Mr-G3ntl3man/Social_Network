import axios from "axios";

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
   }
}


export const authAPI = {
   getUserData() {
      return instance.get(`auth/me`)
         .then(response => response.data)
   },
   login(email: string, password: string, rememberMe: boolean) {
      return instance.post(`auth/login`, {email, password, rememberMe})
         .then(response => response.data)
   },
   logout() {
      return instance.delete(`auth/login`)
   }
}