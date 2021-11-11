import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";

export enum ACTION_TYPE_USERS {
   TOGGLE_FOLLOW = 'TOGGLE_FOLLOW',
   SET_USERS = 'SET_USERS',
   SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
   SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT',
   TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
   SHOW_USERS = 'SHOW_USERS',
   SET_SETTINGS_FOR_PAGES = 'SET_SETTINGS_FOR_PAGES',
   SET_TOTAL_PAGE = 'SET_TOTAL_PAGE',
   SET_IS_FOLLOWING_PROGRESS = 'SET_IS_FOLLOWING_PROGRESS'
}


type ActionType =
   ReturnType<typeof toggleFollow>
   | ReturnType<typeof setUsersAC>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setTotalUsersCountAC>
   | ReturnType<typeof toggleIsFetchingAC>
   | ReturnType<typeof showUsersPageNum>
   | ReturnType<typeof setSettingsOfPages>
   | ReturnType<typeof setTotalPageAC>
   | ReturnType<typeof toggleFollowingProgress>

type LocationType = {
   city: string
   country: string
}
type PhotoType = {
   small: string | null
   large: string | null
}

type SettingsNumberOfPagesType = {
   startPage: number
   lastPage: number
   totalPage: number
}

export type UserType = {
   id: number
   photos: PhotoType
   followed: boolean
   name: string
   status: string | null
   uniqueUrlName: string | null
   location?: LocationType
}

export type UsersType = {
   users: UserType[]
   settingsNumberOfPages: SettingsNumberOfPagesType
   pageSize: number
   totalUserCount: number
   currentPage: number
   isFetching: boolean
   showUsersPage: number
   followingInProgress: number[]
}

const initialState: UsersType = {
   users: [],
   settingsNumberOfPages: {
      startPage: 1,
      lastPage: 10,
      totalPage: 0
   },
   pageSize: 5,
   totalUserCount: 0,
   showUsersPage: 50,
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

      case ACTION_TYPE_USERS.SHOW_USERS:
         return {...state, showUsersPage: state.showUsersPage + action.value}

      case ACTION_TYPE_USERS.SET_SETTINGS_FOR_PAGES:
         return {
            ...state,
            settingsNumberOfPages: {
               ...state.settingsNumberOfPages,
               startPage: action.startPage,
               lastPage: action.lastPage
            }
         }

      case ACTION_TYPE_USERS.SET_TOTAL_PAGE:
         return {
            ...state,
            settingsNumberOfPages: {
               ...state.settingsNumberOfPages,
               totalPage: action.totalPage
            }
         }

      case ACTION_TYPE_USERS.SET_IS_FOLLOWING_PROGRESS:
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : state.followingInProgress.filter(id => id !== action.userId)
         }

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

export const showUsersPageNum = (value: number) => {
   return {
      type: ACTION_TYPE_USERS.SHOW_USERS,
      value
   } as const
}

export const setSettingsOfPages = (startPage: number, lastPage: number) => {
   return {
      type: ACTION_TYPE_USERS.SET_SETTINGS_FOR_PAGES,
      startPage,
      lastPage
   } as const
}

export const setTotalPageAC = (totalPage: number) => {
   return {
      type: ACTION_TYPE_USERS.SET_TOTAL_PAGE,
      totalPage
   } as const
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
   return {
      type: ACTION_TYPE_USERS.SET_IS_FOLLOWING_PROGRESS,
      isFetching,
      userId
   } as const
}


export const getUsers = (currentPage: number, pageSize: number): (dispatch: Dispatch) => void => {

   return (dispatch: Dispatch) => {
      dispatch(toggleIsFetchingAC(true))

      usersAPI.getUsers(currentPage, pageSize)
         .then(data => {
            dispatch(setTotalPageAC(Math.ceil(data.totalCount / pageSize)))

            dispatch(setUsersAC(data.items))

            dispatch(setTotalUsersCountAC(data.totalCount))

            dispatch(toggleIsFetchingAC(false))
         })
   }

}

export const followSuccess = (id: number): (dispatch: Dispatch) => void => {
   return (dispatch) => {
      dispatch(toggleFollowingProgress(true, id))

      usersAPI.followUser(id)
         .then(data => {
            data.resultCode === 0 && dispatch(toggleFollow(id))

            dispatch(toggleFollowingProgress(false, id))
         })
   }
}

export const unFollowSuccess = (id: number): (dispatch: Dispatch) => void => {
   return (dispatch) => {
      dispatch(toggleFollowingProgress(true, id))

      usersAPI.unFollow(id)
         .then(data => {
            data.resultCode === 0 && dispatch(toggleFollow(id))

            dispatch(toggleFollowingProgress(false, id))
         })
   }
}

