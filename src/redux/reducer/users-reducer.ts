import {ACTION_TYPE, ActionType, DialogsPageType} from "../store";

const initialState: DialogsPageType = {
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

export const dialogReducer = (state = initialState, action: ActionType): DialogsPageType => {
   switch (action.type) {
      case ACTION_TYPE.UPDATE_NEW_MESSAGE:

         return {...state, newMessage: action.newMessage}

      case ACTION_TYPE.ADD_MESSAGE:
         const newMess = {id: 6, message: state.newMessage}

         return {...state, messages: [...state.messages, newMess], newMessage: ''}

      default:
         return {...state}
   }
}

export const changeMessageAC = (newMessage: string) => {
   return {
      type: ACTION_TYPE.UPDATE_NEW_MESSAGE,
      newMessage: newMessage
   } as const
}

export const addMessageAC = () => {
   return {
      type: ACTION_TYPE.ADD_MESSAGE,
   } as const
}
