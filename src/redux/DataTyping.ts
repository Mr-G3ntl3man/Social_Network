import {addPostAC, changeTextAC, profileReducer} from "./reducer/profile-reducer";
import {addMessageAC, changeMessageAC, dialogReducer} from "./reducer/dialog-reducer";

export enum ACTION_TYPE {
   ADD_POST = 'ADD_POST',
   ADD_MESSAGE = 'ADD_MESSAGE',
   UPDATE_NEW_POST = 'UPDATE_NEW_POST',
   UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'
}

export const oldStore: StoreType = {
   _state: {
      profilePage: {
         posts: [
            {id: 1, message: 'My first post', likesCount: 11},
            {id: 2, message: 'Hi, how are you', likesCount: 20},
            {id: 3, message: 'Hi', likesCount: 20},
            {id: 4, message: 'how are you', likesCount: 20},
            {id: 5, message: 'you lorem', likesCount: 20},
         ],
         newPostText: ''
      },
      dialogsPage: {
         dialogs: [
            {id: 1, name: 'Name1'},
            {id: 2, name: 'Name2'},
            {id: 3, name: 'Name3'},
            {id: 4, name: 'Name5'},
         ],
         messages: [
            {id: 1, message: 'lorem Yo1'},
            {id: 2, message: 'lorem Yo2'},
            {id: 3, message: 'lorem Yo3'},
            {id: 4, message: 'lorem Yo4'},
         ],
         newMessage: ''
      }
   },
   _callSubscribe() {
   },
   getState() {
      return this._state
   },
   subscribe(observer) {
      this._callSubscribe = observer
   },
   dispatch(action) {

      this._state.profilePage = profileReducer(this._state.profilePage, action)
      this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action)

      this._callSubscribe()
   }
}


export type StateType = {
   profilePage: ProfilePageType
   dialogsPage: DialogsPageType
}
export type ProfilePageType = {
   posts: Array<PostsType>
   newPostText: string
}
export type PostsType = {
   id: number
   message: string
   likesCount: number
}
export type DialogsPageType = {
   dialogs: Array<DialogsType>
   messages: Array<MessagesType>
   newMessage: string
}
export type DialogsType = {
   id: number
   name: string
}
export type MessagesType = {
   id: number
   message: string
}

export type ActionType =
   ReturnType<typeof addPostAC>
   | ReturnType<typeof changeTextAC>
   | ReturnType<typeof changeMessageAC>
   | ReturnType<typeof addMessageAC>

export type StoreType = {
   _state: StateType
   _callSubscribe: () => void
   getState: () => StateType
   subscribe: (observer: () => void) => void
   dispatch: (action: ActionType) => void
}


