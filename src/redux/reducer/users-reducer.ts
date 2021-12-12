import {Dispatch} from "redux";
import {RESULT_CODE, usersAPI} from "../../api/api";
import {installCaughtError} from "./app-reducer";

export enum ACTION_TYPE_USERS {
   TOGGLE_FOLLOW = 'social_network/users/TOGGLE_FOLLOW',
   SET_USERS = 'social_network/users/SET_USERS',
   SET_CURRENT_PAGE = 'social_network/users/SET_CURRENT_PAGE',
   SET_TOTAL_USERS_COUNT = 'social_network/users/SET_TOTAL_USERS_COUNT',
   TOGGLE_IS_FETCHING = 'social_network/users/TOGGLE_IS_FETCHING',
   SET_PAGE_SIZE = 'social_network/users/SET_PAGE_SIZE',
   SET_IS_FOLLOWING_PROGRESS = 'social_network/users/SET_IS_FOLLOWING_PROGRESS'
}

type ActionType =
   ReturnType<typeof toggleFollow>
   | ReturnType<typeof setUsersAC>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setTotalUsersCountAC>
   | ReturnType<typeof toggleIsFetchingAC>
   | ReturnType<typeof toggleFollowingProgress>
   | ReturnType<typeof setPageSize>

type LocationType = {
   city: string
   country: string
}
type PhotoType = {
   small: string | null
   large: string | null
}

export type UserType = {
   id: number
   photos: PhotoType
   followed: boolean
   name: string
   status: string
   uniqueUrlName?: string | null
   location?: LocationType
}

export type UsersType = {
   users: UserType[]
   pageSize: number
   totalUserCount: number
   currentPage: number
   isFetching: boolean
   followingInProgress: number[]
}

const initialState: UsersType = {
   users: [],
   pageSize: 10,
   totalUserCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: []
}

export const usersReducer = (state = initialState, action: ActionType): UsersType => {
   switch (action.type) {
      case ACTION_TYPE_USERS.TOGGLE_FOLLOW:
         const users = state.users.map(el => el.id === action.userId ? {...el, followed: !el.followed} : el)

         return {...state, users: users}

      case ACTION_TYPE_USERS.SET_USERS:
         return {...state, users: [...action.users]}

      case ACTION_TYPE_USERS.SET_CURRENT_PAGE:
         return {...state, currentPage: action.currentPage}

      case ACTION_TYPE_USERS.SET_TOTAL_USERS_COUNT:
         return {...state, totalUserCount: action.totalUsersCount}

      case ACTION_TYPE_USERS.TOGGLE_IS_FETCHING:
         return {...state, isFetching: action.isFetching}

      case ACTION_TYPE_USERS.SET_IS_FOLLOWING_PROGRESS:
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : state.followingInProgress.filter(id => id !== action.userId)
         }

      case ACTION_TYPE_USERS.SET_PAGE_SIZE:
         return {...state, pageSize: action.pageSize}

      default:
         return {...state}
   }
}

export const toggleFollow = (userId: number) => {
   return {
      type: ACTION_TYPE_USERS.TOGGLE_FOLLOW,
      userId
   } as const
}

export const setUsersAC = (users: UserType[]) => {
   return {
      type: ACTION_TYPE_USERS.SET_USERS,
      users
   } as const
}

export const setCurrentPage = (currentPage: number) => {
   return {
      type: ACTION_TYPE_USERS.SET_CURRENT_PAGE,
      currentPage
   } as const
}

export const setTotalUsersCountAC = (totalUsersCount: number) => {
   return {
      type: ACTION_TYPE_USERS.SET_TOTAL_USERS_COUNT,
      totalUsersCount
   } as const
}

export const toggleIsFetchingAC = (isFetching: boolean) => {
   return {
      type: ACTION_TYPE_USERS.TOGGLE_IS_FETCHING,
      isFetching
   } as const
}

export const setPageSize = (pageSize: number) => {
   return {
      type: ACTION_TYPE_USERS.SET_PAGE_SIZE,
      pageSize
   } as const
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
   return {
      type: ACTION_TYPE_USERS.SET_IS_FOLLOWING_PROGRESS,
      isFetching,
      userId
   } as const
}

export const getUsers = (currentPage: number, pageSize: number) => {
   return async (dispatch: Dispatch<ActionType>) => {
      dispatch(toggleIsFetchingAC(true))
      dispatch(setCurrentPage(currentPage))

      const response = await usersAPI.getUsers(currentPage, pageSize)

      dispatch(setUsersAC(response.items))

      dispatch(setTotalUsersCountAC(response.totalCount))

      dispatch(toggleIsFetchingAC(false))
   }
}

const followUnfollow = async (dispatch: Dispatch<ActionType> | any, userID: number, apiMethod: (id: number) => Promise<any>) => {

   dispatch(toggleFollowingProgress(true, userID))

   const response = await apiMethod(userID)

   response.resultCode === RESULT_CODE.SUCCESSFULLY && dispatch(toggleFollow(userID))
   response.resultCode !== RESULT_CODE.SUCCESSFULLY && dispatch(installCaughtError(response.messages, 'warning'))

   dispatch(toggleFollowingProgress(false, userID))
}

export const followSuccess = (id: number) => {
   return (dispatch: Dispatch<ActionType>) => {
      followUnfollow(dispatch, id, usersAPI.followUser)
   }
}

export const unFollowSuccess = (id: number) => {
   return async (dispatch: Dispatch<ActionType>) => {
      followUnfollow(dispatch, id, usersAPI.unFollow)
   }
}

