import {v1} from "uuid";

enum ACTION_TYPE_DIALOGS {
   ADD_MESSAGE = 'ADD_MESSAGE',
   UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'
}

type ActionType = ReturnType<typeof changeMessageAC> | ReturnType<typeof addMessageAC>

export type DialogsPageType = {
   dialogs: Array<DialogsType>
   messages: Array<MessagesType>
   newMessage: string
}
type DialogsType = {
   id: string
   name: string
}
type MessagesType = {
   id: string
   message: string
}

const initialState: DialogsPageType = {
   dialogs: [
      {id: v1(), name: 'Name1'},
   ],
   messages: [
      {id: v1(), message: 'lorem Yo1'},
   ],
   newMessage: ''
}

export const dialogReducer = (state = initialState, action: ActionType): DialogsPageType => {
   switch (action.type) {
      case ACTION_TYPE_DIALOGS.UPDATE_NEW_MESSAGE:

         return {...state, newMessage: action.newMessage}

      case ACTION_TYPE_DIALOGS.ADD_MESSAGE:
         const newMess = {id: v1(), message: state.newMessage}

         return {...state, messages: [...state.messages, newMess], newMessage: ''}

      default:
         return {...state}
   }
}

export const changeMessageAC = (newMessage: string) => {
   return {
      type: ACTION_TYPE_DIALOGS.UPDATE_NEW_MESSAGE,
      newMessage: newMessage
   } as const
}

export const addMessageAC = () => {
   return {
      type: ACTION_TYPE_DIALOGS.ADD_MESSAGE,
   } as const
}
