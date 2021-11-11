import {addPostAC, changeTextAC} from "./reducer/profile-reducer";
import {addMessageAC, changeMessageAC} from "./reducer/dialog-reducer";

export enum ACTION_TYPE {
   ADD_POST = 'ADD_POST',
   ADD_MESSAGE = 'ADD_MESSAGE',
   UPDATE_NEW_POST = 'UPDATE_NEW_POST',
   UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'
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



