import {
   setCurrentPage, setSettingsOfPages, setTotalPageAC,
   setTotalUsersCountAC, setUsersAC,
   toggleFollow, toggleIsFetchingAC,
   usersReducer,
   UsersType,
   UserType
} from "../users-reducer";

let state: UsersType

beforeEach(() => {
   state = {
      users: [{
         id: 0,
         photos: {
            small: null,
            large: null
         },
         followed: true,
         name: 'name',
         status: null,
         uniqueUrlName: null
      }],
      settingsNumberOfPages: {
         startPage: 1,
         lastPage: 10,
         totalPage: 0
      },
      pageSize: 5,
      totalUserCount: 0,
      currentPage: 1,
      isFetching: false,
      followingInProgress: []
   }
})

describe('test usersReducer', () => {
   it('Test toggle follow action', () => {
      const result = usersReducer(state, toggleFollow(0))

      expect(result.users[0].followed).toBe(false)
   })

   it('Test set users action', () => {
      const users: UserType[] = [
         {
            id: 1,
            photos: {
               small: null,
               large: null
            },
            followed: true,
            name: 'name',
            status: null,
            uniqueUrlName: null
         },
         {
            id: 2,
            photos: {
               small: null,
               large: null
            },
            followed: true,
            name: 'name',
            status: null,
            uniqueUrlName: null
         },
         {
            id: 3,
            photos: {
               small: null,
               large: null
            },
            followed: true,
            name: 'name',
            status: null,
            uniqueUrlName: null
         },
         {
            id: 4,
            photos: {
               small: null,
               large: null
            },
            followed: true,
            name: 'name',
            status: null,
            uniqueUrlName: null
         },
         {
            id: 5,
            photos: {
               small: null,
               large: null
            },
            followed: true,
            name: 'name',
            status: null,
            uniqueUrlName: null
         }
      ]

      const result = usersReducer(state, setUsersAC(users))

      expect(result.users.length).toBe(5)
   })

   it('Test set current page action', () => {
      const result = usersReducer(state, setCurrentPage(100))

      expect(result.currentPage).toBe(100)
   })

   it('Test set Total Users Count  action', () => {
      const result = usersReducer(state, setTotalUsersCountAC(200))

      expect(result.totalUserCount).toBe(200)
   })

   it('Test toggle Is Fetching  action', () => {
      const result = usersReducer(state, toggleIsFetchingAC(true))

      expect(result.isFetching).toBe(true)
   })

   it('Test settings Number Of Pages action', () => {
      const result = usersReducer(state, setSettingsOfPages(10, 50))

      expect(result.settingsNumberOfPages.startPage).toBe(10)
      expect(result.settingsNumberOfPages.lastPage).toBe(50)
   })

   it('Test set Total Page  action', () => {
      const result = usersReducer(state, setTotalPageAC(1000))

      expect(result.settingsNumberOfPages.totalPage).toBe(1000)
   })
})




